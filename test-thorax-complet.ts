import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const tests = [
    {
        input: "fractures multiples côtes avec volet costal séquelles respiratoires dyspnée effort",
        expected: "Fractures multiples de côtes - Avec séquelles respiratoires",
        expectedRate: 15,
        category: "Côtes"
    },
    {
        input: "fracture sternum avec douleurs persistantes limitation capacité respiratoire",
        expected: "Fracture du sternum",
        expectedRate: 10,
        category: "Sternum"
    }
];

console.log("🧪 TEST THORAX (Côtes + Sternum)\n");

tests.forEach(test => {
    const result = comprehensiveSingleLesionAnalysis(test.input);
    const success = result.type === 'proposal' && result.name === test.expected;
    
    console.log(`${success ? '✅' : '❌'} ${test.category}:`);
    console.log(`   Attendu: ${test.expected} (${test.expectedRate}%)`);
    if (result.type === 'proposal') {
        console.log(`   Obtenu:  ${result.name} (${result.rate}%)`);
    }
    console.log();
});