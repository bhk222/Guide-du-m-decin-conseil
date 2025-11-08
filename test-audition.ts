import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

const auditionCases = trainingCases.filter(testCase => 
    testCase.category === 'Audition'
);

console.log('🧪 ANALYSE AUDITION\n');
console.log(`📊 Total des cas: ${auditionCases.length}\n`);

for (const [i, testCase] of auditionCases.entries()) {
    console.log(`📍 CAS ${i+1}: "${testCase.userInput}"`);
    console.log(`   ID: ${testCase.id}`);
    console.log(`   Attendu: "${testCase.expectedInjury}" (${testCase.expectedRate}%)`);
    console.log(`   Sévérité: ${testCase.severity}`);
    
    const result = localExpertAnalysis(testCase.userInput);
    
    if (result.type === 'proposal') {
        console.log(`   Obtenu:  "${result.name}" (${result.rate}%)`);
        
        if (result.name === testCase.expectedInjury && result.rate === testCase.expectedRate) {
            console.log('   ✅ SUCCÈS !');
        } else {
            console.log('   ❌ ÉCHEC');
        }
    } else {
        console.log(`   Obtenu:  ${result.type}`);
        console.log('   ❌ ÉCHEC');
    }
    
    console.log(`   Justification attendue: ${testCase.justification}`);
    console.log(`   Mots-clés: [${testCase.keywords.join(', ')}]`);
    console.log('\n' + '='.repeat(80) + '\n');
}