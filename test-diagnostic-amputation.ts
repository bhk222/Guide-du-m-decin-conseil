// Test pour comprendre pourquoi l'IA ne détecte pas "Amputation de jambe (tiers supérieur)"
// quand on dit "amputation sous le genou"

const testInput = "Accident de scie circulaire sur chantier. Amputation sous le genou, prothèse adaptée, marche difficile sur terrain irrégulier.";

console.log("🧪 DIAGNOSTIC: Pourquoi l'IA propose 80% au lieu de 55%");
console.log("=".repeat(90));
console.log(`\n📝 Input: "${testInput}"`);
console.log("\n🎯 Attendu:");
console.log("   - Lésion: Amputation de jambe (tiers supérieur)");
console.log("   - Taux: 55%");
console.log("\n❌ Obtenu (selon votre test):");
console.log("   - Lésion: Amputation d'un membre inférieur");
console.log("   - Taux: 80%");

console.log("\n" + "=".repeat(90));
console.log("\n🔍 HYPOTHÈSES:");
console.log("\n1️⃣ Problème de PRIORITÉ dans le semantic search:");
console.log("   - 'Amputation d'un membre inférieur' est plus générique");
console.log("   - Elle contient 'sous le genou' dans sa description");
console.log("   - Le semantic search la trouve en premier");
console.log("   - Solution: Améliorer le score de matching pour l'entrée spécifique");

console.log("\n2️⃣ Problème de SYNONYMES:");
console.log("   - 'sous le genou' n'est peut-être pas assez proche de 'tiers supérieur'");
console.log("   - Le semantic search préfère la correspondance littérale");
console.log("   - Solution: Ajouter 'sous le genou' explicitement dans le nom ou description");

console.log("\n3️⃣ Problème d'ORDRE des entrées:");
console.log("   - L'entrée générique est testée AVANT les spécifiques");
console.log("   - Dès qu'elle matche, les autres ne sont pas évaluées");
console.log("   - Solution: Réorganiser l'ordre (spécifiques avant génériques)");

console.log("\n" + "=".repeat(90));
console.log("\n💡 SOLUTION RECOMMANDÉE:");
console.log("   Mettre l'entrée générique 'Amputation d'un membre inférieur' EN DERNIER");
console.log("   comme FALLBACK si aucune entrée spécifique ne matche");
console.log("\n   Ordre optimal:");
console.log("   1. Amputation de jambe (tiers supérieur) → 55%");
console.log("   2. Amputation de jambe (tiers moyen) → 60%");
console.log("   3. Amputation de jambe (tiers inférieur) → 50%");
console.log("   4. Amputation de cuisse → [70-80]%");
console.log("   5. Désarticulation de la hanche → 80%");
console.log("   6. Amputation d'un membre inférieur → [70-80]% ← FALLBACK GÉNÉRIQUE");
console.log("   7. Amputation des deux membres inférieurs → 100%");

console.log("\n✅ Actuellement, cet ordre est respecté dans le barème");
console.log("   → Le problème vient donc du semantic search ou des expert rules");
