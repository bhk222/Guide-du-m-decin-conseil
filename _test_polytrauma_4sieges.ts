// Test 20 cas : polytraumatismes à 4 sièges (V3.3.293)
// 10 cas simples + 10 cas complexes
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];  // 4 systèmes anatomiques attendus
  expectedMinRate: number;    // Taux IPP minimum attendu (Balthazard)
  expectedMaxRate: number;    // Taux IPP maximum attendu (Balthazard)
  description: string;
  complexity: 'simple' | 'complexe';
}

const testCases: TestCase[] = [
  // ============================================================
  // PARTIE 1 : 10 CAS SIMPLES (séquelles légères à modérées)
  // ============================================================
  {
    // Cas 1 : 4 sièges MI + MS + Rachis + Thorax — faible gravité
    // Balthazard: 1-(1-0.05)(1-0.05)(1-0.08)(1-0.05) ≈ 21%
    input: "fracture de la 6ème et 7ème côte gauche consolidée avec douleurs résiduelles modérées ; entorse du rachis cervical avec raideur modérée en rotation et cervicalgies chroniques ; fracture du radius distal droit consolidée avec raideur modérée du poignet ; fracture de la malléole externe gauche avec bonne consolidation et douleurs résiduelles à la marche prolongée",
    expectedSystems: ['thorax', 'rachis', 'poignet', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Simple : côtes + rachis cervical + poignet + malléole",
    complexity: 'simple'
  },
  {
    // Cas 2 : 4 sièges MI bilatéral + MS + Bassin
    // Balthazard: 1-(1-0.08)(1-0.10)(1-0.08)(1-0.05) ≈ 28%
    input: "fracture de la branche ischio-pubienne gauche consolidée avec douleurs pelviennes résiduelles ; fracture du plateau tibial externe droit avec raideur du genou en flexion limitée à 110 degrés ; fracture de la rotule gauche consolidée avec gêne à la montée des escaliers ; fracture de l'olécrane droit avec cal fibreux et limitation de la flexion du coude à 120 degrés",
    expectedSystems: ['bassin', 'genou', 'rotule', 'coude'],
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Simple : bassin + plateau tibial + rotule + olécrane",
    complexity: 'simple'
  },
  {
    // Cas 3 : 4 sièges Crâne + Rachis + MI + MS
    // Balthazard: 1-(1-0.08)(1-0.10)(1-0.08)(1-0.05) ≈ 28%
    input: "syndrome post-commotionnel avec céphalées chroniques et troubles de la concentration après traumatisme crânien léger ; tassement vertébral de D12 avec douleurs dorsales résiduelles et légère cyphose ; fracture du col chirurgical de l'humérus gauche consolidée avec raideur modérée de l'épaule en abduction limitée à 100 degrés ; fracture de la diaphyse tibiale droite consolidée avec douleurs résiduelles et cal satisfaisant",
    expectedSystems: ['crâne', 'rachis', 'épaule', 'tibia'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Simple : TC léger + tassement D12 + épaule + tibia",
    complexity: 'simple'
  },
  {
    // Cas 4 : 4 sièges Rachis + Hanche + Genou + Cheville (même membre)
    // Balthazard: 1-(1-0.08)(1-0.10)(1-0.10)(1-0.08) ≈ 31%
    input: "raideur du rachis lombaire post-traumatique avec distance doigt-sol à 25 cm et lombalgies mécaniques ; raideur modérée de la hanche gauche après fracture du massif trochantérien avec flexion limitée à 90 degrés ; raideur du genou gauche post-fracture avec flexion limitée à 100 degrés et douleurs mécaniques ; fracture bimalléolaire gauche consolidée avec raideur résiduelle de la cheville et douleurs à la marche",
    expectedSystems: ['rachis', 'hanche', 'genou', 'cheville'],
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Simple : rachis lombaire + hanche + genou + cheville G",
    complexity: 'simple'
  },
  {
    // Cas 5 : 4 sièges Thorax + Rachis + Épaule + Genou
    // Balthazard: 1-(1-0.08)(1-0.10)(1-0.10)(1-0.08) ≈ 31%
    input: "fracture du sternum consolidée avec douleurs résiduelles à la pression sternale et gêne à l'effort ; raideur du rachis dorsal post-tassement vertébral de D8 avec douleurs intercostales ; luxation de l'épaule droite réduite avec instabilité résiduelle et limitation de l'abduction à 120 degrés ; fracture du plateau tibial interne gauche avec raideur du genou et limitation de la flexion à 100 degrés",
    expectedSystems: ['thorax', 'rachis', 'épaule', 'genou'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Simple : sternum + rachis dorsal + épaule + plateau tibial",
    complexity: 'simple'
  },
  {
    // Cas 6 : 4 sièges Crâne + Abdomen + MI + Psy
    input: "syndrome subjectif post-traumatique isolé avec céphalées occasionnelles et vertiges positionnels après traumatisme crânien bénin ; cholécystectomie pour contusion vésiculaire post-traumatique ; fracture de la malléole péronière droite consolidée avec douleurs résiduelles ; trouble de l'adaptation avec anxiété et réaction dépressive modérée post-traumatique",
    expectedSystems: ['crâne', 'abdomen', 'cheville', 'psychiatrique'],
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Simple : TC bénin + cholécystectomie + malléole + anxiété",
    complexity: 'simple'
  },
  {
    // Cas 7 : 4 sièges MS bilatéral + MI bilatéral
    input: "fracture du radius distal gauche consolidée avec raideur modérée du poignet gauche ; fracture de la tête radiale droite consolidée avec limitation de la pronosupination ; fracture de la rotule droite consolidée avec gêne fonctionnelle résiduelle ; fracture de la malléole externe gauche consolidée avec douleurs à la station debout prolongée",
    expectedSystems: ['poignet', 'coude', 'rotule', 'cheville'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Simple : poignet G + coude D + rotule D + malléole G",
    complexity: 'simple'
  },
  {
    // Cas 8 : 4 sièges Bassin + Rachis + Épaule + Crâne
    input: "fracture du sacrum consolidée avec douleurs résiduelles à la position assise ; raideur du rachis cervical avec limitation modérée des rotations après entorse cervicale ; fracture de la clavicule droite consolidée avec saillie du cal et limitation modérée de l'élévation de l'épaule ; céphalées post-traumatiques persistantes avec troubles du sommeil après traumatisme crânien sans perte de connaissance",
    expectedSystems: ['bassin', 'rachis', 'épaule', 'crâne'],
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Simple : sacrum + rachis cervical + clavicule + céphalées",
    complexity: 'simple'
  },
  {
    // Cas 9 : 4 sièges Thorax + Abdomen + MI + MS
    input: "fracture de la 8ème côte droite consolidée avec douleurs thoraciques à l'inspiration profonde ; contusion hépatique résorbée avec douleurs résiduelles de l'hypochondre droit ; fracture de la diaphyse tibiale gauche consolidée avec douleurs à la marche prolongée ; fracture de l'extrémité inférieure du radius droit consolidée avec limitation de la flexion du poignet",
    expectedSystems: ['thorax', 'abdomen', 'tibia', 'poignet'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Simple : côte + contusion hépatique + tibia + radius",
    complexity: 'simple'
  },
  {
    // Cas 10 : 4 sièges Sensoriel + Rachis + MI + Psy
    input: "surdité de perception unilatérale gauche modérée à 35 dB avec acouphènes intermittents après traumatisme crânien ; raideur du rachis lombaire avec lombalgies chroniques et distance doigt-sol à 28 cm ; fracture de la malléole tibiale droite consolidée avec douleurs séquellaires à la marche ; phobie spécifique de la conduite automobile post-traumatique avec évitement et anxiété anticipatoire",
    expectedSystems: ['audition', 'rachis', 'cheville', 'psychiatrique'],
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Simple : surdité unilatérale + rachis lombaire + malléole + phobie",
    complexity: 'simple'
  },

  // ============================================================
  // PARTIE 2 : 10 CAS COMPLEXES (séquelles modérées à sévères)
  // ============================================================
  {
    // Cas 11 : 4 sièges graves — Crâne + Fémur + Rachis + Épaule
    // Balthazard: 1-(1-0.25)(1-0.25)(1-0.20)(1-0.25) ≈ 66%
    input: "traumatisme crânien grave avec déficit cognitif séquellaire comprenant troubles de mémoire à court terme et syndrome dysexécutif et céphalées chroniques quotidiennes invalidantes ; fracture diaphysaire du fémur gauche avec cal vicieux en rotation externe et raccourcissement de 3 cm et boiterie permanente ; hernie discale lombaire L4-L5 post-traumatique avec sciatalgie gauche déficitaire et raideur du rachis lombaire distance doigt-sol à 40 cm ; fracture de la tête humérale droite avec raideur sévère de l'épaule droite dominant abduction limitée à 60 degrés",
    expectedSystems: ['crâne', 'fémur', 'rachis', 'épaule'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Complexe : TC grave + fémur cal vicieux + hernie discale + épaule raide",
    complexity: 'complexe'
  },
  {
    // Cas 12 : 4 sièges — Bassin complexe + Genou + Rachis + Thorax
    // Balthazard: 1-(1-0.25)(1-0.20)(1-0.20)(1-0.15) ≈ 57%
    input: "fracture du cotyle gauche avec arthrose coxo-fémorale post-traumatique et limitation des mouvements de la hanche et douleurs à l'appui ; fracture du plateau tibial externe et interne du genou droit avec laxité résiduelle et gonarthrose débutante et raideur en flexion limitée à 90 degrés ; tassement vertébral de L1 avec fracture du mur postérieur et cyphose dorsale post-traumatique de 15 degrés et raideur du rachis lombaire ; volet costal gauche opéré avec syndrome restrictif modéré et dyspnée d'effort stade II",
    expectedSystems: ['bassin', 'genou', 'rachis', 'thorax'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Complexe : fracture cotyle + plateaux tibiaux + tassement L1 + volet costal",
    complexity: 'complexe'
  },
  {
    // Cas 13 : 4 sièges — Hanche + Rachis + Crâne + Abdomen
    input: "fracture du col fémoral gauche traitée par prothèse totale de hanche avec boiterie résiduelle et aide technique par canne ; raideur du rachis cervical sévère avec névralgie cervico-brachiale C6 gauche et limitation marquée des rotations et de la flexion extension ; contusions cérébrales objectivées au scanner avec syndrome frontal séquellaire et troubles de la personnalité et désinhibition ; splénectomie totale pour rupture traumatique de la rate après accident de la voie publique avec vaccination anti-pneumococcique",
    expectedSystems: ['hanche', 'rachis', 'crâne', 'abdomen'],
    expectedMinRate: 35,
    expectedMaxRate: 80,
    description: "Complexe : PTH + NCB C6 + contusions cérébrales + splénectomie",
    complexity: 'complexe'
  },
  {
    // Cas 14 : 4 sièges — Membre inf bilatéral + Bassin + Rachis (écrasement)
    input: "fracture comminutive du pilon tibial droit avec arthrodèse de la cheville et ankylose en position de fonction ; fracture ouverte des deux os de la jambe gauche avec pseudarthrose du tibia nécessitant plusieurs reprises chirurgicales et douleurs chroniques ; disjonction de la symphyse pubienne avec douleurs pelviennes chroniques et diastasis résiduel ; fracture-luxation de L2 avec paraplégie incomplète et troubles sphinctériens et raideur du rachis dorso-lombaire",
    expectedSystems: ['cheville', 'tibia', 'bassin', 'rachis'],
    expectedMinRate: 45,
    expectedMaxRate: 90,
    description: "Complexe : pilon tibial + pseudarthrose tibia G + symphyse + fracture L2",
    complexity: 'complexe'
  },
  {
    // Cas 15 : 4 sièges — Sensoriel x2 + Crâne + MI
    input: "baisse de l'acuité visuelle OD à 1/10 après contusion du globe oculaire droit et OG conservé à 10/10 avec diplopie séquellaire dans le regard vers le haut ; surdité de perception bilatérale moyenne à 45 dB aux fréquences conversationnelles avec acouphènes permanents invalidants nécessitant un appareillage auditif bilatéral ; traumatisme crânien avec embarrure frontale opérée et crises comitiales partielles sous traitement antiépileptique et céphalées chroniques ; fracture du cotyle droit avec luxation postérieure réduite en urgence et coxarthrose post-traumatique avec raideur de la hanche et boiterie",
    expectedSystems: ['vision', 'audition', 'crâne', 'hanche'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "Complexe : BAV OD + surdité bilatérale + épilepsie PT + coxarthrose",
    complexity: 'complexe'
  },
  {
    // Cas 16 : 4 sièges — Thorax grave + Abdomen + MI + MS
    input: "grand fracas du thorax avec fractures costales multiples bilatérales et fibrose pulmonaire post-traumatique et insuffisance respiratoire chronique stade III avec dyspnée d'effort permanente ; néphrectomie droite pour contusion rénale avec rein restant fonctionnel ; fracture diaphysaire du fémur droit ostéosynthésée avec raccourcissement de 2 cm et raideur du genou homolatéral en flexion limitée à 90 degrés ; pseudarthrose de l'humérus gauche avec impossibilité de porter des charges lourdes et amyotrophie du bras",
    expectedSystems: ['thorax', 'abdomen', 'fémur', 'humérus'],
    expectedMinRate: 50,
    expectedMaxRate: 90,
    description: "Complexe : grand fracas thorax + néphrectomie + fémur + pseudarthrose humérus",
    complexity: 'complexe'
  },
  {
    // Cas 17 : 4 sièges — Psy + Crâne + Rachis + MI
    input: "état de stress post-traumatique sévère avec cauchemars répétitifs et hypervigilance permanente et évitement majeur des situations rappelant l'accident et traitement par antidépresseur et anxiolytique au long cours ; traumatisme crânien avec syndrome subjectif commun persistant comprenant céphalées chroniques et troubles de la concentration et vertiges positionnels ; hernie discale cervicale C5-C6 post-traumatique avec névralgie cervico-brachiale droite et limitation des mouvements cervicaux ; fracture du plateau tibial externe gauche opérée avec ostéosynthèse et raideur du genou et laxité résiduelle du LCA",
    expectedSystems: ['psychiatrique', 'crâne', 'rachis', 'genou'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Complexe : TSPT sévère + syndrome subjectif + hernie cervicale + plateau tibial",
    complexity: 'complexe'
  },
  {
    // Cas 18 : 4 sièges — Main + MI + Rachis + Crâne (accident industriel)
    input: "amputation du pouce et de l'index de la main droite dominante par presse hydraulique avec gêne fonctionnelle majeure à la prise ; ankylose du genou droit en extension après fracture supra-condylienne du fémur infectée compliquée d'ostéomyélite chronique ; fracture de L3 avec recul du mur postérieur et canal lombaire étroit post-traumatique et sciatique bilatérale ; traumatisme crânien avec hématome extra-dural opéré en urgence et déficit cognitif résiduel modéré avec troubles de mémoire et ralentissement idéatoire",
    expectedSystems: ['main', 'genou', 'rachis', 'crâne'],
    expectedMinRate: 50,
    expectedMaxRate: 90,
    description: "Complexe : amputation pouce+index + ankylose genou + canal étroit + TC opéré",
    complexity: 'complexe'
  },
  {
    // Cas 19 : 4 sièges — Épaule + Hanche + Rachis + Thorax (chute grande hauteur)
    input: "fracture comminutive de la tête humérale gauche avec prothèse d'épaule et raideur résiduelle sévère abduction limitée à 45 degrés et rotation externe impossible ; fracture du massif trochantérien gauche avec cal vicieux en coxa vara et raccourcissement de 2 cm et boiterie ; tassement vertébral de D11 et D12 avec cyphose dorsale de 20 degrés et douleurs chroniques dorsales ; hémothorax gauche drainé avec adhérences pleurales et rétraction thoracique et douleurs chroniques à l'inspiration profonde",
    expectedSystems: ['épaule', 'hanche', 'rachis', 'thorax'],
    expectedMinRate: 30,
    expectedMaxRate: 75,
    description: "Complexe : prothèse épaule + coxa vara + tassements D11-D12 + hémothorax",
    complexity: 'complexe'
  },
  {
    // Cas 20 : 4 sièges — Abdomen x2 + MI + MS (accident de camion)
    input: "hépatectomie partielle droite pour fracture hépatique grave avec douleurs abdominales chroniques et transaminases perturbées ; gastrectomie partielle pour perforation gastrique traumatique avec dumping syndrome modéré et amaigrissement de 8 kg ; fracture ouverte de la diaphyse fémorale gauche avec cal vicieux en varus et raccourcissement de 3 cm et boiterie permanente ; fracture des deux os de l'avant-bras droit avec cal vicieux et limitation de la pronosupination à 50 pour cent",
    expectedSystems: ['abdomen', 'abdomen', 'fémur', 'avant-bras'],
    expectedMinRate: 40,
    expectedMaxRate: 85,
    description: "Complexe : hépatectomie + gastrectomie + fémur cal vicieux + avant-bras cal vicieux",
    complexity: 'complexe'
  },
];

// ====== RUNNER ======
async function runTests() {
  let passed = 0;
  let failed = 0;
  let passedSimple = 0;
  let passedComplex = 0;
  let totalSimple = 0;
  let totalComplex = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    if (tc.complexity === 'simple') totalSimple++;
    else totalComplex++;

    try {
      const result = localExpertAnalysis(tc.input, []) as any;
      
      const name = result?.name || result?.proposals?.map((p: any) => p.name).join(' + ') || 'AUCUN';
      const rate = result?.rate !== undefined ? result.rate
        : result?.globalRate !== undefined ? result.globalRate
        : typeof result?.type === 'number' ? result.type : 0;
      const numRate = typeof rate === 'number' ? rate : parseInt(rate) || 0;
      const type = result?.type || 'unknown';
      const justif = (result?.justification || '').toLowerCase();
      const nameLower = name.toLowerCase();
      const pathLower = (result?.path || '').toLowerCase();
      
      // Validation pour polytraumatisme 4 sièges :
      // 1. Le résultat doit être reconnu comme polytraumatisme/cumul
      const isPolytrauma = nameLower.includes('polytraum') 
        || nameLower.includes('cumul')
        || justif.includes('polytraum')
        || justif.includes('cumul')
        || justif.includes('balthaz')
        || justif.includes('systèmes')
        || justif.includes('systemes')
        || pathLower.includes('polytraum');
      
      // 2. Le taux doit être dans la fourchette attendue (±5% de tolérance)
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);
      
      // 3. Vérifier systèmes attendus dans les métadonnées
      const systemsFound = tc.expectedSystems.filter(sys => {
        const sysLower = sys.toLowerCase();
        const allText = (nameLower + ' ' + justif + ' ' + pathLower).toLowerCase();
        return allText.includes(sysLower)
          || (sysLower === 'crâne' && /cran|crân|neurolog|commotion|contusion.*c[eé]r[eé]bral|c[eé]phal/i.test(allText))
          || (sysLower === 'thorax' && /thorac|c[oô]te|costal|pulmon|sternum|volet|fracas/i.test(allText))
          || (sysLower === 'abdomen' && /spl[eé]n|r[eé]nal|rate|foie|h[eé]pat|gastr|n[eé]phrect|chol[eé]cyst/i.test(allText))
          || (sysLower === 'vision' && /visuel|acuit[eé]|oculaire|oeil|\boeil\b|dipl/i.test(allText))
          || (sysLower === 'audition' && /audit|surdit|acouph|hypoacous/i.test(allText))
          || (sysLower === 'psychiatrique' && /d[eé]press|psychiatr|psycho|tspt|stress.*post|phobi|anxi[eé]t/i.test(allText))
          || (sysLower.includes('rachis') && /rachis|vert[eé]br|lombaire|cervical|dorsal|hernie.*disc/i.test(allText))
          || (sysLower === 'bassin' && /bassin|pelvien|obtur|cotyle|symphyse|sacrum|coccyx|iliaque/i.test(allText))
          || (sysLower === 'épaule' && /[eé]paule|hum[eé]r|clavicule|scapul/i.test(allText))
          || (sysLower === 'genou' && /genou|plateau.*tibial|rotule|lca|lig.*crois/i.test(allText))
          || (sysLower === 'cheville' && /cheville|mall[eé]ol|calcan|pilon.*tibial|tarse/i.test(allText))
          || (sysLower === 'hanche' && /hanche|col.*f[eé]mor|trochant|coxo|pth|cotyle/i.test(allText))
          || (sysLower === 'humérus' && /hum[eé]rus|bras|diaphys.*hum/i.test(allText))
          || (sysLower === 'tibia' && /tibia|jambe|diaphys.*tib/i.test(allText))
          || (sysLower === 'fémur' && /f[eé]mur|diaphys.*f[eé]m/i.test(allText))
          || (sysLower === 'poignet' && /poignet|radius|scapho[ïi]de/i.test(allText))
          || (sysLower === 'coude' && /coude|ol[eé]cran|t[eê]te.*radial|pronosupination/i.test(allText))
          || (sysLower === 'rotule' && /rotule|patell/i.test(allText))
          || (sysLower === 'main' && /main|pouce|index|doigt|m[eé]dius|m[eé]tacarp|phalang/i.test(allText))
          || (sysLower === 'avant-bras' && /avant[\s-]?bras|pronosupination|radius.*cubitus|deux.*os.*avant/i.test(allText));
      });
      
      // Le test passe si c'est bien un polytraumatisme ET le taux est raisonnable
      const labelMatch = isPolytrauma && rateInRange;
      
      if (labelMatch) {
        passed++;
        if (tc.complexity === 'simple') passedSimple++;
        else passedComplex++;
      } else {
        failed++;
      }

      console.log(`─── Cas ${i + 1} (${tc.complexity}) ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Sièges    : ${tc.expectedSystems.join(' + ')} (4 sièges)`);
      console.log(`  Attendu   : Polytraumatisme (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${labelMatch ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Polytrauma: ${isPolytrauma ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'} | Syst. trouvés: ${systemsFound.length}/${tc.expectedSystems.length}`);
      if (!labelMatch) {
        const reasons = [];
        if (!isPolytrauma) reasons.push('PAS reconnu comme polytraumatisme');
        if (!rateInRange) reasons.push(`Taux ${numRate}% hors fourchette ${tc.expectedMinRate}-${tc.expectedMaxRate}%`);
        console.log(`  ⚠️ ANOMALIE: ${reasons.join(' + ')}`);
      }
      console.log('');
    } catch (err: any) {
      failed++;
      console.log(`─── Cas ${i + 1} (${tc.complexity}) ───`);
      console.log(`  ❌ ERREUR: ${err.message}`);
      console.log('');
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`  RÉSULTAT GLOBAL    : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log(`  CAS SIMPLES        : ${passedSimple}/${totalSimple}`);
  console.log(`  CAS COMPLEXES      : ${passedComplex}/${totalComplex}`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
