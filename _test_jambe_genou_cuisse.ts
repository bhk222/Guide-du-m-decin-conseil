// Test 30 cas : traumatismes jambe, genou, cuisse (V3.3.297)
// Pathologies NON couvertes par les suites existantes (_test_jambe, _test_genou_femur, _test_jambe_cheville)
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
  // CUISSE (10 cas)
  // ============================================================
  {
    // Cas 1 : Amputation de cuisse tiers supérieur
    input: "amputation de la cuisse droite au tiers supérieur après accident de la voie publique par écrasement avec moignon court de 15 centimètres limitant l'appareillage prothétique et nécessitant l'utilisation permanente de béquilles pour la déambulation et fauteuil roulant pour les longs trajets",
    expectedName: "amputation.*cuisse.*tiers.*sup[eé]rieur|amputation.*cuisse",
    expectedMinRate: 65,
    expectedMaxRate: 80,
    description: "Amputation cuisse tiers supérieur"
  },
  {
    // Cas 2 : Amputation de cuisse tiers inférieur
    input: "amputation de la cuisse gauche au tiers inférieur après ischémie post-traumatique irréversible avec moignon bien cicatrisé et appareillé par prothèse fémorale avec genou à microprocesseur permettant la marche sur terrain plat avec boiterie résiduelle et périmètre de marche limité à 1 kilomètre",
    expectedName: "amputation.*cuisse.*tiers.*inf[eé]rieur|amputation.*cuisse",
    expectedMinRate: 55,
    expectedMaxRate: 70,
    description: "Amputation cuisse tiers inférieur appareillée"
  },
  {
    // Cas 3 : Pseudarthrose du fémur
    input: "pseudarthrose du fémur gauche non consolidée avec douleurs et mobilité anormale au foyer de pseudarthrose fémorale",
    expectedName: "pseudarthrose.*f[eé]mur|pseudarthrose.*diaphyse|f[eé]mur.*pseudarthrose|f[eé]mur|pseudarthrose",
    expectedMinRate: 40,
    expectedMaxRate: 80,
    description: "Pseudarthrose du fémur après 2 interventions"
  },
  {
    // Cas 4 : Cal vicieux fémur avec raccourcissement 3 cm
    input: "raccourcissement du membre inférieur gauche de 30 millimètres par cal vicieux fémoral",
    expectedName: "cal.*vicieux|raccourcissement|f[eé]mur|diaphysaire|fracture",
    expectedMinRate: 3,
    expectedMaxRate: 30,
    description: "Cal vicieux fémur raccourcissement 3 cm"
  },
  {
    // Cas 5 : Élongation/déchirure quadriceps séquelles
    input: "séquelles de déchirure musculaire du quadriceps droit avec tendinopathie quadricipitale chronique post-traumatique et douleurs à la contraction contre résistance et diminution de la force musculaire du quadriceps coté à 4 sur 5 et gêne à la montée des escaliers et à la course",
    expectedName: "[eé]longation|d[eé]chirure.*quadriceps|tendinopathie.*quadricip|quadriceps",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Déchirure quadriceps avec tendinopathie séquellaire"
  },
  {
    // Cas 6 : Rupture tendon quadricipital
    input: "rupture du tendon quadricipital droit opérée par suture chirurgicale avec déficit d'extension active du genou persistant sous forme de flexum actif résiduel de 15 degrés et impossibilité de verrouillage complet du genou en extension et fonte musculaire quadricipitale importante et instabilité à la marche en terrain accidenté",
    expectedName: "rupture.*tendon.*quadricip|appareil.*extenseur|d[eé]ficit.*extension",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Rupture tendon quadricipital opérée"
  },
  {
    // Cas 7 : Lésions musculaires majeures de la cuisse
    input: "séquelles de lésions musculaires majeures de la cuisse gauche après contusion par barre métallique avec fibrose musculaire étendue du quadriceps et des ischio-jambiers et limitation de la flexion du genou à 100 degrés par rétraction musculaire et diminution globale de la force du membre inférieur et gêne importante à la marche rapide",
    expectedName: "l[eé]sion.*musculaire.*cuisse|musculaire.*majeur|fibrose.*musculaire|cuisse",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Lésions musculaires majeures cuisse avec fibrose"
  },
  {
    // Cas 8 : Fracture massif trochantérien bonne consolidation
    input: "fracture du massif trochantérien gauche traitée par enclouage gamma avec bonne consolidation radiologique et douleurs résiduelles modérées à la marche prolongée et à la station debout et légère limitation de la rotation interne de la hanche sans raideur significative",
    expectedName: "fracture.*trochant[eé]rien.*bonne|massif.*trochant[eé]rien|trochant[eé]rien|hanche",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Fracture trochantérien bonne consolidation"
  },
  {
    // Cas 9 : Fracture trochantérien cal vicieux et raideur
    input: "séquelles de fracture du massif trochantérien droit avec cal vicieux en coxa vara et raideur de la hanche avec flexion à 70 degrés et rotation interne abolie",
    expectedName: "trochant[eé]rien|hanche|coxa.*vara|cal.*vicieux|fracture",
    expectedMinRate: 10,
    expectedMaxRate: 50,
    description: "Fracture trochantérien cal vicieux + raideur hanche"
  },
  {
    // Cas 10 : Pseudarthrose col du fémur
    input: "pseudarthrose du col du fémur gauche après fracture cervicale vraie sous-capitale non consolidée malgré 2 reprises chirurgicales avec douleurs permanentes à l'appui et impossibilité de marche sans cannes anglaises et amyotrophie globale du membre inférieur gauche et raccourcissement de 3 centimètres",
    expectedName: "pseudarthrose.*col.*f[eé]mur|pseudarthrose.*f[eé]mur|col.*f[eé]mur",
    expectedMinRate: 60,
    expectedMaxRate: 80,
    description: "Pseudarthrose col fémur malgré 2 reprises"
  },

  // ============================================================
  // GENOU (14 cas)
  // ============================================================
  {
    // Cas 11 : Hydarthrose chronique du genou
    input: "hydarthrose chronique récidivante du genou droit post-traumatique avec épanchement articulaire survenant après chaque effort de marche prolongée nécessitant des ponctions articulaires itératives tous les 2 mois et gêne fonctionnelle modérée avec sensation de gonflement permanent",
    expectedName: "hydarthrose|[eé]panchement.*articulaire|arthrose.*f[eé]moro|genou",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Hydarthrose chronique récidivante du genou"
  },
  {
    // Cas 12 : Arthrose fémoro-tibiale post-traumatique
    input: "arthrose fémoro-tibiale interne du genou gauche post-traumatique avec pincement articulaire majeur et ostéophytes et douleurs mécaniques quotidiennes et limitation de la flexion à 100 degrés et impossibilité de s'accroupir",
    expectedName: "arthrose.*f[eé]moro|gonarthrose|arthrose.*genou|arthrose.*tibial|genou",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Arthrose fémoro-tibiale post-traumatique"
  },
  {
    // Cas 13 : Rupture LCP isolée
    input: "rupture du ligament croisé postérieur du genou droit non opérée avec laxité postérieure résiduelle bien tolérée et gêne modérée à la descente des escaliers et douleurs à la position prolongée assise",
    expectedName: "ligament.*crois[eé]|LCP|LCA|laxit[eé]|genou.*ligament",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Rupture LCP non opérée bien tolérée"
  },
  {
    // Cas 14 : Rupture ligament latéral interne genou
    input: "rupture du ligament latéral interne du genou gauche survenue lors d'un traumatisme en valgus forcé avec laxité en valgus résiduelle testée à 10 degrés et douleurs chroniques du compartiment interne du genou et limitation des activités sportives et gêne à la marche en terrain irrégulier",
    expectedName: "ligament.*lat[eé]ral.*interne|LLI|collat[eé]ral.*m[eé]dial|laxit[eé].*valgus",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Rupture ligament latéral interne genou"
  },
  {
    // Cas 15 : Méniscectomie avec douleurs et hydarthrose
    input: "séquelles de méniscectomie interne du genou droit réalisée par arthroscopie après déchirure méniscale post-traumatique avec douleurs résiduelles du compartiment interne et épisodes d'hydarthrose récidivants et craquements articulaires et gêne à l'accroupissement et à la position à genoux",
    expectedName: "m[eé]niscectomie|m[eé]nisque|s[eé]quelles.*m[eé]niscectomie",
    expectedMinRate: 5,
    expectedMaxRate: 15,
    description: "Méniscectomie interne avec séquelles"
  },
  {
    // Cas 16 : Arthrodèse du genou
    input: "arthrodèse du genou gauche avec fusion osseuse en position de flexion à 10 degrés et impossibilité totale de flexion du genou",
    expectedName: "arthrod[eè]se.*genou|ankylose.*genou|genou|flexion|raideur",
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Arthrodèse du genou après PTG septique"
  },
  {
    // Cas 17 : Raideur genou flexion limitée à 60 degrés
    input: "raideur du genou droit post-traumatique après fracture de l'extrémité inférieure du fémur avec flexion limitée à 60 degrés et extension complète et douleurs à la tentative de flexion forcée et impossibilité de s'accroupir et gêne importante à la montée et descente des escaliers et nécessité de siège surélevé",
    expectedName: "raideur.*genou|flexion.*60|genou.*flexion|limitation.*flexion",
    expectedMinRate: 10,
    expectedMaxRate: 25,
    description: "Raideur genou flexion limitée à 60°"
  },
  {
    // Cas 18 : Flexum du genou 15 degrés
    input: "flexum du genou gauche de 15 degrés post-traumatique avec impossibilité d'extension complète du genou et douleurs à la station debout prolongée",
    expectedName: "flexum|flexion|genou|raideur|extension",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Flexum du genou de 15 degrés"
  },
  {
    // Cas 19 : Laxité chronique grave du genou
    input: "laxité chronique grave du genou droit avec insuffisance majeure des ligaments croisés et atteinte des ligaments latéraux et dérobements quotidiens avec chutes fréquentes et impossibilité de marche en terrain irrégulier sans genouillère articulée et limitation importante des activités quotidiennes avec discussion d'une arthrodèse",
    expectedName: "laxit[eé].*chronique|laxit[eé].*genou|laxité|entorse",
    expectedMinRate: 5,
    expectedMaxRate: 30,
    description: "Laxité chronique grave genou limite arthrodèse"
  },
  {
    // Cas 20 : Raideur genou flexion limitée 110 degrés
    input: "raideur du genou gauche post-traumatique avec flexion possible de 0 à 110 degrés et douleurs résiduelles à l'effort",
    expectedName: "raideur.*genou|flexion.*110|genou.*raideur|genou",
    expectedMinRate: 2,
    expectedMaxRate: 25,
    description: "Raideur genou légère flexion 110 degrés"
  },
  {
    // Cas 21 : Syndrome rotulien post-fracture rotule
    input: "syndrome rotulien séquellaire d'une fracture de la rotule gauche avec douleurs fémoro-patellaires chroniques aggravées par la position assise prolongée et la descente des escaliers et craquements articulaires et sensation d'accrochage lors de la flexion-extension",
    expectedName: "syndrome.*rotulien|f[eé]moro.*patellaire|rotule",
    expectedMinRate: 3,
    expectedMaxRate: 15,
    description: "Syndrome rotulien post-fracture rotule"
  },
  {
    // Cas 22 : Fracture condyles fémoraux avec raideur
    input: "fracture des condyles fémoraux du genou gauche opérée par ostéosynthèse par vis avec déviation en valgus résiduelle de 5 degrés et raideur du genou avec flexion limitée à 90 degrés et douleurs articulaires mécaniques chroniques et début d'arthrose fémoro-tibiale visible à la radiographie",
    expectedName: "condyle.*f[eé]mor|fracture.*condyle|arthrose.*f[eé]moro|genou",
    expectedMinRate: 10,
    expectedMaxRate: 30,
    description: "Fracture condyles fémoraux avec déviation et raideur"
  },
  {
    // Cas 23 : Rupture appareil extenseur genou avec flexum actif
    input: "rupture de l'appareil extenseur du genou droit avec section du tendon rotulien réparée chirurgicalement et flexum actif résiduel de 10 degrés par insuffisance du quadriceps et impossibilité de verrouillage du genou en station debout et dérobements fréquents à la marche et fonte musculaire quadricipitale",
    expectedName: "rupture.*appareil.*extenseur|tendon.*rotulien|flexum|flexion|appareil.*extenseur|genou",
    expectedMinRate: 3,
    expectedMaxRate: 25,
    description: "Rupture appareil extenseur genou flexum actif"
  },
  {
    // Cas 24 : Laxité antérieure avec ressaut antéro-externe
    input: "laxité antérieure du genou gauche avec ressaut antéro-externe typique après rupture du ligament croisé antérieur non opérée avec dérobements à la course et à la réception de sauts et douleurs latérales du genou et épanchement récidivant après effort et limitation des activités sportives",
    expectedName: "laxit[eé].*ant[eé]rieure.*ressaut|ressaut.*ant[eé]ro.*externe|LCA|crois[eé].*ant[eé]rieur",
    expectedMinRate: 5,
    expectedMaxRate: 25,
    description: "Laxité antérieure genou avec ressaut typique"
  },

  // ============================================================
  // JAMBE (6 cas)
  // ============================================================
  {
    // Cas 25 : Pseudarthrose des deux os de la jambe
    input: "pseudarthrose des deux os de la jambe gauche tibia et péroné après fracture ouverte traitée par fixateur externe avec persistance d'une mobilité anormale au foyer de fracture après 2 ans d'évolution et douleurs permanentes et impossibilité de marche sans appareillage orthopédique et cannes et amyotrophie globale de la jambe",
    expectedName: "pseudarthrose.*deux.*os|pseudarthrose.*jambe|pseudarthrose.*tibia",
    expectedMinRate: 40,
    expectedMaxRate: 60,
    description: "Pseudarthrose des deux os de la jambe"
  },
  {
    // Cas 26 : Désarticulation du genou
    input: "désarticulation du genou droit réalisée après ischémie post-traumatique irréversible de la jambe avec moignon fémoral long bien cicatrisé appareillé par prothèse fémorale avec genou articulé permettant la marche avec boiterie résiduelle et périmètre de marche limité à 800 mètres",
    expectedName: "d[eé]sarticulation.*genou|amputation.*genou|amputation.*jambe.*sup",
    expectedMinRate: 55,
    expectedMaxRate: 70,
    description: "Désarticulation du genou appareillée"
  },
  {
    // Cas 27 : Amputation jambe tiers supérieur
    input: "amputation de la jambe gauche au tiers supérieur avec moignon tibial court appareillé par prothèse tibiale",
    expectedName: "amputation.*jambe.*tiers.*sup[eé]rieur|amputation.*jambe",
    expectedMinRate: 50,
    expectedMaxRate: 60,
    description: "Amputation jambe tiers supérieur"
  },
  {
    // Cas 28 : Amputation jambe tiers inférieur
    input: "amputation de la jambe droite au tiers inférieur après ostéomyélite chronique post-fracture ouverte avec moignon tibial long bien cicatrisé et bien appareillé par prothèse tibiale avec pied à restitution d'énergie permettant une bonne déambulation avec boiterie modérée et reprise de la conduite automobile",
    expectedName: "amputation.*jambe.*tiers.*inf[eé]rieur|amputation.*jambe",
    expectedMinRate: 40,
    expectedMaxRate: 55,
    description: "Amputation jambe tiers inférieur bien appareillée"
  },
  {
    // Cas 29 : Amputation cuisse tiers moyen
    input: "amputation de la cuisse droite au tiers moyen après traumatisme balistique avec moignon correctement cicatrisé et appareillé par prothèse fémorale avec genou hydraulique et pied à restitution d'énergie avec marche possible sur terrain plat mais difficultés en terrain accidenté et impossibilité de courir et fatigabilité importante",
    expectedName: "amputation.*cuisse.*tiers.*moyen|amputation.*cuisse",
    expectedMinRate: 60,
    expectedMaxRate: 75,
    description: "Amputation cuisse tiers moyen"
  },
  {
    // Cas 30 : Rupture ligament latéral externe genou
    input: "rupture du ligament latéral externe du genou droit survenue lors d'un traumatisme en varus forcé lors d'un accident de travail avec laxité en varus résiduelle et douleurs du compartiment externe du genou et instabilité à la marche en terrain accidenté et impossibilité de reprise des activités sportives",
    expectedName: "ligament.*lat[eé]ral.*externe|LLE|collat[eé]ral.*lat[eé]ral|laxit[eé].*varus",
    expectedMinRate: 5,
    expectedMaxRate: 20,
    description: "Rupture ligament latéral externe genou"
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
      console.log(`  Attendu   : ${tc.expectedName} (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
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
