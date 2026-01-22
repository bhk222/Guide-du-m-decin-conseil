/**
 * TEST CAS CUMUL - Fractures humérus + avant-bras avec cal vicieux
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('\n' + '═'.repeat(80));
console.log('🧪 TEST CAS CUMUL - HUMÉRUS + AVANT-BRAS');
console.log('═'.repeat(80) + '\n');

const casDescription = `âgé de 51 ans . agent d'administration banque CPA ; 12.09.2013 : fracture de la diaphyse humérale ; fracture des 2 os de l'avant-bras gauche traité chirurgicalement Séquelles cicatrice de bonne qualité au niv de l'avant-bras et le bras gauche de moyene qualité ; pronation conservé ; supination limitée ; baisse de la force de serrage ; a la radio cal vicieux de cubitus`;

console.log('📋 DESCRIPTION CLINIQUE:');
console.log(casDescription);
console.log('\n' + '-'.repeat(80) + '\n');

console.log('🎯 ANALYSE ATTENDUE:');
console.log('  • Fracture humérale consolidée: 6-10%');
console.log('  • Cal vicieux cubitus + limitation supination: 10-20%');
console.log('  • Baisse force serrage (inclus dans cal vicieux)');
console.log('  • CUMUL attendu: 15-28% (formule Balthazar)');
console.log('\n❌ Proposition IA actuelle: 6% (humérus seul) - SOUS-ÉVALUÉ');
console.log('\n' + '-'.repeat(80) + '\n');

console.log('🔍 ANALYSE EN COURS...\n');

try {
    const result = localExpertAnalysis(casDescription);
    
    console.log('📊 RÉSULTAT OBTENU:\n');
    
    if (result.type === 'cumul' && result.lesions) {
        console.log(`✓ Type: ${result.type}`);
        console.log(`✓ Nombre de lésions: ${result.lesions.length}`);
        console.log('✓ Lésions détectées:');
        result.lesions.forEach((lesion, i) => {
            const rate = Array.isArray(lesion.rate) 
                ? `${lesion.rate[0]}-${lesion.rate[1]}%` 
                : `${lesion.rate}%`;
            console.log(`   ${i+1}. ${lesion.name}: ${rate}`);
        });
        console.log(`\n✓ IPP TOTAL (après cumul): ${result.totalRate}%`);
        
        if (result.totalRate >= 15 && result.totalRate <= 30) {
            console.log('\n✅ TEST RÉUSSI - Cumul détecté avec IPP cohérent');
        } else if (result.totalRate < 15) {
            console.log('\n⚠️ IPP un peu faible mais cumul détecté');
        } else {
            console.log('\n✅ Cumul détecté');
        }
    } else {
        console.log(`✓ Type: ${result.type}`);
        console.log(`✓ Lésion détectée: ${result.name}`);
        const ippRate = Array.isArray(result.rate) 
            ? `${result.rate[0]}-${result.rate[1]}%` 
            : `${result.rate}%`;
        console.log(`✓ Taux IPP: ${ippRate}`);
        
        if (result.description) {
            console.log(`✓ Description: ${result.description}`);
        }
        
        const rateNum = Array.isArray(result.rate) ? result.rate[1] : result.rate;
        
        if (rateNum <= 10) {
            console.log('\n❌ TEST ÉCHOUÉ - Mono-lésion détectée au lieu du cumul');
            console.log('   Le cal vicieux du cubitus et la limitation de supination ne sont pas pris en compte');
        }
    }
    
} catch (error) {
    console.log('\n❌ ERREUR DURANT L\'ANALYSE:');
    console.log(`   ${error.message}`);
    if (error.stack) {
        console.log(`\n   Stack: ${error.stack}`);
    }
}

console.log('\n' + '═'.repeat(80));
console.log('FIN DU TEST');
console.log('═'.repeat(80));
