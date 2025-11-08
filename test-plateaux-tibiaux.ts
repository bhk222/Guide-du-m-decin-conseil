import { localExpertAnalysis } from './components/AiAnalyzer';

const testCase = "fracture plateaux tibiaux avec déviation axiale 8 degrés raideur flexion 100 degrés";
console.log("🧪 Test fracture plateaux tibiaux");
console.log("Input:", testCase);
console.log("Expected: Fracture des plateaux tibiaux - Avec déviation et/ou raideur (18%)");
console.log();

const result = localExpertAnalysis(testCase);
if (result.type === 'proposal') {
    console.log(`✅ Résultat: ${result.name}`);
    console.log(`Taux: ${result.rate}%`);
    console.log(`Attendu: Fracture des plateaux tibiaux - Avec déviation et/ou raideur (18%)`);
} else {
    console.log("❌ Pas de résultat proposal:", result);
}