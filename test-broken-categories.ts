import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

// Test MS-Main et Cas Complexe
function testBrokenCategories() {
    console.log("🔍 VÉRIFICATION MS-MAIN ET CAS COMPLEXE\n");
    
    // MS-Main cases
    const msMainCases = trainingCases.filter(c => c.category === 'Membres Supérieurs - Main');
    console.log("📋 MS-MAIN:");
    msMainCases.forEach((cas, i) => {
        const result = comprehensiveSingleLesionAnalysis(cas.userInput);
        const success = result.type === 'proposal' && result.name === cas.expectedInjury;
        console.log(`   ${success ? '✅' : '❌'} ${cas.userInput.substring(0, 60)}...`);
        console.log(`      Attendu: ${cas.expectedInjury} (${cas.expectedRate}%)`);
        if (result.type === 'proposal') {
            console.log(`      Obtenu:  ${result.name} (${result.rate}%)`);
        } else {
            console.log(`      Obtenu:  ${result.type}`);
        }
    });
    
    // Cas Complexe cases
    const complexCases = trainingCases.filter(c => c.category === 'Cas Complexe');
    console.log("\n📋 CAS COMPLEXE:");
    complexCases.forEach((cas, i) => {
        const result = comprehensiveSingleLesionAnalysis(cas.userInput);
        const success = result.type === 'proposal' && result.name === cas.expectedInjury;
        console.log(`   ${success ? '✅' : '❌'} ${cas.userInput.substring(0, 60)}...`);
        console.log(`      Attendu: ${cas.expectedInjury} (${cas.expectedRate}%)`);
        if (result.type === 'proposal') {
            console.log(`      Obtenu:  ${result.name} (${result.rate}%)`);
        } else {
            console.log(`      Obtenu:  ${result.type}`);
        }
    });
}

testBrokenCategories();