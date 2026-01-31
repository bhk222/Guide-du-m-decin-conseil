/**
 * Test diagnostic polytraumatisme - Identifier l'étape qui échoue
 */

const testText = `Le patient est un salarié âgé de 38 ans, exerçant la fonction de manutentionnaire qualifié. L'accident est survenu sur le lieu et pendant le temps de travail, lors de la manipulation manuelle d'une charge lourde. Au cours de l'effort, une perte d'équilibre a entraîné un mouvement de torsion brutal du membre inférieur droit associé à un choc direct. L'examen clinique et les explorations radiologiques ont mis en évidence une fracture non déplacée du tiers distal du tibia droit, associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps. Ces lésions ont nécessité une immobilisation, un traitement antalgique et une prise en charge fonctionnelle spécialisée. Sur le plan évolutif, les séquelles potentielles comprennent une raideur articulaire résiduelle du genou, des algies mécaniques persistantes à l'effort, une diminution de la force musculaire du membre inférieur droit et un retentissement fonctionnel modéré, susceptibles de justifier une évaluation médico-légale en vue de la détermination d'une incapacité permanente partielle.`;

// Fonction normalize simplifiée
const normalize = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/œ/g, 'oe')
        .replace(/'/g, ' ')
        .replace(/['']/g, ' ');
};

const normalized = normalize(testText);

console.log('🧪 TEST DIAGNOSTIC POLYTRAUMATISME\n');
console.log('📝 Texte normalisé (premiers 200 caractères):');
console.log(normalized.substring(0, 200) + '...\n');

// Test 1: Keywords cumul
console.log('1️⃣ TEST KEYWORDS CUMUL');
const cumulKeywords = [
    'polytraumatisme', 'plusieurs lesions', 'sequelles multiples',
    'sequelles potentielles', 'sequelles comprennent', 'sequelles incluent',
    'formule balthazar', 'balthazar', 'cumul', 'cumuler',
    'association lesionnelle', 'lesions associees', 'ainsi qu un',
    'associee a', 'sur fond de', 'compliquee de', 'accompagnee de'
];
const foundKeywords = cumulKeywords.filter(kw => normalized.includes(kw));
console.log('   Keywords trouvés:', foundKeywords);
console.log('   → Cumul détecté par keywords:', foundKeywords.length > 0 ? '✅' : '❌');

// Test 2: Triple lésion (OS + LIGAMENT + MUSCLE)
console.log('\n2️⃣ TEST TRIPLE LÉSION (OS + LIGAMENT + MUSCLE)');
const hasOsLesion = /fracture/i.test(normalized);
const hasLigamentLesion = /(?:dechirure|lesion|rupture).*ligament|ligament.*(?:dechirure|lesion|rupture)/i.test(normalized);
const hasMuscleLesion = /(?:elongation|dechirure|rupture).*(?:muscle|musculaire)|(?:muscle|musculaire).*(?:elongation|dechirure|rupture)|elongation.*quadriceps|quadriceps.*elongation/i.test(normalized);
const hasTripleLesion = hasOsLesion && hasLigamentLesion && hasMuscleLesion;

console.log('   hasOsLesion (fracture):', hasOsLesion ? '✅' : '❌');
console.log('   hasLigamentLesion:', hasLigamentLesion ? '✅' : '❌');
console.log('   hasMuscleLesion:', hasMuscleLesion ? '✅' : '❌');
console.log('   → Triple lésion détectée:', hasTripleLesion ? '✅' : '❌');

// Test 3: Pattern extraction individuelle
console.log('\n3️⃣ TEST EXTRACTION LÉSIONS INDIVIDUELLES');
const fractureMatch = normalized.match(/fracture\s+(?:non\s+)?(?:deplacee?)?\s*(?:du|de\s+la)?\s*(?:tiers)?\s*(?:distal|proximal|moyen)?\s*(?:du|de\s+la)?\s*(?:tibia|femur|humerus|genou|radius|cubitus)\s*(?:droit|gauche)?/i);
const ligamentMatch = normalized.match(/(?:dechirure|lesion|rupture)\s+(?:partielle?|complete?|totale?)?\s*(?:du|de\s+la|des)?\s*(?:ligament\s+(?:collateral|croise|lateral|lca|lcp)|tendons?\s+extenseurs?)\s*(?:medial|interne|externe|anterieur|posterieur|poignet|main)?\s*(?:du|de\s+la)?\s*(?:genou|coude|poignet)?\s*(?:droit|gauche)?/i);
const muscleMatch = normalized.match(/(?:elongation|dechirure|rupture)\s+(?:musculaire?)?\s*(?:du|de\s+la?|l)?\s*(?:quadriceps|epaule)/i);
const raideurMatch = normalized.match(/raideur\s+(?:articulaire|r[ée]siduelle)?\s*(?:du|de\s+la)?\s*(?:genou|hanche|coude|poignet|cheville)/i);
const algiesMatch = normalized.match(/(?:algies?|douleurs?)\s+(?:m[ée]caniques?)?\s*(?:persistantes?|chroniques?|r[ée]siduelles?)?/i);
const deficitForceMatch = normalized.match(/(?:diminution|d[ée]ficit|perte)\s+(?:de\s+la?)?\s*force\s+(?:musculaire?)?/i);

console.log('   fractureMatch:', fractureMatch ? `✅ "${fractureMatch[0]}"` : '❌');
console.log('   ligamentMatch:', ligamentMatch ? `✅ "${ligamentMatch[0]}"` : '❌');
console.log('   muscleMatch:', muscleMatch ? `✅ "${muscleMatch[0]}"` : '❌');
console.log('   raideurMatch:', raideurMatch ? `✅ "${raideurMatch[0]}"` : '❌');
console.log('   algiesMatch:', algiesMatch ? `✅ "${algiesMatch[0]}"` : '❌');
console.log('   deficitForceMatch:', deficitForceMatch ? `✅ "${deficitForceMatch[0]}"` : '❌');

const componentCount = [fractureMatch, ligamentMatch, muscleMatch, raideurMatch, algiesMatch, deficitForceMatch].filter(m => m).length;
console.log('\n   componentCount:', componentCount);
console.log('   Condition Pattern 0B (≥3 composantes + fracture + (ligament OU muscle)):', 
    (componentCount >= 3 && fractureMatch && (ligamentMatch || muscleMatch)) ? '✅ ACTIVÉ' : '❌ NON ACTIVÉ');

// Test 4: Conclusion
console.log('\n4️⃣ CONCLUSION');
const isCumulDetected = foundKeywords.length > 0 || hasTripleLesion;
console.log('   isCumulDetected:', isCumulDetected ? '✅ OUI' : '❌ NON');

if (isCumulDetected) {
    console.log('   → Le cumul devrait être détecté');
    
    if (componentCount >= 3 && fractureMatch && (ligamentMatch || muscleMatch)) {
        console.log('   → extractIndividualLesions devrait retourner', componentCount, 'lésions');
        console.log('\n   ✅ LOGIQUE CORRECTE - Si IPP = 15%, le problème est dans le matching des lésions individuelles');
    } else {
        console.log('   → Pattern 0B NON activé, extraction peut échouer');
        console.log('\n   ❌ PROBLÈME: Pattern 0B ne se déclenche pas malgré cumul détecté');
    }
} else {
    console.log('   → Le cumul NE sera PAS détecté');
    console.log('\n   ❌ PROBLÈME CRITIQUE: Cumul non détecté, système utilisera fallback 15%');
}

console.log('\n📊 RÉSUMÉ:');
console.log('   - Keywords cumul:', foundKeywords.length > 0 ? '✅' : '❌');
console.log('   - Triple lésion:', hasTripleLesion ? '✅' : '❌');
console.log('   - Pattern 0B:', (componentCount >= 3 && fractureMatch && (ligamentMatch || muscleMatch)) ? '✅' : '❌');
console.log('   - isCumul attendu:', isCumulDetected ? '✅ TRUE' : '❌ FALSE');
