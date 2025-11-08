// Test simple pour vérifier la logique d'amputation
const testText = "Accident de travail avec scie circulaire, amputation sous le genou, prothèse adaptée, marche difficile, boiterie permanente";

// Simulation de la logique determineSeverity pour amputations
function testAmputationLogic(normalizedText: string): { level: string, signs: string[] } {
    // Détection amputation (pas besoin de "membre inférieur" complet)
    if (/amputation/i.test(normalizedText)) {
        console.log("✅ Amputation détectée");
        
        // Niveau BAS (sous le genou / jambe) → FAIBLE (70%)
        const isBelowKnee = /(?:amputation|amput[eé]).*(?:sous.*genou|jambe)|(?:sous.*genou|jambe).*amputation|moignon.*(?:long|bien.*appareillable)/i.test(normalizedText);
        
        // Niveau HAUT (cuisse/hanche) → ÉLEVÉ (80%)
        const isAboveKnee = /(?:amputation|amput[eé]).*(?:cuisse|hanche|d[eé]sarticulation)|(?:cuisse|hanche|d[eé]sarticulation).*amputation|moignon.*(?:tr[eè]s\s+court|court(?!\s+terme))/i.test(normalizedText);
        
        if (isBelowKnee) {
            console.log("✅ Niveau anatomique: SOUS LE GENOU → Sévérité FAIBLE");
            return { 
                level: 'faible', 
                signs: ['🦿 Amputation sous le genou (moignon long et bien appareillable)']
            };
        } else if (isAboveKnee) {
            console.log("✅ Niveau anatomique: CUISSE/HANCHE → Sévérité ÉLEVÉE");
            return { 
                level: 'élevé', 
                signs: ['🦿 Désarticulation hanche ou amputation cuisse (moignon très court)']
            };
        }
        
        // Si siège non précisé, utiliser appareillage
        if (/proth[eè]se.*(?:adapt[eé]e|fonctionnelle)|appareillage.*satisfaisant/i.test(normalizedText)) {
            console.log("✅ Appareillage adapté détecté → Sévérité FAIBLE");
            return { 
                level: 'faible', 
                signs: ['🦿 Amputation avec appareillage satisfaisant']
            };
        }
    }
    
    return { level: 'moyen', signs: [] };
}

console.log("🧪 TEST: Amputation sous le genou avec marche difficile");
console.log("📝 Texte:", testText);
console.log("\n🔍 Analyse:\n");

const result = testAmputationLogic(testText.toLowerCase());

console.log("\n📊 Résultat:");
console.log("  - Niveau sévérité:", result.level);
console.log("  - Signes:", result.signs);
console.log("\n💡 Interprétation:");

if (result.level === 'faible') {
    console.log("✅ CORRECT: Taux IPP sera 70% (minimum de fourchette [70-80]%)");
    console.log("   Justification: 'sous le genou' détecté → critère LOW du barème");
} else if (result.level === 'élevé') {
    console.log("❌ ERREUR: Taux IPP sera 80% (maximum de fourchette)");
    console.log("   Ce cas devrait être 70% car 'sous le genou'");
} else {
    console.log("⚠️  MOYEN: Taux IPP sera 75% (milieu de fourchette)");
}
