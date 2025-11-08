import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

const variationsLangageCases = trainingCases.filter(testCase => 
    testCase.category === 'Variations Langage'
);

console.log('🧪 ANALYSE VARIATIONS LANGAGE\n');
console.log(`📊 Total des cas: ${variationsLangageCases.length}\n`);

let successCount = 0;
let failureCount = 0;

for (const [i, testCase] of variationsLangageCases.entries()) {
    const result = localExpertAnalysis(testCase.userInput);
    
    const isSuccess = result.type === 'proposal' && 
                      result.name === testCase.expectedInjury && 
                      result.rate === testCase.expectedRate;
    
    if (isSuccess) {
        successCount++;
        console.log(`✅ Test ${i+1}: "${testCase.userInput.substring(0, 80)}..."`);
        console.log(`   Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
        console.log(`   Obtenu:  ${result.name} (${result.rate}%) ✓`);
    } else {
        failureCount++;
        console.log(`❌ Test ${i+1}: "${testCase.userInput.substring(0, 80)}..."`);
        console.log(`   Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
        if (result.type === 'proposal') {
            console.log(`   Obtenu:  ${result.name} (${result.rate}%)`);
        } else {
            console.log(`   Obtenu:  ${result.type}`);
        }
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
}

console.log(`📈 RÉSULTAT VARIATIONS LANGAGE:`);
console.log(`✅ Réussis: ${successCount}/${variationsLangageCases.length}`);
console.log(`❌ Échecs: ${failureCount}/${variationsLangageCases.length}`);
console.log(`📊 Taux de réussite: ${((successCount / variationsLangageCases.length) * 100).toFixed(1)}%`);

if (failureCount > 0) {
    console.log(`\n🔍 ANALYSE DES ${failureCount} ÉCHECS:\n`);
    
    for (const [i, testCase] of variationsLangageCases.entries()) {
        const result = localExpertAnalysis(testCase.userInput);
        
        const isFailure = result.type !== 'proposal' || 
                         result.name !== testCase.expectedInjury || 
                         result.rate !== testCase.expectedRate;
        
        if (isFailure) {
            console.log(`${i+1}. "${testCase.userInput}"`);
            console.log(`   ID: ${testCase.id}`);
            console.log(`   Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
            if (result.type === 'proposal') {
                console.log(`   Obtenu:  ${result.name} (${result.rate}%)`);
            } else {
                console.log(`   Obtenu:  ${result.type}`);
            }
            console.log(`   Mots-clés: [${testCase.keywords.join(', ')}]`);
            console.log();
        }
    }
}