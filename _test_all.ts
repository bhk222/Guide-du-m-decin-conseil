#!/usr/bin/env npx tsx
// ═══════════════════════════════════════════════════════════════
// TEST RUNNER UNIFIÉ — V3.3.300
// Exécute les 18 suites de tests (258 cas) en séquence
// Usage: npx tsx _test_all.ts
// ═══════════════════════════════════════════════════════════════

import { execSync } from 'child_process';

interface SuiteResult {
  name: string;
  passed: number;
  total: number;
  duration: number;
  error?: string;
}

const suites = [
  { file: '_test_amputation_main.ts', expected: 10 },
  { file: '_test_bassin_rachis.ts', expected: 10 },
  { file: '_test_jambe_cheville.ts', expected: 10 },
  { file: '_test_jambe.ts', expected: 10 },
  { file: '_test_genou_femur.ts', expected: 8 },
  { file: '_test_traumatisme_cranien.ts', expected: 10 },
  { file: '_test_ophtalmo.ts', expected: 10 },
  { file: '_test_ophtalmo_facial.ts', expected: 10 },
  { file: '_test_membres_inferieurs.ts', expected: 10 },
  { file: '_test_polytraumatismes.ts', expected: 10 },
  { file: '_test_polytrauma_4sieges.ts', expected: 20 },
  { file: '_test_thorax.ts', expected: 10 },
  { file: '_test_visceral.ts', expected: 10 },
  { file: '_test_visceral_2.ts', expected: 10 },
  { file: '_test_thorax_rachis.ts', expected: 10 },
  { file: '_test_jambe_genou_cuisse.ts', expected: 30 },
  { file: '_test_polytrauma_MI_complexe.ts', expected: 30 },
  { file: '_test_membre_superieur.ts', expected: 40 },
  { file: '_test_amputation_MS.ts', expected: 30 },
];

const totalExpected = suites.reduce((s, t) => s + t.expected, 0);
const results: SuiteResult[] = [];

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log(`║  TEST RUNNER UNIFIÉ — ${suites.length} suites, ${totalExpected} cas attendus             ║`);
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

const globalStart = Date.now();

for (const suite of suites) {
  const start = Date.now();
  try {
    const output = execSync(`npx tsx ${suite.file} 2>&1`, {
      encoding: 'utf-8',
      timeout: 120_000,
      cwd: process.cwd(),
    });

    // Parse RÉSULTAT GLOBAL line: "RÉSULTAT GLOBAL : 10/10 trouvés | 0/10 échoués"
    const match = output.match(/R[ÉE]SULTAT GLOBAL\s*:?\s*(\d+)\/(\d+)\s*trouv/i);
    if (match) {
      const passed = parseInt(match[1]);
      const total = parseInt(match[2]);
      results.push({ name: suite.file, passed, total, duration: Date.now() - start });
      const icon = passed === total ? '✅' : '❌';
      console.log(`  ${icon} ${suite.file.padEnd(38)} ${String(passed).padStart(3)}/${String(total).padStart(3)}  (${Date.now() - start}ms)`);
    } else {
      // Couldn't parse, mark as error
      results.push({ name: suite.file, passed: 0, total: suite.expected, duration: Date.now() - start, error: 'Parse error' });
      console.log(`  ⚠️ ${suite.file.padEnd(38)} Parse error — could not read result`);
    }
  } catch (err: any) {
    results.push({ name: suite.file, passed: 0, total: suite.expected, duration: Date.now() - start, error: err.message?.substring(0, 100) });
    console.log(`  ❌ ${suite.file.padEnd(38)} CRASH — ${err.message?.substring(0, 80)}`);
  }
}

const totalPassed = results.reduce((s, r) => s + r.passed, 0);
const totalTests = results.reduce((s, r) => s + r.total, 0);
const totalFailed = totalTests - totalPassed;
const totalDuration = Date.now() - globalStart;
const failedSuites = results.filter(r => r.passed !== r.total);

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
if (totalFailed === 0) {
  console.log(`║  ✅ TOUS LES TESTS PASSENT : ${totalPassed}/${totalTests} (${suites.length} suites)             ║`);
} else {
  console.log(`║  ❌ ÉCHECS : ${totalPassed}/${totalTests} passés, ${totalFailed} échoués                    ║`);
}
console.log(`║  Durée totale : ${(totalDuration / 1000).toFixed(1)}s                                     ║`);
console.log('╚═══════════════════════════════════════════════════════════════╝');

if (failedSuites.length > 0) {
  console.log('\n⚠️ Suites en échec :');
  for (const f of failedSuites) {
    console.log(`   - ${f.name}: ${f.passed}/${f.total}${f.error ? ` (${f.error})` : ''}`);
  }
  process.exit(1);
} else {
  process.exit(0);
}
