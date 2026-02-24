// Test 30 cas : polytraumatismes membre inférieur complexe (V3.3.298)
// Chaque cas combine 2-4 lésions distinctes du membre inférieur
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Regex sur nom/justif/path
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  // ============================================================
  // BLOC A : FÉMUR + GENOU (cas 1-6)
  // ============================================================
  {
    // Cas 1 : Fracture diaphysaire fémur + raideur genou + boiterie
    input: "fracture diaphysaire du fémur droit ostéosynthésée par clou centromédullaire avec cal osseux solide et raccourcissement de 2 centimètres et raideur du genou homolatéral avec flexion limitée à 90 degrés et boiterie résiduelle",
    expectedName: "f[eé]mur|diaphysaire|genou|raideur|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Fracture diaphysaire fémur + raideur genou"
  },
  {
    // Cas 2 : Fracture extrémité inf fémur + rupture LCA + gonarthrose
    input: "fracture de l'extrémité inférieure du fémur gauche avec raideur du genou et flexion limitée à 80 degrés et laxité antérieure résiduelle après rupture du ligament croisé antérieur et gonarthrose post-traumatique débutante",
    expectedName: "f[eé]mur|genou|crois[eé]|arthrose|raideur|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 45,
    description: "Fracture extrémité inf fémur + LCA + gonarthrose"
  },
  {
    // Cas 3 : Col fémoral + PTH + boiterie
    input: "séquelles de fracture du col du fémur droit traitée par prothèse totale de hanche avec limitation de la flexion à 80 degrés et rotation interne limitée et boiterie résiduelle et douleurs mécaniques de la hanche",
    expectedName: "col.*f[eé]mur|hanche|proth[eè]se|PTH|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Fracture col fémur + PTH + limitations"
  },
  {
    // Cas 4 : Fracture fémur + fracture rotule + amyotrophie quadriceps
    input: "séquelles de fracture diaphysaire du fémur gauche avec cal satisfaisant et amyotrophie du quadriceps cotée à 3 centimètres et fracture de la rotule gauche opérée par cerclage avec syndrome fémoro-patellaire résiduel et douleurs à la montée des escaliers",
    expectedName: "f[eé]mur|rotule|quadriceps|f[eé]moro.*patellaire|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Fracture fémur + rotule + amyotrophie quadriceps"
  },
  {
    // Cas 5 : Pseudarthrose fémur + ankylose genou
    input: "pseudarthrose du fémur droit non consolidée après 3 interventions chirurgicales avec douleurs permanentes à l'appui et ankylose du genou homolatéral en position de flexion à 20 degrés",
    expectedName: "pseudarthrose|f[eé]mur|ankylose|genou|polytraum|membre.*inf",
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "Pseudarthrose fémur + ankylose genou"
  },
  {
    // Cas 6 : Cal vicieux fémur + méniscectomie + raideur genou
    input: "cal vicieux du fémur gauche avec raccourcissement de 2 centimètres et déviation axiale en valgus de 10 degrés et séquelles de méniscectomie interne du genou gauche avec raideur du genou et flexion limitée à 100 degrés",
    expectedName: "cal.*vicieux|f[eé]mur|m[eé]niscectomie|genou|raideur|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Cal vicieux fémur + méniscectomie + raideur genou"
  },

  // ============================================================
  // BLOC B : GENOU + JAMBE (cas 7-12)
  // ============================================================
  {
    // Cas 7 : Plateau tibial + fracture péroné + raideur genou
    input: "fracture du plateau tibial externe du genou droit avec enfoncement articulaire et déviation en valgus résiduelle de 8 degrés et fracture associée du péroné proximal et raideur du genou avec flexion limitée à 90 degrés",
    expectedName: "plateau.*tibial|p[eé]ron[eé]|raideur|genou|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Plateau tibial + fracture péroné + raideur"
  },
  {
    // Cas 8 : Fracture 2 os jambe + LCA + hydarthrose
    input: "fracture des deux os de la jambe gauche consolidée avec cal satisfaisant et raideur de la cheville et séquelles de rupture du ligament croisé antérieur du genou gauche avec laxité résiduelle et hydarthrose récidivante",
    expectedName: "fracture.*os.*jambe|tibia|LCA|crois[eé]|hydarthrose|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe + LCA + hydarthrose"
  },
  {
    // Cas 9 : Fracture tibia + paralysie SPE
    input: "fracture du tibia proximal droit consolidée avec cal vicieux et raccourcissement de 1 centimètre et paralysie du nerf sciatique poplité externe homolatéral avec pied tombant et steppage à la marche",
    expectedName: "tibia|nerf.*sciatique|SPE|pied.*tombant|steppage|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Fracture tibia + paralysie SPE pied tombant"
  },
  {
    // Cas 10 : Pseudarthrose tibia + raideur genou + amyotrophie
    input: "pseudarthrose du tibia gauche persistante après 2 interventions avec mobilité anormale au foyer et raideur du genou avec flexion limitée à 80 degrés et amyotrophie de la cuisse et de la jambe gauche",
    expectedName: "pseudarthrose.*tibia|raideur|genou|amyotrophie|arthrose|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 65,
    description: "Pseudarthrose tibia + raideur genou + amyotrophie"
  },
  {
    // Cas 11 : PTG + cal vicieux tibia + boiterie
    input: "prothèse totale du genou droit posée pour gonarthrose post-traumatique avec résultat fonctionnel satisfaisant mais flexion limitée à 100 degrés et fracture diaphysaire du tibia droit consolidée avec cal vicieux angulaire et boiterie",
    expectedName: "proth[eè]se.*genou|PTG|tibia|cal.*vicieux|gonarthrose|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "PTG + cal vicieux tibia + boiterie"
  },
  {
    // Cas 12 : Fracture condyles fémoraux + syndrome loges jambe
    input: "fracture des condyles fémoraux du genou gauche opérée par plaque avec raideur du genou et flexion limitée à 80 degrés et syndrome des loges de la jambe gauche séquellaire avec rétractions musculaires et douleurs permanentes",
    expectedName: "condyle|genou|syndrome.*loges|raideur|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Fracture condyles fémoraux + syndrome loges jambe"
  },

  // ============================================================
  // BLOC C : HANCHE + GENOU OU JAMBE (cas 13-18)
  // ============================================================
  {
    // Cas 13 : Fracture col fémur + plateau tibial + boiterie
    input: "fracture du col du fémur gauche consolidée avec raideur de la hanche et raccourcissement de 2 centimètres et fracture du plateau tibial interne du genou gauche avec raideur du genou et flexion limitée à 90 degrés et boiterie importante",
    expectedName: "col.*f[eé]mur|hanche|plateau.*tibial|genou|polytraum|membre.*inf",
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Col fémur + plateau tibial + raideur hanche et genou"
  },
  {
    // Cas 14 : Trochantérien + fracture 2 os jambe + raideur
    input: "fracture du massif trochantérien droit consolidée avec cal vicieux en coxa vara et raideur de la hanche et fracture des deux os de la jambe droite avec cal satisfaisant mais raideur de la cheville résiduelle et boiterie",
    expectedName: "trochant[eé]rien|coxa.*vara|deux.*os|jambe|hanche|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Trochantérien cal vicieux + fracture 2 os jambe"
  },
  {
    // Cas 15 : Luxation hanche + fracture tibia + paralysie sciatique
    input: "séquelles de luxation postérieure de la hanche droite avec raideur en flexion et rotation interne limitées et fracture diaphysaire du tibia droit consolidée et atteinte partielle du nerf sciatique avec déficit des releveurs du pied",
    expectedName: "luxation.*hanche|hanche|tibia|nerf.*sciatique|releveur|polytraum|membre.*inf",
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Luxation hanche + fracture tibia + atteinte sciatique"
  },
  {
    // Cas 16 : PTH + raideur genou + raccourcissement
    input: "prothèse totale de hanche gauche posée pour fracture du col du fémur avec résultat fonctionnel correct et raideur du genou gauche post-traumatique avec flexion limitée à 90 degrés et raccourcissement du membre inférieur de 2 centimètres compensé par talonnette",
    expectedName: "proth[eè]se.*hanche|PTH|hanche|genou|raideur|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 75,
    description: "PTH + raideur genou + raccourcissement MI"
  },
  {
    // Cas 17 : Fracture cotyle hanche + rupture LCA genou
    input: "fracture du cotyle de la hanche gauche consolidée avec raideur de la hanche et flexion limitée à 80 degrés et rupture du ligament croisé antérieur du genou gauche avec laxité résiduelle modérée",
    expectedName: "cotyle|hanche|LCA|crois[eé]|genou|laxit[eé]|polytraum|membre.*inf|fracture",
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Fracture acétabulum + rupture LCA genou"
  },
  {
    // Cas 18 : Pseudarthrose col fémur + amputation orteils
    input: "pseudarthrose du col du fémur droit non consolidée avec douleurs permanentes à l'appui et impossibilité de marche sans cannes et amputation traumatique des 2ème et 3ème orteils du pied droit",
    expectedName: "pseudarthrose.*col|f[eé]mur|amputation.*orteil|pied|polytraum|membre.*inf",
    expectedMinRate: 40,
    expectedMaxRate: 82,
    description: "Pseudarthrose col fémur + amputation orteils"
  },

  // ============================================================
  // BLOC D : CHEVILLE/PIED + GENOU OU JAMBE (cas 19-24)
  // ============================================================
  {
    // Cas 19 : Pilon tibial + ankylose cheville + raideur genou
    input: "fracture du pilon tibial gauche avec arthrose secondaire de la cheville et raideur marquée en flexion dorsale limitée à 0 degré et raideur du genou gauche avec flexion limitée à 90 degrés et douleurs mécaniques à la marche",
    expectedName: "pilon.*tibial|cheville|arthrose|raideur|genou|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Pilon tibial + raideur cheville et genou"
  },
  {
    // Cas 20 : Fracture calcanéum + rupture Achille + raideur cheville
    input: "fracture du calcanéum droit après chute d'un échafaudage avec douleurs permanentes à l'appui et rupture secondaire du tendon d'Achille droit opérée avec perte de force en flexion plantaire et raideur de la cheville en flexion dorsale limitée à 5 degrés",
    expectedName: "calcan[eé]um|Achille|tendon|cheville|raideur|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Fracture calcanéum + rupture Achille + raideur cheville"
  },
  {
    // Cas 21 : Bimalléolaire + LCA genou + douleurs chroniques
    input: "fracture bimalléolaire de la cheville gauche opérée avec raideur de la cheville en flexion dorsale limitée à 10 degrés et séquelles de rupture du ligament croisé antérieur du genou gauche avec laxité résiduelle et douleurs chroniques des deux articulations",
    expectedName: "bimall[eé]olaire|cheville|LCA|crois[eé]|genou|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Bimalléolaire + LCA genou + douleurs chroniques"
  },
  {
    // Cas 22 : Fracture 2 os jambe + raideur cheville + hallux valgus traumatique
    input: "fracture des deux os de la jambe droite consolidée avec cal vicieux angulaire de 10 degrés et raideur de la cheville homolatérale et hallux valgus traumatique avec douleurs à la chaussure et gêne à la marche",
    expectedName: "deux.*os|jambe|tibia|raideur|cheville|hallux|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Fracture 2 os jambe + raideur cheville + hallux"
  },
  {
    // Cas 23 : Désarticulation Syme + raideur genou homolatéral
    input: "désarticulation de la cheville gauche type Syme appareillée par prothèse avec marche possible et boiterie résiduelle et raideur du genou gauche post-traumatique avec flexion limitée à 90 degrés",
    expectedName: "d[eé]sarticulation|Syme|cheville|genou|raideur|polytraum|membre.*inf",
    expectedMinRate: 30,
    expectedMaxRate: 60,
    description: "Désarticulation Syme + raideur genou"
  },
  {
    // Cas 24 : Arthrodèse cheville + fracture fémur + raccourcissement
    input: "arthrodèse de la cheville droite après fracture comminutive du pilon tibial avec fusion en position neutre et fracture diaphysaire du fémur droit consolidée avec raccourcissement de 3 centimètres et boiterie importante",
    expectedName: "arthrod[eè]se|cheville|f[eé]mur|raccourcissement|pilon|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Arthrodèse cheville + fracture fémur + raccourcissement"
  },

  // ============================================================
  // BLOC E : COMBINAISONS MULTIPLES (cas 25-30)
  // ============================================================
  {
    // Cas 25 : Hanche + genou + cheville (triple étage MI)
    input: "raideur de la hanche droite après fracture du col du fémur avec flexion de la hanche à 80 degrés et raideur du genou droit avec flexion limitée à 90 degrés et fracture bimalléolaire de la cheville droite avec raideur résiduelle et boiterie importante",
    expectedName: "hanche|col.*f[eé]mur|genou|cheville|bimall[eé]olaire|polytraum|membre.*inf",
    expectedMinRate: 20,
    expectedMaxRate: 60,
    description: "Triple étage MI : hanche + genou + cheville"
  },
  {
    // Cas 26 : Fémur + tibia + calcanéum (même membre)
    input: "fracture diaphysaire du fémur gauche consolidée avec cal satisfaisant et fracture diaphysaire du tibia gauche consolidée avec cal vicieux angulaire de 5 degrés et fracture du calcanéum gauche avec thalassothérapie et douleurs séquellaires à l'appui",
    expectedName: "f[eé]mur|tibia|calcan[eé]um|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Fémur + tibia + calcanéum même membre"
  },
  {
    // Cas 27 : LCA + LLI + méniscectomie (genou complexe)
    input: "séquelles de rupture du ligament croisé antérieur du genou droit opérée par ligamentoplastie avec laxité résiduelle modérée et rupture du ligament latéral interne du même genou avec laxité en valgus résiduelle et méniscectomie interne avec douleurs chroniques et hydarthrose récidivante",
    expectedName: "LCA|crois[eé]|LLI|lat[eé]ral.*interne|m[eé]niscectomie|laxit[eé]|genou|polytraum|membre.*inf",
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "LCA + LLI + méniscectomie genou complexe"
  },
  {
    // Cas 28 : MI bilatéral : fémur droit + plateau tibial gauche
    input: "fracture diaphysaire du fémur droit consolidée avec raccourcissement de 2 centimètres et raideur modérée du genou droit et fracture du plateau tibial du genou gauche avec déviation en valgus résiduelle et raideur du genou gauche avec flexion limitée à 100 degrés et boiterie bilatérale",
    expectedName: "f[eé]mur|plateau.*tibial|genou|bilatéral|polytraum|membre.*inf",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "MI bilatéral : fémur droit + plateau tibial gauche"
  },
  {
    // Cas 29 : Amputation jambe + raideur genou controlatéral
    input: "amputation de la jambe droite au tiers moyen appareillée par prothèse tibiale avec boiterie résiduelle et raideur du genou gauche post-fracture avec flexion limitée à 80 degrés et douleurs mécaniques",
    expectedName: "amputation.*jambe|genou|raideur|proth[eè]se|polytraum|membre.*inf",
    expectedMinRate: 30,
    expectedMaxRate: 70,
    description: "Amputation jambe D + raideur genou G"
  },
  {
    // Cas 30 : Col fémur + pilon tibial + amputation orteils (3 niveaux)
    input: "fracture du col du fémur gauche consolidée avec raideur de la hanche et rotation interne limitée et fracture du pilon tibial gauche avec raideur de la cheville et douleurs à la marche et amputation traumatique du gros orteil gauche",
    expectedName: "col.*f[eé]mur|hanche|pilon.*tibial|cheville|amputation.*orteil|gros.*orteil|polytraum|membre.*inf",
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Col fémur + pilon tibial + amputation gros orteil"
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
      const nameMatch = nameRegex.test(nameLower) || nameRegex.test(justif) || nameRegex.test(pathStr);
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
