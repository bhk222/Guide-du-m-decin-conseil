import { analyzeText } from './components/AiAnalyzer';

const testCase = "Accident de travail avec scie circulaire, amputation sous le genou, prothèse adaptée, marche difficile, boiterie permanente";

console.log("🧪 Test cas amputation sous le genou");
console.log("📝 Input:", testCase);
console.log("\n🔍 Analyse en cours...\n");

// Simuler l'analyse (comme dans le composant)
const result = analyzeText(testCase);

console.log("📊 Résultat:");
console.log("  - Type:", result.type);
console.log("  - Lésion:", result.name);
console.log("  - Taux IPP:", result.rate + "%");
console.log("  - Fourchette:", result.injury?.rate);

if (result.rate === 70) {
    console.log("\n✅ TEST RÉUSSI: Taux correct (70% pour amputation sous le genou)");
} else {
    console.log("\n❌ TEST ÉCHOUÉ: Taux incorrect");
    console.log("   Attendu: 70%");
    console.log("   Obtenu:", result.rate + "%");
}
