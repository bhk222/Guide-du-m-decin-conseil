import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const test = {
    input: "fractures multiples côtes avec volet costal séquelles respiratoires dyspnée effort",
    expected: "Fractures multiples de côtes - Avec séquelles respiratoires",
    expectedRate: 15
};

console.log("🧪 TEST THORAX - CÔTES");
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