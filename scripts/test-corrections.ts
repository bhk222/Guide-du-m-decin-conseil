import { localExpertAnalysis } from '../components/AiAnalyzer';

console.log('🧪 Test rapide corrections Phase 20\n');

// Test 1: Viscère (splénectomie)
console.log('Test 1: Splénectomie');
const test1 = localExpertAnalysis('ablation de la rate suite accident');
console.log(`  Résultat: ${test1.type === 'proposal' ? test1.name : 'NO_RESULT'}`);
console.log(`  Attendu: Ablation rate / splénectomie\n`);

// Test 2: Audition (surdité 60dB)
console.log('Test 2: Surdité 60dB');
const test2 = localExpertAnalysis('surdité oreille droite 60db');
console.log(`  Résultat: ${test2.type === 'proposal' ? test2.name : 'NO_RESULT'}`);
console.log(`  Attendu: Surdité partielle\n`);

// Test 3: Amputation (désarticulation genou)
console.log('Test 3: Désarticulation genou');
const test3 = localExpertAnalysis('désarticulation du genou gauche');
console.log(`  Résultat: ${test3.type === 'proposal' ? test3.name : 'NO_RESULT'}`);
console.log(`  Attendu: Désarticulation genou\n`);

// Test 4: Doigt spécifique (pouce)
console.log('Test 4: Amputation pouce main dominante');
const test4 = localExpertAnalysis('amputation du pouce main dominante');
console.log(`  Résultat: ${test4.type === 'proposal' ? test4.name : 'NO_RESULT'}`);
console.log(`  Attendu: Amputation pouce (pas 5 doigts)\n`);

// Test 5: Cumul PAS détecté (LCA seul)
console.log('Test 5: LCA seul (ne doit PAS être cumul)');
const test5 = localExpertAnalysis('rupture LCA genou droit');
console.log(`  Résultat: ${test5.type === 'proposal' ? test5.name : 'NO_RESULT'}`);
console.log(`  Doit être: Rupture LCA (PAS "Cumul de...")\n`);

// Test 6: Cumul DOIT être détecté (2+ séparateurs)
console.log('Test 6: LCA + méniscectomie + instabilité (DOIT être cumul)');
const test6 = localExpertAnalysis('rupture LCA + méniscectomie externe + instabilité chronique genou');
console.log(`  Résultat: ${test6.type === 'proposal' ? test6.name : 'NO_RESULT'}`);
console.log(`  Doit être: "Cumul de X lésions"\n`);

console.log('✅ Tests terminés');
