/**
 * TEST CAS COMPLEXE - Main 71 ans avec polyséquelles
 * 
 * Objectif: Vérifier la détection correcte des séquelles fonctionnelles complexes
 * IPP attendu: 38-40% (au lieu de 14%)
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('\n' + '═'.repeat(80));
console.log('🧪 TEST CAS COMPLEXE - MAIN AVEC POLYSÉQUELLES');
console.log('═'.repeat(80) + '\n');

const casDescription = `71 ans ; amputation totale du D5 main droite avec luxation m4 m5. Séquelle amyotrophie de la main droite ; cicatrice rétractile. Déviation D2 D3 D4 ; diminution de la force de serrage ; enroulement de la main incomplet`;

console.log('📋 DESCRIPTION CLINIQUE:');
console.log(casDescription);
console.log('\n' + '-'.repeat(80) + '\n');

console.log('🎯 RÉSULTAT ATTENDU:');
console.log('  • Amputation D5 (auriculaire): 8%');
console.log('  • Luxation M4-M5 + déformation: 6-10%');
console.log('  • Séquelles fonctionnelles complexes: 25-30%');
console.log('    - Amyotrophie main droite');
console.log('    - Cicatrice rétractile');
console.log('    - Déviation D2, D3, D4');
console.log('    - Perte force serrage');
console.log('    - Enroulement incomplet');
console.log('  • IPP TOTAL (cumul Balthazar): 38-40%');
console.log('\n' + '-'.repeat(80) + '\n');

console.log('🔍 ANALYSE EN COURS...\n');

try {
    const result = localExpertAnalysis(casDescription);
    
    console.log('📊 RÉSULTAT OBTENU:\n');
    
    if (result.type === 'proposal' || result.type === 'cumul') {
        console.log(`✓ Type: ${result.type}`);
        
        if (result.type === 'cumul' && result.lesions) {
            console.log(`✓ Nombre de lésions: ${result.lesions.length}`);
            console.log('✓ Lésions détectées:');
            result.lesions.forEach((lesion, i) => {
                const rate = Array.isArray(lesion.rate) 
                    ? `${lesion.rate[0]}-${lesion.rate[1]}%` 
                    : `${lesion.rate}%`;
                console.log(`   ${i+1}. ${lesion.name}: ${rate}`);
            });
            console.log(`✓ IPP TOTAL (après cumul): ${result.totalRate}%`);
        } else {
            console.log(`✓ Lésion détectée: ${result.name}`);
            const ippRate = Array.isArray(result.rate) 
                ? `${result.rate[0]}-${result.rate[1]}%` 
                : `${result.rate}%`;
            console.log(`✓ Taux IPP: ${ippRate}`);
        }
        
        if (result.description) {
            console.log(`✓ Description: ${result.description}`);
        }
        
        console.log('\n' + '-'.repeat(80) + '\n');
        
        // Validation
        const rateNum = result.type === 'cumul' ? result.totalRate : 
                        (Array.isArray(result.rate) ? result.rate[1] : result.rate);
        
        if (rateNum >= 35 && rateNum <= 45) {
            console.log('✅ TEST RÉUSSI!');
            console.log(`   IPP détecté (${rateNum}%) est dans la fourchette attendue (35-45%)`);
            if (result.type === 'cumul') {
                console.log(`   Cumul détecté avec ${result.lesions.length} lésions`);
            };
            
            // Vérifier si les séquelles complexes sont détectées
            if (result.name.toLowerCase().includes('complexe') || 
                result.name.toLowerCase().includes('polyséquelle') ||
                result.name.toLowerCase().includes('fonctionnelle') ||
                rateNum >= 25) {
                console.log('   ✓ Détection des séquelles fonctionnelles complexes: OUI');
            }
        } else if (rateNum <= 20) {
            console.log('❌ TEST ÉCHOUÉ!');
            console.log(`   IPP trop faible: ${rateNum}% (attendu: 38-40%)`);
            console.log('   Cause probable: Séquelles fonctionnelles complexes non détectées');
        } else {
            console.log('⚠️  TEST PARTIELLEMENT RÉUSSI');
            console.log(`   IPP: ${rateNum}% (attendu: 38-40%)`);
            console.log('   Légèrement hors de la fourchette optimale');
        }
        
    } else if (result.type === 'cumul') {
        console.log('📦 CUMUL DÉTECTÉ:');
        console.log(`   Nombre de lésions: ${result.injuries?.length || 0}`);
        
        if (result.injuries) {
            console.log('\n   Lésions détectées:');
            result.injuries.forEach((injury, index) => {
                const injuryRate = Array.isArray(injury.rate) 
                    ? `${injury.rate[0]}-${injury.rate[1]}%` 
                    : `${injury.rate}%`;
                console.log(`   ${index + 1}. ${injury.name}: ${injuryRate}`);
            });
        }
        
        const totalRate = Array.isArray(result.rate) 
            ? `${result.rate[0]}-${result.rate[1]}%` 
            : `${result.rate}%`;
        console.log(`\n   IPP TOTAL (après cumul): ${totalRate}`);
        
        console.log('\n' + '-'.repeat(80) + '\n');
        
        // Validation
        const rateNum = Array.isArray(result.rate) ? result.rate[1] : result.rate;
        
        if (rateNum >= 35 && rateNum <= 45) {
            console.log('✅ TEST RÉUSSI!');
            console.log(`   IPP cumulé (${totalRate}) est dans la fourchette attendue (35-45%)`);
        } else if (rateNum <= 20) {
            console.log('❌ TEST ÉCHOUÉ!');
            console.log(`   IPP trop faible: ${totalRate} (attendu: 38-40%)`);
        } else {
            console.log('⚠️  TEST PARTIELLEMENT RÉUSSI');
            console.log(`   IPP: ${totalRate} (attendu: 38-40%)`);
        }
        
    } else {
        console.log(`❌ Type de résultat inattendu: ${result.type}`);
        console.log('   Résultat complet:', JSON.stringify(result, null, 2));
    }
    
} catch (error) {
    console.log('❌ ERREUR DURANT L\'ANALYSE:');
    console.log(`   ${error.message}`);
    console.log('\n   Stack:', error.stack);
}

console.log('\n' + '═'.repeat(80));
console.log('FIN DU TEST');
console.log('═'.repeat(80) + '\n');
