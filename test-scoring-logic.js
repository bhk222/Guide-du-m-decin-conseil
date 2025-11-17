// Test direct de la logique de scoring
const testText = "fracture des 2 os de la jambe droite ; saillie osseuse au niveau de la face interne de la jambe droite";

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

// Simulation du keywordWeights
const keywordWeights = {
    'jambe': 95,
    'tibia': 95,
    'fibula': 95,  
    'face': 95,
    'fracture': 50,
    'os': 30,
    'droite': 5,
    'interne': 10,
    'saillie': 10,
    'osseuse': 15,
    'niveau': 5
};

// Simulation de getContextualKeywordWeight
const getContextualKeywordWeight = (keyword, normalizedText) => {
    // EXCLUSION SPÉCIALE: "face" dans contexte anatomique directionnel
    if (keyword === 'face') {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            console.log(`⚠️  EXCLUSION: '${keyword}' dans contexte anatomique → poids 0`);
            return 0;
        }
    }
    const weight = keywordWeights[keyword] || 1;
    console.log(`✅ Mot-clé '${keyword}' → poids: ${weight}`);
    return weight;
};

console.log("\n=== SIMULATION SYSTÈME DE SCORING ===");

// Mots-clés extraits du texte
const keywords = normalizedText.split(' ').filter(w => w.length > 1);
console.log("Mots-clés:", keywords);

let totalScore = 0;

// Test de 2 séquelles candidates
console.log("\n📊 CANDIDATE 1: Fracture consolidée des deux os de la jambe");
const searchableText1 = normalize("fracture consolidee deux os jambe tibia fibula");
let score1 = 0;
keywords.forEach(userKeyword => {
    if (searchableText1.includes(userKeyword)) {
        const weight = getContextualKeywordWeight(userKeyword, normalizedText);
        score1 += weight;
    }
});
console.log(`SCORE FINAL: ${score1}`);

console.log("\n📊 CANDIDATE 2: Séquelles de fracture des os propres du nez");
const searchableText2 = normalize("sequelles fracture os propres nez face maxillaire");
let score2 = 0;
keywords.forEach(userKeyword => {
    if (searchableText2.includes(userKeyword)) {
        const weight = getContextualKeywordWeight(userKeyword, normalizedText);
        score2 += weight;
    }
});
console.log(`SCORE FINAL: ${score2}`);

console.log("\n=== RÉSULTAT ===");
console.log(`Candidate 1 (jambe): ${score1}`);
console.log(`Candidate 2 (nez): ${score2}`);
console.log(`GAGNANT: ${score1 > score2 ? 'Fracture jambe' : 'Fracture nez'}`);
console.log("Si notre correction fonctionne, 'Fracture jambe' devrait LARGEMENT gagner !");