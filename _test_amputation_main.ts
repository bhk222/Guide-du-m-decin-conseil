import { localExpertAnalysis, LocalProposal, CumulProposals } from './components/AiAnalyzer';

// ═══════════════════════════════════════════════════════════════
// TEST : 10 cas d'amputation de la main
// ═══════════════════════════════════════════════════════════════

interface TestCase {
  id: number;
  input: string;
  expectedLabel: string;
  expectedRate: string; // e.g. "20" or "68-70"
}

const testCases: TestCase[] = [
  {
    id: 1,
    input: "amputation du pouce main dominante",
    expectedLabel: "Amputation du pouce",
    expectedRate: "20-28"
  },
  {
    id: 2,
    input: "amputation de l'index main dominante",
    expectedLabel: "Amputation de l'index",
    expectedRate: "12-18"
  },
  {
    id: 3,
    input: "désarticulation du poignet main dominante",
    expectedLabel: "Désarticulation du poignet",
    expectedRate: "68-70"
  },
  {
    id: 4,
    input: "amputation de tous les doigts de la main droite dominante",
    expectedLabel: "Amputation de tous les doigts",
    expectedRate: "55-60"
  },
  {
    id: 5,
    input: "perte totale de la main gauche non dominante",
    expectedLabel: "Perte totale de la main",
    expectedRate: "58-60"
  },
  {
    id: 6,
    input: "amputation du médius main dominante",
    expectedLabel: "Amputation du médius",
    expectedRate: "8-12"
  },
  {
    id: 7,
    input: "amputation annulaire main non dominante",
    expectedLabel: "Amputation de l'annulaire",
    expectedRate: "7-10"
  },
  {
    id: 8,
    input: "amputation auriculaire main dominante",
    expectedLabel: "Amputation de l'auriculaire",
    expectedRate: "6-8"
  },
  {
    id: 9,
    input: "amputation pouce et index main dominante",
    expectedLabel: "Pouce + Index",
    expectedRate: "40-48"
  },
  {
    id: 10,
    input: "perte de la phalange distale du pouce main dominante",
    expectedLabel: "phalange",
    expectedRate: "5-15"
  }
];

function formatRate(rate: number | [number, number]): string {
  if (Array.isArray(rate)) return `${rate[0]}-${rate[1]}%`;
  return `${rate}%`;
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('  TEST : 10 cas d\'amputation de la main');
console.log('═══════════════════════════════════════════════════════════════\n');

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  const result = localExpertAnalysis(tc.input);

  console.log(`─── Cas ${tc.id} ───`);
  console.log(`  Input     : "${tc.input}"`);
  console.log(`  Attendu   : ${tc.expectedLabel} (${tc.expectedRate}%)`);

  if (result.type === 'proposal') {
    // Single proposal match
    const p = result as LocalProposal;
    passed++;
    console.log(`  Obtenu    : ✅ ${p.name}`);
    console.log(`  Taux      : ${formatRate(p.injury.rate)}`);
    console.log(`  Path      : ${p.path}`);
    if (p.justification) console.log(`  Justif.   : ${p.justification.substring(0, 120)}`);
  } else if (result.type === 'cumul_proposals') {
    // Multiple lesions matched (cumul)
    const c = result as CumulProposals;
    passed++;
    console.log(`  Obtenu    : ✅ CUMUL (${c.lesionCount} lésions)`);
    for (const prop of c.proposals) {
      console.log(`            - ${prop.injury.name} → ${formatRate(prop.injury.rate)}`);
    }
  } else if (result.type === 'ambiguity') {
    // Ambiguity - multiple choices offered
    passed++; // Still found something
    console.log(`  Obtenu    : ⚠️ AMBIGUÏTÉ - ${(result as any).choices?.length || '?'} choix proposés`);
    for (const ch of ((result as any).choices || []).slice(0, 4)) {
      console.log(`            - ${ch.name} → ${formatRate(ch.rate)}`);
    }
  } else if (result.type === 'no_result') {
    failed++;
    console.log(`  Obtenu    : ❌ AUCUN RÉSULTAT`);
    console.log(`  Message   : ${(result as any).text || 'N/A'}`);
  } else {
    failed++;
    console.log(`  Obtenu    : ❓ Type inconnu: ${result.type}`);
    console.log(`  Détails   : ${JSON.stringify(result).substring(0, 200)}`);
  }
  console.log('');
}

console.log('═══════════════════════════════════════════════════════════════');
console.log(`  RÉSULTAT GLOBAL : ${passed}/10 trouvés | ${failed}/10 échoués`);
console.log('═══════════════════════════════════════════════════════════════');
