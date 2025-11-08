import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

const rachisCases = trainingCases.filter(testCase => 
    testCase.category === 'Rachis et Bassin - Lombaire' ||
    testCase.category === 'Rachis et Bassin - Cervical' ||
    testCase.category === 'Rachis et Bassin - Dorsal'
);

console.log('🧪 TEST RACHIS (Lombaire + Cervical + Dorsal)\n');
console.log(`📊 Total des cas: ${rachisCases.length}\n`);

let successCount = 0;

for (const testCase of rachisCases) {
    console.log(`Test: "${testCase.userInput.substring(0, 70)}..."`);
    console.log(`   Catégorie: ${testCase.category}`);
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

console.log(`📈 RÉSULTAT RACHIS: ${successCount}/${rachisCases.length} (${((successCount / rachisCases.length) * 100).toFixed(1)}%)`);
