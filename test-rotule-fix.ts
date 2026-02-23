/**
 * Test rapide - Vérification fix "fracture de la rotule"
 * Usage: npx tsx test-rotule-fix.ts
 */

import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const testCases = [
  {
    input: "fracture de la rotule traitée chirurgicalement",
    expectedMatch: /rotule|patell/i,
    expectedNotMatch: /scapho|poignet|carpien/i,
    description: "Fracture rotule → doit matcher genou, PAS poignet"
  },
  {
    input: "arthrose femoro patellaire",
    expectedMatch: /fémoro.patellaire|fémoro.tibiale/i,
    expectedNotMatch: /scapho|poignet|carpien/i,
    description: "Arthrose fémoro-patellaire → doit matcher genou"
  },
  {
    input: "gonarthrose",
    expectedMatch: /fémoro.patellaire|fémoro.tibiale|arthrose/i,
    expectedNotMatch: /scapho|poignet|carpien/i,
    description: "Gonarthrose → doit matcher arthrose genou"
  },
  {
    input: "syndrome algodystrophique de la rotule",
    expectedMatch: /algodystrophie|SDRC|membre inf/i,
    expectedNotMatch: /membre sup|poignet|main/i,
    description: "Algodystrophie rotule → doit matcher SDRC membre inférieur"
  },
  {
    input: "fracture du scaphoïde",
    expectedMatch: /scapho/i,
    expectedNotMatch: /rotule|genou/i,
    description: "Fracture scaphoïde → doit rester poignet (pas de régression)"
  }
];

console.log('\n🧪 TEST FIX "FRACTURE DE LA ROTULE"\n');
console.log('═'.repeat(70));

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  console.log(`\n📋 ${tc.description}`);
  console.log(`   Input: "${tc.input}"`);

  const result = comprehensiveSingleLesionAnalysis(tc.input);

  let resultName = '';
  let resultPath = '';

  if (result.type === 'proposal') {
    resultName = result.injury.name;
    resultPath = result.path;
  } else if (result.type === 'ambiguity') {
    resultName = result.choices.map(c => c.name).join(' | ');
    resultPath = result.text;
  } else if (result.type === 'cumul_proposals') {
    resultName = result.proposals.map(p => p.injury.name).join(' | ');
  } else {
    resultName = 'NO RESULT';
  }

  console.log(`   Type: ${result.type}`);
  console.log(`   Résultat: ${resultName}`);
  if (resultPath) console.log(`   Path: ${resultPath}`);

  const matchOK = tc.expectedMatch.test(resultName);
  const notMatchOK = !tc.expectedNotMatch.test(resultName);

  if (matchOK && notMatchOK) {
    console.log(`   ✅ PASS`);
    passed++;
  } else {
    if (!matchOK) console.log(`   ❌ FAIL - Devrait matcher: ${tc.expectedMatch}`);
    if (!notMatchOK) console.log(`   ❌ FAIL - Ne devrait PAS matcher: ${tc.expectedNotMatch}`);
    failed++;
  }
}

console.log('\n' + '═'.repeat(70));
console.log(`\n📊 Résultats: ${passed}/${passed + failed} tests passés`);
if (failed > 0) {
  console.log(`❌ ${failed} test(s) échoué(s)\n`);
  process.exit(1);
} else {
  console.log(`✅ Tous les tests passent!\n`);
}
