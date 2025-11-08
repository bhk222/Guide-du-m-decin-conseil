// Test CAS 13 - Traumatisme crânien grave avec séquelles multiples
// Attendu: IPP 50-70% (cumul céphalées + troubles cognitifs + épilepsie + psychiatrique)

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas13 = `Accident travail BTP, chute échafaudage 6 mètres. Traumatisme crânien sévère (Glasgow initial 8), hématome sous-dural évacué chirurgicalement. Consolidation neurologique obtenue mais séquelles à 18 mois : céphalées chroniques quotidiennes EVA 6/10, troubles mémoire antérograde (MMS 24/30), ralentissement psychomoteur, troubles attention, impossibilité reprise poste antérieur, syndrome anxio-dépressif réactionnel traité, épilepsie post-traumatique (2 crises/mois sous traitement).`;

console.log('='.repeat(80));
console.log('TEST CAS 13 - TRAUMATISME CRÂNIEN GRAVE SÉQUELLES MULTIPLES');
console.log('='.repeat(80));
console.log('\n📋 DESCRIPTION:');
console.log(cas13);
console.log('\n🎯 ATTENDU: IPP 50-70%');
console.log('   Complexité: Cumul céphalées (10-15%) + cognitif (20-40%) + épilepsie (20-30%)');
console.log('   Formule Balthazard attendue: 15% + 30%×0.85 + 25%×0.6 = ~55-60%');
console.log('\n' + '='.repeat(80));

const result = localExpertAnalysis(cas13);

console.log('\n✅ RÉSULTAT:');
console.log(`Type: ${result.type}`);
console.log(`Lésion: ${result.name}`);
console.log(`Taux IPP: ${result.rate}%`);

if (Array.isArray(result.injury?.rate)) {
    console.log(`Fourchette barème: [${result.injury.rate.join(' - ')}]%`);
} else {
    console.log(`Fourchette barème: ${result.injury?.rate}%`);
}

console.log(`Cumul détecté: ${result.isCumul ? '✅ OUI' : '❌ NON'}`);

console.log('\n🔍 CRITÈRES VALIDATION:');
console.log(`TC/Séquelles neurologiques détecté: ${/(traumatisme.*cr[aâ]nien|s[eé]quelles.*neurologiques|tc)/i.test(result.name) ? '✅ OUI' : '❌ NON'}`);
console.log(`Céphalées chroniques détectées: ${/c[eé]phal[eé]e/i.test(result.justification || result.name) ? '✅ OUI' : '⚠️ NON VISIBLE'}`);
console.log(`Troubles cognitifs détectés: ${/(cognitif|m[eé]moire|mms)/i.test(result.justification || result.name) ? '✅ OUI' : '⚠️ NON VISIBLE'}`);
console.log(`Épilepsie post-traumatique détectée: ${/[eé]pilepsie/i.test(result.justification || result.name) ? '✅ OUI' : '⚠️ NON VISIBLE'}`);
console.log(`MMS 24/30 reconnu (déficit modéré): ${/mms.*24|24.*30|d[eé]ficit.*cognitif/i.test(result.justification || '') ? '✅ OUI' : '⚠️ NON VISIBLE'}`);

console.log('\n📊 VALIDATION:');
const attenduMin = 50;
const attenduMax = 70;
const isValid = result.rate >= attenduMin && result.rate <= attenduMax;

if (isValid) {
    console.log(`✅ VALIDÉ: ${result.rate}% est dans [${attenduMin}-${attenduMax}%]`);
    if (result.isCumul) {
        console.log('✅ Formule Balthazard appliquée correctement');
    } else {
        console.log('⚠️ Cumul non détecté mais IPP correcte (peut-être lésion unique complexe)');
    }
} else {
    console.log(`⚠️ ÉCART: ${result.rate}% hors fourchette [${attenduMin}-${attenduMax}%]`);
    console.log(`   Écart: ${result.rate < attenduMin ? result.rate - attenduMin : result.rate - attenduMax}pts`);
    
    if (result.rate < attenduMin) {
        console.log('\n💡 PISTE AMÉLIORATION:');
        console.log('   - Créer expert rule cumul TC grave (céphalées + cognitif + épilepsie)');
        console.log('   - Détecter MMS 24/30 → Déficit cognitif MODÉRÉ (normal ≥27)');
        console.log('   - Appliquer formule Balthazard pour cumul 3 lésions');
        console.log('   - "Impossibilité reprise poste" → Retentissement professionnel majeur');
    }
}

console.log('\n' + '='.repeat(80));
console.log(`STATUT: ${isValid ? '✅ TEST RÉUSSI' : '⚠️ AMÉLIORATION NÉCESSAIRE'}`);
console.log('='.repeat(80));
