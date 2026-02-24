// Test 10 cas : traumatismes membres inférieurs (V3.3.287)
import { localExpertAnalysis } from './components/AiAnalyzer';

interface TestCase {
  input: string;
  expectedLabel: string;
  expectedRate: string;
  description: string;
}

const testCases: TestCase[] = [
  {
    // Cas 1 : Fracture du col du fémur avec raccourcissement
    input: "fracture du col du fémur droit consolidée avec raccourcissement de 2 cm et raideur de la hanche limitant la flexion à 80 degrés et boiterie séquellaire après chute de sa hauteur",
    expectedLabel: "Fracture du col du fémur",
    expectedRate: "30-60%",
    description: "Fracture col fémur avec raccourcissement et raideur"
  },
  {
    // Cas 2 : Fracture bimalléolaire avec raideur modérée
    input: "séquelles de fracture bimalléolaire de la cheville gauche traitée chirurgicalement avec raideur modérée de la cheville et douleurs mécaniques résiduelles à la marche prolongée sur terrain irrégulier",
    expectedLabel: "Fracture malléolaire",
    expectedRate: "10-20%",
    description: "Fracture bimalléolaire avec raideur modérée"
  },
  {
    // Cas 3 : Rupture du LCA du genou avec instabilité
    input: "séquelles de rupture du ligament croisé antérieur du genou droit traitée par ligamentoplastie avec laxité résiduelle et instabilité fonctionnelle lors de la descente des escaliers et dérobements occasionnels",
    expectedLabel: "ligament croisé antérieur",
    expectedRate: "10-25%",
    description: "Rupture LCA avec instabilité résiduelle"
  },
  {
    // Cas 4 : Fracture du calcanéum avec douleurs et boiterie
    input: "fracture du calcanéum gauche après chute d'un échafaudage avec douleurs chroniques à l'appui et boiterie persistante nécessitant le port de semelles orthopédiques et limitation du périmètre de marche",
    expectedLabel: "Fracture",
    expectedRate: "10-30%",
    description: "Fracture calcanéum avec douleurs et boiterie"
  },
  {
    // Cas 5 : Amputation de jambe tiers moyen
    input: "amputation de la jambe gauche au tiers moyen après écrasement par machine industrielle appareillée par prothèse tibiale avec moignon bien cicatrisé et marche possible avec prothèse",
    expectedLabel: "Amputation de jambe",
    expectedRate: "50-55%",
    description: "Amputation jambe tiers moyen appareillée"
  },
  {
    // Cas 6 : Fracture plateau tibial avec raideur du genou
    input: "fracture du plateau tibial externe du genou droit avec enfoncement articulaire traité par ostéosynthèse avec raideur séquellaire du genou flexion limitée à 90 degrés et déviation en valgus modérée",
    expectedLabel: "plateau",
    expectedRate: "10-30%",
    description: "Fracture plateau tibial avec raideur et déviation"
  },
  {
    // Cas 7 : Rupture du tendon d'Achille opérée avec séquelles
    input: "rupture du tendon d'Achille droit opérée avec séquelles fonctionnelles perte de force en flexion plantaire et impossibilité de se mettre sur la pointe des pieds et douleurs résiduelles à l'effort",
    expectedLabel: "tendon",
    expectedRate: "5-15%",
    description: "Rupture tendon d'Achille opérée avec séquelles"
  },
  {
    // Cas 8 : Fracture diaphysaire du fémur avec cal vicieux
    input: "fracture diaphysaire du fémur gauche consolidée avec cal vicieux et raccourcissement de 3 cm avec raideur du genou homolatéral et boiterie importante nécessitant une canne",
    expectedLabel: "Fracture diaphysaire du fémur",
    expectedRate: "10-30%",
    description: "Fracture diaphyse fémorale avec cal vicieux"
  },
  {
    // Cas 9 : Méniscectomie avec séquelles
    input: "séquelles de méniscectomie interne du genou gauche avec douleurs mécaniques résiduelles et hydarthrose récidivante et gêne fonctionnelle à la montée des escaliers après accident de sport",
    expectedLabel: "méniscectomie",
    expectedRate: "5-15%",
    description: "Séquelles de méniscectomie avec douleurs et hydarthrose"
  },
  {
    // Cas 10 : Prothèse totale de hanche sur coxarthrose post-traumatique
    input: "séquelles de prothèse totale de hanche gauche posée pour coxarthrose post-traumatique avec boiterie résiduelle légère et douleurs mécaniques occasionnelles et limitation modérée des amplitudes articulaires",
    expectedLabel: "prothèse totale de hanche",
    expectedRate: "15-40%",
    description: "PTH sur coxarthrose post-traumatique"
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
      
      // Vérification souple : le label attendu (ou ses 15 premiers caractères) est contenu dans le résultat
      const expectedLower = tc.expectedLabel.toLowerCase();
      const nameLower = name.toLowerCase();
      const justifLower = (result?.justification || '').toLowerCase();
      const pathLower = (result?.path || '').toLowerCase();
      
      const labelMatch = nameLower.includes(expectedLower.substring(0, 15))
        || justifLower.includes(expectedLower.substring(0, 15))
        || pathLower.includes(expectedLower.substring(0, 15))
        || (expectedLower.includes('amputation') && nameLower.includes('amputation'))
        || (expectedLower.includes('plateau') && (nameLower.includes('plateau') || nameLower.includes('tibia')))
        || (expectedLower.includes('tendon') && (nameLower.includes('achille') || nameLower.includes('tendon')))
        || (expectedLower.includes('méniscectomie') && (nameLower.includes('méniscectomie') || nameLower.includes('meniscectomie') || nameLower.includes('ménisque')))
        || (expectedLower.includes('prothèse totale de hanche') && (nameLower.includes('prothèse') || nameLower.includes('coxarthrose') || nameLower.includes('hanche')))
        || (expectedLower.includes('ligament croisé') && (nameLower.includes('ligament croisé') || nameLower.includes('lca') || nameLower.includes('croisé antérieur')))
        || (expectedLower.includes('fracture') && nameLower.includes('fracture'));
      
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
      if (result?.justification) console.log(`  Justif    : ${result.justification.substring(0, 150)}...`);
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
