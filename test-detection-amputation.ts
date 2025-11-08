// Test direct de la fonction determineSeverity simulée
const text = "Accident de scie circulaire sur chantier. Amputation sous le genou, prothèse adaptée, marche difficile sur terrain irrégulier";
const normalized = text.toLowerCase();

console.log("🧪 TEST DÉTECTION AMPUTATION");
console.log("=".repeat(80));
console.log(`📝 Texte: "${text}"`);
console.log("\n🔍 Analyse étape par étape:\n");

// Étape 1: Détection amputation
const hasAmputation = /amputation|d[eé]sarticulation/i.test(normalized);
console.log(`1️⃣ Détection "amputation": ${hasAmputation ? '✅ OUI' : '❌ NON'}`);

if (hasAmputation) {
    // Étape 2: Niveau anatomique BAS
    const isBelowKnee = /(?:amputation|amput[eé]).*(?:sous.*genou|jambe)|(?:sous.*genou|jambe).*(?:amputation|amput[eé])|moignon.*(?:long|bien.*appareillable)/i.test(normalized);
    console.log(`2️⃣ Pattern "sous le genou": ${isBelowKnee ? '✅ MATCH' : '❌ NO MATCH'}`);
    
    if (isBelowKnee) {
        console.log(`   → Détail match: "${normalized.match(/(?:amputation|amput[eé]).*(?:sous.*genou|jambe)|(?:sous.*genou|jambe).*(?:amputation|amput[eé])/i)?.[0]}"`);
    }
    
    // Étape 3: Niveau anatomique HAUT
    const isAboveKnee = /(?:amputation|amput[eé]|d[eé]sarticulation).*(?:cuisse|hanche)|(?:cuisse|hanche).*(?:amputation|amput[eé]|d[eé]sarticulation)|moignon.*(?:tr[eè]s\s+court|court(?!\s+terme))/i.test(normalized);
    console.log(`3️⃣ Pattern "cuisse/hanche": ${isAboveKnee ? '✅ MATCH' : '❌ NO MATCH'}`);
    
    // Étape 4: Appareillage satisfaisant
    const hasGoodProsthesis = /proth[eè]se.*(?:adapt[eé]e|fonctionnelle)|appareillage.*satisfaisant/i.test(normalized);
    console.log(`4️⃣ Pattern "prothèse adaptée": ${hasGoodProsthesis ? '✅ MATCH' : '❌ NO MATCH'}`);
    
    console.log("\n" + "=".repeat(80));
    console.log("\n📊 DÉCISION:");
    
    if (isBelowKnee) {
        console.log("   ✅ Niveau anatomique BAS détecté → Sévérité FAIBLE");
        console.log("   📋 Fourchette barème: [70-80]%");
        console.log("   🎯 Taux IPP: 70% (minimum de fourchette)");
        console.log("   💡 Justification: Amputation sous le genou avec moignon long et bien appareillable");
    } else if (isAboveKnee) {
        console.log("   ⚠️ Niveau anatomique HAUT détecté → Sévérité ÉLEVÉE");
        console.log("   📋 Fourchette barème: [70-80]%");
        console.log("   🎯 Taux IPP: 80% (maximum de fourchette)");
        console.log("   💡 Justification: Désarticulation hanche ou amputation cuisse");
    } else if (hasGoodProsthesis) {
        console.log("   ✅ Appareillage satisfaisant → Sévérité FAIBLE (fallback)");
        console.log("   📋 Fourchette barème: [70-80]%");
        console.log("   🎯 Taux IPP: 70% (minimum de fourchette)");
        console.log("   💡 Justification: Amputation avec appareillage satisfaisant");
    } else {
        console.log("   ⚠️ Aucun critère spécifique détecté");
        console.log("   ⚠️ PROBLÈME: La fonction pourrait utiliser les critères standards (boiterie)");
        console.log("   ❌ Risque: Taux 80% au lieu de 70%");
    }
} else {
    console.log("   ❌ Pas d'amputation détectée");
}

console.log("\n" + "=".repeat(80));
