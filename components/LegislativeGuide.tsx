import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { legalTexts } from '../data/civilCode';
import { nomenclatureRules, searchNomenclature } from '../services/nomenclatureData';
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
  topics: string[];
  turnCount: number;
  lastLawId?: string;
  lastIntentKey?: string;
  lastCategory?: string;
}

// ═══════════════════════════════════════════════════════════════
// NLP ENGINE — Normalisation, synonymes, extraction
// ═══════════════════════════════════════════════════════════════

const normalizeText = (text: string): string => 
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-']/g, ' ');

// Expanded synonym map for fuzzy matching — 45+ groups
const SYNONYMS: Record<string, string[]> = {
  'accident': ['at', 'sinistre', 'evenement', 'accidente', 'incident'],
  'travail': ['professionnel', 'professionnelle', 'emploi', 'service', 'poste', 'activite'],
  'maladie': ['pathologie', 'affection', 'mp', 'atteinte', 'malad'],
  'incapacite': ['ipp', 'invalidite', 'handicap', 'infirmite', 'taux', 'sequelle', 'sequelles', 'impotence'],
  'consolidation': ['consolide', 'stabilisation', 'stabilise', 'guerison', 'gueri', 'fin traitement'],
  'rechute': ['aggravation', 'reprise', 'recidive', 'reouverture', 'aggraver', 'aggrave', 'rechuter'],
  'indemnite': ['indemnisation', 'compensation', 'allocation', 'prestation', 'reparation', 'dedommagement'],
  'rente': ['pension', 'capital', 'versement', 'allocation', 'trimestrielle'],
  'employeur': ['patron', 'entreprise', 'societe', 'organisme employeur', 'responsable'],
  'victime': ['assure', 'beneficiaire', 'travailleur', 'salarie', 'blesse', 'accidente', 'patient'],
  'declaration': ['declarer', 'signalement', 'signaler', 'notification', 'notifier', 'deposition'],
  'expertise': ['expert', 'contre expertise', 'examen', 'evaluation', 'medecin expert', 'expertise medicale'],
  'recours': ['contestation', 'contester', 'opposition', 'appel', 'plainte', 'litige', 'tribunal'],
  'delai': ['duree', 'periode', 'combien temps', 'temps', 'date limite', 'prescription', 'echeance'],
  'medecin': ['docteur', 'praticien', 'clinicien', 'therapeute', 'soignant'],
  'conseil': ['controle', 'controleur', 'medecin conseil', 'medecin expert'],
  'commission': ['comite', 'jury', 'instance', 'organe'],
  'deces': ['mort', 'decede', 'mourir', 'droit conjoint', 'ayants droit', 'heritier', 'survivant'],
  'trajet': ['parcours', 'deplacement', 'itineraire', 'chemin', 'route', 'domicile travail'],
  'tierce': ['aide', 'assistance', 'dependance', 'autonomie', 'accompagnement'],
  'faute': ['responsabilite', 'negligence', 'imprudence', 'inexcusable', 'culpabilite'],
  'revision': ['reviser', 'modifier', 'modification', 'reexamen', 'reevaluation', 'revoir'],
  'bareme': ['grille', 'tableau', 'echelle', 'referentiel', 'guide', 'nomenclature'],
  'soins': ['traitement', 'therapie', 'therapeutique', 'medicament', 'hospitalisation', 'chirurgie', 'reeducation'],
  'transport': ['deplacement', 'ambulance', 'convocation', 'voyage', 'transfert'],
  'arret': ['arret travail', 'conge', 'cessation', 'interruption', 'ijt', 'repos'],
  'journaliere': ['ij', 'ijt', 'indemnites journalieres', 'journalieres'],
  'categorie': ['groupe', 'classe', 'type', 'classification', 'niveau'],
  'rejet': ['refus', 'refuse', 'rejete', 'irrecevable', 'deboute', 'defavorable'],
  'prise en charge': ['couverture', 'remboursement', 'rembourse', 'gratuite', 'charge', 'couvert'],
  'cnas': ['securite sociale', 'caisse', 'organisme', 'assurance', 'organisme securite'],
  'cotisation': ['cotiser', 'contribution', 'versement', 'charge sociale', 'part patronale'],
  'affiliation': ['affilier', 'immatriculation', 'inscription', 'enregistrement', 'numero'],
  'retraite': ['pension retraite', 'depart retraite', 'mise retraite', 'age retraite'],
  'maternite': ['conge maternite', 'grossesse', 'accouchement', 'naissance', 'enceinte'],
  'chifa': ['carte', 'teletransmission', 'electronique', 'carte assure'],
  'prescription': ['ordonnance', 'prescrire', 'prescrit', 'duree validite'],
  'controle': ['verifier', 'verification', 'inspection', 'surveillance'],
  'sanction': ['penalite', 'amende', 'punition', 'infraction', 'contravention'],
  'prothese': ['orthese', 'appareillage', 'appareil', 'dispositif medical'],
  'balthazard': ['formule', 'cumul ipp', 'capacite restante', 'lesions multiples'],
  'salaire': ['remuneration', 'revenu', 'solde', 'paie', 'traitement'],
  'conjoint': ['epoux', 'epouse', 'mari', 'femme', 'veuf', 'veuve'],
  'enfant': ['orphelin', 'fils', 'fille', 'mineur', 'descendant'],
  'ascendant': ['parent', 'pere', 'mere', 'grand parent'],
  'gabrielli': ['etat anterieur', 'incapacite preexistante', 'antecedent'],
  'guerison': ['gueri', 'guerir', 'remission', 'retablir', 'retablissement'],
  'reprise': ['retour', 'reprendre', 'recommencer', 'reintegrer'],
  'aggravation': ['aggraver', 'empirer', 'deteriorer', 'degrader'],
  'polytraumatisme': ['poly trauma', 'multi lesion', 'multiple blessure'],
  'survivant': ['ayant droit', 'veuve', 'veuf', 'orphelin', 'heritier', 'beneficiaire deces'],
  'funeraire': ['obseques', 'enterrement', 'inhumation', 'funerailles'],
  'revalorisation': ['augmentation', 'indexation', 'actualisation', 'mise a jour'],
  'barème': ['grille', 'tableau', 'echelle', 'referentiel', 'guide', 'nomenclature'],
  'mission': ['deplacement', 'detachement', 'voyage professionnel'],
  'stagiaire': ['apprenti', 'eleve', 'formation', 'benevole', 'volontaire'],
  'tableau': ['liste', 'nomenclature', 'repertoire', 'catalogue'],
  'noir': ['informel', 'clandestin', 'non declare', 'sans contrat'],
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
  'utilise', 'besoin', 'quand', 'existe', 'donne', 'donner', 'veux', 'voudrais',
  'connaitre', 'expliquer', 'expliquez', 'dites', 'parlez', 'aide', 'aidez',
]);

// N-gram extraction for better phrase matching
const extractNgrams = (text: string, n: number): string[] => {
  const words = normalizeText(text).split(/\s+/).filter(w => w.length > 1);
  const ngrams: string[] = [];
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.push(words.slice(i, i + n).join(' '));
  }
  return ngrams;
};

// Detect greetings to respond conversationally
const GREETINGS = ['bonjour', 'salut', 'bonsoir', 'salam', 'hello', 'hi', 'hey', 'bsr', 'bjr', 'slt', 'coucou', 'yo', 'wesh'];
const isGreeting = (query: string): boolean => {
  const normalized = normalizeText(query).trim();
  return GREETINGS.some(g => normalized === g || normalized.startsWith(g + ' ')) && normalized.split(/\s+/).length <= 5;
};

// Detect thanks
const THANKS = ['merci', 'shukran', 'choukran', 'thanks', 'remercie', 'jazak', 'barak'];
const isThanks = (query: string): boolean => {
  const normalized = normalizeText(query).trim();
  return THANKS.some(t => normalized.includes(t));
};

// Strip natural language prefixes to extract core intent
const QUESTION_PREFIXES = [
  'c est quoi', 'qu est ce que', 'qu est ce qu', 'que veut dire', 'que signifie',
  'expliquer', 'expliquez', 'explique moi', 'dites moi', 'parlez moi de',
  'parler de', 'je veux savoir', 'je voudrais savoir', 'pouvez vous expliquer',
  'peux tu expliquer', 'comment fonctionne', 'comment marche', 'comment ca marche',
  'quel est', 'quelle est', 'quels sont', 'quelles sont', 'a quoi sert',
  'donnez moi', 'donne moi', 'je cherche', 'aide moi avec', 'aidez moi',
  'comment faire', 'comment calculer', 'comment obtenir', 'comment declarer',
  'en quoi consiste', 'definir', 'definition de', 'definition du', 'definition la',
  'resume de', 'resumez', 'resumer', 'comprendre', 'une question sur',
  'question sur', 'connaissez vous', 'connais tu', 'dis moi', 'besoin aide',
  'besoin d aide', 'je ne comprends pas', 'il y a quoi dans', 'que dit',
  'que prevoit', 'selon la loi', 'en vertu de', 'd apres la loi',
];

const stripQuestionPrefixes = (text: string): string => {
  let stripped = normalizeText(text).trim();
  for (const prefix of QUESTION_PREFIXES.sort((a, b) => b.length - a.length)) {
    if (stripped.startsWith(prefix)) {
      stripped = stripped.slice(prefix.length).trim();
      break;
    }
  }
  return stripped;
};

// Detect law number references ("83-13", "loi 83 11", "08-08")
const detectLawReference = (query: string): string | null => {
  const normalized = normalizeText(query);
  const lawPatterns = [
    { regex: /(?:loi|texte|code)?\s*83[\s-]*13/, key: 'explication_loi_83_13' },
    { regex: /(?:loi|texte|code)?\s*83[\s-]*11/, key: 'explication_loi_83_11' },
    { regex: /(?:loi|texte|code)?\s*08[\s-]*08/, key: 'explication_loi_08_08' },
    { regex: /(?:loi|texte|code)?\s*83[\s-]*15/, key: 'explication_loi_83_15' },
    { regex: /(?:loi|texte|code)?\s*83[\s-]*12/, key: 'explication_loi_83_12' },
  ];
  for (const { regex, key } of lawPatterns) {
    if (regex.test(normalized) && !normalized.match(/article\s*\d+/)) {
      return key;
    }
  }
  return null;
};

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
    synonymKeywords: ['antecedent', 'preexistant', 'capacite restante', 'art 12', 'gabrielli', 'incapacite preexistante'],
    summary: `## ⚕️ L'état antérieur — Formule de Gabrielli (Art. 10 & Art. 14, Loi 83-13)

L'état antérieur désigne toute pathologie ou infirmité **préexistante** à l'accident du travail. La **formule de Gabrielli** (ou méthode de la capacité restante) est utilisée en droit du dommage corporel pour évaluer l'IPP lorsqu'une victime présente un état antérieur, afin de **ne réparer que la part imputable à l'accident**.

### Le principe (Art. 10) :
> « Sont considérés comme accidents du travail les accidents survenus du fait ou à l'occasion du travail, **quelle qu'en soit la cause**. »

### Formule de Gabrielli :
Le taux de la nouvelle lésion (**B**) est appliqué à la **capacité restante** (100% − taux de l'état antérieur **A**) :

\`Incapacité finale = Taux A + (Taux B × (100 - Taux A) / 100)\`

### Exemples concrets :

| État antérieur (A) | Nouvelle lésion (B) | Capacité restante | Calcul | **IPP globale** |
|---------------------|---------------------|-------------------|--------|-----------------|
| 40% | 20% | 60% | 40% + (20% × 60%) = 40% + 12% | **52%** |
| 15% | 20% | 85% | 15% + (20% × 85%) = 15% + 17% | **32%** |
| 30% | 10% | 70% | 30% + (10% × 70%) = 30% + 7% | **37%** |
| 50% | 25% | 50% | 50% + (25% × 50%) = 50% + 12,5% | **62,5%** |

### Pourquoi cette formule ?
- Elle évite de **dépasser 100%** lors du cumul de multiples incapacités
- Elle garantit que seule la **part imputable** à l'accident est indemnisée
- Elle est plus **juste** qu'une simple addition arithmétique

### Différence avec Balthazard :
| | **Gabrielli** | **Balthazard** |
|---|--------------|----------------|
| **Contexte** | État antérieur + nouvel accident | Plusieurs lésions **d'un même accident** |
| **Objectif** | Isoler la part imputable | Cumuler les IPP multiples |
| **Formule** | Identique | Identique |

> ⚠️ L'état antérieur ne doit pas pénaliser la victime : la prise en charge couvre **l'ensemble** des conséquences de l'accident, même si elles sont aggravées par l'état préexistant.

> 💡 **En pratique** : Le médecin conseil doit d'abord déterminer le taux de l'état antérieur (A), puis évaluer la nouvelle lésion au barème (B), et enfin appliquer la formule de Gabrielli pour obtenir l'IPP globale.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Comment fonctionne la formule de Balthazard ?", "Calcul de la capacité restante ?", "Procédure de révision d'un taux ?"],
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

  // ─── CALCULS AVANCÉS (intégration nomenclature) ───
  formule_balthazard: {
    keywords: ['balthazard', 'formule'],
    synonymKeywords: ['cumul ipp', 'lesions multiples', 'capacite restante', 'cumul lesions', 'plusieurs ipp', 'additionner ipp'],
    summary: `## 🧮 Formule de Balthazard — Cumul des IPP

Lorsqu'un accident du travail entraîne **plusieurs lésions**, on ne peut pas simplement additionner les taux. On utilise la **formule de Balthazard** qui tient compte de la **capacité restante**.

### Principe fondamental :
> Chaque lésion successive réduit non pas la capacité totale (100%), mais la **capacité qui reste** après les lésions précédentes.

### Formule pour 2 lésions :
\`IPP totale = IPP₁ + [(100 - IPP₁) × IPP₂ / 100]\`

### Formule pour 3 lésions ou plus :
\`Cumul₁₂ = IPP₁ + [(100 - IPP₁) × IPP₂ / 100]\`
\`Cumul₁₂₃ = Cumul₁₂ + [(100 - Cumul₁₂) × IPP₃ / 100]\`

### Exemples pratiques :

| Lésion 1 | Lésion 2 | Somme simple | **Balthazard** |
|----------|----------|-------------|----------------|
| 20% | 10% | 30% | **28%** |
| 15% | 8% | 23% | **21.8%** |
| 30% | 20% | 50% | **44%** |
| 25% | 15% | 40% | **36.25%** |

> 💡 **Règle pratique** : Toujours commencer par le taux le **plus élevé** (IPP₁), puis ajouter les suivants par ordre décroissant.

> ⚠️ Le résultat de Balthazard est toujours **inférieur à la somme arithmétique**, sauf si un des taux est 0%.

**Base légale** : Principe reconnu par la jurisprudence et le barème indicatif. Utilisé systématiquement pour les poly-traumatismes.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Prise en charge d'un état antérieur ?", "Comment sont calculées les rentes ?"],
    category: 'calcul'
  },
  calcul_capacite_restante: {
    keywords: ['capacite', 'restante'],
    synonymKeywords: ['capacite residuelle', 'capacite fonctionnelle'],
    summary: `## 📐 Calcul de la capacité restante

La **capacité restante** est la capacité fonctionnelle qui reste après une incapacité.

### Formule :
\`Capacité restante = 100% - IPP\`

### Importance :
Elle est essentielle pour :
1. **Le calcul du cumul (Balthazard)** : Chaque nouvelle lésion s'applique sur la capacité restante
2. **L'état antérieur (Art. 12)** : Le nouveau taux est calculé sur la capacité qui restait

### Exemple :
- IPP antérieure = 20% → Capacité restante = **80%**
- Nouvelle lésion au barème = 15%
- Taux imputable = 80% × 15% = **12%**
- IPP globale (Balthazard) = 20% + 12% = **32%** (et non 35%)

> 💡 Un travailleur avec 60% d'IPP n'a que 40% de capacité restante. Si une nouvelle lésion vaut 25% au barème, le taux réel sera : 40% × 25% = 10%, pas 25%.`,
    relatedQuestions: ["Comment fonctionne la formule de Balthazard ?", "Prise en charge d'un état antérieur ?", "Comment sont calculées les rentes ?"],
    category: 'calcul'
  },
  taux_utile_rente: {
    keywords: ['taux', 'utile'],
    synonymKeywords: ['taux utile rente', 'conversion taux', 'taux applicable rente'],
    summary: `## 📊 Le taux utile (conversion du taux IPP pour la rente)

Le **taux utile** est le taux réellement appliqué pour calculer la rente. Il n'est pas égal au taux d'IPP.

### Règle de conversion :
- La portion du taux **≤ 50%** est **divisée par 2**
- La portion du taux **> 50%** est **multipliée par 1,5**

### Formule :
\`Si IPP ≤ 50% : Taux utile = IPP / 2\`
\`Si IPP > 50% : Taux utile = 25% + (IPP - 50%) × 1,5\`

### Table de conversion complète :

| Taux IPP | Calcul | **Taux utile** |
|----------|--------|----------------|
| 10% | 10/2 | **5%** |
| 20% | 20/2 | **10%** |
| 30% | 30/2 | **15%** |
| 40% | 40/2 | **20%** |
| 50% | 50/2 | **25%** |
| 60% | 25 + (10×1,5) | **40%** |
| 70% | 25 + (20×1,5) | **55%** |
| 80% | 25 + (30×1,5) | **70%** |
| 90% | 25 + (40×1,5) | **85%** |
| 100% | 25 + (50×1,5) | **100%** |

> 💡 La formule avantage les taux élevés d'IPP (au-dessus de 50%). C'est une mesure de justice sociale pour les accidents graves.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Comment est fixé le taux d'incapacité ?"],
    category: 'calcul'
  },
  ipp_sociale: {
    keywords: ['ipp', 'sociale'],
    synonymKeywords: ['taux social', 'majoration socio professionnelle', 'incidence professionnelle'],
    summary: `## 📈 L'IPP sociale (majoration socio-professionnelle)

En plus du taux **médical** (séquelles physiques), le médecin conseil peut accorder un **taux social** tenant compte de l'impact professionnel.

### Critères d'évaluation :
| Critère | Exemple |
|---------|---------|
| **Âge de la victime** | Travailleur jeune vs proche de la retraite |
| **Profession exercée** | Manœuvre vs cadre bureau |
| **Qualification** | Travailleur spécialisé sans possibilité de reconversion |
| **Reclassement** | Possibilité ou non de changer de poste |
| **Retentissement** | Impact réel sur l'emploi actuel |

### Application :
\`IPP globale = IPP médicale + IPP sociale\`

### Limites :
- Le taux social est généralement de **0 à 5%** (rarement plus)
- Le total ne peut jamais dépasser **100%**
- Le médecin conseil doit **motiver** cette majoration

> 💡 **Exemple** : Un charpentier de 35 ans avec une ankylose du poignet (15% au barème). Son métier exige des mouvements fins du poignet → impact professionnel majeur → majoration sociale de 5% → **IPP globale = 20%**.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Comment fonctionne la formule de Balthazard ?"],
    category: 'calcul'
  },
  capital_forfeiture_ipp: {
    keywords: ['capital', 'forfaitaire'],
    synonymKeywords: ['ipp moins 10', 'capital ipp', 'indemnite capital'],
    summary: `## 💵 Le capital forfaitaire (IPP < 10%)

Lorsque le taux d'IPP est **inférieur à 10%**, la victime ne perçoit pas une rente mais un **capital forfaitaire unique**.

### Caractéristiques :
- Versement **unique** (pas trimestriel)
- Calculé sur la base du barème des capitaux représentatifs
- Lié au taux d'IPP et au salaire de référence

### Taux donnant droit au capital (barème) :

| Taux IPP | Type de prestation |
|----------|-------------------|
| 1% à 9% | **Capital forfaitaire** (versement unique) |
| ≥ 10% | **Rente** (trimestrielle, viagère) |

### Important :
- Le capital est **non révisable** contrairement à la rente
- Il est versé en **une seule fois**
- Il n'est **pas imposable**

**Réf** : Art. 38, Loi 83-13.

> ⚠️ Le seuil de 10% est crucial. Pour un taux de 9%, c'est un capital unique. Pour 10%, c'est une rente à vie. Le médecin conseil doit être particulièrement rigoureux dans l'évaluation autour de ce seuil.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Comment est fixé le taux d'incapacité ?", "Le taux utile, c'est quoi ?"],
    category: 'calcul'
  },

  // ─── ASSURANCES SOCIALES (Loi 83-11) ───
  assurance_maladie: {
    keywords: ['assurance', 'maladie'],
    synonymKeywords: ['maladie ordinaire', 'conge maladie', 'arret maladie ordinaire', 'regime maladie'],
    summary: `## 🏥 Assurance maladie (Loi 83-11, Chapitre II)

### Prestations en nature (soins) :
- Remboursement à **80%** du tarif de référence (ticket modérateur de 20%)
- **100%** pour les maladies chroniques (ALD), les hospitalisations de +30 jours
- **100%** pour les soins liés à un AT/MP

### Prestations en espèces (indemnités journalières) :
| Période | Taux | Conditions |
|---------|------|-----------|
| **1er au 15e jour** | **50%** du salaire de référence | Délai de carence : **3 jours** |
| **À partir du 16e jour** | **100%** du salaire de référence | Si hospitalisation ou ALD |

### Différences AT/MP vs Maladie ordinaire :

| | AT/MP | Maladie ordinaire |
|---|------|-------------------|
| Taux soins | **100%** | **80%** |
| IJ taux | **100%** dès J+1 | 50% puis 100% |
| Carence | **Aucune** | **3 jours** |

> 💡 La qualification de l'événement (AT vs maladie ordinaire) a un impact majeur sur l'indemnisation.`,
    relatedQuestions: ["Calcul de l'indemnité journalière ?", "Différence incapacité / invalidité ?", "Quelles sont les ALD ?"],
    category: 'droits'
  },
  conge_maternite: {
    keywords: ['maternite', 'conge'],
    synonymKeywords: ['grossesse', 'accouchement', 'congé maternite', 'femme enceinte'],
    summary: `## 🤰 Congé de maternité (Loi 83-11, Art. 26-29)

### Durée :
- **150 jours** (21 semaines) consécutifs, entièrement indemnisés
- Peut débuter **42 jours** avant la date présumée de l'accouchement
- **Prolongation** : +50 jours en cas de handicap ou de maladie du nouveau-né, avec possibilité d'extension supplémentaire

### Indemnités journalières :
- **100%** du salaire journalier net (après déduction des cotisations)
- Versées par la **CNAS** pendant toute la durée du congé (150 jours)

### Conditions :
- Être assurée sociale
- Avoir travaillé au moins **15 jours** au cours des **3 derniers mois** ou **60 jours** au cours des **12 derniers mois**
- Justifier d'un **certificat médical**

### Dépôt du dossier :
- Le dossier médical doit être soumis à la **CNAS** avec un certificat médical
- La période de congé peut débuter **42 jours** avant la date prévue de l'accouchement

### Protections :
- Interdiction de licencier la salariée pendant le congé de maternité
- Conservation du poste de travail
- Les jours de congé sont considérés comme période de travail pour le calcul des droits

| Élément | Détail |
|---------|--------|
| **Durée totale** | 150 jours (5 mois) |
| **Début possible** | 42 jours avant l'accouchement |
| **Indemnisation** | 100% du salaire journalier net |
| **Prolongation** | +50 jours (handicap/maladie nouveau-né) |
| **Condition travail** | 15 j / 3 mois ou 60 j / 12 mois |

> 💡 Les soins liés à la grossesse et à l'accouchement sont pris en charge à **100%** (pas de ticket modérateur).`,
    relatedQuestions: ["Calcul de l'indemnité journalière ?", "Quelles sont les prestations en nature ?"],
    category: 'droits'
  },
  ald_maladies_chroniques: {
    keywords: ['ald', 'chronique'],
    synonymKeywords: ['maladie longue duree', 'affection longue duree', 'maladie chronique', 'exoneration ticket'],
    summary: `## 🏥 Affections de Longue Durée — ALD (Loi 83-11)

### Le principe :
Les assurés atteints d'une ALD bénéficient d'un remboursement à **100%** (exonération du ticket modérateur) pour tous les soins liés à cette affection.

### Liste des ALD (exemples) :
- Diabète insulinodépendant
- Hypertension artérielle sévère
- Insuffisance cardiaque
- Cancers
- Insuffisance rénale chronique
- Maladies psychiatriques chroniques
- Tuberculose et séquelles
- Sida (VIH)
- Affections neurologiques graves (sclérose en plaques, etc.)

### Procédure :
1. Le médecin traitant remplit un **protocole de soins ALD**
2. Le médecin conseil valide l'inscription en ALD
3. La CNAS délivre une attestation d'ALD
4. Remboursement à 100% pour les soins liés à l'ALD

> ⚠️ Seuls les soins **en rapport avec l'ALD** sont à 100%. Les soins sans rapport restent à 80%.`,
    relatedQuestions: ["Quelles sont les prestations en nature ?", "Assurance maladie ordinaire ?"],
    category: 'droits'
  },
  cotisations_taux: {
    keywords: ['cotisations', 'taux'],
    synonymKeywords: ['taux cotisation', 'charge patronale', 'part salariale', 'assiette cotisation', 'combien cotise'],
    summary: `## 💼 Cotisations de sécurité sociale

### Répartition des cotisations :

| Branche | **Part patronale** | **Part salariale** | **Total** |
|---------|--------------------|--------------------|-----------|
| Assurances sociales | 12,5% | 1,5% | 14% |
| AT/MP | 1,25% | — | 1,25% |
| Retraite | 11% | — | 11% |
| Retraite anticipée | 0,5% | 0,5% | 1% |
| Assurance chômage | 1,25% | 0,5% | 1,75% |
| Œuvres sociales | — | — | Variable |
| **TOTAL** | **~26%** | **~9%** | **~35%** |

### Assiette de cotisation :
- Basée sur le **salaire brut**
- Plafonnée pour certaines branches (8x le SNMG pour les AT/MP)

### Qui paie ?
- L'**employeur** prélève la part salariale et verse le tout à la CNAS
- En cas de non-versement → sanctions pénales et majorations de retard

> 💡 Le taux de cotisation AT/MP peut être **majoré** pour les entreprises à fort taux de sinistralité (bonus-malus).`,
    relatedQuestions: ["Obligations de l'employeur ?", "Qu'est-ce que l'affiliation ?", "Sanctions pour non-déclaration ?"],
    category: 'pratique'
  },
  affiliation_immatriculation: {
    keywords: ['affiliation'],
    synonymKeywords: ['immatriculation', 'inscription cnas', 'numero assure'],
    summary: `## 📋 Affiliation et immatriculation

### L'affiliation de l'employeur :
- Tout employeur est tenu de **s'affilier à la CNAS** dans les **10 jours** suivant l'embauche de son premier salarié
- Il reçoit un **numéro d'affiliation** qui l'identifie

### L'immatriculation du travailleur :
- Chaque travailleur reçoit un **numéro d'immatriculation** (numéro de sécurité sociale)
- Ce numéro est **unique et à vie**
- Il est nécessaire pour : la prise en charge des soins, le calcul des droits à la retraite, l'ouverture de droits en cas d'AT/MP

### Qui le demande ?
- L'**employeur** est tenu d'immatriculer ses salariés
- Le travailleur peut aussi se présenter à la CNAS avec une attestation de travail

> ⚠️ Un travailleur non déclaré (travail au noir) n'a aucune couverture sociale. En cas d'accident, il peut néanmoins faire valoir ses droits avec des preuves de l'existence d'une relation de travail.`,
    relatedQuestions: ["Obligations de l'employeur ?", "Cotisations de sécurité sociale ?"],
    category: 'pratique'
  },
  prescription_droits: {
    keywords: ['prescription', 'droits'],
    synonymKeywords: ['delai prescription', 'forclusion', 'peremption droits', 'quand perd droit'],
    summary: `## ⏳ Prescription des droits (Loi 83-13 et Loi 83-11)

### AT/MP :

| Objet | Délai de prescription | Réf |
|-------|----------------------|-----|
| **Déclaration AT** (par employeur) | **48 heures** | Art. 13, Loi 83-13 |
| **Déclaration AT** (par victime) | **4 ans** | Art. 14, Loi 83-13 |
| **Déclaration MP** | **15 jours** après 1re constatation | Art. 71, Loi 83-13 |
| **Rechute/Révision** (0-2 ans) | Intervalle de **3 mois** | Art. 59, Loi 83-13 |
| **Rechute/Révision** (après 2 ans) | Intervalle de **1 an** | Art. 59, Loi 83-13 |

### Assurances sociales :

| Objet | Délai de prescription |
|-------|----------------------|
| **Prestations en nature** (soins) | **2 ans** à compter de la date des soins |
| **Prestations en espèces** (IJ) | **4 ans** |
| **Action en remboursement** de la CNAS | **3 ans** |

### Contestation :

| Objet | Délai |
|-------|-------|
| **Contentieux général** | **15 jours** (Art. 8, Loi 08-08) |
| **Contentieux médical** | **15 jours** (Art. 20, Loi 08-08) |
| **Invalidité** | **30 jours** (Art. 33, Loi 08-08) |

> ⚠️ **Attention** : Les délais de prescription sont **stricts** et leur non-respect entraîne la **forclusion** (perte définitive du droit).`,
    relatedQuestions: ["Délais de contestation ?", "Délai de déclaration d'un accident ?", "Le recours préalable est-il obligatoire ?"],
    category: 'procedure'
  },
  sanctions_employeur: {
    keywords: ['sanctions', 'employeur'],
    synonymKeywords: ['penalites patron', 'amende employeur', 'infraction employeur', 'sanctions penales'],
    summary: `## ⚖️ Sanctions contre l'employeur (Loi 83-13, Art. 76-83)

### 1. Non-déclaration de l'accident :
- **Amende** de 500 à 2.000 DA par infraction
- En cas de récidive : amende doublée + possibilité d'emprisonnement

### 2. Non-paiement des cotisations :
- Majorations de retard de **5%** par mois de retard
- Poursuites devant le tribunal
- Possibilité de saisie des biens de l'entreprise

### 3. Entrave au contrôle médical :
- Amende et possibilité de poursuites pénales

### 4. Faute inexcusable (Art. 45, Loi 83-15) :
- La CNAS verse les prestations majorées puis se **retourne contre l'employeur** pour remboursement
- Majoration de la rente de la victime  

### 5. Non-délivrance de la feuille d'accident :
- Constitue une entrave aux droits de la victime
- Sanctions administratives et pénales

> 💡 En pratique, la victime peut signaler ces manquements directement à la CNAS ou à l'inspection du travail.`,
    relatedQuestions: ["Obligations de l'employeur ?", "Qu'est-ce que la faute inexcusable ?", "Que faire si l'employeur refuse de déclarer ?"],
    category: 'procedure'
  },
  feuille_accident: {
    keywords: ['feuille', 'accident'],
    synonymKeywords: ['formulaire accident', 'feuille soins at', 'document accident'],
    summary: `## 📄 La feuille d'accident (Art. 15, Loi 83-13)

### Qu'est-ce que c'est ?
La **feuille d'accident** (ou triptyque) est un document officiel que l'employeur doit remettre à la victime. Elle permet la **prise en charge à 100%** des soins sans avance de frais.

### Contenu :
- Identité de la victime
- Date, heure et lieu de l'accident
- Nature des lésions
- Cachet et signature de l'employeur

### Obligations :
| Qui | Fait quoi |
|-----|----------|
| **Employeur** | Délivre la feuille à la victime **immédiatement** |
| **Victime** | Présente la feuille au médecin/pharmacien/hôpital |
| **Praticien** | Remplit les cases "soins dispensés" |
| **CNAS** | Prend en charge les frais à 100% |

### Si l'employeur ne la donne pas ?
La victime peut :
1. Se rendre à la CNAS avec son CMI pour obtenir un bon de prise en charge
2. Signaler le manquement à l'inspection du travail
3. Les frais avancés seront remboursés après régularisation

> ⚠️ La feuille d'accident est valable **3 ans** à compter de la date de l'accident.`,
    relatedQuestions: ["Obligations de l'employeur ?", "Délai de déclaration d'un accident ?", "Quelles sont les prestations en nature ?"],
    category: 'procedure'
  },
  appareillage_prothese: {
    keywords: ['appareillage', 'prothese'],
    synonymKeywords: ['prothese orthese', 'appareil medical', 'dispositif', 'attelle', 'fauteuil roulant', 'prothese dentaire'],
    summary: `## 🦿 Appareillage et prothèses (Art. 31-34, Loi 83-13)

### Prise en charge à 100% en AT/MP :

| Type | Exemples | Couverture |
|------|----------|-----------|
| **Prothèses** | Prothèse de membre, prothèse dentaire (si trauma) | Fourniture + pose |
| **Orthèses** | Attelle, corset, semelles orthopédiques | Fourniture |
| **Appareillage** | Fauteuil roulant, cannes, déambulateur | Fourniture |
| **Renouvellement** | Usure normale, changement morphologique | Couvert |
| **Réparation** | Casse, dysfonctionnement | Couvert |

### Procédure :
1. Prescription par le médecin traitant
2. Accord du médecin conseil (pour les appareillages coûteux)
3. Fourniture par un fournisseur agréé
4. Remboursement à 100% (tarif conventionné)

### Renouvellement :
- Le renouvellement est pris en charge si l'appareil est **usé**, **cassé** ou **inadapté**
- Un accord préalable du médecin conseil peut être nécessaire

> 💡 Pour les prothèses dentaires liées à un AT, la prise en charge couvre la **totalité** des frais, contrairement au régime maladie ordinaire.`,
    relatedQuestions: ["Quelles sont les prestations en nature ?", "Les frais de transport sont-ils pris en charge ?"],
    category: 'droits'
  },
  readaptation_professionnelle: {
    keywords: ['readaptation', 'professionnelle'],
    synonymKeywords: ['reconversion', 'reclassement professionnel', 'formation reconversion', 'changement poste'],
    summary: `## 🏗️ Réadaptation professionnelle (Art. 34, Loi 83-13)

### Principe :
Si la victime ne peut plus exercer son ancien métier en raison des séquelles, elle a droit à une **réadaptation professionnelle** financée par la CNAS.

### Ce que ça comprend :
- **Formation** dans un nouveau métier compatible avec le handicap
- **Frais de formation** pris en charge (inscription, matériel)
- **Indemnités** pendant la durée de la formation
- **Transport** pour se rendre au centre de formation

### Conditions :
- Existence d'une IPP empêchant la reprise de l'ancien emploi
- Avis favorable du médecin conseil
- Accord de la commission compétente

### Avantages pour le travailleur :
- Maintien des droits sociaux pendant la formation
- Nouvelle qualification professionnelle
- Rente d'IPP maintenue en totalité pendant la réadaptation

> 💡 La réadaptation professionnelle est un **droit**, pas une faculté. L'employeur ne peut pas s'y opposer.`,
    relatedQuestions: ["Quelles sont les prestations en nature ?", "Conditions pour une tierce personne ?", "Peut-on cumuler rente et salaire ?"],
    category: 'droits'
  },
  retraite_anticipee_at: {
    keywords: ['retraite', 'anticipee'],
    synonymKeywords: ['depart anticipe', 'retraite ipp', 'retraite accident', 'depart avant age'],
    summary: `## 🏖️ Retraite anticipée et AT/MP

### Le lien entre AT/MP et retraite :

La victime d'un AT/MP titulaire d'une rente d'incapacité peut bénéficier de conditions avantageuses pour la retraite :

### 1. Retraite anticipée pour invalidité (Loi 83-12) :
- Si la victime est reconnue **inapte au travail** par le médecin conseil
- Pas de condition d'âge minimum
- Condition de cotisation : variable selon la date

### 2. Cumul pension de retraite + rente AT/MP :
- La rente d'AT est un droit **propre** → elle se **cumule** intégralement avec la pension de retraite
- Pas de réduction ni de plafonnement

### 3. Majoration de durée d'assurance :
- Les périodes d'ITT (arrêt de travail) sont comptabilisées comme **périodes d'assurance** pour le calcul de la retraite
- Pas de perte de trimestres pendant l'incapacité temporaire

> 💡 Un travailleur victime d'un AT grave peut cumuler : **pension de retraite + rente AT/MP + éventuellement majoration tierce personne**.`,
    relatedQuestions: ["Peut-on cumuler rente et salaire ?", "Comment sont calculées les rentes ?", "Catégories d'invalidité ?"],
    category: 'droits'
  },
  action_recours_tiers: {
    keywords: ['recours', 'tiers'],
    synonymKeywords: ['tiers responsable', 'action contre tiers', 'accident cause par tiers', 'responsabilite tiers'],
    summary: `## ⚖️ Action récursoire contre le tiers (Art. 68-70, Loi 83-13)

### Situation :
Lorsqu'un accident du travail est causé par un **tiers** (ex: accident de la route causé par un autre conducteur), la CNAS verse les prestations à la victime **puis** peut se retourner contre le tiers responsable.

### Le principe de subrogation (Art. 68) :
> La CNAS est **subrogée** dans les droits de la victime contre le tiers responsable, à concurrence des prestations versées.

### En pratique :

| Acteur | Action |
|--------|--------|
| **La CNAS** | Verse les prestations à la victime (IJ, rente, soins) |
| **La CNAS** | Se retourne contre le tiers (ou son assureur) pour récupérer les sommes |
| **La victime** | Peut agir **en complément** pour les préjudices non couverts par la SS |

### Ce que la victime peut encore réclamer au tiers :
- Préjudice moral
- Préjudice esthétique  
- Préjudice d'agrément
- Complément d'indemnisation au-delà des barèmes SS

> 💡 L'action contre le tiers est **indépendante** de la couverture AT/MP. Les deux indemnisations ne se substituent pas, elles se complètent.`,
    relatedQuestions: ["Définition de l'accident du travail ?", "Comment sont calculées les rentes ?", "Qu'est-ce que la faute inexcusable ?"],
    category: 'recours'
  },
  controle_arret_travail: {
    keywords: ['controle', 'arret'],
    synonymKeywords: ['controle medical', 'verification arret', 'medecin controle', 'arret justifie', 'prolongation arret'],
    summary: `## 🔍 Contrôle des arrêts de travail

### Pouvoir du médecin conseil (Art. 64, Loi 83-11) :
Le médecin conseil peut à tout moment vérifier que l'arrêt de travail est **médicalement justifié**.

### Types de contrôle :
1. **Contrôle sur pièces** : Étude du dossier médical
2. **Convocation** : La victime est convoquée chez le médecin conseil
3. **Contrôle à domicile** : Visite inopinée (heures de présence obligatoire)

### Conséquences d'un contrôle défavorable :
| Situation | Conséquence |
|-----------|-----------|
| Arrêt non justifié | **Suspension** des indemnités journalières |
| Absence au contrôle (sans motif) | Suspension des IJ |
| Activité rémunérée pendant l'arrêt | Suspension + remboursement des IJ |
| Refus de soins | Suspension possible |

### Obligations de la victime pendant l'arrêt :
- Être présent au domicile aux **heures de sortie autorisées**
- Se présenter aux convocations du médecin conseil
- Ne pas exercer d'activité rémunérée
- Suivre le traitement prescrit

> 💡 En AT/MP, les heures de sortie sont généralement de **10h-12h** et **16h-18h** (sauf prescription contraire du médecin traitant).`,
    relatedQuestions: ["Rôle du médecin conseil ?", "Calcul de l'indemnité journalière ?"],
    category: 'medecin'
  },
  imputabilite: {
    keywords: ['imputabilite'],
    synonymKeywords: ['lien causal', 'relation cause', 'imputable at', 'presomption imputabilite'],
    summary: `## 🔗 L'imputabilité (présomption d'imputabilité)

### Le principe fondamental :
En AT/MP, il existe une **présomption d'imputabilité** : tout accident survenu au temps et au lieu du travail est **présumé** être un accident du travail.

### Conséquences pratiques :

| | AT/MP | Droit commun |
|---|------|-------------|
| **Charge de la preuve** | La CNAS doit prouver que ce n'est **PAS** un AT | La victime doit prouver la faute |
| **Présomption** | **Favorable** à la victime | Aucune présomption |
| **Lien causal** | Présumé établi | À démontrer |

### Conditions de la présomption :
1. L'accident est survenu **au temps du travail** (horaires)
2. L'accident est survenu **au lieu du travail** (locaux de l'entreprise)
3. La victime était **sous l'autorité** de l'employeur

### Renversement de la présomption :
La CNAS peut renverser la présomption si elle prouve que :
- L'accident n'a **aucun lien** avec le travail
- L'accident résulte d'une **cause totalement étrangère** au travail (ex: malaise dû à une maladie personnelle préexistante clairement identifiée)

> ⚠️ **Important pour le médecin conseil** : En cas de doute, la présomption joue en faveur de la victime. Le médecin conseil doit avoir des éléments **solides** pour écarter l'imputabilité.

**Réf** : Art. 6, Loi 83-13 et jurisprudence constante.`,
    relatedQuestions: ["Définition de l'accident du travail ?", "Prise en charge d'un état antérieur ?", "Une faute de la victime annule-t-elle ses droits ?"],
    category: 'medecin'
  },
  conversion_pension_capital: {
    keywords: ['conversion', 'rente'],
    synonymKeywords: ['rachat rente', 'convertir pension', 'transformer rente capital'],
    summary: `## 💱 Conversion de la rente en capital (Art. 50-51, Loi 83-13)

### Le principe :
La victime titulaire d'une rente d'IPP peut demander la **conversion partielle** de sa rente en capital.

### Conditions :
- Le taux d'IPP doit être **≤ 20%**
- La demande est faite par la victime
- L'organisme statue sur la demande

### Limite :
- La conversion ne peut porter que sur **une fraction** de la rente (pas la totalité pour les taux > 10%)
- Le calcul se fait selon un barème officiel de capitalisation

### Avantage :
Percevoir un capital immédiat plutôt qu'une rente trimestrielle modeste.

### Inconvénient :
- Le capital versé est **définitif** — pas de retour possible à la rente
- Pas de revalorisation future

> 💡 Cette option est surtout intéressante pour les **faibles taux d'IPP** (10-20%) où la rente trimestrielle est modeste.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Le capital forfaitaire (IPP < 10%) ?"],
    category: 'calcul'
  },
  reeducation_fonctionnelle: {
    keywords: ['reeducation', 'fonctionnelle'],
    synonymKeywords: ['kinesitherapie', 'readaptation', 'physiotherapie', 'kine', 'seances kine'],
    summary: `## 🏋️ Rééducation fonctionnelle (Art. 33, Loi 83-13)

### Prise en charge :
La rééducation fonctionnelle est prise en charge à **100%** dans le cadre des AT/MP.

### Ce qui est couvert :
| Prestation | Détail |
|-----------|--------|
| **Kinésithérapie** | Séances prescrites par le médecin |
| **Balnéothérapie** | Cures thermales si prescrites |
| **Ergothérapie** | Rééducation des gestes quotidiens/professionnels |
| **Transport** | Frais de déplacement vers le centre de rééducation |
| **Hébergement** | Si nécessité d'hospitalisation en centre spécialisé |

### Durée :
- Pas de limite de séances fixée par la loi
- Le médecin conseil évalue la **nécessité** et la **pertinence** de la rééducation
- Elle peut se poursuivre **après la consolidation** si les soins sont liés aux séquelles

### Contrôle :
Le médecin conseil vérifie :
1. L'adéquation entre la rééducation et les lésions
2. L'évolution objective sous traitement
3. L'absence de prolongation injustifiée

> 💡 La rééducation fait partie des **prestations en nature**. Elle est un droit de la victime, pas une faveur.`,
    relatedQuestions: ["Quelles sont les prestations en nature ?", "Qu'est-ce que la consolidation ?"],
    category: 'droits'
  },
  expertise_contradictoire: {
    keywords: ['expertise', 'contradictoire'],
    synonymKeywords: ['contre expertise', 'contreexpertise', 'deuxieme avis', 'avis contraire'],
    summary: `## ⚖️ L'expertise contradictoire

### Différence avec l'expertise Loi 08-08 :

| | Expertise Loi 08-08 | Expertise contradictoire (judiciaire) |
|---|---------------------|--------------------------------------|
| **Qui la demande** | L'assuré | Le tribunal |
| **Quand** | Avant le recours judiciaire | Pendant le procès |
| **Expert** | Choisi conjointement ou d'office | Désigné par le juge |
| **Forces** | S'impose aux parties | S'impose au juge (sauf avis motivé contraire) |

### L'expertise judiciaire :
Si l'assuré n'est pas satisfait de l'expertise Loi 08-08, il peut saisir le tribunal qui ordonnera une **expertise judiciaire** :
1. Le juge désigne un expert inscrit sur la liste des experts
2. L'expert examine la victime **en présence** du médecin conseil et du médecin traitant
3. Chaque partie peut présenter ses observations
4. L'expert rend un rapport détaillé
5. Le tribunal tranche sur la base de ce rapport

> 💡 **Conseil** : L'expertise judiciaire est le dernier recours. Elle est plus longue et coûteuse. Privilégiez d'abord l'expertise Loi 08-08.`,
    relatedQuestions: ["Procédure d'expertise médicale ?", "Le recours préalable est-il obligatoire ?", "Délais de contestation ?"],
    category: 'recours'
  },
  guide_medecin_1995: {
    keywords: ['guide', 'medecin', '1995'],
    synonymKeywords: ['guide pratique', 'manuel medecin conseil', 'guide 1995', 'guide officiel'],
    summary: `## 📖 Le Guide du Médecin Conseil (1995)

### Nature :
Le Guide du Médecin Conseil est un **document de référence** publié par la CNAS en 1995. Il constitue un outil pratique pour standardiser les pratiques des médecins conseil.

### Contenu :
- **Principes généraux** du contrôle médical
- **Méthodologie** d'évaluation des incapacités
- **Barème indicatif** des taux d'IPP par type de séquelle
- **Procédures** à suivre pour chaque type de décision
- **Modèles** de rapports et formulaires

### Statut juridique :
- C'est un guide **indicatif**, pas un texte de loi
- Le médecin conseil peut s'en écarter avec **motivation**
- Il complète les lois (83-11, 83-13, 83-15, 08-08) sans les remplacer

### Les chapitres principaux :
1. Contrôle des arrêts de travail
2. Évaluation de l'IPP (barème par appareil)
3. Gestion des rechutes et révisions
4. Contentieux médical et expertise
5. Invalidité et commissions

> 💡 Ce guide est accessible dans l'onglet **"Textes de Loi Intégraux"** de cette application.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Rôle du médecin conseil ?", "La formule de Balthazard ?"],
    category: 'medecin'
  },

  // ═══════════════════════════════════════════════════════════
  // EXPLICATIONS DES LOIS — Résumés complets de chaque texte
  // ═══════════════════════════════════════════════════════════
  explication_loi_83_13: {
    keywords: ['loi', '83', '13'],
    synonymKeywords: ['loi 83-13', 'accidents travail loi', 'expliquer 83 13', 'resume loi at', 'texte at mp'],
    summary: `## 📜 Loi 83-13 — Accidents du Travail et Maladies Professionnelles

La **Loi n° 83-13 du 2 juillet 1983** est le texte fondamental qui régit les AT/MP en Algérie. Elle couvre l'ensemble du dispositif de protection des travailleurs contre les risques professionnels.

### Structure de la loi :

| Chapitre | Contenu | Articles |
|----------|---------|----------|
| **I** | Définitions (AT, trajet, MP) | Art. 6-12 |
| **II** | Déclaration et constatation | Art. 13-19 |
| **III** | Prestations en nature (soins) | Art. 20-36 |
| **IV** | Prestations en espèces (IJ) | Art. 37-40 |
| **V** | Incapacité permanente (rentes) | Art. 41-55 |
| **VI** | Rechutes et révision | Art. 56-62 |
| **VII** | Décès — ayants droit | Art. 63-67 |
| **VIII** | Recours contre les tiers | Art. 68-72 |
| **IX** | Prévention | Art. 73-75 |
| **X** | Sanctions pénales | Art. 76-83 |

### Principes clés :
- **Présomption d'imputabilité** : tout accident au temps et lieu du travail est présumé AT
- **Réparation automatique** : pas besoin de prouver une faute de l'employeur
- **Prise en charge à 100%** : soins, hospitalisation, appareillage
- **Indemnités journalières** : 100% du salaire dès le lendemain de l'AT
- **Rentes viagères** : si IPP ≥ 10%
- **Protection des ayants droit** : rentes en cas de décès

> 💡 C'est **LE texte de référence** pour le médecin conseil en matière d'AT/MP.`,
    relatedQuestions: ["Définition accident du travail ?", "Comment sont calculées les rentes ?", "Expliquer la Loi 83-11 ?", "Expliquer la Loi 08-08 ?"],
    category: 'general'
  },
  explication_loi_83_11: {
    keywords: ['loi', '83', '11'],
    synonymKeywords: ['loi 83-11', 'assurances sociales loi', 'expliquer 83 11', 'resume loi assurance', 'regime assurance maladie'],
    summary: `## 📜 Loi 83-11 — Assurances Sociales

La **Loi n° 83-11 du 2 juillet 1983** organise le régime des assurances sociales en Algérie (maladie, maternité, invalidité, décès).

### Structure de la loi :

| Chapitre | Contenu | Thème |
|----------|---------|-------|
| **I** | Dispositions générales | Champ d'application |
| **II** | Assurance maladie | Soins + IJ maladie |
| **III** | Assurance maternité | Congé + IJ maternité |
| **IV** | Assurance invalidité | 3 catégories + pension |
| **V** | Assurance décès | Capital décès |
| **VI** | Prestations en nature | Remboursements, ALD |
| **VII** | Contrôle médical | Rôle du médecin conseil |

### Points essentiels :

| Prestation | Taux | Condition |
|-----------|------|-----------|
| Soins maladie ordinaire | **80%** | Ticket modérateur 20% |
| Soins ALD | **100%** | Liste officielle ALD |
| IJ maladie (J+1 à J+15) | **50%** | Carence 3 jours |
| IJ maladie (après J+15) | **100%** | Si hospitalisation/ALD |
| Congé maternité | **100%** | 150 jours |
| Invalidité cat. 1 | **60%** du SAM | Capacité réduite des 2/3 |
| Invalidité cat. 2 | **80%** du SAM | Inapte à tout travail |
| Invalidité cat. 3 | **80% + 40%** | + tierce personne |

> 💡 **Différence fondamentale** : La Loi 83-11 couvre la maladie **ordinaire**, tandis que la Loi 83-13 couvre les **AT/MP**. Les taux de prise en charge sont bien plus avantageux en AT/MP.`,
    relatedQuestions: ["Assurance maladie ordinaire ?", "Quelles sont les ALD ?", "Catégories d'invalidité ?", "Congé de maternité ?"],
    category: 'general'
  },
  explication_loi_08_08: {
    keywords: ['loi', '08'],
    synonymKeywords: ['loi 08-08', 'contentieux loi', 'expliquer 08 08', 'loi contentieux', 'loi recours'],
    summary: `## 📜 Loi n° 08-08 du 16 Safar 1429 correspondant au 23 février 2008 relative au contentieux en matière de sécurité sociale

*(Journal Officiel N°11 du 2 mars 2008)*

---

**Article 1er.** — La présente loi a pour objet de fixer :
- le contentieux de la sécurité sociale et les procédures de son règlement ;
- les procédures de recouvrement forcé des cotisations et autres créances de la sécurité sociale ;
- les recours contre les tiers et les employeurs.

---

## TITRE I — CONTENTIEUX DE LA SÉCURITÉ SOCIALE ET PROCÉDURES DE SON RÈGLEMENT

**Art. 2.** — Le contentieux en matière de sécurité sociale comprend :
- le contentieux général ;
- le contentieux médical ;
- le contentieux technique à caractère médical.

### Chapitre I — Le contentieux général

**Art. 3.** — Est entendu par contentieux général de la sécurité sociale, au sens de la présente loi, les litiges qui naissent entre les organismes de sécurité sociale d'une part et les assurés sociaux ou les assujettis d'autre part à l'occasion de l'application de la législation et de la réglementation de la sécurité sociale.

**Art. 4.** — Les litiges relevant du contentieux général sont portés obligatoirement devant les commissions de recours préalable avant tout recours aux juridictions.

#### Section 1 — Le recours préalable

**Art. 5.** — Le recours préalable est porté :
- devant la commission locale de recours préalable qualifiée, en premier ressort ;
- devant la commission nationale de recours préalable qualifiée, en cas de contestation des décisions de la commission locale de recours.

##### Sous-section 1 — La commission locale de recours préalable qualifiée

**Art. 6.** — Il est créé au sein des agences de wilayas ou régionales des organismes de sécurité sociale, des commissions locales de recours préalable qualifiées, composées des :
- représentants des travailleurs salariés ;
- représentants des employeurs ;
- représentants de l'organisme de sécurité sociale ;
- un médecin.

Le nombre des membres de ces commissions ainsi que leur organisation et leur fonctionnement sont fixés par voie réglementaire.

**Art. 7.** — La commission locale de recours préalable qualifiée statue sur les recours formulés par les assurés sociaux et les assujettis contre les décisions prises par les services des organismes de sécurité sociale.

Elle statue également sur les contestations relatives aux majorations et pénalités de retard lorsque leur montant est inférieur à un million de dinars (1.000.000 DA).

Les majorations et pénalités de retard sont réduites de 50% de leur montant au vu du dossier justifié du requérant.

Elles ne sont pas exigibles en cas de force majeure dûment constatée par la commission.

La commission est tenue de prendre sa décision dans un délai de trente (30) jours à compter de la date de réception de la requête.

**Art. 8.** — La commission locale de recours préalable qualifiée est, sous peine d'irrecevabilité, saisie par lettre recommandée avec accusé de réception ou par requête déposée au secrétariat de la commission contre un récépissé de dépôt dans un délai de **quinze (15) jours** à compter de la date de réception de la notification de la décision contestée.

Le recours doit être formulé par écrit et indiquer les griefs à l'encontre de la décision contestée.

**Art. 9.** — Les décisions de la commission locale de recours préalable qualifiée sont notifiées par lettre recommandée avec accusé de réception ou par un agent de contrôle agréé de sécurité sociale au moyen d'un procès-verbal de réception dans un délai de dix (10) jours à compter de la date de la décision.

##### Sous-section 2 — La commission nationale de recours préalable qualifiée

**Art. 10.** — Il est créé, au sein de chaque organisme de sécurité sociale, une commission nationale de recours préalable qualifiée.

La composition, l'organisation et le fonctionnement de cette commission sont fixés par voie réglementaire.

**Art. 11.** — La commission nationale de recours préalable qualifiée statue sur les recours formulés contre les décisions des commissions locales de recours préalable qualifiée.

Elle rend sa décision dans un délai de trente (30) jours à compter de la date de réception de la requête.

**Art. 12.** — Les contestations relatives aux majorations et pénalités de retard prévues en matière d'obligations des assujettis sont directement portées devant la commission nationale de recours préalable qualifiée, qui statue en premier et dernier ressort, lorsque leur montant est égal ou supérieur à un million de dinars (1.000.000 DA).

Les dispositions des alinéas 3 et 4 de l'article 7 ci-dessus sont applicables aux contestations prévues au présent article.

**Art. 13.** — La commission nationale de recours préalable qualifiée est, sous peine d'irrecevabilité, saisie par lettre recommandée avec accusé de réception ou par une requête déposée au secrétariat de la commission contre un récépissé de dépôt dans un délai de **quinze (15) jours** à compter de la date de réception de la notification de la décision de la commission locale contestée, ou dans les **soixante (60) jours** à compter de la date de saisine de la commission locale de recours préalable qualifiée, si l'intéressé n'a reçu aucune réponse à sa requête.

Le recours doit être formulé par écrit et indiquer les griefs à l'encontre de la décision contestée.

**Art. 14.** — Les décisions de la commission nationale de recours préalable qualifiée sont notifiées par lettre recommandée avec accusé de réception, ou par un agent de contrôle agréé de la sécurité sociale au moyen d'un procès-verbal de réception dans un délai de dix (10) jours à compter de la date de la décision.

#### Section 2 — Le recours juridictionnel

**Art. 15.** — Les décisions de la commission nationale de recours préalable qualifiée sont susceptibles de recours devant le tribunal compétent, conformément aux dispositions du code de procédure civile, dans un délai de **trente (30) jours** à compter de la date de remise de la notification de la décision contestée, ou dans un délai de **soixante (60) jours** à compter de la date de réception de la requête par la commission nationale de recours préalable qualifiée, si l'intéressé n'a reçu aucune réponse à sa requête.

**Art. 16.** — Relèvent de la compétence des juridictions administratives les litiges qui naissent entre les institutions et les administrations publiques en tant qu'organismes employeurs et les organismes de sécurité sociale.

### Chapitre II — Le contentieux médical

**Art. 17.** — Est entendu par contentieux médical, au sens de la présente loi, les litiges relatifs à l'état de santé des bénéficiaires de la sécurité sociale, notamment la maladie, la capacité de travail, l'état de santé du malade, le diagnostic, le traitement ainsi que toutes autres prescriptions médicales.

**Art. 18.** — Les litiges relevant du contentieux médical sont réglés, suivant le cas, par la procédure de l'expertise médicale ou dans le cadre des commissions d'invalidité de wilayas qualifiées, conformément aux dispositions de la présente loi.

#### Section 1 — L'expertise médicale

**Art. 19.** — Les litiges prévus à l'article 17 ci-dessus sont du ressort de l'expertise médicale, à l'exception de ceux prévus par l'article 31 de la présente loi.

Les résultats de l'expertise médicale s'imposent aux parties d'une manière définitive.

Toutefois, le tribunal siégeant en matière sociale peut être saisi pour une expertise judiciaire, en cas d'impossibilité de procéder à l'expertise médicale sur l'intéressé.

**Art. 20.** — La demande d'expertise médicale doit être formulée par l'assuré social dans un délai de **quinze (15) jours** à compter de la date de réception de la notification de la décision de l'organisme de sécurité sociale.

La demande d'expertise médicale doit être formulée par écrit et accompagnée d'un rapport du médecin traitant.

La demande est adressée par lettre recommandée avec accusé de réception ou déposée auprès des services de l'organisme de sécurité sociale contre récépissé de dépôt.

**Art. 21.** — Le médecin expert est désigné d'un commun accord entre l'assuré social assisté de son médecin traitant d'une part, et l'organisme de sécurité sociale, d'autre part.

Le médecin expert est choisi sur une liste de médecins experts, établie par le ministère chargé de la santé et le ministère chargé de la sécurité sociale, après consultation obligatoire du conseil de déontologie médicale.

Les conditions et modalités d'inscription sur la liste des médecins experts, ainsi que leurs droits et obligations sont fixés par voie réglementaire.

**Art. 22.** — L'organisme de sécurité sociale doit, dans un délai de **huit (8) jours** à compter de la date de dépôt de la demande, entamer la procédure de l'expertise médicale en proposant à l'assuré social par écrit, trois (3) médecins experts au moins figurant sur la liste prévue à l'article 21 ci-dessus, faute de quoi il sera tenu par l'avis du médecin traitant.

**Art. 23.** — L'assuré social est tenu d'accepter ou de refuser les médecins experts proposés dans un délai de **huit (8) jours**, sous peine de déchéance de son droit à l'expertise médicale prévu à l'article 21 (alinéa 1er) ci-dessus.

Dans le cas où il s'abstient de répondre, l'assuré social est tenu d'accepter l'expert désigné d'office par l'organisme de sécurité sociale.

**Art. 24.** — A défaut d'accord sur le choix du médecin expert conformément à l'article 21 ci-dessus, dans un délai de **trente (30) jours** à compter du dépôt de la demande de l'expertise médicale, le médecin expert est désigné d'office et immédiatement par l'organisme de sécurité sociale sur la liste des experts médicaux, à condition que le médecin expert désigné ne soit pas l'un de ceux précédemment proposés.

**Art. 25.** — L'organisme de sécurité sociale doit remettre au médecin expert un dossier comportant :
- l'avis du médecin traitant ;
- l'avis du médecin conseil ;
- un résumé des questions, objet du litige ;
- la mission du médecin expert.

**Art. 26.** — Le médecin expert est tenu de déposer à l'organisme de sécurité sociale son rapport dans les **quinze (15) jours** à compter de la date de réception du dossier cité à l'article 25 ci-dessus.

Une copie de ce rapport est adressée à l'assuré social.

**Art. 27.** — L'organisme de sécurité sociale est tenu de notifier à l'intéressé les résultats du rapport d'expertise médicale dans les **dix (10) jours** qui suivent sa réception.

**Art. 28.** — L'assuré social est déchu de son droit à l'expertise médicale dans le cas où il refuse, sans motif, de répondre aux convocations du médecin expert.

**Art. 29.** — Les honoraires dus des médecins experts désignés pour procéder à l'expertise sont à la charge de l'organisme de sécurité sociale sauf si le médecin expert atteste que la demande de l'assuré social est manifestement infondée. Dans ce cas, les honoraires dus sont à la charge de ce dernier.

Le montant des honoraires est fixé par arrêté du ministre chargé de la sécurité sociale.

#### Section 2 — La commission d'invalidité de wilaya qualifiée

**Art. 30.** — Il est créé une commission d'invalidité de wilaya qualifiée, dont la majorité des membres sont médecins.

La composition, l'organisation et le fonctionnement de cette commission sont fixés par voie réglementaire.

**Art. 31.** — La commission d'invalidité de wilaya qualifiée statue sur les litiges des décisions rendues par les organismes de sécurité sociale relatives à :
- l'état d'incapacité permanente, totale ou partielle due à un accident de travail ou une maladie professionnelle donnant lieu à l'attribution d'une rente ;
- l'admission en invalidité ainsi que la catégorie et la révision de l'état d'invalidité dans le cadre des assurances sociales.

La commission statue sur les contestations qui lui sont soumises dans un délai de **soixante (60) jours** à compter de la date de réception de la requête.

**Art. 32.** — La commission d'invalidité de wilaya qualifiée prend toutes les mesures, notamment la désignation d'un médecin expert, l'examen du malade, la demande d'examens complémentaires, et peut procéder à toute investigation qu'elle juge nécessaire.

**Art. 33.** — La commission d'invalidité de wilaya qualifiée est saisie par l'assuré social dans un délai de **trente (30) jours** à compter de la date de réception de la notification de la décision de l'organisme de sécurité sociale, objet de la contestation.

La commission est saisie par une demande écrite, accompagnée du rapport du médecin traitant, adressée par lettre recommandée avec accusé de réception ou déposée au secrétariat de la commission contre récépissé de dépôt.

**Art. 34.** — Les décisions de la commission d'invalidité de wilaya qualifiée sont notifiées dans un délai de **vingt (20) jours** à compter de la date de la décision, par lettre recommandée avec accusé de réception ou par un agent de contrôle agréé de la sécurité sociale, avec procès-verbal de réception.

**Art. 35.** — Les décisions de la commission d'invalidité de wilaya qualifiée sont susceptibles de recours devant les juridictions compétentes dans un délai de **trente (30) jours** à compter de la date de réception de la notification de la décision.

**Art. 36.** — Les frais de déplacement de l'assuré social, de ses ayants droit ou, éventuellement, de son accompagnateur hors de leur commune de résidence pour répondre à la convocation du médecin expert ou de la commission d'invalidité de wilaya qualifiée, sont à la charge de l'organisme de sécurité sociale.

Les modalités d'application des dispositions du présent article sont fixées par voie réglementaire.

**Art. 37.** — Les frais résultant de la procédure prévue par les dispositions des articles 31 à 36 ci-dessus concernant le domaine d'invalidité sont mis à la charge de l'organisme de sécurité sociale, sauf si le médecin expert atteste que la demande de l'assuré social est manifestement infondée. Dans ce cas, les honoraires dus sont à la charge de ce dernier.

### Chapitre III — Contentieux technique à caractère médical

**Art. 38.** — Est entendu par contentieux technique à caractère médical, au sens de la présente loi, les litiges qui naissent entre les organismes de sécurité sociale et les prestataires de soins et de services et relatifs à l'activité professionnelle des médecins, pharmaciens, chirurgiens-dentistes, et auxiliaires médicaux concernant la nature du traitement et le séjour dans un hôpital ou une clinique.

**Art. 39.** — Il est créé, auprès du ministre chargé de la sécurité sociale, une commission technique à caractère médical composée de façon égale de :
- médecins relevant du ministère chargé de la santé ;
- médecins de l'organisme de sécurité sociale ;
- médecins du conseil de déontologie médicale.

Le nombre des membres de cette commission ainsi que son organisation et son fonctionnement sont fixés par voie réglementaire.

**Art. 40.** — Sans préjudice des dispositions prévues par la législation et la réglementation en vigueur, la commission technique à caractère médical est chargée de statuer en premier et dernier ressort sur les dépassements ayant entraîné des dépenses supplémentaires pour l'organisme de sécurité sociale.

**Art. 41.** — La commission technique à caractère médical est habilitée à prendre toute mesure lui permettant d'établir les faits, notamment désigner un ou plusieurs experts et entreprendre toute enquête jugée nécessaire, y compris entendre le praticien concerné.

**Art. 42.** — La commission technique à caractère médical est saisie par l'organisme de sécurité sociale dans les **six (6) mois** qui suivent la découverte des dépassements sans qu'il se soit, toutefois, écoulé un délai de **deux (2) années** à compter de la date de paiement des prestations, objet du litige.

La commission technique à caractère médical est saisie par un rapport détaillé du directeur général de l'organisme de sécurité sociale, mentionnant la nature des dépassements et les montants des dépenses qui en ont découlé, accompagné des pièces justificatives.

**Art. 43.** — Les décisions de la commission technique à caractère médical sont notifiées à l'organisme de sécurité sociale, au ministre chargé de la santé et au conseil national de déontologie médicale.

---

## TITRE II — PROCÉDURES DE RECOUVREMENT FORCÉ

**Art. 44.** — Est entendu par recouvrement forcé des cotisations de sécurité sociale, au sens de la présente loi, les procédures particulières mises en oeuvre par les organismes de sécurité sociale à l'encontre des assujettis débiteurs pour le recouvrement des sommes dues.

**Art. 45.** — Les sommes dues aux organismes de sécurité sociale au titre des cotisations principales, majorations, pénalités de retard et répétition de l'indû sont recouvrées au moyen des procédures suivantes :
- le recouvrement par voie de rôle ;
- la contrainte ;
- l'opposition sur les comptes courants postaux et les comptes bancaires ;
- les retenues sur les prêts.

**Art. 46.** — L'organisme de sécurité sociale est tenu préalablement à la mise en oeuvre des procédures sus-citées, ou toute autre action ou poursuite, d'adresser au débiteur une mise en demeure l'invitant à régulariser sa situation dans un délai de **trente (30) jours**.

La mise en demeure doit comporter, sous peine de nullité, les mentions suivantes :
- le nom ou la raison sociale du débiteur ;
- les sommes dues par nature et par période d'échéance ;
- les dispositions législatives et réglementaires relatives au recouvrement forcé, ainsi que les sanctions encourues en cas de non-paiement.

La mise en demeure est notifiée, soit par lettre recommandée avec accusé de réception, soit par voie d'huissier de justice ou par un agent de contrôle agréé de la sécurité sociale, par procès-verbal de réception.

### Chapitre I — Le recouvrement par voie de rôle

**Art. 47.** — Les sommes dues sont recouvrées par les services des impôts en vertu d'un rôle fixant la créance.

Le rôle est établi par les services de l'organisme de sécurité sociale, selon un modèle déterminé par voie réglementaire et signé par le directeur d'agence de l'organisme de sécurité sociale concerné sous sa responsabilité personnelle.

Le rôle est visé par le wali dans un délai de **huit (8) jours** à compter de sa signature et devient exécutoire.

**Art. 48.** — Le rôle dûment visé est notifié conformément aux dispositions prévues au code des procédures fiscales.

Il est exécuté par les services des impôts territorialement compétents conformément aux dispositions prévues pour le recouvrement des impôts.

**Art. 49.** — Le rôle est exécutoire par provision, nonobstant toute voie de recours.

**Art. 50.** — Le rôle peut faire l'objet d'un recours devant les juridictions compétentes, dans un délai de **trente (30) jours** à compter de la date de réception de sa notification.

### Chapitre II — La contrainte

**Art. 51.** — La contrainte est établie par les services de l'organisme de sécurité sociale selon un formulaire dont le modèle est fixé par voie réglementaire et est signée par le directeur de l'agence de l'organisme de sécurité sociale concerné sous sa responsabilité personnelle.

**Art. 52.** — La contrainte est visée par le président du tribunal du lieu du domicile du débiteur dans un délai de **dix (10) jours**, sans frais et devient exécutoire.

**Art. 53.** — La contrainte est notifiée au débiteur par un agent de contrôle agréé de la sécurité sociale par un procès-verbal de réception ou par huissier de justice.

**Art. 54.** — La contrainte est exécutée conformément aux dispositions du code de procédure civile, en matière de recouvrement forcé.

**Art. 55.** — La contrainte est exécutoire par provision, nonobstant toute voie de recours.

**Art. 56.** — La contrainte peut faire l'objet d'un recours devant la juridiction l'ayant visée dans un délai de **trente (30) jours** à compter de la date de la réception de sa notification.

### Chapitre III — L'opposition sur les comptes courants postaux et comptes bancaires

**Art. 57.** — L'organisme de sécurité sociale créancier peut faire opposition sur les comptes courants postaux et les comptes bancaires de ses débiteurs, dans la limite des sommes qui lui sont dues.

**Art. 58.** — L'opposition est notifiée aux banques, établissements financiers et "Algérie Poste" représentée par le centre national des chèques postaux, par lettre recommandée avec accusé de réception.

**Art. 59.** — Les établissements susvisés destinataires de l'opposition sont tenus de conserver les montants dus sous leur responsabilité civile et pénale à compter de la date de réception de la notification de l'opposition.

**Art. 60.** — L'organisme de sécurité sociale doit présenter aux banques et établissements financiers le titre exécutoire aux fins de paiement des sommes objet de l'opposition, dans un délai de **quinze (15) jours**.

A défaut de titre exécutoire, l'organisme de sécurité sociale doit diligenter la procédure de validation de l'opposition devant la juridiction compétente dans un délai de **quinze (15) jours** à compter de la date de l'opposition.

**Art. 61.** — Pour recouvrer les sommes dues, le directeur de l'organisme de sécurité sociale créancier peut faire opposition sur les biens meubles ou les liquidités appartenant au débiteur de l'organisme, entre les mains du tiers détenteur autre que les parties prévues à l'article 59 ci-dessus et ce, conformément aux dispositions prévues par le code de procédure civile.

### Chapitre V — Les retenues sur les prêts

**Art. 62.** — Les banques et les établissements financiers sont tenus d'exiger des assujettis demandeurs de prêts une attestation de mise à jour des cotisations délivrée par les organismes de sécurité sociale compétents.

**Art. 63.** — L'organisme prêteur est tenu, le cas échéant, d'effectuer la retenue des sommes dues à l'organisme de sécurité sociale créancier et de les lui verser.

**Art. 64.** — Les banques et établissements financiers sont civilement responsables en cas d'inobservation des articles 62 et 63 ci-dessus.

### Chapitre VI — Dispositions communes

**Art. 65.** — Les frais occasionnés aux organismes de sécurité sociale, pour le recouvrement des sommes qui leur sont dues, sont à la charge du débiteur dans toutes les procédures prévues par la présente loi, en matière de recouvrement forcé.

**Art. 66.** — Après épuisement des moyens de recouvrement forcé, les procédures de recouvrement prévues par la présente loi ne sont pas exclusives du recours des organismes de sécurité sociale aux actions devant les juridictions compétentes, mesures conservatoires et voies d'exécution de droit commun.

---

## TITRE III — PRIVILÈGE ET SÛRETÉS RÉELLES

**Art. 67.** — Le paiement des sommes dues aux organismes de sécurité sociale est garanti, à compter de l'exigibilité de la créance, par un privilège sur les meubles et les immeubles du débiteur, qui intervient immédiatement après celui des salaires et des sommes dues au Trésor public.

**Art. 68.** — Le paiement des sommes dues aux organismes de sécurité sociale est garanti par une hypothèque légale prenant rang au jour de son inscription, conformément au code civil.

---

## TITRE IV — RECOURS CONTRE LES TIERS ET LES EMPLOYEURS

**Art. 69.** — Est entendu par recours contre les tiers et les employeurs en matière de sécurité sociale cités à l'article 1er ci-dessus, au sens de la présente loi :
- le recours de l'organisme de sécurité sociale contre l'auteur de la faute, cause du préjudice subi par l'assuré social, en vue du remboursement du montant des prestations servies ;
- le recours de l'assuré social ou de ses ayants droit contre l'auteur de la faute pour une réparation complémentaire.

**Art. 70.** — L'organisme de sécurité sociale doit, conformément aux dispositions du droit commun, se retourner contre le tiers responsable, par sa faute, du préjudice causé à l'assuré social, en remboursement des sommes payées ou de celles qu'elle aura à payer à ce dernier.

**Art. 71.** — L'organisme de sécurité sociale peut, conformément aux dispositions du droit commun, se retourner contre l'employeur responsable par sa faute inexcusable ou intentionnelle ou celle de son préposé, du préjudice causé à l'assuré social, en remboursement des sommes payées ou de celles qu'il aura à payer à ce dernier.

**Art. 72.** — L'assuré social ou ses ayants droit peuvent demander aux tiers ou à l'employeur des réparations complémentaires dans les cas prévus aux articles 70 et 71 ci-dessus.

Le demandeur est tenu de mettre en cause l'organisme de sécurité sociale dans l'instance.

**Art. 73.** — L'assuré social ou ses ayants droit peuvent, dans les cas prévus aux articles 70 et 71 ci-dessus, intervenir dans l'action introduite par l'organisme de sécurité sociale contre le tiers ou l'employeur, conformément aux dispositions du code de procédure civile.

**Art. 74.** — Dans le cas où la responsabilité des dommages causés à l'assuré social, est partagée entre le tiers et l'employeur, l'organisme de sécurité sociale peut se retourner contre l'un d'eux ou contre les deux tenus solidairement.

**Art. 75.** — Dans le cas où la responsabilité des dommages incombe en partie à l'assuré social, au tiers ou à l'employeur, l'organisme de sécurité sociale ne pourra se retourner contre ces deux derniers que dans la limite de leur responsabilité.

**Art. 76.** — Le règlement amiable intervenu entre l'assuré social ou ses ayants droit et le tiers ou l'employeur, dans les cas prévus aux articles 72 à 75 ci-dessus, ne peut être opposé à l'organisme de sécurité sociale que lorsque celui-ci a participé et donné son accord exprès à ce règlement.

**Art. 77.** — Les sociétés d'assurance sont tenues de retenir sur le montant de l'indemnisation des accidents de la circulation qu'elles accordent conformément à la législation en vigueur, les montants des prestations dues par l'organisme de sécurité sociale à la victime, en sa qualité d'assuré social ou à ses ayants droit.

Les modalités d'application du présent article sont déterminées par voie réglementaire.

---

## TITRE V — PRESCRIPTION

**Art. 78.** — Les prestations dues se prescrivent par **quatre (4) ans**, si elles ne sont pas réclamées.

Sous réserves des dispositions prévues à l'article 316 du code civil, les arriérés dus au titre des pensions de retraite, d'invalidité, des rentes d'accidents du travail et des maladies professionnelles, se prescrivent par **cinq (5) ans**, s'ils ne sont pas réclamés.

**Art. 79.** — Les actions et poursuites intentées par les organismes de sécurité sociale pour le recouvrement des sommes dues se prescrivent par **quatre (4) ans**.

Ce délai court à compter de la date d'exigibilité.

Toutefois, la mise en demeure prévue à l'article 46 ci-dessus éteint la prescription à compter de la date de réception de la notification.

**Art. 80.** — Les recours introduits contre les décisions des organismes de sécurité sociale n'ont pas d'effet suspensif.

Toutefois, l'exception d'irrecevabilité ne peut être opposée aux intéressés que si la décision, objet du recours, mentionne expressément les voies et délais de recours.

---

## TITRE VI — DISPOSITIONS PÉNALES

**Art. 81.** — Les infractions aux dispositions de la présente loi sont constatées par les inspecteurs du travail, les agents de contrôle agréés de la sécurité sociale ainsi que tout agent habilité conformément à la législation et à la réglementation en vigueur.

**Art. 82.** — Sans préjudice des dispositions législatives en vigueur, est punie d'un emprisonnement de **six (6) mois à deux (2) ans** et d'une amende de **cinquante mille à cent mille dinars (50.000 à 100.000 DA)**, toute personne ayant offert, accepté ou prêté des services pour obtenir, pour lui-même ou faire obtenir indûment, des prestations à des tiers.

**Art. 83.** — Sans préjudice des dispositions législatives en vigueur, est punie d'un emprisonnement de **six (6) mois à deux (2) ans** et d'une amende de **trente mille à cent mille dinars (30.000 à 100.000 DA)**, toute personne ayant fait de fausses déclarations afin d'obtenir ou de faire obtenir indûment à des tiers des prestations ou des remboursements de l'organisme de sécurité sociale.

**Art. 84.** — Sans préjudice des dispositions législatives en vigueur, est puni d'un emprisonnement de **six (6) mois à dix-huit (18) mois** et d'une amende de **cent mille à deux cent cinquante mille dinars (100.000 à 250.000 DA)**, tout médecin, pharmacien, chirurgien-dentiste, ou sage-femme ayant décrit faussement et sciemment l'état de santé d'un bénéficiaire.

**Art. 85.** — Sans préjudice des dispositions législatives en vigueur, est punie d'un emprisonnement de **six (6) mois à deux (2) ans** et d'une amende de **cent mille à trois cent mille dinars (100.000 à 300.000 DA)**, toute personne qui a tenté d'influencer, ou aura influencé, par tout moyen possible, une personne témoin d'un accident de travail à l'effet de dissimuler ou de dénaturer la vérité.

**Art. 86.** — Outre les sanctions prévues aux articles 82, 83 et 85 de la présente loi, toute personne ayant bénéficié indûment de prestations servies par l'organisme de sécurité sociale est tenue de lui rembourser les sommes qu'elle a perçues.

Les organismes de sécurité sociale peuvent se faire rembourser ces sommes au moyen de retenues sur les prestations dues.

---

## TITRE VII — DISPOSITIONS TRANSITOIRES ET FINALES

**Art. 87.** — A titre transitoire, et pour une période de **trois (3) années**, à compter de la date de publication de la présente loi au Journal officiel, les débiteurs de bonne foi, qui connaissent des difficultés financières, peuvent bénéficier d'un échéancier de paiement des cotisations de sécurité sociale.

Les cotisations payées dans ce cadre sont exonérées des majorations et pénalités de retard.

**Art. 88.** — Aucune demande d'octroi de prorogation de délai de paiement des cotisations de sécurité sociale ne peut être examinée s'il n'y a pas eu versement de la totalité de la quote-part salariale de la cotisation.

**Art. 89.** — Les modalités d'application de la présente loi sont fixées, en tant que de besoin, par voie réglementaire.

**Art. 90.** — Toutes dispositions contraires à la présente loi sont abrogées, notamment la loi n° 83-15 du 2 juillet 1983, modifiée et complétée, relative au contentieux en matière de sécurité sociale.

**Art. 91.** — La présente loi sera publiée au Journal officiel de la République algérienne démocratique et populaire.

*Fait à Alger, le 16 Safar 1429 correspondant au 23 février 2008.*
*Abdelaziz BOUTEFLIKA.*

---

### Tableau récapitulatif des délais importants :

| Procédure | Délai | Article |
|-----------|-------|---------|
| Recours devant commission locale | **15 jours** | Art. 8 |
| Décision commission locale | **30 jours** | Art. 7 |
| Notification décision locale | **10 jours** | Art. 9 |
| Recours devant commission nationale | **15 jours** (ou 60 jours sans réponse) | Art. 13 |
| Décision commission nationale | **30 jours** | Art. 11 |
| Notification décision nationale | **10 jours** | Art. 14 |
| Recours juridictionnel | **30 jours** (ou 60 jours sans réponse) | Art. 15 |
| Demande expertise médicale | **15 jours** | Art. 20 |
| CNAS propose 3 experts | **8 jours** | Art. 22 |
| Assuré accepte/refuse experts | **8 jours** | Art. 23 |
| Désignation expert d'office | **30 jours** | Art. 24 |
| Rapport médecin expert | **15 jours** | Art. 26 |
| Notification résultats expertise | **10 jours** | Art. 27 |
| Saisine commission invalidité | **30 jours** | Art. 33 |
| Décision commission invalidité | **60 jours** | Art. 31 |
| Notification décision invalidité | **20 jours** | Art. 34 |
| Recours décision invalidité | **30 jours** | Art. 35 |
| Mise en demeure débiteur | **30 jours** | Art. 46 |
| Visa du rôle par le wali | **8 jours** | Art. 47 |
| Recours contre rôle | **30 jours** | Art. 50 |
| Visa contrainte par tribunal | **10 jours** | Art. 52 |
| Recours contre contrainte | **30 jours** | Art. 56 |
| Titre exécutoire opposition | **15 jours** | Art. 60 |
| Prescription prestations | **4 ans** | Art. 78 |
| Prescription pensions/rentes | **5 ans** | Art. 78 |
| Prescription recouvrement | **4 ans** | Art. 79 |`,
    relatedQuestions: ["Procédure d'expertise médicale ?", "Le recours préalable est-il obligatoire ?", "Délais de contestation ?", "Expliquer la Loi 83-13 ?", "Commission d'invalidité ?", "Recours contre les tiers ?", "Sanctions pénales sécurité sociale ?"],
    category: 'general'
  },
  explication_loi_83_15: {
    keywords: ['loi', '83', '15'],
    synonymKeywords: ['loi 83-15', 'ancien contentieux', 'expliquer 83 15', 'ancienne loi contentieux'],
    summary: `## 📜 Loi 83-15 — Ancien Contentieux (abrogée partiellement par Loi 08-08)

La **Loi n° 83-15 du 2 juillet 1983** était l'ancien texte régissant le contentieux en matière de sécurité sociale. Elle a été **largement remplacée** par la Loi 08-08 de 2008.

### Ce qui reste pertinent :

| Disposition | Statut |
|------------|--------|
| Faute inexcusable de l'employeur (Art. 45) | **Toujours en vigueur** |
| Recours contre les tiers | Repris par Loi 08-08 |
| Procédures de contentieux | **Remplacé** par Loi 08-08 |
| Sanctions pénales | Partiellement en vigueur |

### La faute inexcusable (Art. 45) — Disposition clé toujours applicable :
- L'employeur qui avait ou devait avoir conscience du danger et n'a pas pris les mesures nécessaires
- Conséquence : **majoration** de la rente de la victime
- La CNAS verse puis se retourne contre l'employeur

> 💡 Quand on parle de la Loi 83-15 aujourd'hui, c'est principalement pour la **faute inexcusable** (Art. 45). Pour le contentieux, il faut se référer à la **Loi 08-08**.`,
    relatedQuestions: ["Qu'est-ce que la faute inexcusable ?", "Expliquer la Loi 08-08 ?", "Le recours contre un tiers ?"],
    category: 'general'
  },
  explication_loi_83_12: {
    keywords: ['loi', '83', '12'],
    synonymKeywords: ['loi 83-12', 'retraite loi', 'expliquer 83 12', 'age retraite', 'pension retraite'],
    summary: `## 📜 Loi 83-12 — La Retraite

La **Loi n° 83-12 du 2 juillet 1983** organise le régime de retraite en Algérie.

### Conditions de la retraite :

| Type | Âge | Durée de cotisation |
|------|-----|---------------------|
| **Retraite normale** | **60 ans** (H) / **55 ans** (F) | 15 ans minimum |
| **Retraite sans condition d'âge** | — | 32 ans de cotisation |
| **Retraite proportionnelle** | 50 ans min. | 20 ans min. de cotisation |
| **Retraite anticipée** (AT/MP) | Variable | Si IPP reconnue |

### Calcul de la pension :
\`Pension = 2,5% × nombre d'années × Salaire de référence\`

- Plafond : **80%** du salaire de référence (après 32 ans)
- Minimum : **75%** du SNMG

### Lien avec les AT/MP :
- Les périodes d'**ITT** (arrêt AT) comptent comme périodes de cotisation
- La **rente AT** se cumule intégralement avec la pension de retraite
- Possibilité de retraite anticipée pour **invalidité** suite à AT

> 💡 Un travailleur peut cumuler : pension de retraite + rente AT/MP + majoration tierce personne.`,
    relatedQuestions: ["Retraite anticipée et AT ?", "Peut-on cumuler rente et salaire ?", "Catégories d'invalidité ?"],
    category: 'general'
  },
  explication_guide_1995: {
    keywords: ['guide', '1995'],
    synonymKeywords: ['guide medecin', 'guide pratique', 'guide cnas', 'manuel medecin'],
    summary: `## 📜 Guide du Médecin Conseil (1995) — Le Manuel Pratique

Le **Guide du Médecin Conseil** publié par la CNAS en 1995 est le document de référence pour la pratique quotidienne du contrôle médical.

### Contenu détaillé :

| Chapitre | Sujet | Utilité |
|----------|-------|---------|
| **1** | Cadre juridique | Rappel des lois applicables |
| **2** | Contrôle des arrêts de travail | Méthodologie du contrôle |
| **3** | Évaluation de l'IPP | Barème par appareil locomoteur |
| **4** | Rechutes et révisions | Critères et procédures |
| **5** | Expertise médicale | Déroulement pratique |
| **6** | Invalidité | Les 3 catégories + commissions |
| **7** | Formulaires types | Modèles de rapports |

### Le barème indicatif (Chapitre 3) :
Le guide contient un barème détaillé par appareil :
- 🦴 Appareil locomoteur (membres supérieurs, inférieurs, rachis)
- 🧠 Neurologie et psychiatrie
- 👁️ Ophtalmologie
- 👂 ORL
- ❤️ Appareil cardio-vasculaire
- 🫁 Appareil respiratoire
- 🏥 Appareil digestif, urinaire, etc.

### Statut juridique :
- Document **indicatif** (pas force de loi)
- Le médecin conseil peut s'en écarter avec **motivation écrite**
- Sert de référence commune pour harmoniser les pratiques

> 💡 Ce guide est intégralement accessible dans l'onglet **"Textes de Loi Intégraux"** de cette application.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Rôle du médecin conseil ?", "Les formules de calcul ?"],
    category: 'general'
  },

  // ═══════════════════════════════════════════════════════════
  // SUJETS EXPERTS AVANCÉS
  // ═══════════════════════════════════════════════════════════
  salaire_reference: {
    keywords: ['salaire', 'reference'],
    synonymKeywords: ['salaire moyen', 'base calcul', 'assiette', 'salaire journalier', 'salaire mensuel moyen'],
    summary: `## 💵 Le salaire de référence

Le **salaire de référence** est la base de calcul de toutes les prestations en espèces (IJ, rentes).

### En AT/MP (Loi 83-13) :
| Prestation | Salaire de référence |
|-----------|---------------------|
| **IJ** | 1/30e du salaire du mois précédant l'arrêt |
| **Rente IPP** | Salaire annuel des 12 derniers mois (plafonné à 8× SNMG pour certains éléments) |

### En maladie ordinaire (Loi 83-11) :
| Prestation | Salaire de référence |
|-----------|---------------------|
| **IJ maladie** | 1/30e du salaire du mois précédant l'arrêt |
| **IJ maternité** | Salaire journalier net |

### Éléments inclus :
- Salaire de base
- Primes et indemnités régulières
- Heures supplémentaires régulières

### Éléments exclus :
- Primes exceptionnelles
- Remboursement de frais
- Prestations familiales

> 💡 Le salaire de référence pour la rente est **annualisé** : il prend en compte les 12 mois précédant l'accident ou l'arrêt.`,
    relatedQuestions: ["Calcul de l'indemnité journalière ?", "Comment sont calculées les rentes ?", "Les cotisations de sécurité sociale ?"],
    category: 'calcul'
  },
  capital_deces: {
    keywords: ['capital', 'deces'],
    synonymKeywords: ['capital deces', 'indemnite deces', 'deces assure', 'prime deces'],
    summary: `## ⚰️ Capital décès (Loi 83-11, Art. 50-52)

Le **capital décès** est une prestation versée en une seule fois aux ayants droit d'un assuré décédé (hors AT/MP).

### Montant :
- **12 fois** le salaire mensuel moyen des 3 derniers mois
- Minimum fixé par voie réglementaire

### Bénéficiaires (par ordre de priorité) :
1. **Conjoint survivant**
2. **Enfants** à charge
3. **Ascendants** à charge

### Différence capital décès vs rente AT/MP :

| | Capital décès (maladie) | Rentes ayants droit (AT) |
|---|------------------------|--------------------------|
| **Nature** | Versement unique | Rentes trimestrielles |
| **Durée** | Ponctuel | Viagère (conjoint) ou limitée (enfants) |
| **Base légale** | Loi 83-11 | Loi 83-13, Art. 63-67 |
| **Taux** | 12× salaire mensuel | % du salaire annuel selon le lien |

### Rentes aux ayants droit (AT/MP — décès) :

| Ayant droit | Taux de la rente |
|------------|-----------------|
| **Conjoint** | **30%** du salaire annuel |
| **Chaque orphelin** | **15%** |
| **Chaque ascendant** | **10%** |
| **Total maximum** | **85%** du salaire annuel |

> ⚠️ Les rentes AT aux ayants droit sont **cumulables** entre elles mais plafonnées à 85%.`,
    relatedQuestions: ["Droits en cas de décès de la victime ?", "Comment sont calculées les rentes ?", "Le capital forfaitaire (IPP < 10%) ?"],
    category: 'droits'
  },
  accident_mission: {
    keywords: ['accident', 'mission'],
    synonymKeywords: ['deplacement professionnel', 'mission travail', 'voyage affaire', 'detachement'],
    summary: `## 🚗 Accident en mission (Art. 6, Loi 83-13)

### Définition :
Un accident survenu lors d'une **mission professionnelle** (en dehors du lieu habituel de travail) est considéré comme un **accident du travail**.

### Conditions :
- Le salarié doit être en **mission ordonnée** par l'employeur
- L'accident doit survenir pendant la **durée de la mission**
- Le lien avec l'activité professionnelle doit être maintenu

### Ce qui est couvert :
| Situation | Couvert ? |
|-----------|----------|
| Trajet vers le lieu de mission | **Oui** (AT de trajet) |
| Accident pendant le travail sur place | **Oui** (AT) |
| Accident à l'hôtel de mission | **Oui** (extension du lieu de travail) |
| Accident pendant activité personnelle | **Non** (sauf s'il est dans le prolongement naturel) |

### Preuve :
- **Ordre de mission** écrit
- **Billets** de transport
- **Notes de frais** validées
- **Témoignages**

> 💡 La jurisprudence est favorable : pendant toute la durée de la mission, le salarié est sous la **subordination** de l'employeur, même pendant les temps de repos.`,
    relatedQuestions: ["Définition accident du travail ?", "Qu'est-ce qu'un accident de trajet ?", "Qu'est-ce que l'imputabilité ?"],
    category: 'general'
  },
  guerison_sans_sequelles: {
    keywords: ['guerison', 'sans'],
    synonymKeywords: ['guerison complete', 'aucune sequelle', 'pas de sequelle', 'guerison totale', 'remission complete'],
    summary: `## ✅ Guérison sans séquelles

### Définition :
La **guérison** est la fin du traitement avec un retour à l'état antérieur. Il n'y a **aucune séquelle** indemnisable.

### Conséquences :
| Élément | Effet |
|---------|-------|
| **IPP** | 0% — Pas de rente |
| **IJ** | Cessent à la date de guérison |
| **Soins** | Plus de prise en charge AT |
| **Dossier** | Clôturé |

### Différence guérison vs consolidation :

| | Guérison | Consolidation |
|---|---------|---------------|
| **Séquelles** | Aucune | Oui (stables) |
| **IPP** | 0% | ≥ 1% |
| **Rente** | Non | Si IPP ≥ 10% |
| **Rechute possible** | Oui | Oui |

### Le médecin conseil prononce la guérison quand :
1. Les lésions sont **totalement réparées**
2. L'examen clinique est **normal**
3. Il n'y a **aucune limitation fonctionnelle**

> ⚠️ Même en cas de guérison, la victime peut déclarer une **rechute** ultérieurement si de nouvelles lésions apparaissent en lien avec l'accident initial.`,
    relatedQuestions: ["Qu'est-ce que la consolidation ?", "Comment gérer une rechute ?", "Comment est fixé le taux d'incapacité ?"],
    category: 'medecin'
  },
  reprise_travail: {
    keywords: ['reprise', 'travail'],
    synonymKeywords: ['retour travail', 'fin arret', 'reprendre poste', 'aptitude reprise', 'mi temps therapeutique'],
    summary: `## 🏢 Reprise du travail après AT/MP

### Modalités :
La reprise peut être :
| Type | Condition | Décision de |
|------|-----------|-------------|
| **Reprise totale** | Guérison ou consolidation | Médecin traitant + MC |
| **Reprise à temps partiel** | Mi-temps thérapeutique | Médecin conseil |
| **Reprise avec aménagement** | Poste adapté | Médecin du travail |
| **Inaptitude** | Impossibilité de reprendre | Commission médicale |

### Mi-temps thérapeutique :
- Reprise progressive à **50%** du temps de travail
- **IJ complémentaires** versées par la CNAS pour le temps non travaillé
- Durée limitée, soumise à l'avis du médecin conseil
- L'employeur doit **accepter** l'aménagement

### Visite de reprise :
- **Obligatoire** après un arrêt de travail > 30 jours
- Réalisée par le **médecin du travail**
- Vérifie l'aptitude au poste

### Protection du travailleur :
- L'employeur **ne peut pas licencier** pendant l'arrêt maladie/AT
- Si inaptitude → obligation de **reclassement** avant licenciement
- Le salarié conserve son ancienneté

> 💡 Le médecin du travail et le médecin conseil ont des rôles complémentaires : le MC évalue l'incapacité, le médecin du travail évalue l'aptitude au poste spécifique.`,
    relatedQuestions: ["Contrôle des arrêts de travail ?", "Réadaptation professionnelle ?", "Qu'est-ce que la consolidation ?"],
    category: 'medecin'
  },
  aggravation_vs_rechute: {
    keywords: ['aggravation', 'rechute', 'difference'],
    synonymKeywords: ['aggravation ou rechute', 'distinction aggravation', 'rechute vs aggravation'],
    summary: `## 🔄 Aggravation vs Rechute — Distinction essentielle

### Définitions :

| | **Rechute** | **Aggravation** |
|---|-----------|----------------|
| **Moment** | Après consolidation/guérison | Avant consolidation |
| **Nature** | Nouvelle poussée des lésions initiales | Évolution défavorable en cours de traitement |
| **Conséquence** | Réouverture du dossier AT | Pas de changement de statut |
| **IJ** | Nouvelles IJ versées | IJ en cours continuent |
| **IPP** | Possible réévaluation | Pas encore évaluée |

### La rechute (Art. 56, Loi 83-13) :
- Survient **après** la date de consolidation ou guérison
- Doit être en **lien direct** avec l'accident initial
- Nécessite un **certificat médical de rechute**
- La prise en charge est **à 100%** comme pour l'AT initial

### L'aggravation (Art. 59, Loi 83-13) :
- Survient **après** la consolidation
- Modification du taux d'IPP à la hausse
- La victime peut demander une **révision** (intervalle de 3 mois si < 2 ans, 1 an si > 2 ans)
- Entraîne une **majoration de la rente**

### En pratique pour le médecin conseil :

| Situation | Action |
|-----------|--------|
| Nouvelles lésions liées à l'AT | → Rechute |
| Mêmes séquelles qui s'aggravent | → Révision pour aggravation |
| Apparition d'une nouvelle pathologie sans lien | → Rejet de rechute |

> ⚠️ La distinction est cruciale car elle détermine le **régime de prise en charge** applicable.`,
    relatedQuestions: ["Comment gérer une rechute ?", "Procédure de révision du taux ?", "Types de rejet de rechute ?"],
    category: 'medecin'
  },
  contentieux_general_vs_medical: {
    keywords: ['contentieux', 'general'],
    synonymKeywords: ['difference contentieux', 'contentieux administratif', 'quel contentieux', 'type contentieux'],
    summary: `## ⚖️ Les 3 types de contentieux (Loi 08-08)

### Vue d'ensemble :

| Type | Objet | Procédure | Délai |
|------|-------|-----------|-------|
| **Général** | Décisions administratives | Commission de recours préalable → Tribunal | 15 j |
| **Médical** | Questions médicales | Expertise médicale → Tribunal | 15 j |
| **Technique médical** | Invalidité/Inaptitude | Commission nationale → Tribunal | 30 j |

### Le contentieux GÉNÉRAL (Art. 3-16) :
Concerne les litiges **non médicaux** :
- Refus d'affiliation
- Contestation du montant des cotisations
- Refus de prise en charge
- Calcul des prestations

→ **Procédure** : Recours devant la Commission de recours préalable de la CNAS

### Le contentieux MÉDICAL (Art. 17-25) :
Concerne les **décisions médicales** :
- Taux d'IPP
- Date de consolidation
- Aptitude au travail
- Durée de l'arrêt de travail
- Date de guérison

→ **Procédure** : Expertise médicale par un médecin expert

### Le contentieux TECHNIQUE MÉDICAL (Art. 26-36) :
Concerne spécifiquement :
- **Invalidité** (catégorie, taux)
- **Inaptitude** au travail

→ **Procédure** : Commission nationale spécialisée

> 💡 **Le médecin conseil est principalement concerné par le contentieux médical** (Art. 17-25). C'est là que ses décisions sont le plus souvent contestées.`,
    relatedQuestions: ["Procédure d'expertise médicale ?", "Le recours préalable est-il obligatoire ?", "Délais de contestation ?"],
    category: 'recours'
  },
  polytraumatisme: {
    keywords: ['polytraumatisme'],
    synonymKeywords: ['poly traumatisme', 'lesions multiples', 'plusieurs blessures', 'multi lesionnel', 'traumatismes multiples'],
    summary: `## 🏥 Le polytraumatisme

### Définition :
Un **polytraumatisme** est la combinaison de **plusieurs lésions** traumatiques dont au moins une met en jeu le pronostic vital.

### Évaluation de l'IPP en cas de polytraumatisme :

**Méthode** : On utilise la **formule de Balthazard** (capacité restante) pour cumuler les différents taux.

### Étapes :
1. **Évaluer chaque lésion** séparément au barème
2. **Classer** par ordre décroissant de gravité
3. **Appliquer Balthazard** successivement

### Exemple concret :
Un accident de la route en mission causant :
- Fracture fémur → barème : **20%**
- Fracture poignet → barème : **12%**
- Perte de 2 dents → barème : **5%**

Calcul :
\`Cumul₁₂ = 20% + (12% × 80%) = 20% + 9,6% = 29,6%\`
\`Cumul₁₂₃ = 29,6% + (5% × 70,4%) = 29,6% + 3,5% = 33,1%\`

→ **IPP globale = 33%** (arrondi) au lieu de 37% en addition simple.

### Particularités :
- Le médecin conseil peut ajouter l'**IPP sociale** si retentissement professionnel
- Chaque séquelle doit être **décrite** et **motivée** individuellement
- Le lien avec l'AT doit être établi pour **chaque lésion**

> 💡 Toujours commencer par le taux le **plus élevé** et appliquer Balthazard en cascade.`,
    relatedQuestions: ["Comment fonctionne la formule de Balthazard ?", "Calcul de la capacité restante ?", "Comment est fixé le taux d'incapacité ?"],
    category: 'calcul'
  },
  carte_chifa: {
    keywords: ['chifa', 'carte'],
    synonymKeywords: ['carte assure', 'carte electronique', 'teletransmission', 'carte sante'],
    summary: `## 💳 La carte CHIFA

### Qu'est-ce que c'est ?
La **carte CHIFA** est la carte électronique de l'assuré social algérien. Elle permet la **teletransmission** des données de soins et le remboursement automatique.

### Fonctions :
| Fonction | Détail |
|----------|--------|
| **Identification** | Contient le numéro d'assuré, les ayants droit |
| **Tiers payant** | Dispense d'avance de frais chez les pharmaciens |
| **Remboursement** | Automatisation des remboursements |
| **Suivi** | Historique des consultations et ordonnances |

### Qui en bénéficie ?
- L'assuré social (titulaire)
- Le conjoint
- Les enfants (jusqu'à 18/21/25 ans selon le cas)
- Les ascendants à charge

### En cas d'AT/MP :
- La carte CHIFA **n'est pas utilisée** pour les soins AT
- On utilise la **feuille d'accident** (triptyque) qui donne droit à 100%
- La CHIFA est pour les soins de **maladie ordinaire** (80%)

### Obtention :
1. Être affilié à la CNAS
2. Fournir les documents (CNI, photos, attestation de travail)
3. Retrait à l'agence CNAS

> 💡 En pratique : **Feuille d'accident = 100% (AT)** vs **Carte CHIFA = 80% (maladie ordinaire)**.`,
    relatedQuestions: ["Assurance maladie ordinaire ?", "La feuille d'accident ?", "Affiliation et immatriculation ?"],
    category: 'pratique'
  },
  barème_officiel: {
    keywords: ['bareme', 'officiel'],
    synonymKeywords: ['bareme indicatif', 'grille evaluation', 'tableau ipp', 'referentiel bareme', 'bareme incapacite'],
    summary: `## 📊 Le barème indicatif d'évaluation des IPP

### Nature :
Le barème est un **guide indicatif** qui propose des taux d'IPP pour chaque type de séquelle. Il fait partie du Guide du Médecin Conseil (1995).

### Structure par appareil :

| Appareil | Exemples de séquelles | Taux indicatifs |
|----------|----------------------|-----------------|
| 🦴 **Membres supérieurs** | Ankylose épaule, amputation doigt | 5% à 65% |
| 🦵 **Membres inférieurs** | Ankylose genou, raccourcissement | 5% à 60% |
| 🔙 **Rachis** | Raideur cervicale, fracture vertébrale | 5% à 70% |
| 🧠 **Neurologie** | Séquelles traumatisme crânien | 5% à 100% |
| 👁️ **Ophtalmologie** | Perte de vision, diplopie | 5% à 85% |
| 👂 **ORL** | Surdité, vertiges | 5% à 60% |
| ❤️ **Cardio-vasculaire** | Insuffisance cardiaque post-trauma | 10% à 100% |
| 🫁 **Pneumologie** | Séquelles pulmonaires | 10% à 100% |
| 🏥 **Digestif/Urinaire** | Séquelles abdominales | 5% à 80% |
| 🦷 **Stomatologie** | Perte dentaire, trouble ATM | 1% à 30% |

### Principes d'utilisation :
1. Le barème est **indicatif**, pas obligatoire
2. Le médecin conseil peut s'en écarter avec **motivation**
3. Les taux tiennent compte de la **main dominante**
4. On évalue les **séquelles fonctionnelles**, pas les lésions anatomiques

> 💡 Ce barème est intégralement consultable dans le module **"Taux d'IPP"** de cette application.`,
    relatedQuestions: ["Comment est fixé le taux d'incapacité ?", "Le Guide du Médecin Conseil 1995 ?", "La formule de Balthazard ?"],
    category: 'medecin'
  },
  commission_invalidite_detail: {
    keywords: ['commission', 'invalidite'],
    synonymKeywords: ['commission medicale', 'commission locale', 'commission nationale', 'comite invalidite'],
    summary: `## 🏛️ Les commissions (invalidité, AT, recours)

### 1. Commission d'invalidité (Loi 83-11) :

| Composition | Rôle |
|------------|------|
| Médecin conseil (président) | Évalue l'état de santé |
| Médecin traitant | Présente le dossier médical |
| Médecin du travail | Avis sur l'aptitude au poste |

**Décide** : La catégorie d'invalidité (1, 2 ou 3) et le taux.

### 2. Commission locale de recours préalable (Loi 08-08) :

| Composition | Rôle |
|------------|------|
| Représentant CNAS | Examine le recours |
| Représentant des assurés | Défend les droits de l'assuré |
| Représentant des employeurs | Point de vue patronal |

**Décide** : Sur les recours administratifs (contentieux général).

### 3. Commission nationale d'invalidité (Loi 08-08, Art. 26-36) :

| Compétence | Détail |
|-----------|--------|
| Invalidité contestée | Réévalue la catégorie |
| Inaptitude au travail | Confirme ou infirme |

### 4. Commission de réforme (secteur public) :
- Spécifique aux **fonctionnaires**
- Décide de la mise en invalidité
- Détermine si l'invalidité est imputable au service

> 💡 Le médecin conseil siège dans la quasi-totalité de ces commissions. Son avis médical est **déterminant**.`,
    relatedQuestions: ["Catégories d'invalidité ?", "Le contentieux général vs médical ?", "Procédure d'expertise médicale ?"],
    category: 'procedure'
  },
  journee_accident: {
    keywords: ['journee', 'accident'],
    synonymKeywords: ['jour accident', 'premier jour', 'j0', 'jour de l accident', 'charge employeur'],
    summary: `## 📅 La journée de l'accident (Art. 35, Loi 83-13)

### Règle :
> La **journée de l'accident** est entièrement à la charge de l'**employeur**.

### Chronologie :

| Jour | Qui paie ? | Base |
|------|-----------|------|
| **J0** (jour de l'AT) | **Employeur** (salaire complet) | Art. 35 |
| **J+1** et suivants | **CNAS** (IJ à 100%) | Art. 37 |

### Conséquences pratiques :
- L'employeur verse le salaire complet de la journée de l'accident
- Les IJ de la CNAS démarrent le **lendemain**
- Pas de **délai de carence** (contrairement à la maladie ordinaire)

### Comparaison avec la maladie ordinaire :

| | AT/MP | Maladie ordinaire |
|---|------|-------------------|
| **J0** | Employeur | Employeur |
| **Carence** | **Aucune** | **3 jours** sans indemnité |
| **IJ à partir de** | **J+1** | **J+4** |
| **Taux IJ** | **100%** dès J+1 | 50% puis 100% |

> 💡 L'absence de carence en AT est un avantage majeur pour la victime.`,
    relatedQuestions: ["Calcul de l'indemnité journalière ?", "Définition accident du travail ?", "Obligations de l'employeur ?"],
    category: 'calcul'
  },
  duree_maximale_arret: {
    keywords: ['duree', 'maximale', 'arret'],
    synonymKeywords: ['duree max', 'combien temps arret', 'limite arret travail', 'arret longue duree', 'delai maximal itt'],
    summary: `## ⏱️ Durée maximale des arrêts de travail

### En AT/MP :
| Durée | Conséquence |
|-------|-----------|
| **Pas de limite légale fixe** | L'arrêt dure tant que l'état n'est pas consolidé |
| **En pratique** : contrôles réguliers par le MC | Tous les 3 à 6 mois |
| **Si l'état stagne** | Le MC peut prononcer la consolidation |

### En maladie ordinaire (Loi 83-11) :
| Durée | Conséquence |
|-------|-----------|
| Jusqu'à **3 ans** (1095 jours) | IJ maladie |
| Au-delà de **3 ans** | Passage en **invalidité** si l'état le justifie |

### Le passage en invalidité :
Après épuisement des droits aux IJ maladie (3 ans) :
1. Le médecin conseil évalue l'état
2. Si capacité de travail réduite des **2/3** → invalidité
3. Classification en catégorie 1, 2 ou 3
4. Passage des IJ à la **pension d'invalidité**

### Rôle du médecin conseil :
- Contrôle la **justification** de l'arrêt
- Vérifie l'**adéquation** entre les lésions et la durée
- Peut **écourter** un arrêt injustifié
- Prononce la **consolidation** quand l'état est stabilisé

> ⚠️ En AT, il n'y a pas de durée maximale théorique, mais le MC a l'obligation de consolider dès que l'état est **stable** et que le traitement actif n'apporte plus d'amélioration.`,
    relatedQuestions: ["Qu'est-ce que la consolidation ?", "Contrôle des arrêts de travail ?", "Catégories d'invalidité ?"],
    category: 'medecin'
  },
  taux_minimum_rente: {
    keywords: ['taux', 'minimum'],
    synonymKeywords: ['seuil rente', 'minimum ipp', '10 pourcent', 'seuil 10'],
    summary: `## 📊 Le seuil de 10% — Capital vs Rente

### Le principe fondamental :
Le taux de **10% d'IPP** est un seuil déterminant qui change la nature de la prestation :

| Taux IPP | Type de prestation | Modalité |
|----------|-------------------|----------|
| **1% à 9%** | **Capital forfaitaire** | Versement unique |
| **10% et plus** | **Rente** | Trimestrielle, viagère |

### Pourquoi c'est crucial :
- Un **capital** est versé une seule fois → pas de revalorisation
- Une **rente** est versée **à vie**, avec revalorisation périodique
- La rente ouvre droit à la **majoration tierce personne** (cat. 3)

### Autour du seuil (8-12%) — Zone critique :
Le médecin conseil doit être particulièrement **rigoureux** :
- Un taux de **9%** = capital unique (quelques milliers de DA)
- Un taux de **10%** = rente à vie (potentiellement des millions de DA)

### La rente minimale :
- Si le taux est exactement **10%**, le taux utile est **5%** (10/2)
- La rente annuelle = 5% × salaire de référence annuel

> 💡 L'évaluation entre 8% et 12% d'IPP requiert une **motivation détaillée** dans le rapport du médecin conseil.`,
    relatedQuestions: ["Le capital forfaitaire (IPP < 10%) ?", "Comment sont calculées les rentes ?", "Le taux utile, c'est quoi ?"],
    category: 'calcul'
  },
  legislation_comparee: {
    keywords: ['difference', 'lois'],
    synonymKeywords: ['comparaison lois', 'quelle loi applicable', 'coordination lois', 'articulation lois', 'lois algerie securite'],
    summary: `## 📚 Articulation des lois de sécurité sociale algériennes

### Vue d'ensemble du dispositif législatif :

| Loi | Objet | Date |
|-----|-------|------|
| **83-11** | Assurances sociales (maladie, maternité, invalidité, décès) | 02/07/1983 |
| **83-12** | Retraite | 02/07/1983 |
| **83-13** | Accidents du travail et maladies professionnelles | 02/07/1983 |
| **83-14** | Obligations des assujettis | 02/07/1983 |
| **83-15** | Contentieux (partiellement abrogée) | 02/07/1983 |
| **08-08** | Contentieux (nouveau texte) | 23/02/2008 |
| **Guide 1995** | Guide pratique du médecin conseil | 1995 |

### Quelle loi appliquer ?

| Situation | Loi applicable |
|-----------|---------------|
| Accident au travail | **83-13** |
| Maladie professionnelle | **83-13** |
| Maladie ordinaire | **83-11** |
| Maternité | **83-11** |
| Invalidité | **83-11** |
| Retraite | **83-12** |
| Contestation médicale | **08-08** |
| Faute inexcusable | **83-15** (Art. 45) |
| Cotisations | **83-14** |

> 💡 Le médecin conseil doit maîtriser **toutes ces lois** car un même dossier peut impliquer plusieurs textes (ex: un AT qui mène à une invalidité puis à une retraite anticipée).`,
    relatedQuestions: ["Expliquer la Loi 83-13 ?", "Expliquer la Loi 83-11 ?", "Expliquer la Loi 08-08 ?", "Expliquer la Loi 83-12 ?"],
    category: 'general'
  },
  travail_non_declare: {
    keywords: ['travail', 'noir'],
    synonymKeywords: ['non declare', 'sans contrat', 'informel', 'clandestin', 'pas affilie', 'pas assure'],
    summary: `## 🚫 Travail non déclaré et droits de la victime

### Le problème :
Un travailleur **non déclaré** (travail au noir) n'est pas affilié à la CNAS et n'a théoriquement aucune couverture sociale.

### Mais la loi protège quand même :

| Situation | Droit de la victime |
|-----------|-------------------|
| AT chez un employeur non déclarant | La victime **conserve ses droits** |
| Preuve de relation de travail | Peut saisir la CNAS + tribunal |
| Emploi informel avec preuves | Attestations, témoignages acceptés |

### Procédure pour la victime :
1. Rassembler les **preuves** (bulletins de paie, témoins, virements)
2. Déposer une **déclaration d'AT** directement à la CNAS
3. La CNAS peut **contraindre** l'employeur
4. En cas de refus → saisir le **tribunal social**

### Sanctions pour l'employeur :
- Remboursement de **toutes les prestations** versées par la CNAS
- **Majorations** et pénalités de retard sur les cotisations dues
- Poursuites **pénales** possibles

> ⚠️ La CNAS peut agir d'office contre l'employeur. La victime ne doit **JAMAIS** renoncer à ses droits par crainte de perdre son emploi.`,
    relatedQuestions: ["Affiliation et immatriculation ?", "Sanctions contre l'employeur ?", "Obligations de l'employeur ?"],
    category: 'droits'
  },
  accident_benevolat: {
    keywords: ['benevole'],
    synonymKeywords: ['volontaire', 'stagiaire', 'apprenti', 'formation', 'eleve'],
    summary: `## 👥 Stagiaires, apprentis et autres statuts

### Extension de la couverture AT/MP :

| Statut | Couvert AT/MP ? | Base légale |
|--------|----------------|-------------|
| **Salarié** | ✅ Oui | Loi 83-13 |
| **Apprenti** | ✅ Oui | Couvert comme un salarié |
| **Stagiaire rémunéré** | ✅ Oui | Convention de stage |
| **Élève en formation technique** | ✅ Oui | Dispositions spéciales |
| **Travailleur indépendant** | ⚠️ Selon affiliation | CASNOS |
| **Bénévole** | ❌ Non (sauf dispositions) | Pas de couverture SS |

### Le cas des apprentis :
- Couverts comme des **salariés** pendant leur apprentissage
- L'entreprise d'accueil est responsable de la **déclaration**
- Les cotisations sont à la charge de l'**employeur**

### Le cas du travailleur indépendant :
- Affilié à la **CASNOS** (pas la CNAS)
- Régime différent pour les AT
- Couverture maladie + retraite

> 💡 Le critère essentiel est l'existence d'un **lien de subordination** : si le travailleur est sous l'autorité d'un employeur, il est couvert, quel que soit son statut contractuel.`,
    relatedQuestions: ["Définition accident du travail ?", "Affiliation et immatriculation ?", "Qu'est-ce que l'imputabilité ?"],
    category: 'droits'
  },
  accident_trajet_detail: {
    keywords: ['trajet', 'detail'],
    synonymKeywords: ['accident route', 'domicile travail', 'itineraire habituel', 'detour trajet', 'trajet protege'],
    summary: `## 🛣️ L'accident de trajet en détail (Art. 12, Loi 83-13)

### Définition élargie :
L'accident de trajet couvre le parcours entre :

| Trajet protégé | De → À |
|---------------|--------|
| **Aller** | Domicile → Lieu de travail |
| **Retour** | Lieu de travail → Domicile |
| **Pause déjeuner** | Lieu de travail → Restaurant habituel |
| **Formation** | Lieu de travail → Centre de formation |

### Conditions :
1. Trajet **normal** et direct (itinéraire habituel)
2. Horaires **compatibles** avec les horaires de travail
3. Pas d'**interruption prolongée** pour motif personnel

### Détours acceptés :
| Détour | Couvert ? |
|--------|----------|
| Poser/récupérer les enfants | ✅ Oui (nécessité familiale) |
| Courses alimentaires rapides | ✅ Oui (acte de la vie courante) |
| Détour important pour convenance | ❌ Non |
| Itinéraire différent pour éviter embouteillage | ✅ Oui |

### Preuve :
- Le salarié doit prouver qu'il était **sur son trajet habituel**
- **Rapport de police** en cas d'accident de la route
- **Témoignages** de collègues ou passants
- **Horaires** d'embauche et de fin de poste

> ⚠️ Si un tiers est responsable de l'accident (autre conducteur), la **CNAS verse les prestations puis se retourne contre le tiers** (subrogation, Art. 68).`,
    relatedQuestions: ["Qu'est-ce qu'un accident de trajet ?", "Le recours contre un tiers ?", "Définition accident du travail ?"],
    category: 'general'
  },
  rente_survivants: {
    keywords: ['rente', 'survivants'],
    synonymKeywords: ['ayants droit deces', 'rente orphelin', 'rente veuve', 'rente conjoint', 'deces suite at'],
    summary: `## 👥 Rentes aux survivants (Art. 63-67, Loi 83-13)

### En cas de décès suite à un AT/MP :
Les **ayants droit** de la victime décédée ont droit à des rentes calculées sur le salaire annuel de la victime.

### Taux des rentes :

| Bénéficiaire | Taux | Conditions |
|-------------|------|-----------|
| **Conjoint** | **30%** du salaire annuel | Non remarié(e) |
| **Chaque orphelin de père OU de mère** | **15%** | < 18 ans (ou 21/25 si études) |
| **Chaque orphelin de père ET de mère** | **30%** | < 18 ans (ou 21/25 si études) |
| **Chaque ascendant** à charge | **10%** | Si à la charge de la victime |

### Plafond :
> Le total des rentes ne peut dépasser **85%** du salaire annuel de référence de la victime.

### Durée des rentes :

| Bénéficiaire | Durée |
|-------------|-------|
| Conjoint | **Viagère** (à vie, sauf remariage) |
| Enfants | Jusqu'à **18 ans** (21 si études, 25 si études supérieures) |
| Ascendants | **Viagère** |
| Enfant handicapé | **Sans limite d'âge** |

### En cas de remariage du conjoint :
- La rente est **suspendue** (pas supprimée)
- Si le nouveau mariage est dissous → la rente **reprend**

### Frais funéraires :
La CNAS prend en charge les **frais funéraires** dans la limite d'un plafond réglementaire.

> 💡 Les rentes aux ayants droit sont **révisables** : si un enfant atteint l'âge limite, sa part est **redistribuée** aux autres bénéficiaires (dans la limite du plafond de 85%).`,
    relatedQuestions: ["Droits en cas de décès de la victime ?", "Comment sont calculées les rentes ?", "Le capital décès ?"],
    category: 'droits'
  },
  tableau_maladies_pro: {
    keywords: ['tableau', 'maladies', 'professionnelles'],
    synonymKeywords: ['liste mp', 'nomenclature mp', 'maladies reconnues', 'tableau officiel mp'],
    summary: `## 📋 Les tableaux de maladies professionnelles

### Le système :
La reconnaissance d'une **maladie professionnelle** repose sur des **tableaux officiels** qui fixent pour chaque maladie :
1. La **désignation** de la maladie
2. Le **délai de prise en charge** (temps entre la fin d'exposition et l'apparition)
3. La **liste des travaux** susceptibles de provoquer la maladie

### Exemples de tableaux :

| N° | Maladie | Délai | Travaux |
|----|---------|-------|---------|
| 1 | Intoxication par le plomb | 30 j à 1 an | Fonderie, peinture, batterie |
| 25 | Silicose | 5 à 30 ans | Mines, carrières, fonderie |
| 42 | Surdité professionnelle | 1 an | Exposition au bruit > 85 dB |
| 57 | Affections péri-articulaires | 6 mois | Gestes répétitifs |
| 98 | Affections dorsales | 6 mois | Manutention lourde |

### Conditions de reconnaissance :
1. La maladie figure dans un **tableau officiel**
2. Le travailleur a été **exposé** au risque
3. Le **délai de prise en charge** est respecté
4. Les travaux correspondent à la **liste indicative**

### Si la maladie ne figure dans aucun tableau :
- Procédure particulière devant une **commission spéciale**
- Doit prouver un lien **direct et essentiel** avec le travail
- Plus difficile à faire reconnaître

> 💡 Ce module dédié aux **maladies professionnelles** est accessible dans l'onglet spécifique de cette application.`,
    relatedQuestions: ["Qu'est-ce qu'une maladie professionnelle ?", "Déclaration maladie professionnelle ?", "Prescription des droits ?"],
    category: 'general'
  },
  frais_funeraires: {
    keywords: ['frais', 'funeraires'],
    synonymKeywords: ['obseques', 'enterrement', 'funerailles', 'inhumation', 'deces frais'],
    summary: `## ⚰️ Frais funéraires (Art. 63, Loi 83-13)

### Prise en charge :
En cas de **décès suite à un AT/MP**, la CNAS prend en charge les frais funéraires.

### Montant :
- Fixé par voie **réglementaire** (arrêté)
- Correspond au coût réel dans la limite d'un **plafond**

### Qui en bénéficie :
La personne qui a **effectivement supporté** les frais funéraires (conjoint, enfant, parent, ou toute personne).

### Procédure :
1. Certificat de décès mentionnant l'AT comme cause
2. Factures des frais funéraires
3. Demande de remboursement à la CNAS

> 💡 Les frais funéraires sont distincts des **rentes aux ayants droit** : ils couvrent les dépenses d'inhumation, pas l'indemnisation des survivants.`,
    relatedQuestions: ["Droits en cas de décès de la victime ?", "Rentes aux survivants ?", "Le capital décès ?"],
    category: 'droits'
  },
  revalorisation_rentes: {
    keywords: ['revalorisation'],
    synonymKeywords: ['augmentation rente', 'indexation rente', 'actualisation rente', 'mise a jour rente'],
    summary: `## 📈 Revalorisation des rentes

### Principe :
Les rentes AT/MP et les pensions d'invalidité sont **périodiquement revalorisées** pour maintenir le pouvoir d'achat.

### Mécanisme :
| Élément | Détail |
|---------|--------|
| **Fréquence** | Annuelle ou selon décret |
| **Base** | Évolution du SNMG ou coefficient fixé par décret |
| **Application** | Automatique (pas de demande) |
| **Effet** | Augmentation proportionnelle de la rente |

### Ce qui est revalorisé :
- ✅ Rentes AT/MP (IPP ≥ 10%)
- ✅ Pensions d'invalidité
- ✅ Rentes aux ayants droit (décès AT)
- ❌ Capital forfaitaire (IPP < 10%) — versé une seule fois

### Historique récent :
Les revalorisations suivent généralement l'**augmentation du SNMG** et l'**inflation**.

> 💡 C'est un avantage majeur de la **rente** (taux ≥ 10%) par rapport au **capital** (taux < 10%) : la rente est revalorisée, le capital non.`,
    relatedQuestions: ["Comment sont calculées les rentes ?", "Le seuil de 10% ?", "Le capital forfaitaire (IPP < 10%) ?"],
    category: 'calcul'
  },
};
// ═══════════════════════════════════════════════════════════════

const processQuery = (query: string, context?: ConversationContext): { text: string; relatedQuestions?: string[]; confidence: 'high' | 'medium' | 'low'; sources?: string[]; intentKey?: string; category?: string } => {
  const normalizedQuery = normalizeText(query);
  const queryKeywords = extractMeaningfulKeywords(query);
  const queryNgrams = extractNgrams(normalizedQuery, 3);

  // ─── 0. Greetings & thanks ───
  if (isGreeting(normalizedQuery)) {
    const greetings = [
      `## 👋 Bienvenue !\n\nJe suis votre **assistant juridique expert** en sécurité sociale algérienne.\n\n### Je peux vous aider sur :\n- 🏥 **Accidents du travail** et maladies professionnelles (Loi 83-13)\n- 💊 **Assurances sociales** et prestations maladie (Loi 83-11)\n- ⚖️ **Contentieux** et procédures de recours (Loi 08-08)\n- 🧮 **Calculs** : Balthazard, rentes, taux utile, IPP sociale\n- 📋 **Procédures** : expertise, consolidation, révision\n- 👨‍⚕️ **Rôle du médecin conseil**\n\nPosez-moi votre question ou choisissez un sujet ci-dessous !`,
      `## 👋 Salam !\n\nJe suis votre **expert en droit de la sécurité sociale algérienne**.\n\nJe maîtrise les lois **83-11**, **83-13**, **83-15**, **08-08** et le **Guide du médecin conseil 1995**.\n\n> 💡 Posez-moi n'importe quelle question sur les AT/MP, les prestations, les calculs de rentes, les procédures... Je suis là pour vous aider !`
    ];
    return {
      text: greetings[Math.floor(Math.random() * greetings.length)],
      relatedQuestions: ["Définition de l'accident du travail ?", "Comment fonctionne la formule de Balthazard ?", "Calcul de l'indemnité journalière ?", "Procédure d'expertise médicale ?", "Quelles sont les ALD ?", "Les cotisations de sécurité sociale ?"],
      confidence: 'high'
    };
  }

  if (isThanks(normalizedQuery)) {
    return {
      text: `## ✅ Je vous en prie !\n\nN'hésitez pas si vous avez d'autres questions. Je suis là pour vous aider sur tous les aspects de la **sécurité sociale algérienne**.`,
      relatedQuestions: context?.lastCategory === 'calcul'
        ? ["La formule de Balthazard ?", "Comment calculer la rente ?", "Le taux utile ?"]
        : context?.lastCategory === 'procedure'
        ? ["Délais de contestation ?", "L'expertise contradictoire ?", "La feuille d'accident ?"]
        : ["Définition accident du travail ?", "Les prestations en nature ?", "Rôle du médecin conseil ?"],
      confidence: 'high'
    };
  }

  // ─── 0.5. Law reference detection ("expliquer la loi 83-13", "c'est quoi la 08-08") ───
  const lawRef = detectLawReference(normalizedQuery);
  if (lawRef && INTENTS[lawRef]) {
    const intent = INTENTS[lawRef];
    return {
      text: intent.summary || intent.text || '',
      relatedQuestions: intent.relatedQuestions,
      confidence: 'high',
      sources: [],
      intentKey: lawRef,
      category: intent.category
    };
  }

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

  // ─── 2. Scored intent matching (enhanced with n-grams + prefix stripping) ───
  const strippedQuery = stripQuestionPrefixes(normalizedQuery);
  const strippedKeywords = extractMeaningfulKeywords(strippedQuery);
  const allKeywords = [...new Set([...queryKeywords, ...strippedKeywords])];
  const intentScores: { key: string; score: number; intent: IntentDef }[] = [];

  for (const [key, intent] of Object.entries(INTENTS)) {
    let score = 0;

    // Primary keywords: check against both original and stripped query
    const primaryMatches = intent.keywords.filter(kw => normalizedQuery.includes(normalizeText(kw)) || strippedQuery.includes(normalizeText(kw)));
    score += primaryMatches.length * 3;
    
    // Bonus if ALL primary keywords match
    if (primaryMatches.length === intent.keywords.length) score += 5;

    // Synonym keywords: check if any synonym phrase matches
    if (intent.synonymKeywords) {
      for (const synPhrase of intent.synonymKeywords) {
        const synWords = normalizeText(synPhrase).split(/\s+/);
        const synMatches = synWords.filter(sw => normalizedQuery.includes(sw));
        if (synMatches.length === synWords.length) score += 4; // Full synonym phrase match
        else if (synMatches.length > 0) score += synMatches.length * 0.8; // Partial
      }
    }

    // N-gram matching: check n-grams of query against intent keywords
    for (const ngram of queryNgrams) {
      const ngramNorm = normalizeText(ngram);
      for (const kw of intent.keywords) {
        if (ngramNorm.includes(normalizeText(kw)) || normalizeText(kw).includes(ngramNorm)) {
          score += 1.5;
        }
      }
      if (intent.synonymKeywords) {
        for (const syn of intent.synonymKeywords) {
          if (ngramNorm.includes(normalizeText(syn)) || normalizeText(syn).includes(ngramNorm)) {
            score += 2;
          }
        }
      }
    }

    // Query keywords match against intent keywords (expanded) — using merged keywords
    const expandedIntentKw = expandQueryWithSynonyms(intent.keywords);
    allKeywords.forEach(qk => {
      if (expandedIntentKw.includes(qk)) score += 1;
    });

    // Bonus: check intent key name against stripped query
    const keyWords = key.split('_').filter(w => w.length > 2);
    const keyMatches = keyWords.filter(kw => strippedQuery.includes(kw));
    if (keyMatches.length >= 2) score += 3;

    // Context bonus: if the user was discussing the same category, give a boost
    if (context?.lastCategory && intent.category === context.lastCategory) {
      score += 1.5;
    }

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

    // If low confidence, check if nomenclature has better results to append
    if (confidence === 'low') {
      const nomenResults = searchNomenclature(query);
      if (nomenResults.length > 0) {
        const nomenTexts = nomenResults.slice(0, 2).map(r =>
          `### 🧮 ${r.rule}\n*${r.article}*\n\n${r.description}\n\n**Formule** : \`${r.formula}\`${r.example ? `\n\n**Exemple** : ${r.example}` : ''}`
        ).join('\n\n---\n\n');
        text += `\n\n---\n\n## Règles de calcul associées :\n\n${nomenTexts}`;
        sources.push('Nomenclature / Barème');
      }
    }

    return { text, relatedQuestions: intent.relatedQuestions, confidence, sources, intentKey: best.key, category: intent.category };
  }

  // ─── 3. Nomenclature / calculation search ───
  const nomenResults = searchNomenclature(query);
  if (nomenResults.length > 0) {
    const nomenTexts = nomenResults.slice(0, 3).map(r =>
      `### 🧮 ${r.rule}\n*${r.article}*\n\n${r.description}\n\n**Formule** : \`${r.formula}\`\n\n${r.variables?.length ? `**Variables** : ${r.variables.map(v => `\`${v.name}\` = ${v.description}`).join(', ')}` : ''}${r.example ? `\n\n**Exemple** : ${r.example}` : ''}`
    ).join('\n\n---\n\n');

    return {
      text: `## 🧮 Résultats de la nomenclature :\n\n${nomenTexts}`,
      relatedQuestions: ["Comment fonctionne la formule de Balthazard ?", "Le taux utile, c'est quoi ?", "Comment sont calculées les rentes ?"],
      confidence: 'medium',
      sources: ['Nomenclature / Barème'],
      category: 'calcul'
    };
  }

  // ─── 4. Fallback: fuzzy search across legal texts ───
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

  // ─── 5. No results — smart helpful fallback ───
  const suggestedCategories = [
    { emoji: '🏥', label: 'AT/MP', examples: ['accident du travail', 'maladie professionnelle', 'rechute'] },
    { emoji: '💊', label: 'Prestations', examples: ['indemnité journalière', 'rente', 'soins'] },
    { emoji: '⚖️', label: 'Contentieux', examples: ['expertise', 'recours', 'contestation'] },
    { emoji: '🧮', label: 'Calculs', examples: ['Balthazard', 'taux utile', 'IPP'] },
    { emoji: '👨‍⚕️', label: 'Médecin conseil', examples: ['consolidation', 'contrôle', 'imputabilité'] },
    { emoji: '📋', label: 'Procédures', examples: ['déclaration', 'prescription', 'feuille accident'] },
  ];
  const catList = suggestedCategories.map(c => `- ${c.emoji} **${c.label}** : ${c.examples.map(e => `"${e}"`).join(', ')}`).join('\n');

  return {
    text: `Je n'ai pas trouvé de réponse précise pour *"${query}"*.

### 💡 Essayez avec ces thèmes :
${catList}

### 📚 Vous pouvez aussi :
- Demander un **article spécifique** (ex: "Article 42 de la loi 83-13")
- Consulter les **textes intégraux** dans le 2e onglet
- Choisir une des **suggestions** ci-dessous`,
    relatedQuestions: ["Définition accident du travail ?", "Procédure d'expertise médicale ?", "Comment est fixé le taux d'IPP ?", "Comment gérer une rechute ?", "La formule de Balthazard ?", "Quelles sont les ALD ?"],
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
            "Qu'est-ce que l'imputabilité ?",
        ]
    },
    {
        icon: '🩺', label: 'Médecin conseil', color: 'border-emerald-300 bg-emerald-50',
        questions: [
            "Rôle du médecin conseil ?",
            "Comment est fixé le taux d'incapacité ?",
            "Prise en charge d'un état antérieur ?",
            "Le Guide du Médecin Conseil 1995 ?",
            "Contrôle des arrêts de travail ?",
            "L'IPP sociale (majoration) ?",
        ]
    },
    {
        icon: '📝', label: 'Procédures', color: 'border-amber-300 bg-amber-50',
        questions: [
            "Délai de déclaration d'un accident ?",
            "La feuille d'accident ?",
            "Obligations de l'employeur ?",
            "Comment gérer une rechute ?",
            "Prescription des droits ?",
            "Sanctions contre l'employeur ?",
        ]
    },
    {
        icon: '🧮', label: 'Calculs', color: 'border-purple-300 bg-purple-50',
        questions: [
            "La formule de Balthazard ?",
            "Le taux utile, c'est quoi ?",
            "Comment sont calculées les rentes ?",
            "Le capital forfaitaire (IPP < 10%) ?",
            "Calcul de la capacité restante ?",
            "Calcul de l'indemnité journalière ?",
        ]
    },
    {
        icon: '⚖️', label: 'Recours & Contentieux', color: 'border-red-300 bg-red-50',
        questions: [
            "Procédure d'expertise médicale ?",
            "L'expertise contradictoire ?",
            "Le recours préalable est-il obligatoire ?",
            "Délais pour contester une décision ?",
            "Qu'est-ce que la faute inexcusable ?",
            "Le recours contre un tiers ?",
        ]
    },
    {
        icon: '🏥', label: 'Prestations & Droits', color: 'border-teal-300 bg-teal-50',
        questions: [
            "Assurance maladie ordinaire ?",
            "Congé de maternité ?",
            "Quelles sont les ALD ?",
            "Appareillage et prothèses ?",
            "Rééducation fonctionnelle ?",
            "Réadaptation professionnelle ?",
        ]
    },
    {
        icon: '💼', label: 'Affiliations & Cotisations', color: 'border-indigo-300 bg-indigo-50',
        questions: [
            "Les cotisations de sécurité sociale ?",
            "Affiliation et immatriculation ?",
            "Retraite anticipée et AT ?",
            "Peut-on cumuler rente et salaire ?",
            "Conversion rente en capital ?",
            "Catégories d'invalidité ?",
        ]
    },
    {
        icon: '📜', label: 'Lois & Textes', color: 'border-orange-300 bg-orange-50',
        questions: [
            "Expliquer la Loi 83-13 ?",
            "Expliquer la Loi 83-11 ?",
            "Expliquer la Loi 08-08 ?",
            "Expliquer la Loi 83-12 ?",
            "Articulation des lois ?",
            "Le barème officiel d'IPP ?",
        ]
    }
];

const AiAssistantView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { 
            id: 'initial', role: 'model', 
            text: `## 🏛️ Expert en Sécurité Sociale Algérienne

Bienvenue ! Je suis un assistant spécialisé en **droit de la sécurité sociale algérienne**, expert en :

- 🏥 **AT/MP** — Accidents du travail et maladies professionnelles (Loi 83-13)
- 💊 **Assurances sociales** — Maladie, maternité, ALD (Loi 83-11)
- 🧮 **Calculs** — Balthazard, taux utile, rentes, IPP sociale
- ⚖️ **Contentieux** — Expertise, recours, prescription (Loi 08-08)
- 👨‍⚕️ **Médecin conseil** — Imputabilité, contrôle, consolidation
- 📋 **Procédures** — Affiliation, cotisations, sanctions

> 💡 **${Object.keys(INTENTS).length}+ sujets** couverts • **5 textes de loi** intégrés • **11 règles de calcul**

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

            // Update conversation context with intent tracking
            setConversationContext(prev => ({
                topics: [...prev.topics, currentQuery].slice(-5),
                turnCount: prev.turnCount + 1,
                lastLawId: result.sources?.length ? undefined : prev.lastLawId,
                lastIntentKey: result.intentKey || prev.lastIntentKey,
                lastCategory: result.category || prev.lastCategory
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
        setConversationContext({ topics: [], turnCount: 0, lastIntentKey: undefined, lastCategory: undefined });
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
                        <h2 className="text-sm font-bold">Dr. Hacene — Expert Sécurité Sociale</h2>
                        <p className="text-[10px] text-primary-200">Législation algérienne • {Object.keys(INTENTS).length}+ sujets • 5 lois • 11 règles de calcul</p>
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
                    Expert en sécurité sociale algérienne • {Object.keys(INTENTS).length}+ sujets • Essayez "bonjour" ou une question libre
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