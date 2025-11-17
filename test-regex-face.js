// Test du regex pour la correction "face"
const text = "age de 72 victime d'un at survenue le 12 mars 2010 a l'origine de fracture des 2 os de la jambe droite ; sequelles : saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";

// Normalisation (comme dans le code)
const normalized = text.toLowerCase().replace(/'/g, " ").replace(/-/g, " ");
console.log("Texte normalisé:", normalized);

// Test du regex actuel
const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;

const match = normalized.match(faceAnatomicalContext);
console.log("Match trouvé:", match);

if (match) {
    console.log("Texte matché:", match[0]);
    console.log("✅ Le regex fonctionne - 'face' devrait être exclu");
} else {
    console.log("❌ Aucun match - le regex ne fonctionne pas");
    
    // Test des parties séparément
    console.log("\n--- Tests séparés ---");
    console.log("Contient 'face interne':", normalized.includes("face interne"));
    console.log("Contient 'jambe':", normalized.includes("jambe"));
    
    // Test d'un regex plus simple
    const simpleRegex = /face\s+interne.*jambe/i;
    const simpleMatch = normalized.match(simpleRegex);
    console.log("Match avec regex simple:", simpleMatch);
}