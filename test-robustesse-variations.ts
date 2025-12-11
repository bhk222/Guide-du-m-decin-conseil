import { localExpertAnalysis } from './components/AiAnalyzer';

console.log('🧪 TESTS DE ROBUSTESSE - VARIATIONS LINGUISTIQUES');
console.log('==================================================\n');

interface TestCase {
    category: string;
    variations: string[];
    expectedInjury: string;
    expectedRate: number;
}

const robustnessTests: TestCase[] = [
    {
        category: "Variations Accents",
        variations: [
            "fracture femur casse avec cal vicieux",
            "fracture fémur cassé avec cal vicieux",
            "fracture FEMUR CASSE avec cal vicieux"
        ],
        expectedInjury: "Fracture de la diaphyse fémorale - Avec cal vicieux",
        expectedRate: 22
    },
    {
        category: "Variations Orthographe",
        variations: [
            "rupture LCA operee laxite residuelle",
            "rupture LCA opérée laxité résiduelle",
            "rupture lca opéré laxité résiduelle"
        ],
        expectedInjury: "Séquelles de rupture du ligament croisé antérieur (LCA)",
        expectedRate: 22
    },
    {
        category: "Synonymes Médicaux",
        variations: [
            "acouphènes isolés permanents",
            "bourdonnements oreille isolés",
            "tinnitus permanent isolé"
        ],
        expectedInjury: "Bourdonnements d'oreille (acouphènes) isolés",
        expectedRate: 5  // ou 10 selon sévérité
    },
    {
        category: "Formulations Alternatives",
        variations: [
            "perte totale vision oeil gauche",
            "cécité complète oeil gauche",
            "œil gauche aveugle suite traumatisme"
        ],
        expectedInjury: "Perte complète de la vision d'un oeil (l'autre étant normal)",
        expectedRate: 30
    },
    {
        category: "Valeurs Numériques",
        variations: [
            "perte 8 dents définitives",
            "perte de huit dents définitives",
            "8 dents perdues définitives"
        ],
        expectedInjury: "Perte de 8 dents définitives",
        expectedRate: 12
    },
    {
        category: "Déviation Modérée",
        variations: [
            "fracture plateaux tibiaux déviation 8 degrés",
            "fracture plateaux tibiaux deviation 8°",
            "fracture plateaux tibiaux avec 8° de deviation"
        ],
        expectedInjury: "Fracture des plateaux tibiaux - Avec déviation et/ou raideur",
        expectedRate: 20  // moyenne de [10,30]
    }
];

let totalTests = 0;
let passedTests = 0;
let failedTests: { variation: string; expected: string; got: string }[] = [];

robustnessTests.forEach(testCase => {
    console.log(`📁 ${testCase.category}`);
    console.log('─'.repeat(50));
    
    testCase.variations.forEach((variation, index) => {
        totalTests++;
        const result = localExpertAnalysis(variation);
        
        if (result.type === 'proposal') {
            const nameMatch = result.name === testCase.expectedInjury;
            const rateAcceptable = Math.abs(result.rate - testCase.expectedRate) <= 3; // tolérance ±3%
            
            if (nameMatch && rateAcceptable) {
                passedTests++;
                console.log(`  ✅ Variation ${index + 1}: "${variation}"`);
                console.log(`     → ${result.name} (${result.rate}%)`);
            } else {
                console.log(`  ❌ Variation ${index + 1}: "${variation}"`);
                console.log(`     Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
                console.log(`     Obtenu:  ${result.name} (${result.rate}%)`);
                failedTests.push({
                    variation,
                    expected: `${testCase.expectedInjury} (${testCase.expectedRate}%)`,
                    got: `${result.name} (${result.rate}%)`
                });
            }
        } else {
            console.log(`  ❌ Variation ${index + 1}: "${variation}"`);
            console.log(`     Pas de proposition (type: ${result.type})`);
            failedTests.push({
                variation,
                expected: `${testCase.expectedInjury} (${testCase.expectedRate}%)`,
                got: `No proposal (${result.type})`
            });
        }
    });
    console.log();
});

console.log('═'.repeat(50));
console.log('📊 RÉSULTATS TESTS DE ROBUSTESSE');
console.log('═'.repeat(50));
console.log(`Total tests: ${totalTests}`);
console.log(`Tests réussis: ${passedTests} (${((passedTests/totalTests)*100).toFixed(1)}%)`);
console.log(`Tests échoués: ${failedTests.length}`);
console.log();

if (failedTests.length > 0) {
    console.log('❌ ÉCHECS DÉTAILLÉS:');
    failedTests.forEach((failure, idx) => {
        console.log(`${idx + 1}. "${failure.variation}"`);
        console.log(`   Attendu: ${failure.expected}`);
        console.log(`   Obtenu:  ${failure.got}`);
    });
} else {
    console.log('🎉 TOUS LES TESTS DE ROBUSTESSE RÉUSSIS !');
    console.log('Le système maintient 100% de précision malgré les variations linguistiques.');
}
