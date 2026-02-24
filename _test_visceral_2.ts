// Test 10 cas SUPPLÉMENTAIRES : traumatismes viscéraux / abdominaux (V3.3.294)
// Complète _test_visceral.ts avec 10 pathologies différentes
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
    // Cas 1 : Contusion rénale avec séquelles (sans néphrectomie)
    input: "contusion rénale droite grade II survenue lors d'un accident de la voie publique avec hématurie initiale résorbée et cicatrice parenchymateuse résiduelle objectivée à l'échographie et douleurs chroniques de la fosse rénale droite sans insuffisance rénale ni hypertension artérielle avec fonction rénale bilatérale conservée à la scintigraphie",
    expectedName: "contusion.*r[eé]nal|r[eé]nal.*cicatrice|rein",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Contusion rénale grade II avec cicatrice parenchymateuse"
  },
  {
    // Cas 2 : Résection intestinale grêle courte
    input: "résection de 40 centimètres d'intestin grêle jéjunal pour ischémie mésentérique post-traumatique après accident de la voie publique avec contusion abdominale et nécrose segmentaire du grêle avec troubles du transit à type de diarrhée post-prandiale et douleurs abdominales intermittentes et amaigrissement modéré de 4 kilogrammes",
    expectedName: "r[eé]section.*intestinal|gr[eê]le|intestin",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Résection intestinale grêle courte (<50cm)"
  },
  {
    // Cas 3 : Adhérences abdominales post-opératoires avec troubles du transit
    input: "adhérences abdominales post-opératoires multiples après deux laparotomies en urgence pour hémopéritoine post-traumatique avec épisodes subocclusifs récidivants nécessitant des hospitalisations itératives et troubles du transit chroniques à type d'alternance diarrhée et constipation et douleurs abdominales diffuses et ballonnements permanents invalidants",
    expectedName: "adh[eé]rence|transit|abd",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Adhérences abdominales avec troubles du transit"
  },
  {
    // Cas 4 : Hernie inguinale irréductible post-traumatique
    input: "hernie inguinale droite irréductible apparue suite à un traumatisme abdominal direct lors d'un accident de travail avec effort violent et augmentation brutale de la pression intra-abdominale avec tuméfaction inguinale douloureuse permanente non réductible et gêne à la marche et à l'effort physique",
    expectedName: "hernie.*inguinal|hernie.*irr[eé]ductible",
    expectedMinRate: 15,
    expectedMaxRate: 25,
    description: "Hernie inguinale irréductible post-traumatique"
  },
  {
    // Cas 5 : Fistule intestinale large bas située
    input: "fistule intestinale large bas située après plaie pénétrante de l'abdomen par arme blanche avec trajet fistuleux iléo-cutané livrant une quantité importante de matières digestives et irritation cutanée péri-fistulaire sévère nécessitant un appareillage permanent et retentissement majeur sur l'état général avec amaigrissement de 12 kilogrammes et troubles hydroélectrolytiques",
    expectedName: "fistule.*intestinal|fistule.*large|fistule.*bas",
    expectedMinRate: 40,
    expectedMaxRate: 70,
    description: "Fistule intestinale large bas située"
  },
  {
    // Cas 6 : Incontinence fécale post-traumatique
    input: "incontinence fécale post-traumatique par lésion du sphincter anal survenue suite à un traumatisme périnéal direct lors d'un accident de la voie publique avec déchirure périnéale et atteinte nerveuse pudendale avec fuites involontaires de selles liquides et gazeuses quotidiennes nécessitant le port de protections permanentes et retentissement social majeur avec limitation des activités",
    expectedName: "incontinence.*f[eé]cal|sphincter.*anal|incontin",
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "Incontinence fécale par lésion sphinctérienne"
  },
  {
    // Cas 7 : Sténose biliaire post-traumatique
    input: "sténose biliaire post-traumatique du cholédoque après contusion hépatique grade III traitée chirurgicalement avec ictère récidivant et épisodes d'angiocholite nécessitant des dilatations endoscopiques itératives et prothèse biliaire temporaire et douleurs de l'hypochondre droit et perturbation du bilan hépatique avec phosphatases alcalines et gamma GT élevées",
    expectedName: "st[eé]nose.*biliaire|biliaire|chol[eé]doque",
    expectedMinRate: 20,
    expectedMaxRate: 50,
    description: "Sténose biliaire post-traumatique"
  },
  {
    // Cas 8 : Névralgie pariétale post-chirurgicale
    input: "névralgie pariétale post-chirurgicale du nerf ilio-inguinal droit après laparotomie pour hémopéritoine post-traumatique avec douleurs neuropathiques chroniques de la paroi abdominale inférieure droite de type brûlure et allodynie et hypoesthésie cutanée et gêne fonctionnelle permanente à la marche et aux mouvements de flexion du tronc",
    expectedName: "n[eé]vralgie.*pari[eé]tal|nerf.*ilio|douleur.*pari[eé]tal",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Névralgie pariétale post-chirurgicale"
  },
  {
    // Cas 9 : Syndrome de l'intestin irritable post-traumatique
    input: "syndrome de l'intestin irritable post-traumatique diagnostiqué par gastro-entérologue après contusion abdominale lors d'un accident de la voie publique avec douleurs abdominales chroniques diffuses et ballonnements et alternance de diarrhée et de constipation et troubles fonctionnels digestifs invalidants avec retentissement sur la qualité de vie et régime alimentaire contraignant",
    expectedName: "intestin.*irritable|SII|syndrome.*intestin|colopath",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Syndrome de l'intestin irritable post-traumatique"
  },
  {
    // Cas 10 : Fistule biliaire post-contusion hépatique
    input: "fistule biliaire externe persistante après contusion hépatique grade IV avec écoulement bilieux cutané quotidien de 50 à 100 millilitres nécessitant un pansement quotidien et irritation cutanée péri-fistulaire et épisodes d'angiocholite récidivante et perturbation importante du bilan hépatique avec bilirubine élevée et amaigrissement progressif",
    expectedName: "fistule.*biliaire|fistule.*purulent|contusion.*foie|h[eé]pat",
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Fistule biliaire post-contusion hépatique"
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
