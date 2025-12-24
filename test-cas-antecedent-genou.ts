import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('\n🧪 TEST CAS ANTÉCÉDENT MÉDICAL GENOU\n');
console.log('═'.repeat(70));

const testCase = {
    description: `Homme de 50 ans, manutentionnaire, victime d'un accident de travail par chute avec traumatisme du genou droit. Le patient présente une gonalgie chronique antérieure connue, traitée épisodiquement avant l'accident.`,
    expectedBehavior: {
        shouldDetectAntecedent: true,
        antecedentExpected: "Gonalgie chronique antérieure",
        shouldWarnAboutPreexisting: true,
        ippExpected: "Faible (5-10% max) - aggravation uniquement",
        reasoning: "IPP imputable = aggravation post-traumatique uniquement, PAS l'état antérieur"
    }
};

console.log('📋 DESCRIPTION:\n');
console.log(testCase.description);
console.log('\n' + '═'.repeat(70));

console.log('\n🎯 COMPORTEMENT ATTENDU:');
console.log(`  • Détection antécédent: ${testCase.expectedBehavior.shouldDetectAntecedent ? '✅ OUI' : '❌ NON'}`);
console.log(`  • Antécédent: "${testCase.expectedBehavior.antecedentExpected}"`);
console.log(`  • Alerte état antérieur: ${testCase.expectedBehavior.shouldWarnAboutPreexisting ? '✅ OUI' : '❌ NON'}`);
console.log(`  • IPP imputable: ${testCase.expectedBehavior.ippExpected}`);
console.log(`  • Raisonnement: ${testCase.expectedBehavior.reasoning}`);

console.log('\n' + '═'.repeat(70));
console.log('\n⏳ ANALYSE EN COURS...\n');

// Analyser le cas
const result = comprehensiveSingleLesionAnalysis(
    testCase.description,
    []  // pas d'antécédents fournis (on teste la détection auto)
);

console.log('\n📋 Antécédents détectés:', 0); // result.antecedents?.length || 0);
console.log('🔍 Type de résultat:', result.type);
if (false) { // result.antecedents && result.antecedents.length > 0) {
    // result.antecedents.forEach((ant: any, i: number) => {
        // console.log(`  ${i + 1}. "${ant}"`);
    // });
} else {
    console.log('  ⚠️ AUCUN antécédent détecté');
}

console.log('\n✅ RÉSULTAT ANALYSE IA:');
console.log('─'.repeat(70));

if (result.type === 'proposal') {
    console.log(`\n📋 PROPOSITION:
  • Lésion: ${result.injury.name}
  • IPP: ${result.rate}%
  • Fourchette: [${result.injury.rate[0]} - ${result.injury.rate[1]}%]
`);
  // • Rubrique: ${result.injury.path}
} else if (result.type === 'ambiguity') {
    console.log(`\n⚠️ AMBIGUÏTÉ:
`);
  // • ${result.ambiguousResults.length} lésions possibles
  // • Suggestion: ${result.suggestion?.name || 'N/A'}
  // • IPP suggéré: ${result.suggestion?.rate || 'N/A'}%
}

console.log('\n🔍 VALIDATION:');
console.log('─'.repeat(70));

// Vérifier détection antécédent
const antecedentDetected = false; // result.antecedents && result.antecedents.length > 0;
const hasGenou = false; // result.antecedents?.some((a: string) => /genou|gonalgie/i.test(a));

console.log(`\n1️⃣ Détection antécédent:`);
if (antecedentDetected && hasGenou) {
    console.log(`  ✅ CORRECT - Antécédent genou détecté`);
} else if (antecedentDetected && !hasGenou) {
    console.log(`  ⚠️ PARTIEL - Antécédent détecté mais pas spécifique genou`);
} else {
    console.log(`  ❌ ÉCHEC - Antécédent non détecté`);
}

// Vérifier mention état antérieur dans justification
const mentionsPreexisting = false;
// result.justification &&
//     (/ant[eé]c[eé]dent|[é]tat.*ant[é]rieur|pr[é]existant|chronique.*avant/i.test(result.justification));

console.log(`\n2️⃣ Alerte état antérieur:`);
if (mentionsPreexisting) {
    console.log(`  ✅ CORRECT - État antérieur mentionné dans justification`);
} else {
    console.log(`  ❌ ÉCHEC - Pas d'alerte sur état antérieur`);
}

// Vérifier IPP cohérent (devrait être faible)
const ipp = (result as any).rate || 0;
console.log(`\n3️⃣ IPP proposé: ${ipp}%`);
if (ipp <= 10) {
    console.log(`  ✅ CORRECT - IPP faible (aggravation uniquement)`);
} else if (ipp <= 20) {
    console.log(`  ⚠️ ÉLEVÉ - IPP modéré (vérifier part imputable)`);
} else {
    console.log(`  ❌ TRÈS ÉLEVÉ - IPP ${ipp}% ignore probablement l'état antérieur`);
}

console.log('\n' + '═'.repeat(70));

// Résumé
const allCorrect = antecedentDetected && hasGenou && mentionsPreexisting && ipp <= 10;
if (allCorrect) {
    console.log('\n✅✅✅ TEST RÉUSSI - Gestion correcte de l\'état antérieur');
} else {
    console.log('\n❌ TEST ÉCHOUÉ - Amélioration nécessaire de la gestion des antécédents');
    console.log('\n🔧 CORRECTIONS NÉCESSAIRES:');
    if (!antecedentDetected || !hasGenou) {
        console.log('  1. Améliorer détection "chronique antérieure", "avant l\'accident"');
    }
    if (!mentionsPreexisting) {
        console.log('  2. Ajouter alerte explicite sur état antérieur dans justification');
    }
    if (ipp > 10) {
        console.log('  3. Ajuster IPP (uniquement aggravation, pas état préexistant)');
    }
}

console.log('\n' + '═'.repeat(70) + '\n');
