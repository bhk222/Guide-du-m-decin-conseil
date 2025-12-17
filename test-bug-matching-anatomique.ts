import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('\n🧪 TEST CAS ANTÉCÉDENT - MATCHING ANATOMIQUE\n');
console.log('═'.repeat(70));

const testCase = `Homme de 50 ans, manutentionnaire, victime d'un accident de travail par chute avec traumatisme du genou droit. Le patient présente une gonalgie chronique antérieure connue, traitée épisodiquement avant l'accident.`;

console.log('📋 CAS TEST:\n');
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
  • Rubrique: ${result.injury.path}
  • Antécédents: ${result.antecedents?.join(', ') || 'Aucun'}
`);
    
    // Vérifier si c'est bien une lésion du GENOU
    const isGenouRelated = /genou|rotule|patell|ligament.*crois|m[eé]nisque|LCA|LCP/i.test(result.injury.name) || 
                          /genou/i.test(result.injury.path);
    
    console.log('🔍 VALIDATION:');
    console.log('─'.repeat(70));
    
    if (isGenouRelated) {
        console.log('✅ CORRECT - Lésion du genou détectée');
    } else {
        console.log('❌ ERREUR - Lésion incorrecte (pas de rapport avec le genou)');
        console.log(`   → Détecté: ${result.injury.name}`);
        console.log(`   → Attendu: Lésion du genou`);
    }
    
    if (result.antecedents && result.antecedents.length > 0) {
        console.log('✅ CORRECT - Antécédent détecté');
    } else {
        console.log('⚠️ Antécédent non détecté dans result (mais peut-être dans justification)');
    }
    
} else if (result.type === 'no_result') {
    console.log(`⚠️ NO_RESULT:\n${result.text}\n`);
    console.log('💡 Le texte est trop vague. Ajoutez des séquelles précises.');
} else if (result.type === 'ambiguity') {
    console.log(`⚠️ AMBIGUÏTÉ:\n  • Choix multiples disponibles`);
}

console.log('\n' + '═'.repeat(70) + '\n');
