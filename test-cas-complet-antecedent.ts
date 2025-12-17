import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('\n🧪 TEST CAS COMPLET - ANTÉCÉDENT + SÉQUELLES\n');
console.log('═'.repeat(70));

const testCase = `Homme de 50 ans, manutentionnaire, victime d'un accident de travail par chute avec traumatisme du genou droit. Entorse grave du genou consolidée avec instabilité résiduelle du genou et limitation de la flexion à 90°. Le patient présente une gonalgie chronique antérieure connue, traitée épisodiquement avant l'accident. EVA 5/10 à l'effort, périmètre de marche 500m.`;

console.log('📋 CAS TEST (avec séquelles détaillées):\n');
console.log(testCase);
console.log('\n' + '═'.repeat(70));
console.log('\n⏳ ANALYSE EN COURS...\n');

const result = comprehensiveSingleLesionAnalysis(testCase);

console.log('\n✅ RÉSULTAT:\n');
console.log('─'.repeat(70));

if (result.type === 'proposal') {
    console.log(`📋 PROPOSITION:
  • Lésion: ${result.injury.name}
  • IPP: ${result.rate}%
  • Fourchette: [${result.injury.rate[0]} - ${result.injury.rate[1]}%]
  • Rubrique: ${result.injury.path}
  • Antécédents: ${result.antecedents?.join(', ') || 'Aucun'}
`);
    
    console.log('🔍 VALIDATION:');
    console.log('─'.repeat(70));
    
    const isGenouRelated = /genou|rotule|ligament.*crois|m[eé]nisque|LCA|entorse.*genou/i.test(result.injury.name);
    const hasAntecedent = result.antecedents && result.antecedents.length > 0;
    const hasAlertInJustif = /ALERTE.*ANT[EÉ]RIEUR|antécédent|gonalgie/i.test(result.justification);
    
    console.log(`1️⃣ Lésion genou: ${isGenouRelated ? '✅ CORRECT' : '❌ ERREUR'}`);
    console.log(`2️⃣ Antécédent détecté: ${hasAntecedent ? '✅ OUI - ' + result.antecedents?.join(', ') : '❌ NON'}`);
    console.log(`3️⃣ Alerte dans justification: ${hasAlertInJustif ? '✅ OUI' : '❌ NON'}`);
    console.log(`4️⃣ IPP: ${result.rate}% ${result.rate <= 20 ? '✅ Cohérent (avec aggravation)' : '⚠️ Élevé (vérifier si antécédent pris en compte)'}`);
    
    if (isGenouRelated && hasAntecedent && hasAlertInJustif && result.rate <= 20) {
        console.log('\n🎉 ✅✅✅ TEST RÉUSSI - Système fonctionne correctement');
    } else {
        console.log('\n⚠️ TEST PARTIEL - Améliorations nécessaires');
    }
    
} else if (result.type === 'no_result') {
    console.log(`⚠️ NO_RESULT:\n${result.text}\n`);
} else if (result.type === 'ambiguity') {
    console.log(`⚠️ AMBIGUÏTÉ`);
}

console.log('\n' + '═'.repeat(70) + '\n');
