import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const tests = [
    {
        input: "luxation récidivante épaule avec instabilité permanente appréhension dérobements fréquents",
        expected: "Luxation récidivante de l'épaule",
        expectedRate: 18,
        category: "Épaule"
    },
    {
        input: "pseudarthrose scaphoïde carpien avec instabilité poignet douleurs chroniques",
        expected: "Pseudarthrose du scaphoïde",
        expectedRate: 22,
        category: "Poignet"
    }
];

console.log("🧪 TEST CORRECTIONS DOMINANCE (Épaule + Poignet)\n");

tests.forEach(test => {
    const result = comprehensiveSingleLesionAnalysis(test.input);
    const success = result.type === 'proposal' && result.name === test.expected;
    
    console.log(`${success ? '✅' : '❌'} ${test.category}:`);
    console.log(`   Attendu: ${test.expected} (${test.expectedRate}%)`);
    if (result.type === 'proposal') {
        console.log(`   Obtenu:  ${result.name} (${result.rate}%)`);
    } else {
        console.log(`   Obtenu:  ${result.type}`);
    }
    console.log();
});