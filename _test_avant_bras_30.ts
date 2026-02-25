// Test 30 cas : traumatismes de l'avant-bras (V3.3.313)
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
  // FRACTURES DES DEUX OS DE L'AVANT-BRAS (cas 1-6)
  // ============================================================
  {
    // Cas 1 : Fracture deux os avant-bras - bonne consolidation MD
    input: "fracture des deux os de l'avant-bras droit main dominante par chute de sa hauteur traitée par ostéosynthèse par plaque sur le radius et le cubitus avec bonne consolidation radiologique obtenue à 10 semaines et récupération complète des amplitudes articulaires du coude sans trouble fonctionnel résiduel et reprise de l'activité professionnelle",
    expectedName: "fracture.*deux.*avant.bras.*bonne.*consolidation|fracture.*deux.*l.avant.*consolidation",
    expectedMinRate: 3,
    expectedMaxRate: 6,
    description: "Fracture 2 os avant-bras - bonne consolidation MD"
  },
  {
    // Cas 2 : Fracture deux os avant-bras - bonne consolidation MND
    input: "fracture diaphysaire des deux os de l'avant-bras gauche main non dominante suite à un accident de travail traitée orthopédiquement par plâtre brachio-antébrachial pendant 8 semaines avec bonne consolidation sans cal vicieux et mobilités normales du coude et récupération complète de la mobilité de l'avant-bras",
    expectedName: "fracture.*deux.*avant.bras.*bonne.*consolidation|fracture.*deux.*l.avant.*consolidation",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture 2 os avant-bras - bonne consolidation MND"
  },
  {
    // Cas 3 : Fracture deux os - cal vicieux + limitation prono-supination légère MD
    input: "fracture des deux os de l'avant-bras droit main dominante consolidée avec cal vicieux angulaire du radius et limitation légère de la prono-supination avec pronation à 60 degrés au lieu de 80 et supination conservée et gêne fonctionnelle modérée dans les gestes de rotation de l'avant-bras comme tourner une clé ou visser",
    expectedName: "fracture.*deux.*avant.bras.*cal.*vicieux.*prono|fracture.*deux.*l.avant.*cal.*vicieux|fracture.*deux.*limitation.*prono",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Fracture 2 os - cal vicieux + limitation prono-supination légère MD"
  },
  {
    // Cas 4 : Fracture deux os - cal vicieux + blocage complet prono-supination MND
    input: "fracture des deux os de l'avant-bras gauche main non dominante avec consolidation en cal vicieux important et blocage quasi-complet de la prono-supination avec pronation limitée à 10 degrés et supination à 20 degrés et douleurs chroniques à la mobilisation et impossibilité de tourner la paume de la main vers le haut ou le bas et gêne majeure dans les activités quotidiennes",
    expectedName: "fracture.*deux.*avant.bras.*cal.*vicieux.*prono|fracture.*deux.*l.avant.*cal.*vicieux|fracture.*deux.*limitation.*prono",
    expectedMinRate: 8,
    expectedMaxRate: 20,
    description: "Fracture 2 os - cal vicieux + blocage prono-supination MND"
  },
  {
    // Cas 5 : Fracture deux os - cal vicieux + impotence + troubles nerveux MD
    input: "fracture comminutive des deux os de l'avant-bras droit main dominante avec cal vicieux important et impotence fonctionnelle majeure et compression du nerf médian au foyer de fracture avec troubles nerveux sensitifs et moteurs à type de paresthésies des trois premiers doigts et déficit de la flexion des doigts et amyotrophie de l'éminence thénar et douleurs neuropathiques chroniques",
    expectedName: "fracture.*deux.*avant.bras.*cal.*vicieux.*impotence.*troubles.*nerveux|fracture.*deux.*l.avant.*impotence|fracture.*deux.*troubles.*nerveux",
    expectedMinRate: 30,
    expectedMaxRate: 45,
    description: "Fracture 2 os - cal vicieux + impotence + troubles nerveux MD"
  },
  {
    // Cas 6 : Fracture deux os - cal vicieux + impotence + troubles nerveux MND
    input: "fracture ouverte des deux os de l'avant-bras gauche main non dominante type Gustilo II avec cal vicieux et impotence fonctionnelle et atteinte du nerf radial avec main tombante et impossibilité d'extension du poignet et des doigts et troubles sensitifs du dos de la main et perte de force de préhension importante et nécessité de port d'attelle de relèvement",
    expectedName: "fracture.*deux.*avant.bras.*cal.*vicieux.*impotence.*troubles.*nerveux|fracture.*deux.*l.avant.*impotence|fracture.*deux.*troubles.*nerveux",
    expectedMinRate: 25,
    expectedMaxRate: 35,
    description: "Fracture 2 os - cal vicieux + impotence + troubles nerveux MND"
  },
  // ============================================================
  // FRACTURES ISOLÉES DU RADIUS ET DU CUBITUS (cas 7-10)
  // ============================================================
  {
    // Cas 7 : Fracture isolée du radius MD
    input: "fracture isolée de la diaphyse du radius droit main dominante par choc direct traitée par ostéosynthèse par plaque vissée avec consolidation obtenue à 8 semaines et douleurs résiduelles modérées à la rotation de l'avant-bras et légère limitation de la supination et gêne dans les gestes de la vie quotidienne",
    expectedName: "fracture.*isol[eé]e.*radius",
    expectedMinRate: 4,
    expectedMaxRate: 8,
    description: "Fracture isolée du radius MD"
  },
  {
    // Cas 8 : Fracture isolée du radius MND
    input: "fracture isolée de la diaphyse du radius gauche main non dominante au tiers moyen traitée par plâtre pendant 6 semaines avec bonne consolidation et mobilités conservées du coude et douleurs minimes résiduelles à l'effort",
    expectedName: "fracture.*isol[eé]e.*radius",
    expectedMinRate: 3,
    expectedMaxRate: 6,
    description: "Fracture isolée du radius MND"
  },
  {
    // Cas 9 : Fracture isolée du cubitus MD
    input: "fracture isolée du cubitus droit main dominante dite fracture du pare-choc par mécanisme de défense traitée par plâtre brachio-antébrachial pendant 6 semaines avec consolidation radiologique et douleurs résiduelles à la palpation du foyer et légère gêne à l'appui sur le coude",
    expectedName: "fracture.*isol[eé]e.*cubitus",
    expectedMinRate: 3,
    expectedMaxRate: 6,
    description: "Fracture isolée du cubitus MD"
  },
  {
    // Cas 10 : Fracture isolée du cubitus MND
    input: "fracture isolée du cubitus gauche main non dominante au tiers moyen traitée orthopédiquement avec consolidation sans déplacement secondaire et mobilités normales du coude et reprise des activités sans limitation",
    expectedName: "fracture.*isol[eé]e.*cubitus",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture isolée du cubitus MND"
  },
  // ============================================================
  // PSEUDARTHROSES (cas 11-16)
  // ============================================================
  {
    // Cas 11 : Pseudarthrose deux os - serrée MD
    input: "pseudarthrose serrée des deux os de l'avant-bras droit main dominante après fracture diaphysaire bilatérale consolidée en pseudarthrose hypertrophique serrée sans mobilité anormale mais avec douleurs chroniques et limitation importante de la prono-supination et perte de force de l'avant-bras",
    expectedName: "pseudarthrose.*deux.*avant.bras.*serr[eé]e|pseudarthrose.*deux.*l.avant.*serr[eé]e",
    expectedMinRate: 25,
    expectedMaxRate: 35,
    description: "Pseudarthrose 2 os - serrée MD"
  },
  {
    // Cas 12 : Pseudarthrose deux os - serrée MND
    input: "pseudarthrose serrée des deux os de l'avant-bras gauche main non dominante avec foyer fibreux dense sans mobilité pathologique et douleurs à l'effort et limitation fonctionnelle avec réduction de la force de serrage et difficulté à porter des charges lourdes",
    expectedName: "pseudarthrose.*deux.*avant.bras.*serr[eé]e|pseudarthrose.*deux.*l.avant.*serr[eé]e",
    expectedMinRate: 20,
    expectedMaxRate: 30,
    description: "Pseudarthrose 2 os - serrée MND"
  },
  {
    // Cas 13 : Pseudarthrose deux os - lâche MD
    input: "pseudarthrose lâche des deux os de l'avant-bras droit main dominante avec mobilité anormale au foyer de fracture et instabilité majeure de l'avant-bras et angulation possible au site de pseudarthrose et impotence fonctionnelle sévère avec impossibilité de porter des objets même légers et douleurs permanentes et avant-bras ballant",
    expectedName: "pseudarthrose.*deux.*avant.bras.*l[aâ]che|pseudarthrose.*deux.*l.avant.*l[aâ]che",
    expectedMinRate: 45,
    expectedMaxRate: 55,
    description: "Pseudarthrose 2 os - lâche MD"
  },
  {
    // Cas 14 : Pseudarthrose deux os - lâche MND
    input: "pseudarthrose lâche des deux os de l'avant-bras gauche main non dominante avec mobilité anormale importante et bras de levier inefficace et impossibilité de toute activité de force avec l'avant-bras gauche et douleurs chroniques au moindre effort et nécessité de port d'orthèse rigide en permanence",
    expectedName: "pseudarthrose.*deux.*avant.bras.*l[aâ]che|pseudarthrose.*deux.*l.avant.*l[aâ]che",
    expectedMinRate: 35,
    expectedMaxRate: 55,
    description: "Pseudarthrose 2 os - lâche MND"
  },
  {
    // Cas 15 : Pseudarthrose isolée du radius MD
    input: "pseudarthrose du radius droit main dominante après fracture diaphysaire mal consolidée avec foyer de pseudarthrose hypertrophique et douleurs chroniques à la rotation de l'avant-bras et limitation de la prono-supination et perte de force de préhension",
    expectedName: "pseudarthrose.*radius",
    expectedMinRate: 20,
    expectedMaxRate: 25,
    description: "Pseudarthrose du radius MD"
  },
  {
    // Cas 16 : Pseudarthrose isolée du cubitus MND
    input: "pseudarthrose du cubitus gauche main non dominante après fracture du tiers moyen du cubitus avec absence de consolidation après 9 mois et douleurs à l'appui et gêne fonctionnelle dans les mouvements de rotation et diminution de la force de serrage de la main gauche",
    expectedName: "pseudarthrose.*cubitus",
    expectedMinRate: 12,
    expectedMaxRate: 18,
    description: "Pseudarthrose du cubitus MND"
  },
  // ============================================================
  // FRACTURES-LUXATIONS : MONTEGGIA ET GALEAZZI (cas 17-20)
  // ============================================================
  {
    // Cas 17 : Monteggia - séquelles légères MD
    input: "séquelles de fracture-luxation de Monteggia du côté droit main dominante avec fracture du tiers supérieur du cubitus et luxation de la tête radiale traitée chirurgicalement par ostéosynthèse du cubitus et réduction de la luxation avec consolidation obtenue et récupération satisfaisante avec douleurs résiduelles modérées au coude et légère raideur en extension",
    expectedName: "monteggia|Monteggia",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Monteggia - séquelles légères MD"
  },
  {
    // Cas 18 : Monteggia - séquelles sévères avec raideur et instabilité MND
    input: "séquelles de fracture-luxation de Monteggia du côté gauche main non dominante avec raideur importante du coude et instabilité résiduelle de la tête radiale et limitation majeure de la prono-supination et douleurs chroniques invalidantes et impossibilité d'extension complète du coude limité à moins 30 degrés et flexion limitée à 100 degrés",
    expectedName: "monteggia|Monteggia",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Monteggia - séquelles sévères MND"
  },
  {
    // Cas 19 : Galeazzi - séquelles modérées MD
    input: "séquelles de fracture-luxation de Galeazzi du côté droit main dominante avec fracture du tiers inférieur du radius et luxation radio-cubitale inférieure traitée par ostéosynthèse avec limitation modérée de la prono-supination et douleurs lors des mouvements de rotation et instabilité radio-cubitale inférieure résiduelle",
    expectedName: "galeazzi|Galeazzi",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Galeazzi - séquelles modérées MD"
  },
  {
    // Cas 20 : Galeazzi - séquelles sévères MND
    input: "séquelles de fracture-luxation de Galeazzi du côté gauche main non dominante avec instabilité radio-cubitale inférieure chronique et limitation importante de la prono-supination avec supination bloquée à 30 degrés et douleurs chroniques au poignet et diminution de la force de serrage et gêne fonctionnelle importante dans les activités bimanuelles",
    expectedName: "galeazzi|Galeazzi",
    expectedMinRate: 8,
    expectedMaxRate: 20,
    description: "Galeazzi - séquelles sévères MND"
  },
  // ============================================================
  // SYNOSTOSE RADIO-CUBITALE (cas 21-22)
  // ============================================================
  {
    // Cas 21 : Synostose radio-cubitale - blocage en position neutre MD
    input: "synostose radio-cubitale post-traumatique de l'avant-bras droit main dominante suite à fracture des deux os avec fusion osseuse entre le radius et le cubitus au tiers moyen et blocage complet de la prono-supination en position neutre de fonction et impossibilité totale de tourner la paume de la main vers le haut ou le bas et adaptation des gestes quotidiens par compensation au niveau de l'épaule",
    expectedName: "synostose.*radio.cubitale|synostose",
    expectedMinRate: 15,
    expectedMaxRate: 25,
    description: "Synostose radio-cubitale - position neutre MD"
  },
  {
    // Cas 22 : Synostose radio-cubitale - blocage en pronation MND
    input: "synostose radio-cubitale post-traumatique de l'avant-bras gauche main non dominante avec pont osseux entre radius et cubitus bloquant complètement la prono-supination en position de pronation et impossibilité de mettre la paume de la main vers le haut et gêne fonctionnelle majeure pour les gestes nécessitant la supination",
    expectedName: "synostose.*radio.cubitale|synostose",
    expectedMinRate: 12,
    expectedMaxRate: 20,
    description: "Synostose radio-cubitale - blocage pronation MND"
  },
  // ============================================================
  // AMPUTATIONS DE L'AVANT-BRAS (cas 23-25)
  // ============================================================
  {
    // Cas 23 : Amputation avant-bras tiers supérieur MD
    input: "amputation de l'avant-bras droit main dominante au tiers supérieur juste sous le coude suite à un accident de machine industrielle avec moignon court et prothèse fonctionnelle adaptée et douleurs du moignon résiduelles et membre fantôme intermittent",
    expectedName: "amputation.*avant.bras.*tiers.*sup[eé]rieur|amputation.*l.avant.bras.*sup[eé]rieur",
    expectedMinRate: 65,
    expectedMaxRate: 70,
    description: "Amputation avant-bras tiers supérieur MD"
  },
  {
    // Cas 24 : Amputation avant-bras tiers moyen MND
    input: "amputation de l'avant-bras gauche main non dominante au tiers moyen suite à un écrasement par machine agricole avec appareillage prothétique et adaptation satisfaisante et douleurs résiduelles du moignon modérées",
    expectedName: "amputation.*avant.bras.*tiers.*moyen|amputation.*l.avant.bras.*moyen",
    expectedMinRate: 50,
    expectedMaxRate: 55,
    description: "Amputation avant-bras tiers moyen MND"
  },
  {
    // Cas 25 : Amputation avant-bras tiers inférieur MD
    input: "amputation de l'avant-bras droit main dominante au tiers inférieur proche du poignet suite à un accident de la voie publique avec moignon long permettant un bon appareillage prothétique mais perte de la fonction de préhension directe et douleurs neuropathiques du moignon",
    expectedName: "amputation.*avant.bras.*tiers.*inf[eé]rieur|amputation.*l.avant.bras.*inf[eé]rieur",
    expectedMinRate: 55,
    expectedMaxRate: 60,
    description: "Amputation avant-bras tiers inférieur MD"
  },
  // ============================================================
  // FRACTURE EXTRÉMITÉ INFÉRIEURE DU RADIUS / POUTEAU-COLLES (cas 26-28)
  // ============================================================
  {
    // Cas 26 : Fracture extrémité inférieure radius - consolidation parfaite MD
    input: "fracture de l'extrémité inférieure du radius droit main dominante type Pouteau-Colles par chute sur la paume de la main traitée par réduction et plâtre pendant 6 semaines avec consolidation parfaite sans déplacement résiduel et récupération complète des mobilités du poignet et de la prono-supination et douleurs minimes résiduelles",
    expectedName: "fracture.*extr[eé]mit[eé].*inf[eé]rieure.*radius.*S[eé]quelles|Pouteau|fracture.*radius.*consolidation",
    expectedMinRate: 3,
    expectedMaxRate: 10,
    description: "Fracture extr. inf. radius - consolidation parfaite MD"
  },
  {
    // Cas 27 : Fracture extrémité inférieure radius - limitation mouvements MD
    input: "fracture de l'extrémité inférieure du radius droit main dominante avec consolidation en léger déplacement et limitation des mouvements du poignet avec flexion palmaire à 40 degrés au lieu de 80 et extension dorsale à 50 degrés et douleurs à la mobilisation et diminution de la force de serrage et gêne dans les activités professionnelles nécessitant des mouvements répétitifs du poignet",
    expectedName: "fracture.*extr[eé]mit[eé].*inf[eé]rieure.*radius.*S[eé]quelles|fracture.*radius.*limitation|Pouteau",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Fracture extr. inf. radius - limitation mouvements MD"
  },
  {
    // Cas 28 : Fracture extrémité inférieure radius - raideur + déformation + troubles nerveux MND
    input: "fracture de l'extrémité inférieure du radius gauche main non dominante type Pouteau-Colles avec consolidation en cal vicieux et déformation en dos de fourchette et raideur importante du poignet et syndrome du canal carpien post-traumatique avec paresthésies des trois premiers doigts et troubles nerveux sensitifs de la main et diminution importante de la force de préhension",
    expectedName: "fracture.*extr[eé]mit[eé].*inf[eé]rieure.*radius.*S[eé]quelles|fracture.*radius.*raideur|Pouteau",
    expectedMinRate: 12,
    expectedMaxRate: 25,
    description: "Fracture extr. inf. radius - raideur + déformation + troubles nerveux MND"
  },
  // ============================================================
  // CAS PARTICULIERS (cas 29-30)
  // ============================================================
  {
    // Cas 29 : Pseudarthrose du radius MD (variante clinique)
    input: "pseudarthrose du radius droit main dominante après fracture diaphysaire avec absence de consolidation datant de plus d'un an et douleurs permanentes de l'avant-bras et limitation sévère de la prono-supination et amyotrophie de l'avant-bras et perte de force importante",
    expectedName: "pseudarthrose.*radius",
    expectedMinRate: 20,
    expectedMaxRate: 25,
    description: "Pseudarthrose du radius MD (variante: absence consolidation)"
  },
  {
    // Cas 30 : Fracture-luxation de Monteggia sévère MD (variante haut du barème)
    input: "séquelles graves de fracture-luxation de Monteggia du côté droit main dominante avec luxation invétérée de la tête radiale non réduite et raideur sévère du coude en flexion limitée à 90 degrés et extension déficitaire à moins 40 degrés et blocage complet de la prono-supination et instabilité majeure et douleurs chroniques invalidantes et impossibilité de port de charge",
    expectedName: "monteggia|Monteggia",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Monteggia - séquelles graves MD (haut du barème)"
  },
];

// ============================================================
// RUNNER  (identique aux autres suites)
// ============================================================

async function runTests() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  TEST 30 CAS : TRAUMATISMES DE L\'AVANT-BRAS (V3.3.313)');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const result = localExpertAnalysis(tc.input) as any;

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
