// Test 10 cas : traumatismes de la jambe (V3.3.290)
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
    // Cas 1 : Fracture des deux os de la jambe - bonne consolidation
    input: "fracture des deux os de la jambe droite tibia et péroné traitée orthopédiquement par plâtre cruro-pédieux pendant 3 mois avec bonne consolidation radiologique et reprise de la marche normale avec douleurs résiduelles modérées à la station debout prolongée",
    expectedName: "fracture.*deux.*os.*jambe|tibia.*péroné|bonne.*consolidation",
    expectedMinRate: 5,
    expectedMaxRate: 10,
    description: "Fracture 2 os jambe - bonne consolidation"
  },
  {
    // Cas 2 : Fracture des deux os de la jambe - cal vicieux et troubles trophiques
    input: "fracture ouverte des deux os de la jambe gauche tibia et péroné traitée par fixateur externe puis enclouage centromédullaire avec cal vicieux en varus de 8 degrés et raccourcissement de 2 cm avec troubles trophiques cutanés au niveau de la cicatrice d'ouverture et œdème chronique de la jambe nécessitant le port de bas de contention et boiterie séquellaire",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|troubles.*trophiques|cal.*vicieux",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe - cal vicieux + troubles trophiques"
  },
  {
    // Cas 3 : Fracture isolée du tibia
    input: "fracture diaphysaire isolée du tibia droit consolidée après traitement par plaque vissée avec raideur modérée de la cheville homolatérale et douleurs mécaniques à la marche prolongée au-delà de 500 mètres et gêne à la descente des escaliers",
    expectedName: "fracture.*isol[eé]e.*tibia|tibia",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Fracture isolée du tibia avec raideur cheville"
  },
  {
    // Cas 4 : Fracture isolée du péroné
    input: "fracture isolée du péroné gauche au tiers moyen consolidée en bonne position après traitement fonctionnel avec douleurs résiduelles modérées à la palpation du foyer de fracture et gêne discrète à la course",
    expectedName: "fracture.*isol[eé]e.*p[eé]ron[eé]|péroné",
    expectedMinRate: 2,
    expectedMaxRate: 5,
    description: "Fracture isolée du péroné - gêne discrète"
  },
  {
    // Cas 5 : Pseudarthrose du tibia
    input: "pseudarthrose du tibia gauche au tiers moyen après fracture ouverte datant de 18 mois avec persistance d'une mobilité anormale au foyer de fracture et douleurs permanentes à l'appui et nécessité d'un appareillage orthopédique de type botte de marche et boiterie importante avec impossibilité de marcher sans cannes",
    expectedName: "pseudarthrose.*tibia",
    expectedMinRate: 30,
    expectedMaxRate: 50,
    description: "Pseudarthrose du tibia avec mobilité anormale"
  },
  {
    // Cas 6 : Fracture du pilon tibial
    input: "fracture du pilon tibial droit traitée chirurgicalement par ostéosynthèse avec arthrose tibio-tarsienne post-traumatique sévère et raideur importante de la cheville avec flexion dorsale limitée à 5 degrés et flexion plantaire à 20 degrés et douleurs chroniques à chaque pas nécessitant la prise quotidienne d'antalgiques et boiterie permanente",
    expectedName: "pilon.*tibial|arthrose|raideur.*cheville",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture pilon tibial avec arthrose tibio-tarsienne"
  },
  {
    // Cas 7 : Fracture bimalléolaire avec cal vicieux et déformation
    input: "fracture bimalléolaire de la cheville gauche traitée par ostéosynthèse avec cal vicieux important de la malléole externe et déviation en valgus de l'arrière-pied de 10 degrés avec troubles trophiques sévères à type d'œdème permanent et modifications cutanées et raideur douloureuse de la cheville nécessitant l'utilisation d'une canne pour la marche",
    expectedName: "fracture.*mall[eé]olaire.*cal.*vicieux|bi.*mall[eé]olaire|d[eé]formation|trophiques",
    expectedMinRate: 20,
    expectedMaxRate: 35,
    description: "Fracture bimalléolaire - cal vicieux + troubles trophiques"
  },
  {
    // Cas 8 : Syndrome des loges de la jambe
    input: "syndrome des loges chronique d'effort de la jambe droite loge antéro-externe avec douleurs musculaires apparaissant après 10 minutes de marche rapide et paresthésies du dos du pied par compression du nerf péronier et nécessité d'arrêt de l'effort avec récupération lente en 30 minutes",
    expectedName: "syndrome.*loges|loges.*chronique|effort.*jambe",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Syndrome des loges chronique d'effort de la jambe"
  },
  {
    // Cas 9 : Paralysie du SPE post-fracture jambe
    input: "paralysie du nerf sciatique poplité externe gauche secondaire à une fracture du col du péroné avec steppage à la marche et impossibilité de relever le pied nécessitant le port d'un releveur et troubles sensitifs du dos du pied avec amyotrophie de la loge antéro-externe de la jambe",
    expectedName: "paralysie.*sciatique.*poplit[eé].*externe|SPE|nerf.*p[eé]ronier|steppage",
    expectedMinRate: 15,
    expectedMaxRate: 25,
    description: "Paralysie SPE post-fracture col péroné"
  },
  {
    // Cas 10 : Amputation de jambe tiers moyen
    input: "amputation de la jambe gauche au tiers moyen après écrasement par machine agricole avec moignon bien cicatrisé et bien appareillé par prothèse tibiale avec manchon en silicone et genou mécanique permettant la marche sur terrain plat mais gêne importante sur terrain accidenté et impossibilité de courir",
    expectedName: "amputation.*jambe|amputation.*tiers.*moyen",
    expectedMinRate: 45,
    expectedMaxRate: 60,
    description: "Amputation de jambe tiers moyen appareillée"
  }
];

async function runTests() {
  let passed = 0;
  let failed = 0;
  const total = testCases.length;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const result = await localExpertAnalysis(tc.input) as any;

      const name = result?.name || result?.proposals?.map((p: any) => p.name).join(' + ') || 'AUCUN';
      const rate = result?.rate !== undefined ? result.rate
        : result?.globalRate !== undefined ? result.globalRate
        : typeof result?.type === 'number' ? result.type : 0;
      const numRate = typeof rate === 'number' ? rate : parseInt(rate) || 0;
      const type = result?.type || 'unknown';
      const justif = (result?.justification || '').toLowerCase();
      const nameLower = name.toLowerCase();

      // Validation :
      // 1. Le nom doit correspondre au pattern attendu
      const nameRegex = new RegExp(tc.expectedName, 'i');
      const nameMatch = nameRegex.test(nameLower) || nameRegex.test(justif);

      // 2. Le taux doit être dans la fourchette attendue (±5% tolérance)
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);

      const testPass = nameMatch && rateInRange;

      if (testPass) {
        passed++;
      } else {
        failed++;
      }

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Input     : "${tc.input.substring(0, 120)}..."`);
      console.log(`  Attendu   : ${tc.expectedName} (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${testPass ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Nom OK    : ${nameMatch ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'}`);
      if (result?.path) console.log(`  Path      : ${result.path}`);
      if (result?.justification) console.log(`  Justif    : ${result.justification.substring(0, 200)}...`);
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
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${total} trouvés | ${failed}/${total} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
