import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

const hancheCases = trainingCases.filter(testCase => 
    testCase.category === 'Membres Inférieurs - Hanche'
);

console.log('🧪 TEST HANCHE\n');
console.log(`📊 Total des cas: ${hancheCases.length}\n`);

let successCount = 0;

for (const [i, testCase] of hancheCases.entries()) {
    console.log(`Test ${i+1}: "${testCase.userInput}"`);
    console.log(`   Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
    
    const result = localExpertAnalysis(testCase.userInput);
    
    if (result.type === 'proposal') {
        console.log(`   Obtenu:  ${result.name} (${result.rate}%)`);
        
        if (result.name === testCase.expectedInjury && result.rate === testCase.expectedRate) {
            successCount++;
            console.log('   ✅ SUCCÈS !');
        } else {
            console.log('   ❌ ÉCHEC');
        }
    } else {
        console.log(`   Obtenu:  ${result.type}`);
        console.log('   ❌ ÉCHEC');
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
}

console.log(`📈 RÉSULTAT HANCHE: ${successCount}/${hancheCases.length} (${((successCount / hancheCases.length) * 100).toFixed(1)}%)`);

if (successCount < hancheCases.length) {
    console.log(`\n🔍 ANALYSE DES ÉCHECS:\n`);
    
    for (const [i, testCase] of hancheCases.entries()) {
        const result = localExpertAnalysis(testCase.userInput);
        
        if (result.type !== 'proposal' || 
            result.name !== testCase.expectedInjury || 
            result.rate !== testCase.expectedRate) {
            console.log(`${i+1}. "${testCase.userInput}"`);
            console.log(`   Attendu: ${testCase.expectedInjury}`);
            if (result.type === 'proposal') {
                console.log(`   Obtenu:  ${result.name}\n`);
            } else {
                console.log(`   Obtenu:  ${result.type}\n`);
            }
        }
    }
}