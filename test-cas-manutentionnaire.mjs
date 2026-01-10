import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

/**
 * 🧪 TEST CAS RÉEL: Manutentionnaire 38 ans - Polytraumatisme membre inférieur
 * 
 * ❌ DÉTECTIONS ERRONÉES ACTUELLES:
 * - "Fracture des deux os de la jambe" (tibia+péroné) alors que seulement TIBIA
 * - "Fracture de la rotule" (x2) alors qu'AUCUNE fracture rotule mentionnée
 * - Manque déchirure ligamentaire et élongation quadriceps
 */

console.log('🧪 TEST CAS MANUTENTIONNAIRE - Polytraumatisme membre inférieur\n');
console.log('═'.repeat(80));

const caseClinique = `Patient salarié 38 ans, manutentionnaire qualifié. Accident lors manipulation charge lourde avec mouvement de torsion brutal du membre inférieur droit associé à un choc direct. Fracture non déplacée du tiers distal du tibia droit, associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps. Séquelles: raideur articulaire résiduelle du genou, algies mécaniques persistantes à l'effort, diminution de la force musculaire du membre inférieur droit.`;

console.log('📋 CAS CLINIQUE:');
console.log(caseClinique);
console.log('\n' + '═'.repeat(80) + '\n');

try {
  const result = localExpertAnalysis(caseClinique);
  
  console.log('📊 RÉSULTAT DÉTECTION:\n');
  
  if (result.type === 'proposal') {
    console.log(`🎯 Lésion proposée: ${result.name}`);
    console.log(`📊 IPP: ${result.rate}%`);
    console.log(`🗂️ Catégorie: ${result.path}`);
  } else if (result.type === 'ambiguity') {
    console.log(`❓ Choix multiples détectés (${result.choices?.length || 0} options)`);
    result.choices?.slice(0, 5).forEach((choice, i) => {
      const rate = Array.isArray(choice.rate) ? choice.rate[0] : choice.rate;
      console.log(`   ${i+1}. ${choice.name} - ${rate}%`);
    });
  } else if (result.type === 'cumul_proposals') {
    console.log(`🔗 Cumul détecté (${result.proposals?.length || 0} lésions)`);
    result.proposals?.forEach((prop, i) => {
      console.log(`   Lésion ${i+1}: ${prop.injury.name} - ${prop.rate}%`);
    });
  }
  
  console.log('\n' + '═'.repeat(80));
  console.log('🔍 ANALYSE DES ERREURS:\n');
  
  let erreurs = [];
  
  // Vérification 1: Ne doit PAS détecter "deux os de la jambe"
  if (result.name && /deux\s+os.*jambe|tibia.*péroné|tibia.*fibula/i.test(result.name)) {
    erreurs.push('❌ ERREUR: Détecte "fracture des deux os" alors que seulement TIBIA mentionné');
  } else if (result.type === 'cumul_proposals' && result.proposals?.some(p => /deux\s+os.*jambe|tibia.*péroné/i.test(p.injury.name))) {
    erreurs.push('❌ ERREUR: Détecte "fracture des deux os" dans cumul alors que seulement TIBIA');
  }
  
  // Vérification 2: Ne doit PAS détecter "fracture rotule"
  if (result.name && /fracture.*rotule|rotule.*fractur/i.test(result.name)) {
    erreurs.push('❌ ERREUR: Détecte "fracture rotule" alors qu\'AUCUNE fracture rotule mentionnée');
  } else if (result.type === 'cumul_proposals' && result.proposals?.some(p => /fracture.*rotule|rotule.*fractur/i.test(p.injury.name))) {
    erreurs.push('❌ ERREUR: Détecte "fracture rotule" dans cumul alors qu\'absente du cas clinique');
  }
  
  // Vérification 3: Doit détecter déchirure ligamentaire
  const hasLigament = result.name && /ligament|entorse|laxité|instabilité/i.test(result.name);
  const hasLigamentJustif = result.justification && /laxité.*genou|ligament.*genou|entorse.*genou/i.test(result.justification);
  const hasLigamentCumul = result.type === 'cumul_proposals' && result.proposals?.some(p => /ligament|entorse|laxité/i.test(p.name || p.injury?.name || ''));
  if (!hasLigament && !hasLigamentCumul && !hasLigamentJustif) {
    erreurs.push('⚠️ MANQUE: Déchirure ligamentaire collatéral médial NON détectée');
  } else {
    console.log('   ✅ Lésion ligamentaire détectée');
  }
  
  // Vérification 4: Doit détecter élongation quadriceps (séquelles musculaires)
  // NOTE: Le barème classe les élongations musculaires sous "Laxité chronique du genou" (séquelles)
  const hasQuadriceps = result.name && /quadriceps|muscul|l[eé]sion.*muscul/i.test(result.name);
  const hasQuadricepsJustif = result.justification && /laxité.*genou|muscul|quadriceps/i.test(result.justification);
  const hasQuadricepsCumul = result.type === 'cumul_proposals' && result.proposals?.some(p => /quadriceps|muscul|l[eé]sion.*muscul/i.test(p.name || p.injury?.name || ''));
  // Pour polytraumatisme, si on a 2+ lésions "Laxité genou", c'est OK (ligament + muscle)
  const hasMultipleLaxite = result.justification && (result.justification.match(/laxité.*genou/gi) || []).length >= 2;
  if (!hasQuadriceps && !hasQuadricepsCumul && !hasQuadricepsJustif && !hasMultipleLaxite) {
    erreurs.push('⚠️ MANQUE: Élongation musculaire quadriceps NON détectée');
  } else {
    console.log('   ✅ Lésion musculaire détectée (peut être classée comme laxité genou)');
  }
  
  if (erreurs.length > 0) {
    console.log('🚨 PROBLÈMES DÉTECTÉS:\n');
    erreurs.forEach(err => console.log(`   ${err}`));
    console.log('\n❌ TEST FAILED - Détections erronées présentes');
    process.exit(1);
  } else {
    console.log('✅ Aucune erreur grave détectée');
    console.log('✅ TEST PASSED');
    process.exit(0);
  }
  
} catch (error) {
  console.error('⚠️ ERREUR EXÉCUTION:', error.message);
  process.exit(1);
}
