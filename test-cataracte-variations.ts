import { localExpertAnalysis } from './components/AiAnalyzer';

console.log('🧪 TESTS CATARACTE - VARIATIONS\n');

const testCases = [
    "Cataracte POST TRAUMATIQUE",
    "cataracte post-traumatique",
    "Cataracte traumatique",
    "cataracte suite traumatisme",
    "Cataracte post traumatique avec baisse acuité visuelle",
    "traumatisme oculaire avec cataracte"
];

testCases.forEach((test, index) => {
    console.log(`${index + 1}. "${test}"`);
    const result = localExpertAnalysis(test);
    if (result.type === 'proposal') {
        console.log(`   ✅ ${result.name} (${result.rate}%)`);
    } else {
        console.log(`   ❌ Type: ${result.type}`);
    }
    console.log();
});