#!/usr/bin/env node

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('🧪 TEST CAS MAÇON - Polytraumatisme membre supérieur\n');
console.log('═'.repeat(80));

const caseClinique = `Le salarié, âgé de 46 ans, exerce la fonction de maçon spécialisé. L'accident est survenu sur un chantier, pendant le temps de travail, lors de la descente d'un échafaudage. À la suite d'un faux appui, il a chuté de sa hauteur avec réception brutale sur le membre supérieur gauche. Les examens cliniques et radiologiques ont révélé une fracture déplacée du radius distal gauche, associée à une déchirure partielle des tendons extenseurs du poignet ainsi qu'une élongation musculaire de l'épaule gauche. Une réduction orthopédique suivie d'une immobilisation plâtrée et d'un traitement rééducatif ont été instaurées. L'évolution a été marquée par des douleurs résiduelles du poignet, une limitation de la mobilité articulaire, une diminution de la force de préhension et une gêne fonctionnelle persistante du membre supérieur gauche.`;

console.log('📋 CAS CLINIQUE:');
console.log(caseClinique);
console.log('\n' + '═'.repeat(80) + '\n');

try {
  const result = localExpertAnalysis(caseClinique);
  
  console.log('📊 RÉSULTAT DÉTECTION:\n');
  
  if (result.type === 'proposal') {
    console.log(`🎯 Lésion proposée: ${result.name}`);
    console.log(`📊 IPP: ${result.rate}%`);
    console.log(`🗂️ Catégorie: ${result.category || 'Non spécifié'}`);
  } else if (result.type === 'cumul_proposals') {
    console.log(`🎯 Lésion proposée: ${result.name}`);
    console.log(`📊 IPP: ${result.rate}%`);
    console.log(`🗂️ Catégorie: ${result.category || 'Cumul Polytraumatisme'}`);
    
    if (result.proposals && result.proposals.length > 0) {
      console.log('\n📋 Lésions individuelles détectées:');
      result.proposals.forEach((p, idx) => {
        const lesionName = p.name || p.injury?.name || 'Non défini';
        const lesionRate = p.rate || p.injury?.rate || 'N/A';
        console.log(`   ${idx + 1}. ${lesionName} = ${lesionRate}%`);
      });
    }
  }
  
  console.log('\n' + '═'.repeat(80));
  console.log('🔍 ANALYSE DES ERREURS:\n');
  
  const erreurs = [];
  const resultText = JSON.stringify(result).toLowerCase();
  
  // Vérification 1: Doit détecter fracture radius (dans proposals ou injury)
  const hasRadiusFracture = /fracture.*(?:radius|avant.*bras)|(?:radius|avant.*bras).*fracture/i.test(resultText);
  if (!hasRadiusFracture) {
    erreurs.push('⚠️ MANQUE: Fracture radius NON détectée');
  } else {
    console.log('   ✅ Fracture radius détectée');
  }
  
  // Vérification 2: Doit détecter déchirure tendons extenseurs
  const hasTendonLesion = /tendon|extenseur/i.test(resultText);
  if (!hasTendonLesion) {
    erreurs.push('⚠️ MANQUE: Déchirure tendons extenseurs NON détectée');
  } else {
    console.log('   ✅ Lésion tendineuse détectée');
  }
  
  // Vérification 3: Doit détecter élongation épaule
  const hasEpauleLesion = /[eé]paule|[eé]longation.*[eé]paule/i.test(resultText);
  if (!hasEpauleLesion) {
    erreurs.push('⚠️ MANQUE: Élongation musculaire épaule NON détectée');
  } else {
    console.log('   ✅ Lésion épaule détectée');
  }
  
  // Vérification 4: NE DOIT PAS utiliser entrée cumul générique
  const usesCumulGenerique = /fracture radius.*raideur.*d[eé]ficit force.*cumul/i.test(resultText);
  if (usesCumulGenerique) {
    erreurs.push('⚠️ ERREUR: Utilise entrée cumul générique au lieu de 3 lésions spécifiques');
  } else {
    console.log('   ✅ Pas d\'utilisation d\'entrée cumul générique');
  }
  
  if (erreurs.length > 0) {
    console.log('\n🚨 PROBLÈMES DÉTECTÉS:\n');
    erreurs.forEach(err => console.log(`   ${err}`));
    console.log('\n❌ TEST FAILED - Détections erronées présentes');
    process.exit(1);
  } else {
    console.log('\n✅ Aucune erreur grave détectée');
    console.log('✅ TEST PASSED');
    process.exit(0);
  }
  
} catch (error) {
  console.error('⚠️ ERREUR EXÉCUTION:', error.message);
  process.exit(1);
}
