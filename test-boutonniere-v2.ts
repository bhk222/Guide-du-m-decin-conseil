import { localExpertAnalysis } from './components/AiAnalyzer';

// Cas de test EXACT fourni par l'utilisateur (sans le mot "doigt")
const casTest = `le 3 eme présente une attitude vicieuse caractéristique en "boutonnière", associant une flexion de l'interphalangienne proximale (IPP) et une hyperextension de l'interphalangienne distale (IPD). On note la perte du relief dorsal normal de l'articulation IPP.`;

console.log('🔬 TEST: Détection boutonnière SANS le mot "doigt"');
console.log('='.repeat(70));
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
    
    // Vérification
    if (resultat.name.toLowerCase().includes('boutonnière') || resultat.name.toLowerCase().includes('boutonniere')) {
        console.log('\n✅ TEST RÉUSSI: Déformation en boutonnière correctement détectée');
    } else if (resultat.name.toLowerCase().includes('ablation') && resultat.name.toLowerCase().includes('pouce')) {
        console.log('\n❌ TEST ÉCHOUÉ: Détection incorrecte (ablation pouce au lieu de boutonnière)');
        console.log(`   ERREUR: ${resultat.name} détecté au lieu de boutonnière`);
    } else {
        console.log('\n⚠️  Autre lésion détectée: ' + resultat.name);
    }
} else {
    console.log(`\n❌ Type: ${resultat.type}`);
}

console.log('\n' + '='.repeat(70));
