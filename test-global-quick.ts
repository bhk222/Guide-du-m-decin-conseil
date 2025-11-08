import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';
import { trainingCases } from './data/trainingCases';

let success = 0;
let total = trainingCases.length;

trainingCases.forEach(testCase => {
    const result = comprehensiveSingleLesionAnalysis(testCase.userInput);
    if (result.type === 'proposal' && result.name === testCase.expectedInjury) {
        success++;
    }
});

const percentage = ((success / total) * 100).toFixed(1);
console.log(`🎯 VALIDATION GLOBALE: ${success}/${total} (${percentage}%)`);

// Analyse par catégorie pour voir l'impact
const byCategory: { [key: string]: { success: number, total: number } } = {};

trainingCases.forEach(testCase => {
    const result = comprehensiveSingleLesionAnalysis(testCase.userInput);
    const isSuccess = result.type === 'proposal' && result.name === testCase.expectedInjury;
    
    if (!byCategory[testCase.category]) {
        byCategory[testCase.category] = { success: 0, total: 0 };
    }
    
    byCategory[testCase.category].total++;
    if (isSuccess) {
        byCategory[testCase.category].success++;
    }
});

console.log('\n📊 PAR CATÉGORIE:');
Object.entries(byCategory).forEach(([category, stats]) => {
    const catPercentage = ((stats.success / stats.total) * 100).toFixed(1);
    console.log(`${category}: ${stats.success}/${stats.total} (${catPercentage}%)`);
});