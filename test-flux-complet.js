// Simuler EXACTEMENT le flux d'analyse de l'IA avec le texte utilisateur

const userInput = "agé de 72 ans victime d'un at survenue le 10 mars 2010 occasioinant une fracture des 2 os de la jambe droite ; sequelles saillie de la face interne de la jambe droite avec genou valgum";

// Étape 1: Normalisation (comme dans AiAnalyzer.tsx)
const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const normalizedText = normalize(userInput);
console.log("=== TEXTE NORMALISÉ ===");
console.log(normalizedText);
console.log("");

// Étape 2: Extraction des keywords
const keywords = normalizedText.split(' ').filter(k => k.length > 0);
console.log("=== KEYWORDS EXTRAITS ===");
console.log(keywords);
console.log("'face' dans keywords:", keywords.includes('face'));
console.log("");

// Étape 3: Test du pattern anatomique
const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
const shouldExcludeFace = faceAnatomicalContext.test(normalizedText);

console.log("=== TEST PATTERN ANATOMIQUE ===");
console.log("Pattern détecté:", shouldExcludeFace);
console.log("=> 'face' devrait être EXCLU:", shouldExcludeFace);
console.log("");

// Étape 4: Simulation getContextualKeywordWeight
const keywordWeights = {
    'face': 95,
    'fracture': 50,
    'jambe': 95,
    'genou': 100,
    'valgum': 30
};

const getContextualKeywordWeight = (keyword, text) => {
    if (keyword === 'face') {
        const pattern = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (pattern.test(text)) {
            return 0; // EXCLU
        }
    }
    return keywordWeights[keyword] || 1;
};

console.log("=== POIDS DES KEYWORDS ===");
for (const kw of ['face', 'fracture', 'jambe', 'genou', 'valgum']) {
    if (keywords.includes(kw)) {
        const weight = getContextualKeywordWeight(kw, normalizedText);
        console.log(`'${kw}' → poids: ${weight} ${weight === 0 ? '(EXCLU)' : ''}`);
    }
}
console.log("");

// Étape 5: Simulation scoring pour "Fracture nez" vs "Fracture jambe"
const fractureNezKeywords = ['fracture', 'os', 'propres', 'nez', 'face', 'maxillaire'];
const fractureJambeKeywords = ['fracture', 'deux', 'os', 'jambe', 'tibia', 'fibula', 'perone'];

let scoreNez = 0;
let scoreJambe = 0;

for (const kw of fractureNezKeywords) {
    if (keywords.includes(kw)) {
        scoreNez += getContextualKeywordWeight(kw, normalizedText);
    }
}

for (const kw of fractureJambeKeywords) {
    if (keywords.includes(kw)) {
        scoreJambe += getContextualKeywordWeight(kw, normalizedText);
    }
}

console.log("=== SCORING FINAL ===");
console.log(`Fracture nez: ${scoreNez} points`);
console.log(`Fracture jambe: ${scoreJambe} points`);
console.log("");

if (scoreJambe > scoreNez) {
    console.log("✅ ✅ ✅ SUCCÈS ! Fracture jambe gagne");
} else {
    console.log("❌ ❌ ❌ ÉCHEC ! Fracture nez gagne");
}
