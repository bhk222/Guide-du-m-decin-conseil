import { localExpertAnalysis } from './components/AiAnalyzer';

const testCase = "rupture lca opéré laxité résiduelle";
console.log("🔍 Debug: LCA opéré (masculin)");
console.log("Input:", testCase);
console.log();

const result = localExpertAnalysis(testCase);
console.log("Résultat:", JSON.stringify(result, null, 2));