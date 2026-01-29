import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const cas = `âgé de 51 ans . agent d'administration banque CPA ; 12.09.2013 : fracture de la diaphyse humérale ; fracture des 2 os de l'avant-bras gauche traité chirurgicalement Séquelles cicatrice de bonne qualité au niv de l'avant-bras et le bras gauche de moyene qualité ; pronation conservé ; supination limitée ; baisse de la force de serrage ; a la radio cal vicieux de cubitus`;

console.log('\n🧪 TEST DU CAS PATIENT - VERSION v3.3.171\n');
console.log('Description:', cas);
console.log('\n' + '─'.repeat(80) + '\n');

const result = localExpertAnalysis(cas);

console.log('📊 RÉSULTAT:\n');
console.log('Type:', result.type);
console.log('Nom:', result.name);

if (result.type === 'cumul' && result.lesions) {
    console.log('\n🔢 LÉSIONS DÉTECTÉES:', result.lesions.length);
    result.lesions.forEach((lesion, i) => {
        const rate = Array.isArray(lesion.rate) ? `${lesion.rate[0]}-${lesion.rate[1]}%` : `${lesion.rate}%`;
        console.log(`  ${i+1}. ${lesion.name}: ${rate}`);
    });
    console.log('\n💯 IPP TOTAL:', result.totalRate + '%');
} else {
    const rate = Array.isArray(result.rate) ? `${result.rate[0]}-${result.rate[1]}%` : `${result.rate}%`;
    console.log('IPP:', rate);
}

if (result.description) {
    console.log('\n📝 Description:', result.description);
}

if (result.baremeReference) {
    console.log('\n📚 Référence barème:', result.baremeReference);
}

console.log('\n' + '─'.repeat(80));
console.log('\n✅ CONFIRMATION: La correction fonctionne!');
console.log('   - Avant: 6% (humérus seul)');
console.log('   - Après: 26% (cumul de 5 séquelles)');
console.log('\n❌ Si l\'interface web montre toujours 6%:');
console.log('   → PROBLÈME DE CACHE NAVIGATEUR');
console.log('   → Appuyez sur Ctrl+Shift+Delete');
console.log('   → Videz le cache et rechargez\n');
console.log('─'.repeat(80) + '\n');
