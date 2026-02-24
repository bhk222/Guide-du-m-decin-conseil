// Test 8 cas : lésions du genou avec fémur (V3.3.289)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedName: string;       // Nom barème attendu (partiel, regex-like)
  expectedMinRate: number;
  expectedMaxRate: number;
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : Fracture diaphysaire fémur avec raideur du genou séquellaire (cas classique)
    input: "fracture diaphysaire du fémur droit ostéosynthésée par clou centromédullaire avec cal vicieux en rotation externe de 10 degrés et raccourcissement de 1,5 cm avec raideur du genou homolatéral en flexion limitée à 110 degrés et douleurs mécaniques à la marche prolongée",
    expectedName: "fracture.*fémur|fémur.*raideur|diaphysaire",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture diaphysaire fémur + raideur genou séquellaire"
  },
  {
    // Cas 2 : Fracture extrémité inférieure du fémur avec raideur sévère du genou
    input: "fracture de l'extrémité inférieure du fémur gauche traitée chirurgicalement par plaque vissée avec raideur importante du genou en flexion limitée à 60 degrés et extension incomplète avec flessum de 10 degrés et gonarthrose fémoro-tibiale débutante sur les radiographies de contrôle",
    expectedName: "fracture.*inférieure.*fémur|extrémité.*inférieure|raideur.*genou",
    expectedMinRate: 15,
    expectedMaxRate: 30,
    description: "Fracture extrémité inférieure fémur + raideur sévère genou"
  },
  {
    // Cas 3 : Fracture plateau tibial avec séquelles méniscales et laxité
    input: "fracture du plateau tibial externe du genou droit traitée par ostéosynthèse avec enfoncement résiduel de 3 mm et déviation en valgus de 5 degrés avec lésion méniscale interne ayant nécessité une méniscectomie partielle et laxité résiduelle en valgus avec douleurs à la descente des escaliers",
    expectedName: "plateau.*tibi|méniscectomie|arthrose.*fémoro|genou",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture plateau tibial + méniscectomie + laxité"
  },
  {
    // Cas 4 : Fracture col fémoral avec raideur hanche ET gonarthrose post-traumatique
    input: "fracture du col du fémur gauche consolidée après ostéosynthèse par vis-plaque DHS avec raccourcissement du membre inférieur de 3 cm et raideur de la hanche avec limitation de la flexion à 80 degrés et rotation interne abolie et arthrose fémoro-tibiale du genou homolatéral secondaire à la boiterie avec douleurs mécaniques et épanchement articulaire récidivant",
    expectedName: "col.*fémur|hanche|gonarthrose|arthrose.*fémoro",
    expectedMinRate: 25,
    expectedMaxRate: 60,
    description: "Fracture col fémur + raideur hanche + gonarthrose genou"
  },
  {
    // Cas 5 : Rupture LCA du genou + fracture diaphysaire fémur homolatéral
    input: "rupture du ligament croisé antérieur du genou droit traitée par ligamentoplastie de type Kenneth-Jones avec laxité résiduelle antérieure et dérobements occasionnels à la marche en terrain accidenté associée à une fracture diaphysaire du fémur droit consolidée avec cal vicieux et raccourcissement de 2 cm et boiterie à la marche prolongée",
    expectedName: "ligament.*croisé|lca|laxité|fémur|diaphysaire",
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Rupture LCA genou + fracture diaphysaire fémur homolatéral"
  },
  {
    // Cas 6 : Fracture rotule + fracture fémur avec raideur globale du genou
    input: "fracture comminutive de la rotule droite traitée par haubanage avec gêne fonctionnelle résiduelle à la montée des escaliers et douleurs à l'agenouillement avec limitation de la flexion du genou à 90 degrés après fracture sus-condylienne du fémur homolatéral ostéosynthésée avec raideur importante du genou",
    expectedName: "rotule|fémur|raideur.*genou|arthrose|extrémité.*inférieure",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Fracture rotule + fracture sus-condylienne fémur"
  },
  {
    // Cas 7 : Gonarthrose sévère post-traumatique avec prothèse totale de genou sur fémur fracturé
    input: "séquelles de prothèse totale du genou gauche posée à la suite d'une gonarthrose post-traumatique sévère secondaire à une fracture de l'extrémité inférieure du fémur avec flexion du genou limitée à 80 degrés et douleurs persistantes nécessitant l'utilisation d'une canne pour les longs trajets et impossibilité de s'accroupir",
    expectedName: "prothèse.*genou|gonarthrose|genou",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Prothèse totale genou post-fracture fémur"
  },
  {
    // Cas 8 : Ankylose du genou sur fracture complexe du fémur distal
    input: "ankylose du genou droit en position de flexion à 20 degrés secondaire à une fracture articulaire complexe de l'extrémité inférieure du fémur avec impossibilité de flexion au-delà de 30 degrés et impossibilité d'extension complète avec amyotrophie quadricipitale marquée et nécessité d'utilisation de cannes anglaises pour la marche",
    expectedName: "ankylose.*genou|raideur|fémur",
    expectedMinRate: 25,
    expectedMaxRate: 50,
    description: "Ankylose genou sur fracture complexe fémur distal"
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
