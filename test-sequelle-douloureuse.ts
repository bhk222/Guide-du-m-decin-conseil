/**
 * TEST V3.2 - Séquelle douloureuse médius
 * Cas: "fracture de P1 du D3 de la main droite avec sequelle douleureuse"
 * 
 * ATTENDU:
 * - Détection: Raideur d'une articulation du médius (Main Dominante)
 * - IPP: 1-4%
 * 
 * PROBLÈME INITIAL:
 * - Système détectait "Raideur rachis lombaire" (5-15% IPP) ❌
 * 
 * CORRECTIONS V3.2:
 * 1. Expert rule médius: "Raideur d'une articulation" → "Raideur d'une articulation du médius"
 * 2. Abréviation: "séquelle douloureuse" → "raideur avec douleur"
 */

import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log("\n" + "=".repeat(80));
console.log("🧪 TEST V3.2 - SÉQUELLE DOULOUREUSE MÉDIUS (D3)");
console.log("=".repeat(80) + "\n");

const tests = [
    "fracture de P1 du D3 de la main droite avec sequelle douleureuse",
    "Fracture P1 médius MD avec séquelle douloureuse",
    "Fracture phalange proximale D3 main droite séquelles douloureuses",
    "P1 médius droit fracture avec raideur douloureuse"
];

tests.forEach((description, index) => {
    console.log(`\n[${index + 1}] "${description}"`);
    console.log("-".repeat(80));
    
    try {
        const result = comprehensiveSingleLesionAnalysis(description);
        
        if (result.lesionDetails && result.lesionDetails.length > 0) {
            const firstMatch = result.lesionDetails[0];
            console.log(`✓ Détection: ${firstMatch.name}`);
            console.log(`✓ IPP: ${firstMatch.rate[0]}-${firstMatch.rate[1]}%`);
            
            if (firstMatch.name.includes("médius") || firstMatch.name.includes("Médius")) {
                console.log("✅ SUCCÈS - Médius détecté correctement");
            } else {
                console.log(`⚠️ ATTENTION - Détection inattendue (attendu: médius)`);
            }
        } else {
            console.log("❌ Aucune détection");
        }
    } catch (error: any) {
        console.log(`❌ ERREUR: ${error.message}`);
    }
});

console.log("\n" + "=".repeat(80));
console.log("📊 RÉSUMÉ V3.2");
console.log("=".repeat(80));
console.log("✓ Correction expert rule médius: searchTerms précis");
console.log("✓ Ajout abréviation: 'séquelle douloureuse' → 'raideur avec douleur'");
console.log("=".repeat(80) + "\n");

