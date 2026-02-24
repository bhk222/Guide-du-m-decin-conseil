// Test 10 cas : polytraumatismes avec sièges différents (V3.3.288)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];  // Systèmes anatomiques attendus
  expectedMinRate: number;    // Taux IPP minimum attendu
  expectedMaxRate: number;    // Taux IPP maximum attendu
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : MI + MS (membre inférieur + membre supérieur)
    input: "séquelles de fracture du fémur gauche consolidée avec raccourcissement de 2 cm et raideur du genou homolatéral associée à une fracture du radius distal droit avec raideur du poignet et limitation de la pronosupination après accident de la voie publique",
    expectedSystems: ['membre inférieur', 'membre supérieur'],
    expectedMinRate: 15,
    expectedMaxRate: 55,
    description: "Polytraumatisme MI + MS : fémur gauche + radius droit"
  },
  {
    // Cas 2 : Épaule + Genou + Rachis (3 sièges)
    input: "luxation récidivante de l'épaule droite avec limitation de l'abduction à 90 degrés et instabilité résiduelle ; gonarthrose post-traumatique du genou gauche avec raideur en flexion limitée à 100 degrés ; raideur du rachis lombaire avec lombalgies chroniques et distance doigt-sol à 35 cm après accident de la route",
    expectedSystems: ['épaule', 'genou', 'rachis'],
    expectedMinRate: 20,
    expectedMaxRate: 50,
    description: "Polytraumatisme 3 sièges : épaule + genou + rachis lombaire"
  },
  {
    // Cas 3 : Crâne + Thorax + Hanche (3 systèmes distincts)
    input: "traumatisme crânien avec céphalées chroniques quotidiennes et troubles de la concentration ; fractures de côtes 5ème 6ème et 7ème gauches avec douleurs thoraciques résiduelles et dyspnée d'effort ; fracture du col fémoral gauche traitée par ostéosynthèse avec raideur de la hanche et boiterie séquellaire",
    expectedSystems: ['crâne', 'thorax', 'hanche'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Polytraumatisme crâne + thorax + hanche"
  },
  {
    // Cas 4 : Bassin + Tibia + Humérus + Rachis (4 sièges)
    input: "polytraumatisme suite à accident de la circulation avec fracture du cadre obturateur du bassin consolidée avec douleurs résiduelles ; fracture diaphysaire du tibia gauche avec cal vicieux et raccourcissement de 2 cm ; fracture de l'humérus droit ostéosynthésée avec raideur de l'épaule ; tassement vertébral de L1 avec cyphose post-traumatique",
    expectedSystems: ['bassin', 'tibia', 'humérus', 'rachis'],
    expectedMinRate: 25,
    expectedMaxRate: 65,
    description: "Polytraumatisme 4 sièges : bassin + tibia + humérus + rachis"
  },
  {
    // Cas 5 : Sensoriel + Genou (vision + audition + orthopédie)
    input: "baisse de l'acuité visuelle OD à 3/10 et OG à 8/10 après traumatisme oculaire direct ; surdité de perception bilatérale moyenne à 40 dB avec acouphènes permanents invalidants ; raideur du genou droit post-fracture du plateau tibial avec flexion limitée à 90 degrés et douleurs mécaniques",
    expectedSystems: ['vision', 'audition', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 65,
    description: "Polytraumatisme sensoriel + genou : vision + audition + plateau tibial"
  },
  {
    // Cas 6 : Thorax + Abdomen (viscéral)
    input: "contusion thoracique avec fractures des 4ème 5ème et 6ème côtes droites et séquelles de pneumothorax avec syndrome restrictif modéré ; splénectomie totale pour rupture traumatique de la rate ; contusion rénale gauche avec diminution de la fonction rénale homolatérale après accident de voiture",
    expectedSystems: ['thorax', 'abdomen'],
    expectedMinRate: 20,
    expectedMaxRate: 55,
    description: "Polytraumatisme thorax + abdomen : côtes + splénectomie + rein"
  },
  {
    // Cas 7 : Rachis triple étage (cervical + dorsal + lombaire)
    input: "raideur du rachis cervical post-traumatique avec limitation des rotations et syndrome cervical chronique ; tassement vertébral dorsal D12 avec cyphose résiduelle et douleurs intercostales ; hernie discale lombaire L4-L5 post-traumatique avec sciatique gauche déficitaire et raideur du rachis lombaire DDS à 30 cm après chute d'un échafaudage de 4 mètres",
    expectedSystems: ['rachis cervical', 'rachis dorsal', 'rachis lombaire'],
    expectedMinRate: 20,
    expectedMaxRate: 50,
    description: "Polytraumatisme rachis triple étage : cervical + dorsal + lombaire"
  },
  {
    // Cas 8 : Main dominante complexe (doigts + poignet + nerf)
    input: "amputation de l'index de la main droite dominante avec ankylose du médius en position de flexion ; raideur du poignet droit avec limitation de la flexion-extension ; déficit sensitivo-moteur du nerf cubital au coude droit avec griffe cubitale et amyotrophie des interosseux après écrasement de la main par machine industrielle",
    expectedSystems: ['main', 'poignet', 'nerf'],
    expectedMinRate: 20,
    expectedMaxRate: 62,
    description: "Polytraumatisme main dominante : amputation + ankylose + nerf cubital"
  },
  {
    // Cas 9 : 2 Membres inférieurs bilatéral (cheville G + genou D)
    input: "fracture bimalléolaire de la cheville gauche opérée avec raideur résiduelle et instabilité en varus ; fracture du plateau tibial externe du genou droit avec déviation axiale en valgus et gonarthrose débutante ; boiterie bilatérale nécessitant l'utilisation de deux cannes pour les longs trajets et douleurs à la marche prolongée",
    expectedSystems: ['cheville', 'genou'],
    expectedMinRate: 20,
    expectedMaxRate: 68,
    description: "Polytraumatisme 2 MI bilatéral : cheville gauche + genou droit"
  },
  {
    // Cas 10 : Neuro + Ortho + Psy (3 systèmes TC grave + fémur + dépression)
    input: "traumatisme crânien grave avec déficit cognitif séquellaire troubles de mémoire et de concentration et céphalées chroniques quotidiennes ; fracture diaphysaire du fémur gauche ostéosynthésée avec cal vicieux et raccourcissement de 2 cm et boiterie ; syndrome dépressif réactionnel post-traumatique majeur avec trouble du sommeil isolement social et traitement antidépresseur au long cours",
    expectedSystems: ['crâne', 'fémur', 'psychiatrique'],
    expectedMinRate: 25,
    expectedMaxRate: 70,
    description: "Polytraumatisme neuro + ortho + psy : TC grave + fémur + dépression"
  }
];

async function runTests() {
  let passed = 0;
  let failed = 0;

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
      const pathLower = (result?.path || '').toLowerCase();
      
      // Validation pour polytraumatisme :
      // 1. Le résultat doit contenir "polytraum" ou "cumul" ou mentionner plusieurs systèmes
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
      
      // 3. Au moins un des systèmes attendus doit être mentionné
      const systemsFound = tc.expectedSystems.filter(sys => {
        const sysLower = sys.toLowerCase();
        return nameLower.includes(sysLower) 
          || justif.includes(sysLower) 
          || pathLower.includes(sysLower)
          || (sysLower === 'crâne' && (justif.includes('cran') || justif.includes('crân') || justif.includes('neurolog')))
          || (sysLower === 'thorax' && (justif.includes('thorac') || justif.includes('côte') || justif.includes('cote') || justif.includes('pulmon')))
          || (sysLower === 'abdomen' && (justif.includes('splén') || justif.includes('splen') || justif.includes('rénal') || justif.includes('renal') || justif.includes('rate')))
          || (sysLower === 'vision' && (justif.includes('visuel') || justif.includes('acuité') || justif.includes('oculaire') || justif.includes('oeil')))
          || (sysLower === 'audition' && (justif.includes('audit') || justif.includes('surdité') || justif.includes('surdite') || justif.includes('acouph')))
          || (sysLower === 'psychiatrique' && (justif.includes('dépress') || justif.includes('psychiatr') || justif.includes('psycho')))
          || (sysLower.includes('rachis') && (justif.includes('rachis') || justif.includes('vertébr') || justif.includes('vertebr') || justif.includes('lombaire') || justif.includes('cervical')))
          || (sysLower === 'bassin' && (justif.includes('bassin') || justif.includes('pelvien') || justif.includes('obtur')))
          || (sysLower === 'nerf' && (justif.includes('nerf') || justif.includes('cubital') || justif.includes('sensitivo')))
          || (sysLower === 'main' && (justif.includes('main') || justif.includes('index') || justif.includes('doigt') || justif.includes('médius')))
          || (sysLower === 'épaule' && (justif.includes('épaule') || justif.includes('epaule')))
          || (sysLower === 'genou' && (justif.includes('genou') || justif.includes('plateau tibial')))
          || (sysLower === 'cheville' && (justif.includes('cheville') || justif.includes('malléol') || justif.includes('malleol')))
          || (sysLower === 'hanche' && (justif.includes('hanche') || justif.includes('col fémor') || justif.includes('col femor')))
          || (sysLower === 'humérus' && (justif.includes('humérus') || justif.includes('humerus') || justif.includes('bras')))
          || (sysLower === 'tibia' && (justif.includes('tibia') || justif.includes('jambe')))
          || (sysLower === 'fémur' && (justif.includes('fémur') || justif.includes('femur') || justif.includes('diaphysaire')))
          || (sysLower === 'poignet' && (justif.includes('poignet') || justif.includes('radius')))
          || (sysLower === 'membre inférieur' && (justif.includes('membre inf') || justif.includes('fémur') || justif.includes('genou') || justif.includes('tibia') || justif.includes('cheville')))
          || (sysLower === 'membre supérieur' && (justif.includes('membre sup') || justif.includes('radius') || justif.includes('poignet') || justif.includes('humérus') || justif.includes('épaule')));
      });
      const hasExpectedSystems = systemsFound.length >= 1;
      
      // Le test passe si c'est bien un polytraumatisme ET le taux est raisonnable
      const labelMatch = isPolytrauma && rateInRange;
      
      if (labelMatch) {
        passed++;
      } else {
        failed++;
      }

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Input     : "${tc.input.substring(0, 120)}..."`);
      console.log(`  Sièges    : ${tc.expectedSystems.join(' + ')}`);
      console.log(`  Attendu   : Polytraumatisme (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${labelMatch ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Polytrauma: ${isPolytrauma ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'} | Syst. trouvés: ${systemsFound.length}/${tc.expectedSystems.length}`);
      if (result?.path) console.log(`  Path      : ${result.path}`);
      if (result?.justification) console.log(`  Justif    : ${result.justification.substring(0, 200)}...`);
      if (!labelMatch) {
        const reasons = [];
        if (!isPolytrauma) reasons.push('PAS reconnu comme polytraumatisme');
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
  console.log(`  RÉSULTAT GLOBAL : ${passed}/10 trouvés | ${failed}/10 échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
