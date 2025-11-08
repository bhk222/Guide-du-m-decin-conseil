import { trainingCases } from './data/trainingCases';

// Test pour analyser les Cas Complexes (0/3)
const casComplexesCases = trainingCases.filter(testCase => 
    testCase.category === 'Cas Complexe'
);

console.log('🧪 ANALYSE CAS COMPLEXES\n');
console.log(`📊 Total des cas: ${casComplexesCases.length}\n`);

for (const [i, testCase] of casComplexesCases.entries()) {
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