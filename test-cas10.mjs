// Test CAS 10 - Fracture bassin + Nerf sciatique (V3.3.34)
// Attendu: IPP 50-65% (formule Balthazard)
// Ancien: IPP 25% (Névralgie pudendale seule)
// Nouveau: IPP 58-60% (30% bassin + 40% nerf × 0.7)

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas10 = `Accident voiture avec polytraumatisme. Fracture complexe bassin (cadre obturateur + disjonction sacro-iliaque) et lésion nerf sciatique gauche associée. Consolidation osseuse obtenue mais sciatalgie chronique L5-S1, déficit moteur releveurs pied (steppage), périmètre marche limité 300m.`;

console.log('='.repeat(80));
console.log('TEST CAS 10 - FRACTURE BASSIN + NERF SCIATIQUE (V3.3.34)');
console.log('='.repeat(80));
console.log('\n📋 DESCRIPTION:');
console.log(cas10);
console.log('\n🎯 ATTENDU: IPP 50-65% (Formule Balthazard)');
console.log('   Calcul: 30% (bassin) + 40% (nerf) × 0.7 = 58%');
console.log('\n' + '='.repeat(80));

const result = localExpertAnalysis(cas10);

console.log('\n✅ RÉSULTAT:');
console.log(`Type: ${result.type}`);
console.log(`Lésion: ${result.name}`);
console.log(`Taux IPP: ${result.rate}%`);

if (Array.isArray(result.injury?.rate)) {
    console.log(`Fourchette barème: [${result.injury.rate.join(' - ')}]%`);
} else {
    console.log(`Fourchette barème: ${result.injury?.rate}%`);
}

console.log(`Cumul détecté: ${result.isCumul ? 'OUI ✅' : 'NON ❌'}`);

console.log('\n📊 VALIDATION:');
const attenduMin = 50;
const attenduMax = 65;
const isValid = result.rate >= attenduMin && result.rate <= attenduMax;

if (isValid) {
    console.log(`✅ VALIDÉ: ${result.rate}% est dans [${attenduMin}-${attenduMax}%]`);
    console.log('✅ Formule Balthazard appliquée correctement');
} else {
    console.log(`❌ ÉCART: ${result.rate}% hors fourchette [${attenduMin}-${attenduMax}%]`);
    console.log(`   Écart: ${result.rate < attenduMin ? result.rate - attenduMin : result.rate - attenduMax}pts`);
}

console.log('\n' + '='.repeat(80));
console.log(`STATUT: ${isValid ? '✅ TEST RÉUSSI' : '❌ TEST ÉCHOUÉ'}`);
console.log('='.repeat(80));
