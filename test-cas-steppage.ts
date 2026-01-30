import { localExpertAnalysis } from './components/AiAnalyzer';

const texteTest = "fracture luxation de L1 ; séquelles amyotrophie du membre inferieur gauche ; marche avec steppage ; raideur du rachis";

console.log('\n🧪 TEST CAS FRACTURE L1 AVEC STEPPAGE + AMYOTROPHIE\n');
console.log('📝 Texte:', texteTest);
console.log('\n' + '='.repeat(80) + '\n');

const result = localExpertAnalysis(texteTest);

console.log('\n' + '='.repeat(80));
console.log('📊 RÉSULTAT FINAL:');
console.log('   Type:', result.type);
console.log('   Nom:', result.name);
console.log('   IPP:', result.rate + '%');
console.log('   Justification:', result.justification?.substring(0, 200) + '...');
console.log('='.repeat(80) + '\n');

if (result.rate >= 40 && result.rate <= 43) {
    console.log('✅ TEST RÉUSSI: IPP entre 40-43%');
} else {
    console.log(`❌ TEST ÉCHOUÉ: IPP = ${result.rate}% (attendu: 40-43%)`);
}
