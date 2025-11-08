// Test cases pour amputations
const testCases = [
    {
        name: "Amputation sous genou - doit être 70%",
        text: "Accident scie circulaire, amputation sous le genou, prothèse adaptée, marche difficile",
        expectedLevel: "faible",
        expectedIPP: 70
    },
    {
        name: "Amputation jambe - doit être 70%",
        text: "Accident train, amputation de la jambe, moignon long, appareillage fonctionnel",
        expectedLevel: "faible",
        expectedIPP: 70
    },
    {
        name: "Amputation cuisse - doit être 80%",
        text: "Écrasement membre, amputation de la cuisse, moignon très court",
        expectedLevel: "élevé",
        expectedIPP: 80
    },
    {
        name: "Désarticulation hanche - doit être 80%",
        text: "Accident grave, désarticulation de la hanche",
        expectedLevel: "élevé",
        expectedIPP: 80
    },
    {
        name: "Amputation avec prothèse adaptée sans siège - doit être 70%",
        text: "Amputation membre inférieur, prothèse adaptée",
        expectedLevel: "faible",
        expectedIPP: 70
    }
];

function testAmputationLogic(normalizedText: string): { level: string, signs: string[] } {
    if (/amputation|d[eé]sarticulation/i.test(normalizedText)) {
        const isBelowKnee = /(?:amputation|amput[eé]).*(?:sous.*genou|jambe)|(?:sous.*genou|jambe).*(?:amputation|amput[eé])|moignon.*(?:long|bien.*appareillable)/i.test(normalizedText);
        const isAboveKnee = /(?:amputation|amput[eé]|d[eé]sarticulation).*(?:cuisse|hanche)|(?:cuisse|hanche).*(?:amputation|amput[eé]|d[eé]sarticulation)|moignon.*(?:tr[eè]s\s+court|court(?!\s+terme))/i.test(normalizedText);
        
        if (isBelowKnee) {
            return { 
                level: 'faible', 
                signs: ['🦿 Amputation sous le genou']
            };
        } else if (isAboveKnee) {
            return { 
                level: 'élevé', 
                signs: ['🦿 Amputation cuisse/hanche']
            };
        }
        
        if (/proth[eè]se.*(?:adapt[eé]e|fonctionnelle)|appareillage.*satisfaisant/i.test(normalizedText)) {
            return { 
                level: 'faible', 
                signs: ['🦿 Appareillage satisfaisant']
            };
        }
    }
    
    return { level: 'moyen', signs: [] };
}

console.log("🧪 TESTS MULTIPLES: Amputations membre inférieur\n");
console.log("=".repeat(80) + "\n");

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`  Texte: "${testCase.text}"`);
    
    const result = testAmputationLogic(testCase.text.toLowerCase());
    
    console.log(`  Résultat: niveau="${result.level}", signes=${JSON.stringify(result.signs)}`);
    console.log(`  Attendu: niveau="${testCase.expectedLevel}"`);
    
    if (result.level === testCase.expectedLevel) {
        console.log(`  ✅ PASS - IPP sera ${testCase.expectedIPP}%\n`);
        passed++;
    } else {
        console.log(`  ❌ FAIL - IPP sera ${result.level === 'faible' ? 70 : result.level === 'élevé' ? 80 : 75}% au lieu de ${testCase.expectedIPP}%\n`);
        failed++;
    }
});

console.log("=".repeat(80));
console.log(`\n📊 Résultats: ${passed}/${testCases.length} tests réussis`);

if (failed === 0) {
    console.log("✅ TOUS LES TESTS PASSENT - La logique est correcte");
} else {
    console.log(`❌ ${failed} test(s) échoué(s) - Vérifier la logique`);
}
