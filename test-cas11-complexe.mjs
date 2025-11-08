// Test CAS 11 - Fracture ouverte tibia avec infection chronique
// Attendu: IPP 40-50% (cumul raccourcissement + raideur multiple + infection)

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas11 = `Accident moto, polytraumatisme membre inférieur. Fracture ouverte tibia gauche type IIIB Gustilo, infection post-opératoire à staphylocoque doré résistant. Séquelles après 3 interventions : ostéite chronique, raccourcissement 3.5 cm, raideur genou (flexion 90°), raideur cheville (flexion dorsale 5°), boiterie majeure, périmètre marche 200m, douleurs EVA 7/10 quotidiennes.`;

console.log('='.repeat(80));
console.log('TEST CAS 11 - FRACTURE TIBIA OUVERTE + INFECTION CHRONIQUE');
console.log('='.repeat(80));
console.log('\n📋 DESCRIPTION:');
console.log(cas11);
console.log('\n🎯 ATTENDU: IPP 40-50%');
console.log('   Complexité: Raccourcissement 3.5cm + raideur genou + raideur cheville + ostéite');
console.log('\n' + '='.repeat(80));

const result = localExpertAnalysis(cas11);

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
console.log(`Raccourcissement 3.5cm détecté: ${/raccourcissement/i.test(result.justification || result.name) ? '✅ OUI' : '❌ NON'}`);
console.log(`Raideur multiple détectée: ${/(raideur|genou|cheville)/i.test(result.justification || result.name) ? '✅ OUI' : '❌ NON'}`);
console.log(`Infection/ostéite détectée: ${/(infection|ost[eé]ite)/i.test(result.justification || result.name) ? '✅ OUI' : '❌ NON'}`);
console.log(`Périmètre marche 200m pris en compte: ${/200.*m|p[eé]rim[eè]tre.*marche/i.test(result.justification || '') ? '✅ OUI' : '⚠️ NON VISIBLE'}`);

console.log('\n📊 VALIDATION:');
const attenduMin = 40;
const attenduMax = 50;
const isValid = result.rate >= attenduMin && result.rate <= attenduMax;

if (isValid) {
    console.log(`✅ VALIDÉ: ${result.rate}% est dans [${attenduMin}-${attenduMax}%]`);
} else {
    console.log(`⚠️ ÉCART: ${result.rate}% hors fourchette [${attenduMin}-${attenduMax}%]`);
    console.log(`   Écart: ${result.rate < attenduMin ? result.rate - attenduMin : result.rate - attenduMax}pts`);
    
    if (result.rate < attenduMin) {
        console.log('\n💡 PISTE AMÉLIORATION:');
        console.log('   - Vérifier détection raccourcissement 3.5cm → Sévérité MOYENNE');
        console.log('   - Vérifier cumul raideur genou + cheville (formule Balthazard ?)');
        console.log('   - Vérifier bonus ostéite chronique (complication grave)');
    }
}

console.log('\n' + '='.repeat(80));
console.log(`STATUT: ${isValid ? '✅ TEST RÉUSSI' : '⚠️ AMÉLIORATION NÉCESSAIRE'}`);
console.log('='.repeat(80));
