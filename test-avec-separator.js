// Test de détection cumul avec "avec" separator
// V3.3.53

const testCases = [
    {
        input: "fracture malléole interne avec fracture arrachement astragale et rupture tendon jambier",
        expected: "3 lésions détectées (fracture malléole, fracture astragale, rupture tendon)"
    },
    {
        input: "Fracture du trochanter et diaphyse fémorale",
        expected: "2 lésions détectées (fracture trochanter, fracture diaphyse)"
    },
    {
        input: "fracture scaphoïde carpien avec rupture ligament",
        expected: "2 lésions détectées (fracture scaphoïde, rupture ligament)"
    }
];

console.log("=== TEST CUMUL DETECTION AVEC 'AVEC' SEPARATOR ===\n");

// Fonction de normalisation (copie simplifiée)
const normalize = (text) => {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, "'");
};

// Fonction de détection (version simplifiée basée sur V3.3.53)
const detectMultipleLesions = (text) => {
    const normalized = normalize(text);
    
    // Compter types de lésions
    const lesionTypes = [];
    if (/fracture/i.test(normalized)) lesionTypes.push('fracture');
    if (/rupture/i.test(normalized)) lesionTypes.push('rupture');
    if (/luxation/i.test(normalized)) lesionTypes.push('luxation');
    const hasMultipleLesionTypes = lesionTypes.length >= 2;
    
    // Détection lésions multiples avec "avec" ou "et"
    const multipleLesionsWithConnectors = /(?:fracture|luxation|rupture|lesion).*(?:avec|et).*(?:fracture|luxation|rupture|lesion)/i.test(normalized);
    
    // Détection fractures même os
    const multipleFracturesSameBone = /fracture.*(?:et|,).*fracture|(?:trochanter|col|diaphyse|pilon|plateau).*(?:et|,).*(?:diaphyse|pilon|plateau|trochanter|col)/i.test(normalized);
    
    const isCumul = multipleFracturesSameBone || (multipleLesionsWithConnectors && hasMultipleLesionTypes);
    
    return {
        isCumul,
        lesionTypes,
        hasMultipleLesionTypes,
        multipleLesionsWithConnectors,
        multipleFracturesSameBone
    };
};

// Fonction d'extraction (version simplifiée basée sur V3.3.53)
const extractIndividualLesions = (text) => {
    const normalized = normalize(text);
    
    // Pattern 5: Lésions mixtes avec "avec"
    const mixedLesionsPattern = /(?:fracture|luxation|rupture|lesion).*?avec.*?(?:fracture|luxation|rupture|lesion)/i;
    if (mixedLesionsPattern.test(normalized)) {
        const parts = normalized.split(/\s*(?:avec|et)\s*/i);
        const filteredParts = parts.filter(p => p.length > 5 && /fracture|luxation|rupture|lesion/i.test(p));
        if (filteredParts.length >= 2) {
            return filteredParts;
        }
    }
    
    // Pattern 1: Fractures même os
    const sameBonePattern = /fracture.*?(trochanter|col|diaphyse|pilon|plateau|condyle|epicondyle).*?(?:et|,).*?(trochanter|col|diaphyse|pilon|plateau|condyle|epicondyle)/i;
    const sameBoneMatch = sameBonePattern.exec(normalized);
    
    if (sameBoneMatch) {
        const part1 = sameBoneMatch[1];
        const part2 = sameBoneMatch[2];
        const boneContext = normalized.includes('femur') || normalized.includes('femorale') ? 'femur' : '';
        
        return [
            `fracture ${part1} ${boneContext}`.trim(),
            `fracture ${part2} ${boneContext}`.trim()
        ];
    }
    
    return [normalized];
};

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.input}`);
    const detection = detectMultipleLesions(testCase.input);
    console.log(`  Cumul détecté: ${detection.isCumul ? '✅ OUI' : '❌ NON'}`);
    console.log(`  Types de lésions: ${detection.lesionTypes.join(', ')}`);
    console.log(`  Types multiples: ${detection.hasMultipleLesionTypes ? 'OUI' : 'NON'}`);
    console.log(`  Pattern avec/et: ${detection.multipleLesionsWithConnectors ? 'OUI' : 'NON'}`);
    console.log(`  Fractures même os: ${detection.multipleFracturesSameBone ? 'OUI' : 'NON'}`);
    
    if (detection.isCumul) {
        const lesions = extractIndividualLesions(testCase.input);
        console.log(`  Lésions extraites (${lesions.length}):`);
        lesions.forEach((lesion, i) => {
            console.log(`    ${i + 1}. ${lesion}`);
        });
    }
    
    console.log(`  Attendu: ${testCase.expected}`);
    console.log('');
});
