/**
 * SCRIPT DE DEBUG - Test simple
 */

import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

// Tester les 10 premiers cas
const testCases = trainingCases.slice(0, 10);

console.log('\n🔍 TEST DEBUG - Analyse des 10 premiers cas\n');
console.log('='.repeat(70));

let successCount = 0;
let totalCount = 0;

for (const testCase of testCases) {
    totalCount++;
    console.log(`\n📋 Test ${totalCount}: ${testCase.id}`);
    console.log(`   Input: "${testCase.userInput}"`);
    console.log(`   Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
    
    const result = localExpertAnalysis(testCase.userInput);
    
    if (result.type === 'proposal') {
        console.log(`   ✓ Trouvé: ${result.name} (${result.rate}%)`);
        const nameMatch = result.name === testCase.expectedInjury;
        const rateMatch = result.rate === testCase.expectedRate;
        const isSuccess = nameMatch && rateMatch;
        
        if (isSuccess) {
            successCount++;
            console.log(`   ✅ MATCH PARFAIT`);
        } else if (nameMatch) {
            console.log(`   ⚠️ Nom correct mais taux différent`);
        } else {
            console.log(`   ❌ Nom différent`);
        }
    } else if (result.type === 'no_result') {
        console.log(`   ❌ Aucune lésion trouvée`);
        console.log(`   Message: ${result.text.substring(0, 100)}...`);
    } else {
        console.log(`   ⚠️ Ambiguïté détectée (${result.choices.length} choix)`);
    }
    console.log('-'.repeat(70));
}

console.log(`\n📊 RÉSULTAT: ${successCount}/${totalCount} succès (${(successCount/totalCount*100).toFixed(1)}%)\n`);
console.log('✅ Debug terminé\n');
