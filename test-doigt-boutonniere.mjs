import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const testCase = {
  description: `Le 3ème doigt présente une attitude vicieuse caractéristique en "boutonnière", associant une flexion de l'interphalangienne proximale (IPP) et une hyperextension de l'interphalangienne distale (IPD). On note la perte du relief dorsal normal de l'articulation IPP.`,
  age: 40,
  profession: 'Ouvrier',
  dominantHand: 'droite'
};

console.log('\n🔍 TEST: Doigt en boutonnière (3ème doigt)\n');
console.log('📝 Description clinique:');
console.log(testCase.description);

try {
  const result = localExpertAnalysis(
    testCase.description,
    testCase.age,
    testCase.profession,
    testCase.dominantHand
  );

  console.log('\n\n✅ RÉSULTATS:\n');
  console.log('🎯 Lésion proposée:', result.name);
  console.log('📊 IPP:', result.rate, '%');  // ✅ Utiliser result.rate (pas suggestedIpp)
  console.log('🎯 Catégorie:', result.path);
  console.log('📝 Justification:', result.justification);

  // Vérification du bug
  console.log('\n\n🐛 VÉRIFICATION:');
  
  const isWrongPouce = result.name?.toLowerCase().includes('pouce');
  const isWrongAblation = result.name?.toLowerCase().includes('ablation');
  
  if (isWrongPouce) {
    console.log('❌ BUG DÉTECTÉ: Confusion POUCE alors que cas = 3ème doigt (médius) !');
  }
  
  if (isWrongAblation) {
    console.log('❌ BUG DÉTECTÉ: Confusion ABLATION alors que cas = attitude vicieuse (pas d\'amputation) !');
  }
  
  const hasCorrectBoutonniere = result.name?.toLowerCase().includes('boutonnière') ||
                                 result.name?.toLowerCase().includes('boutonniere') ||
                                 result.name?.toLowerCase().includes('raideur') ||
                                 result.name?.toLowerCase().includes('attitude');
  
  if (hasCorrectBoutonniere) {
    console.log('✅ Détection correcte: Attitude vicieuse / Doigt en boutonnière');
  } else {
    console.log('❌ PAS DE DÉTECTION: Aucune mention boutonnière/raideur/attitude dans la proposition');
  }
  
  const expectedIPPRange = result.rate >= 5 && result.rate <= 15;
  if (!expectedIPPRange) {
    console.log(`❌ IPP ABERRANT: ${result.rate}% (attendu: 5-15% pour doigt en boutonnière)`);
  } else {
    console.log(`✅ IPP cohérent: ${result.rate}% dans fourchette attendue`);
  }

  console.log('\n📋 LÉSIONS ATTENDUES:');
  console.log('- Attitude vicieuse du 3ème doigt (ou médius)');
  console.log('- Raideur 3ème doigt en flexion IPP');
  console.log('- Doigt en boutonnière');
  console.log('- Ankylose IPP 3ème doigt');
  console.log('IPP attendu: 5-15% selon sévérité et latéralité');

} catch (error) {
  console.error('\n❌ ERREUR:', error.message);
  console.error('Stack:', error.stack);
}
