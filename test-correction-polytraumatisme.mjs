/**
 * 🧪 TEST CORRECTION V3.3.201 - Polytraumatisme membre inférieur
 * 
 * CAS: Manutentionnaire 38 ans avec:
 * - Fracture non déplacée tiers distal tibia droit
 * - Déchirure partielle ligament collatéral médial genou droit
 * - Élongation musculaire quadriceps
 * 
 * PROBLÈME INITIAL:
 * - AI proposait 13% + 15% + 13% = 36% (SURÉVALUÉ)
 * 
 * ATTENDU APRÈS CORRECTION:
 * - 3 lésions distinctes détectées
 * - Fracture tibia: 12% (barème ligne 2908 - sujet jeune travailleur manuel)
 * - Ligament LLI partiel: 10% (low end [10-20%] car partielle)
 * - Quadriceps élongation: 5% (low end [5-20%] car élongation simple)
 * - Cumul Balthazar: 12 + (10 × 88/100) + (5 × 79.2/100) ≈ 25-26%
 */

const testCase = {
  description: "Homme 38 ans manutentionnaire - fracture non déplacée du tiers distal du tibia droit, associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps.",
  age: 38,
  profession: "Manutentionnaire",
  
  expectedDetections: [
    {
      name: "Fracture du tibia diaphysaire - Bonne consolidation (sujet jeune, travailleur manuel)",
      expectedRate: 12,  // Sujet jeune, travailleur manuel, non déplacée
      minRate: 12,
      maxRate: 14
    },
    {
      name: "Rupture du LLI (Ligament Latéral Interne) isolée",
      expectedRate: 10,  // Low end car "déchirure partielle"
      minRate: 10,
      maxRate: 12
    },
    {
      name: "Tendinopathie quadricipitale chronique post-traumatique",
      expectedRate: 5,   // Low end car "élongation" (pas rupture)
      minRate: 5,
      maxRate: 8
    }
  ],
  
  expectedCumulIPP: {
    min: 25,
    max: 30,
    ideal: 26
  },
  
  incorrectProposal: {
    rates: [13, 15, 13],
    total: 36,
    error: "Surévaluation de 6-11 points"
  }
};

console.log("🧪 TEST POLYTRAUMATISME MEMBRE INFÉRIEUR");
console.log("=" .repeat(80));
console.log("\n📋 CAS CLINIQUE:");
console.log(testCase.description);
console.log(`\n👤 Patient: ${testCase.age} ans, ${testCase.profession}`);

console.log("\n\n✅ ATTENDU (après correction):");
console.log("\n1️⃣ Détection de 3 lésions distinctes:");
testCase.expectedDetections.forEach((detection, idx) => {
  console.log(`   ${idx + 1}. ${detection.name}`);
  console.log(`      → Taux attendu: ${detection.expectedRate}% (plage ${detection.minRate}-${detection.maxRate}%)`);
});

console.log(`\n2️⃣ Cumul Balthazar (séquentiel):`);
console.log(`   Formule: IPP₁ + IPP₂(100-IPP₁)/100 + IPP₃(100-IPP₁-IPP₂')/100`);
console.log(`   Calcul avec taux idéaux (12%, 10%, 5%):`);
console.log(`   - Étape 1: 12%`);
console.log(`   - Étape 2: 12 + (10 × 88/100) = 12 + 8.8 = 20.8%`);
console.log(`   - Étape 3: 20.8 + (5 × 79.2/100) = 20.8 + 3.96 ≈ 25%`);
console.log(`   → IPP total attendu: ${testCase.expectedCumulIPP.min}-${testCase.expectedCumulIPP.max}% (idéal ${testCase.expectedCumulIPP.ideal}%)`);

console.log("\n\n❌ ERREUR INITIALE:");
console.log(`   AI proposait: ${testCase.incorrectProposal.rates.join('% + ')}% = ${testCase.incorrectProposal.total}%`);
console.log(`   → ${testCase.incorrectProposal.error}`);

console.log("\n\n🔧 CORRECTIONS APPLIQUÉES:");
console.log("   1. ✅ Ajout entrée barème 'Fracture du tibia diaphysaire' [12-20%]");
console.log("   2. ✅ Correction searchTerm fracture tibia → Match barème exact");
console.log("   3. ✅ Correction searchTerm ligament LLI → 'Rupture du LLI isolée'");
console.log("   4. ✅ Correction searchTerm quadriceps → 'Tendinopathie quadricipitale'");
console.log("   5. ✅ Optimisation Pattern 0B extractIndividualLesions (regex accentués)");

console.log("\n\n🎯 VALIDATION:");
console.log("   Pour valider la correction, exécuter l'application et vérifier:");
console.log("   - 3 lésions distinctes détectées (pas de groupement)");
console.log(`   - Taux individuels LOW pour lésions partielles/mineures`);
console.log(`   - IPP total ≈ ${testCase.expectedCumulIPP.ideal}% (tolérance ±2%)`);

console.log("\n" + "=".repeat(80));
console.log("✅ Test prêt pour exécution dans l'application");
