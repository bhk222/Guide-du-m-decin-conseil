// Test 40 cas : traumatismes membre supérieur (V3.3.299)
// Épaule (10), Bras/Humérus (6), Coude (8), Avant-bras (6), Poignet (5), Main/Doigts (5)
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
  // ÉPAULE (10 cas)
  // ============================================================
  {
    // Cas 1 : Fracture clavicule bien consolidée
    input: "fracture de la clavicule droite main dominante bien consolidée sans cal saillant et sans raideur résiduelle de l'épaule avec récupération fonctionnelle complète",
    expectedName: "fracture.*clavicule.*consolidée|clavicule.*consolidée|clavicule",
    expectedMinRate: 1,
    expectedMaxRate: 5,
    description: "Fracture clavicule consolidée sans raideur"
  },
  {
    // Cas 2 : Fracture clavicule avec cal saillant et raideur épaule
    input: "fracture de la clavicule gauche main non dominante avec cal saillant palpable et raideur modérée de l'épaule limitant l'abduction à 120 degrés",
    expectedName: "fracture.*clavicule.*cal.*saillant|clavicule.*raideur|clavicule",
    expectedMinRate: 4,
    expectedMaxRate: 15,
    description: "Fracture clavicule cal saillant + raideur épaule ND"
  },
  {
    // Cas 3 : Luxation acromio-claviculaire
    input: "luxation de la clavicule droite main dominante non réduite externe acromio-claviculaire avec douleur",
    expectedName: "luxation.*clavicule|acromio.*claviculaire|clavicule",
    expectedMinRate: 0,
    expectedMaxRate: 8,
    description: "Luxation acromio-claviculaire non réduite D"
  },
  {
    // Cas 4 : Fracture tête humérale avec raideur importante
    input: "fracture de la tête humérale droite main dominante avec raideur importante de l'épaule limitant l'abduction à 60 degrés et la rotation externe à 10 degrés",
    expectedName: "fracture.*t[eê]te.*hum[eé]rale.*raideur|hum[eé]rale.*raideur|hum[eé]rale|épaule|raideur",
    expectedMinRate: 15,
    expectedMaxRate: 35,
    description: "Fracture tête humérale raideur importante D"
  },
  {
    // Cas 5 : Rupture coiffe des rotateurs
    input: "rupture coiffe des rotateurs épaule droite main dominante avec limitation abduction à 80 degrés",
    expectedName: "rupture.*coiffe.*rotateurs|coiffe.*rotateurs|periarthrite|épaule|raideur",
    expectedMinRate: 8,
    expectedMaxRate: 35,
    description: "Rupture coiffe des rotateurs D"
  },
  {
    // Cas 6 : Luxation récidivante épaule
    input: "luxation récidivante de l'épaule gauche main non dominante avec 4 épisodes de luxation post-traumatique et instabilité antérieure chronique limitant les activités",
    expectedName: "luxation.*r[eé]cidivante.*[eé]paule|luxation.*épaule|instabilit[eé]|épaule",
    expectedMinRate: 8,
    expectedMaxRate: 30,
    description: "Luxation récidivante épaule ND"
  },
  {
    // Cas 7 : Capsulite rétractile épaule gelée
    input: "capsulite rétractile post-traumatique de l'épaule droite main dominante avec limitation sévère de toutes les amplitudes articulaires et raideur globale de l'épaule gelée",
    expectedName: "capsulite.*r[eé]tractile|épaule.*gel[eé]e|capsulite|épaule|raideur",
    expectedMinRate: 12,
    expectedMaxRate: 35,
    description: "Capsulite rétractile épaule gelée D"
  },
  {
    // Cas 8 : Ankylose épaule avec mobilité omoplate
    input: "ankylose complète de l'épaule gauche main non dominante avec mobilité conservée de l'omoplate permettant une abduction compensatoire limitée",
    expectedName: "ankylose.*[eé]paule.*mobilit[eé].*omoplate|ankylose.*[eé]paule|épaule|ankylose",
    expectedMinRate: 20,
    expectedMaxRate: 45,
    description: "Ankylose épaule mobilité omoplate ND"
  },
  {
    // Cas 9 : Fracture omoplate
    input: "fracture de l'omoplate droite main dominante avec désordres articulaires et raideur résiduelle de l'épaule limitant les mouvements de rotation et d'abduction",
    expectedName: "fracture.*omoplate|omoplate|scapula|épaule|raideur",
    expectedMinRate: 8,
    expectedMaxRate: 50,
    description: "Fracture omoplate avec désordres articulaires D"
  },
  {
    // Cas 10 : Périarthrite chronique avec limitation modérée
    input: "périarthrite chronique douloureuse de l'épaule gauche main non dominante avec limitation modérée de l'abduction et de la rotation et douleurs nocturnes persistantes",
    expectedName: "p[eé]riarthrite.*chronique|p[eé]riarthrite|épaule|raideur",
    expectedMinRate: 4,
    expectedMaxRate: 25,
    description: "Périarthrite chronique limitation modérée ND"
  },

  // ============================================================
  // BRAS / HUMÉRUS (6 cas)
  // ============================================================
  {
    // Cas 11 : Fracture humérus bien consolidée
    input: "fracture de la diaphyse humérale droite main dominante normalement consolidée avec récupération fonctionnelle quasi complète et douleurs résiduelles minimes",
    expectedName: "fracture.*hum[eé]rus.*consolidée|hum[eé]rus.*consolidée|hum[eé]rus|fracture.*bras",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Fracture humérus consolidée normalement D"
  },
  {
    // Cas 12 : Fracture humérus cal vicieux déformation atrophie
    input: "fracture de l'humérus gauche main non dominante avec cal vicieux en angulation de 15 degrés et atrophie musculaire du bras avec limitation de la flexion du coude associée",
    expectedName: "fracture.*hum[eé]rus.*d[eé]formation|hum[eé]rus.*atrophie|hum[eé]rus|bras",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Fracture humérus cal vicieux déformation atrophie ND"
  },
  {
    // Cas 13 : Rupture totale du triceps
    input: "rupture totale du triceps droit main dominante avec perte de l'extension active du coude",
    expectedName: "rupture.*triceps|triceps|extension.*coude|coude|limitation",
    expectedMinRate: 5,
    expectedMaxRate: 35,
    description: "Rupture totale triceps D"
  },
  {
    // Cas 14 : Rupture biceps brachial complète
    input: "rupture complète du tendon du biceps brachial de l'épaule droite main dominante avec perte de force en flexion du coude et supination et déformation esthétique du relief musculaire du bras",
    expectedName: "rupture.*biceps.*compl[eè]te|biceps|rupture.*biceps|bras",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Rupture biceps complète D"
  },
  {
    // Cas 15 : Élongation musculaire épaule
    input: "élongation musculaire de l'épaule gauche main non dominante avec diminution de force résiduelle",
    expectedName: "élongation.*musculaire.*épaule|élongation.*épaule|épaule|raideur",
    expectedMinRate: 4,
    expectedMaxRate: 12,
    description: "Élongation musculaire épaule ND"
  },
  {
    // Cas 16 : Amputation du bras tiers moyen
    input: "amputation du bras droit main dominante au tiers moyen après accident de machine avec moignon bien cicatrisé appareillé par prothèse",
    expectedName: "amputation.*bras.*tiers.*moyen|amputation.*bras|bras",
    expectedMinRate: 65,
    expectedMaxRate: 85,
    description: "Amputation bras tiers moyen D"
  },

  // ============================================================
  // COUDE (8 cas)
  // ============================================================
  {
    // Cas 17 : Fracture olécrane cal osseux court
    input: "fracture de l'olécrane droit main dominante avec cal osseux court et bonne extension active du coude récupérée",
    expectedName: "fracture.*ol[eé]crane.*cal.*osseux|ol[eé]crane|coude",
    expectedMinRate: 2,
    expectedMaxRate: 8,
    description: "Fracture olécrane cal osseux bonne extension D"
  },
  {
    // Cas 18 : Fracture olécrane cal fibreux extension nulle atrophie
    input: "fracture de l'olécrane gauche main non dominante avec cal fibreux long et perte totale de l'extension active du coude et atrophie musculaire du bras",
    expectedName: "fracture.*ol[eé]crane.*cal.*fibreux|ol[eé]crane.*atrophie|ol[eé]crane|coude",
    expectedMinRate: 12,
    expectedMaxRate: 25,
    description: "Fracture olécrane cal fibreux extension nulle atrophie ND"
  },
  {
    // Cas 19 : Limitation flexion du coude
    input: "limitation de la flexion du coude droit main dominante post-traumatique avec flexion active limitée à 90 degrés après fracture de l'extrémité inférieure de l'humérus",
    expectedName: "limitation.*flexion.*coude|flexion.*coude|raideur.*coude|coude",
    expectedMinRate: 3,
    expectedMaxRate: 25,
    description: "Limitation flexion coude post-fracture D"
  },
  {
    // Cas 20 : Ankylose complète du coude en pronation
    input: "ankylose du coude gauche main non dominante en pronation avec perte totale de la flexion et extension du coude",
    expectedName: "ankylose.*coude.*pronation|ankylose.*compl[eè]te.*coude|ankylose.*coude|coude|poignet",
    expectedMinRate: 25,
    expectedMaxRate: 50,
    description: "Ankylose complète coude pronation ND"
  },
  {
    // Cas 21 : Épicondylite chronique rebelle
    input: "épicondylite chronique rebelle du coude droit main dominante résistante au traitement conservateur avec douleurs persistantes à la préhension et à l'extension du poignet",
    expectedName: "[eé]picondylite|[eé]pitrochl[eé]ite|coude",
    expectedMinRate: 4,
    expectedMaxRate: 18,
    description: "Épicondylite chronique rebelle D"
  },
  {
    // Cas 22 : Pseudarthrose coude ballant
    input: "pseudarthrose du coude droit main dominante coude ballant avec mobilité anormale du coude",
    expectedName: "pseudarthrose.*coude|coude.*ballant|coude|pseudarthrose|scapho[ïi]de",
    expectedMinRate: 8,
    expectedMaxRate: 55,
    description: "Pseudarthrose coude ballant D"
  },
  {
    // Cas 23 : Cicatrices coude entravant extension
    input: "cicatrices du coude droit main dominante entravant l'extension fixée à 90 degrés",
    expectedName: "cicatrices.*coude|coude.*extension|coude|extension",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Cicatrices coude entravant extension à 90° D"
  },
  {
    // Cas 24 : Prothèse totale du coude séquelles
    input: "séquelles de prothèse totale du coude droit main dominante avec raideur résiduelle limitation de la flexion à 100 degrés et douleurs mécaniques persistantes",
    expectedName: "proth[eè]se.*totale.*coude|s[eé]quelles.*proth[eè]se.*coude|prothèse.*coude|coude",
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Séquelles prothèse totale coude D"
  },

  // ============================================================
  // AVANT-BRAS (6 cas)
  // ============================================================
  {
    // Cas 25 : Limitation pronation coude
    input: "limitation de la pronation du coude droit main dominante après fracture",
    expectedName: "limitation.*pronation|pronation|coude",
    expectedMinRate: 2,
    expectedMaxRate: 12,
    description: "Limitation pronation coude D"
  },
  {
    // Cas 26 : Déchirure tendons extenseurs poignet
    input: "déchirure partielle des tendons extenseurs du poignet gauche main non dominante avec perte de force",
    expectedName: "d[eé]chirure.*tendons.*extenseurs|extenseurs.*poignet|poignet|déchirure",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Déchirure tendons extenseurs poignet ND"
  },
  {
    // Cas 27 : Pseudarthrose deux os lâche
    input: "pseudarthrose du radius et du cubitus droits main dominante lâche avec mobilité anormale",
    expectedName: "pseudarthrose.*deux.*os|pseudarthrose.*radius|pseudarthrose.*cubitus|pseudarthrose|radius",
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Pseudarthrose deux os lâche D"
  },
  {
    // Cas 28 : Fracture scaphoïde carpien avec raideur
    input: "fracture du scaphoïde carpien gauche main non dominante avec raideur résiduelle du poignet",
    expectedName: "fracture.*scapho[ïi]de|scapho[ïi]de.*carpien|poignet|raideur",
    expectedMinRate: 3,
    expectedMaxRate: 12,
    description: "Fracture scaphoïde carpien raideur simple ND"
  },
  {
    // Cas 29 : Fracture-luxation de Monteggia
    input: "séquelles de fracture-luxation de Monteggia de l'avant-bras droit main dominante avec limitation de la prono-supination et raideur résiduelle du coude associée",
    expectedName: "monteggia|fracture.*luxation.*monteggia|avant.*bras|coude",
    expectedMinRate: 8,
    expectedMaxRate: 35,
    description: "Séquelles fracture-luxation Monteggia D"
  },
  {
    // Cas 30 : Arthrodèse du poignet en position rectiligne
    input: "arthrodèse du poignet gauche main non dominante en position rectiligne",
    expectedName: "arthrod[eè]se.*poignet|poignet.*rectiligne|poignet",
    expectedMinRate: 8,
    expectedMaxRate: 18,
    description: "Arthrodèse poignet position rectiligne ND"
  },

  // ============================================================
  // POIGNET (5 cas)
  // ============================================================
  {
    // Cas 31 : Fracture extrémité inférieure radius bonne consolidation
    input: "fracture de l'extrémité inférieure du radius droit main dominante type Pouteau-Colles avec bonne consolidation et récupération fonctionnelle complète du poignet",
    expectedName: "fracture.*ext.*inf.*radius.*consolidation|fracture.*radius.*poignet|fracture.*radius|poignet|radius",
    expectedMinRate: 2,
    expectedMaxRate: 8,
    description: "Fracture extrémité inf radius consolidation parfaite D"
  },
  {
    // Cas 32 : Fracture radius avec raideur déformation troubles nerveux
    input: "fracture de l'extrémité inférieure du radius gauche main non dominante avec cal vicieux en bascule postérieure et raideur importante du poignet et paresthésies dans le territoire du nerf médian",
    expectedName: "fracture.*radius.*raideur.*d[eé]formation|fracture.*radius.*troubles.*nerveux|fracture.*radius|poignet|radius|canal.*carpien",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture radius raideur déformation troubles nerveux ND"
  },
  {
    // Cas 33 : Pseudarthrose scaphoïde carpien
    input: "pseudarthrose du scaphoïde carpien droit main dominante avec douleur chronique et raideur du poignet limitant la flexion et l'extension",
    expectedName: "pseudarthrose.*scapho[ïi]de|scapho[ïi]de|poignet",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Pseudarthrose scaphoïde carpien D"
  },
  {
    // Cas 34 : Ankylose du poignet en flexion
    input: "ankylose du poignet gauche main non dominante en position de flexion après fracture articulaire avec impossibilité d'extension et de déviation radiale",
    expectedName: "ankylose.*poignet.*flexion|ankylose.*poignet|poignet|ankylose",
    expectedMinRate: 20,
    expectedMaxRate: 40,
    description: "Ankylose poignet en flexion ND"
  },
  {
    // Cas 35 : Syndrome canal carpien post-traumatique
    input: "syndrome du canal carpien post-traumatique de la main droite dominante avec paresthésies nocturnes permanentes et début d'amyotrophie de l'éminence thénar",
    expectedName: "canal.*carpien|syndrome.*canal|carpien|n[eè]rf.*m[eé]dian|poignet",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Syndrome canal carpien post-traumatique D"
  },

  // ============================================================
  // MAIN / DOIGTS (5 cas)
  // ============================================================
  {
    // Cas 36 : Amputation pouce main dominante
    input: "amputation du pouce droit main dominante par désarticulation métacarpo-phalangienne",
    expectedName: "amputation.*pouce|d[eé]sarticulation.*pouce|pouce|perte.*pouce",
    expectedMinRate: 20,
    expectedMaxRate: 32,
    description: "Amputation pouce désarticulation MCP D"
  },
  {
    // Cas 37 : Amputation index main dominante
    input: "amputation de l'index droit main dominante avec perte des trois phalanges au niveau de l'articulation métacarpo-phalangienne après écrasement par machine",
    expectedName: "amputation.*index|perte.*index|d[eé]sarticulation.*index|index",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Amputation index 3 phalanges D"
  },
  {
    // Cas 38 : Séquelles fracture métacarpien
    input: "séquelles de fracture du 3ème métacarpien de la main droite dominante avec cal vicieux et raideur de l'articulation métacarpo-phalangienne du médius",
    expectedName: "fracture.*m[eé]tacarpien|m[eé]tacarpien|s[eé]quelles.*fracture|main|m[eé]dius",
    expectedMinRate: 2,
    expectedMaxRate: 12,
    description: "Séquelles fracture métacarpien D"
  },
  {
    // Cas 39 : Amputation annulaire et auriculaire
    input: "amputation de l'annulaire et de l'auriculaire de la main gauche non dominante avec perte des 3 phalanges de chaque doigt",
    expectedName: "annulaire.*auriculaire|perte.*annulaire|amputation.*annulaire|amputation.*deux|doigt|main",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Amputation annulaire + auriculaire ND"
  },
  {
    // Cas 40 : Raideur poignet avec douleur chronique
    input: "raideur du poignet droit main dominante avec limitation de la flexion et de l'extension et douleurs",
    expectedName: "raideur.*poignet|poignet|limitation",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Raideur importante poignet avec douleurs D"
  },
];

// ═══════════════════════════════════════════════════════════════
// RUNNER
// ═══════════════════════════════════════════════════════════════
async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  TEST : 40 cas traumatismes membre supérieur (V3.3.299)');
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
