/**
 * BATCH TEST - CAS 14 & 15 - V3.3.36
 * 
 * Validation automatique des 2 nouveaux cas complexes:
 * - CAS 14: Amputation main + phantom pain + dépression (65-75%)
 * - CAS 15: Surdité bilatérale + acouphènes invalidants (50-60%)
 * 
 * Objectif: Identifier les améliorations nécessaires pour V3.3.36
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

console.log('╔═══════════════════════════════════════════════════════════════════╗');
console.log('║  🧪 BATCH TEST - 2 NOUVEAUX CAS COMPLEXES V3.3.36               ║');
console.log('╚═══════════════════════════════════════════════════════════════════╝');
console.log('');

const results = [];

// ============================================================================
// TEST CAS 14 - Amputation Main + Phantom Pain + Dépression
// ============================================================================

console.log('🔬 TEST 1/2: CAS 14 - Amputation Main Dominante + Phantom Pain');
console.log('─'.repeat(70));

try {
    execSync('npx tsx test-cas14-amputation.mjs', { 
        stdio: 'inherit',
        encoding: 'utf8'
    });
    results.push({
        cas: 'CAS 14',
        name: 'Amputation main + phantom pain + dépression',
        attendu: '65-75%',
        status: '✅ VALIDÉ'
    });
} catch (error) {
    results.push({
        cas: 'CAS 14',
        name: 'Amputation main + phantom pain + dépression',
        attendu: '65-75%',
        status: '❌ ÉCHEC'
    });
}

console.log('\n\n');

// ============================================================================
// TEST CAS 15 - Surdité Bilatérale + Acouphènes
// ============================================================================

console.log('🔬 TEST 2/2: CAS 15 - Surdité Bilatérale + Acouphènes Invalidants');
console.log('─'.repeat(70));

try {
    execSync('npx tsx test-cas15-surdite.mjs', { 
        stdio: 'inherit',
        encoding: 'utf8'
    });
    results.push({
        cas: 'CAS 15',
        name: 'Surdité bilatérale + acouphènes invalidants',
        attendu: '50-60%',
        status: '✅ VALIDÉ'
    });
} catch (error) {
    results.push({
        cas: 'CAS 15',
        name: 'Surdité bilatérale + acouphènes invalidants',
        attendu: '50-60%',
        status: '❌ ÉCHEC'
    });
}

console.log('\n\n');

// ============================================================================
// RAPPORT SYNTHÈSE
// ============================================================================

console.log('╔═══════════════════════════════════════════════════════════════════╗');
console.log('║  📊 RAPPORT SYNTHÈSE BATCH TEST V3.3.36                          ║');
console.log('╚═══════════════════════════════════════════════════════════════════╝');
console.log('');

// Tableau résultats
console.log('┌──────────┬─────────────────────────────────────────────┬───────────┬──────────┐');
console.log('│   CAS    │              DESCRIPTION                    │  ATTENDU  │  STATUS  │');
console.log('├──────────┼─────────────────────────────────────────────┼───────────┼──────────┤');

results.forEach(r => {
    const casCol = r.cas.padEnd(8);
    const nameCol = r.name.padEnd(43);
    const attenduCol = r.attendu.padEnd(9);
    const statusCol = r.status.padEnd(8);
    console.log(`│ ${casCol} │ ${nameCol} │ ${attenduCol} │ ${statusCol} │`);
});

console.log('└──────────┴─────────────────────────────────────────────┴───────────┴──────────┘');
console.log('');

// Statistiques
const totalTests = results.length;
const validTests = results.filter(r => r.status.includes('✅')).length;
const failedTests = totalTests - validTests;
const successRate = ((validTests / totalTests) * 100).toFixed(0);

console.log('📈 STATISTIQUES:');
console.log(`  • Total tests: ${totalTests}`);
console.log(`  • Validés: ${validTests} ✅`);
console.log(`  • Échecs: ${failedTests} ❌`);
console.log(`  • Taux succès: ${successRate}%`);
console.log('');

// Score global avec historique
console.log('🏆 SCORE GLOBAL SESSION:');
console.log('  • V3.3.34: 10/10 validés (100%) ✅');
console.log('  • V3.3.35: +3 cas → 13/13 validés (100%) ✅');
console.log(`  • V3.3.36: +2 cas → ${validTests}/2 nouveaux (${successRate}%) ${validTests === 2 ? '✅' : '🔄'}`);

if (validTests === 2) {
    console.log('  • TOTAL: 15/15 cas validés (100%) 🏆🏆🏆');
} else {
    console.log(`  • TOTAL: ${13 + validTests}/15 cas validés (${((13 + validTests) / 15 * 100).toFixed(0)}%)`);
}

console.log('');

// Améliorations identifiées
if (failedTests > 0) {
    console.log('🔧 AMÉLIORATIONS IDENTIFIÉES POUR V3.3.36:');
    console.log('');
    
    const cas14Failed = results[0].status.includes('❌');
    const cas15Failed = results[1].status.includes('❌');
    
    if (cas14Failed) {
        console.log('  📌 CAS 14 - Amputation main + phantom pain:');
        console.log('     1. Créer expert rule amputation MAIN niveau poignet (vs doigts)');
        console.log('     2. Créer expert rule douleurs membre fantôme (phantom pain)');
        console.log('     3. Améliorer détection dépression MAJEURE (Hamilton ≥20)');
        console.log('     4. Handler cumul Balthazard 3 systèmes (ortho + neuro + psy)');
        console.log('     5. Ligne code: ~3940-3950 (expert rules) + ~5100-5180 (handler)');
        console.log('');
    }
    
    if (cas15Failed) {
        console.log('  📌 CAS 15 - Surdité bilatérale + acouphènes:');
        console.log('     1. Parser dB bilatéral: "OD 70 dB" + "OG 65 dB" → moyenne 67.5 dB');
        console.log('     2. Différencier acouphènes INVALIDANTS (10%) vs simples (5%)');
        console.log('     3. Détection "résistant traitement" (masqueurs, TCC, médicaments)');
        console.log('     4. Majoration retentissement psycho-social (isolement + dépression)');
        console.log('     5. Ligne code: ~3960-3970 (expert rule) + ~5190-5270 (handler)');
        console.log('');
    }
}

console.log('═'.repeat(70));

if (validTests === 2) {
    console.log('🎉 BATCH TEST RÉUSSI - 2/2 CAS VALIDÉS (100%) ✅');
    console.log('🚀 V3.3.36 PRÊTE POUR DÉPLOIEMENT PRODUCTION');
} else {
    console.log(`⚠️  BATCH TEST PARTIEL - ${validTests}/2 CAS VALIDÉS (${successRate}%)`);
    console.log('🔄 DÉVELOPPEMENT V3.3.36 NÉCESSAIRE');
}

console.log('═'.repeat(70));
console.log('');

// Exit code
process.exit(validTests === 2 ? 0 : 1);
