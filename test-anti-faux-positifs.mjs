import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

/**
 * 🛡️ SUITE DE TESTS ANTI-FAUX-POSITIFS
 * 
 * Détecte les erreurs graves de confusion entre catégories anatomiques
 * Exécution: npx tsx test-anti-faux-positifs.mjs
 */

const testCases = [
  {
    id: 'FP001',
    name: 'Fracture membres ≠ Lésion oculaire',
    description: 'Fracture radius droit consolidée avec raideur modérée du poignet',
    forbiddenKeywords: ['oeil', 'œil', 'vision', 'cécité', 'aveugle', 'acuité visuelle'],
    expectedCategory: 'Membres Supérieurs',
    maxIPP: 30
  },
  {
    id: 'FP002',
    name: 'Fracture cheville ≠ Lésion oculaire',
    description: 'Fracture malléole externe gauche avec douleurs résiduelles à l\'effort',
    forbiddenKeywords: ['oeil', 'œil', 'vision', 'cécité', 'aveugle'],
    expectedCategory: 'Membres Inférieurs',
    maxIPP: 20
  },
  {
    id: 'FP003',
    name: 'Doigt boutonnière ≠ Amputation pouce',
    description: 'Le 3ème doigt présente une attitude vicieuse en boutonnière avec flexion IPP et hyperextension IPD',
    forbiddenKeywords: ['pouce', 'ablation pouce', 'amputation pouce', 'phalanges du pouce'],
    expectedKeywords: ['médius', '3ème doigt', 'boutonnière'],
    minIPP: 5,
    maxIPP: 18
  },
  {
    id: 'FP004',
    name: 'Lombalgie ≠ Hernie discale opérée',
    description: 'Lombalgie post-traumatique mécanique sans irradiation, EVA 4/10 à l\'effort',
    forbiddenKeywords: ['hernie discale', 'sciatique', 'opérée', 'chirurgie', 'discectomie'],
    maxIPP: 15
  },
  {
    id: 'FP005',
    name: 'Entorse cheville ≠ Fracture',
    description: 'Entorse grave de la cheville avec instabilité chronique, pas de fracture',
    forbiddenKeywords: ['fracture cheville', 'fracture malléole', 'fracture bimalléolaire'],
    maxIPP: 25
  },
  {
    id: 'FP006',
    name: 'Raideur épaule ≠ Amputation membre supérieur',
    description: 'Raideur importante de l\'épaule droite limitant l\'abduction à 90°',
    forbiddenKeywords: ['amputation', 'ablation', 'désarticulation', 'perte membre'],
    expectedCategory: 'Membres Supérieurs',
    maxIPP: 40
  },
  {
    id: 'FP007',
    name: 'Cicatrice thorax ≠ Atteinte viscérale',
    description: 'Cicatrice chéloïde thorax antérieur 10 cm, adhérente aux plans profonds',
    forbiddenKeywords: ['poumon', 'cardiaque', 'rate', 'foie', 'rein'],
    maxIPP: 15
  },
  {
    id: 'FP008',
    name: 'Index ≠ Pouce (doigts différents)',
    description: 'Raideur de l\'index droit avec limitation de flexion',
    forbiddenKeywords: ['pouce'],
    expectedKeywords: ['index'],
    maxIPP: 15
  },
  {
    id: 'FP009',
    name: 'Membre droit ≠ Membre gauche',
    description: 'Fracture radius droit avec séquelles fonctionnelles',
    forbiddenKeywords: ['gauche', 'non dominante'],
    expectedKeywords: ['droit', 'dominante'],  // Accepter soit "droit" soit "dominante" (normalisé)
    maxIPP: 30
  },
  {
    id: 'FP010',
    name: 'Genou ≠ Hanche (articulations différentes)',
    description: 'Raideur du genou gauche avec limitation de flexion à 90°',
    forbiddenKeywords: ['hanche'],
    expectedKeywords: ['genou'],
    maxIPP: 30
  }
];

console.log('🛡️ SUITE DE TESTS ANTI-FAUX-POSITIFS\n');
console.log('═'.repeat(80));
console.log('Objectif: Détecter les confusions aberrantes entre catégories anatomiques');
console.log('═'.repeat(80));
console.log('');

let passedTests = 0;
let failedTests = 0;
const failures = [];

for (const testCase of testCases) {
  process.stdout.write(`\n🧪 Test ${testCase.id}: ${testCase.name} ... `);
  
  try {
    const rawResult = localExpertAnalysis(testCase.description);
    
    // Si le résultat est ambiguity ou cumul_proposals, prendre le premier choix
    let result;
    if (rawResult.type === 'ambiguity' && rawResult.choices && rawResult.choices.length > 0) {
      const firstChoice = rawResult.choices[0];
      result = {
        type: 'proposal',
        name: firstChoice.name,
        rate: Array.isArray(firstChoice.rate) ? firstChoice.rate[0] : firstChoice.rate,
        path: firstChoice.path || 'N/A',
        justification: firstChoice.description || ''
      };
    } else if (rawResult.type === 'cumul_proposals' && rawResult.proposals && rawResult.proposals.length > 0) {
      const firstProposal = rawResult.proposals[0];
      result = {
        type: 'proposal',
        name: firstProposal.injury.name,
        rate: Array.isArray(firstProposal.injury.rate) ? firstProposal.injury.rate[0] : firstProposal.injury.rate,
        path: firstProposal.injury.path || 'N/A',
        justification: firstProposal.justification
      };
    } else if (rawResult.type === 'proposal') {
      result = rawResult;
    } else {
      result = { type: rawResult.type, name: undefined, rate: undefined, path: undefined };
    }
    
    let testPassed = true;
    const errors = [];
    
    // Vérification 1: Mots interdits dans le nom de la lésion
    if (testCase.forbiddenKeywords) {
      for (const forbidden of testCase.forbiddenKeywords) {
        if (result.name && result.name.toLowerCase().includes(forbidden.toLowerCase())) {
          testPassed = false;
          errors.push(`❌ Mot interdit détecté: "${forbidden}" dans "${result.name}"`);
        }
      }
    }
    
    // Vérification 2: Mots attendus dans le nom de la lésion
    if (testCase.expectedKeywords) {
      const hasExpected = testCase.expectedKeywords.some(expected => 
        result.name && result.name.toLowerCase().includes(expected.toLowerCase())
      );
      if (!hasExpected) {
        testPassed = false;
        errors.push(`❌ Aucun mot attendu trouvé. Attendus: [${testCase.expectedKeywords.join(', ')}], Obtenu: "${result.name}"`);
      }
    }
    
    // Vérification 3: Catégorie attendue
    if (testCase.expectedCategory && result.path) {
      if (!result.path.includes(testCase.expectedCategory)) {
        testPassed = false;
        errors.push(`❌ Mauvaise catégorie. Attendue: "${testCase.expectedCategory}", Obtenue: "${result.path}"`);
      }
    }
    
    // Vérification 4: IPP maximum
    if (testCase.maxIPP && result.rate > testCase.maxIPP) {
      testPassed = false;
      errors.push(`❌ IPP trop élevé. Max: ${testCase.maxIPP}%, Obtenu: ${result.rate}%`);
    }
    
    // Vérification 5: IPP minimum
    if (testCase.minIPP && result.rate < testCase.minIPP) {
      testPassed = false;
      errors.push(`❌ IPP trop faible. Min: ${testCase.minIPP}%, Obtenu: ${result.rate}%`);
    }
    
    if (testPassed) {
      console.log('✅ PASS');
      passedTests++;
    } else {
      console.log('❌ FAIL');
      failedTests++;
      failures.push({
        test: testCase,
        result: result,
        errors: errors
      });
    }
    
  } catch (error) {
    console.log('⚠️ ERREUR');
    failedTests++;
    failures.push({
      test: testCase,
      result: null,
      errors: [`⚠️ Exception: ${error.message}`]
    });
  }
}

// Rapport final
console.log('\n');
console.log('═'.repeat(80));
console.log('📊 RAPPORT FINAL');
console.log('═'.repeat(80));
console.log(`Total tests: ${testCases.length}`);
console.log(`✅ Réussis: ${passedTests} (${(passedTests/testCases.length*100).toFixed(1)}%)`);
console.log(`❌ Échoués: ${failedTests} (${(failedTests/testCases.length*100).toFixed(1)}%)`);
console.log('');

if (failures.length > 0) {
  console.log('❌ DÉTAILS DES ÉCHECS:\n');
  for (const failure of failures) {
    console.log(`\n🚨 Test ${failure.test.id}: ${failure.test.name}`);
    console.log(`📝 Description: ${failure.test.description}`);
    if (failure.result) {
      console.log(`🎯 Lésion proposée: ${failure.result.name}`);
      console.log(`📊 IPP: ${failure.result.rate}%`);
      console.log(`🗂️ Catégorie: ${failure.result.path || 'N/A'}`);
    }
    console.log(`\n⚠️ Erreurs détectées:`);
    failure.errors.forEach(err => console.log(`   ${err}`));
    console.log('');
  }
} else {
  console.log('🎉 TOUS LES TESTS SONT PASSÉS ! Le système est protégé contre les faux positifs majeurs.');
}

console.log('═'.repeat(80));

// Code de sortie
process.exit(failedTests > 0 ? 1 : 0);
