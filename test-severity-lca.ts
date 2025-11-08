import { localExpertAnalysis } from './components/AiAnalyzer';

const testCase = "rupture LCA opérée avec laxité résiduelle dérobements fréquents escaliers arthrose débutante";
console.log("🧪 Test sévérité LCA opérée");
console.log("Input:", testCase);

const analyzeResult = localExpertAnalysis(testCase);
console.log("Résultat:", analyzeResult);