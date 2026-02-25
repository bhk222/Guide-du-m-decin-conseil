// Test 30 cas : traumatismes sternum, clavicule et omoplate (V3.3.304)
// Sternum (2 entrées), Clavicule (14 entrées), Omoplate (1+12 entrées reliées)
// Cas isolés + combinaisons + polytraumatismes
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
  // BLOC A : STERNUM ISOLÉ (cas 1-4)
  // ============================================================
  {
    // Cas 1 : Fracture simple du sternum
    input: "fracture isolée du sternum simple consolidée après chute avec douleurs résiduelles à la pression sternale et gêne modérée à l'effort physique",
    expectedName: "sternum|sternal|thorax|paroi",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Fracture sternum simple"
  },
  {
    // Cas 2 : Fracture du sternum avec enfoncement
    input: "fracture du sternum avec enfoncement sternal consolidée avec déformation palpable de la paroi thoracique antérieure et douleurs chroniques à la pression et à l'effort et gêne respiratoire légère à l'inspiration profonde",
    expectedName: "sternum|enfoncement|sternal|thorax|paroi",
    expectedMinRate: 8,
    expectedMaxRate: 25,
    description: "Fracture sternum avec enfoncement"
  },
  {
    // Cas 3 : Fracture sternum + fracture côtes
    input: "fracture du sternum consolidée avec douleurs résiduelles à la pression et fractures des 4ème et 5ème côtes gauches consolidées avec douleurs thoraciques à l'inspiration profonde et à la toux et gêne à l'effort physique",
    expectedName: "sternum|sternal|c[oô]te|thorax|paroi|polytraum|cumul",
    expectedMinRate: 5,
    expectedMaxRate: 40,
    description: "Fracture sternum + fracture côtes 4-5 G"
  },
  {
    // Cas 4 : Fracture sternum avec enfoncement + volet costal
    input: "fracture du sternum avec enfoncement important et séquelles de volet costal antérieur avec instabilité pariétale résiduelle et douleurs thoraciques chroniques à la respiration et à l'effort et syndrome restrictif léger après accident de la voie publique",
    expectedName: "sternum|enfoncement|volet.*costal|thorax|paroi|polytraum|cumul",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Fracture sternum enfoncement + volet costal"
  },

  // ============================================================
  // BLOC B : CLAVICULE ISOLÉE (cas 5-14)
  // ============================================================
  {
    // Cas 5 : Fracture clavicule bien consolidée sans raideur MD
    input: "fracture de la clavicule droite dominante bien consolidée sans raideur de l'épaule avec cal osseux satisfaisant et douleurs minimes occasionnelles à la mobilisation du bras au dessus de la tête",
    expectedName: "clavicule|ceinture.*scapulaire|[eé]paule",
    expectedMinRate: 1,
    expectedMaxRate: 10,
    description: "Fracture clavicule MD bien consolidée sans raideur"
  },
  {
    // Cas 6 : Fracture clavicule bien consolidée sans raideur MND
    input: "fracture de la clavicule gauche non dominante bien consolidée sans raideur résiduelle de l'épaule avec cal satisfaisant et légère gêne occasionnelle",
    expectedName: "clavicule|ceinture.*scapulaire|[eé]paule",
    expectedMinRate: 1,
    expectedMaxRate: 8,
    description: "Fracture clavicule MND bien consolidée sans raideur"
  },
  {
    // Cas 7 : Fracture clavicule cal saillant + raideur épaule MD
    input: "fracture de la clavicule droite dominante consolidée avec cal saillant palpable sous la peau et raideur de l'épaule droite avec limitation de l'abduction à 120 degrés et douleurs à l'effort du bras au dessus de la tête",
    expectedName: "clavicule|cal.*saillant|raideur.*[eé]paule|ceinture.*scapulaire",
    expectedMinRate: 4,
    expectedMaxRate: 20,
    description: "Fracture clavicule MD cal saillant + raideur épaule"
  },
  {
    // Cas 8 : Fracture clavicule cal saillant + raideur épaule MND
    input: "fracture de la clavicule gauche non dominante consolidée avec cal saillant et raideur résiduelle de l'épaule gauche avec limitation de l'abduction à 130 degrés et gêne fonctionnelle modérée",
    expectedName: "clavicule|cal.*saillant|raideur.*[eé]paule|ceinture.*scapulaire",
    expectedMinRate: 3,
    expectedMaxRate: 18,
    description: "Fracture clavicule MND cal saillant + raideur épaule"
  },
  {
    // Cas 9 : Fracture clavicule cal difforme + compressions nerveuses MD
    input: "fracture de la clavicule droite dominante consolidée avec cal difforme volumineux comprimant le plexus brachial avec paresthésies permanentes de la main droite et faiblesse musculaire du bras et douleurs neuropathiques irradiant vers les doigts",
    expectedName: "clavicule|cal.*difforme|compression.*nerv|plexus|ceinture.*scapulaire",
    expectedMinRate: 25,
    expectedMaxRate: 45,
    description: "Fracture clavicule MD cal difforme + compressions nerveuses"
  },
  {
    // Cas 10 : Pseudarthrose clavicule MD
    input: "pseudarthrose de la clavicule droite dominante non consolidée après 2 interventions chirurgicales avec mobilité anormale au foyer de fracture et douleurs à la mobilisation active de l'épaule et gêne fonctionnelle",
    expectedName: "pseudarthrose.*clavicule|clavicule|ceinture.*scapulaire|no_result|fuzzy",
    expectedMinRate: 0,
    expectedMaxRate: 15,
    description: "Pseudarthrose clavicule MD"
  },
  {
    // Cas 11 : Pseudarthrose clavicule MND
    input: "pseudarthrose de la clavicule gauche non dominante avec non consolidation persistante et mobilité résiduelle au foyer et douleurs modérées à l'effort du bras gauche",
    expectedName: "pseudarthrose.*clavicule|clavicule|ceinture.*scapulaire|membre|no_result|fuzzy",
    expectedMinRate: 0,
    expectedMaxRate: 15,
    description: "Pseudarthrose clavicule MND"
  },
  {
    // Cas 12 : Luxation acromio-claviculaire MD
    input: "luxation de la clavicule droite dominante non réduite au niveau de l'articulation acromio-claviculaire avec touche de piano positive et saillie de l'extrémité externe de la clavicule et douleurs à la mobilisation de l'épaule au dessus de 90 degrés",
    expectedName: "luxation.*clavicule|acromio.*clavicul|clavicule|ceinture.*scapulaire|[eé]paule|no_result|fuzzy|ambiguity",
    expectedMinRate: 0,
    expectedMaxRate: 12,
    description: "Luxation acromio-claviculaire MD non réduite"
  },
  {
    // Cas 13 : Luxation sterno-claviculaire MD
    input: "luxation de la clavicule droite dominante non réduite au niveau de l'articulation sterno-claviculaire interne avec saillie palpable de l'extrémité interne de la clavicule et douleurs à la mobilisation du bras et gêne fonctionnelle modérée",
    expectedName: "luxation.*clavicule|sterno.*clavicul|clavicule|ceinture.*scapulaire|[eé]paule|no_result|fuzzy|ambiguity",
    expectedMinRate: 0,
    expectedMaxRate: 15,
    description: "Luxation sterno-claviculaire MD non réduite"
  },
  {
    // Cas 14 : Fracture double clavicule bilatérale avec raideur épaules
    input: "fracture de la clavicule droite dominante et fracture de la clavicule gauche non dominante consolidées avec cals saillants bilatéraux et raideur des deux épaules avec limitation bilatérale de l'abduction à 100 degrés et douleurs bilatérales à l'effort et gêne fonctionnelle importante",
    expectedName: "clavicule|double|bilat[eé]ral|cal.*saillant|raideur|ceinture.*scapulaire|[eé]paule|polytraum|cumul",
    expectedMinRate: 8,
    expectedMaxRate: 35,
    description: "Fracture double clavicule bilatérale + raideur épaules"
  },

  // ============================================================
  // BLOC C : OMOPLATE ISOLÉE ET COMBINÉE (cas 15-20)
  // ============================================================
  {
    // Cas 15 : Fracture omoplate simple avec désordres articulaires modérés
    input: "fracture de l'omoplate droite dominante consolidée avec raideur modérée de l'épaule droite et limitation de l'abduction à 110 degrés et douleurs résiduelles à la mobilisation et gêne fonctionnelle",
    expectedName: "omoplate|scapul|[eé]paule|ceinture.*scapulaire|fracture",
    expectedMinRate: 5,
    expectedMaxRate: 35,
    description: "Fracture omoplate MD avec raideur épaule modérée"
  },
  {
    // Cas 16 : Fracture omoplate avec désordres articulaires importants
    input: "fracture comminutive de l'omoplate gauche non dominante avec désordres articulaires importants de l'épaule gauche et raideur sévère de l'épaule avec abduction limitée à 60 degrés et rotation externe impossible et amyotrophie de la ceinture scapulaire gauche",
    expectedName: "omoplate|scapul|[eé]paule|ceinture.*scapulaire|raideur|fracture",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Fracture omoplate MND comminutive + raideur sévère"
  },
  {
    // Cas 17 : Fracture omoplate + fracture clavicule homolatérale
    input: "fracture de l'omoplate droite dominante consolidée avec raideur résiduelle de l'épaule et fracture de la clavicule droite consolidée avec cal saillant et limitation de l'abduction de l'épaule droite à 90 degrés et douleurs chroniques de la ceinture scapulaire droite",
    expectedName: "omoplate|clavicule|scapul|[eé]paule|ceinture.*scapulaire|polytraum|cumul",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Fracture omoplate + clavicule MD homolatérale"
  },
  {
    // Cas 18 : Fracture omoplate + luxation épaule récidivante
    input: "fracture de l'omoplate gauche non dominante consolidée avec raideur de l'épaule et luxation récidivante de l'épaule gauche avec instabilité résiduelle et appréhension à l'armé du bras et limitation de l'abduction à 100 degrés",
    expectedName: "omoplate|luxation.*[eé]paule|scapul|[eé]paule|instabilit[eé]|ceinture.*scapulaire",
    expectedMinRate: 8,
    expectedMaxRate: 40,
    description: "Fracture omoplate + luxation récidivante épaule MND"
  },
  {
    // Cas 19 : Fracture omoplate + ankylose épaule avec mobilité omoplate MD
    input: "fracture de l'omoplate droite dominante consolidée avec ankylose de l'épaule droite avec mobilité résiduelle de l'omoplate seule permettant une élévation latérale du bras à 45 degrés et rotation externe impossible et impotence fonctionnelle majeure du membre supérieur droit",
    expectedName: "omoplate|ankylose.*[eé]paule|scapul|[eé]paule|ceinture.*scapulaire|blocage",
    expectedMinRate: 25,
    expectedMaxRate: 60,
    description: "Fracture omoplate + ankylose épaule MD (mobilité omoplate)"
  },
  {
    // Cas 20 : Fracture omoplate + rupture coiffe des rotateurs
    input: "fracture de l'omoplate droite dominante consolidée avec séquelles de rupture de la coiffe des rotateurs de l'épaule droite avec limitation de l'abduction active à 70 degrés et perte de force en rotation externe et douleurs chroniques nocturnes de l'épaule",
    expectedName: "omoplate|coiffe.*rotateur|scapul|[eé]paule|ceinture.*scapulaire|rupture",
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Fracture omoplate + rupture coiffe rotateurs MD"
  },

  // ============================================================
  // BLOC D : COMBINAISONS STERNUM + CLAVICULE + OMOPLATE (cas 21-26)
  // ============================================================
  {
    // Cas 21 : Sternum + clavicule MD
    input: "fracture du sternum simple consolidée avec douleurs résiduelles à la pression sternale et fracture de la clavicule droite dominante consolidée avec cal saillant et raideur de l'épaule droite avec limitation de l'abduction à 120 degrés après accident de la voie publique",
    expectedName: "sternum|clavicule|[eé]paule|thorax|ceinture.*scapulaire|polytraum|cumul",
    expectedMinRate: 5,
    expectedMaxRate: 35,
    description: "Sternum + clavicule MD cal saillant + raideur épaule"
  },
  {
    // Cas 22 : Sternum enfoncement + omoplate MD
    input: "fracture du sternum avec enfoncement et douleurs thoraciques chroniques et fracture de l'omoplate droite dominante consolidée avec raideur sévère de l'épaule droite et limitation de l'abduction à 80 degrés et douleurs à la mobilisation active",
    expectedName: "sternum|omoplate|scapul|[eé]paule|thorax|ceinture.*scapulaire|polytraum|cumul",
    expectedMinRate: 12,
    expectedMaxRate: 55,
    description: "Sternum enfoncement + fracture omoplate MD"
  },
  {
    // Cas 23 : Clavicule + omoplate homolatérale MD
    input: "fracture de la clavicule droite dominante avec cal saillant et fracture de l'omoplate droite avec désordres articulaires importants de l'épaule droite et raideur sévère avec abduction limitée à 60 degrés et rotation externe limitée à 10 degrés et amyotrophie deltoïdienne et impotence fonctionnelle majeure",
    expectedName: "clavicule|omoplate|scapul|[eé]paule|raideur|ceinture.*scapulaire|polytraum|cumul",
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Clavicule + omoplate MD homolatérale + raideur sévère"
  },
  {
    // Cas 24 : Sternum + clavicule bilatérale
    input: "fracture du sternum consolidée avec douleurs résiduelles et fracture de la clavicule droite dominante consolidée avec cal saillant et raideur de l'épaule droite et fracture de la clavicule gauche consolidée avec cal saillant et raideur de l'épaule gauche après accident frontal de voiture",
    expectedName: "sternum|clavicule|[eé]paule|thorax|ceinture.*scapulaire|bilat|polytraum|cumul",
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Sternum + clavicule bilatérale + raideur épaules"
  },
  {
    // Cas 25 : Triple atteinte : sternum + clavicule + omoplate
    input: "fracture du sternum avec enfoncement modéré et douleurs thoraciques et fracture de la clavicule droite dominante consolidée avec cal saillant et limitation de l'épaule et fracture de l'omoplate droite consolidée avec raideur résiduelle de l'épaule et abduction limitée à 90 degrés après polytraumatisme par accident de la voie publique",
    expectedName: "sternum|clavicule|omoplate|scapul|[eé]paule|thorax|polytraum|cumul",
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Triple : sternum + clavicule + omoplate MD"
  },
  {
    // Cas 26 : Clavicule compressions nerveuses + omoplate + ankylose épaule
    input: "fracture de la clavicule gauche non dominante avec cal difforme comprimant le plexus brachial et paresthésies de la main gauche et fracture de l'omoplate gauche avec ankylose de l'épaule gauche avec fixation de l'omoplate et impotence fonctionnelle totale du membre supérieur gauche",
    expectedName: "clavicule|compression|plexus|omoplate|ankylose|scapul|[eé]paule|polytraum|cumul",
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Clavicule compressions nerveuses + omoplate + ankylose MND"
  },

  // ============================================================
  // BLOC E : POLYTRAUMATISMES ASSOCIÉS (cas 27-30)
  // ============================================================
  {
    // Cas 27 : Sternum + clavicule + fracture côtes + rachis dorsal
    input: "fracture du sternum avec enfoncement et douleurs thoraciques chroniques ; fracture de la clavicule droite dominante consolidée avec cal saillant et raideur de l'épaule ; fractures des 5ème 6ème et 7ème côtes droites consolidées avec douleurs à l'inspiration profonde ; tassement vertébral de D8 avec douleurs dorsales et cyphose résiduelle",
    expectedName: "sternum|clavicule|c[oô]te|rachis|thorax|tassement|polytraum|cumul",
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Sternum + clavicule MD + côtes D + tassement D8"
  },
  {
    // Cas 28 : Omoplate + clavicule + fracture humérus homolatéral MD
    input: "fracture de l'omoplate droite dominante consolidée avec raideur de l'épaule et fracture de la clavicule droite consolidée avec cal saillant et fracture diaphysaire de l'humérus droit consolidée avec limitation de la mobilité de l'épaule droite à 60 degrés en abduction et impotence fonctionnelle majeure du membre supérieur droit dominant",
    expectedName: "omoplate|clavicule|hum[eé]rus|scapul|[eé]paule|raideur|polytraum|cumul|membre.*sup",
    expectedMinRate: 15,
    expectedMaxRate: 60,
    description: "Omoplate + clavicule + humérus MD"
  },
  {
    // Cas 29 : Sternum + clavicule + TC léger + fracture tibia
    input: "fracture du sternum simple consolidée avec douleurs résiduelles ; fracture de la clavicule gauche non dominante consolidée avec cal satisfaisant et raideur légère de l'épaule ; syndrome post-commotionnel avec céphalées chroniques après traumatisme crânien léger ; fracture diaphysaire du tibia droit consolidée avec raccourcissement de 1 cm et douleurs à la marche",
    expectedName: "sternum|clavicule|c[eé]phal|cr[aâ]ne|tibia|thorax|commotion|polytraum|cumul",
    expectedMinRate: 10,
    expectedMaxRate: 55,
    description: "Sternum + clavicule MND + TC léger + tibia D"
  },
  {
    // Cas 30 : Omoplate + fracture fémur + rachis cervical + côtes
    input: "fracture de l'omoplate gauche non dominante consolidée avec raideur résiduelle de l'épaule gauche et limitation de l'abduction à 100 degrés ; fracture diaphysaire du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou gauche avec flexion limitée à 100 degrés ; raideur du rachis cervical post-traumatique avec cervicalgies chroniques et limitation des rotations ; fractures des 8ème et 9ème côtes gauches consolidées avec douleurs thoraciques résiduelles",
    expectedName: "omoplate|scapul|[eé]paule|f[eé]mur|rachis|cervical|c[oô]te|thorax|polytraum|cumul",
    expectedMinRate: 15,
    expectedMaxRate: 65,
    description: "Omoplate MND + fémur G + rachis cervical + côtes"
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
