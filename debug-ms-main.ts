import { trainingCases } from './data/trainingCases';
import { localExpertAnalysis } from './components/AiAnalyzer';

// Test avec debug détaillé pour comprendre pourquoi on obtient "désarticulation métacarpo-phalangienne"

const msMainCases = trainingCases.filter(testCase => 
    testCase.category === 'Membres Supérieurs - Main'
);

console.log('🔍 DEBUG DÉTAILLÉ MS-MAIN\n');

for (const testCase of msMainCases) {
    console.log(`📍 CAS: "${testCase.userInput}"`);
    console.log(`   Attendu: "${testCase.expectedInjury}" (${testCase.expectedRate}%)`);
    
    const result = localExpertAnalysis(testCase.userInput);
    
    if (result.type === 'proposal') {
        console.log(`   Obtenu:  "${result.name}" (${result.rate}%)`);
        
        // Debug détaillé de l'analyse
        if (result.name !== testCase.expectedInjury) {
        console.log('\n   🔍 ANALYSE DÉTAILLÉE:');
        
        // Testons manuellement les patterns de règles expertes
        const input = testCase.userInput.toLowerCase();
        
        console.log(`   Input normalisé: "${input}"`);
        
        // Test pattern pouce
        const poucePattern = /amputation.*pouce.*main.*dominante/i;
        console.log(`   Pattern pouce: ${poucePattern.test(testCase.userInput)}`);
        
        // Test pattern index  
        const indexPattern = /amputation.*index.*main.*dominante/i;
        console.log(`   Pattern index: ${indexPattern.test(testCase.userInput)}`);
        
        // Test pattern tendons
        const tendonsPattern = /section.*tendons.*(?:fléchisseurs|flexion).*(?:médius|doigt.*long)/i;
        console.log(`   Pattern tendons: ${tendonsPattern.test(testCase.userInput)}`);
        
        console.log(`   Contexte présent: ${/préhension|prehension|opposition|pollici.*digitale/.test(testCase.userInput)}`);
        }
    } else {
        console.log(`   Résultat: ${result.type}`);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
}