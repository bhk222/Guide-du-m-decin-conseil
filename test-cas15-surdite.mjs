/**
 * TEST CAS 15 - Surdité Bilatérale Professionnelle + Acouphènes Invalidants
 * 
 * Difficulté: ⭐⭐⭐⭐ (4/5)
 * IPP attendu: 50-60%
 * 
 * Objectifs de test:
 * 1. Parser dB distincts OD/OG → Calcul moyenne (70+65)/2 = 67.5 dB
 * 2. Différencier acouphènes INVALIDANTS (10%) vs simples (5%)
 * 3. Détecter "résistant traitement" (masqueurs, TCC, médicaments)
 * 4. Majoration retentissement psycho-social (isolement + dépression)
 * 5. Cumul surdité + acouphènes territoire audition
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('🧪 TEST CAS 15 - Surdité Bilatérale + Acouphènes Invalidants');
console.log('=' .repeat(70));

const cas15Description = `Ouvrier métallurgie 52 ans, exposition bruit 30 ans (marteau-piqueur, meuleuse). Surdité neurosensorielle bilatérale progressive : OD 70 dB (surdité sévère), OG 65 dB (surdité moyenne-sévère), moyenne 67.5 dB. Acouphènes bilatéraux permanents invalidants (sifflements aigus continus) résistants masqueurs sonores, TCC, médicaments. Isolement social majeur (évite conversations), troubles sommeil, syndrome anxio-dépressif réactionnel, reconversion impossible (communication client).`;

console.log('\n📋 DESCRIPTION CLINIQUE:');
console.log(cas15Description);

console.log('\n🎯 CRITÈRES ATTENDUS:');
console.log('  1. Surdité bilatérale 67.5 dB (moyenne OD 70 + OG 65): 40-50%');
console.log('  2. Acouphènes invalidants résistants traitement: +10%');
console.log('  3. Retentissement psycho-social majeur (isolement + dépression): +5%');
console.log('  4. IPP total: 45% (base) + 10% + 5% = 55-60%');

console.log('\n⏳ ANALYSE EN COURS...\n');

try {
    const result = localExpertAnalysis(cas15Description);
    
    console.log('✅ RÉSULTAT ANALYSE IA:');
    console.log('─'.repeat(70));
    console.log(`📌 Lésion détectée: ${result.name}`);
    console.log(`📊 Taux IPP calculé: ${result.rate}%`);
    console.log(`📖 Justification: ${result.justification}`);
    
    if (result.isCumul) {
        console.log(`🔗 Type: CUMUL`);
    }
    
    // Validation fourchette [50-60%]
    const ippMin = 50;
    const ippMax = 60;
    const isValid = result.rate >= ippMin && result.rate <= ippMax;
    
    console.log('\n📊 VALIDATION:');
    console.log(`  - IPP attendu: [${ippMin}-${ippMax}]%`);
    console.log(`  - IPP obtenu: ${result.rate}%`);
    console.log(`  - Statut: ${isValid ? '✅ VALIDÉ' : '❌ HORS FOURCHETTE'}`);
    
    if (!isValid) {
        console.log('\n⚠️  ANALYSE ÉCART:');
        if (result.rate < ippMin) {
            console.log(`  - IPP trop faible (-${ippMin - result.rate}%)`);
            console.log('  - Causes possibles:');
            console.log('    • Parser dB bilatéral défaillant (OD 70, OG 65 → moyenne 67.5)');
            console.log('    • Acouphènes INVALIDANTS (10%) non détectés vs simples (5%)');
            console.log('    • Retentissement psycho-social (5%) manquant');
            console.log('    • Cumul surdité + acouphènes non appliqué');
        } else {
            console.log(`  - IPP trop élevé (+${result.rate - ippMax}%)`);
            console.log('  - Causes possibles:');
            console.log('    • Sur-évaluation niveau surdité');
            console.log('    • Double comptage acouphènes/retentissement');
        }
    }
    
    console.log('\n🔍 DÉTAILS TECHNIQUES ATTENDUS:');
    console.log('  • Parser dB: Détection "OD 70 dB" + "OG 65 dB" → Moyenne 67.5 dB');
    console.log('  • Sévérité: 67.5 dB = surdité moyenne-sévère → IPP 45%');
    console.log('  • Acouphènes: Détection "invalidants" + "résistants" → +10% (vs +5% simples)');
    console.log('  • Retentissement: "isolement social" + "anxio-dépressif" → +5%');
    
    console.log('\n' + '='.repeat(70));
    console.log(isValid ? '🎉 CAS 15 VALIDÉ ✅' : '⚠️  CAS 15 À AMÉLIORER ❌');
    console.log('='.repeat(70));
    
    process.exit(isValid ? 0 : 1);
    
} catch (error) {
    console.error('❌ ERREUR ANALYSE:', error.message);
    console.error('\n🔍 DÉTAILS ERREUR:');
    console.error(error);
    process.exit(1);
}
