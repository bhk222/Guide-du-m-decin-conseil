/**
 * DEBUG DÉTAILLÉ - Vérifier pourquoi cumul n'est pas détecté
 */

// Pattern réel utilisé dans le code
const patternRaw = /(?:amputation|perte).*(?:p[123]|phalange).*(?:d[1-5]).*(?:avec|et|ainsi\s+qu['"]un?).*(?:r[ue]pture|section|l[eé]sion).*(?:fl[eé]chisseur|extenseur|tendon)/i;

// Fonction normalize simplifiée (simulation)
function normalize(text) {
    return text
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

const tests = [
    {text: "amputation P3 D5 avec repture du flechisseur du P2 D4", label: "TEST 1"},
    {text: "amputation P3 D5 avec repture du flechisseur du P2 D4 main droite", label: "TEST 2"},
    {text: "amputation P3 D5 avec rupture du fléchisseur du P2 D4 main dominante", label: "TEST 3"}
];

console.log('\n📊 DÉBOGAGE DÉTECTION CUMUL - hasAmputationAndTendon\n');
console.log('='.repeat(80));

tests.forEach(({text, label}) => {
    console.log(`\n${label}: "${text}"`);
    console.log('-'.repeat(80));
    
    // Test pattern RAW sur texte original
    const hasAmputationAndTendonRaw = patternRaw.test(text);
    console.log(`  🔍 hasAmputationAndTendonRaw (sur texte original):`);
    console.log(`      Pattern: ${patternRaw.toString()}`);
    console.log(`      Match: ${hasAmputationAndTendonRaw ? '✅ OUI' : '❌ NON'}`);
    
    // Test pattern sur texte normalisé
    const normalized = normalize(text);
    const patternNormalized = /(?:amputation|perte).*(?:p[123]|phalange).*(?:d[1-5]|doigt).*(?:avec|et|ainsi\s+qu['"]un?).*(?:r[ue]pture|section|l[eé]sion).*(?:fl[eé]chisseur|extenseur|tendon)/i;
    const hasAmputationAndTendonNormalized = patternNormalized.test(normalized);
    console.log(`  🔍 hasAmputationAndTendon (sur texte normalisé):`);
    console.log(`      Texte normalisé: "${normalized}"`);
    console.log(`      Match: ${hasAmputationAndTendonNormalized ? '✅ OUI' : '❌ NON'}`);
    
    // Résultat final
    const hasAmputationAndTendon = hasAmputationAndTendonRaw || hasAmputationAndTendonNormalized;
    console.log(`  ✅ hasAmputationAndTendon (final): ${hasAmputationAndTendon ? '✅ OUI' : '❌ NON'}`);
    
    // Analyser lesionTypes
    console.log(`  📋 Types de lésions détectés:`);
    const lesionTypes = [];
    if (/fracture/i.test(normalized)) lesionTypes.push('fracture');
    if (/rupture|repture/i.test(normalized)) lesionTypes.push('rupture');
    if (/amputation|perte.*(?:phalange|doigt)/i.test(normalized)) lesionTypes.push('amputation');
    console.log(`      ${lesionTypes.join(', ')} (total: ${lesionTypes.length})`);
    
    // Tester conditions cumul
    console.log(`  🎯 Critères de cumul:`);
    console.log(`      hasAmputationAndTendon: ${hasAmputationAndTendon ? '✅' : '❌'}`);
    console.log(`      lesionTypes.length >= 2: ${lesionTypes.length >= 2 ? '✅' : '❌'}`);
    
    // Conclusion
    const shouldBeCumul = hasAmputationAndTendon || lesionTypes.length >= 2;
    console.log(`\n  ${shouldBeCumul ? '✅ DEVRAIT DÉTECTER CUMUL' : '❌ NE DEVRAIT PAS DÉTECTER CUMUL'}`);
});

console.log('\n' + '='.repeat(80));
console.log('\n💡 DIAGNOSTIC:');
console.log('  - Si hasAmputationAndTendon = OUI mais cumul NON détecté → Problème logique isCumul');
console.log('  - Si hasAmputationAndTendon = NON → Problème pattern (mais pattern_fixed.mjs dit OUI)');
console.log('  - Vérifier que la ligne 9963 dans AiAnalyzer.tsx contient bien "hasAmputationAndTendon ||"\n');
