// Script d'exécution batch - 3 nouveaux cas complexes
// Exécute les 3 tests et génère un rapport de synthèse

import { execSync } from 'child_process';

console.log('\n' + '='.repeat(80));
console.log('🧪 BATCH TEST - 3 NOUVEAUX CAS COMPLEXES');
console.log('='.repeat(80));
console.log('\nObjectif: Identifier les améliorations nécessaires pour l\'IA');
console.log('Version actuelle: V3.3.34 (10/10 cas validés)\n');

const tests = [
    {
        id: 11,
        name: 'Fracture tibia ouverte + infection',
        file: 'test-cas11-complexe.mjs',
        attendu: '40-50%'
    },
    {
        id: 12,
        name: 'SDRC (Algodystrophie)',
        file: 'test-cas12-sdrc.mjs',
        attendu: '30-40%'
    },
    {
        id: 13,
        name: 'TC grave séquelles multiples',
        file: 'test-cas13-tc.mjs',
        attendu: '50-70%'
    }
];

const results = [];

for (const test of tests) {
    console.log('='.repeat(80));
    console.log(`🔬 TEST CAS ${test.id}: ${test.name}`);
    console.log(`   IPP attendu: ${test.attendu}`);
    console.log('='.repeat(80));
    
    try {
        const output = execSync(`npx tsx ${test.file}`, { encoding: 'utf-8' });
        console.log(output);
        
        // Parser le résultat
        const ippMatch = output.match(/Taux IPP: (\d+)%/);
        const statutMatch = output.match(/STATUT: (.*)/);
        
        results.push({
            cas: test.id,
            name: test.name,
            ipp: ippMatch ? parseInt(ippMatch[1]) : 0,
            attendu: test.attendu,
            statut: statutMatch ? statutMatch[1] : '❌ ERREUR'
        });
    } catch (error) {
        console.error(`❌ ERREUR lors du test CAS ${test.id}:`, error.message);
        results.push({
            cas: test.id,
            name: test.name,
            ipp: 0,
            attendu: test.attendu,
            statut: '❌ ERREUR EXÉCUTION'
        });
    }
    
    console.log('\n');
}

// Rapport de synthèse
console.log('\n' + '='.repeat(80));
console.log('📊 RAPPORT DE SYNTHÈSE - 3 NOUVEAUX CAS COMPLEXES');
console.log('='.repeat(80));

console.log('\n| CAS | Lésion | IPP | Attendu | Statut |');
console.log('|-----|--------|-----|---------|--------|');
results.forEach(r => {
    console.log(`| ${r.cas} | ${r.name.padEnd(30)} | ${r.ipp}% | ${r.attendu.padEnd(7)} | ${r.statut} |`);
});

const validés = results.filter(r => r.statut.includes('✅')).length;
const total = results.length;

console.log('\n' + '='.repeat(80));
console.log(`RÉSULTAT FINAL: ${validés}/${total} cas validés (${Math.round(validés/total*100)}%)`);
console.log('='.repeat(80));

if (validés === total) {
    console.log('\n🎉 EXCELLENT ! L\'IA gère déjà tous les cas complexes !');
} else {
    console.log('\n💡 PISTES D\'AMÉLIORATION IDENTIFIÉES:');
    results.forEach(r => {
        if (!r.statut.includes('✅')) {
            console.log(`   - CAS ${r.cas}: ${r.name}`);
        }
    });
    console.log('\nConsultez les rapports détaillés ci-dessus pour les corrections à apporter.');
}

console.log('\n');
