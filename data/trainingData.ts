/**
 * 🎓 BASE D'ENTRAÎNEMENT POUR L'IA MÉDICO-LÉGALE
 * 
 * Cette base contient des cas cliniques réels annotés pour améliorer
 * la reconnaissance et l'analyse de l'IA locale.
 * 
 * Structure : Descriptions patient → Lésion attendue + Critères + Taux
 */

export interface TrainingCase {
    id: string;
    category: 'vision' | 'audition' | 'membres_sup' | 'membres_inf' | 'rachis' | 'thorax' | 'neurologique';
    
    // Descriptions variées que le patient peut donner
    userDescriptions: string[];
    
    // Lésion attendue (référence barème)
    expectedInjury: {
        name: string;
        path: string;
        rate: number | [number, number];
    };
    
    // Critères cliniques clés à détecter
    clinicalKeywords: string[];
    
    // Niveau de gravité selon critères
    severityLevel: 'faible' | 'moyen' | 'élevé';
    
    // Justification médico-légale type
    expertReasoning: string;
    
    // Pièges fréquents à éviter
    commonMistakes: string[];
}

export const trainingCases: TrainingCase[] = [
    // ==================== VISION ====================
    {
        id: 'VIS001',
        category: 'vision',
        userDescriptions: [
            "cataracte post traumatique avec baisse de l'acuité visuelle",
            "cataracte traumatique oeil droit acuité 3/10",
            "opacité du cristallin suite accident avec baisse vision",
            "cataracte après choc oeil gauche voit flou",
            "cristallin opaque post trauma acuité visuelle diminuée"
        ],
        expectedInjury: {
            name: "Cataracte (selon acuité et complications)",
            path: "Séquelles Maxillo-Faciales, ORL et Ophtalmologiques > Yeux - Lésions Spécifiques et Annexes",
            rate: [10, 100]
        },
        clinicalKeywords: ['cataracte', 'cristallin', 'opacité', 'acuité visuelle', 'baisse vision', 'flou'],
        severityLevel: 'moyen',
        expertReasoning: "La cataracte post-traumatique est évaluée selon l'acuité visuelle CORRIGÉE de chaque œil (OD/OG). Taux basé sur tableau à double entrée (p.120 barème). Majorations possibles si gêne au port de correction ou aphaquie non opérée.",
        commonMistakes: [
            "❌ Confondre avec décollement rétine (pas d'opacité cristallin)",
            "❌ Confondre avec taie cornée (opacité cornée vs cristallin)",
            "❌ Oublier de demander acuité visuelle OD ET OG séparément",
            "❌ Proposer 'Champ Visuel' au lieu de 'Cécité et Baisse Vision'"
        ]
    },
    {
        id: 'VIS002',
        category: 'vision',
        userDescriptions: [
            "perte totale vision oeil droit suite trauma",
            "cécité oeil gauche après accident",
            "ne voit plus rien oeil droit post traumatique",
            "amaurose complète oeil gauche",
            "oeil droit aveugle depuis accident"
        ],
        expectedInjury: {
            name: "Perte complète de la vision d'un oeil (l'autre étant normal)",
            path: "Séquelles Maxillo-Faciales, ORL et Ophtalmologiques > Yeux - Cécité et Baisse de Vision",
            rate: 30
        },
        clinicalKeywords: ['perte vision', 'cécité', 'aveugle', 'amaurose', 'ne voit plus', 'vision nulle'],
        severityLevel: 'élevé',
        expertReasoning: "Perte complète vision unilatérale = taux FIXE 30% (barème algérien 1967, Art. 8). L'autre œil doit être NORMAL. Si œil sain a aussi baisse vision → utiliser tableau double entrée.",
        commonMistakes: [
            "❌ Confondre avec perte vision sans difformité [25-30%] (même taux mais contexte esthétique différent)",
            "❌ Appliquer taux si œil controlatéral aussi atteint (→ tableau double entrée)",
            "❌ Oublier de vérifier prothèse oculaire possible"
        ]
    },

    // ==================== MEMBRES INFÉRIEURS ====================
    {
        id: 'MBI001',
        category: 'membres_inf',
        userDescriptions: [
            "fracture des plateaux tibiaux avec raideur genou",
            "fracture plateau tibial interne avec limitation flexion 90 degrés",
            "plateau tibial fracturé genou raide douloureux",
            "enfoncement plateau tibial externe avec instabilité",
            "fracture bi-plateau tibial avec déviation varus 8 degrés"
        ],
        expectedInjury: {
            name: "Fracture des plateaux tibiaux - Avec déviation et/ou raideur",
            path: "Membres Inférieurs > Genou",
            rate: [10, 30]
        },
        clinicalKeywords: ['plateau tibial', 'enfoncement', 'raideur', 'limitation flexion', 'déviation', 'instabilité'],
        severityLevel: 'moyen',
        expertReasoning: "Fracture articulaire grave du genou. Taux selon : 1) Déviation axiale (varus/valgus en degrés), 2) Raideur (amplitude flexion-extension), 3) Instabilité ligamentaire. Risque arthrose précoce à mentionner.",
        commonMistakes: [
            "❌ Confondre avec fracture isolée tibia diaphysaire (pas articulaire)",
            "❌ Confondre avec fracture pilon tibial (cheville, pas genou)",
            "❌ Oublier de mesurer déviation axiale (crucial pour taux)",
            "❌ Ne pas distinguer uni-plateau vs bi-plateau (gravité différente)"
        ]
    },
    {
        id: 'MBI002',
        category: 'membres_inf',
        userDescriptions: [
            "entorse grave genou avec rupture LCA",
            "laxité genou suite rupture ligament croisé antérieur",
            "genou instable avec dérobements fréquents après trauma",
            "rupture LCA non opérée avec instabilité",
            "ligament croisé antérieur rompu avec laxité importante"
        ],
        expectedInjury: {
            name: "Séquelles de rupture du ligament croisé antérieur (LCA)",
            path: "Membres Inférieurs > Genou",
            rate: [10, 25]
        },
        clinicalKeywords: ['LCA', 'ligament croisé antérieur', 'laxité', 'instabilité', 'dérobement', 'ressaut'],
        severityLevel: 'moyen',
        expertReasoning: "Rupture LCA → instabilité antéro-postérieure. Taux selon : 1) Degré laxité (test Lachman, tiroir antérieur), 2) Dérobements (fréquence, circonstances), 3) Arthrose débutante, 4) Limitation activités (sports pivot, escaliers).",
        commonMistakes: [
            "❌ Confondre LCA avec LCP (mécanismes/symptômes différents)",
            "❌ Sous-estimer si pas de douleur (instabilité suffit)",
            "❌ Oublier d'évaluer dérobements (critère MAJEUR)",
            "❌ Ne pas mentionner risque arthrose secondaire"
        ]
    },
    {
        id: 'MBI003',
        category: 'membres_inf',
        userDescriptions: [
            "fracture malléole externe avec raideur cheville",
            "fracture bi-malléolaire consolidée avec limitation dorsiflexion",
            "fracture cheville avec cal vicieux et déformation",
            "fracture malléolaire avec arthrose cheville débutante",
            "fracture bi-malléolaire avec boiterie persistante"
        ],
        expectedInjury: {
            name: "Fracture malléolaire ou bi-malléolaire - Avec raideur modérée",
            path: "Membres Inférieurs > Cheville",
            rate: [10, 20]
        },
        clinicalKeywords: ['malléole', 'cheville', 'raideur', 'limitation', 'dorsiflexion', 'flexion plantaire'],
        severityLevel: 'moyen',
        expertReasoning: "Fracture articulaire cheville. Taux selon : 1) Raideur (amplitudes dorsi/flexion plantaire), 2) Cal vicieux (déviation, élargissement cheville), 3) Arthrose tibio-tarsienne, 4) Boiterie et périmètre marche.",
        commonMistakes: [
            "❌ Confondre malléole avec pilon tibial (gravité différente)",
            "❌ Négliger arthrose post-traumatique (majore taux)",
            "❌ Ne pas distinguer uni vs bi-malléolaire (gravité différente)",
            "❌ Oublier d'évaluer périmètre de marche"
        ]
    },

    // ==================== MEMBRES SUPÉRIEURS ====================
    {
        id: 'MBS001',
        category: 'membres_sup',
        userDescriptions: [
            "fracture col chirurgical humérus avec raideur épaule",
            "fracture tête humérale avec limitation abduction 60 degrés",
            "fracture épaule avec douleurs permanentes et perte force",
            "col chirurgical consolidé avec raideur importante",
            "fracture extrémité supérieure humérus avec limitation"
        ],
        expectedInjury: {
            name: "Fracture de la tête humérale ou du col chirurgical - Avec raideur",
            path: "Membres Supérieurs > Épaule",
            rate: [20, 30]
        },
        clinicalKeywords: ['col chirurgical', 'tête humérale', 'épaule', 'abduction', 'antépulsion', 'rotation'],
        severityLevel: 'moyen',
        expertReasoning: "Fracture proximale humérus. Taux selon : 1) Amplitudes (abduction, antépulsion, rotations), 2) Force (testing deltoïde, coiffe rotateurs), 3) Douleurs (EVA repos/mouvement), 4) Retentissement (toilette, habillage, port charges).",
        commonMistakes: [
            "❌ Confondre avec fracture diaphyse humérale (taux différent)",
            "❌ Oublier d'évaluer rotations (externes surtout)",
            "❌ Négliger testing coiffe des rotateurs (souvent lésée)",
            "❌ Ne pas demander côté dominant/non dominant"
        ]
    },
    {
        id: 'MBS002',
        category: 'membres_sup',
        userDescriptions: [
            "fracture poignet avec raideur importante",
            "fracture radius distal avec limitation prono-supination",
            "poignet raide suite fracture avec perte mobilité",
            "fracture Pouteau-Colles avec douleurs et raideur",
            "fracture extrémité inférieure radius avec cal vicieux"
        ],
        expectedInjury: {
            name: "Raideur du poignet (limitation des mobilités de 25 à 50%)",
            path: "Membres Supérieurs > Poignet et Main",
            rate: [5, 15]
        },
        clinicalKeywords: ['poignet', 'raideur', 'limitation', 'flexion', 'extension', 'prono-supination', 'inclinaisons'],
        severityLevel: 'moyen',
        expertReasoning: "Raideur poignet post-fracture. Taux selon : 1) Amplitudes (flexion/extension, inclinaisons, prono-supination), 2) Force poigne (dynamomètre vs côté sain), 3) Retentissement fonctionnel (écriture, préhension), 4) Douleurs résiduelles.",
        commonMistakes: [
            "❌ Confondre avec ankylose complète (taux beaucoup plus élevé)",
            "❌ Oublier d'évaluer prono-supination (crucial)",
            "❌ Ne pas mesurer force de préhension (majore taux)",
            "❌ Négliger retentissement professionnel (travaux manuels)"
        ]
    },

    // ==================== RACHIS ====================
    {
        id: 'RAC001',
        category: 'rachis',
        userDescriptions: [
            "tassement vertébral L3 avec lombalgie chronique",
            "fracture compression L4 avec douleurs lombaires permanentes",
            "tassement vertèbre lombaire avec limitation flexion rachis",
            "fracture L2 consolidée avec raideur rachis lombaire",
            "compression vertébrale lombaire avec lombalgie invalidante"
        ],
        expectedInjury: {
            name: "Tassement simple d'une vertèbre lombaire - Avec lombalgies et limitation légère",
            path: "Séquelles du Rachis, du Bassin et de la Moelle Épinière > Rachis",
            rate: [5, 10]
        },
        clinicalKeywords: ['tassement', 'compression', 'vertèbre', 'lombaire', 'lombalgie', 'limitation flexion', 'distance doigts-sol'],
        severityLevel: 'moyen',
        expertReasoning: "Tassement vertébral lombaire. Taux selon : 1) Douleurs (EVA, fréquence, retentissement), 2) Limitation rachis (distance doigts-sol, schober), 3) Retentissement fonctionnel (port charges, station debout prolongée), 4) Imagerie (degré tassement, arthrose).",
        commonMistakes: [
            "❌ Confondre avec hernie discale (pathologie différente)",
            "❌ Sous-estimer si imagerie montre tassement minime (clinique prime)",
            "❌ Oublier de mesurer distance doigts-sol (critère objectif)",
            "❌ Ne pas distinguer tassement simple vs graves (multi-vertébraux, complications)"
        ]
    },

    // ==================== NEUROLOGIQUE ====================
    {
        id: 'NEU001',
        category: 'neurologique',
        userDescriptions: [
            "paralysie nerf radial avec main tombante",
            "nerf radial sectionné avec déficit extenseurs doigts",
            "main qui tombe suite section nerf radial",
            "impossibilité extension poignet et doigts après trauma",
            "nerf radial paralysé avec perte extension complète"
        ],
        expectedInjury: {
            name: "Paralysie complète du nerf radial",
            path: "Séquelles des Nerfs Crâniens et Périphériques > Nerfs des Membres Supérieurs",
            rate: [30, 40]
        },
        clinicalKeywords: ['nerf radial', 'paralysie', 'main tombante', 'extension', 'déficit moteur', 'impossibilité'],
        severityLevel: 'élevé',
        expertReasoning: "Paralysie nerf radial → main tombante. Taux selon : 1) Testing musculaire (extenseurs poignet/doigts/pouce), 2) Déficit sensitif (dos main), 3) Récupération (EMG : dénervation active/réinnervation), 4) Troubles trophiques, 5) Retentissement (préhension impossible).",
        commonMistakes: [
            "❌ Confondre avec paralysie médian (territoires différents)",
            "❌ Sous-estimer si récupération partielle (testing précis nécessaire)",
            "❌ Oublier d'évaluer déficit sensitif (majore taux)",
            "❌ Ne pas demander EMG (pronostic récupération)"
        ]
    }
];

/**
 * 🎯 PATTERNS DE RECONNAISSANCE AVANCÉS
 * 
 * Règles métier pour améliorer la détection automatique
 */
export const recognitionPatterns = {
    // Détection lésions par mots-clés experts
    expertKeywordDetection: {
        'cataracte': {
            mustInclude: ['cataracte', 'cristallin', 'opacité cristallin'],
            mustExclude: ['cornée', 'rétine', 'vitré'],
            expectedSection: 'Yeux - Lésions Spécifiques et Annexes',
            clinicalDataRequired: ['acuité visuelle OD', 'acuité visuelle OG', 'correction optimale'],
            scoringCriteria: 'Acuité visuelle corrigée + complications port correction'
        },
        'plateau tibial': {
            mustInclude: ['plateau tibial', 'plateau', 'tibia proximal'],
            mustExclude: ['diaphyse', 'pilon', 'malléole'],
            expectedSection: 'Membres Inférieurs > Genou',
            clinicalDataRequired: ['amplitudes genou', 'déviation axiale', 'test laxité', 'RX genou'],
            scoringCriteria: 'Raideur + déviation angulaire + instabilité + arthrose'
        },
        'ligament croisé': {
            mustInclude: ['LCA', 'LCP', 'ligament croisé', 'ligament croise'],
            mustExclude: ['ligament latéral', 'ménisque'],
            expectedSection: 'Membres Inférieurs > Genou',
            clinicalDataRequired: ['test lachman', 'tiroir antérieur/postérieur', 'dérobements', 'testing quadriceps'],
            scoringCriteria: 'Degré laxité + dérobements fréquents + arthrose débutante + limitation activités'
        }
    },

    // Ambiguïtés fréquentes nécessitant clarification
    commonAmbiguities: [
        {
            trigger: ['fracture tibia', 'fracture jambe'],
            clarificationNeeded: 'Préciser localisation : plateau tibial (genou), diaphyse, pilon tibial (cheville), ou malléole',
            possibleInjuries: [
                'Fracture des plateaux tibiaux',
                'Fracture isolée du tibia',
                'Fracture du pilon tibial',
                'Fracture malléolaire'
            ]
        },
        {
            trigger: ['baisse vision', 'voit mal', 'vision floue'],
            clarificationNeeded: 'Préciser cause : cataracte (opacité cristallin), décollement rétine, atrophie optique, ou taie cornée ?',
            possibleInjuries: [
                'Cataracte (selon acuité et complications)',
                'Décollement de la rétine post-traumatique',
                'Atrophie optique post-traumatique',
                'Taies de cornée (selon gêne visuelle)'
            ]
        },
        {
            trigger: ['raideur épaule', 'épaule raide', 'limitation épaule'],
            clarificationNeeded: 'Préciser cause : fracture (col chirurgical, trochiter), luxation, ou rupture coiffe rotateurs ?',
            possibleInjuries: [
                'Fracture de la tête humérale ou du col chirurgical - Avec raideur',
                'Séquelles de luxation de l\'épaule - Avec raideur',
                'Rupture complète de la coiffe des rotateurs'
            ]
        }
    ],

    // Règles métier pour éviter erreurs fréquentes
    expertRules: [
        {
            rule: 'Si description mentionne CATARACTE → NE JAMAIS proposer section "Champ Visuel"',
            explanation: 'Cataracte = opacité cristallin → baisse acuité visuelle → section "Cécité et Baisse de Vision" ou "Lésions Spécifiques"'
        },
        {
            rule: 'Si fracture PLATEAU TIBIAL → NE PAS confondre avec pilon tibial (cheville)',
            explanation: 'Plateau tibial = extrémité PROXIMALE tibia (genou) ≠ pilon tibial = extrémité DISTALE (cheville)'
        },
        {
            rule: 'Si lésion OCULAIRE → recommandations = acuité visuelle OD/OG, champ visuel, PAS amplitudes articulaires',
            explanation: 'Ne jamais mélanger recommandations ophtalmologiques et orthopédiques'
        },
        {
            rule: 'Si paralysie NERVEUSE → TOUJOURS demander EMG (pronostic récupération)',
            explanation: 'EMG distingue dénervation active (récupération possible) vs chronique (séquellaire)'
        },
        {
            rule: 'Si fracture ARTICULAIRE → TOUJOURS évaluer arthrose post-traumatique (majore taux)',
            explanation: 'Fractures articulaires (plateau tibial, pilon tibial, poignet) → risque arthrose élevé'
        }
    ]
};

/**
 * 🔍 FONCTION DE VALIDATION DES ANALYSES IA
 * 
 * Compare analyse IA vs cas d'entraînement pour détecter erreurs
 */
export function validateIAAnalysis(
    userInput: string,
    proposedInjury: string,
    proposedRate: number,
    trainingCase: TrainingCase
): {
    isCorrect: boolean;
    score: number;
    feedback: string[];
} {
    const feedback: string[] = [];
    let score = 100;

    // Vérifier si lésion proposée correspond
    if (proposedInjury !== trainingCase.expectedInjury.name) {
        score -= 50;
        feedback.push(`❌ Lésion incorrecte. Attendu: "${trainingCase.expectedInjury.name}", Proposé: "${proposedInjury}"`);
    } else {
        feedback.push(`✅ Lésion correcte: "${proposedInjury}"`);
    }

    // Vérifier si taux proposé dans fourchette attendue
    const expectedRate = trainingCase.expectedInjury.rate;
    if (Array.isArray(expectedRate)) {
        const [min, max] = expectedRate;
        if (proposedRate < min || proposedRate > max) {
            score -= 30;
            feedback.push(`⚠️ Taux hors fourchette. Attendu: [${min}-${max}%], Proposé: ${proposedRate}%`);
        } else {
            feedback.push(`✅ Taux dans fourchette: ${proposedRate}% ∈ [${min}-${max}%]`);
        }
    } else {
        if (proposedRate !== expectedRate) {
            score -= 30;
            feedback.push(`⚠️ Taux incorrect. Attendu: ${expectedRate}%, Proposé: ${proposedRate}%`);
        } else {
            feedback.push(`✅ Taux correct: ${proposedRate}%`);
        }
    }

    // Vérifier détection mots-clés cliniques
    const detectedKeywords = trainingCase.clinicalKeywords.filter(kw =>
        userInput.toLowerCase().includes(kw.toLowerCase())
    );
    if (detectedKeywords.length < trainingCase.clinicalKeywords.length / 2) {
        score -= 20;
        feedback.push(`⚠️ Mots-clés cliniques manqués: ${trainingCase.clinicalKeywords.filter(kw => !detectedKeywords.includes(kw)).join(', ')}`);
    } else {
        feedback.push(`✅ Mots-clés détectés: ${detectedKeywords.join(', ')}`);
    }

    return {
        isCorrect: score >= 70,
        score,
        feedback
    };
}

/**
 * 📊 STATISTIQUES D'ENTRAÎNEMENT
 */
export function getTrainingStatistics() {
    const stats = {
        totalCases: trainingCases.length,
        byCategory: {
            vision: trainingCases.filter(c => c.category === 'vision').length,
            audition: trainingCases.filter(c => c.category === 'audition').length,
            membres_sup: trainingCases.filter(c => c.category === 'membres_sup').length,
            membres_inf: trainingCases.filter(c => c.category === 'membres_inf').length,
            rachis: trainingCases.filter(c => c.category === 'rachis').length,
            thorax: trainingCases.filter(c => c.category === 'thorax').length,
            neurologique: trainingCases.filter(c => c.category === 'neurologique').length
        },
        totalDescriptions: trainingCases.reduce((sum, c) => sum + c.userDescriptions.length, 0),
        averageDescriptionsPerCase: (trainingCases.reduce((sum, c) => sum + c.userDescriptions.length, 0) / trainingCases.length).toFixed(1)
    };

    return stats;
}
