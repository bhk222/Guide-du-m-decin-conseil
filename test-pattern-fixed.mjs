// Test du pattern CORRIGÉ avec typos médicales

const testCases = [
    {text: "amputation P3 D5 avec repture du flechisseur du P2 D4", label: "TEST 1 - repture + flechisseur"},
    {text: "amputation P3 D5 avec repture du flechisseur du P2 D4 main droite", label: "TEST 2 - repture + main droite"},
    {text: "amputation P3 D5 avec rupture du fléchisseur du P2 D4 main dominante", label: "TEST 3 - rupture + fléchisseur accentué"}
];

// Pattern CORRIGÉ : r[ue]pture et fl[eé]chisseur
const patternRawFixed = /(?:amputation|perte).*(?:p[123]|phalange).*(?:d[1-5]).*(?:avec|et|ainsi\s+qu['"]un?).*(?:r[ue]pture|section|l[eé]sion).*(?:fl[eé]chisseur|extenseur|tendon)/i;

console.log("\n✅ TEST PATTERN CORRIGÉ V3.3.133 - Accepte typos médicales\n");
console.log("Pattern:", patternRawFixed.toString());
console.log("=".repeat(80));
console.log("\n📋 Corrections appliquées:");
console.log("  - rupture → r[ue]pture (accepte 'rupture' et 'repture')");
console.log("  - lesion → l[eé]sion (accepte 'lesion' et 'lésion')");
console.log("  - flechisseur → fl[eé]chisseur (accepte 'flechisseur' et 'fléchisseur')");
console.log("\n" + "=".repeat(80));

let successCount = 0;
testCases.forEach((test, index) => {
    console.log(`\n📝 ${test.label}`);
    console.log(`   Input: "${test.text}"`);
    
    const match = patternRawFixed.test(test.text);
    console.log(`   ✅ Match: ${match ? '✅ OUI' : '❌ NON'}`);
    
    if (match) successCount++;
});

console.log("\n" + "=".repeat(80));
console.log(`\n📊 RÉSULTAT: ${successCount}/${testCases.length} tests réussis`);

if (successCount === testCases.length) {
    console.log("✅ SUCCÈS COMPLET - Pattern fonctionne pour toutes les variations\n");
    console.log("🚀 Prochaine étape: Exécuter test-cas-simple-d4d5.mjs pour valider le cumul\n");
} else {
    console.log(`❌ ÉCHEC - ${testCases.length - successCount} tests échoués\n`);
    console.log("⚠️  Vérifier les sous-patterns pour identifier le problème\n");
}
