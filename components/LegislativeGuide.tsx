import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { legalTexts } from '../data/civilCode';
import { Button } from './ui/Button';
import { Tabs } from './ui/Tabs';

// --- TYPES ---
interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

// --- AI BRAIN & HELPERS ---

// Normalize text for easier processing
const normalizeText = (text: string): string => 
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[-']/g, ' ');

// Function to find a specific article in a specific law
const findArticle = (lawId: string, articleNumber: number): string | null => {
    const law = legalTexts.find(l => l.id === lawId);
    if (!law) return null;

    // Regex to find "Art. X" or "Article X" and capture all text until the next "Art." or the end of the file.
    const regex = new RegExp(`(?:Art\\.|Article)[\\s.]*${articleNumber}[\\s.]([\\s\\S]*?)(?=(?:Art\\.|Article)[\\s.]*${articleNumber + 1}|$)`, 'i');
    const match = law.content.match(regex);
    
    return match ? `Art. ${articleNumber}. ${match[1].trim()}` : null;
};

// Search for keywords and extract relevant snippets
const searchKeywords = (keywords: string[]): { snippet: string, source: string }[] => {
    const results: { snippet: string, source: string, score: number }[] = [];
    const uniqueSnippets = new Set<string>();

    legalTexts.forEach(law => {
        // Find all article occurrences
        const articles = law.content.split(/(?=Art\.|Article)/i);
        
        articles.forEach(articleText => {
            const normalizedArticle = normalizeText(articleText);
            const articleHeaderMatch = articleText.match(/^(Art\.|Article)\s*\d+/i);
            const articleHeader = articleHeaderMatch ? articleHeaderMatch[0] : 'Section';

            const score = keywords.reduce((acc, kw) => {
                return normalizedArticle.includes(kw) ? acc + 1 : acc;
            }, 0);

            if (score === keywords.length) {
                const sentences = articleText.split(/(?<=[.?!])\s+/);
                const relevantSentences = sentences.filter(sentence => 
                    keywords.some(kw => normalizeText(sentence).includes(kw))
                );

                if (relevantSentences.length > 0) {
                    const snippet = relevantSentences.join(' ').trim();
                    if (!uniqueSnippets.has(snippet)) {
                         results.push({
                            snippet: `**${articleHeader}**: ${snippet}`,
                            source: law.title,
                            score
                        });
                        uniqueSnippets.add(snippet);
                    }
                }
            }
        });
    });
    
    return results.sort((a, b) => b.score - a.score);
};

const extractMeaningfulKeywords = (query: string): string[] => {
    const normalized = normalizeText(query);
    const stopWords = [
        'le', 'la', 'les', 'un', 'une', 'de', 'du', 'des', 'au', 'aux', 
        'et', 'ou', 'est', 'ce', 'que', 'qui', 'quoi', 'comment', 'quand', 
        'pourquoi', 'gerer', 'faire', 'savoir', 'quelle', 'quelles', 'quel',
        'son', 'sa', 'ses', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes',
        "qu'est-ce", "c'est", "je", "tu", "il", "elle", "nous", "vous", "ils", "elles",
        "suis", "es", "sommes", "etes", "sont", "y", "a", "t", "il", "dans", "par", "pour",
        "obtenir", "avoir", "sur"
    ];

    // Remove punctuation
    const withoutPunctuation = normalized.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");

    return withoutPunctuation
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word));
};


// The core logic of the local AI
const processQuery = (query: string): string => {
    const normalizedQuery = normalizeText(query);
    
    // --- Specific Article Lookup ---
    const articleMatch = normalizedQuery.match(/article (\d+)\s*(?:de la loi\s*)?(\d{2,2}-\d{2,2})?/);
    if (articleMatch) {
        const articleNum = parseInt(articleMatch[1], 10);
        const lawNum = articleMatch[2]; // e.g., "08-08"
        const lawId = lawNum ? `loi_${lawNum.replace('-', '_')}` : 'loi_08_08'; // Default to most recent
        
        const articleContent = findArticle(lawId, articleNum);
        if(articleContent) {
            const lawTitle = legalTexts.find(l => l.id === lawId)?.title || '';
            return `Voici le contenu de l'**Article ${articleNum}** de la **${lawTitle}** :\n\n"${articleContent}"`;
        }
    }
    
    // --- Keyword-based Intent Matching ---
    const intents = {
        // Questions Générales AT/MP
        definition_accident_travail: { keywords: ['definition', 'accident', 'travail'], law: 'loi_83_13', article: 6 },
        accident_trajet: { keywords: ["qu'est-ce", 'accident', 'trajet'], law: 'loi_83_13', article: 12 },
        delai_declaration_accident: { keywords: ['delai', 'declaration', 'accident'], law: 'loi_83_13', article: 13 },
        declaration_maladie_pro: { keywords: ['declaration', 'maladie professionnelle'], law: 'loi_83_13', article: 71 },
        incapacite_invalidite: { keywords: ['difference', 'incapacite', 'invalidite'], text: "L'**incapacité permanente partielle (IPP)** est la conséquence d'un accident du travail ou d'une maladie professionnelle. Elle est évaluée par un taux (%) et donne droit à une rente ou un capital. L'**invalidité** est une réduction de la capacité de travail (d'au moins 50%) due à une maladie ou un accident d'origine non professionnelle, et elle donne droit à une pension. (Réf: Loi 83-11 et 83-13)" },

        // Rôle du Médecin
        certificat_medical_initial: { 
            keywords: ['contenu', 'certificat medical initial', 'role', 'medecin traitant'], 
            summary: "Le médecin traitant établit deux certificats principaux :\n\n- **Le certificat médical initial** : Il doit décrire en détail l'état de la victime, la nature des lésions et leur lien possible avec l'accident, ainsi que la durée probable de l'incapacité de travail (Art. 22, 23 de la loi 83-13).\n\n- **Le certificat final** : Il est établi à la fin du traitement et indique soit la **guérison** sans séquelle, soit la **consolidation** avec des conséquences définitives (incapacité permanente) (Art. 22, 24 de la loi 83-13)."
        },
        role_medecin_conseil: {
            keywords: ['role', 'medecin conseil'],
            summary: "Le rôle du médecin conseil de l'organisme de sécurité sociale est multiple :\n\n- **Contrôle médical** : Il s'assure de la justification des arrêts de travail et de la pertinence des soins prescrits (Art. 64, Loi 83-11).\n- **Évaluation de l'incapacité** : Il fixe le taux d'incapacité permanente (IPP) après consolidation, en se basant sur le barème indicatif (Art. 42, Loi 83-13).\n- **Avis sur la consolidation** : Il donne son avis sur la date de consolidation de la blessure ou de la maladie.\n- **Procédure d'expertise** : Il représente l'organisme de sécurité sociale dans la procédure d'expertise médicale en cas de litige (Art. 22, Loi 08-08)."
        },
        consolidation: { keywords: ["qu'est-ce", 'consolidation'], law: 'loi_83_13', article: 24 },
        fixation_taux_incapacite: { keywords: ['comment', 'fixe', 'taux', 'incapacite'], law: 'loi_83_13', article: 42 },
        etat_anterieur: { keywords: ['prise en charge', 'etat anterieur'], law: 'loi_83_13', article: 10 },
        tierce_personne: { keywords: ['conditions', 'tierce personne'], law: 'loi_83_13', article: 46 },
        
        // Procédures et Recours
        procedure_expertise: { 
            keywords: ['procedure', 'expertise medicale'],
            summary: "La procédure d'expertise médicale, en cas de désaccord sur une décision médicale de la CNAS, se déroule comme suit :\n\n1. **Demande :** L'assuré doit formuler une demande écrite, accompagnée d'un rapport de son médecin traitant, dans un **délai de 15 jours** après réception de la notification de la CNAS (Art. 20, Loi 08-08).\n\n2. **Désignation de l'expert :** L'expert est choisi d'un commun accord. La CNAS propose au moins 3 experts. L'assuré a 8 jours pour répondre. En cas de désaccord persistant ou d'absence de réponse, la CNAS désigne un expert d'office (Art. 21 à 24, Loi 08-08).\n\n3. **Déroulement :** Le médecin expert reçoit le dossier (avis du médecin traitant et du médecin conseil) et doit rendre son rapport dans les **15 jours** (Art. 25, 26, Loi 08-08).\n\n4. **Conclusion :** Les conclusions du rapport d'expertise s'imposent aux deux parties. La CNAS notifie la décision finale à l'assuré (Art. 19, 27, Loi 08-08).\n\nLes honoraires de l'expert sont à la charge de la CNAS, sauf si la demande de l'assuré est jugée manifestement infondée (Art. 29, Loi 08-08)."
        },
        delai_expertise: { keywords: ['delai', 'expertise medicale'], law: 'loi_08_08', article: 20 },
        honoraires_medecin_expert: { keywords: ['role', 'honoraires', 'medecin expert'], law: 'loi_08_08', article: 29 },
        revision_taux: { 
            keywords: ['procedure', 'revision', 'taux'], 
            summary: "La révision d'une rente d'incapacité est possible en cas d'**aggravation ou d'atténuation** de l'état de santé de la victime, constatée après la date de consolidation initiale (Art. 58, Loi 83-13).\n\nLa demande de révision peut être faite par la victime ou par la CNAS. Des examens de contrôle peuvent avoir lieu :\n- Tous les **3 mois** durant les 2 premières années.\n- Tous les **ans** après ce délai de 2 ans (Art. 59, Loi 83-13)."
        },
        definition_aggravation: { 
            keywords: ['quoi', 'aggravation'],
            summary: `Mon évaluation en tant qu'expert ne se fonde pas sur le ressenti subjectif de la victime, mais sur l'**application stricte des articles de loi** définissant les conditions de réouverture d'un dossier après consolidation.

## 1. LE FONDEMENT LÉGAL DE L'AGGRAVATION : L'Article 58

Le point de départ de toute expertise en matière de rechute est la définition légale de la révision du dossier. La loi impose une condition sine qua non pour qu'une aggravation soit reconnue.

**Texte de référence : Article 58 de la Loi 83-13**

« La rente peut faire l'objet d'une révision en cas d'aggravation [...] de l'infirmité de la victime. La procédure de révision est **limitée au cas de modification effective** de l'état de la victime, postérieurement à la date d'effet de la décision fixant la guérison ou la consolidation. »

**Analyse expertale :** L'Article 58 introduit le concept clé de « **modification effective** ».

Juridiquement, cela signifie que la simple persistance des douleurs ou des gênes, si elles étaient déjà présentes lors de la consolidation initiale, ne constitue pas une aggravation.

Pour l'expert, l'aggravation n'existe que si une **différence objective** peut être démontrée entre l'état de santé "figé" au jour de la consolidation et l'état de santé au jour de la nouvelle demande.

## 2. LA MÉTHODOLOGIE D'ÉVALUATION DE L'EXPERT

En application de l'Article 58, mon examen clinique procède par une **méthode comparative stricte** pour rechercher cette "modification effective".

### A. Le référentiel : L'état consolidé (T0)
Je me base sur le rapport médical final ayant conduit à la consolidation de l'accident initial. Ce rapport décrit les séquelles stabilisées (ex: flexion du genou à 90°, cicatrices non inflammatoires, etc.). C'est l'état de référence.

### B. L'examen actuel : La recherche de la modification (T+1)
Je confronte l'état actuel à ce référentiel. La modification doit être objective. Les doléances subjectives (douleur seule) ne suffisent pas à caractériser une modification effective au sens de la loi.

Je recherche des éléments nouveaux et mesurables, tels que :

- **Cliniques :** Apparition d'un épanchement, réduction mesurable des amplitudes articulaires par rapport à la consolidation, amyotrophie nouvelle, signes neurologiques déficitaires nouveaux.

- **Paracliniques (Imagerie) :** Apparition ou aggravation visible de lésions radiologiques (ex: pincement articulaire arthrosique, cal vicieux) qui n'existaient pas sur les clichés de fin de traitement initial.

**Décision expertale découlant de l'Article 58 :**

- Si l'examen clinique est superposable à celui de la consolidation : Je conclus à un **ÉTAT STATIONNAIRE**. Le critère de "modification effective" de l'Art. 58 n'est pas rempli. **Avis défavorable**.

- Si l'examen objective une dégradation clinique ou radiologique nouvelle : Le critère de "modification effective" est rempli. **Avis favorable** sous réserve du point suivant.

## 3. LA CONDITION DE PRISE EN CHARGE : L'Article 62

Une fois la modification effective constatée (Art. 58), il faut déterminer si elle justifie une prise en charge au titre de la "rechute". La loi pose une seconde condition.

**Texte de référence : Article 62 de la Loi 83-13**

« En cas de rechute de la victime, entraînant la **nécessité d'un traitement médical**, qu'il y ait ou non nouvelle incapacité temporaire, l'organisme de sécurité sociale statue sur la prise en charge de la rechute. »

**Analyse expertale :** L'Article 62 précise que l'aggravation doit être d'une importance clinique suffisante pour nécessiter des soins actifs.

Une aggravation mineure qui ne requiert pas de thérapeutique (médicamenteuse, physique ou chirurgicale) ne relève pas de la rechute au sens de l'article 62.

L'expert doit valider la **pertinence et la nécessité des soins** prescrits par le médecin traitant.`
        },
        rechute: { keywords: ['gerer', 'rechute'], law: 'loi_83_13', article: 62 },
        rejet_rechute: { 
            keywords: ['rejet', 'rechute'],
            summary: `Il existe deux types de rejet de la rechute :

## 1. Le Rejet Administratif de la Rechute

Ce rejet signifie que votre demande est **irrecevable pour des raisons de délais ou de procédure**, avant même l'examen médical. Il est basé sur l'**Article 59**.

**L'Article de référence :** Article 59.

**La Règle :** La loi impose des intervalles stricts pour demander une révision (rechute/aggravation) :
- Durant les **2 premières années** après la guérison/consolidation : tous les **3 mois maximum**.
- Après 2 ans : les demandes ne peuvent se faire qu'à des intervalles d'**au moins un (1) an**.

**Le Motif du Rejet :** Si vous déposez une demande de rechute 6 mois après la dernière décision alors que vous êtes soumis à l'intervalle d'un an, la caisse rejette administrativement votre demande car le délai légal entre deux demandes n'est pas respecté.

## 2. Le Rejet Médical de la Rechute

Ce rejet intervient après l'avis du Médecin Conseil. Il signifie que votre état de santé ne remplit pas les critères de la loi. Il se base sur les **Articles 58 et 62**.

### A. Motif : "État Stationnaire" (Pas de changement)

**L'Article de référence :** Article 58.

**La Règle :** La révision (prise en charge de la rechute) est « limitée au cas de **modification effective** de l'état de la victime ».

**Le Motif du Rejet :** Le Médecin Conseil note "Rejet Médical" car il considère que votre état est le même qu'avant (stationnaire). Il n'y a pas de "modification effective" prouvée cliniquement.

### B. Motif : "Soins non nécessaires"

**L'Article de référence :** Article 62.

**La Règle :** La rechute doit entraîner « la **nécessité d'un traitement médical** ».

**Le Motif du Rejet :** Si vous avez des douleurs mais que cela ne nécessite pas, au sens médical, un nouveau traitement actif (médicaments, rééducation, etc.), le médecin rejette la rechute.

## Tableau Récapitulatif

| Type de Rejet | Ce que dit la loi (Motif) | Article à citer |
|---------------|---------------------------|-----------------|
| **Administratif** | Vous n'avez pas respecté l'intervalle de temps (ex: 1 an) entre deux demandes. | Art. 59 |
| **Médical** | Il n'y a pas de "modification effective" de votre état (c'est pareil qu'avant). | Art. 58 |
| **Médical** | Votre état ne nécessite pas de "traitement médical" actif. | Art. 62 |`
        },
        recours_prealable_obligatoire: { keywords: ['recours prealable', 'obligatoire'], law: 'loi_08_08', article: 4 },
        composition_commission_invalidite: { keywords: ['composition', 'commission', 'invalidite'], law: 'loi_83_15', article: 32 },

        // Questions spécifiques
        definition_faute_inexcusable: { keywords: ['definition', 'faute inexcusable'], law: 'loi_83_15', article: 45 },
        calcul_indemnite_journaliere: { keywords: ['calcul', 'indemnite journaliere'], law: 'loi_83_13', article: 37 },
        calcul_rentes: { keywords: ['calcul', 'rentes'], law: 'loi_83_13', article: 45 },
        cumul_rente_salaire: { keywords: ['cumul', 'rente', 'salaire'], text: "Le cumul d'une rente d'accident du travail avec un salaire est possible sans aucune réduction. La rente indemnise la perte de capacité physique, tandis que le salaire rémunère le travail effectué." },
        droits_deces_victime: { keywords: ['droits', 'deces', 'victime'], law: 'loi_83_13', articles: [52, 53, 54, 55] },
        categories_invalidite: { keywords: ['categories', 'invalidite'], law: 'loi_83_11', article: 36 },
        
        // Ajouts 1
        obligations_employeur: { 
            keywords: ['obligations', 'employeur', 'accident'],
            summary: "L'employeur a plusieurs obligations principales :\n\n- **Déclaration :** Déclarer l'accident à la CNAS dans les 48h (Art. 13, Loi 83-13).\n- **Feuille d'accident :** Délivrer à la victime une feuille d'accident pour la gratuité des soins.\n- **Maintien du salaire :** Payer intégralement la journée de travail au cours de laquelle l'accident s'est produit (Art. 35, Loi 83-13).\n- **Prévention :** Mettre en œuvre les mesures de prévention nécessaires."
        },
        incapacite_temporaire_permanente: {
            keywords: ['difference', 'incapacite temporaire', 'permanente'],
            summary: "L'**incapacité temporaire** est la période d'arrêt de travail juste après l'accident, jusqu'à la consolidation. Elle donne droit à des indemnités journalières. L'**incapacité permanente** (IPP) est la séquelle définitive après consolidation. Elle est évaluée par un taux (%) et donne droit à une rente ou un capital (Art. 38, Loi 83-13)."
        },
        frais_transport: {
            keywords: ['frais', 'transport', 'charge'],
            summary: "Les frais de transport de la victime sont pris en charge par la sécurité sociale pour : le transport en ambulance si nécessaire, les convocations pour contrôle médical ou expertise par la CNAS, ou pour recevoir des soins dans un établissement éloigné de sa résidence (Réf: Art. 9, Loi 83-11 et Art. 85, Loi 83-13)."
        },
        choix_medecin: {
            keywords: ['victime', 'choisir', 'medecin'],
            summary: "Oui, la victime d'un accident du travail a le droit de choisir le praticien qui établira le certificat médical initial et le certificat final (guérison ou consolidation), comme le stipule l'Article 22 de la loi 83-13."
        },

        // Ajouts 2 (pour atteindre 30+)
        non_declaration_employeur: { keywords: ['employeur', 'refuse', 'declare', 'pas declare'], law: 'loi_83_13', article: 14 },
        contester_consolidation: { keywords: ['contester', 'date', 'consolidation'], text: "Oui, la date de consolidation fixée par le médecin conseil de la CNAS peut être contestée. Ce litige relève du **contentieux médical**. La procédure à suivre est celle de l'**expertise médicale**, comme le prévoit la Loi 08-08 relative au contentieux." },
        prestations_en_nature: { keywords: ['prestations', 'nature'], summary: "Les 'prestations en nature' désignent la prise en charge directe des soins de santé. Pour un accident du travail, cela inclut à 100% :\n\n- Les frais médicaux et chirurgicaux.\n- Les frais pharmaceutiques et d'hospitalisation.\n- Les appareils de prothèse et d'orthopédie (fourniture, réparation).\n- Les frais de rééducation fonctionnelle et de réadaptation professionnelle.\n(Réf: Art. 29 à 34, Loi 83-13)" },
        sequelles_psychologiques: { keywords: ['sequelles', 'psychologiques', 'psychiatriques', 'stress', 'post-traumatique'], text: "Oui, les séquelles psychologiques et psychiatriques (Névroses post-traumatiques, Trouble de Stress Post-Traumatique - TSPT) sont indemnisables si elles sont directement liées à l'accident du travail. Elles sont évaluées par le médecin conseil selon le barème indicatif, au même titre que les séquelles physiques." },
        delais_contestation_cnas: { keywords: ['delais', 'contester', 'decision', 'cnas'], summary: "Les délais de contestation d'une décision de la CNAS sont stricts :\n\n- **Pour un litige d'ordre général** (non-médical) : le recours doit être déposé devant la commission locale de recours préalable dans les **15 jours** suivant la notification de la décision (Art. 8, Loi 08-08).\n\n- **Pour un litige d'ordre médical** (contester un diagnostic, une date de consolidation...) : la demande d'expertise médicale doit être formulée dans les **15 jours** (Art. 20, Loi 08-08).\n\n- **Pour contester le taux d'IPP ou l'état d'invalidité** : le recours devant la commission d'invalidité de wilaya doit être fait dans les **30 jours** (Art. 33, Loi 08-08)." },
        faute_victime: { keywords: ['faute', 'victime', 'impacte', 'annule'], text: "En principe, le régime des accidents du travail est un régime de 'risque professionnel' et non de 'faute'. L'indemnisation est due même si l'accident est causé par une imprudence ou une négligence de la victime. La seule exception est la **faute intentionnelle** de la victime, qui, si prouvée, peut annuler le droit à réparation." },
        soins_etranger: { keywords: ['soins', 'etranger'], law: 'loi_83_11', article: 83 },
        fonds_prevention: { keywords: ['fonds', 'prevention'], law: 'loi_83_13', articles: [73, 74, 75] },
        
        // Original intents
        composition_commission_locale: { keywords: ['composition', 'commission locale recours'], law: 'loi_08_08', article: 6 },
        definition_contentieux_medical: { keywords: ['definition', 'contentieux medical'], law: 'loi_08_08', article: 17 }
    };

    for (const key in intents) {
        const intent = intents[key as keyof typeof intents];
        if (intent.keywords.every(kw => normalizedQuery.includes(normalizeText(kw)))) {
            if ('summary' in intent && intent.summary) {
                return intent.summary;
            }
            if ('text' in intent && intent.text) { // Handle direct text response
                return intent.text;
            }
            if ('article' in intent && 'law' in intent && typeof intent.article === 'number' && typeof intent.law === 'string') {
                const articleContent = findArticle(intent.law, intent.article);
                const lawTitle = legalTexts.find(l => l.id === intent.law)?.title || '';
                return `D'après la **${lawTitle}** :\n\n${articleContent || `Contenu de l'article ${intent.article} non trouvé.`}`;
            }
             if ('articles' in intent && 'law' in intent && Array.isArray(intent.articles) && typeof intent.law === 'string') {
                 const lawTitle = legalTexts.find(l => l.id === intent.law)?.title || '';
                 const articlesToShow: number[] = intent.articles;
                 if (articlesToShow.length <= 2) {
                    const content = articlesToShow.map(num => `${findArticle(intent.law, num) || `Article ${num} non trouvé.`}`).join('\n\n');
                    return `La réponse se trouve dans les articles suivants de la **${lawTitle}** :\n\n${content}`;
                 } else {
                    const exampleArticle = articlesToShow.length > 0 ? articlesToShow[0] : '';
                    const lawNum = intent.law.replace('loi_', '').replace('_', '-');
                    return `La procédure est détaillée dans les articles ${articlesToShow.join(', ')} de la **${lawTitle}**. Je vous recommande de demander un article spécifique (ex: "article ${exampleArticle} de la loi ${lawNum}").`;
                 }
            }
        }
    }

    // --- Generic Keyword Search as Fallback ---
    const queryKeywords = extractMeaningfulKeywords(query);
    if(queryKeywords.length > 0) {
        const searchResults = searchKeywords(queryKeywords);
        if(searchResults.length > 0) {
            const topResult = searchResults[0];
            return `J'ai trouvé une information pertinente dans la **${topResult.source}** :\n\n${topResult.snippet}\n\nPour une réponse plus précise, essayez de formuler votre question différemment ou de demander un article spécifique.`;
        }
    }

    return "Je n'ai pas trouvé de réponse précise dans les textes de loi. Pouvez-vous reformuler votre question ou essayer l'une des suggestions ci-dessous ?";
};


// --- UI COMPONENTS ---

const AiAvatar: React.FC = () => (
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center border-2 border-primary-200 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-1.792 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
    </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 p-3 animate-fade-in">
        <AiAvatar />
        <div className="flex items-center space-x-1.5 p-3 bg-white rounded-2xl rounded-bl-lg border border-slate-200/90 shadow-sm">
            <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.3s]"></div>
            <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.15s]"></div>
            <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
        </div>
    </div>
);

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.role === 'user';
    const textToRender = message.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n- /g, '\n• ') // Use bullet points for lists
        .replace(/\n/g, '<br />')
        .replace(/<br \/>(•)/g, '$1')
        .replace(/((?:Art|Réf|Loi)[\s.:\d-]+)/g, '<em class="text-slate-500 not-italic font-medium">$1</em>');

    return (
        <div className={`flex items-end gap-3 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <AiAvatar />}
            <div 
                className={`p-3 rounded-2xl max-w-xl shadow-sm ${
                    isUser 
                    ? 'bg-primary-600 text-white rounded-br-lg' 
                    : 'bg-white text-slate-800 rounded-bl-lg border border-slate-200/90'
                }`}
            >
                <div className="text-sm prose max-w-none prose-p:my-1 prose-strong:text-inherit" dangerouslySetInnerHTML={{ __html: textToRender }} />
            </div>
        </div>
    );
};

const AiAssistantView: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', role: 'model', text: "Bonjour, je suis Dr. Hacene, votre assistant juridique. Posez-moi une question sur la législation AT/MP en Algérie, ou choisissez une suggestion." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const popularQuestions = useMemo(() => [
        "Délai de déclaration d'un accident ?", "Comment fixer le taux d'incapacité ?", "Qu'est-ce que la consolidation ?", "Procédure d'expertise médicale", "Différence incapacité / invalidite ?", "Comment gérer une rechute ?", "Conditions pour une tierce personne ?", "Qu'est-ce que la faute inexcusable ?", "Qu'est-ce qu'un accident de trajet ?", "Déclaration maladie professionnelle ?", "Calcul de l'indemnité journalière ?", "Procédure de révision d'un taux ?", "Prise en charge d'un état antérieur ?", "Rôle du médecin traitant ?", "Le recours préalable est-il obligatoire ?", "Composition de la commission d'invalidité ?", "Quel est le rôle du médecin conseil ?", "Comment sont calculées les rentes ?", "Peut-on cumuler rente et salaire ?", "Droits en cas de décès de la victime ?", "Obligations de l'employeur en cas d'accident ?", "Différence incapacité temporaire/permanente ?", "Frais de transport pris en charge ?", "La victime peut-elle choisir son médecin ?", "Que faire si l'employeur refuse de déclarer l'accident ?", "Comment contester la date de consolidation ?", "Qu'est-ce que les 'prestations en nature' ?", "Les séquelles psychologiques sont-elles indemnisées ?", "Délais pour contester une décision de la CNAS ?", "Une faute de la victime annule-t-elle les droits ?", "Les soins à l'étranger sont-ils pris en charge ?", "Qu'est-ce que le fonds de prévention des AT/MP ?"
    ], []);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = useCallback((query?: string) => {
        const currentQuery = (query || input).trim();
        if (!currentQuery) return;

        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', text: currentQuery }]);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            const responseText = processQuery(currentQuery);
            setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'model', text: responseText }]);
            setIsLoading(false);
        }, 500 + Math.random() * 500); // Simulate network delay
    }, [input]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-slate-50 rounded-lg shadow-inner border border-slate-200">
            <div className="flex-1 overflow-y-auto space-y-6 p-4 custom-scrollbar" ref={messagesEndRef}>
                {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
                {isLoading && <TypingIndicator />}
            </div>
            
            <div className="p-4 border-t border-b border-slate-200 bg-slate-100/70">
                <h3 className="text-sm font-bold text-slate-700 mb-3">Suggestions de questions :</h3>
                <div className="max-h-36 overflow-y-auto custom-scrollbar pr-2">
                    <div className="flex flex-wrap gap-2">
                        {popularQuestions.map(q => (
                            <button
                                key={q}
                                onClick={() => handleSend(q)}
                                className="flex-grow basis-[45%] md:basis-[30%] p-2 bg-white rounded-md shadow-sm border text-xs font-medium text-slate-700 hover:border-primary-400 hover:text-primary-600 transition-all text-left"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-3 border-t border-slate-200 bg-white/80 backdrop-blur-sm rounded-b-lg">
                <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1.5">
                     <button className="p-2 text-slate-500 hover:text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>
                     <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Posez votre question ici..."
                        className="w-full p-2 border-none focus:ring-0 resize-none bg-transparent text-black text-sm"
                        rows={1}
                        disabled={isLoading}
                    />
                    <Button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="self-stretch !rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </Button>
                </div>
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

    const filteredTexts = useMemo(() => {
        if (!searchTerm) {
            return legalTexts;
        }
        const lowercasedFilter = normalizeText(searchTerm);
        return legalTexts.filter(law => 
            normalizeText(law.title).includes(lowercasedFilter) ||
            normalizeText(law.content).includes(lowercasedFilter)
        );
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
                    placeholder="Rechercher dans tous les textes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-2 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50"
                />
            </div>
            {filteredTexts.length > 0 ? (
                filteredTexts.map(law => (
                     <details key={law.id} className="group" open={!!searchTerm}>
                        <summary className="cursor-pointer p-3 bg-slate-200 rounded-md font-bold text-slate-800 group-open:bg-primary-200 group-open:text-primary-900 transition-colors flex justify-between items-center">
                            {law.title}
                            <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </summary>
                        <div className="p-4 bg-white border border-t-0 border-slate-200 rounded-b-md">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                                <Highlight text={law.content} highlight={searchTerm} />
                            </pre>
                        </div>
                    </details>
                ))
            ) : (
                 <div className="text-center text-slate-500 mt-10">
                    <p>Aucun résultat trouvé pour "{searchTerm}".</p>
                </div>
            )}
        </div>
    );
};


export const LegislativeGuide: React.FC = () => {
    const tabs = [
        { id: 'ai-assistant', label: 'Assistant Juridique IA', content: <AiAssistantView /> },
        { id: 'full-texts', label: 'Textes de Loi Intégraux', content: <FullLegalTextsView /> }
    ];

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 h-full">
            <Tabs tabs={tabs} defaultTab="ai-assistant" />
        </div>
    );
};