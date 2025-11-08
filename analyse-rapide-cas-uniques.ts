import { localExpertAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

// Analyser toutes les catégories à 0% avec 1 cas
const singleCaseCategories = [
    'Membres Inférieurs - Pied',
    'Rachis et Bassin - Lombaire',
    'Rachis et Bassin - Cervical',
    'Membres Inférieurs - Jambe',
    'Rachis et Bassin - Dorsal',
    'Thorax - Côtes',
    'Thorax - Sternum',
    'Dents',
    'Cicatrices'
];

console.log('🔍 ANALYSE RAPIDE - CAS UNIQUES (0/1)\n');
console.log('='.repeat(80) + '\n');

for (const category of singleCaseCategories) {
    const cases = trainingCases.filter(tc => tc.category === category);
    
    if (cases.length === 0) continue;
    
    const testCase = cases[0];
    console.log(`📂 ${category}`);
    console.log(`   Texte: "${testCase.userInput.substring(0, 70)}..."`);
    console.log(`   Attendu: ${testCase.expectedInjury} (${testCase.expectedRate}%)`);
    
    const result = localExpertAnalysis(testCase.userInput);
    
    if (result.type === 'proposal') {
        const match = result.name === testCase.expectedInjury && result.rate === testCase.expectedRate;
        console.log(`   Obtenu:  ${result.name} (${result.rate}%) ${match ? '✅' : '❌'}`);
        
        if (!match) {
            // Analyser la proximité
            const nameMatch = result.name === testCase.expectedInjury;
            const rateClose = Math.abs(result.rate - testCase.expectedRate) <= 5;
            
            if (nameMatch && !rateClose) {
                console.log(`   💡 Nom correct, taux différent (écart: ${Math.abs(result.rate - testCase.expectedRate)}%)`);
            } else if (!nameMatch && rateClose) {
                console.log(`   💡 Taux proche, nom différent`);
            } else {
                console.log(`   ⚠️  Nom et taux différents`);
            }
        }
    } else {
        console.log(`   Obtenu:  ${result.type} ❌`);
    }
    
    console.log();
}

console.log('='.repeat(80));
console.log('\n💡 Légende:');
console.log('✅ = Match parfait (facile à résoudre)');
console.log('💡 Nom correct = Ajuster uniquement le taux');
console.log('💡 Taux proche = Ajuster uniquement le nom');
console.log('⚠️  = Nécessite entries + règles expertes');