import { localExpertAnalysis } from './components/AiAnalyzer';

const testCase = "Cataracte POST TRAUMATIQUE";
console.log("🧪 Test Cataracte Post-Traumatique");
console.log("Input:", testCase);
console.log();

const result = localExpertAnalysis(testCase);
if (result.type === 'proposal') {
    console.log(`✅ Résultat: ${result.name}`);
    console.log(`Taux: ${result.rate}%`);
    console.log(`Fourchette attendue: [10-100]`);
} else {
    console.log("Type:", result.type);
    console.log("Résultat:", JSON.stringify(result, null, 2));
}