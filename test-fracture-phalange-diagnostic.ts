import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log("═══════════════════════════════════════════════════════════════");
console.log("  TEST FRACTURE P1 INDEX - DIAGNOSTIC PRÉCIS");
console.log("═══════════════════════════════════════════════════════════════\n");

const tests = [
    "fracture P1 index main droite",
    "fracture P1 index main droite avec raideur",
    "fracture phalange proximale index avec raideur IPP",
    "raideur index suite fracture P1",
    "limitation flexion index suite fracture P1",
    "ankylose index suite fracture",
    "Fracture consolidée P1 index avec raideur articulaire",
];

tests.forEach((test, idx) => {
    console.log(`\n[${idx + 1}] Input: "${test}"`);
    const result = comprehensiveSingleLesionAnalysis(test);
    
    if (result.type === 'proposal') {
        console.log(`✅ ${result.name}`);
        console.log(`   IPP: ${result.rate}%`);
    } else if (result.type === 'ambiguity') {
        console.log(`⚠️  AMBIGUÏTÉ: ${result.choices.length} choix`);
        result.choices.slice(0, 3).forEach((c, i) => {
            console.log(`   ${i + 1}. ${c.name} (${c.rate}%)`);
        });
    } else {
        console.log(`❌ NON DÉTECTÉ`);
    }
});

console.log("\n═══════════════════════════════════════════════════════════════");
console.log("  💡 RECOMMANDATION");
console.log("═══════════════════════════════════════════════════════════════");
console.log(`
Pour une FRACTURE DE P1 (phalange proximale), le barème distingue :

1. Si FRACTURE SEULE (consolidée sans séquelle) :
   → Pas d'IPP (consolidation = guérison)

2. Si RAIDEUR ARTICULAIRE résiduelle :
   → Raideur d'une articulation de l'index (Main Dominante) : 2-5%
   → Raideur d'une articulation de l'index (Main Non Dominante) : 1-4%

3. Si ANKYLOSE COMPLÈTE :
   → Ankylose de l'index (totalité) (Main Dominante) : 15%
   → Ankylose de l'index (totalité) (Main Non Dominante) : 12%

4. Si PERTE/AMPUTATION :
   → Perte de l'index (3 phalanges) (Main Dominante) : 15%

🔍 Pour votre cas "fracture de P1 d2 main droite", précisez :
   • Y a-t-il une RAIDEUR résiduelle ?
   • Quelles sont les AMPLITUDES articulaires (degrés) ?
   • Quelle articulation est limitée (IPP, IDP, MCP) ?

Exemples de saisie :
   ✅ "Fracture P1 index MD avec raideur IPP"
   ✅ "Fracture consolidée P1 index MD, limitation flexion 30°"
   ✅ "Raideur index suite fracture P1"
`);

console.log("═══════════════════════════════════════════════════════════════\n");
