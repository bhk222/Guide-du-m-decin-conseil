// Test de la fonction getFilteredKeywordWeight
const testText = "agé de 72 victime d'un at survenue le 12 mars 2010 a l'origine de fracture des 2 os de la jambe droite ; sequelles : saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";

// Fonction normalize copiée du code
function normalize(text) {
    text = text.toLowerCase();
    text = text.replace(/[àáâãäå]/g, 'a');
    text = text.replace(/[èéêë]/g, 'e');
    text = text.replace(/[ìíîï]/g, 'i');
    text = text.replace(/[òóôõö]/g, 'o');
    text = text.replace(/[ùúûü]/g, 'u');
    text = text.replace(/[ýÿ]/g, 'y');
    text = text.replace(/[ç]/g, 'c');
    text = text.replace(/[ñ]/g, 'n');
    text = text.replace(/[^\w\s]/g, ' ');
    text = text.replace(/\s+/g, ' ');
    return text.trim();
}

const normalizedText = normalize(testText);
console.log("Texte normalisé:");
console.log(normalizedText);

// Simulation de la fonction getFilteredKeywordWeight
const keywordWeights = {
    'jambe': 95,
    'tibia': 95,
    'fibula': 95,
    'face': 95,
    'genou': 100,
    'fracture': 50,
    'os': 30
};

const getFilteredKeywordWeight = (keyword, normalizedText) => {
    // EXCLUSION SPÉCIALE: "face" anatomique vs "face" (visage)
    if (keyword === 'face') {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            console.log(`⚠️  Mot-clé '${keyword}' EXCLU (contexte anatomique directionnel)`);
            return 0; // Poids nul dans contexte anatomique directionnel
        }
    }
    const weight = keywordWeights[keyword] || 1;
    console.log(`✅ Mot-clé '${keyword}' → poids: ${weight}`);
    return weight;
};

console.log("\n=== TEST FUNCTION getFilteredKeywordWeight ===");

// Test avec les mots-clés du texte
const keywords = ['fracture', '2', 'os', 'jambe', 'droite', 'sequelles', 'saillie', 'osseuse', 'niveau', 'face', 'interne', 'genou', 'valgum'];

keywords.forEach(keyword => {
    const weight = getFilteredKeywordWeight(keyword, normalizedText);
});

console.log("\n=== RÉSUMÉ ===");
console.log("Si 'face' est correctement exclu, le poids devrait être 0");
console.log("Les autres mots-clés (jambe, os, genou) devraient avoir leur poids normal");