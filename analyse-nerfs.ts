import { trainingCases } from './data/trainingCases';

// Test pour analyser les Nerfs Périphériques (0/2)
const nerfsCases = trainingCases.filter(testCase => 
    testCase.category === 'Nerfs Périphériques'
);

console.log('🧪 ANALYSE NERFS PÉRIPHÉRIQUES\n');
console.log(`📊 Total des cas: ${nerfsCases.length}\n`);

for (const [i, testCase] of nerfsCases.entries()) {
    console.log(`📍 CAS ${i+1}: "${testCase.userInput}"`);
    console.log(`   ID: ${testCase.id}`);
    console.log(`   Attendu: "${testCase.expectedInjury}" (${testCase.expectedRate}%)`);
    console.log(`   Sévérité: ${testCase.severity}`);
    console.log(`   Signes cliniques: [${testCase.clinicalSigns.join(', ')}]`);
    console.log(`   Justification: ${testCase.justification}`);
    console.log(`   Mots-clés: [${testCase.keywords.join(', ')}]`);
    console.log(`   Erreurs communes: [${testCase.commonMistakes?.join(', ') || 'Aucune'}]`);
    console.log('\n' + '='.repeat(80) + '\n');
}