import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { legalTexts } from '../data/civilCode';
import { Button } from './ui/Button';
import { Tabs } from './ui/Tabs';

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  relatedQuestions?: string[];
  confidence?: 'high' | 'medium' | 'low';
  sources?: string[];
}

interface ConversationContext {
  lastTopic: string;
  lastLawId: string;
  lastArticle: number;
  recentTopics: string[];
}

// ═══════════════════════════════════════════════════════════════
// NLP ENGINE — Normalisation, synonymes, extraction
// ═══════════════════════════════════════════════════════════════

const normalizeText = (text: string): string => 
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-']/g, ' ');

// Expanded synonym map for fuzzy matching
const SYNONYMS: Record<string, string[]> = {
  'accident': ['at', 'sinistre', 'evenement', 'accidente'],
  'travail': ['professionnel', 'professionnelle', 'emploi', 'service', 'poste'],
  'maladie': ['pathologie', 'affection', 'mp', 'atteinte'],
  'incapacite': ['ipp', 'invalidite', 'handicap', 'infirmite', 'taux', 'sequelle', 'sequelles'],
  'consolidation': ['consolide', 'stabilisation', 'stabilise', 'guerison', 'gueri'],
  'rechute': ['aggravation', 'reprise', 'recidive', 'reouverture', 'aggraver', 'aggrave'],
  'indemnite': ['indemnisation', 'compensation', 'allocation', 'prestation', 'reparation'],
  'rente': ['pension', 'capital', 'versement', 'allocation'],
  'employeur': ['patron', 'entreprise', 'societe', 'organisme employeur'],
  'victime': ['assure', 'beneficiaire', 'travailleur', 'salarie', 'blesse', 'accidente'],
  'declaration': ['declarer', 'signalement', 'signaler', 'notification', 'notifier'],
  'expertise': ['expert', 'contre expertise', 'examen', 'evaluation', 'medecin expert'],
  'recours': ['contestation', 'contester', 'opposition', 'appel', 'plainte', 'litige'],
  'delai': ['duree', 'periode', 'combien temps', 'temps', 'date limite', 'prescription'],
  'medecin': ['docteur', 'praticien', 'clinicien', 'therapeute'],
  'conseil': ['controle', 'controleur', 'medecin conseil'],
  'commission': ['comite', 'jury', 'instance'],
  'deces': ['mort', 'decede', 'mourir', 'droit conjoint', 'ayants droit', 'heritier'],
  'trajet': ['parcours', 'deplacement', 'itineraire', 'chemin', 'route'],
  'tierce': ['aide', 'assistance', 'dependance', 'autonomie'],
  'faute': ['responsabilite', 'negligence', 'imprudence', 'inexcusable'],
  'revision': ['reviser', 'modifier', 'modification', 'reexamen', 'reevaluation'],
  'bareme': ['grille', 'tableau', 'echelle', 'referentiel', 'guide'],
  'soins': ['traitement', 'therapie', 'therapeutique', 'medicament', 'hospitalisation', 'chirurgie'],
  'transport': ['deplacement', 'ambulance', 'convocation', 'voyage'],
  'arret': ['arret travail', 'conge', 'cessation', 'interruption', 'ijt'],
  'journaliere': ['ij', 'ijt', 'indemnites journalieres'],
  'categorie': ['groupe', 'classe', 'type', 'classification'],
  'rejet': ['refus', 'refuse', 'rejete', 'irrecevable', 'deboute'],
  'prise en charge': ['couverture', 'remboursement', 'rembourse', 'gratuite', 'charge'],
  'cnas': ['securite sociale', 'caisse', 'organisme', 'assurance'],
};

// Expand query with synonyms for better matching
const expandQueryWithSynonyms = (keywords: string[]): string[] => {
  const expanded = new Set(keywords);
  keywords.forEach(kw => {
    for (const [canonical, syns] of Object.entries(SYNONYMS)) {
      if (kw === canonical || syns.includes(kw)) {
        expanded.add(canonical);
        syns.forEach(s => expanded.add(s));
      }
    }
  });
  return [...expanded];
};

const STOP_WORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'de', 'du', 'des', 'au', 'aux', 
  'et', 'ou', 'est', 'ce', 'que', 'qui', 'quoi', 'comment', 'quand', 
  'pourquoi', 'gerer', 'faire', 'savoir', 'quelle', 'quelles', 'quel',
  'son', 'sa', 'ses', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
  "qu est ce", "c est", "je", "tu", "il", "elle", "nous", "vous", "ils", "elles",
  "suis", "es", "sommes", "etes", "sont", "y", "a", "t", "dans", "par", "pour",
  "obtenir", "avoir", "sur", "avec", "cette", "ces", "peut", "on", "etre", "aussi",
  "donc", "pas", "plus", "tout", "doit", "faut", "bien", "entre", "apres", "avant",
  "comme", "quels", "tres", "cas", "deja", "dit", "moi", "lui", "eux", 'si',
  'non', 'oui', 'merci', 'bonjour', 'svp', 'sil', 'plait', 'jai', 'dit', 'veut',
]);

const extractMeaningfulKeywords = (query: string): string[] => {
  const normalized = normalizeText(query);
  const withoutPunctuation = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'"]/g, "");
  return withoutPunctuation
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word));
};

// ═══════════════════════════════════════════════════════════════
// ARTICLE EXTRACTION
// ═══════════════════════════════════════════════════════════════

const findArticle = (lawId: string, articleNumber: number): string | null => {
  const law = legalTexts.find(l => l.id === lawId);
  if (!law) return null;
  const regex = new RegExp(`(?:Art\\.|Article)[\\s.]*${articleNumber}[\\s.]([\\s\\S]*?)(?=(?:Art\\.|Article)[\\s.]*(?:${articleNumber + 1})[\\s.]|$)`, 'i');
  const match = law.content.match(regex);
  return match ? `Art. ${articleNumber}. ${match[1].trim()}` : null;
};

const findMultipleArticles = (lawId: string, articles: number[]): string => {
  const law = legalTexts.find(l => l.id === lawId);
  const lawTitle = law?.title || '';
  const contents = articles.map(num => {
    const content = findArticle(lawId, num);
    return content || `Article ${num} non trouvé.`;
  });
  return `D'après la **${lawTitle}** :\n\n${contents.join('\n\n---\n\n')}`;
};

// Fuzzy search across all legal texts with scoring
const searchLegalTexts = (keywords: string[]): { snippet: string; source: string; articleNum: string; score: number }[] => {
  const results: { snippet: string; source: string; articleNum: string; score: number }[] = [];
  const uniqueSnippets = new Set<string>();
  const expandedKw = expandQueryWithSynonyms(keywords);

  legalTexts.forEach(law => {
    const articles = law.content.split(/(?=Art\.|Article)/i);
    articles.forEach(articleText => {
      if (articleText.trim().length < 20) return;
      const normalizedArticle = normalizeText(articleText);
      const articleHeaderMatch = articleText.match(/^(Art\.|Article)\s*\d+/i);
      const articleHeader = articleHeaderMatch ? articleHeaderMatch[0] : 'Section';

      // Score: exact keyword matches count 2, synonym matches count 1
      let score = 0;
      keywords.forEach(kw => { if (normalizedArticle.includes(kw)) score += 2; });
      expandedKw.forEach(kw => { if (normalizedArticle.includes(kw)) score += 0.5; });

      if (score >= 2) {
        const sentences = articleText.split(/(?<=[.;])\s+/);
        const relevantSentences = sentences.filter(sentence => {
          const ns = normalizeText(sentence);
          return expandedKw.some(kw => ns.includes(kw));
        }).slice(0, 4);

        if (relevantSentences.length > 0) {
          const snippet = relevantSentences.join(' ').trim();
          const snippetKey = snippet.substring(0, 80);
          if (!uniqueSnippets.has(snippetKey)) {
            results.push({ snippet: `**${articleHeader}** : ${snippet}`, source: law.title, articleNum: articleHeader, score });
            uniqueSnippets.add(snippetKey);
          }
        }
      }
    });
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 5);
};


// ═══════════════════════════════════════════════════════════════
// KNOWLEDGE BASE — Comprehensive intent definitions
// ═══════════════════════════════════════════════════════════════

interface IntentDef {
  keywords: string[];
  synonymKeywords?: string[]; // Alternative keyword sets
  law?: string;
  article?: number;
  articles?: number[];
  summary?: string;
  text?: string;
  relatedQuestions?: string[];
  category: 'general' | 'procedure' | 'medecin' | 'calcul' | 'recours' | 'droits' | 'pratique';
}

const INTENTS: Record<string, IntentDef> = {
  // ─── DÉFINITIONS GÉNÉRALES ───
  definition_accident_travail: {
    keywords: ['definition', 'accident', 'travail'],
    synonymKeywords: ['accident travail', 'at', 'sinistre professionnel'],
    law: 'loi_83_13', article: 6,
    relatedQuestions: ["Qu'est-ce qu'un accident de trajet ?", "Délai de déclaration d'un accident ?", "Obligations de l'employeur en cas d'accident ?"],
    category: 'general'
  },
  accident_trajet: {
    keywords: ['accident', 'trajet'],
    synonymKeywords: ['trajet domicile', 'accident route', 'parcours travail'],
    law: 'loi_83_13', article: 12,
    relatedQuestions: ["Quelle est la définition de l'accident du travail ?", "L'itinéraire dérouté est-il couvert ?"],
    category: 'general'
  },
  definition_maladie_pro: {
    keywords: ['maladie', 'professionnelle'],
    synonymKeywords: ['mp', 'tableau maladie', 'pathologie professionnelle'],
    summary: `Une **maladie professionnelle** est une affection contractée par le travailleur du fait de son activité professionnelle. Elle est reconnue comme telle si elle figure dans la liste des **tableaux de maladies professionnelles** annexée à la réglementation.

Chaque tableau précise :
- Les **maladies** ou symptômes reconnus
- Le **délai de prise en charge** (temps max entre la cessation d'exposition et la constatation)
- La **liste indicative des travaux** susceptibles de provoquer la maladie

**Base légale** : Articles 63 à 72 de la Loi 83-13.

La déclaration est faite par la victime ou ses ayants droit dans un **délai de 15 jours** après la première constatation médicale (Art. 71, Loi 83-13).`,
    relatedQuestions: ["Comment déclarer une maladie professionnelle ?", "Quels sont les tableaux de maladies professionnelles ?", "Quel est le délai de prise en charge ?"],
    category: 'general'
  },
  difference_ipp_invalidite: {
    keywords: ['difference', 'incapacite', 'invalidite'],
    synonymKeywords: ['ipp invalidite', 'distinction incapacite invalidite'],
    summary: `## IPP vs Invalidité — Deux régimes différents

| Critère | **IPP** (Incapacité Permanente) | **Invalidité** |
|---------|--------------------------------|----------------|
| **Origine** | Accident du travail ou maladie professionnelle | Maladie ou accident NON professionnel |
| **Loi** | Loi 83-13 (AT/MP) | Loi 83-11 (Assurances sociales) |
| **Évaluation** | Taux en % (barème indicatif) | 3 catégories : 1re, 2e, 3e |
| **Condition** | Toute séquelle, même minime | Réduction ≥ 50% de la capacité de travail |
| **Prestation** | Rente ou capital selon taux | Pension d'invalidité |
| **Cumul** | Cumulable avec salaire | Suspendue si reprise d'activité |
| **Révision** | Possible (Art. 58-59, Loi 83-13) | Selon catégorie |

**À retenir** : L'IPP indemnise une séquelle physique, l'invalidité compense une perte de capacité de gain.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Quelles sont les catégories d'invalidité ?", "Peut-on cumuler rente et salaire ?"],
    category: 'general'
  },
  incapacite_temporaire_permanente: {
    keywords: ['difference', 'temporaire', 'permanente'],
    synonymKeywords: ['itt ipp', 'incapacite temporaire permanente'],
    summary: `## Incapacité Temporaire vs Permanente

**🔄 Incapacité Temporaire de Travail (ITT)** :
- Période d'arrêt de travail **AVANT** la consolidation
- Donne droit aux **indemnités journalières** (IJ) = 100% du salaire journalier de référence dès le 1er jour pour AT (Art. 37-38, Loi 83-13)
- Durée : jusqu'à consolidation ou guérison

**🔒 Incapacité Permanente Partielle (IPP)** :
- Séquelle définitive **APRÈS** consolidation
- Évaluée en **taux %** par le médecin conseil (barème indicatif)
- Si taux < 10% → **capital** forfaitaire unique
- Si taux ≥ 10% → **rente** trimestrielle (Art. 38, 42, Loi 83-13)

> ⚖️ La date pivot est la **consolidation** : elle marque le passage de l'ITT à l'IPP.`,
    relatedQuestions: ["Qu'est-ce que la consolidation ?", "Comment est calculée l'indemnité journalière ?", "Comment est fixé le taux d'incapacité ?"],
    category: 'general'
  },
  categories_invalidite: {
    keywords: ['categories', 'invalidite'],
    synonymKeywords: ['groupe invalidite', 'classe invalidite', 'type invalidite'],
    summary: `## Les 3 catégories d'invalidité (Loi 83-11, Art. 36)

| Catégorie | Définition | Pension |
|-----------|-----------|---------|
| **1re catégorie** | Invalide encore capable d'exercer une activité rémunérée réduite | 60% du salaire de référence |
| **2e catégorie** | Invalide incapable d'exercer une activité professionnelle quelconque | 80% du salaire de référence |
| **3e catégorie** | Invalide nécessitant l'aide constante d'une tierce personne | 80% + majoration tierce personne |

**Conditions** : Réduction d'au moins **50%** de la capacité de travail ou de gain, constatée par le médecin conseil.

**Attribution** : La catégorie est fixée par la commission d'invalidité de wilaya (Art. 33, Loi 08-08).`,
    relatedQuestions: ["Composition de la commission d'invalidité ?", "Différence incapacité / invalidité ?", "Conditions pour une tierce personne ?"],
    category: 'general'
  },

  // ─── RÔLE DU MÉDECIN ───
  certificat_medical_initial: {
    keywords: ['certificat', 'medical', 'initial'],
    synonymKeywords: ['role medecin traitant', 'cmi', 'certificat initial'],
    summary: `## Certificats médicaux en AT/MP

Le médecin traitant établit **deux certificats essentiels** :

### 📋 1. Le Certificat Médical Initial (CMI)
- Établi par le médecin traitant librement choisi par la victime
- Doit décrire en détail :
  - L'état de la victime et la nature des lésions
  - Le lien possible avec l'accident
  - La durée probable de l'incapacité de travail
- **Réf** : Art. 22-23 de la Loi 83-13

### 📋 2. Le Certificat Médical Final (CMF)
- Établi à la fin du traitement, il indique :
  - **Guérison** sans séquelle → fin de prise en charge
  - **Consolidation** avec séquelles définitives → évaluation IPP
- **Réf** : Art. 22, 24 de la Loi 83-13

> ⚠️ **Attention** : Le CMI doit être descriptif et objectif. Éviter les formulations vagues comme "suite à un accident". Décrire les lésions constatées cliniquement.`,
    relatedQuestions: ["Qu'est-ce que la consolidation ?", "La victime peut-elle choisir son médecin ?", "Quel est le rôle du médecin conseil ?"],
    category: 'medecin'
  },
  role_medecin_conseil: {
    keywords: ['role', 'medecin', 'conseil'],
    synonymKeywords: ['mission medecin conseil', 'attributions medecin conseil', 'controle medical'],
    summary: `## 🩺 Le rôle du Médecin Conseil

Le médecin conseil de l'organisme de sécurité sociale a **5 missions principales** :

### 1. Contrôle médical
Vérifier la justification des arrêts de travail et la pertinence des prescriptions (Art. 64, Loi 83-11).

### 2. Évaluation de l'IPP
Fixer le taux d'incapacité permanente après consolidation, en se basant sur le **barème indicatif** (Art. 42, Loi 83-13).

### 3. Avis sur la consolidation
Déterminer la date à laquelle les lésions sont stabilisées et ne sont plus susceptibles d'amélioration thérapeutique.

### 4. Contrôle des soins
Vérifier l'adéquation entre les soins prescrits et l'état de santé de la victime, y compris les arrêts prolongés.

### 5. Expertise médicale
Représenter la CNAS dans les procédures d'expertise en cas de litige (Art. 22, Loi 08-08). Ses conclusions font autorité, sauf contre-expertise.

> 💡 **En pratique** : Le médecin conseil n'est pas le médecin traitant de la victime. Il a un rôle de **contrôle et d'évaluation**, pas de soin.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Procédure d'expertise médicale ?", "Comment contester l'avis du médecin conseil ?"],
    category: 'medecin'
  },
  consolidation: {
    keywords: ['consolidation'],
    synonymKeywords: ['date consolidation', 'definition consolidation', 'consolide'],
    summary: `## 📅 La Consolidation (Art. 24, Loi 83-13)

La **consolidation** est le moment où les lésions se stabilisent et ne sont plus susceptibles d'amélioration par un traitement actif.

### Ce que ce n'est PAS :
- ❌ Ce n'est pas la guérison (il peut rester des séquelles)
- ❌ Ce n'est pas la fin des douleurs
- ❌ Ce n'est pas la reprise du travail

### Ce que c'est :
- ✅ Le point de stabilisation médical
- ✅ Le moment pivot entre ITT et IPP
- ✅ La date à partir de laquelle on évalue les séquelles définitives

### Qui la fixe ?
Le **médecin conseil** de la CNAS, sur avis du médecin traitant. Elle peut être contestée via la procédure d'expertise médicale (Loi 08-08).

### Conséquences :
| Avant consolidation | Après consolidation |
|---------------------|---------------------|
| Indemnités journalières | Rente ou capital (IPP) |
| Soins à 100% | Soins liés aux séquelles |
| Incapacité temporaire | Incapacité permanente |`,
    relatedQuestions: ["Comment contester la date de consolidation ?", "Comment est fixé le taux d'incapacité ?", "Différence incapacité temporaire/permanente ?"],
    category: 'medecin'
  },
  fixation_taux_incapacite: {
    keywords: ['fixer', 'taux', 'incapacite'],
    synonymKeywords: ['comment fixe ipp', 'evaluation ipp', 'calcul taux', 'taux ipp'],
    summary: `## 📊 Fixation du taux d'IPP (Art. 42, Loi 83-13)

Le taux d'incapacité est fixé par le médecin conseil en tenant compte de :

### Les éléments d'évaluation :
1. **Nature de l'infirmité** : type et gravité des lésions
2. **État général** de la victime (âge, état antérieur)
3. **Aptitudes et qualification professionnelle** : impact sur la vie professionnelle
4. **Barème indicatif** : guide des taux par type de séquelle

### La méthode :
- Le médecin conseil procède à un **examen clinique** complet
- Il compare l'état actuel aux données du barème
- En cas de **lésions multiples**, il applique la formule de **Balthazard** : \`IPP globale = 1 - [(1-a) × (1-b) × ...]\`
- Un **taux social** peut être ajouté (max 5%) selon l'impact professionnel

### Le résultat :
| Taux IPP | Prestation |
|----------|-----------|
| < 10% | Capital forfaitaire unique |
| ≥ 10% | Rente trimestrielle = salaire × taux |

> 💡 Le barème est **indicatif**, pas obligatoire. Le médecin conseil peut s'en écarter avec motivation.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Prise en charge d'un état antérieur ?", "Procédure de révision d'un taux ?"],
    category: 'medecin'
  },
  etat_anterieur: {
    keywords: ['etat', 'anterieur'],
    synonymKeywords: ['antecedent', 'preexistant', 'capacite restante', 'art 12'],
    summary: `## ⚕️ L'état antérieur (Art. 10 & Art. 14, Loi 83-13)

L'état antérieur désigne toute pathologie ou infirmité préexistante à l'accident du travail.

### Le principe (Art. 10) :
> « Sont considérés comme accidents du travail les accidents survenus du fait ou à l'occasion du travail, **quelle qu'en soit la cause**. »

### La règle pratique (Art. 14) :
Si la victime avait déjà un état antérieur (ex: IPP de 15% à un genou), le calcul du nouveau taux tient compte de la **capacité restante** :

**Formule (Balthazard / Art. 12)** :
\`Capacité restante = 100% - taux antérieur\`
\`Nouveau taux = Capacité restante × taux barème séquelles\`

**Exemple concret** :
- État antérieur : genou droit IPP = 15%
- Capacité restante : 100% - 15% = **85%**
- Nouvelle lésion (barème) : 20%  
- Taux réel : 85% × 20% = **17%** (au lieu de 20%)
- IPP globale : 15% + 17% = **32%** (Balthazard)

> ⚠️ L'état antérieur ne doit pas pénaliser la victime : la prise en charge couvre **l'ensemble** des conséquences de l'accident, même si elles sont aggravées par l'état préexistant.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Comment fonctionne la formule de Balthazard ?", "Procédure de révision d'un taux ?"],
    category: 'medecin'
  },

  // ─── DÉCLARATION ET DÉLAIS ───
  delai_declaration_accident: {
    keywords: ['delai', 'declaration', 'accident'],
    synonymKeywords: ['combien temps declarer', 'delai declaration at'],
    summary: `## ⏰ Délais de déclaration (Art. 13-14, Loi 83-13)

### Accident du travail :
| Qui | Délai | Comment |
|-----|-------|---------|
| **Employeur** | **48 heures** | Déclaration à la CNAS |
| **Victime** (à défaut) | **4 ans** maximum | Si l'employeur n'a pas déclaré |

### Maladie professionnelle :
| Qui | Délai |
|-----|-------|
| **Victime** ou ayants droit | **15 jours** après la 1re constatation médicale (Art. 71) |

### Rechute / Aggravation :
| Qui | Délai |
|-----|-------|
| **Victime** | Certificat médical de rechute à la CNAS |

> ⚠️ **Important** : La journée de l'accident est entièrement à la charge de l'employeur (Art. 35, Loi 83-13). Les indemnités journalières de la CNAS commencent le lendemain.`,
    relatedQuestions: ["Obligations de l'employeur en cas d'accident ?", "Que faire si l'employeur refuse de déclarer ?", "Comment déclarer une maladie professionnelle ?"],
    category: 'procedure'
  },
  declaration_maladie_pro: {
    keywords: ['declaration', 'maladie'],
    synonymKeywords: ['declarer mp', 'declaration maladie professionnelle'],
    law: 'loi_83_13', article: 71,
    relatedQuestions: ["Qu'est-ce qu'une maladie professionnelle ?", "Quel est le délai de prise en charge ?", "Quels sont les tableaux MP ?"],
    category: 'procedure'
  },
  non_declaration_employeur: {
    keywords: ['employeur', 'refuse', 'declare'],
    synonymKeywords: ['employeur pas declare', 'refus declaration', 'patron refuse'],
    summary: `## 🚫 Employeur refuse de déclarer ? (Art. 14, Loi 83-13)

Si l'employeur refuse ou omet de déclarer l'accident, la victime a des **droits protecteurs** :

### Solution 1 : Déclaration par la victime
La victime ou ses ayants droit peuvent déclarer directement l'accident à la CNAS, dans un **délai maximum de 4 ans** à compter de la date de l'accident (Art. 14, Loi 83-13).

### Solution 2 : Constitution de preuves
- Certificat médical initial mentionnant les circonstances
- Témoignages de collègues
- Tout document attestant le lieu et l'heure de l'accident

### Sanctions pour l'employeur :
L'employeur s'expose à des **sanctions pénales** pour non-déclaration (Art. 76 et suivants, Loi 83-13).

> 💡 **Conseil pratique** : Même en cas de réticence de l'employeur, la victime doit impérativement consulter un médecin et obtenir un CMI, puis se rendre à la CNAS avec ce certificat pour déposer sa propre déclaration.`,
    relatedQuestions: ["Délai de déclaration d'un accident ?", "Obligations de l'employeur ?", "Comment obtenir la feuille d'accident ?"],
    category: 'procedure'
  },
  obligations_employeur: {
    keywords: ['obligations', 'employeur'],
    synonymKeywords: ['devoir patron', 'responsabilite employeur', 'employeur doit'],
    summary: `## 📋 Obligations de l'employeur (Loi 83-13)

| Obligation | Détail | Article |
|-----------|--------|---------|
| **Déclaration** | Déclarer l'accident à la CNAS dans les **48h** | Art. 13 |
| **Feuille d'accident** | Délivrer à la victime la feuille d'accident (gratuité des soins) | Art. 15 |
| **Salaire jour J** | Payer intégralement la journée de travail de l'accident | Art. 35 |
| **Premiers soins** | Fournir les premiers secours sur le lieu de travail | Art. 16 |
| **Transport** | Assurer le transport de la victime vers le service médical le plus proche | Art. 16 |
| **Prévention** | Mettre en œuvre les mesures de prévention nécessaires | Art. 73+ |
| **Cotisations** | Verser les cotisations AT/MP à la CNAS | Loi 83-14 |

> ⚠️ En cas de **faute inexcusable** de l'employeur, la victime a droit à une majoration de sa rente (Art. 45, Loi 83-15).`,
    relatedQuestions: ["Délai de déclaration d'un accident ?", "Qu'est-ce que la faute inexcusable ?", "Que faire si l'employeur refuse de déclarer ?"],
    category: 'procedure'
  },

  // ─── PRESTATIONS ET CALCULS ───
  calcul_indemnite_journaliere: {
    keywords: ['calcul', 'indemnite', 'journaliere'],
    synonymKeywords: ['ij', 'ijt', 'indemnites journalieres', 'montant ij'],
    summary: `## 💰 Calcul des indemnités journalières (Art. 37-38, Loi 83-13)

### Le calcul :
\`IJ = Salaire journalier de référence × 100%\`

Le salaire de référence est le **1/30e** du salaire du mois précédant l'arrêt.

### Les spécificités AT/MP :
| Critère | AT/MP | Maladie ordinaire |
|---------|-------|-------------------|
| **Taux** | **100%** dès le 1er jour | 50% puis 100% |
| **Début** | J+1 après l'accident | Après carence de 3 jours |
| **Durée max** | Jusqu'à consolidation | Variable |
| **À la charge de** | CNAS à 100% | CNAS |

### Rappel important :
- Le **jour de l'accident** est payé par l'employeur (Art. 35)
- Les IJ commencent le **lendemain** (Art. 36)
- Aucun délai de carence en AT/MP

> 💡 Le médecin conseil peut réduire ou suspendre les IJ s'il constate que l'arrêt n'est plus justifié médicalement.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Qu'est-ce que la consolidation ?", "Différence incapacité temporaire/permanente ?"],
    category: 'calcul'
  },
  calcul_rentes: {
    keywords: ['calcul', 'rentes'],
    synonymKeywords: ['montant rente', 'rente ipp', 'pension at', 'capital ipp'],
    summary: `## 💰 Calcul des rentes AT/MP (Art. 38-45, Loi 83-13)

### Si taux IPP < 10% → **Capital forfaitaire unique**
Versement unique calculé sur la base du salaire annuel et du taux.

### Si taux IPP ≥ 10% → **Rente trimestrielle**

**Formule de base** :
\`Rente annuelle = Salaire annuel × Taux utile\`

**Calcul du taux utile** :
- La portion du taux ≤ 50% est réduite de moitié
- La portion du taux > 50% est majorée de moitié

| Taux IPP | Taux utile | Explication |
|----------|-----------|-------------|
| 30% | 15% | 30/2 = 15% |
| 60% | 40% | (50/2) + (10×1.5) = 25% + 15% |
| 80% | 70% | (50/2) + (30×1.5) = 25% + 45% |
| 100% | 100% | (50/2) + (50×1.5) = 25% + 75% |

### Majoration pour tierce personne :
Si la victime nécessite l'aide d'une tierce personne, la rente est majorée de **40%** (Art. 46).

> 💡 La rente AT/MP est **cumulable** avec un salaire, contrairement à la pension d'invalidité.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Conditions pour tierce personne ?", "Peut-on cumuler rente et salaire ?"],
    category: 'calcul'
  },
  cumul_rente_salaire: {
    keywords: ['cumul', 'rente', 'salaire'],
    synonymKeywords: ['cumuler rente', 'travailler avec rente'],
    text: `Oui, le **cumul** d'une rente d'accident du travail avec un salaire est **autorisé** sans aucune réduction.

**Le principe** : La rente AT/MP indemnise la **perte de capacité physique** (le dommage corporel), tandis que le salaire rémunère le **travail effectivement fourni**.

Ce sont deux objets juridiques différents → pas d'incompatibilité.

> ⚠️ Attention, à ne pas confondre avec la **pension d'invalidité** (Loi 83-11) qui peut être suspendue en cas de reprise d'activité au-delà d'un certain seuil. (Réf: Loi 83-13 et Loi 83-11)`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Différence incapacité / invalidité ?", "Catégories d'invalidité ?"],
    category: 'calcul'
  },
  tierce_personne: {
    keywords: ['tierce', 'personne'],
    synonymKeywords: ['aide domicile', 'assistance tierce', 'dependance', 'majoration tierce'],
    summary: `## 🤝 Majoration pour tierce personne (Art. 46, Loi 83-13)

### Conditions :
La victime doit, suite à l'accident du travail, être dans l'**impossibilité d'accomplir les actes ordinaires de la vie** et nécessiter l'assistance **constante** d'une tierce personne.

### Montant :
Majoration de **40%** de la rente d'incapacité, avec un minimum fixé réglementairement.

### Évaluation :
Le médecin conseil évalue la dépendance en considérant :
- Se lever, se coucher, s'habiller
- Se déplacer au domicile
- S'alimenter seul
- Assurer son hygiène personnelle

### Texte de référence :
Art. 46 de la Loi 83-13 : *« La victime titulaire d'une rente et qui est reconnue atteinte d'une incapacité l'obligeant à avoir recours à l'assistance d'une tierce personne pour effectuer les actes ordinaires de la vie, a droit à une majoration de sa rente fixée à 40%. »*`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Catégories d'invalidité ?", "Quels sont les droits en cas de décès ?"],
    category: 'droits'
  },
  prestations_en_nature: {
    keywords: ['prestations', 'nature'],
    synonymKeywords: ['soins gratuits', 'prise charge soins', 'couverture medicale at'],
    summary: `## 🏥 Prestations en nature AT/MP (Art. 29-34, Loi 83-13)

Les prestations en nature couvrent à **100%** (pas de ticket modérateur) :

| Prestation | Détail |
|-----------|--------|
| 🩺 **Soins médicaux/chirurgicaux** | Consultations, hospitalisations, interventions |
| 💊 **Frais pharmaceutiques** | Médicaments, produits pharmaceutiques |
| 🦿 **Appareillage** | Prothèses, orthèses (fourniture, réparation, renouvellement) |
| 🏋️ **Rééducation fonctionnelle** | Kinésithérapie, réadaptation |
| 🚑 **Transport** | Ambulance, frais de déplacement pour soins/contrôle |
| 🏗️ **Réadaptation professionnelle** | Formation pour reconversion si nécessaire |

> ⚠️ Le taux de remboursement est de **100%** pour les AT/MP, contre **80%** pour la maladie ordinaire. C'est un avantage majeur à ne pas négliger dans la qualification de l'accident.`,
    relatedQuestions: ["Les frais de transport sont-ils pris en charge ?", "Les soins à l'étranger sont-ils remboursés ?", "La victime peut-elle choisir son médecin ?"],
    category: 'droits'
  },
  frais_transport: {
    keywords: ['frais', 'transport'],
    synonymKeywords: ['remboursement transport', 'ambulance', 'deplacement medical'],
    text: `Les **frais de transport** de la victime sont pris en charge par la sécurité sociale pour :

- 🚑 **Transport en ambulance** si l'état l'exige
- 📋 **Convocations** pour contrôle médical ou expertise CNAS
- 🏥 **Soins éloignés** du domicile (établissement spécialisé)

Les frais sont remboursés sur la base du **tarif le moins onéreux** compatible avec l'état de santé de la victime.

**Réf** : Art. 9, Loi 83-11 et Art. 85, Loi 83-13.`,
    relatedQuestions: ["Quelles sont les prestations en nature ?", "Les soins à l'étranger sont-ils pris en charge ?"],
    category: 'droits'
  },
  choix_medecin: {
    keywords: ['victime', 'choisir', 'medecin'],
    synonymKeywords: ['libre choix medecin', 'quel medecin', 'choix praticien'],
    text: `Oui, la victime d'un accident du travail a le **droit de choisir librement** le praticien qui établira :
- Le **certificat médical initial** (CMI)
- Le **certificat médical final** (guérison ou consolidation)

Ce droit au libre choix est garanti par l'**Article 22 de la Loi 83-13**.

> 💡 En pratique, il est recommandé de consulter un médecin **le jour même** de l'accident et d'obtenir un certificat détaillé décrivant toutes les lésions constatées.`,
    relatedQuestions: ["Contenu du certificat médical initial ?", "Quel est le rôle du médecin conseil ?"],
    category: 'droits'
  },
  droits_deces_victime: {
    keywords: ['deces', 'victime'],
    synonymKeywords: ['mort travailleur', 'droit conjoint', 'ayants droit', 'rente deces'],
    summary: `## ⚰️ Droits en cas de décès (Art. 52-55, Loi 83-13)

Si la victime décède suite à un AT/MP, les **ayants droit** bénéficient de :

### Rentes aux survivants :
| Bénéficiaire | Taux de la rente |
|-------------|------------------|
| **Conjoint** | 75% du salaire de référence |
| **Chaque enfant** à charge | 15% (ou 30% si orphelin de père et mère) |
| **Ascendants** à charge | 10% chacun |

> Le total des rentes ne peut dépasser **85%** du salaire de référence.

### Frais funéraires :
Pris en charge par la CNAS dans la limite d'un plafond réglementaire.

### Capital décès :
Un capital décès peut être versé en complément selon les conditions d'assurance.

**Réf** : Articles 52 à 55, Loi 83-13.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Conditions pour la tierce personne ?"],
    category: 'droits'
  },
  soins_etranger: {
    keywords: ['soins', 'etranger'],
    synonymKeywords: ['traitement etranger', 'hopital etranger', 'transfert medical'],
    summary: `## 🌍 Soins à l'étranger (Art. 83, Loi 83-11)

Les soins à l'étranger peuvent être pris en charge sous conditions strictes :

### Conditions :
1. L'affection ne peut être traitée en Algérie (insuffisance technique)
2. Accord préalable de la commission médicale spécialisée
3. Le traitement doit être disponible dans le pays choisi

### Procédure :
1. Demande motivée du médecin traitant
2. Avis du médecin conseil de la CNAS
3. Décision de la commission compétente
4. Si accord → prise en charge des soins ET du transport

> ⚠️ Sans accord préalable, les frais ne seront **pas remboursés**.`,
    relatedQuestions: ["Quelles sont les prestations en nature ?", "Les frais de transport sont-ils pris en charge ?"],
    category: 'droits'
  },
  sequelles_psychologiques: {
    keywords: ['sequelles', 'psychologiques'],
    synonymKeywords: ['stress post traumatique', 'ptsd', 'nevrose', 'psychiatrique', 'psychique'],
    text: `Oui, les **séquelles psychologiques et psychiatriques** sont indemnisables en AT/MP.

### Pathologies reconnues :
- **Névroses post-traumatiques** / TSPT (Trouble de Stress Post-Traumatique)
- Syndromes anxio-dépressifs réactionnels
- Phobies spécifiques liées à l'accident

### Évaluation :
Le médecin conseil évalue ces séquelles **au même titre** que les séquelles physiques, en se basant sur le barème indicatif (chapitre "Psychiatrie" du barème).

### Taux indicatifs (barème) :
| Pathologie | Taux IPP |
|-----------|----------|
| Névrose post-traumatique légère | 3-10% |
| Névrose post-traumatique modérée | 10-20% |
| Névrose post-traumatique sévère | 20-40% |

> 💡 Ces séquelles nécessitent souvent un examen spécialisé (psychiatre) pour être correctement évaluées.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Prise en charge d'un état antérieur ?"],
    category: 'medecin'
  },
  faute_victime: {
    keywords: ['faute', 'victime'],
    synonymKeywords: ['imprudence victime', 'negligence victime', 'responsabilite victime'],
    text: `En AT/MP, le régime est basé sur le **risque professionnel**, pas sur la faute :

✅ **Principe** : L'indemnisation est due **même si** l'accident est causé par une imprudence ou une négligence de la victime.

❌ **Seule exception** : La **faute intentionnelle** de la victime. Si elle est prouvée, elle peut supprimer le droit à réparation.

> En d'autres termes : si un ouvrier se coupe en utilisant une machine sans les gants de protection, il reste couvert. Mais s'il se blesse volontairement, il ne l'est plus.

**Réf** : Principe général du droit de la sécurité sociale, Loi 83-13.`,
    relatedQuestions: ["Qu'est-ce que la faute inexcusable ?", "Définition de l'accident du travail ?"],
    category: 'general'
  },

  // ─── RECOURS ET EXPERTISE ───
  procedure_expertise: {
    keywords: ['procedure', 'expertise'],
    synonymKeywords: ['expertise medicale', 'comment contester', 'contester avis medecin'],
    summary: `## ⚖️ Procédure d'expertise médicale (Loi 08-08)

### Étape 1 — Demande (Art. 20)
L'assuré formule une demande écrite, accompagnée d'un rapport de son médecin traitant, dans un **délai de 15 jours** après notification de la décision CNAS.

### Étape 2 — Désignation de l'expert (Art. 21-24)
- La CNAS propose **au moins 3 experts** 
- L'assuré a **8 jours** pour répondre
- En l'absence de réponse → la CNAS désigne d'office

### Étape 3 — Déroulement (Art. 25-26)
- L'expert reçoit les 2 dossiers (médecin traitant + médecin conseil)
- Il convoque la victime pour examen
- Rapport rendu dans les **15 jours**

### Étape 4 — Conclusion (Art. 19, 27)
- Les conclusions de l'expert **s'imposent** aux deux parties
- La CNAS notifie la décision finale

### Frais (Art. 29)
Honoraires à la charge de la CNAS, sauf si la demande est manifestement infondée.

> 💡 **Conseil** : Préparez un dossier médical solide (imagerie, comptes-rendus, avis spécialisé) pour appuyer votre demande d'expertise.`,
    relatedQuestions: ["Délais pour contester une décision CNAS ?", "Honoraires du médecin expert ?", "Le recours préalable est-il obligatoire ?"],
    category: 'recours'
  },
  delai_expertise: {
    keywords: ['delai', 'expertise'],
    synonymKeywords: ['combien temps expertise', 'delai contester medical'],
    law: 'loi_08_08', article: 20,
    relatedQuestions: ["Procédure d'expertise médicale ?", "Honoraires du médecin expert ?"],
    category: 'recours'
  },
  honoraires_expert: {
    keywords: ['honoraires', 'expert'],
    synonymKeywords: ['cout expertise', 'frais expert', 'payer expertise'],
    law: 'loi_08_08', article: 29,
    relatedQuestions: ["Procédure d'expertise médicale ?"],
    category: 'recours'
  },
  recours_prealable: {
    keywords: ['recours', 'prealable'],
    synonymKeywords: ['recours obligatoire', 'commission recours', 'avant tribunal'],
    summary: `## ⚖️ Le recours préalable obligatoire (Art. 4, Loi 08-08)

Avant tout recours judiciaire, l'assuré **DOIT** saisir les commissions de recours préalable.

### Le circuit obligatoire :

1️⃣ **Commission locale de recours** (1er ressort)
   - Siège : agence de wilaya CNAS
   - Délai pour saisir : **15 jours** après notification (Art. 8)
   - La commission a **30 jours** pour statuer (Art. 7)

2️⃣ **Commission nationale de recours** (2e ressort, si contestation)
   - Recours contre la décision de la commission locale

3️⃣ **Tribunal** (juridiction compétente)
   - Uniquement **après** épuisement des recours préalables
   - Irrecevabilité si recours préalable non effectué

> ⚠️ **Piège fréquent** : Beaucoup d'assurés saisissent directement le tribunal → leur requête est déclarée **irrecevable**. Le recours préalable n'est pas facultatif.`,
    relatedQuestions: ["Délais pour contester une décision CNAS ?", "Composition de la commission locale ?", "Procédure d'expertise médicale ?"],
    category: 'recours'
  },
  delais_contestation: {
    keywords: ['delais', 'contester'],
    synonymKeywords: ['delai recours', 'combien temps contester', 'prescription contestation'],
    summary: `## ⏱️ Délais de contestation (Loi 08-08)

| Type de litige | Délai | Où ? | Article |
|---------------|-------|------|---------|
| **Contentieux général** (non-médical) | **15 jours** | Commission locale de recours | Art. 8 |
| **Contentieux médical** (expertise) | **15 jours** | Demande d'expertise à la CNAS | Art. 20 |
| **Taux IPP / État d'invalidité** | **30 jours** | Commission d'invalidité de wilaya | Art. 33 |
| **Appel decision commission locale** | **15 jours** | Commission nationale de recours | Art. 12 |

> ⚠️ Ces délais courent à compter de la **date de réception de la notification**. Passé ce délai, la décision devient **définitive**.

> 💡 **Conseil** : Toujours conserver l'accusé de réception de la notification CNAS comme preuve de la date de départ du délai.`,
    relatedQuestions: ["Le recours préalable est-il obligatoire ?", "Procédure d'expertise médicale ?", "Comment contester le taux d'IPP ?"],
    category: 'recours'
  },
  composition_commission_invalidite: {
    keywords: ['commission', 'invalidite'],
    synonymKeywords: ['composition commission', 'membres commission'],
    law: 'loi_08_08', article: 32,
    relatedQuestions: ["Catégories d'invalidité ?", "Délais de contestation ?"],
    category: 'recours'
  },
  composition_commission_locale: {
    keywords: ['commission', 'locale', 'recours'],
    law: 'loi_08_08', article: 6,
    relatedQuestions: ["Le recours préalable est-il obligatoire ?"],
    category: 'recours'
  },

  // ─── RECHUTE ET RÉVISION ───
  rechute: {
    keywords: ['rechute'],
    synonymKeywords: ['gerer rechute', 'demande rechute', 'reouverture dossier'],
    summary: `## 🔄 La rechute (Art. 62, Loi 83-13)

### Définition légale :
> *« En cas de rechute de la victime, entraînant la nécessité d'un traitement médical, qu'il y ait ou non nouvelle incapacité temporaire... »*

### Les 2 conditions cumulatives :
1. **Modification effective** de l'état de santé (Art. 58) — pas juste la persistance des douleurs
2. **Nécessité d'un traitement médical** actif (Art. 62) — médicaments, kiné, chirurgie

### Procédure :
1. La victime consulte son médecin traitant
2. Le médecin établit un **certificat médical de rechute**
3. La victime dépose le certificat à la CNAS
4. Le médecin conseil examine la demande
5. Décision : prise en charge ou rejet

### Intervalles légaux (Art. 59) :
| Période | Intervalle minimum entre 2 demandes |
|---------|-------------------------------------|
| 0-2 ans après consolidation | **3 mois** |
| Après 2 ans | **1 an** |

> ⚠️ Si l'intervalle n'est pas respecté → **rejet administratif** avant même l'examen médical.`,
    relatedQuestions: ["Types de rejet de rechute ?", "Procédure de révision du taux ?", "Qu'est-ce que l'aggravation ?"],
    category: 'procedure'
  },
  revision_taux: {
    keywords: ['revision', 'taux'],
    synonymKeywords: ['reviser ipp', 'modifier taux', 'reevaluer incapacite'],
    summary: `## 📊 Révision du taux d'IPP (Art. 58-59, Loi 83-13)

### Principe :
La rente d'incapacité peut être révisée en cas d'**aggravation ou d'atténuation** de l'état de santé, postérieurement à la consolidation.

### Condition sine qua non :
> **« Modification effective »** de l'état de la victime (Art. 58)

Cela signifie qu'il faut prouver un **changement objectif** : clinique (réduction d'amplitude, nouvelle imagerie) ou paraclinique.

### Périodicité des contrôles (Art. 59) :
| Période | Fréquence |
|---------|-----------|
| 0-2 ans après consolidation | Tous les **3 mois** maximum |
| Après 2 ans | Tous les **1 an** minimum |

### Issue de la révision :
- **Aggravation** → nouveau taux plus élevé → rente augmentée
- **Atténuation** → taux diminué → rente réduite
- **État stationnaire** → pas de modification`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Qu'est-ce que l'aggravation au sens de la loi ?", "Types de rejet de rechute ?"],
    category: 'procedure'
  },
  definition_aggravation: { 
    keywords: ['aggravation'],
    synonymKeywords: ['definition aggravation', 'modification effective', 'aggravation definition'],
    summary: `## 📋 L'aggravation au sens juridique (Art. 58, Loi 83-13)

### Le texte de référence :
> *« La rente peut faire l'objet d'une révision en cas d'aggravation [...] de l'infirmité. La procédure est **limitée au cas de modification effective** de l'état de la victime. »*

### Ce que ce n'est PAS une aggravation :
- ❌ La simple persistance des douleurs (déjà présentes à la consolidation)
- ❌ Un ressenti subjectif de mal-être
- ❌ La demande motivée uniquement par des doléances

### Ce qu'EST une aggravation :
- ✅ Une **différence objective** entre l'état consolidé et l'état actuel
- ✅ Clinique : réduction mesurable des amplitudes, amyotrophie nouvelle, signes neurologiques
- ✅ Paraclinique : apparition/aggravation de lésions à l'imagerie

### Méthode du médecin conseil :
1. **Référentiel T0** : état consolidé initial (rapport de consolidation)
2. **Examen T+1** : état actuel à comparer objectivement
3. **Décision** :
   - Superposable → **État stationnaire** → Rejet (Art. 58 non rempli)
   - Dégradation objective → **Aggravation** → Si nécessite traitement (Art. 62) → Prise en charge`,
    relatedQuestions: ["Types de rejet de rechute ?", "Procédure de révision du taux ?", "Comment gérer une rechute ?"],
    category: 'medecin'
  },
  rejet_rechute: {
    keywords: ['rejet', 'rechute'],
    synonymKeywords: ['refus rechute', 'rechute rejetee', 'motif rejet'],
    summary: `## 🚫 Types de rejet de rechute

### 1. Rejet Administratif (Art. 59, Loi 83-13)
**Motif** : Intervalles non respectés.
- 0-2 ans après consolidation : demande tous les 3 mois maximum
- Après 2 ans : demande tous les 1 an minimum
→ Si délai non respecté → **irrecevable** avant examen médical

### 2. Rejet Médical — "État stationnaire" (Art. 58)
**Motif** : Pas de « modification effective » de l'état.
- Le médecin conseil constate que l'état clinique est **identique** à celui de la dernière évaluation
- Pas de changement objectif mesurable

### 3. Rejet Médical — "Soins non nécessaires" (Art. 62)
**Motif** : L'état ne nécessite pas de traitement médical actif.
- Même si aggravation mineure, pas de thérapeutique active requise

### Tableau récapitulatif :
| Type | Motif | Article |
|------|-------|---------|
| Administratif | Intervalle non respecté | Art. 59 |
| Médical | Pas de modification effective | Art. 58 |
| Médical | Soins non nécessaires | Art. 62 |

> 💡 Suite à un rejet, l'assuré peut demander une **expertise médicale** (Loi 08-08) dans les 15 jours.`,
    relatedQuestions: ["Procédure d'expertise médicale ?", "Délais de contestation ?", "Comment gérer une rechute ?"],
    category: 'recours'
  },
  faute_inexcusable: {
    keywords: ['faute', 'inexcusable'],
    synonymKeywords: ['faute grave employeur', 'responsabilite patronale'],
    summary: `## ⚖️ La faute inexcusable (Art. 45, Loi 83-15)

### Définition :
La faute inexcusable de l'employeur est caractérisée lorsqu'il avait ou aurait dû avoir conscience du danger auquel était exposé le travailleur et n'a pas pris les mesures nécessaires pour l'en préserver.

### Conséquences :
- **Majoration de la rente** de la victime (jusqu'au double du montant initial)
- **Indemnisation complémentaire** des préjudices personnels (souffrances, esthétique, agrément)
- La CNAS verse, puis se retourne contre l'employeur

### Éléments à prouver :
1. L'employeur avait connaissance du danger
2. Il n'a pas pris les mesures de prévention nécessaires
3. Lien entre ce manquement et l'accident

> 💡 La reconnaissance de la faute inexcusable ne supprime pas le droit aux prestations de base — elle les **majore**.`,
    relatedQuestions: ["Obligations de l'employeur ?", "Définition de l'accident du travail ?", "Comment sont calculées les rentes ?"],
    category: 'recours'
  },
  contester_consolidation: {
    keywords: ['contester', 'consolidation'],
    synonymKeywords: ['date consolidation fausse', 'refuser consolidation', 'consolidation prematuree'],
    text: `Oui, la date de consolidation fixée par le médecin conseil peut être **contestée**.

Ce litige relève du **contentieux médical** (Loi 08-08).

### Procédure :
1. Dans les **15 jours** suivant la notification → demande d'expertise médicale
2. Joindre un rapport de votre médecin traitant justifiant pourquoi la consolidation est prématurée
3. L'expert tranchera → sa décision s'impose

### Arguments courants :
- Traitement encore en cours (rééducation active)
- Évolution encore possible des lésions
- Intervention chirurgicale prévue

> 💡 **Important** : Tant que la consolidation n'est pas actée, la victime continue de percevoir les indemnités journalières.`,
    relatedQuestions: ["Qu'est-ce que la consolidation ?", "Procédure d'expertise médicale ?", "Délais de contestation ?"],
    category: 'recours'
  },

  // ─── PRATIQUE ───
  definition_contentieux_medical: {
    keywords: ['contentieux', 'medical'],
    law: 'loi_08_08', article: 17,
    relatedQuestions: ["Procédure d'expertise médicale ?", "Le recours préalable est-il obligatoire ?"],
    category: 'recours'
  },
  fonds_prevention: {
    keywords: ['fonds', 'prevention'],
    synonymKeywords: ['prevention at', 'cotisation prevention'],
    law: 'loi_83_13', articles: [73, 74, 75],
    relatedQuestions: ["Obligations de l'employeur ?"],
    category: 'pratique'
  },
};

// ═══════════════════════════════════════════════════════════════
// AI QUERY PROCESSOR — Fuzzy intent matching with scoring
// ═══════════════════════════════════════════════════════════════

const processQuery = (query: string, context?: ConversationContext): { text: string; relatedQuestions?: string[]; confidence: 'high' | 'medium' | 'low'; sources?: string[] } => {
  const normalizedQuery = normalizeText(query);
  const queryKeywords = extractMeaningfulKeywords(query);

  // ─── 1. Specific article lookup ───
  const articleMatch = normalizedQuery.match(/article\s*(\d+)\s*(?:de la loi\s*)?(\d{2,2}[\s-]\d{2,2})?/);
  if (articleMatch) {
    const articleNum = parseInt(articleMatch[1], 10);
    const lawNum = articleMatch[2]?.replace(/\s/g, '-');
    const lawId = lawNum ? `loi_${lawNum.replace('-', '_')}` : (context?.lastLawId || 'loi_83_13');
    
    const articleContent = findArticle(lawId, articleNum);
    if (articleContent) {
      const lawTitle = legalTexts.find(l => l.id === lawId)?.title || '';
      return {
        text: `Voici le contenu de l'**Article ${articleNum}** de la **${lawTitle}** :\n\n> ${articleContent}`,
        relatedQuestions: [`Article ${articleNum + 1} de la même loi ?`, `Article ${Math.max(1, articleNum - 1)} de la même loi ?`],
        confidence: 'high',
        sources: [lawTitle]
      };
    }
  }

  // ─── 2. Scored intent matching (fuzzy) ───
  const intentScores: { key: string; score: number; intent: IntentDef }[] = [];

  for (const [key, intent] of Object.entries(INTENTS)) {
    let score = 0;

    // Primary keywords: weighted match
    const primaryMatches = intent.keywords.filter(kw => normalizedQuery.includes(normalizeText(kw)));
    score += primaryMatches.length * 3;
    
    // Bonus if ALL primary keywords match
    if (primaryMatches.length === intent.keywords.length) score += 5;

    // Synonym keywords: check if any synonym phrase matches
    if (intent.synonymKeywords) {
      for (const synPhrase of intent.synonymKeywords) {
        const synWords = normalizeText(synPhrase).split(/\s+/);
        const synMatches = synWords.filter(sw => normalizedQuery.includes(sw));
        if (synMatches.length === synWords.length) score += 4; // Full synonym phrase match
        else score += synMatches.length * 0.5; // Partial
      }
    }

    // Query keywords match against intent keywords (expanded)
    const expandedIntentKw = expandQueryWithSynonyms(intent.keywords);
    queryKeywords.forEach(qk => {
      if (expandedIntentKw.includes(qk)) score += 1;
    });

    if (score > 2) {
      intentScores.push({ key, score, intent });
    }
  }

  intentScores.sort((a, b) => b.score - a.score);

  if (intentScores.length > 0) {
    const best = intentScores[0];
    const confidence: 'high' | 'medium' | 'low' = best.score >= 8 ? 'high' : best.score >= 4 ? 'medium' : 'low';
    const intent = best.intent;
    let text = '';
    const sources: string[] = [];

    if (intent.summary) {
      text = intent.summary;
    } else if (intent.text) {
      text = intent.text;
    } else if (intent.article && intent.law) {
      const articleContent = findArticle(intent.law, intent.article);
      const lawTitle = legalTexts.find(l => l.id === intent.law)?.title || '';
      sources.push(lawTitle);
      text = articleContent
        ? `D'après la **${lawTitle}** :\n\n> ${articleContent}`
        : `Le contenu de l'article ${intent.article} de la ${lawTitle} n'a pas pu être extrait. Consultez le texte intégral dans l'onglet "Textes de Loi".`;
    } else if (intent.articles && intent.law) {
      const lawTitle = legalTexts.find(l => l.id === intent.law)?.title || '';
      sources.push(lawTitle);
      if (intent.articles.length <= 3) {
        text = findMultipleArticles(intent.law, intent.articles);
      } else {
        text = `La réponse se trouve dans les articles **${intent.articles.join(', ')}** de la **${lawTitle}**.\n\nVous pouvez me demander un article spécifique (ex: "Article ${intent.articles[0]} de la loi ${intent.law.replace('loi_', '').replace('_', '-')}").`;
      }
    }

    return { text, relatedQuestions: intent.relatedQuestions, confidence, sources };
  }

  // ─── 3. Fallback: fuzzy search across legal texts ───
  if (queryKeywords.length > 0) {
    const results = searchLegalTexts(queryKeywords);
    if (results.length > 0) {
      const topResults = results.slice(0, 3);
      const snippets = topResults.map((r, i) => `**${i + 1}.** *(${r.source})* ${r.snippet}`).join('\n\n');
      const sources = [...new Set(topResults.map(r => r.source))];

      return {
        text: `J'ai trouvé **${results.length} résultat(s)** dans les textes de loi :\n\n${snippets}${results.length > 3 ? `\n\n*...et ${results.length - 3} autre(s) résultat(s). Affinez votre question pour plus de précision.*` : ''}`,
        relatedQuestions: ["Précisez votre question", "Demandez un article spécifique"],
        confidence: 'low',
        sources
      };
    }
  }

  // ─── 4. No results — helpful fallback ───
  return {
    text: `Je n'ai pas trouvé de réponse précise pour *"${query}"* dans les textes de loi que je connais.

### 💡 Suggestions :
- Reformulez avec des **termes juridiques** (ex: "consolidation", "rechute", "IPP", "rente")
- Demandez un **article spécifique** (ex: "Article 42 de la loi 83-13")
- Consultez les **textes intégraux** dans le 2e onglet
- Choisissez une des **suggestions** ci-dessous

### 📚 Textes que je connais :
${legalTexts.map(l => `- ${l.title}`).join('\n')}`,
    relatedQuestions: ["Définition accident du travail ?", "Procédure d'expertise médicale ?", "Comment est fixé le taux d'IPP ?", "Comment gérer une rechute ?"],
    confidence: 'low'
  };
};


// ═══════════════════════════════════════════════════════════════
// ENHANCED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════

const AiAvatar: React.FC = () => (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-200/50 ring-2 ring-primary-300/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L10 6.012l-3.763 1.57 1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
    </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 p-3 animate-fade-in">
        <AiAvatar />
        <div className="flex items-center space-x-1.5 p-3 bg-white rounded-2xl rounded-bl-lg border border-slate-200/90 shadow-sm">
            <div className="animate-bounce w-2 h-2 bg-primary-400 rounded-full [animation-delay:-0.3s]"></div>
            <div className="animate-bounce w-2 h-2 bg-primary-500 rounded-full [animation-delay:-0.15s]"></div>
            <div className="animate-bounce w-2 h-2 bg-primary-600 rounded-full"></div>
            <span className="text-xs text-slate-400 ml-2">Recherche en cours...</span>
        </div>
    </div>
);

const ConfidenceBadge: React.FC<{ confidence: 'high' | 'medium' | 'low' }> = ({ confidence }) => {
    const config = {
        high: { label: 'Réponse précise', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: '✓' },
        medium: { label: 'Réponse probable', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: '~' },
        low: { label: 'Résultat approximatif', color: 'bg-slate-100 text-slate-600 border-slate-200', icon: '?' }
    };
    const c = config[confidence];
    return (
        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${c.color}`}>
            <span className="font-bold">{c.icon}</span> {c.label}
        </span>
    );
};

// Markdown-like renderer for rich content (tables, headers, bold, lists, blockquotes)
const renderMarkdown = (text: string): string => {
    let html = text;

    // Tables: detect lines like | ... | ... | and convert
    const tableRegex = /(?:^|\n)(\|.+\|(?:\n\|[-:| ]+\|)?(?:\n\|.+\|)+)/gm;
    html = html.replace(tableRegex, (match) => {
        const rows = match.trim().split('\n').filter(r => r.trim());
        if (rows.length < 2) return match;
        
        let tableHtml = '<div class="overflow-x-auto my-3"><table class="min-w-full text-xs border-collapse">';
        const isSeparator = (row: string) => /^\|[\s:-]+\|$/.test(row.trim());
        
        let headerDone = false;
        for (const row of rows) {
            if (isSeparator(row)) { headerDone = true; continue; }
            const cells = row.split('|').filter((_, i, a) => i > 0 && i < a.length - 1).map(c => c.trim());
            if (!headerDone) {
                tableHtml += '<thead><tr>' + cells.map(c => `<th class="px-3 py-1.5 bg-slate-100 border border-slate-200 font-semibold text-slate-700 text-left">${c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</th>`).join('') + '</tr></thead><tbody>';
                headerDone = true;
            } else {
                tableHtml += '<tr>' + cells.map(c => `<td class="px-3 py-1.5 border border-slate-200 text-slate-600">${c.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</td>`).join('') + '</tr>';
            }
        }
        tableHtml += '</tbody></table></div>';
        return tableHtml;
    });

    // Headers ## and ###
    html = html.replace(/^### (.+)$/gm, '<h4 class="font-bold text-slate-800 mt-3 mb-1 text-sm flex items-center gap-1">$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3 class="font-bold text-slate-900 mt-4 mb-2 text-base border-b border-slate-200 pb-1">$1</h3>');

    // Blockquotes > 
    html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-3 border-primary-400 bg-primary-50/50 pl-3 py-1.5 my-2 text-sm italic text-slate-700 rounded-r">$1</blockquote>');

    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>');

    // Italic *text*
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-primary-700 px-1 py-0.5 rounded text-xs font-mono">$1</code>');

    // List items
    html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-700 list-disc my-0.5">$1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-slate-700 list-decimal my-0.5">$2</li>');

    // Emojis with numbering (1️⃣, 2️⃣ etc) — keep as-is

    // Legal references styling
    html = html.replace(/(Art(?:icle)?\.?\s*\d+(?:\s*(?:à|et|,)\s*\d+)*(?:\s*(?:de la |,\s*)?(?:Loi|loi)\s*\d{2,2}[-–]\d{2,2})?)/g, 
        '<span class="text-primary-600 font-medium">$1</span>');

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    // Fix consecutive <br/> after block elements
    html = html.replace(/<\/h[34]><br \/>/g, '</h4>');
    html = html.replace(/<\/blockquote><br \/>/g, '</blockquote>');
    html = html.replace(/<\/div><br \/>/g, '</div>');

    return html;
};

const MessageBubble: React.FC<{ message: Message; onFollowUp?: (q: string) => void }> = ({ message, onFollowUp }) => {
    const isUser = message.role === 'user';
    const renderedHtml = useMemo(() => isUser ? message.text : renderMarkdown(message.text), [message.text, isUser]);

    return (
        <div className={`flex items-end gap-3 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <AiAvatar />}
            <div className={`max-w-2xl ${isUser ? '' : 'space-y-2'}`}>
                <div 
                    className={`p-4 rounded-2xl shadow-sm ${
                        isUser 
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-lg' 
                        : 'bg-white text-slate-800 rounded-bl-lg border border-slate-200/90'
                    }`}
                >
                    {isUser ? (
                        <p className="text-sm">{message.text}</p>
                    ) : (
                        <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                    )}
                </div>

                {/* Confidence + Sources for bot messages */}
                {!isUser && (message.confidence || message.sources) && (
                    <div className="flex items-center gap-2 px-1 flex-wrap">
                        {message.confidence && <ConfidenceBadge confidence={message.confidence} />}
                        {message.sources?.map((s, i) => (
                            <span key={i} className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">📖 {s}</span>
                        ))}
                    </div>
                )}

                {/* Related questions */}
                {!isUser && message.relatedQuestions && message.relatedQuestions.length > 0 && onFollowUp && (
                    <div className="flex flex-wrap gap-1.5 px-1 mt-1">
                        {message.relatedQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => onFollowUp(q)}
                                className="text-xs text-primary-600 bg-primary-50 hover:bg-primary-100 px-2.5 py-1 rounded-full border border-primary-200 transition-colors flex items-center gap-1"
                            >
                                <span className="text-primary-400">→</span> {q}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Categorized suggestion data
interface QuestionCategory {
    icon: string;
    label: string;
    color: string;
    questions: string[];
}

const QUESTION_CATEGORIES: QuestionCategory[] = [
    {
        icon: '📋', label: 'Définitions', color: 'border-blue-300 bg-blue-50',
        questions: [
            "Définition accident du travail ?",
            "Qu'est-ce qu'un accident de trajet ?",
            "Qu'est-ce que la consolidation ?",
            "Qu'est-ce qu'une maladie professionnelle ?",
            "Différence incapacité / invalidité ?",
            "Différence incapacité temporaire / permanente ?",
        ]
    },
    {
        icon: '🩺', label: 'Médecin', color: 'border-emerald-300 bg-emerald-50',
        questions: [
            "Rôle du médecin conseil ?",
            "Contenu du certificat médical initial ?",
            "Comment est fixé le taux d'incapacité ?",
            "Prise en charge d'un état antérieur ?",
            "Les séquelles psychologiques sont-elles indemnisées ?",
            "Qu'est-ce que l'aggravation au sens de la loi ?",
        ]
    },
    {
        icon: '📝', label: 'Procédures', color: 'border-amber-300 bg-amber-50',
        questions: [
            "Délai de déclaration d'un accident ?",
            "Déclaration maladie professionnelle ?",
            "Obligations de l'employeur ?",
            "Comment gérer une rechute ?",
            "Procédure de révision du taux ?",
            "Que faire si l'employeur refuse de déclarer ?",
        ]
    },
    {
        icon: '💰', label: 'Calculs & Prestations', color: 'border-purple-300 bg-purple-50',
        questions: [
            "Calcul de l'indemnité journalière ?",
            "Comment sont calculées les rentes ?",
            "Peut-on cumuler rente et salaire ?",
            "Conditions pour une tierce personne ?",
            "Quelles sont les prestations en nature ?",
            "Les frais de transport sont-ils pris en charge ?",
        ]
    },
    {
        icon: '⚖️', label: 'Recours', color: 'border-red-300 bg-red-50',
        questions: [
            "Procédure d'expertise médicale ?",
            "Le recours préalable est-il obligatoire ?",
            "Délais pour contester une décision CNAS ?",
            "Types de rejet de rechute ?",
            "Qu'est-ce que la faute inexcusable ?",
            "Comment contester la date de consolidation ?",
        ]
    },
    {
        icon: '🛡️', label: 'Droits', color: 'border-teal-300 bg-teal-50',
        questions: [
            "La victime peut-elle choisir son médecin ?",
            "Droits en cas de décès de la victime ?",
            "Les soins à l'étranger sont-ils pris en charge ?",
            "Une faute de la victime annule-t-elle ses droits ?",
            "Catégories d'invalidité ?",
        ]
    }
];

const AiAssistantView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: 'initial', role: 'model', 
            text: `## 🏛️ Assistant Juridique — Guide du Médecin Conseil

Bonjour ! Je suis votre assistant spécialisé en **législation AT/MP algérienne**. Je peux vous aider sur :

- 📋 **Définitions légales** (accident du travail, consolidation, invalidité...)
- 🩺 **Rôle du médecin** (certificats, évaluation IPP, état antérieur...)
- 💰 **Calcul des prestations** (indemnités, rentes, tierce personne...)
- ⚖️ **Procédures et recours** (expertise, rechute, contestation...)

Posez votre question ou choisissez une suggestion ci-dessous.`,
            confidence: 'high'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationContext, setConversationContext] = useState<ConversationContext>({ topics: [], turnCount: 0 });
    const [showAllSuggestions, setShowAllSuggestions] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = useCallback((query?: string) => {
        const currentQuery = (query || input).trim();
        if (!currentQuery) return;

        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', text: currentQuery }]);
        setInput('');
        setIsLoading(true);
        setShowAllSuggestions(false);

        setTimeout(() => {
            const result = processQuery(currentQuery, conversationContext);
            const newMsg: Message = { 
                id: crypto.randomUUID(), 
                role: 'model', 
                text: result.text,
                relatedQuestions: result.relatedQuestions,
                confidence: result.confidence,
                sources: result.sources
            };
            setMessages(prev => [...prev, newMsg]);
            setIsLoading(false);

            // Update conversation context
            setConversationContext(prev => ({
                topics: [...prev.topics, currentQuery].slice(-5),
                turnCount: prev.turnCount + 1,
                lastLawId: result.sources?.length ? undefined : prev.lastLawId
            }));
        }, 400 + Math.random() * 400);
    }, [input, conversationContext]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearChat = () => {
        setMessages([{ 
            id: 'initial', role: 'model',
            text: `## 🏛️ Assistant Juridique — Guide du Médecin Conseil\n\nConversation réinitialisée. Posez votre question ou choisissez une suggestion.`,
            confidence: 'high'
        }]);
        setConversationContext({ topics: [], turnCount: 0 });
        setShowAllSuggestions(true);
    };
    
    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-inner border border-slate-200">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-t-xl">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L10 6.012l-3.763 1.57 1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-bold">Dr. Hacene — Assistant Juridique</h2>
                        <p className="text-[10px] text-primary-200">Législation AT/MP algérienne • 5 textes de loi</p>
                    </div>
                </div>
                <button onClick={handleClearChat} className="text-xs text-primary-200 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10" title="Réinitialiser la conversation">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Réinitialiser
                </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto space-y-6 p-4 custom-scrollbar">
                {messages.map(msg => <MessageBubble key={msg.id} message={msg} onFollowUp={handleSend} />)}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Categorized suggestions panel (collapsible) */}
            <div className="border-t border-slate-200 bg-slate-50/80">
                <button 
                    onClick={() => setShowAllSuggestions(prev => !prev)}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                >
                    <span>💡 Suggestions de questions ({Object.values(QUESTION_CATEGORIES).reduce((a, c) => a + c.questions.length, 0)} disponibles)</span>
                    <svg className={`h-4 w-4 transition-transform ${showAllSuggestions ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {showAllSuggestions && (
                    <div className="px-4 pb-3 max-h-52 overflow-y-auto custom-scrollbar space-y-3">
                        {QUESTION_CATEGORIES.map(cat => (
                            <div key={cat.label}>
                                <h4 className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                                    <span>{cat.icon}</span> {cat.label}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {cat.questions.map(q => (
                                        <button
                                            key={q}
                                            onClick={() => handleSend(q)}
                                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium text-slate-700 hover:text-primary-700 hover:border-primary-400 hover:shadow-sm transition-all ${cat.color}`}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-slate-200 bg-white rounded-b-xl">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Posez votre question juridique ici... (ex: Article 42 de la loi 83-13)"
                        className="w-full p-2 border-none focus:ring-0 focus:outline-none resize-none bg-transparent text-black text-sm placeholder:text-slate-400"
                        rows={1}
                        disabled={isLoading}
                    />
                    <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="self-stretch !rounded-lg !px-4 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5 text-center">
                    5 textes de loi • {Object.keys(INTENTS).length}+ sujets couverts • Tapez un article spécifique ou une question libre
                </p>
            </div>
        </div>
    );
};

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span dangerouslySetInnerHTML={{
            __html: parts.map(part =>
                regex.test(part)
                    ? `<mark class="bg-yellow-200 text-black px-0.5 rounded-sm">${part}</mark>`
                    : part
            ).join('')
        }} />
    );
};

const FullLegalTextsView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [matchCount, setMatchCount] = useState(0);

    const filteredTexts = useMemo(() => {
        if (!searchTerm) {
            setMatchCount(0);
            return legalTexts;
        }
        const lowercasedFilter = normalizeText(searchTerm);
        const filtered = legalTexts.filter(law => 
            normalizeText(law.title).includes(lowercasedFilter) ||
            normalizeText(law.content).includes(lowercasedFilter)
        );
        // Count matches
        let count = 0;
        filtered.forEach(law => {
            const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = law.content.match(regex);
            count += matches?.length || 0;
        });
        setMatchCount(count);
        return filtered;
    }, [searchTerm]);

    return (
        <div className="space-y-4">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Rechercher dans tous les textes de loi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-20 p-2.5 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400"
                />
                {searchTerm && (
                    <span className="absolute inset-y-0 right-3 flex items-center text-xs text-slate-500">
                        {matchCount > 0 ? `${matchCount} résultat(s)` : 'Aucun'}
                    </span>
                )}
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-2">
                {legalTexts.map(law => (
                    <span key={law.id} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200">
                        📖 {law.title.split('—')[0].trim()}
                    </span>
                ))}
            </div>

            {filteredTexts.length > 0 ? (
                filteredTexts.map(law => (
                    <details key={law.id} className="group" open={!!searchTerm}>
                        <summary className="cursor-pointer p-3 bg-slate-100 rounded-lg font-bold text-slate-800 group-open:bg-primary-100 group-open:text-primary-900 transition-all flex justify-between items-center hover:bg-slate-200">
                            <span className="flex items-center gap-2">
                                <span className="text-lg">📜</span>
                                {law.title}
                            </span>
                            <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </summary>
                        <div className="p-4 bg-white border border-t-0 border-slate-200 rounded-b-lg">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
                                <Highlight text={law.content} highlight={searchTerm} />
                            </pre>
                        </div>
                    </details>
                ))
            ) : (
                <div className="text-center text-slate-500 py-10">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="font-medium">Aucun résultat trouvé pour "{searchTerm}"</p>
                    <p className="text-sm mt-1">Essayez un terme plus court ou plus général.</p>
                </div>
            )}
        </div>
    );
};


export const LegislativeGuide: React.FC = () => {
    const tabs = [
        { id: 'ai-assistant', label: '🏛️ Assistant Juridique IA', content: <AiAssistantView /> },
        { id: 'full-texts', label: '📜 Textes de Loi Intégraux', content: <FullLegalTextsView /> }
    ];

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 h-full">
            <Tabs tabs={tabs} defaultTab="ai-assistant" />
        </div>
    );
};