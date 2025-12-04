// Test de détection sévérité pour "arrachement"

const normalize = (text) => {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, "'");
};

const severityKeywords = {
    élevé: [
        'impossible', 'impossibilite', 'impotence', 'incapacite totale',
        'arret definitif', 'fin carriere', 'reconversion professionnelle',
        'severe', 'sevère', 'majeur', 'majeure', 'grave', 'important', 'importante', 'considerable',
        'intense', 'tres douloureux', 'tres important',
        'arrachement', 'comminutive', 'eclatement', 'explose', 'plurifragmentaire',
        'deplacement important', 'deplacement majeur', 'fortement deplacee',
        'persistante', 'permanent', 'chronique severe', 'invalidant',
        'instabilite', 'instabilité', 'raideur severe', 'ankylose',
        'boiterie', 'claudication', 'paralysie',
        'chirurgie', 'opere', 'opéré',
        'algodystrophie', 'pseudarthrose', 'cal vicieux important',
        'amputation', 'raccourcissement'
    ],
    moyen: [
        'modérée', 'modere', 'moderee', 'moyen', 'moyenne',
        'chronique', 'persistant', 'recidivant',
        'difficile', 'limite', 'limitation', 'gene', 'gêne',
        'douleur', 'douloureuse', 'raideur', 'cal vicieux'
    ],
    faible: [
        'legere', 'légère', 'minime', 'discret', 'discrète',
        'simple', 'bonne consolidation', 'bien consolide'
    ]
};

const testCases = [
    "fracture arrachement astragale",
    "fracture arrachement de l'astragale",
    "fracture comminutive tibia",
    "fracture simple tibia"
];

console.log("=== TEST DÉTECTION SÉVÉRITÉ ARRACHEMENT ===\n");

testCases.forEach(testCase => {
    const normalized = normalize(testCase);
    console.log(`Test: "${testCase}"`);
    console.log(`  Normalisé: "${normalized}"`);
    
    // Check faible
    const faibleSigns = severityKeywords.faible.filter(kw => normalized.includes(kw));
    console.log(`  Faible keywords: ${faibleSigns.length > 0 ? faibleSigns.join(', ') : 'AUCUN'}`);
    
    // Check élevé
    const élevéSigns = severityKeywords.élevé.filter(kw => normalized.includes(kw));
    console.log(`  Élevé keywords: ${élevéSigns.length > 0 ? '✅ ' + élevéSigns.join(', ') : '❌ AUCUN'}`);
    
    // Check moyen
    const moyenSigns = severityKeywords.moyen.filter(kw => normalized.includes(kw));
    console.log(`  Moyen keywords: ${moyenSigns.length > 0 ? moyenSigns.join(', ') : 'AUCUN'}`);
    
    // Détermination finale
    let level = 'moyen'; // défaut
    if (faibleSigns.length > 0) level = 'faible';
    else if (élevéSigns.length > 0) level = 'élevé';
    else if (moyenSigns.length > 0) level = 'moyen';
    
    console.log(`  ➡️ Niveau final: ${level}\n`);
});
