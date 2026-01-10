import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const testCase = {
  description: `Un homme âgé de 45 ans, maçon de profession, a été victime d'un accident de travail lors d'une chute de sa hauteur sur un chantier. Il a présenté un traumatisme du membre supérieur droit et du membre inférieur gauche. L'accident a été déclaré et reconnu comme accident de travail. Les examens cliniques et radiologiques ont mis en évidence une fracture fermée de l'extrémité inférieure du radius droit, traitée par immobilisation plâtrée, ainsi qu'une fracture de la malléole externe gauche, également prise en charge par immobilisation. L'évolution a été favorable avec consolidation osseuse, mais marquée par la persistance d'une raideur modérée du poignet droit et de douleurs résiduelles de la cheville gauche à l'effort. Après un arrêt de travail de quatre mois, l'état est considéré comme consolidé. Les séquelles fonctionnelles observées sont directement imputables à l'accident de travail et correspondent à des lésions prévues par le barème d'évaluation de l'incapacité permanente partielle.`,
  age: 45,
  profession: 'maçon',
  dominantHand: 'droite'
};

console.log('\n🔍 TEST: Cumul fracture radius droit + fracture malléole externe gauche\n');
console.log('Patient:', testCase.age, 'ans,', testCase.profession);
console.log('Traumatisme:', 'Membre supérieur droit + membre inférieur gauche');
console.log('\n📝 Description clinique:');
console.log(testCase.description);

try {
  const result = localExpertAnalysis(
    testCase.description,
    testCase.age,
    testCase.profession,
    testCase.dominantHand
  );

  console.log('\n\n✅ RÉSULTATS DE L\'ANALYSE:\n');
  console.log('🔗 Cumul détecté:', result.isCumulDetected ? '✅ OUI' : '❌ NON');
  console.log('📊 Nombre de lésions:', result.lesionCount || 1);
  
  if (result.lesions && result.lesions.length > 0) {
    console.log('\n📋 LÉSIONS IDENTIFIÉES:');
    result.lesions.forEach((lesion, index) => {
      console.log(`\nLésion ${index + 1}:`);
      console.log('  - Nom:', lesion.name);
      console.log('  - IPP:', lesion.ipp, '%');
      console.log('  - Confiance:', lesion.confidence);
    });
  }

  if (result.cumulDetails) {
    console.log('\n💡 DÉTAILS DU CUMUL:');
    console.log('  - Formule:', result.cumulDetails.formula || 'Balthazard');
    console.log('  - IPP total:', result.cumulDetails.totalIpp, '%');
  }

  console.log('\n📊 IPP PROPOSÉ:', result.suggestedIpp, '%');
  console.log('🎯 Catégorie:', result.category);
  console.log('📝 Justification:', result.justification);

  // Vérification du bug
  console.log('\n\n🐛 VÉRIFICATION DU BUG:');
  const hasOeilLesion = result.lesions?.some(l => 
    l.name.toLowerCase().includes('oeil') || 
    l.name.toLowerCase().includes('vision') ||
    l.name.toLowerCase().includes('œil')
  );
  
  if (hasOeilLesion) {
    console.log('❌ BUG DÉTECTÉ: Lésion oculaire inexistante identifiée !');
  } else {
    console.log('✅ Pas de lésion oculaire erronée détectée');
  }

  const expectedLesions = ['radius', 'malléole', 'cheville', 'poignet'];
  const foundExpected = result.lesions?.filter(l => 
    expectedLesions.some(expected => l.name.toLowerCase().includes(expected))
  );
  
  console.log('✅ Lésions attendues trouvées:', foundExpected?.length || 0, '/ 2');

} catch (error) {
  console.error('\n❌ ERREUR lors de l\'analyse:', error.message);
  console.error('Stack:', error.stack);
}
