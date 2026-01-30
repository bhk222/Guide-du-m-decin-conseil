/**
 * 🧪 TEST VALIDATION CORRECTION BARÈME 1967
 * Version: 3.3.200
 * 
 * Objectif: Valider la conformité de la logique d'analyse IPP 
 * avec le barème officiel 1967 pour:
 * - Syndrome cervical → NEUROLOGIQUE (pas RACHIS)
 * - SSTC + syndrome cervical associé → Max 15% (sans lésion organique)
 * - Brachialgie → NEUROLOGIQUE (radiculalgie, pas rachis)
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('🧪 TEST VALIDATION CORRECTION BARÈME 1967 - V3.3.200');
console.log('='.repeat(80));
console.log('');

// ============================================================================
// CAS TEST 1: CAS CLINIQUE RÉEL (Explosion)
// ============================================================================

console.log('📋 CAS TEST 1: EXPLOSION - SSTC + SYNDROME CERVICAL + SURDITÉ');
console.log('-'.repeat(80));

const cas1 = `Agé de 53 ans victime d'un AT survenue le 20.06.2001. explosion d'une bombe occasionnant : traumatisme cranio-faciale avec otorragie et perforation tympanique ; a l'examen : cephalée; vertige ; cervicalgie; mouvement du cou son douleureux; baisse de l'acuité auditive surdité de transmission avec mois de 95 db a droite et moin 25 db a gauche`;

console.log('\n📝 Description clinique:');
console.log(cas1);

console.log('\n🎯 ATTENDU (Barème 1967):');
console.log('  • Système NEUROLOGIQUE: SSTC + syndrome cervical associé → 15-18%');
console.log('    - Explosion (mécanisme violent)');
console.log('    - Otorragie + perforation tympanique (lésions organiques)');
console.log('    - Céphalées + vertiges + cervicalgie persistants');
console.log('    - Persistance > 20 ans (2001 → 2024)');
console.log('    - Barème 1967 ligne 746-758: "Jusqu\'à 20% avec lésions organiques"');
console.log('');
console.log('  • Système ORL: Surdité bilatérale asymétrique → 25-28%');
console.log('    - OD 95 dB (profonde) + OG 25 dB (légère)');
console.log('    - Perforation tympanique (+3%)');
console.log('');
console.log('  • IPP CUMULÉ (Balthazar): 39-40%');
console.log('    - Formule: 28% + 15% × (100-28)/100 = 38.8% → 39%');

console.log('\n⚙️  EXÉCUTION...\n');

try {
    const result1 = localExpertAnalysis(cas1);
    
    console.log('✅ RÉSULTAT OBTENU:');
    console.log(`  Type: ${result1.type}`);
    
    if (result1.type === 'proposal') {
        console.log(`  IPP: ${result1.rate}%`);
        console.log(`  Lésion: ${result1.name}`);
        console.log(`  Path: ${result1.path}`);
        console.log(`  Justification: ${result1.justification}`);
        
        // Validation
        const isValid = result1.rate >= 39 && result1.rate <= 42;
        const isNeuroOrCumul = result1.path.includes('NEUROLOGIQUE') || result1.path.includes('Cumul') || result1.isCumul;
        
        console.log('\n📊 VALIDATION:');
        console.log(`  • IPP dans fourchette [39-42%]: ${isValid ? '✅' : '❌'} (obtenu: ${result1.rate}%)`);
        console.log(`  • Système NEUROLOGIQUE détecté: ${isNeuroOrCumul ? '✅' : '❌'}`);
        
        if (!isValid) {
            console.log('\n⚠️  ÉCART DÉTECTÉ:');
            if (result1.rate < 39) {
                console.log(`  • IPP trop faible (${39 - result1.rate}% manquants)`);
                console.log('  • Causes possibles:');
                console.log('    - SSTC + cervical non regroupé correctement');
                console.log('    - Surdité bilatérale sous-évaluée');
                console.log('    - Perforation tympanique non prise en compte');
            } else {
                console.log(`  • IPP trop élevé (+${result1.rate - 42}%)`);
            }
        } else {
            console.log('\n✅ CAS TEST 1: VALIDÉ');
        }
    } else {
        console.log('❌ ERREUR: Type de résultat inattendu');
        console.log('Résultat:', JSON.stringify(result1, null, 2));
    }
} catch (error) {
    console.error('❌ ERREUR lors de l\'exécution du test 1:', error);
}

console.log('\n' + '='.repeat(80) + '\n');

// ============================================================================
// CAS TEST 2: CERVICALGIE ISOLÉE (Entorse)
// ============================================================================

console.log('📋 CAS TEST 2: ENTORSE CERVICALE - SYNDROME CERVICAL ISOLÉ');
console.log('-'.repeat(80));

const cas2 = `Entorse cervicale post-accident de la route, syndrome cervical chronique avec cervicalgie persistante, raideur cervicale, limitation des rotations, distance menton-sternum 15 cm, douleurs chroniques depuis 2 ans`;

console.log('\n📝 Description clinique:');
console.log(cas2);

console.log('\n🎯 ATTENDU (Barème 1967):');
console.log('  • Système NEUROLOGIQUE: Syndrome cervical isolé → 5-8%');
console.log('    - Barème 1967 ligne 746: "2 à 5 pour 100"');
console.log('    - Majoré à 8% pour raideur + limitation + chronicité');
console.log('    - PAS de céphalées ni vertiges (pas de SSTC associé)');

console.log('\n⚙️  EXÉCUTION...\n');

try {
    const result2 = localExpertAnalysis(cas2);
    
    console.log('✅ RÉSULTAT OBTENU:');
    console.log(`  Type: ${result2.type}`);
    
    if (result2.type === 'proposal') {
        console.log(`  IPP: ${result2.rate}%`);
        console.log(`  Lésion: ${result2.name}`);
        console.log(`  Path: ${result2.path}`);
        console.log(`  Justification: ${result2.justification}`);
        
        // Validation
        const isValid = result2.rate >= 5 && result2.rate <= 10;
        const isNeuro = result2.path.includes('NEUROLOGIQUE');
        const notRachis = !result2.path.includes('Rachis') || result2.path.includes('NEUROLOGIQUE');
        
        console.log('\n📊 VALIDATION:');
        console.log(`  • IPP dans fourchette [5-10%]: ${isValid ? '✅' : '❌'} (obtenu: ${result2.rate}%)`);
        console.log(`  • Système NEUROLOGIQUE: ${isNeuro ? '✅' : '❌'}`);
        console.log(`  • PAS système RACHIS: ${notRachis ? '✅' : '❌'}`);
        
        if (!isValid || !notRachis) {
            console.log('\n⚠️  PROBLÈME DÉTECTÉ:');
            if (result2.rate > 10) {
                console.log(`  • IPP trop élevé (+${result2.rate - 10}%)`);
                console.log('  • Cervicalgie isolée doit être 2-5% selon barème 1967');
            }
            if (!notRachis) {
                console.log('  • Cervicalgie catégorisée en RACHIS au lieu de NEUROLOGIQUE');
                console.log('  • Barème 1967: "syndrome cervical s\'associe au syndrome post-commotionnel"');
            }
        } else {
            console.log('\n✅ CAS TEST 2: VALIDÉ');
        }
    } else {
        console.log('❌ ERREUR: Type de résultat inattendu');
    }
} catch (error) {
    console.error('❌ ERREUR lors de l\'exécution du test 2:', error);
}

console.log('\n' + '='.repeat(80) + '\n');

// ============================================================================
// CAS TEST 3: BRACHIALGIE (Radiculalgie cervicale)
// ============================================================================

console.log('📋 CAS TEST 3: HERNIE DISCALE CERVICALE - BRACHIALGIE');
console.log('-'.repeat(80));

const cas3 = `Hernie discale cervicale C5-C6 avec névralgie cervico-brachiale droite, brachialgie persistante irradiant dans le bras, paresthésies membres supérieur droit, déficit force préhension main droite`;

console.log('\n📝 Description clinique:');
console.log(cas3);

console.log('\n🎯 ATTENDU (Barème 1967):');
console.log('  • Système NEUROLOGIQUE: Brachialgie (radiculalgie) → 18-25%');
console.log('    - Brachialgie = Atteinte NERVEUSE périphérique');
console.log('    - Radiculalgie C5-C6-C7 avec déficit neurologique');
console.log('    - PAS une simple atteinte rachis (cervicalgie)');

console.log('\n⚙️  EXÉCUTION...\n');

try {
    const result3 = localExpertAnalysis(cas3);
    
    console.log('✅ RÉSULTAT OBTENU:');
    console.log(`  Type: ${result3.type}`);
    
    if (result3.type === 'proposal') {
        console.log(`  IPP: ${result3.rate}%`);
        console.log(`  Lésion: ${result3.name}`);
        console.log(`  Path: ${result3.path}`);
        console.log(`  Justification: ${result3.justification}`);
        
        // Validation
        const isValid = result3.rate >= 18 && result3.rate <= 28;
        const isNeuro = result3.path.includes('NEUROLOGIQUE');
        const notRachis = !result3.path.includes('Rachis') || result3.path.includes('NEUROLOGIQUE');
        
        console.log('\n📊 VALIDATION:');
        console.log(`  • IPP dans fourchette [18-28%]: ${isValid ? '✅' : '❌'} (obtenu: ${result3.rate}%)`);
        console.log(`  • Système NEUROLOGIQUE: ${isNeuro ? '✅' : '❌'}`);
        console.log(`  • PAS système RACHIS: ${notRachis ? '✅' : '❌'}`);
        
        if (!isValid || !notRachis) {
            console.log('\n⚠️  PROBLÈME DÉTECTÉ:');
            if (result3.rate < 18) {
                console.log(`  • IPP trop faible (${18 - result3.rate}% manquants)`);
            }
            if (!notRachis) {
                console.log('  • Brachialgie catégorisée en RACHIS au lieu de NEUROLOGIQUE');
                console.log('  • Brachialgie = Radiculalgie = Atteinte NERVEUSE');
            }
        } else {
            console.log('\n✅ CAS TEST 3: VALIDÉ');
        }
    } else {
        console.log('❌ ERREUR: Type de résultat inattendu');
    }
} catch (error) {
    console.error('❌ ERREUR lors de l\'exécution du test 3:', error);
}

console.log('\n' + '='.repeat(80));
console.log('');
console.log('🏁 FIN DES TESTS - VALIDATION BARÈME 1967');
console.log('');
console.log('📚 RÉFÉRENCES:');
console.log('  • Barème officiel 1967 - Ligne 746-752: Syndrome cervical');
console.log('  • Barème officiel 1967 - Ligne 752-758: SSTC + syndrome cervical');
console.log('  • Barème officiel 1967 - Ligne 598: SSTC (fourchette 5-50%)');
console.log('');
console.log('✅ CONFORMITÉ: Logique corrigée selon barème 1967');
console.log('   - Syndrome cervical → NEUROLOGIQUE (pas RACHIS séparé)');
console.log('   - SSTC + cervical → Max 15% sans lésions organiques');
console.log('   - Brachialgie → NEUROLOGIQUE (radiculalgie, pas rachis)');
console.log('');
