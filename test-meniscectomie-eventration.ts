import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const tests = [
    {
        input: "méniscectomie totale interne avec chondropathie rotulienne stade 3 douleurs permanentes",
        expected: "Méniscectomie totale",
        expectedRate: 13,
        category: "Genou"
    },
    {
        input: "éventration post traumatique pariétale avec hernie importante nécessitant ceinture contention",
        expected: "Éventration post-traumatique",
        expectedRate: 15,
        category: "Abdomen"
    }
];

console.log("🧪 TEST CORRECTIONS (Méniscectomie + Éventration)\n");

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
