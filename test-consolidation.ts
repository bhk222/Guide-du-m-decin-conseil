import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('=== TEST CONSOLIDATION + SÉQUELLES ===\n');

const tests = [
    { input: 'fracture P1 D2 consolidée avec raideur', expected: 'Raideur index 2-5%' },
    { input: 'fracture P1 D2 consolidée avec ankylose', expected: 'Ankylose index 15%' },
    { input: 'fracture P1 D2 consolidée sans séquelle', expected: '0% IPP ou ambiguïté' },
    { input: 'fracture P1 D2 consolidée séquelles douloureuses', expected: 'Raideur index' },
    { input: 'fracture P1 D2 consolidé', expected: 'Devrait demander précision' }
];

tests.forEach(({ input, expected }) => {
    const r = comprehensiveSingleLesionAnalysis(input);
    console.log(`INPUT: "${input}"`);
    console.log(`ATTENDU: ${expected}`);
    console.log(`RÉSULTAT: ${r.name} (${r.rate}%)`);
    console.log('');
});

console.log('=== PROBLÈME MÉDICO-LÉGAL ===');
console.log('En droit médical français/algérien:');
console.log('  "Consolidation" = Stabilisation lésionnelle (fin des soins)');
console.log('  Consolidation SANS séquelle → 0% IPP (guérison ad integrum)');
console.log('  Consolidation AVEC séquelle → IPP selon la séquelle résiduelle');
console.log('');
console.log('Le système devrait:');
console.log('  1. Détecter "consolidé(e)" seul');
console.log('  2. Vérifier si séquelle mentionnée');
console.log('  3. Si NON → Demander "Quelles séquelles résiduelles ?"');
console.log('  4. Si OUI → Évaluer la séquelle');
