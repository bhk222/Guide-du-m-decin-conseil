// Test 10 cas d'accidents ophtalmologiques
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedLabel: string;
  expectedRate: string;
}

const testCases: TestCase[] = [
  {
    input: "cécité complète bilatérale post-traumatique après explosion",
    expectedLabel: "Cécité complète",
    expectedRate: "100%"
  },
  {
    input: "perte complète de la vision de l'oeil droit après traumatisme perforant, l'oeil gauche étant normal",
    expectedLabel: "Perte complète de la vision d'un oeil",
    expectedRate: "30%"
  },
  {
    input: "énucléation de l'oeil gauche avec mise en place d'une prothèse oculaire après accident de travail",
    expectedLabel: "Ablation ou altération du globe avec prothèse possible",
    expectedRate: "28-33%"
  },
  {
    input: "diplopie post-traumatique dans la partie inférieure du champ visuel après fracture du plancher de l'orbite",
    expectedLabel: "Diplopie dans la partie inférieure du champ",
    expectedRate: "10-25%"
  },
  {
    input: "hémianopsie homonyme gauche séquellaire d'un traumatisme crânien",
    expectedLabel: "Hémianopsie homonyme droite ou gauche",
    expectedRate: "30-35%"
  },
  {
    input: "glaucome post-traumatique de l'oeil droit avec altération du champ visuel malgré traitement",
    expectedLabel: "Glaucome post-traumatique",
    expectedRate: "10-40%"
  },
  {
    input: "ptosis traumatique de la paupière supérieure de l'oeil gauche après plaie palpébrale",
    expectedLabel: "Ptosis ou blépharospasme (un oeil)",
    expectedRate: "5-25%"
  },
  {
    input: "atrophie optique post-traumatique bilatérale avec acuité visuelle effondrée",
    expectedLabel: "Atrophie optique post-traumatique",
    expectedRate: "30-80%"
  },
  {
    input: "décollement de rétine post-traumatique de l'oeil droit avec baisse d'acuité visuelle séquellaire",
    expectedLabel: "Décollement de la rétine post-traumatique",
    expectedRate: "0-100%"
  },
  {
    input: "scotomes centraux bilatéraux séquellaires d'un traumatisme crânien avec contusion du nerf optique",
    expectedLabel: "Scotomes centraux (deux yeux)",
    expectedRate: "40-100%"
  }
];

async function runTests() {
  let found = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const result = localExpertAnalysis(tc.input);

    const isFound = result.type === 'proposal' || result.type === 'cumul_proposals';
    if (isFound) found++; else failed++;

    let obtenu = '❌ Non trouvé';
    let taux = 'N/A';
    let path = 'N/A';
    if (result.type === 'proposal') {
      obtenu = `✅ ${result.name}`;
      taux = typeof result.rate === 'number'
        ? `${result.rate}%`
        : Array.isArray(result.rate)
          ? `${result.rate[0]}-${result.rate[1]}%`
          : String(result.rate);
      path = result.path || 'N/A';
    } else if (result.type === 'cumul_proposals') {
      obtenu = `✅ [CUMUL] ${result.text?.substring(0, 80)}`;
      taux = 'cumul';
      path = 'cumul';
    } else if (result.type === 'ambiguity') {
      obtenu = `⚠️ [AMBIGUÏTÉ] ${result.text?.substring(0, 80)}`;
    } else if (result.type === 'no_result') {
      obtenu = `❌ ${result.text?.substring(0, 80)}`;
    }

    console.log(`─── Cas ${i + 1} ───`);
    console.log(`  Input     : "${tc.input}"`);
    console.log(`  Attendu   : ${tc.expectedLabel} (${tc.expectedRate})`);
    console.log(`  Obtenu    : ${obtenu}`);
    console.log(`  Taux      : ${taux}`);
    console.log(`  Path      : ${path}`);
    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${found}/10 trouvés | ${failed}/10 échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
