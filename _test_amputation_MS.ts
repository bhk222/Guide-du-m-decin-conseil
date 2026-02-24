// Test 30 cas : amputations membre supérieur (V3.3.301)
// Épaule/Bras (5), Coude/Avant-bras (5), Poignet/Main (4), Doigts individuels (8), Multi-doigts (8)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Regex partiel sur le nom barème
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  // ============================================================
  // ÉPAULE / BRAS (5 cas)
  // ============================================================
  {
    // Cas 1 : Amputation interscapulo-thoracique MD
    input: "amputation interscapulo-thoracique du membre supérieur droit main dominante suite à un écrasement par machine industrielle",
    expectedName: "interscapulo.*thoracique|amputation.*interscapulo",
    expectedMinRate: 90,
    expectedMaxRate: 95,
    description: "Amputation interscapulo-thoracique MD (95%)"
  },
  {
    // Cas 2 : Désarticulation épaule MND
    input: "désarticulation de l'épaule gauche main non dominante suite à un accident de la voie publique avec perte totale du membre supérieur",
    expectedName: "d[eé]sarticulation.*[eé]paule|amputation.*col.*chirurgical|épaule",
    expectedMinRate: 75,
    expectedMaxRate: 90,
    description: "Désarticulation épaule MND (80%)"
  },
  {
    // Cas 3 : Amputation bras tiers supérieur MD
    input: "amputation du bras droit au tiers supérieur main dominante après accident de travail avec moignon bien cicatrisé et appareillé",
    expectedName: "amputation.*bras.*tiers.*sup[eé]rieur|amputation.*bras",
    expectedMinRate: 75,
    expectedMaxRate: 90,
    description: "Amputation bras tiers supérieur MD (80-90%)"
  },
  {
    // Cas 4 : Amputation bras tiers moyen MND
    input: "amputation du bras gauche au tiers moyen main non dominante suite à un accident de machine avec appareillage prothétique",
    expectedName: "amputation.*bras.*tiers.*moyen|amputation.*bras",
    expectedMinRate: 60,
    expectedMaxRate: 85,
    description: "Amputation bras tiers moyen MND (65-75%)"
  },
  {
    // Cas 5 : Amputation bras tiers inférieur MD
    input: "amputation du bras droit au tiers inférieur main dominante après traumatisme par engin agricole",
    expectedName: "amputation.*bras.*tiers.*inf[eé]rieur|amputation.*bras",
    expectedMinRate: 65,
    expectedMaxRate: 85,
    description: "Amputation bras tiers inférieur MD (70-85%)"
  },

  // ============================================================
  // COUDE / AVANT-BRAS (5 cas)
  // ============================================================
  {
    // Cas 6 : Désarticulation coude MD
    input: "désarticulation du coude droit main dominante suite à un accident avec perte de l'avant-bras et de la main",
    expectedName: "d[eé]sarticulation.*coude|coude",
    expectedMinRate: 65,
    expectedMaxRate: 80,
    description: "Désarticulation coude MD (70-80%)"
  },
  {
    // Cas 7 : Amputation avant-bras tiers supérieur MND
    input: "amputation de l'avant-bras gauche au tiers supérieur main non dominante après écrasement par presse hydraulique",
    expectedName: "amputation.*(?:avant.bras|bras).*tiers.*sup[eé]rieur|amputation.*bras",
    expectedMinRate: 50,
    expectedMaxRate: 90,
    description: "Amputation avant-bras tiers sup MND (55-80%)"
  },
  {
    // Cas 8 : Amputation avant-bras tiers moyen MD
    input: "amputation de l'avant-bras droit au tiers moyen main dominante avec moignon fonctionnel appareillé",
    expectedName: "amputation.*(?:avant.bras|bras).*tiers.*moyen|amputation.*bras",
    expectedMinRate: 55,
    expectedMaxRate: 85,
    description: "Amputation avant-bras tiers moyen MD (60-85%)"
  },
  {
    // Cas 9 : Amputation avant-bras tiers inférieur MND
    input: "amputation de l'avant-bras gauche au tiers inférieur main non dominante après accident de scie circulaire",
    expectedName: "amputation.*(?:avant.bras|bras).*tiers.*inf[eé]rieur|amputation.*bras",
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "Amputation avant-bras tiers inf MND (45-75%)"
  },
  {
    // Cas 10 : Amputation avant-bras générique MD
    input: "amputation de l'avant-bras droit main dominante suite à un traumatisme industriel avec prothèse myoélectrique",
    expectedName: "amputation.*avant.*bras|avant.bras",
    expectedMinRate: 60,
    expectedMaxRate: 85,
    description: "Amputation avant-bras MD générique (70-75%)"
  },

  // ============================================================
  // POIGNET / MAIN (4 cas)
  // ============================================================
  {
    // Cas 11 : Désarticulation poignet MND
    input: "désarticulation du poignet gauche main non dominante suite à un accident de travail avec perte complète de la main",
    expectedName: "d[eé]sarticulation.*poignet|poignet",
    expectedMinRate: 50,
    expectedMaxRate: 70,
    description: "Désarticulation poignet MND (55-60%)"
  },
  {
    // Cas 12 : Amputation de la main MD
    input: "amputation de la main droite main dominante au niveau des métacarpiens après accident de machine",
    expectedName: "amputation.*main|perte.*main|main",
    expectedMinRate: 55,
    expectedMaxRate: 70,
    description: "Amputation main MD (60-65%)"
  },
  {
    // Cas 13 : Amputation tous les doigts MND
    input: "amputation de tous les doigts de la main gauche non dominante après brûlure grave par arc électrique",
    expectedName: "amputation.*tous.*doigts|perte.*doigts|doigts|d[eé]sarticulation.*poignet|poignet",
    expectedMinRate: 40,
    expectedMaxRate: 70,
    description: "Amputation tous les doigts MND (45-60%)"
  },
  {
    // Cas 14 : Perte des cinq métacarpiens MD
    input: "perte des cinq métacarpiens de la main droite main dominante avec moignon palmaire résiduel",
    expectedName: "perte.*cinq.*m[eé]tacarpiens|m[eé]tacarpiens|m[eé]tacarp",
    expectedMinRate: 45,
    expectedMaxRate: 60,
    description: "Perte 5 métacarpiens MD (50-55%)"
  },

  // ============================================================
  // DOIGTS INDIVIDUELS (8 cas)
  // ============================================================
  {
    // Cas 15 : Amputation pouce MD (désarticulation métacarpo-phalangienne)
    input: "amputation du pouce droit main dominante au niveau de l'articulation métacarpo-phalangienne après accident de scie",
    expectedName: "amputation.*pouce|pouce.*d[eé]sarticulation|pouce",
    expectedMinRate: 20,
    expectedMaxRate: 30,
    description: "Amputation pouce MD désarticulation MP (28%)"
  },
  {
    // Cas 16 : Perte 2ème phalange pouce MND
    input: "perte de la deuxième phalange du pouce gauche main non dominante suite à un écrasement",
    expectedName: "phalange.*pouce|pouce.*phalange|pouce",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Perte P2 pouce MND (8%)"
  },
  {
    // Cas 17 : Amputation index MD (3 phalanges)
    input: "amputation de l'index droit main dominante avec perte des trois phalanges suite à un accident de travail",
    expectedName: "amputation.*index|perte.*index|index",
    expectedMinRate: 10,
    expectedMaxRate: 18,
    description: "Amputation index MD 3 phalanges (15%)"
  },
  {
    // Cas 18 : Perte P3 index MND
    input: "perte de la troisième phalange de l'index gauche main non dominante après accident de presse",
    expectedName: "phalange.*index|index.*phalange|index",
    expectedMinRate: 2,
    expectedMaxRate: 8,
    description: "Perte P3 index MND (4%)"
  },
  {
    // Cas 19 : Amputation médius MD
    input: "amputation du médius droit main dominante au niveau de l'articulation métacarpo-phalangienne",
    expectedName: "amputation.*m[eé]dius|m[eé]dius.*d[eé]sarticulation|m[eé]dius",
    expectedMinRate: 8,
    expectedMaxRate: 15,
    description: "Amputation médius MD désarticulation MP (12%)"
  },
  {
    // Cas 20 : Amputation annulaire MND
    input: "amputation de l'annulaire gauche main non dominante avec perte des trois phalanges après écrasement par machine",
    expectedName: "amputation.*annulaire|perte.*annulaire|annulaire",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Amputation annulaire MND 3 phalanges (6%)"
  },
  {
    // Cas 21 : Amputation auriculaire MD
    input: "amputation de l'auriculaire droit main dominante au niveau métacarpo-phalangien après traumatisme",
    expectedName: "amputation.*auriculaire|auriculaire.*d[eé]sarticulation|auriculaire",
    expectedMinRate: 5,
    expectedMaxRate: 12,
    description: "Amputation auriculaire MD désarticulation MP (10%)"
  },
  {
    // Cas 22 : Perte P2+P3 annulaire MD
    input: "perte des deuxième et troisième phalanges de l'annulaire droit main dominante suite à un accident",
    expectedName: "phalange.*annulaire|annulaire.*phalange|annulaire",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Perte P2+P3 annulaire MD (6%)"
  },

  // ============================================================
  // AMPUTATIONS MULTI-DOIGTS (8 cas)
  // ============================================================
  {
    // Cas 23 : Perte pouce + index MD
    input: "perte du pouce et de l'index de la main droite dominante suite à une explosion avec impossibilité de pince pollici-digitale",
    expectedName: "pouce.*index|pince|perte.*pouce.*index",
    expectedMinRate: 40,
    expectedMaxRate: 52,
    description: "Perte pouce + index MD (48%)"
  },
  {
    // Cas 24 : Perte pouce + médius MND
    input: "perte du pouce et du médius de la main gauche non dominante après accident de meuleuse",
    expectedName: "pouce.*m[eé]dius|perte.*pouce.*m[eé]dius",
    expectedMinRate: 28,
    expectedMaxRate: 42,
    description: "Perte pouce + médius MND (33%)"
  },
  {
    // Cas 25 : Perte index + médius MD
    input: "perte de l'index et du médius de la main droite dominante après accident avec scie à ruban",
    expectedName: "index.*m[eé]dius|perte.*index.*m[eé]dius",
    expectedMinRate: 18,
    expectedMaxRate: 28,
    description: "Perte index + médius MD (22%)"
  },
  {
    // Cas 26 : Perte annulaire + auriculaire MND
    input: "perte de l'annulaire et de l'auriculaire de la main gauche non dominante suite à un écrasement",
    expectedName: "annulaire.*auriculaire|perte.*annulaire.*auriculaire",
    expectedMinRate: 7,
    expectedMaxRate: 15,
    description: "Perte annulaire + auriculaire MND (10%)"
  },
  {
    // Cas 27 : Perte pouce + index + médius MD
    input: "perte du pouce de l'index et du médius de la main droite dominante suite à une déflagration avec perte fonctionnelle majeure de la préhension",
    expectedName: "pouce.*index.*m[eé]dius|perte.*pouce.*index.*m[eé]dius",
    expectedMinRate: 45,
    expectedMaxRate: 58,
    description: "Perte pouce + index + médius MD (52%)"
  },
  {
    // Cas 28 : Perte index + annulaire + auriculaire MND
    input: "perte de l'index de l'annulaire et de l'auriculaire de la main gauche non dominante après accident de travail",
    expectedName: "index.*annulaire.*auriculaire|perte.*index.*annulaire",
    expectedMinRate: 17,
    expectedMaxRate: 28,
    description: "Perte index + annulaire + auriculaire MND (22%)"
  },
  {
    // Cas 29 : Perte 4 doigts avec pouce MD (pouce+index+médius+annulaire)
    input: "perte de quatre doigts incluant le pouce l'index le médius et l'annulaire de la main droite dominante après explosion",
    expectedName: "perte.*4.*doigts|pouce.*index.*m[eé]dius.*annulaire|quatre.*doigts",
    expectedMinRate: 50,
    expectedMaxRate: 62,
    description: "Perte 4 doigts avec pouce MD (58%)"
  },
  {
    // Cas 30 : Perte 4 doigts sans pouce MND (index+médius+annulaire+auriculaire)
    input: "perte de l'index du médius de l'annulaire et de l'auriculaire de la main gauche non dominante avec conservation du pouce après accident industriel",
    expectedName: "perte.*4.*doigts.*sans.*pouce|index.*m[eé]dius.*annulaire.*auriculaire|quatre.*doigts",
    expectedMinRate: 20,
    expectedMaxRate: 35,
    description: "Perte 4 doigts sans pouce MND (25-30%)"
  },
];

// ═══════════════════════════════════════════════════════════════
// RUNNER
// ═══════════════════════════════════════════════════════════════
async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  TEST : 30 cas amputations membre supérieur (V3.3.301)');
  console.log('═══════════════════════════════════════════════════════════════\n');

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
      console.log(`  Attendu   : ${tc.expectedName.substring(0, 60)}... (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Nom OK    : ${nameMatch ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'}`);
      if ((result as any).path) console.log(`  Path      : ${(result as any).path}`);
      if (!testPass) {
        const reasons: string[] = [];
        if (!nameMatch) reasons.push(`Nom "${name}" ne matche pas "${tc.expectedName}"`);
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
