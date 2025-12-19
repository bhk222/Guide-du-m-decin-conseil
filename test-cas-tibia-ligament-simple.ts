// Test simple pour voir la fonction d'analyse disponible
import type { LocalAnalysisResult } from './components/AiAnalyzer';

// Simuler l'appel à la fonction (à adapter selon votre export réel)
const casComplexe = `fracture non déplacée du tiers distal du tibia droit, associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps`;

console.log("🧪 TEST CAS COMPLEXE\n");
console.log("📋 Description:", casComplexe);
console.log("\n🎯 ATTENDU:");
console.log("- 3 lésions détectées");
console.log("- Lésion 1: Fracture tiers distal tibia → 8-10%");
console.log("- Lésion 2: Déchirure LCM genou → 6-8%");
console.log("- Lésion 3: Élongation quadriceps → 3-4%");
console.log("- IPP Total (Balthazar): ~17-18%");

console.log("\n⚠️ PROBLÈME ACTUEL:");
console.log("- Seule la fracture est détectée");
console.log("- Confusion 'tiers distal tibia' (jambe) avec 'plateau tibial' (genou)");
console.log("- IPP erroné: 20% au lieu de 17-18%");
