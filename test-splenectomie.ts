import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const test = {
    input: "splénectomie totale suite rupture rate traumatique",
    expected: "Ablation de la rate (splénectomie)",
    expectedRate: 18
};

console.log("🧪 TEST SPLÉNECTOMIE");
console.log(`   Input: ${test.input}`);

const result = comprehensiveSingleLesionAnalysis(test.input);
const success = result.type === 'proposal' && result.name === test.expected;

console.log(`${success ? '✅' : '❌'} Résultat:`);
console.log(`   Attendu: ${test.expected} (${test.expectedRate}%)`);
if (result.type === 'proposal') {
    console.log(`   Obtenu:  ${result.name} (${result.rate}%)`);
} else {
    console.log(`   Obtenu:  ${result.type}`);
}