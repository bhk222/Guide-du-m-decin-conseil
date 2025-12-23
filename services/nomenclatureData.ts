export interface NomenclatureRule {
    id: string;
    rule: string;
    article: string;
    description: string;
    source: 'bareme' | 'atmp' | 'manuel';
    calculation?: string;
    variables?: Variable[];
    examples?: string[];
    keywords: string[];
}

export interface Variable {
    name: string;
    description: string;
    unit?: string;
    min?: number;
    max?: number;
}

export const nomenclatureRules: NomenclatureRule[] = [
    {
        id: 'art12',
        rule: 'Article 12 - Incapacité préexistante',
        article: 'Art. 12',
        description: `Lorsqu'un assuré social, victime d'un accident du travail ou d'une maladie professionnelle, 
        est atteint d'une incapacité permanente partielle alors qu'il présentait antérieurement une incapacité 
        permanente, quelle qu'en soit la cause, le taux de l'incapacité est déterminé compte tenu de ce dernier état.
        
        La formule permet de calculer l'IPP imputable au nouvel accident en tenant compte de la capacité restante 
        après l'incapacité préexistante.`,
        source: 'atmp',
        calculation: `IPP_nouvel_accident = ((C1 - C2) / C1) × 100

Où:
C1 = Capacité avant le nouvel accident (100 - taux_antérieur)
C2 = Capacité après le nouvel accident (100 - taux_global)
taux_antérieur = IPP préexistante (en %)
taux_global = IPP totale théorique (cumul de l'ancien et du nouveau)`,
        variables: [
            {
                name: 'taux_antérieur',
                description: 'Taux d\'IPP préexistant',
                unit: '%',
                min: 0,
                max: 99
            },
            {
                name: 'taux_global',
                description: 'Taux d\'IPP global (ancien + nouveau)',
                unit: '%',
                min: 0,
                max: 100
            }
        ],
        examples: [
            'IPP antérieure: 20%, IPP globale: 35% → IPP imputable = ((80-65)/80)×100 = 18.75%',
            'IPP antérieure: 10%, IPP globale: 25% → IPP imputable = ((90-75)/90)×100 = 16.67%'
        ],
        keywords: ['article 12', 'art 12', 'antérieur', 'préexistant', 'capacité', 'incapacité préexistante', 'taux antérieur']
    },
    {
        id: 'balthazard',
        rule: 'Formule de Balthazard - Cumul des IPP',
        article: 'Cumul des lésions',
        description: `Pour cumuler plusieurs lésions survenues lors d'un même accident, on utilise la formule de Balthazard.
        Cette formule considère que chaque lésion successive réduit la capacité restante de la victime.
        
        Principe: La deuxième lésion est calculée sur la capacité restante après la première lésion, 
        la troisième sur la capacité restante après les deux premières, et ainsi de suite.`,
        source: 'bareme',
        calculation: `Pour 2 lésions:
IPP_totale = IPP1 + ((100 - IPP1) × IPP2 / 100)

Pour 3 lésions ou plus:
Étape 1: Cumul_1_2 = IPP1 + ((100 - IPP1) × IPP2 / 100)
Étape 2: Cumul_1_2_3 = Cumul_1_2 + ((100 - Cumul_1_2) × IPP3 / 100)
Et ainsi de suite...

Où:
IPP1 = Taux de la première lésion (la plus importante)
IPP2 = Taux de la deuxième lésion
IPP3 = Taux de la troisième lésion`,
        variables: [
            {
                name: 'IPP1',
                description: 'Taux de la première lésion',
                unit: '%',
                min: 0,
                max: 100
            },
            {
                name: 'IPP2',
                description: 'Taux de la deuxième lésion',
                unit: '%',
                min: 0,
                max: 100
            },
            {
                name: 'IPP3',
                description: 'Taux de la troisième lésion (optionnel)',
                unit: '%',
                min: 0,
                max: 100
            }
        ],
        examples: [
            'IPP1: 20%, IPP2: 10% → Total = 20 + (80×10/100) = 28%',
            'IPP1: 15%, IPP2: 8%, IPP3: 5% → Cumul1-2 = 22.2%, Total = 22.2 + (77.8×5/100) = 26.09%'
        ],
        keywords: ['balthazard', 'cumul', 'cumuler', 'plusieurs lésions', 'multiple', 'addition', 'somme IPP']
    },
    {
        id: 'rente_travail',
        rule: 'Calcul de la rente d\'accident du travail',
        article: 'Rente AT',
        description: `Le montant de la rente d'accident du travail dépend du taux d'IPP et du salaire de référence.
        La formule varie selon le taux d'IPP:
        - De 10% à 50%: application directe du taux sur le salaire
        - Au-delà de 50%: majoration progressive du taux`,
        source: 'atmp',
        calculation: `Si IPP ≤ 50%:
Rente_annuelle = Salaire_annuel × (IPP / 2)

Si IPP > 50%:
Partie_1 = Salaire_annuel × (50 / 2)
Partie_2 = Salaire_annuel × ((IPP - 50) × 1.5)
Rente_annuelle = Partie_1 + Partie_2

Rente_trimestrielle = Rente_annuelle / 4

Où:
Salaire_annuel = Salaire de référence (plafonné)
IPP = Taux d'incapacité permanente partielle`,
        variables: [
            {
                name: 'Salaire_annuel',
                description: 'Salaire annuel de référence',
                unit: 'DA',
                min: 0
            },
            {
                name: 'IPP',
                description: 'Taux d\'IPP',
                unit: '%',
                min: 10,
                max: 100
            }
        ],
        examples: [
            'Salaire: 300,000 DA, IPP: 30% → Rente = 300,000 × 0.15 = 45,000 DA/an',
            'Salaire: 400,000 DA, IPP: 60% → Rente = (400,000×0.25) + (400,000×0.10×1.5) = 160,000 DA/an'
        ],
        keywords: ['rente', 'indemnisation', 'salaire', 'trimestrielle', 'calcul rente', 'montant rente']
    },
    {
        id: 'consolidation',
        rule: 'Date de consolidation',
        article: 'Consolidation',
        description: `La date de consolidation marque le moment où les lésions se fixent et prennent un caractère permanent.
        C'est à partir de cette date que l'IPP est évaluée.
        
        Points importants:
        - Elle est fixée par le médecin conseil
        - Elle peut être différente de la date de reprise du travail
        - C'est le point de départ du calcul de la rente
        - Les soins après consolidation relèvent du régime des séquelles`,
        source: 'atmp',
        keywords: ['consolidation', 'date consolidation', 'fixation', 'stabilisation', 'séquelles', 'permanente']
    },
    {
        id: 'capacite_restante',
        rule: 'Calcul de la capacité restante',
        article: 'Capacité résiduelle',
        description: `La capacité restante représente la capacité fonctionnelle de la personne après une incapacité.
        Elle est essentielle pour les calculs de cumul.`,
        source: 'bareme',
        calculation: `Capacité_restante = 100 - IPP

Pour un cumul avec incapacité antérieure:
Capacité_restante_initiale = 100 - IPP_antérieure
Capacité_restante_finale = 100 - IPP_globale

Où:
IPP = Taux d'incapacité permanente partielle
IPP_antérieure = Taux d'IPP préexistant
IPP_globale = Taux d'IPP total après le nouvel accident`,
        variables: [
            {
                name: 'IPP',
                description: 'Taux d\'incapacité',
                unit: '%',
                min: 0,
                max: 100
            }
        ],
        examples: [
            'IPP: 25% → Capacité restante = 75%',
            'IPP antérieure: 20%, IPP globale: 40% → Capacités: 80% puis 60%'
        ],
        keywords: ['capacité', 'restante', 'résiduelle', 'fonctionnelle', 'capacité résiduelle']
    },
    {
        id: 'ipp_sociale',
        rule: 'IPP sociale (majoration)',
        article: 'Taux social',
        description: `Le taux social est une majoration du taux médical d'IPP tenant compte de facteurs socio-professionnels:
        - Âge de la victime
        - Profession exercée
        - Qualification professionnelle
        - Possibilités de reclassement
        - Retentissement sur l'emploi
        
        Cette majoration s'ajoute au taux médical pour obtenir le taux global d'IPP.`,
        source: 'atmp',
        calculation: `IPP_globale = IPP_médicale + IPP_sociale

Où:
IPP_médicale = Taux déterminé par examen médical
IPP_sociale = Majoration socio-professionnelle (variable)

Note: IPP_globale ne peut excéder 100%`,
        variables: [
            {
                name: 'IPP_médicale',
                description: 'Taux médical',
                unit: '%',
                min: 0,
                max: 100
            },
            {
                name: 'IPP_sociale',
                description: 'Majoration sociale',
                unit: '%',
                min: 0,
                max: 50
            }
        ],
        examples: [
            'IPP médicale: 20%, IPP sociale: 5% → Total = 25%',
            'IPP médicale: 35%, IPP sociale: 10% → Total = 45%'
        ],
        keywords: ['sociale', 'majoration', 'socio-professionnelle', 'taux social', 'âge', 'profession', 'reclassement']
    },
    {
        id: 'taux_minimum',
        rule: 'Taux minimum d\'indemnisation',
        article: 'Seuil d\'indemnisation',
        description: `Un taux minimum d'IPP de 10% est généralement requis pour ouvrir droit à une rente.
        En dessous de ce seuil, une indemnité en capital peut être versée.
        
        Cas particuliers:
        - IPP < 10%: Indemnité en capital
        - IPP ≥ 10%: Rente viagère
        - IPP = 100%: Incapacité totale`,
        source: 'atmp',
        keywords: ['minimum', 'seuil', '10%', 'indemnité capital', 'rente', 'ouverture droit']
    },
    {
        id: 'revision_taux',
        rule: 'Révision du taux d\'IPP',
        article: 'Révision',
        description: `Le taux d'IPP peut être révisé en cas d'aggravation ou d'amélioration de l'état de la victime.
        
        Conditions:
        - Modification significative de l'état de santé
        - Demande dans les délais légaux
        - Nouvelle expertise médicale
        
        Types de révision:
        - Révision pour aggravation
        - Révision pour amélioration
        - Révision d'office`,
        source: 'atmp',
        keywords: ['révision', 'aggravation', 'amélioration', 'modification', 'réexamen', 'nouvelle expertise']
    },
    {
        id: 'traumatisme_cranien',
        rule: 'Évaluation traumatisme crânien',
        article: 'TC - Barème',
        description: `L'évaluation d'un traumatisme crânien tient compte de:
        - Les lésions anatomiques (fractures)
        - Les troubles neurologiques
        - Les troubles cognitifs et comportementaux
        - L'épilepsie post-traumatique
        - Les troubles sensoriels associés
        
        Le taux global résulte du cumul selon Balthazard de ces différentes atteintes.`,
        source: 'bareme',
        keywords: ['traumatisme crânien', 'TC', 'crâne', 'neurologique', 'cognitif', 'épilepsie', 'cérébral']
    },
    {
        id: 'membre_superieur',
        rule: 'Atteintes du membre supérieur',
        article: 'MS - Barème',
        description: `L'évaluation des atteintes du membre supérieur prend en compte:
        - La main dominante (majoration possible)
        - Les limitations articulaires (épaule, coude, poignet)
        - La force de préhension
        - Les lésions nerveuses
        - Les troubles trophiques
        - La profession (retentissement fonctionnel)`,
        source: 'bareme',
        keywords: ['membre supérieur', 'bras', 'main', 'épaule', 'coude', 'poignet', 'doigt', 'préhension']
    },
    {
        id: 'rachis',
        rule: 'Atteintes rachidiennes',
        article: 'Rachis - Barème',
        description: `L'évaluation des atteintes du rachis considère:
        - Les limitations de mobilité (flexion, extension, rotation)
        - La douleur (échelle EVA)
        - Le retentissement sur les activités quotidiennes
        - Les lésions radiologiques
        - Les compressions neurologiques
        - Le secteur professionnel`,
        source: 'bareme',
        keywords: ['rachis', 'colonne', 'vertébrale', 'lombaire', 'cervical', 'dorsal', 'dos', 'hernie']
    }
];

export function searchNomenclature(query: string, source?: 'bareme' | 'atmp' | 'manuel'): NomenclatureRule[] {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    return nomenclatureRules
        .filter(rule => {
            // Filtrer par source si spécifié
            if (source && rule.source !== source) {
                return false;
            }
            
            // Recherche dans les mots-clés
            const matchesKeywords = rule.keywords.some(keyword => 
                searchTerms.some(term => keyword.toLowerCase().includes(term))
            );
            
            // Recherche dans le titre et la description
            const matchesContent = searchTerms.some(term => 
                rule.rule.toLowerCase().includes(term) ||
                rule.description.toLowerCase().includes(term) ||
                rule.article.toLowerCase().includes(term)
            );
            
            return matchesKeywords || matchesContent;
        })
        .sort((a, b) => {
            // Prioriser les correspondances exactes dans les mots-clés
            const aExactMatch = a.keywords.some(k => searchTerms.includes(k.toLowerCase()));
            const bExactMatch = b.keywords.some(k => searchTerms.includes(k.toLowerCase()));
            
            if (aExactMatch && !bExactMatch) return -1;
            if (!aExactMatch && bExactMatch) return 1;
            
            return 0;
        });
}
