import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

// Test des Nerfs Périphériques actuels
const nerfsCases = trainingCases.filter(testCase => 
    testCase.category === 'Nerfs Périphériques'
);

console.log('🧪 TEST NERFS PÉRIPHÉRIQUES\n');
console.log(`📊 Total des cas: ${nerfsCases.length}\n`);

let successCount = 0;

for (const [i, testCase] of nerfsCases.entries()) {
    console.log(`❌ Test ${i+1}: "${testCase.userInput}"`);
    console.log(`   Attendu: ${testCase.expectedInjury}`);
    
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

console.log(`📈 RÉSULTAT NERFS PÉRIPHÉRIQUES:`);
console.log(`✅ Réussis: ${successCount}/${nerfsCases.length}`);
console.log(`📊 Taux de réussite: ${((successCount / nerfsCases.length) * 100).toFixed(1)}%`);

if (successCount < nerfsCases.length) {
    console.log(`\n🔍 ANALYSE DES ÉCHECS (${nerfsCases.length - successCount}):\n`);
    
    for (const [i, testCase] of nerfsCases.entries()) {
        const result = localExpertAnalysis(testCase.userInput);
        let isFailure = false;
        
        if (result.type !== 'proposal' || 
            result.name !== testCase.expectedInjury || 
            result.rate !== testCase.expectedRate) {
            isFailure = true;
        }
        
        if (isFailure) {
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