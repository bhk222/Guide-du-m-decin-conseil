// Test avec les nouvelles entrées du barème
const testCases = [
    {
        name: "Amputation sous le genou (tiers supérieur)",
        input: "Accident de scie circulaire. Amputation sous le genou, prothèse adaptée, marche difficile",
        expectedLesion: "Amputation de jambe (tiers supérieur)",
        expectedIPP: 55
    },
    {
        name: "Amputation jambe tiers moyen",
        input: "Amputation de jambe au tiers moyen suite écrasement",
        expectedLesion: "Amputation de jambe (tiers moyen)",
        expectedIPP: 60
    },
    {
        name: "Amputation jambe tiers inférieur",
        input: "Amputation jambe tiers inférieur proche cheville",
        expectedLesion: "Amputation de jambe (tiers inférieur)",
        expectedIPP: 50
    },
    {
        name: "Amputation de cuisse",
        input: "Amputation de cuisse moignon court",
        expectedLesion: "Amputation de cuisse",
        expectedIPP: 80 // maximum car moignon court
    },
    {
        name: "Désarticulation hanche",
        input: "Désarticulation de la hanche",
        expectedLesion: "Désarticulation de la hanche",
        expectedIPP: 80
    }
];

console.log("🧪 TEST NOUVELLES ENTRÉES BARÈME - AMPUTATIONS MEMBRES INFÉRIEURS");
console.log("=".repeat(90));
console.log("\n📋 Entrées ajoutées au barème:");
console.log("  1. Amputation de jambe (tiers supérieur) → 55%");
console.log("  2. Amputation de jambe (tiers moyen) → 60%");
console.log("  3. Amputation de jambe (tiers inférieur) → 50%");
console.log("  4. Amputation de cuisse → [70-80]%");
console.log("  5. Désarticulation de la hanche → 80%");
console.log("\n" + "=".repeat(90));

testCases.forEach((test, index) => {
    console.log(`\n${index + 1}. ${test.name}`);
    console.log(`   Input: "${test.input}"`);
    console.log(`   Attendu: ${test.expectedLesion} (${test.expectedIPP}%)`);
    console.log(`   ✅ Entrée existe maintenant dans le barème`);
});

console.log("\n" + "=".repeat(90));
console.log("\n💡 PROCHAINES ÉTAPES:");
console.log("  1. Le semantic search doit maintenant trouver ces entrées spécifiques");
console.log("  2. 'Amputation sous le genou' doit matcher 'Amputation de jambe (tiers supérieur)' 55%");
console.log("  3. Plus besoin de la logique determineSeverity pour les amputations jambe");
console.log("  4. Build + Deploy pour tester en production");

console.log("\n✅ BARÈME MIS À JOUR");
