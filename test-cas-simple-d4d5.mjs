/**
 * TEST SIMPLE - Détection cumul amputation + tendon
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('🧪 TEST DÉTECTION CUMUL - VERSION COURTE');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

const tests = [
    "amputation P3 D5 avec repture du flechisseur du P2 D4",
    "amputation P3 D5 avec repture du flechisseur du P2 D4 main droite",
    "amputation P3 D5 avec rupture du fléchisseur du P2 D4 main dominante"
];

tests.forEach((text, idx) => {
    console.log(`\n${'─'.repeat(75)}`);
    console.log(`TEST ${idx + 1}: "${text}"`);
    console.log('─'.repeat(75));
    
    const result = localExpertAnalysis(text);
    
    // 🔍 DEBUG: Afficher type et propriétés du résultat
    console.log(`\n📊 RÉSULTAT ANALYSE:`);
    console.log(`   Type: ${result.type}`);
    console.log(`   isCumul: ${result.isCumul}`);
    if (result.type === 'proposal') {
        console.log(`   Name: ${result.name}`);
        console.log(`   Rate: ${result.rate}%`);
    } else if (result.type === 'cumul_proposals') {
        console.log(`   Proposals: ${result.proposals?.length || 0}`);
    }
    console.log('');
    
    if (result.type === 'proposal') {
        console.log(`✅ Type: ${result.type}`);
        console.log(`📌 Lésion: ${result.name}`);
        console.log(`💯 Taux IPP: ${result.rate}%`);
        console.log(`🔗 Cumul: ${result.isCumul ? 'OUI' : 'NON'}`);
        
        if (result.rate === 12 && result.isCumul) {
            console.log(`\n🎉 SUCCÈS - Cumul détecté et calculé correctement !`);
        } else if (result.rate < 12) {
            console.log(`\n⚠️  ATTENTION - Taux trop bas (${result.rate}% au lieu de 12%)`);
            console.log(`   Composant manquant: ${result.isCumul ? 'calcul incorrect' : 'cumul non détecté'}`);
        }
    } else if (result.type === 'cumul_proposals') {
        console.log(`✅ Type: ${result.type}`);
        console.log(`📊 Nombre de lésions: ${result.lesionCount}`);
        result.proposals.forEach((p, i) => {
            console.log(`   ${i+1}. ${p.injury.name}`);
        });
        console.log(`\n🎉 EXCELLENT - Cumul détecté avec propositions multiples !`);
    }
});

console.log('\n' + '═'.repeat(75));
console.log('DIAGNOSTIC');
console.log('═'.repeat(75));
console.log('\nSi tous les tests calculent 12% avec cumul → Pattern 7 fonctionne ✅');
console.log('Si taux = 4% sans cumul → Pattern 7 ne match pas ou règles expertes bloquent');
console.log('Si type = cumul_proposals → Détection OK mais pas de calcul auto\n');
