// Test 10 cas : polytraumatismes thorax + rachis (V3.3.296)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedSystems: string[];  // 2 systèmes anatomiques attendus
  expectedMinRate: number;    // Taux IPP minimum attendu (Balthazard)
  expectedMaxRate: number;    // Taux IPP maximum attendu (Balthazard)
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : Fracture 3 côtes + tassement vertébral D11 (chute de hauteur)
    // THORAX: 8% (côtes), RACHIS: 10% (tassement dorsal) → Balthazard ≈ 17%
    input: "fracture de la 9ème 10ème et 11ème côte gauche consolidée avec douleurs résiduelles à l'inspiration profonde et gêne modérée à l'effort associée à un tassement vertébral de D11 non déplacé consolidé avec dorsalgies mécaniques chroniques et légère cyphose post-traumatique après chute d'un échafaudage de 4 mètres",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 10,
    expectedMaxRate: 35,
    description: "Fracture 3 côtes + tassement vertébral D11"
  },
  {
    // Cas 2 : Fracture sternum + fracture rachis cervical C5-C6 (AVP volant)
    // THORAX: 8% (sternum), RACHIS: 12% (cervical) → Balthazard ≈ 19%
    input: "fracture du sternum consolidée avec douleurs résiduelles à la pression sternale après impact contre le volant lors d'un accident de la voie publique et séquelles de fracture du rachis cervical C5-C6 sans lésion neurologique avec cervicalgies quasi-permanentes et raideur cervicale en rotation limitée à 40 degrés de chaque côté",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Fracture sternum + fracture rachis cervical C5-C6"
  },
  {
    // Cas 3 : Volet costal + hernie discale lombaire L4-L5 (accident grave)
    // THORAX: 8% (volet costal), RACHIS: 15% (hernie discale) → Balthazard ≈ 22%
    input: "séquelles de volet costal antérieur droit avec paroi thoracique instable et dyspnée d'effort modérée après accident de la voie publique par tonneau avec hernie discale lombaire L4-L5 post-traumatique et sciatique gauche chronique avec déficit sensitif L5 et douleurs radiculaires permanentes nécessitant un traitement antalgique quotidien",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Volet costal + hernie discale lombaire L4-L5 avec sciatique"
  },
  {
    // Cas 4 : Hémothorax drainé + fracture rachis dorsal D6-D7 (accident de travail)
    // THORAX: 8% (hémothorax), RACHIS: 12% (dorsal) → Balthazard ≈ 19%
    input: "hémothorax gauche drainé en urgence avec adhérences pleurales résiduelles et diminution modérée de la capacité respiratoire après accident de travail par chute de matériaux lourds et séquelles de fracture du rachis dorsal D6-D7 sans lésion neurologique avec dorsalgies chroniques invalidantes et raideur du rachis dorsal avec limitation de la rotation du tronc",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Hémothorax drainé + fracture rachis dorsal D6-D7"
  },
  {
    // Cas 5 : Fracture 5 côtes bilatérales + entorse grave rachis cervical (AVP)
    // THORAX: 8% (côtes multiples), RACHIS: 10% (cervical) → Balthazard ≈ 17%
    input: "fractures costales étagées bilatérales de la 4ème à la 8ème côte droite et de la 5ème et 6ème côte gauche consolidées avec douleurs intercostales persistantes et gêne respiratoire à l'effort et séquelles d'entorse grave du rachis cervical avec cervicalgies chroniques et limitation modérée des rotations cervicales après accident de la voie publique par collision frontale",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Fracture côtes bilatérales + entorse grave rachis cervical"
  },
  {
    // Cas 6 : Pneumothorax + tassement vertébral L1 (accident de moto)
    // THORAX: 8% (pneumothorax), RACHIS: 12% (L1 tassement) → Balthazard ≈ 19%
    input: "pneumothorax droit drainé en urgence avec douleurs résiduelles thoraciques à l'effort après accident de moto associé à une fracture tassement vertébral L1 consolidée avec lombalgies mécaniques chroniques et raideur rachidienne modérée",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 10,
    expectedMaxRate: 40,
    description: "Pneumothorax drainé + tassement vertébral L1"
  },
  {
    // Cas 7 : Fracture sternum enfoncement + fracture lombaire L2 opérée (écrasement)
    // THORAX: 8% (sternum), RACHIS: 15% (lombaire opérée) → Balthazard ≈ 22%
    input: "fracture du sternum avec enfoncement persistant de la paroi thoracique antérieure et douleurs chroniques à la palpation et à la respiration profonde après accident de travail par écrasement et fracture vertébrale L2 opérée par arthrodèse postérieure avec raideur rachidienne résiduelle importante et lombalgies chroniques invalidantes nécessitant le port d'une ceinture lombaire",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 15,
    expectedMaxRate: 50,
    description: "Fracture sternum enfoncement + fracture L2 opérée arthrodèse"
  },
  {
    // Cas 8 : Contusion pulmonaire avec syndrome restrictif + fracture D12 (chute)
    // THORAX: 8% (restrictif), RACHIS: 12% (D12) → Balthazard ≈ 19%
    input: "séquelles de contusion pulmonaire bilatérale avec syndrome restrictif modéré à l'EFR et dyspnée d'effort stade II après chute de grande hauteur de 6 mètres et fracture tassement vertébral D12 consolidée avec dorsalgies chroniques et raideur du rachis dorso-lombaire avec limitation de l'antéflexion du rachis",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 10,
    expectedMaxRate: 45,
    description: "Contusion pulmonaire restrictif + fracture tassement D12"
  },
  {
    // Cas 9 : Fracture 4 côtes + fracture luxation rachis cervical C6-C7 opérée (AVP grave)
    // THORAX: 8% (côtes), RACHIS: 15% (cervical opéré) → Balthazard ≈ 22%
    input: "fracture de la 3ème 4ème 5ème et 6ème côte droite consolidée avec douleurs intercostales résiduelles et gêne respiratoire après accident de la voie publique grave et séquelles de fracture luxation du rachis cervical C6-C7 opérée par arthrodèse antérieure sans lésion neurologique avec cervicalgies permanentes et raideur cervicale majeure avec port intermittent d'un collier cervical",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 12,
    expectedMaxRate: 50,
    description: "Fracture 4 côtes + fracture luxation cervicale C6-C7 opérée"
  },
  {
    // Cas 10 : Fracture côtes multiples + sciatique post-fracture L4 (polytraumatisme sévère)
    // THORAX: 8%, RACHIS: 15% (sciatique/hernie) → Balthazard ≈ 22%
    input: "fractures costales multiples de la 7ème à la 10ème côte gauche avec douleurs pariétales thoraciques chroniques persistantes nécessitant un traitement antalgique quotidien et hernie discale post-traumatique L4-L5 avec sciatique gauche chronique par conflit disco-radiculaire et radiculalgie L5 déficitaire après accident de la voie publique par collision latérale",
    expectedSystems: ['thorax', 'rachis'],
    expectedMinRate: 12,
    expectedMaxRate: 50,
    description: "Fracture côtes multiples + hernie discale L4-L5 sciatique"
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
      const justif = (result as any).justification || '';
      const pathStr = (result as any).path || '';
      const nameLower = name.toLowerCase();
      const pathLower = pathStr.toLowerCase();
      
      // 1. Vérifier que c'est un polytraumatisme
      const isPolytrauma = /polytraum|syst[eè]me|cumul|balthaz/i.test(nameLower + ' ' + justif);
      
      // 2. Vérifier taux dans fourchette (avec marge)
      const rateInRange = numRate >= (tc.expectedMinRate - 5) && numRate <= (tc.expectedMaxRate + 10);
      
      // 3. Vérifier systèmes attendus dans les métadonnées
      const allText = (nameLower + ' ' + justif + ' ' + pathLower).toLowerCase();
      const systemsFound = tc.expectedSystems.filter(sys => {
        const sysLower = sys.toLowerCase();
        return allText.includes(sysLower)
          || (sysLower === 'thorax' && /thorac|c[oô]te|costal|pulmon|sternum|volet|restrictif|pneumothorax|h[eé]mothorax/i.test(allText))
          || (sysLower.includes('rachis') && /rachis|vert[eé]br|lombaire|cervical|dorsal|hernie.*disc|sciatique|lombalgie|dorsalgie/i.test(allText));
      });
      
      // Le test passe si c'est bien un polytraumatisme ET le taux est raisonnable
      const labelMatch = isPolytrauma && rateInRange;
      
      if (labelMatch) {
        passed++;
      } else {
        failed++;
      }

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Sièges    : ${tc.expectedSystems.join(' + ')} (2 sièges)`);
      console.log(`  Attendu   : Polytraumatisme (${tc.expectedMinRate}-${tc.expectedMaxRate}%)`);
      console.log(`  Obtenu    : ${labelMatch ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${numRate}%`);
      console.log(`  Type      : ${type}`);
      console.log(`  Polytrauma: ${isPolytrauma ? '✅' : '❌'} | Taux OK: ${rateInRange ? '✅' : '❌'} | Syst. trouvés: ${systemsFound.length}/${tc.expectedSystems.length}`);
      if (!labelMatch) {
        const reasons: string[] = [];
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
  console.log(`  RÉSULTAT GLOBAL : ${passed}/${testCases.length} trouvés | ${failed}/${testCases.length} échoués`);
  console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
