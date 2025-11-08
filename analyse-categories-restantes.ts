import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

// Catégories non parfaites
const categoriesAnalyse = [
    'Yeux - Lésions Spécifiques',
    'Membres Inférieurs - Genou',
    'Membres Inférieurs - Cheville',
    'Membres Inférieurs - Pied',
    'Membres Supérieurs - Épaule',
    'Variations Langage',
    'Membres Supérieurs - Poignet',
    'Membres Inférieurs - Jambe',
    'Thorax - Côtes',
    'Thorax - Sternum',
    'Abdomen et Viscères',
    'Audition',
    'Dents',
    'Cicatrices'
];

console.log("🔍 ANALYSE DES CATÉGORIES NON-PARFAITES\n");

categoriesAnalyse.forEach(categoryName => {
    const cases = trainingCases.filter(c => c.category === categoryName);
    if (cases.length === 0) return;
    
    let success = 0;
    console.log(`\n📋 ${categoryName} (${cases.length} cas):`);
    
    cases.forEach(cas => {
        const result = comprehensiveSingleLesionAnalysis(cas.userInput);
        const isSuccess = result.type === 'proposal' && result.name === cas.expectedInjury;
        
        if (isSuccess) {
            success++;
        } else {
            console.log(`   ❌ ${cas.userInput.substring(0, 70)}...`);
            console.log(`      Attendu: ${cas.expectedInjury} (${cas.expectedRate}%)`);
            if (result.type === 'proposal') {
                console.log(`      Obtenu:  ${result.name} (${result.rate}%)`);
                const rateDiff = Math.abs(result.rate - cas.expectedRate);
                if (rateDiff <= 3) {
                    console.log(`      💡 TAUX PROCHE (diff: ${rateDiff}%)`);
                } else if (result.name.toLowerCase().includes(cas.expectedInjury.toLowerCase().split(' ')[0])) {
                    console.log(`      💡 NOM SIMILAIRE`);
                }
            }
        }
    });
    
    console.log(`   ✅ Score: ${success}/${cases.length} (${((success/cases.length)*100).toFixed(1)}%)`);
});
