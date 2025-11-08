// Test CAS 1 - Fracture Pouteau-Colles (V3.3.34)
// Attendu: IPP 20-30% (opérée + limitation 50% + EVA 4)
// Ancien: IPP 15% (fourchette [8-15%] max)
// Nouveau: IPP 20% (fourchette [15-25%] médian)

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas1 = `Ouvrier de 45 ans, chute d'échelle. Fracture de Pouteau-Colles du poignet droit (main dominante) opérée, consolidée mais raideur résiduelle avec limitation flexion-extension à 50% et douleurs EVA 4/10 lors des efforts de préhension.`;

console.log('='.repeat(80));
console.log('TEST CAS 1 - FRACTURE POUTEAU-COLLES (V3.3.34)');
console.log('='.repeat(80));
console.log('\n📋 DESCRIPTION:');
console.log(cas1);
console.log('\n🎯 ATTENDU: IPP 20-30% (opérée + limitation 50% + EVA 4)');
console.log('\n' + '='.repeat(80));

const result = localExpertAnalysis(cas1);

console.log('\n✅ RÉSULTAT:');
console.log(`Type: ${result.type}`);
console.log(`Lésion: ${result.name}`);
console.log(`Taux IPP: ${result.rate}%`);

if (Array.isArray(result.injury?.rate)) {
    console.log(`Fourchette barème: [${result.injury.rate.join(' - ')}]%`);
} else {
    console.log(`Fourchette barème: ${result.injury?.rate}%`);
}

console.log('\n📊 VALIDATION:');
const attenduMin = 20;
const attenduMax = 30;
const isValid = result.rate >= attenduMin && result.rate <= attenduMax;

if (isValid) {
    console.log(`✅ VALIDÉ: ${result.rate}% est dans [${attenduMin}-${attenduMax}%]`);
} else {
    console.log(`❌ ÉCART: ${result.rate}% hors fourchette [${attenduMin}-${attenduMax}%]`);
    console.log(`   Écart: ${result.rate < attenduMin ? result.rate - attenduMin : result.rate - attenduMax}pts`);
}

console.log('\n' + '='.repeat(80));
console.log(`STATUT: ${isValid ? '✅ TEST RÉUSSI' : '❌ TEST ÉCHOUÉ'}`);
console.log('='.repeat(80));
