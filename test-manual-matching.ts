/**
 * Test manuel : vérifier si le système trouve une entrée avec searchTerms
 */

import { localExpertAnalysis } from './components/AiAnalyzer';

// Test avec un cas cumul qui devrait maintenant fonctionner
const testInput = "genou droit raideur flexion 105° + instabilité LCA résiduelle";

console.log('\n🧪 TEST MATCHING AVEC SEARCHTERMS:\n');
console.log(`Input: "${testInput}"\n`);
console.log('Attendu: "Raideur genou + instabilité LCA (cumul)" [25-35%]\n');

const result = localExpertAnalysis(testInput);

console.log('📊 RÉSULTAT:');
console.log(`Type: ${result.type}`);
if (result.type === 'proposal') {
  console.log(`Lésion trouvée: ${result.name}`);
  console.log(`Taux IPP: ${result.rate}%`);
  
  if (result.name.includes('Raideur genou + instabilité LCA')) {
    console.log('\n✅ SUCCESS! SearchTerms fonctionnent!');
  } else {
    console.log('\n❌ FAIL: Mauvaise lésion trouvée');
    console.log('Raison possible: searchTerms pas utilisés dans le matching');
  }
} else {
  console.log(`Message: ${result.text}`);
  console.log('\n❌ FAIL: Aucune lésion trouvée');
}
