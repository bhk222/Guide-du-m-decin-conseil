// Test 10 cas : traumatismes bassin et rachis
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedLabel: string;
  expectedRate: string;
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : Fracture tassement vertébral lombaire L1 consolidée
    input: "fracture tassement vertébral L1 non déplacée consolidée avec lombalgies mécaniques résiduelles après chute de hauteur",
    expectedLabel: "Fracture tassement vertébral lombaire",
    expectedRate: "10-25%",
    description: "Tassement vertébral lombaire L1 consolidé"
  },
  {
    // Cas 2 : Hernie discale lombaire post-traumatique avec sciatique
    input: "hernie discale lombaire L4-L5 post-traumatique avec radiculalgie sciatique chronique persistante et déficit sensitif L5 après accident de travail",
    expectedLabel: "Hernie discale lombaire",
    expectedRate: "15-35%",
    description: "Hernie discale lombaire avec sciatique chronique"
  },
  {
    // Cas 3 : Fracture rachis cervical sans lésion neurologique
    input: "séquelles de fracture luxation du rachis cervical C5-C6 sans lésion neurologique avec cervicalgies quasi-permanentes et raideur cervicale invalidante",
    expectedLabel: "Séquelles de fracture/luxation du rachis cervical",
    expectedRate: "8-25%",
    description: "Fracture-luxation cervicale sans déficit neurologique"
  },
  {
    // Cas 4 : Fracture branche pubienne isolée
    input: "fracture isolée de la branche ilio-pubienne gauche sans déplacement avec douleurs mécaniques résiduelles à la marche prolongée",
    expectedLabel: "Fracture isolée d'une branche pubienne",
    expectedRate: "5-10%",
    description: "Fracture branche pubienne isolée sans déplacement"
  },
  {
    // Cas 5 : Paraplégie incomplète post-traumatique
    input: "paraplégie incomplète post-traumatique avec marche possible à l'aide de cannes après fracture vertébrale D12 avec lésion médullaire partielle",
    expectedLabel: "Paraplégie incomplète",
    expectedRate: "10-80%",
    description: "Paraplégie incomplète post-fracture dorsale"
  },
  {
    // Cas 6 : Fracture sacrum avec coccygodynie
    input: "fracture du sacrum avec coccygodynie chronique invalidante rendant la position assise prolongée impossible après chute sur les fesses",
    expectedLabel: "Fracture du sacrum ou du coccyx",
    expectedRate: "5-15%",
    description: "Fracture sacrum avec coccygodynie chronique"
  },
  {
    // Cas 7 : Spondylolisthésis modifié par traumatisme
    input: "spondylolisthésis L5-S1 aggravé par traumatisme lombaire direct avec lombalgies chroniques et limitation fonctionnelle",
    expectedLabel: "Spondylolisthésis",
    expectedRate: "5-15%",
    description: "Spondylolisthésis aggravé par traumatisme"
  },
  {
    // Cas 8 : Disjonction sacro-iliaque avec instabilité
    input: "disjonction de la symphyse pubienne et de l'articulation sacro-iliaque gauche avec instabilité résiduelle et douleurs importantes à la marche nécessitant une canne",
    expectedLabel: "Disjonction de la symphyse pubienne",
    expectedRate: "15-30%",
    description: "Disjonction pubienne et sacro-iliaque avec instabilité"
  },
  {
    // Cas 9 : Syndrome de la queue de cheval post-traumatique
    input: "syndrome de la queue de cheval post-traumatique après fracture L3 avec troubles sphinctériens partiels et anesthésie en selle et déficit moteur des releveurs du pied",
    expectedLabel: "Syndrome de la queue de cheval",
    expectedRate: "40-80%",
    description: "Syndrome queue de cheval après fracture lombaire"
  },
  {
    // Cas 10 : Polytraumatisme : fracture anneau pelvien + hernie discale lombaire (2 sites)
    input: "fracture complexe de l'anneau pelvien avec boiterie séquellaire et douleurs chroniques associée à une hernie discale lombaire L5-S1 post-traumatique avec sciatique droite après accident de la voie publique",
    expectedLabel: "Polytraumatisme",
    expectedRate: "cumul",
    description: "Polytraumatisme : anneau pelvien + hernie discale lombaire"
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
      const rate = result?.rate !== undefined ? `${result.rate}%` 
        : result?.globalRate !== undefined ? `${result.globalRate}%`
        : result?.type || 'N/A';
      const type = result?.type || 'unknown';
      
      // Vérification souple
      const labelMatch = name.toLowerCase().includes(tc.expectedLabel.toLowerCase().substring(0, 20))
        || (tc.expectedLabel === 'Polytraumatisme' && (type === 'cumul' || name.toLowerCase().includes('polytraum')))
        || (tc.expectedLabel === 'Paraplégie incomplète' && name.toLowerCase().includes('paraplégie'));
      
      if (labelMatch) {
        passed++;
      } else {
        failed++;
      }

      console.log(`─── Cas ${i + 1} ───`);
      console.log(`  Description: ${tc.description}`);
      console.log(`  Input     : "${tc.input}"`);
      console.log(`  Attendu   : ${tc.expectedLabel} (${tc.expectedRate})`);
      console.log(`  Obtenu    : ${labelMatch ? '✅' : '❌'} ${name}`);
      console.log(`  Taux      : ${rate}`);
      console.log(`  Type      : ${type}`);
      if (result?.path) console.log(`  Path      : ${result.path}`);
      if (result?.justification) console.log(`  Justif    : ${result.justification.substring(0, 120)}...`);
      if (!labelMatch) {
        console.log(`  ⚠️ ANOMALIE: attendu "${tc.expectedLabel}" mais obtenu "${name}"`);
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
