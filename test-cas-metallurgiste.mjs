import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

/**
 * 🧪 TEST CAS RÉEL: Métallurgiste 42 ans - Amputation transcarpienne
 * 
 * ❌ PROBLÈME ACTUEL:
 * - Système propose "Fracture isolée du radius" [4-8%]
 * - IGNORE l'amputation transcarpienne (lésion majeure !)
 * - Devrait proposer "Désarticulation du poignet" [55-70%]
 */

console.log('🧪 TEST CAS MÉTALLURGISTE - Amputation transcarpienne\n');
console.log('═'.repeat(80));

const caseClinique = `Ouvrier métallurgiste de 42 ans, main droite coincée dans une presse hydraulique défectueuse lors du repositionnement d'une tôle. Transporté d'urgence à l'hôpital avec perte sanguine importante. Examen: Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Chirurgie de sauvetage avec régularisation des moignons osseux et couverture cutanée. Séquelles: perte définitive de la main droite au niveau du poignet, impossibilité de préhension, nécessité d'appareillage prothétique.`;

console.log('📋 CAS CLINIQUE:');
console.log(caseClinique);
console.log('\n' + '═'.repeat(80) + '\n');

try {
  const result = await localExpertAnalysis(caseClinique, { requestType: 'attribution' });
  
  console.log('📊 RÉSULTAT DÉTECTION:\n');
  console.log(`🎯 Lésion proposée: ${result.injury}`);
  console.log(`📊 IPP: ${result.rate}%`);
  console.log(`🗂️ Catégorie: ${result.category || 'Non spécifié'}`);
  
  console.log('\n' + '═'.repeat(80));
  console.log('🔍 ANALYSE DES ERREURS:\n');
  
  const erreurs = [];
  const resultText = JSON.stringify(result).toLowerCase();
  
  // Vérification 1: Doit détecter amputation/désarticulation
  const hasAmputation = /amputation|d[eé]sarticulation|perte.*main/i.test(resultText);
  if (!hasAmputation) {
    erreurs.push('⚠️ ERREUR GRAVE: Amputation transcarpienne NON détectée');
  } else {
    console.log('   ✅ Amputation détectée');
  }
  
  // Vérification 2: NE DOIT PAS proposer uniquement fracture radius
  const onlyRadiusFracture = /fracture.*radius|fracture isol[eé]e.*radius/i.test(result.injury || '') && !/amputation|d[eé]sarticulation/i.test(result.injury || '');
  if (onlyRadiusFracture) {
    erreurs.push('⚠️ ERREUR GRAVE: Propose "Fracture radius" au lieu d\'amputation');
  } else {
    console.log('   ✅ Ne propose pas uniquement fracture radius');
  }
  
  // Vérification 3: IPP doit être > 50% (amputation majeure)
  const ippValue = parseInt(result.rate) || 0;
  if (ippValue < 50) {
    erreurs.push(`⚠️ ERREUR: IPP ${ippValue}% trop faible pour amputation (devrait être ≥55%)`);
  } else {
    console.log(`   ✅ IPP ${ippValue}% cohérent avec amputation`);
  }
  
  if (erreurs.length > 0) {
    console.log('\n🚨 PROBLÈMES DÉTECTÉS:\n');
    erreurs.forEach(err => console.log(`   ${err}`));
    console.log('\n❌ TEST FAILED - Amputation non détectée correctement');
    process.exit(1);
  } else {
    console.log('\n✅ Aucune erreur grave détectée');
    console.log('✅ TEST PASSED - Amputation correctement détectée');
    process.exit(0);
  }
  
} catch (error) {
  console.error('⚠️ ERREUR EXÉCUTION:', error.message);
  process.exit(1);
}
