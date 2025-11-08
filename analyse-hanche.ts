import { trainingCases } from './data/trainingCases';

// Analyse des cas Hanche (0/2)
const hancheCases = trainingCases.filter(testCase => 
    testCase.category === 'Membres Inférieurs - Hanche'
);

console.log('🧪 ANALYSE HANCHE\n');
console.log(`📊 Total des cas: ${hancheCases.length}\n`);

for (const [i, testCase] of hancheCases.entries()) {
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