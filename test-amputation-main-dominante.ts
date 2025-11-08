// Test cas réel: Amputation traumatique main dominante avec lésions multiples

const input = `Ouvrier métallurgiste de 42 ans, main droite coincée dans une presse hydraulique défectueuse lors du repositionnement d'une tôle. Transporté d'urgence à l'hôpital avec perte sanguine importante. 2. Constatations cliniques : Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures. 3. Examens complémentaires : Radiographie : fracture comminutive du radius distal. EMG : lésion complète du nerf médian. 4. Discussion médico-légale : Accident typique du travail, survenu dans l'exercice des fonctions. Les séquelles sont majeures : perte fonctionnelle totale de la main dominante, douleur neuropathique chronique, troubles du sommeil, gêne sociale importante. 5. Conclusion : Amputation fonctionnelle du membre supérieur dominant.`;

console.log('═══════════════════════════════════════════════════════════════');
console.log('CAS COMPLEXE: AMPUTATION TRAUMATIQUE MAIN DOMINANTE');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📋 DESCRIPTION CLINIQUE:');
console.log(input);
console.log('\n');

console.log('🔍 LÉSIONS IDENTIFIÉES:');
console.log('1. ⚠️ AMPUTATION TRANSCARPIENNE (main dominante)');
console.log('2. Fracture ouverte radius distal (comminutive)');
console.log('3. Lésion complète nerf médian (EMG confirmé)');
console.log('4. Délabrement tendineux et cutané');
console.log('5. Plaies contuses multiples');
console.log('6. Douleurs neuropathiques majeures');
console.log('\n');

console.log('💡 ANALYSE:');
console.log('- Lésion PRINCIPALE: Amputation transcarpienne (= perte totale main)');
console.log('- Lésions ASSOCIÉES: Fracture radius + nerf médian + tendons');
console.log('- Main DOMINANTE (droite pour ouvrier métallurgiste)');
console.log('\n');

console.log('📖 CORRESPONDANCE BARÈME:');
console.log('Rubrique: "Membres Supérieurs > Main - Amputations"');
console.log('Séquelle recherchée: "Amputation du poignet (Main Dominante)"');
console.log('OU: "Perte totale de la main (Main Dominante)"');
console.log('\n');

console.log('⚠️ PROBLÈME POTENTIEL:');
console.log('Le système pourrait:');
console.log('1. Ne détecter que "fracture radius" → Proposer 4-6% (ERREUR MAJEURE)');
console.log('2. Ne pas identifier "amputation transcarpienne" = amputation poignet');
console.log('3. Ignorer que main droite = main dominante pour ouvrier');
console.log('\n');

console.log('✅ RÉSULTAT ATTENDU:');
console.log('Taux IPP: 60-70% (amputation poignet main dominante)');
console.log('Note: Lésions associées (nerf médian, tendons) déjà incluses dans');
console.log('      le taux global d\'amputation → Pas de cumul Balthazard nécessaire');
console.log('\n');

console.log('📊 COMPARAISON BARÈME (Main Dominante):');
console.log('- Perte 5 doigts: 55%');
console.log('- Amputation poignet: 60%');
console.log('- Amputation 1/3 inférieur avant-bras: 65%');
console.log('- Amputation 1/3 moyen avant-bras: 70%');
