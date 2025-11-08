import { localExpertAnalysis } from './components/AiAnalyzer';

const testCase = "fracture plateaux tibiaux avec deviation axiale 8 degres raideur flexion 100 degres";
console.log("🧪 Test sévérité plateaux tibiaux");
console.log("Input:", testCase);

const result = localExpertAnalysis(testCase);
console.log("Résultat complet:", JSON.stringify(result, null, 2));