// Test CAS 12 - SDRC (Algodystrophie) post-traumatique
// Attendu: IPP 30-40% (douleur neuropathique + troubles trophiques + reconversion)

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas12 = `Secrétaire 42 ans, fracture scaphoïde main droite (dominante) après chute. Consolidation obtenue mais évolution vers SDRC type I (algodystrophie) : douleurs permanentes EVA 8/10 résistantes au traitement, œdème persistant, troubles trophiques (peau fine, brillante), raideur majeure poignet (flexion-extension limitée à 20%), impossibilité travail informatique, reconversion professionnelle.`;

console.log('='.repeat(80));
console.log('TEST CAS 12 - SDRC (ALGODYSTROPHIE) POST-TRAUMATIQUE');
console.log('='.repeat(80));
console.log('\n📋 DESCRIPTION:');
console.log(cas12);
console.log('\n🎯 ATTENDU: IPP 30-40%');
console.log('   Complexité: SDRC type I + EVA 8/10 résistant + troubles trophiques + reconversion');
console.log('\n' + '='.repeat(80));

const result = localExpertAnalysis(cas12);

console.log('\n✅ RÉSULTAT:');
console.log(`Type: ${result.type}`);
console.log(`Lésion: ${result.name}`);
console.log(`Taux IPP: ${result.rate}%`);

if (Array.isArray(result.injury?.rate)) {
    console.log(`Fourchette barème: [${result.injury.rate.join(' - ')}]%`);
} else {
    console.log(`Fourchette barème: ${result.injury?.rate}%`);
}

console.log('\n🔍 CRITÈRES VALIDATION:');
console.log(`SDRC/Algodystrophie détecté: ${/(sdrc|algodystrophie)/i.test(result.name) ? '✅ OUI' : '❌ NON'}`);
console.log(`EVA 8/10 → Sévérité ÉLEVÉE: ${result.rate >= 30 ? '✅ OUI' : '❌ NON (sous-évalué)'}`);
console.log(`Troubles trophiques détectés: ${/trophique/i.test(result.justification || '') ? '✅ OUI' : '⚠️ NON VISIBLE'}`);
console.log(`Reconversion professionnelle prise en compte: ${/reconversion/i.test(result.justification || '') ? '✅ OUI' : '⚠️ NON VISIBLE'}`);

console.log('\n📊 VALIDATION:');
const attenduMin = 30;
const attenduMax = 40;
const isValid = result.rate >= attenduMin && result.rate <= attenduMax;

if (isValid) {
    console.log(`✅ VALIDÉ: ${result.rate}% est dans [${attenduMin}-${attenduMax}%]`);
} else {
    console.log(`⚠️ ÉCART: ${result.rate}% hors fourchette [${attenduMin}-${attenduMax}%]`);
    console.log(`   Écart: ${result.rate < attenduMin ? result.rate - attenduMin : result.rate - attenduMax}pts`);
    
    if (result.rate < attenduMin) {
        console.log('\n💡 PISTE AMÉLIORATION:');
        console.log('   - Créer expert rule SDRC/algodystrophie (entité rare)');
        console.log('   - EVA 8/10 + "résistant traitement" → Force sévérité ÉLEVÉE');
        console.log('   - "Reconversion professionnelle" → Bonus retentissement social');
        console.log('   - Troubles trophiques → Critère objectif gravité');
    } else if (result.rate > attenduMax) {
        console.log('\n💡 NOTE: IPP > attendu (pas un problème si justifié cliniquement)');
    }
}

console.log('\n' + '='.repeat(80));
console.log(`STATUT: ${isValid ? '✅ TEST RÉUSSI' : '⚠️ AMÉLIORATION NÉCESSAIRE'}`);
console.log('='.repeat(80));
