import { localExpertAnalysis } from './components/AiAnalyzer';

// Cas de test: déformation en boutonnière du 3ème doigt
const casTest = `Suite à un traumatisme sportif survenu le 15 janvier 2024, le 3 eme doigt présente une attitude vicieuse caractéristique en 'boutonnière', associant une flexion de l'interphalangienne proximale (IPP) et une hyperextension de l'interphalangienne distale (IPD). L'examen clinique confirme cette déformation typique avec limitation fonctionnelle modérée. Le patient est droitier.`;

console.log('🔬 TEST: Détection déformation en boutonnière du 3ème doigt');
console.log('=' .repeat(70));
console.log('Input:', casTest);
console.log('\n');

const resultat = localExpertAnalysis(casTest);

console.log('📊 RÉSULTAT:');
console.log('-'.repeat(70));

if (resultat.type === 'proposal') {
    console.log(`\n✅ Proposition trouvée:`);
    console.log(`   Lésion: ${resultat.name}`);
    console.log(`   Taux: ${resultat.rate}%`);
    console.log(`   Chemin: ${resultat.path}`);
    console.log(`   Justification: ${resultat.justification}`);
    
    // Vérification
    if (resultat.name.toLowerCase().includes('boutonnière') || resultat.name.toLowerCase().includes('boutonniere')) {
        console.log('\n✅ TEST RÉUSSI: Déformation en boutonnière correctement détectée');
    } else if (resultat.name.toLowerCase().includes('ablation') && resultat.name.toLowerCase().includes('pouce')) {
        console.log('\n❌ TEST ÉCHOUÉ: Détection incorrecte (ablation pouce au lieu de boutonnière)');
    } else {
        console.log('\n⚠️  TEST PARTIELLEMENT RÉUSSI: Autre lésion détectée');
    }
} else if (resultat.type === 'no_result') {
    console.log(`\n❌ Aucune proposition trouvée`);
    console.log(`   Message: ${resultat.text}`);
} else if (resultat.type === 'ambiguity') {
    console.log(`\n⚠️  Ambiguïté détectée`);
    console.log(`   Message: ${resultat.text}`);
    console.log(`   Choix: ${resultat.choices.length} options`);
} else if (resultat.type === 'cumul_proposals') {
    console.log(`\n⚠️  Cumul de lésions détecté`);
    console.log(`   ${resultat.proposals.length} lésions trouvées`);
}

console.log('\n' + '='.repeat(70));
