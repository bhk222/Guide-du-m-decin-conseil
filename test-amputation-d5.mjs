// Test rapide de détection amputation D5 après correction negativeContext

const testCases = [
  {
    id: "CAS_1_AMPUTATION_D5",
    input: "71 ans ; amputation totale du D5 main droite avec luxation m4 m5. Sequellle amyotrophie de la main droite ; cicatrice rectracile . Diviation D2 D3 D4 ; dimunition de la force de serrage ; enroullement de la main incomplet",
    expectedInjuries: [
      "Amputation de l'auriculaire",
      "Luxation métacarpienne",
      "Déviation des doigts",
      "Amyotrophie"
    ],
    expectedMinRate: 25,
    criticality: "CRITICAL"
  },
  {
    id: "CAS_2_STEPPAGE_NEUROLOGIQUE",
    input: "agé de 70 ans ; victime d'un AT 14.07.1991 ; fracture luxation de L1 ; traité chirurgicalement ; séquelles amyotrophie du membre inferieur gauche ; marche avec steppage ; raideur du rachis",
    expectedInjuries: [
      "Paralysie du nerf sciatique poplité externe (SPE) avec steppage",
      "Fracture vertébrale lombaire",
      "Amyotrophie"
    ],
    expectedMinRate: 25,
    criticality: "CRITICAL"
  }
];

console.log("🔍 TEST DE DÉTECTION POST-CORRECTION V3.3.164\n");
console.log("=" .repeat(80) + "\n");

testCases.forEach((test, idx) => {
  console.log(`\n📋 TEST ${idx + 1}: ${test.id}`);
  console.log("─".repeat(80));
  console.log(`📝 Input: "${test.input.substring(0, 100)}..."`);
  console.log(`\n✅ Séquelles attendues:`);
  test.expectedInjuries.forEach(inj => console.log(`   • ${inj}`));
  console.log(`\n🎯 IPP minimum attendue: ${test.expectedMinRate}%`);
  console.log(`⚠️  Criticité: ${test.criticality}`);
});

console.log("\n\n" + "=".repeat(80));
console.log("🚀 INSTRUCTIONS DE TEST:");
console.log("=".repeat(80));
console.log(`
1. Ouvrir l'application: http://localhost:5173 (ou URL déployée)
2. Aller dans l'onglet "Analyse IA"
3. Coller le texte du CAS 1 (amputation D5)
4. Vérifier que l'IA détecte:
   ✓ Amputation de l'auriculaire → 10%
   ✓ Luxation M4-M5 → 5-8%
   ✓ Déviation D2-D3-D4 → 8-12%
   ✓ Amyotrophie main → 3-5%
   ✓ TOTAL CUMUL: 25-30% (PAS 14%!)

5. Tester le CAS 2 (steppage neurologique)
6. Vérifier que l'IA détecte:
   ✓ Paralysie SPE avec steppage → 15-25%
   ✓ Fracture lombaire avec complications → 10-30%
   ✓ Amyotrophie membre inférieur → aggravant
   ✓ TOTAL CUMUL: 30-40% (PAS 12%!)
`);

console.log("\n💡 Si les résultats sont toujours incorrects:");
console.log("   → Vider le cache (Ctrl+Shift+R ou Ctrl+F5)");
console.log("   → Attendre 2-3 minutes pour déploiement GitHub Pages");
console.log("   → Vérifier la version dans DevTools Console");
console.log("\n");
