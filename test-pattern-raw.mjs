// Test du pattern hasAmputationAndTendonRaw sur les différentes variations

const testCases = [
    "amputation P3 D5 avec repture du flechisseur du P2 D4",
    "amputation P3 D5 avec repture du flechisseur du P2 D4 main droite",
    "amputation P3 D5 avec rupture du fléchisseur du P2 D4 main dominante"
];

const patternRaw = /(?:amputation|perte).*(?:p[123]|phalange).*(?:d[1-5]).*(?:avec|et|ainsi\s+qu['"]un?).*(?:rupture|section|lesion).*(?:flechisseur|extenseur|tendon)/i;

console.log("\n🔍 TEST PATTERN RAW - hasAmputationAndTendonRaw\n");
console.log("Pattern:", patternRaw.toString());
console.log("=".repeat(70));

testCases.forEach((text, index) => {
    console.log(`\n📝 TEST ${index + 1}: "${text}"`);
    
    const match = patternRaw.test(text);
    console.log(`  ✅ Match: ${match ? 'OUI' : 'NON'}`);
    
    if (!match) {
        // Debug: tester des sous-parties
        console.log("\n  🔬 Debug sous-patterns:");
        console.log(`    - amputation|perte: ${/(?:amputation|perte)/i.test(text)}`);
        console.log(`    - p[123]|phalange: ${/(?:p[123]|phalange)/i.test(text)}`);
        console.log(`    - d[1-5]: ${/d[1-5]/i.test(text)}`);
        console.log(`    - avec|et: ${/(?:avec|et|ainsi\s+qu['"]un?)/i.test(text)}`);
        console.log(`    - rupture|section: ${/(?:rupture|section|lesion)/i.test(text)}`);
        console.log(`    - flechisseur|extenseur: ${/(?:flechisseur|extenseur|tendon)/i.test(text)}`);
        
        // Tester une version simplifiée
        const simplePattern = /amputation.*p3.*d5.*avec.*rupture.*flechisseur.*p2.*d4/i;
        console.log(`\n  🔬 Pattern simplifié: ${simplePattern.test(text)}`);
        
        // Trouver où ça casse
        let testPattern = /amputation/i;
        console.log(`    - amputation: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3/i;
        console.log(`    - amputation.*p3: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3.*d5/i;
        console.log(`    - amputation.*p3.*d5: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3.*d5.*avec/i;
        console.log(`    - amputation.*p3.*d5.*avec: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3.*d5.*avec.*repture/i;
        console.log(`    - amputation.*p3.*d5.*avec.*repture: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3.*d5.*avec.*repture.*flechisseur/i;
        console.log(`    - amputation.*p3.*d5.*avec.*repture.*flechisseur: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3.*d5.*avec.*repture.*flechisseur.*p2/i;
        console.log(`    - amputation.*p3.*d5.*avec.*repture.*flechisseur.*p2: ${testPattern.test(text)}`);
        
        testPattern = /amputation.*p3.*d5.*avec.*repture.*flechisseur.*p2.*d4/i;
        console.log(`    - amputation.*p3.*d5.*avec.*repture.*flechisseur.*p2.*d4: ${testPattern.test(text)}`);
    }
});

console.log("\n" + "=".repeat(70));
console.log("\n💡 DIAGNOSTIC:");
console.log("  Si AUCUN test ne matche: le pattern est trop restrictif");
console.log("  Si seulement TEST 3 matche: problème avec 'repture' (typo)");
console.log("  Solution: ajouter 'repture' dans le pattern ou accepter .* plus large\n");
