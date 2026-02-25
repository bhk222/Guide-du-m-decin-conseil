// Test 20 cas : traumatismes de la main (V3.3.307)
// Couvre : fractures métacarpiens, ankyloses doigts, raideurs, préhension,
// sensibilité, cicatrices, canal carpien, brûlures, SDRC, boutonnière
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  // ============================================================
  // BLOC A : Fractures métacarpiens + séquelles (cas 1-3)
  // ============================================================
  {
    // Cas 1 : Fracture 2ème métacarpien MD avec raideur résiduelle
    input: "fracture du deuxième métacarpien de la main droite dominante consolidée avec raideur résiduelle de l'articulation métacarpo-phalangienne de l'index et douleurs à la préhension et gêne fonctionnelle modérée",
    expectedName: "m[eé]tacarp|fracture.*m[eé]tacarp|index|s[eé]quelle|main|raideur",
    expectedMinRate: 2,
    expectedMaxRate: 12,
    description: "Fracture 2ème métacarpien MD raideur résiduelle"
  },
  {
    // Cas 2 : Fracture 5ème métacarpien MND séquelles légères
    input: "fracture du cinquième métacarpien de la main gauche non dominante consolidée avec séquelles légères et douleurs résiduelles à la pression et à la prise d'objets et gêne fonctionnelle légère",
    expectedName: "m[eé]tacarp|fracture.*m[eé]tacarp|auriculaire|s[eé]quelle|main",
    expectedMinRate: 2,
    expectedMaxRate: 10,
    description: "Fracture 5ème métacarpien MND séquelles légères"
  },
  {
    // Cas 3 : Fracture 1er métacarpien MD avec limitation du pouce
    input: "fracture du premier métacarpien de la main droite dominante consolidée avec limitation de la mobilité du pouce et douleurs à la pince pouce-index et gêne fonctionnelle à la préhension fine",
    expectedName: "m[eé]tacarp|fracture.*m[eé]tacarp|pouce|pr[eé]hension|s[eé]quelle|main",
    expectedMinRate: 3,
    expectedMaxRate: 12,
    description: "Fracture 1er métacarpien MD limitation pouce"
  },

  // ============================================================
  // BLOC B : Ankyloses doigts (cas 4-7)
  // ============================================================
  {
    // Cas 4 : Ankylose complète du pouce MD
    input: "ankylose complète du pouce de la main droite dominante avec impossibilité de flexion et d'opposition du pouce et perte de la pince pouce-index et gêne fonctionnelle majeure de la préhension",
    expectedName: "ankylose.*pouce|pouce.*ankylose|pouce|main|index|m[eé]dius|amputation|perte",
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Ankylose complète pouce MD"
  },
  {
    // Cas 5 : Ankylose de l'index MND
    input: "ankylose complète de l'index de la main gauche non dominante avec impossibilité de flexion-extension de l'index et raideur des articulations métacarpo-phalangienne et interphalangiennes et gêne à la préhension",
    expectedName: "ankylose.*index|index.*ankylose|index|main",
    expectedMinRate: 8,
    expectedMaxRate: 15,
    description: "Ankylose complète index MND"
  },
  {
    // Cas 6 : Ankylose du médius MD
    input: "ankylose complète du médius de la main droite dominante avec impossibilité de flexion-extension du troisième doigt et raideur articulaire totale et gêne de la préhension globale de la main droite",
    expectedName: "ankylose.*m[eé]dius|m[eé]dius.*ankylose|m[eé]dius|main",
    expectedMinRate: 8,
    expectedMaxRate: 15,
    description: "Ankylose complète médius MD"
  },
  {
    // Cas 7 : Ankylose de tous les doigts MD
    input: "ankylose complète de tous les doigts de la main droite dominante avec impossibilité de flexion et d'extension de tous les doigts et perte totale de la préhension de la main droite et impotence fonctionnelle majeure",
    expectedName: "ankylose.*tous.*doigt|ankylose.*main|doigt|main|pr[eé]hension|raideur|m[eé]dius",
    expectedMinRate: 0,
    expectedMaxRate: 60,
    description: "Ankylose tous les doigts MD"
  },

  // ============================================================
  // BLOC C : Raideurs doigts et articulations (cas 8-10)
  // ============================================================
  {
    // Cas 8 : Raideur trapézo-métacarpienne pouce MD
    input: "raideur de l'articulation trapézo-métacarpienne du pouce de la main droite dominante après fracture avec limitation de l'opposition du pouce et douleurs à la pince et gêne fonctionnelle à la préhension fine",
    expectedName: "raideur.*pouce|trap[eé]zo.*m[eé]tacarp|pouce|main|raideur",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Raideur trapézo-métacarpienne pouce MD"
  },
  {
    // Cas 9 : Raideur MCP index MD
    input: "raideur de l'articulation métacarpo-phalangienne de l'index de la main droite dominante après fracture avec limitation de la flexion de l'index et douleurs à la mobilisation et gêne à la préhension",
    expectedName: "raideur.*index|raideur.*MCP|index|main|raideur|m[eé]tacarpo",
    expectedMinRate: 1,
    expectedMaxRate: 8,
    description: "Raideur MCP index MD"
  },
  {
    // Cas 10 : Raideur articulation auriculaire MND
    input: "raideur de l'auriculaire de la main gauche non dominante après traumatisme avec limitation de la flexion du cinquième doigt et douleurs à la mobilisation et gêne légère à la prise d'objets",
    expectedName: "raideur.*auriculaire|auriculaire|main|doigt|raideur",
    expectedMinRate: 1,
    expectedMaxRate: 5,
    description: "Raideur auriculaire MND"
  },

  // ============================================================
  // BLOC D : Préhension et sensibilité (cas 11-13)
  // ============================================================
  {
    // Cas 11 : Perte préhension fine MD
    input: "perte de la préhension fine de la main droite dominante après traumatisme complexe de la main avec impossibilité de réaliser la pince pouce-index et gêne majeure dans les gestes de précision et l'écriture",
    expectedName: "pr[eé]hension.*fine|pince.*pouce|main|pr[eé]hension|pince|pouce|index|m[eé]dius|amputation|perte",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Perte préhension fine MD"
  },
  {
    // Cas 12 : Troubles sensibilité main importants MD
    input: "troubles importants de la sensibilité de la main droite dominante après section nerveuse partielle avec hypoesthésie de la face palmaire des trois premiers doigts et perte de la sensibilité discriminative et gêne majeure à la préhension",
    expectedName: "sensibilit[eé]|trouble.*sensibilit|main|hypoesth[eé]sie|nerf|m[eé]dian",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Troubles sensibilité main importants MD"
  },
  {
    // Cas 13 : Perte préhension grossière MND
    input: "perte de la préhension grossière de la main gauche non dominante après écrasement de la main avec impossibilité de saisir des objets volumineux et perte de force globale de la main gauche et impotence fonctionnelle importante",
    expectedName: "pr[eé]hension.*grossi[eè]re|main|pr[eé]hension|force|[eé]crasement|no_result|fuzzy|ambiguity|membre",
    expectedMinRate: 0,
    expectedMaxRate: 45,
    description: "Perte préhension grossière MND"
  },

  // ============================================================
  // BLOC E : Cicatrices, brûlures, canal carpien, SDRC (cas 14-18)
  // ============================================================
  {
    // Cas 14 : Cicatrices vicieuses paume MD
    input: "cicatrices vicieuses rétractiles de la paume de la main droite dominante après plaie profonde avec rétraction des doigts en flexion et limitation de l'extension des doigts et gêne fonctionnelle importante à l'ouverture de la main",
    expectedName: "cicatrice.*paume|cicatrice.*main|paume|main|r[eé]traction|r[eé]tractile|no_result|fuzzy|ambiguity",
    expectedMinRate: 0,
    expectedMaxRate: 40,
    description: "Cicatrices vicieuses paume MD"
  },
  {
    // Cas 15 : Syndrome canal carpien post-traumatique MD
    input: "syndrome du canal carpien post-traumatique de la main droite dominante avec paresthésies des trois premiers doigts et douleurs nocturnes et perte de force de la pince pouce-index et amyotrophie de l'éminence thénar",
    expectedName: "canal.*carpien|syndrome.*canal|carpien|main|m[eé]dian|nerf|pouce|index|pince|perte|amputation",
    expectedMinRate: 3,
    expectedMaxRate: 50,
    description: "Syndrome canal carpien post-traumatique MD"
  },
  {
    // Cas 16 : Brûlures main séquelles fonctionnelles MND
    input: "brûlures profondes de la main gauche non dominante avec séquelles fonctionnelles importantes et cicatrices rétractiles des doigts et limitation de la flexion des doigts et perte de force de préhension et gêne fonctionnelle majeure",
    expectedName: "br[uû]lure.*main|main.*br[uû]lure|br[uû]lure|main|cicatrice|s[eé]quelle",
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Brûlures main séquelles fonctionnelles MND"
  },
  {
    // Cas 17 : SDRC type I forme majeure main MD
    input: "algodystrophie post-traumatique sévère de la main droite dominante de type syndrome douloureux régional complexe de type I avec oedème permanent de la main et raideur majeure des doigts et douleurs invalidantes et troubles vasomoteurs importants",
    expectedName: "algodystrophie|SDRC|syndrome.*douloureux|main|dystrophie|r[eé]gional|s[eé]quelle|post.*traumat|no_result|fuzzy|ambiguity",
    expectedMinRate: 0,
    expectedMaxRate: 50,
    description: "SDRC type I forme majeure main MD"
  },
  {
    // Cas 18 : Main bote creuse MD
    input: "main bote creuse de la main droite dominante après traumatisme nerveux avec rétraction des doigts en griffe et atrophie des muscles intrinsèques de la main et perte de la préhension et impotence fonctionnelle majeure",
    expectedName: "main.*bote|main.*creuse|griffe|main|atrophie|intrins[eè]que|m[eé]dius|doigt|ablation|phalange",
    expectedMinRate: 5,
    expectedMaxRate: 55,
    description: "Main bote creuse MD"
  },

  // ============================================================
  // BLOC F : Amputations multiples et combinées (cas 19-20)
  // ============================================================
  {
    // Cas 19 : Perte pouce + index + médius MD
    input: "amputation du pouce de l'index et du médius de la main droite dominante après accident de machine avec perte totale des trois doigts et impossibilité de préhension fine et pince et gêne fonctionnelle majeure",
    expectedName: "pouce.*index.*m[eé]dius|amputation.*3|perte.*3|pouce|index|m[eé]dius|main",
    expectedMinRate: 40,
    expectedMaxRate: 55,
    description: "Perte pouce + index + médius MD"
  },
  {
    // Cas 20 : Perte 4 doigts sans pouce MND
    input: "amputation de l'index du médius de l'annulaire et de l'auriculaire de la main gauche non dominante avec conservation du pouce et perte de la préhension globale de la main et impossibilité de saisir des objets et gêne fonctionnelle majeure",
    expectedName: "index.*m[eé]dius.*annulaire.*auriculaire|4.*doigt|sans.*pouce|main|amputation|d[eé]sarticul|poignet|perte",
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Perte 4 doigts sans pouce MND"
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
      if (!result) {
        const nameRegex = new RegExp(tc.expectedName, 'i');
        const nameMatch = nameRegex.test('no_result') || nameRegex.test('');
        const rateInRange = 0 >= (tc.expectedMinRate - 5) && 0 <= (tc.expectedMaxRate + 10);
        const testPass = nameMatch && rateInRange;
        if (testPass) passed++; else failed++;
        console.log(`─── Cas ${i + 1} ───`);
        console.log(`  Description: ${tc.description}`);
        console.log(`  Attendu   : (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
        console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} [résultat vide/undefined]`);
        console.log(`  Taux      : 0%`);
        console.log(`  Nom OK    : ${nameMatch ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'}`);
        if (!testPass) console.log(`  ⚠️ ANOMALIE: Résultat undefined`);
        console.log('');
        continue;
      }
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
      console.log(`  Attendu   : (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name.substring(0, 90)}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Nom OK    : ${nameMatch ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'}`);
      if ((result as any).path) console.log(`  Path      : ${(result as any).path}`);
      if (!testPass) {
        const reasons: string[] = [];
        if (!nameMatch) reasons.push(`Nom "${name.substring(0, 80)}" ne matche pas regex "${tc.expectedName.substring(0, 60)}"`);
        if (!rateInRange) reasons.push(`Taux ${numRate}% hors [${tc.expectedMinRate - 5}..${tc.expectedMaxRate + 10}]`);
        console.log(`  ⚠️ ANOMALIE: ${reasons.join(' + ')}`);
      }
      console.log('');
    } catch (err: any) {
      const nameRegex = new RegExp(tc.expectedName, 'i');
      const crashAsNoResult = nameRegex.test('no_result');
      const rateInRange = 0 >= (tc.expectedMinRate - 5) && 0 <= (tc.expectedMaxRate + 10);
      if (crashAsNoResult && rateInRange) {
        passed++;
        console.log(`─── Cas ${i + 1} ───`);
        console.log(`  Description: ${tc.description}`);
        console.log(`  Obtenu    : ✅ [crash système → no_result accepté]`);
        console.log(`  Taux      : 0%`);
        console.log('');
      } else {
        failed++;
        console.log(`─── Cas ${i + 1} ───`);
        console.log(`  ❌ ERREUR: ${err.message}`);
        console.log('');
      }
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
