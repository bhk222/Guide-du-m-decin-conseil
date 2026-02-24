// Test 10 cas : traumatismes jambe + cheville (V3.3.291)
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
    // Cas 1 : Fracture malléolaire bonne consolidation
    input: "fracture de la malléole externe de la cheville droite traitée par ostéosynthèse par vis et plaque avec bonne consolidation radiologique à 3 mois et reprise de la marche sans boiterie avec douleurs résiduelles modérées à la marche prolongée",
    expectedName: "fracture.*mall[eé]olaire.*bonne.*consoli|mall[eé]olaire.*consoli",
    expectedMinRate: 3,
    expectedMaxRate: 8,
    description: "Fracture malléolaire - bonne consolidation"
  },
  {
    // Cas 2 : Fracture bimalléolaire avec raideur modérée
    input: "fracture bimalléolaire de la cheville gauche traitée chirurgicalement par ostéosynthèse avec raideur modérée de la cheville en séquelle avec flexion dorsale limitée à 10 degrés et flexion plantaire à 30 degrés et douleurs chroniques à la marche au-delà de 300 mètres",
    expectedName: "fracture.*mall[eé]olaire.*raideur|mall[eé]olaire|raideur.*mod[eé]r[eé]e",
    expectedMinRate: 10,
    expectedMaxRate: 20,
    description: "Fracture bimalléolaire - raideur modérée cheville"
  },
  {
    // Cas 3 : Fracture pilon tibial avec arthrose tibio-tarsienne
    input: "fracture du pilon tibial droit traitée chirurgicalement par ostéosynthèse avec arthrose tibio-tarsienne post-traumatique sévère et raideur importante de la cheville avec flexion dorsale limitée à 5 degrés et flexion plantaire à 20 degrés et douleurs chroniques à chaque pas nécessitant prise quotidienne d'antalgiques et boiterie permanente",
    expectedName: "pilon.*tibial|fracture.*pilon",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture pilon tibial + arthrose tibio-tarsienne"
  },
  {
    // Cas 4 : Ankylose de la cheville post-fracture
    input: "ankylose de la cheville gauche en position à angle droit séquellaire d'une fracture bimalléolaire traitée par ostéosynthèse datant de 2 ans avec impossibilité totale de mobilisation de l'articulation tibio-tarsienne et douleurs à la marche sur terrain irrégulier",
    expectedName: "ankylose.*cheville|cheville.*ankylose",
    expectedMinRate: 20,
    expectedMaxRate: 30,
    description: "Ankylose cheville en angle droit post-fracture"
  },
  {
    // Cas 5 : Entorse grave cheville avec instabilité chronique
    input: "instabilité chronique de la cheville droite séquellaire d'une entorse grave avec rupture du ligament latéral externe survenue il y a 3 ans avec entorses à répétition trois à quatre fois par an nécessitant le port d'une chevillère et début d'arthrose de la cheville avec douleurs à la marche prolongée",
    expectedName: "instabilit[eé].*chronique.*cheville|entorse|cheville.*instabilit[eé]",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Entorse grave - instabilité chronique cheville"
  },
  {
    // Cas 6 : Rupture tendon d'Achille - séquelles opératoires
    input: "rupture du tendon d'Achille gauche opérée par suture chirurgicale il y a 18 mois avec séquelles à type de douleurs résiduelles à la palpation du tendon et perte de force en flexion plantaire avec impossibilité de se mettre sur la pointe du pied du côté atteint et gêne à la montée des escaliers et à la course",
    expectedName: "rupture.*tendon.*achille|achille.*s[eé]quelle|tendon.*achille",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Rupture tendon d'Achille - séquelles opératoires"
  },
  {
    // Cas 7 : Fracture calcanéum avec douleurs et boiterie
    input: "fracture du calcanéum droit par chute d'une hauteur de 3 mètres traitée orthopédiquement avec douleurs séquellaires importantes à chaque appui talonnier et boiterie permanente et impossibilité de marcher pieds nus sur sol dur et nécessité de port de semelles orthopédiques avec voûte et amortissement du talon",
    expectedName: "fracture.*calcan[eé]um|calcan[eé]um.*douleur|calcan[eé]um.*boiterie",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture calcanéum - douleurs et boiterie"
  },
  {
    // Cas 8 : Fracture des deux os de la jambe + raideur cheville
    input: "fracture des deux os de la jambe droite tibia et péroné traitée par enclouage centromédullaire avec cal vicieux en valgus de 5 degrés et troubles trophiques à type d'œdème vespéral chronique et raideur modérée de la cheville avec limitation de la flexion dorsale et boiterie nécessitant l'utilisation d'une canne pour les longs trajets",
    expectedName: "fracture.*deux.*os.*jambe.*cal.*vicieux|deux.*os.*troubles|cal.*vicieux",
    expectedMinRate: 15,
    expectedMaxRate: 40,
    description: "Fracture 2 os jambe cal vicieux + raideur cheville"
  },
  {
    // Cas 9 : Raideur cheville post-bimalléolaire avec claudication
    input: "raideur importante de la cheville droite séquellaire d'une fracture bimalléolaire opérée il y a 2 ans avec flexion dorsale nulle et flexion plantaire limitée à 15 degrés et claudication permanente à la marche nécessitant l'utilisation d'une canne et douleurs chroniques quotidiennes avec prise régulière d'antalgiques",
    expectedName: "raideur.*cheville.*bimall[eé]olaire.*claudication|raideur.*important.*cheville|raideur.*cheville",
    expectedMinRate: 12,
    expectedMaxRate: 25,
    description: "Raideur cheville post-bimalléolaire + claudication"
  },
  {
    // Cas 10 : Désarticulation de la cheville (Syme)
    input: "désarticulation de la cheville gauche type Syme après écrasement par engin de chantier avec moignon cicatrisé appareillé par prothèse de Syme permettant la déambulation avec boiterie résiduelle et impossibilité de courir et périmètre de marche limité à 500 mètres",
    expectedName: "d[eé]sarticulation.*cheville|amputation.*cheville|amputation.*jambe",
    expectedMinRate: 35,
    expectedMaxRate: 55,
    description: "Désarticulation de la cheville (Syme)"
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
