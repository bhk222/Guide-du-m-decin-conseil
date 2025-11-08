import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

// Tests spécifiques Membres Supérieurs (toutes sous-catégories)
const membreSuperieurCases = trainingCases.filter(testCase => 
    testCase.category.startsWith('Membres Supérieurs')
);

console.log(`🧪 TEST MEMBRE SUPÉRIEUR COMPLET`);
console.log(`\n📊 Total des cas: ${membreSuperieurCases.length}\n`);

let successCount = 0;
const results: Array<{
    input: string;
    expected: string;
    result: string;
    success: boolean;
}> = [];

membreSuperieurCases.forEach((testCase, index) => {
    const result = comprehensiveSingleLesionAnalysis(testCase.userInput);
    const resultName = result.type === 'proposal' ? result.name : 'Aucune correspondance';
    const resultRate = result.type === 'proposal' ? result.rate : 0;
    const success = resultName === testCase.expectedInjury;
    
    results.push({
        input: testCase.userInput,
        expected: testCase.expectedInjury,
        result: resultName,
        success
    });
    
    if (success) {
        successCount++;
        console.log(`✅ Test ${index + 1}: "${testCase.userInput}" → ${resultName} (${resultRate}%)`);
    } else {
        console.log(`❌ Test ${index + 1}: "${testCase.userInput}"`);
        console.log(`   Attendu: ${testCase.expectedInjury}`);
        console.log(`   Obtenu:  ${resultName} (${resultRate}%)`);
    }
});

console.log(`\n📈 RÉSULTAT MEMBRE SUPÉRIEUR:`);
console.log(`✅ Réussis: ${successCount}/${membreSuperieurCases.length}`);
console.log(`📊 Taux de réussite: ${((successCount / membreSuperieurCases.length) * 100).toFixed(1)}%`);

// Analyse des échecs
const failures = results.filter(r => !r.success);
if (failures.length > 0) {
    console.log(`\n🔍 ANALYSE DES ÉCHECS (${failures.length}):`);
    failures.forEach((failure, index) => {
        console.log(`\n${index + 1}. "${failure.input}"`);
        console.log(`   Attendu: ${failure.expected}`);
        console.log(`   Obtenu:  ${failure.result}`);
    });
}