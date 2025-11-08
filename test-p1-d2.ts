import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log("═══════════════════════════════════════════════════════════════");
console.log("  TEST: fracture de p1 d2 de la main droite");
console.log("═══════════════════════════════════════════════════════════════\n");

const tests = [
    "fracture de p1 d2 de la main droite",
    "fracture P1 d2 main droite",
    "fracture phalange 1 doigt 2 main droite",
    "fracture phalange proximale index main droite",
    "fracture P1 index main droite"
];

tests.forEach((test, idx) => {
    console.log(`\n[${idx + 1}] Input: "${test}"`);
    const result = comprehensiveSingleLesionAnalysis(test);
    
    if (result.type === 'proposal') {
        console.log(`✅ DÉTECTÉ: ${result.name}`);
        console.log(`   IPP: ${result.rate}%`);
        console.log(`   Catégorie: ${result.path}`);
    } else if (result.type === 'ambiguity') {
        console.log(`⚠️  AMBIGUÏTÉ: ${result.choices.length} choix`);
        result.choices.slice(0, 3).forEach((c, i) => {
            console.log(`   ${i + 1}. ${c.name} (${c.rate}%)`);
        });
    } else {
        console.log(`❌ NON DÉTECTÉ`);
    }
});

console.log("\n═══════════════════════════════════════════════════════════════\n");
