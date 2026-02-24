// Test 10 cas : traumatismes viscéraux / abdominaux (V3.3.293)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Regex partiel sur le nom barème
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : Splénectomie totale post-traumatique
    input: "splénectomie totale pour rupture traumatique de la rate survenue lors d'un accident de la voie publique avec contusion abdominale violente et hémopéritoine massif opéré en urgence avec vaccination anti-pneumococcique réalisée et suivi hématologique régulier",
    expectedName: "spl[eé]nectomie|ablation.*rate|rate",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Splénectomie totale pour rupture de la rate"
  },
  {
    // Cas 2 : Néphrectomie unilatérale avec rein restant sain
    input: "néphrectomie gauche pour fracture du rein gauche avec éclatement du parenchyme rénal après chute d'une grande hauteur avec rein droit restant fonctionnel et fonction rénale conservée avec créatinine normale et clearance à 85 ml par minute et cicatrice lombaire gauche",
    expectedName: "n[eé]phrectomie|ablation.*rein|rein.*restant",
    expectedMinRate: 25,
    expectedMaxRate: 35,
    description: "Néphrectomie unilatérale avec rein restant sain"
  },
  {
    // Cas 3 : Contusion hépatique avec séquelles
    input: "séquelles de contusion hépatique droite grade III survenue lors d'un accident de la voie publique traitée par embolisation artérielle avec douleurs résiduelles de l'hypochondre droit chroniques et troubles digestifs à type de ballonnements et de dyspepsie post-prandiale et perturbation modérée du bilan hépatique avec gamma GT à 2 fois la normale",
    expectedName: "contusion.*h[eé]patique|h[eé]patique.*s[eé]quelles|foie",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Contusion hépatique avec douleurs et troubles digestifs"
  },
  {
    // Cas 4 : Cholécystectomie post-traumatique
    input: "cholécystectomie par cœlioscopie pour contusion de la vésicule biliaire avec cholécystite traumatique suite à un accident de travail avec impact abdominal direct avec troubles digestifs résiduels modérés à type de diarrhée post-prandiale occasionnelle et intolérance aux graisses",
    expectedName: "chol[eé]cystectomie|v[eé]sicule.*biliaire|ablation.*v[eé]sicule",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Cholécystectomie pour contusion vésiculaire"
  },
  {
    // Cas 5 : Gastrectomie partielle avec dumping syndrome
    input: "gastrectomie partielle des deux tiers pour perforation gastrique traumatique après accident de la voie publique avec impact abdominal sur le volant et dumping syndrome post-opératoire avec malaises après les repas et diarrhée post-prandiale et amaigrissement de 10 kilogrammes par rapport au poids antérieur à l'accident",
    expectedName: "gastrectomie|dumping|chirurgie.*gastrique|estomac",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Gastrectomie partielle avec dumping syndrome"
  },
  {
    // Cas 6 : Éventration post-opératoire après laparotomie
    input: "éventration abdominale sur cicatrice de laparotomie médiane réalisée en urgence pour hémopéritoine post-traumatique avec défect pariétal de 8 centimètres de diamètre non contenable par ceinture abdominale et gêne fonctionnelle importante à l'effort et impossibilité de soulever des charges et troubles du transit intestinal",
    expectedName: "[eé]ventration|hernie.*[eé]ventration|d[eé]fect.*pari[eé]tal|laparotomie",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Éventration post-laparotomie traumatique"
  },
  {
    // Cas 7 : Hépatectomie partielle post-traumatique  
    input: "hépatectomie droite partielle pour fracture hépatique grade IV avec hémopéritoine massif opéré en urgence après accident de la voie publique avec douleurs chroniques de l'hypochondre droit et perturbation du bilan hépatique avec transaminases à 3 fois la normale et stéatose hépatique résiduelle à l'échographie",
    expectedName: "h[eé]patectomie|r[eé]section.*h[eé]patique|foie",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Hépatectomie partielle post-traumatique"
  },
  {
    // Cas 8 : Pancréatite aiguë post-traumatique avec séquelles
    input: "séquelles de pancréatite aiguë post-traumatique suite à un traumatisme abdominal direct par le volant du véhicule avec nécrose partielle du corps du pancréas et pseudo-kyste résiduel de 3 centimètres et douleurs chroniques épigastriques et insuffisance pancréatique exocrine nécessitant une supplémentation enzymatique quotidienne et intolérance alimentaire",
    expectedName: "pancr[eé]at|s[eé]quelles.*pancr[eé]at",
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Séquelles de pancréatite aiguë post-traumatique"
  },
  {
    // Cas 9 : Colectomie partielle avec troubles du transit
    input: "hémicolectomie droite pour rupture traumatique du côlon ascendant après accident de la voie publique avec péritonite opérée en urgence et rétablissement de la continuité digestive après 3 mois de colostomie temporaire avec troubles du transit persistants à type de diarrhée chronique et douleurs abdominales intermittentes et amaigrissement de 5 kilogrammes",
    expectedName: "colectomie|h[eé]micolectomie|c[oô]lon|r[eé]section.*intestinal",
    expectedMinRate: 15,
    expectedMaxRate: 35,
    description: "Hémicolectomie droite post-traumatique"
  },
  {
    // Cas 10 : Fistule intestinale étroite post-traumatique
    input: "fistule intestinale étroite persistante après plaie pénétrante de l'abdomen par objet contondant lors d'un accident de travail avec trajet fistuleux ne livrant que de faibles quantités de liquide digestif et irritation cutanée péri-fistulaire chronique nécessitant des soins locaux quotidiens et retentissement sur l'état général avec amaigrissement modéré",
    expectedName: "fistule.*intestinal|fistule.*[eé]troite|fistule.*digest",
    expectedMinRate: 20,
    expectedMaxRate: 30,
    description: "Fistule intestinale étroite post-traumatique"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const result = localExpertAnalysis(tc.input, []);

    const nameRegex = new RegExp(tc.expectedName, 'i');
    let resultName = '';
    let resultRate = 0;
    let resultType = result.type;

    if (result.type === 'proposal') {
      resultName = result.name || (result as any).injury?.name || '';
      resultRate = typeof result.rate === 'number' ? result.rate : (Array.isArray(result.rate) ? Math.round(((result.rate as number[])[0] + (result.rate as number[])[1]) / 2) : 0);
    } else if (result.type === 'cumul_proposals') {
      const proposals = (result as any).proposals || [];
      if (proposals.length > 0) {
        resultName = proposals.map((p: any) => p.injury?.name || p.name || '').join(' + ');
        resultRate = proposals.reduce((sum: number, p: any) => {
          const r = p.injury?.rate;
          return sum + (typeof r === 'number' ? r : (Array.isArray(r) ? Math.round((r[0] + r[1]) / 2) : 0));
        }, 0);
      } else {
        resultName = 'AUCUN';
        resultRate = 0;
      }
    } else {
      resultName = (result as any).text || result.type || 'INCONNU';
      resultRate = 0;
    }

    const nameOk = nameRegex.test(resultName);
    const rateOk = resultRate >= tc.expectedMinRate && resultRate <= tc.expectedMaxRate;
    const ok = nameOk && rateOk;

    if (ok) passed++;
    else failed++;

    console.log(`─── Cas ${i + 1} ───`);
    console.log(`  Description: ${tc.description}`);
    console.log(`  Input     : "${tc.input.substring(0, 120)}..."`);
    console.log(`  Attendu   : ${tc.expectedName} (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
    console.log(`  Obtenu    : ${ok ? '✅' : '❌'} ${resultName}`);
    console.log(`  Taux      : ${resultRate}%`);
    console.log(`  Type      : ${resultType}`);
    console.log(`  Nom OK    : ${nameOk ? '✅' : '❌'} | Taux OK: ${rateOk ? '✅' : '❌'}`);
    if (result.type === 'proposal' && (result as any).path) {
      console.log(`  Path      : ${(result as any).path}`);
    }
    if (result.type === 'proposal' && result.justification) {
      console.log(`  Justif    : ${result.justification.substring(0, 200)}...`);
    }
    if (!ok) {
      console.log(`  ⚠️ ANOMALIE: ${!nameOk ? `Nom "${resultName}" ne matche pas "${tc.expectedName}"` : ''}${!nameOk && !rateOk ? ' + ' : ''}${!rateOk ? `Taux ${resultRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%` : ''}`);
    }
    console.log('');
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
