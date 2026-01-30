// 🧪 TEST V3.3.169 - Corrections Cas Cliniques Complexes
// Test des 2 cas avec les corrections appliquées

const testCases = [
    {
        name: "CAS 1: Fracture-Luxation L1 + Amyotrophie + Steppage",
        input: "agé de 70 ans ; victime d'un AT 14.07.1991 ; fracture luxation de L1 ; traité chirurgicalement ; séquelles amyotrophie du membre inferieur gauche ; marche avec steppage ; raideur du rachis",
        expectedIPP: "40-43%",
        expectedDiagnosis: [
            "RACHIS: Fracture L1 + raideur (30%)",
            "MEMBRE INFERIEUR: Amyotrophie + steppage (18%)",
            "CUMUL (Balthazar): 42%"
        ]
    },
    {
        name: "CAS 2: Amputation D5 + Luxations M4-M5 + Polyséquelles",
        input: "71 ans ; amputation totale du D5 main droite avec luxation m4 m5. Sequelle amyotrophie de la main droite ; cicatrice rectractile . Diviation D2 D3 D4 ; dimunition de la force de serrage ; enroulement de la main incomplet",
        expectedIPP: "28-30%",
        expectedDiagnosis: [
            "Amputation D5: 10%",
            "Luxation M4-M5: 10%",
            "Amyotrophie main: 12%",
            "Cicatrice + force: 6%",
            "CUMUL (Balthazar): 28-30%"
        ]
    }
];

// Format for testing
console.log("=".repeat(80));
console.log("🧪 TEST CASES V3.3.169 - Corrections Cas Cliniques Complexes");
console.log("=".repeat(80));

testCases.forEach((testCase, idx) => {
    console.log(`\n${'█'.repeat(80)}`);
    console.log(`📋 ${idx + 1}. ${testCase.name}`);
    console.log(`${'█'.repeat(80)}`);
    console.log(`\n📝 INPUT TEXT:\n${testCase.input}\n`);
    console.log(`✅ EXPECTED IPP: ${testCase.expectedIPP}`);
    console.log(`📊 EXPECTED BREAKDOWN:`);
    testCase.expectedDiagnosis.forEach(diag => {
        console.log(`   • ${diag}`);
    });
    console.log(`\n⚙️  CORRECTIONS APPLIQUÉES:`);
    if (idx === 0) {
        console.log(`   1. Détection amyotrophie + steppage → Signes neurologiques`);
        console.log(`   2. Filtre "sans lésion neurologique" → DÉSACTIVÉ`);
        console.log(`   3. Règle expert L1+steppage → Propose RACHIS (30%) + LLI (18%)`);
        console.log(`   4. Cumul Balthazar → 100 - (70 × 82 / 100) = 42%`);
    } else {
        console.log(`   1. Détection amyotrophie + déviation D2-D3-D4 → Nerf cubital`);
        console.log(`   2. Règle polyséquelles numériques → Amputation + luxation + neuropathie`);
        console.log(`   3. Cumul intra-main (un seul système) → Formule Balthazar`);
        console.log(`   4. Taux final: 28-30% (au lieu de 22%)`);
    }
});

console.log(`\n${'='.repeat(80)}`);
console.log("📊 MÉTRIQUES:");
console.log(`   • Cas 1 Amélioration: +31% (12% → 42% attendu)`);
console.log(`   • Cas 2 Amélioration: +6-8% (22% → 28-30% attendu)`);
console.log(`${'='.repeat(80)}\n`);
