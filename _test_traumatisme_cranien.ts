import { localExpertAnalysis, LocalProposal, CumulProposals } from './components/AiAnalyzer';

// ═══════════════════════════════════════════════════════════════
// TEST : 10 cas de traumatisme crânien
// ═══════════════════════════════════════════════════════════════

interface TestCase {
  id: number;
  input: string;
  expectedLabel: string;
  expectedRate: string;
}

const testCases: TestCase[] = [
  {
    id: 1,
    input: "syndrome post-commotionnel avec céphalées et vertiges persistants après traumatisme crânien",
    expectedLabel: "Syndrome subjectif commun",
    expectedRate: "5-50"
  },
  {
    id: 2,
    input: "épilepsie post-traumatique avec crises convulsives généralisées fréquentes",
    expectedLabel: "Crises convulsives généralisées",
    expectedRate: "30-100"
  },
  {
    id: 3,
    input: "hémiplégie droite complète avec contracture suite à un traumatisme crânien grave",
    expectedLabel: "Hémiplégie complète",
    expectedRate: "70-80"
  },
  {
    id: 4,
    input: "brèche osseuse crânienne de 8 cm² avec battements duremériens",
    expectedLabel: "Brèche osseuse avec battements",
    expectedRate: "20-50"
  },
  {
    id: 5,
    input: "céphalées post-traumatiques chroniques invalidantes après accident de la route",
    expectedLabel: "Céphalées post-traumatiques",
    expectedRate: "5-20"
  },
  {
    id: 6,
    input: "déficits cognitifs post-traumatiques avec troubles de mémoire et attention après TC sévère",
    expectedLabel: "Déficits cognitifs",
    expectedRate: "10-40"
  },
  {
    id: 7,
    input: "syndrome cérébelleux bilatéral post-traumatique avec ataxie sévère",
    expectedLabel: "Syndrome Cérébelleux Bilatéral",
    expectedRate: "30-100"
  },
  {
    id: 8,
    input: "fistule de liquide céphalo-rachidien persistante avec rhinorrhée",
    expectedLabel: "Fistule de liquide céphalo-rachidien",
    expectedRate: "30-60"
  },
  {
    id: 9,
    input: "hydrocéphalie à pression normale post-traumatique avec troubles de la marche",
    expectedLabel: "Hydrocéphalie à pression normale",
    expectedRate: "40-80"
  },
  {
    id: 10,
    input: "commotion cérébrale avec syndrome dysexécutif séquellaire troubles de planification",
    expectedLabel: "Syndrome dysexécutif",
    expectedRate: "20-50"
  }
];

function formatRate(rate: number | [number, number]): string {
  if (Array.isArray(rate)) return `${rate[0]}-${rate[1]}%`;
  return `${rate}%`;
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('  TEST : 10 cas de traumatisme crânien');
console.log('═══════════════════════════════════════════════════════════════\n');

let passed = 0;
let failed = 0;

for (const tc of testCases) {
  const result = localExpertAnalysis(tc.input);

  console.log(`─── Cas ${tc.id} ───`);
  console.log(`  Input     : "${tc.input}"`);
  console.log(`  Attendu   : ${tc.expectedLabel} (${tc.expectedRate}%)`);

  if (result.type === 'proposal') {
    const p = result as LocalProposal;
    const rateStr = formatRate(p.injury.rate);
    passed++;
    console.log(`  Obtenu    : ✅ ${p.name}`);
    console.log(`  Taux      : ${rateStr}`);
    console.log(`  Path      : ${p.path}`);
  } else if (result.type === 'cumul_proposals') {
    const c = result as CumulProposals;
    passed++;
    console.log(`  Obtenu    : ✅ CUMUL (${c.lesionCount} lésions)`);
    for (const prop of c.proposals) {
      console.log(`            - ${prop.injury.name} → ${formatRate(prop.injury.rate)}`);
    }
  } else if (result.type === 'ambiguity') {
    passed++;
    const choices = (result as any).choices || [];
    console.log(`  Obtenu    : ⚠️ AMBIGUÏTÉ - ${choices.length} choix proposés`);
    for (const ch of choices.slice(0, 5)) {
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
