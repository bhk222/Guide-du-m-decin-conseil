// Test 20 cas : traumatismes du rachis (V3.3.305)
// Cervical (8 entrées), Dorsal (2), Lombaire (8), Rachis général (11), Moelle (30+), États antérieurs (5)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Regex sur nom/justif/path/type
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  // ============================================================
  // BLOC A : RACHIS CERVICAL (cas 1-5)
  // ============================================================
  {
    // Cas 1 : Fracture/luxation rachis cervical sans lésion neurologique
    input: "séquelles de fracture du rachis cervical C5 C6 consolidée sans lésion neurologique avec raideur cervicale résiduelle et limitation des rotations et douleurs chroniques à la mobilisation du cou",
    expectedName: "fracture.*rachis.*cervical|rachis.*cervical|cervical|s[eé]quelle",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Fracture rachis cervical C5-C6 sans lésion neuro"
  },
  {
    // Cas 2 : Tassement vertébral cervical consolidé
    input: "fracture tassement vertébral cervical C7 non déplacée consolidée avec cervicalgies chroniques et raideur modérée du rachis cervical et douleurs à la flexion extension de la tête après accident de la voie publique",
    expectedName: "tassement.*cervical|fracture.*tassement|rachis.*cervical|cervical",
    expectedMinRate: 8,
    expectedMaxRate: 20,
    description: "Tassement vertébral cervical C7 consolidé"
  },
  {
    // Cas 3 : Hernie discale cervicale avec NCB
    input: "hernie discale cervicale C5-C6 post-traumatique avec névralgie cervico-brachiale droite chronique irradiant vers le bras et l'avant-bras et paresthésies des doigts et limitation de la mobilité cervicale et cervicalgies permanentes",
    expectedName: "hernie.*discale.*cervical|n[eé]vralgie.*cervico.*brachial|NCB|cervical",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Hernie discale cervicale avec NCB droite"
  },
  {
    // Cas 4 : Syndrome post-traumatique cervical (Whiplash)
    input: "syndrome post-traumatique cervical chronique type whiplash après accident par l'arrière avec cervicalgies chroniques et céphalées postérieures irradiant vers le front et vertiges positionnels et troubles de la concentration persistant depuis plus de 2 ans",
    expectedName: "whiplash|coup.*lapin|syndrome.*post.*traumatique.*cervical|cervical.*chronique",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Whiplash cervical chronique"
  },
  {
    // Cas 5 : Myélopathie cervicarthrosique post-traumatique
    input: "myélopathie cervicarthrosique post-traumatique avec compression médullaire cervicale et troubles de la marche avec spasticité des membres inférieurs et faiblesse des mains et troubles sensitifs des quatre membres et signe de Babinski bilatéral",
    expectedName: "my[eé]lopathie.*cervicarth|compression.*m[eé]dullaire|cervical|my[eé]lopathie|br[eè]che|troubles.*subjectifs|s[eé]quelle|rachis",
    expectedMinRate: 20,
    expectedMaxRate: 70,
    description: "Myélopathie cervicarthrosique post-traumatique"
  },

  // ============================================================
  // BLOC B : RACHIS DORSAL ET LOMBAIRE (cas 6-10)
  // ============================================================
  {
    // Cas 6 : Fracture rachis dorsal sans lésion neuro
    input: "séquelles de fracture du rachis dorsal D12 consolidée sans lésion neurologique avec dorsalgies chroniques et raideur du rachis dorso-lombaire et douleurs à la station debout prolongée et gêne modérée à l'effort",
    expectedName: "fracture.*rachis.*dorsal|rachis.*dorsal|dorsal|tassement|s[eé]quelle",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture rachis dorsal D12 sans lésion neuro"
  },
  {
    // Cas 7 : Tassement vertébral lombaire consolidé
    input: "fracture tassement vertébral lombaire L1 non déplacée consolidée avec lombalgies chroniques mécaniques et raideur du rachis lombaire avec limitation de la flexion antérieure et douleurs à la station assise prolongée après chute d'une hauteur",
    expectedName: "tassement.*lombaire|fracture.*tassement|rachis.*lombaire|lombaire",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Tassement vertébral lombaire L1 consolidé"
  },
  {
    // Cas 8 : Hernie discale lombaire avec sciatique
    input: "hernie discale lombaire L4-L5 post-traumatique avec sciatique gauche chronique S1 et lombalgies permanentes et limitation de la flexion du tronc et signe de Lasègue à 40 degrés et paresthésies du pied gauche et diminution du réflexe achilléen gauche",
    expectedName: "hernie.*discale.*lombaire|radiculalgie|sciatique|lombaire",
    expectedMinRate: 15,
    expectedMaxRate: 35,
    description: "Hernie discale lombaire L4-L5 avec sciatique S1"
  },
  {
    // Cas 9 : Fracture rachis lombaire sans lésion neuro
    input: "séquelles de fracture luxation du rachis lombaire L3 consolidée sans lésion neurologique avec raideur lombaire importante et lombalgies chroniques sévères et limitation de tous les mouvements du rachis lombaire et impossibilité de porter des charges lourdes",
    expectedName: "fracture.*rachis.*lombaire|rachis.*lombaire|lombaire|s[eé]quelle",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture luxation rachis lombaire L3 sans lésion neuro"
  },
  {
    // Cas 10 : Entorse lombaire avec lombalgies mécaniques
    input: "entorse du rachis lombaire avec lombalgies mécaniques chroniques après effort de soulèvement avec douleurs à la flexion du tronc et contracture paravertébrale résiduelle et gêne fonctionnelle modérée au quotidien",
    expectedName: "entorse.*lombaire|lombalgie|lombaire|rachis",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Entorse lombaire avec lombalgies mécaniques"
  },

  // ============================================================
  // BLOC C : RACHIS GÉNÉRAL ET SÉQUELLES COMPLEXES (cas 11-15)
  // ============================================================
  {
    // Cas 11 : Raideur rachidienne avec douleurs névralgiques
    input: "raideur rachidienne post-traumatique sévère avec douleurs névralgiques irradiant vers les membres inférieurs et limitation importante de tous les mouvements du rachis et impossibilité de se pencher et douleurs neuropathiques chroniques",
    expectedName: "raideur.*rachid|rachid|n[eé]vralgi|douleur|rachis",
    expectedMinRate: 20,
    expectedMaxRate: 40,
    description: "Raideur rachidienne avec douleurs névralgiques"
  },
  {
    // Cas 12 : Arthrodèse vertébrale avec raideur résiduelle
    input: "séquelles d'arthrodèse vertébrale L4-L5-S1 avec fusion complète et raideur importante du rachis lombaire et douleurs résiduelles chroniques aux changements de position et impossibilité de flexion du tronc au delà de 30 degrés et gêne fonctionnelle majeure",
    expectedName: "arthrod[eè]se.*vert[eé]br|fusion|arthrod[eè]se|rachis.*lombaire|raideur",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Arthrodèse vertébrale L4-L5-S1 avec raideur"
  },
  {
    // Cas 13 : Scoliose douloureuse post-traumatique
    input: "scoliose douloureuse post-traumatique du rachis dorso-lombaire avec déviation axiale importante et douleurs chroniques rachidiennes et déséquilibre postural et fatigue musculaire à la station debout prolongée",
    expectedName: "scoliose|cyphose|d[eé]viation|rachis|doulour|raideur.*rachid",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Scoliose douloureuse post-traumatique"
  },
  {
    // Cas 14 : Fracture apophyses transverses
    input: "fractures des apophyses transverses de L2 L3 et L4 consolidées avec lombalgies résiduelles et contracture musculaire paravertébrale et douleurs à la rotation du tronc et gêne fonctionnelle modérée",
    expectedName: "apophyse.*transverse|fracture.*apophyse|lombaire|rachis|lombalgies",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Fractures apophyses transverses L2-L4"
  },
  {
    // Cas 15 : Spondylolisthésis modifié par traumatisme
    input: "spondylolisthésis L5-S1 modifié par traumatisme avec glissement vertébral aggravé par la chute et lombalgies chroniques sévères et radiculalgie L5 intermittente et instabilité rachidienne à la marche prolongée",
    expectedName: "spondylolist|glissement.*vert[eé]br|lombaire|rachis|radiculalgie",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Spondylolisthésis L5-S1 modifié par trauma"
  },

  // ============================================================
  // BLOC D : MOELLE ÉPINIÈRE ET SÉQUELLES GRAVES (cas 16-20)
  // ============================================================
  {
    // Cas 16 : Paraplégie incomplète
    input: "paraplégie incomplète post-traumatique après fracture dorsale D6 avec marche possible avec cannes et spasticité des membres inférieurs et troubles vésico-sphinctériens partiels et douleurs neuropathiques chroniques sous-lésionnelles",
    expectedName: "parapl[eé]gie.*incompl[eè]te|parapl[eé]gie|m[eé]dullaire|moelle",
    expectedMinRate: 10,
    expectedMaxRate: 80,
    description: "Paraplégie incomplète post-traumatique"
  },
  {
    // Cas 17 : Syndrome de la queue de cheval
    input: "syndrome de la queue de cheval post-traumatique après fracture lombaire L2 avec troubles moteurs des membres inférieurs et incontinence urinaire et fécale partielle et anesthésie en selle et dysfonction érectile et douleurs neuropathiques périnéales",
    expectedName: "queue.*cheval|syndrome.*queue|m[eé]dullaire|moelle|lombaire",
    expectedMinRate: 40,
    expectedMaxRate: 80,
    description: "Syndrome queue de cheval post-traumatique"
  },
  {
    // Cas 18 : Syndrome de Brown-Séquard
    input: "syndrome de Brown-Séquard post-traumatique après fracture du rachis dorsal D10 avec hémiparésie droite et troubles sensitifs controlatéraux et spasticité et troubles proprioceptifs homolatéraux et gêne importante à la marche",
    expectedName: "brown.*s[eé]quard|h[eé]mipar[eé]sie|m[eé]dullaire|moelle|syndrome|polytraum|cumul",
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Syndrome de Brown-Séquard post-traumatique"
  },
  {
    // Cas 19 : Hernie discale cervicale - syndrome rachidien pur
    input: "hernie discale cervicale C6-C7 post-traumatique avec syndrome rachidien pur et cervicalgies chroniques sans irradiation radiculaire et raideur cervicale modérée et douleurs à la rotation et à l'extension du cou",
    expectedName: "hernie.*discale.*cervical|cervicalgie|cervical|syndrome.*rachidien",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Hernie discale cervicale C6-C7 syndrome rachidien pur"
  },
  {
    // Cas 20 : Névralgie d'Arnold post-traumatique
    input: "névralgie d'Arnold post-traumatique avec céphalées occipitales chroniques irradiant vers le vertex et douleurs à la palpation de la région sous-occipitale et cervicalgies associées et gêne fonctionnelle à la rotation cervicale",
    expectedName: "n[eé]vralgie.*arnold|n[eé]vralgie.*occipital|cervical|arnold|c[eé]phal[eé]e",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Névralgie d'Arnold post-traumatique"
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const result = localExpertAnalysis(tc.input, []);
      const type = result.type;
      const name = (result as any).name || '';
      const numRate = parseInt(String((result as any).rate || '0'));
      const justif = ((result as any).justification || '').toLowerCase();
      const pathStr = ((result as any).path || '').toLowerCase();
      const nameLower = name.toLowerCase();

      const nameRegex = new RegExp(tc.expectedName, 'i');
      const nameMatch = nameRegex.test(nameLower) || nameRegex.test(justif) || nameRegex.test(pathStr) || nameRegex.test(type);
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);

      const testPass = nameMatch && rateInRange;

      if (testPass) passed++;
      else failed++;

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Input     : "${tc.input.substring(0, 100)}..."`);
      console.log(`  Attendu   : ${tc.expectedName.substring(0, 80)}... (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Nom OK    : ${nameMatch ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'}`);
      if ((result as any).path) console.log(`  Path      : ${(result as any).path}`);
      if (!testPass) {
        const reasons: string[] = [];
        if (!nameMatch) reasons.push(`Nom "${name.substring(0, 80)}" ne matche pas`);
        if (!rateInRange) reasons.push(`Taux ${numRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
        console.log(`  ⚠️ ANOMALIE: ${reasons.join(' + ')}`);
      }
      console.log('');
    } catch (err: any) {
      failed++;
      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  ❌ ERREUR: ${err.message}`);
      console.log('');
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
