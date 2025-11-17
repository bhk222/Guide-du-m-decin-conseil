// Test de traçage complet du parcours d'analyse
const testText = "fracture des 2 os de la jambe droite ; saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";

console.log("=== TEST DE TRAÇAGE COMPLET ===\n");
console.log("Texte d'entrée:", testText);
console.log("\n=== ÉTAPE 1: NORMALISATION ===");

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
console.log("Texte normalisé:", normalizedText);

console.log("\n=== ÉTAPE 2: EXTRACTION KEYWORDS ===");

const stopWords = ['de', 'du', 'la', 'le', 'les', 'un', 'une', 'et', 'avec', 'au', 'des', 'ou', 'a'];
const keywords = normalizedText.split(' ').filter(w => w && !stopWords.includes(w));
console.log("Keywords extraits:", keywords);
console.log("Nombre de keywords:", keywords.length);

// Vérifier si "face" est dans les keywords
const hasFace = keywords.includes('face');
console.log("'face' présent dans keywords:", hasFace);

console.log("\n=== ÉTAPE 3: DÉTECTION OSSEUSE ===");

const boneTerms = {
    tibia: ['tibia', 'tibial', 'jambier'],
    fibula: ['péroné', 'perone', 'fibula', 'fibulaire'],
    face: ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez']
};

const foundBones = new Set();
for (const bone in boneTerms) {
    if (boneTerms[bone].some(term => normalizedText.includes(normalize(term)))) {
        foundBones.add(bone);
    }
}

console.log("Os détectés (avant exclusion):", Array.from(foundBones));

// Pattern "2 os de la jambe"
const deuxOsJambe = /(?:2|deux)\s+os.*jambe/i;
if (deuxOsJambe.test(normalizedText)) {
    foundBones.add('tibia');
    foundBones.add('fibula');
    console.log("Pattern '2 os de la jambe' détecté → Ajout tibia + fibula");
}

// Exclusion "face" en contexte anatomique
const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
if (foundBones.has('face') && faceAnatomicalContext.test(normalizedText)) {
    foundBones.delete('face');
    console.log("'face' exclu (contexte anatomique directionnel)");
}

console.log("Os détectés (après exclusion):", Array.from(foundBones));

console.log("\n=== ÉTAPE 4: CLASSIFICATION ANATOMIQUE ===");

const anatomicalKeywords = {
    'jambe': 'Membres Inférieurs',
    'tibia': 'Membres Inférieurs',
    'péroné': 'Membres Inférieurs',
    'fibula': 'Membres Inférieurs',
    'face': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
    'genou': 'Membres Inférieurs'
};

const getAnatomicalCategory = (keyword, normalizedText) => {
    if (keyword === 'face') {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            console.log(`  ⚠️  '${keyword}' exclu de la classification (contexte anatomique)`);
            return undefined;
        }
    }
    return anatomicalKeywords[keyword];
};

const categoriesFound = new Set();
for (const keyword in anatomicalKeywords) {
    if (normalizedText.includes(keyword)) {
        const category = getAnatomicalCategory(keyword, normalizedText);
        if (category) {
            categoriesFound.add(category);
            console.log(`  ✅ '${keyword}' → ${category}`);
        }
    }
}

console.log("Catégories anatomiques:", Array.from(categoriesFound));

console.log("\n=== ÉTAPE 5: SCORING DES CANDIDATES ===");

const keywordWeights = {
    'fracture': 50,
    '2': 1,
    'os': 30,
    'jambe': 95,
    'droite': 5,
    'sequelles': 40,
    'saillie': 30,
    'osseuse': 30,
    'niveau': 5,
    'face': 95,
    'interne': 10,
    'genou': 100,
    'valgum': 30
};

const getContextualKeywordWeight = (keyword, normalizedText) => {
    if (keyword === 'face') {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            console.log(`    ⚠️  '${keyword}' → poids 0 (exclu du scoring)`);
            return 0;
        }
    }
    const weight = keywordWeights[keyword] || 1;
    return weight;
};

// Simulation de 3 candidates
const candidates = [
    {
        name: "Fracture consolidée des deux os de la jambe",
        searchText: "fracture consolidee deux os jambe tibia fibula perone",
        category: "Membres Inférieurs"
    },
    {
        name: "Séquelles de fracture des os propres du nez",
        searchText: "sequelles fracture os propres nez face maxillaire",
        category: "Séquelles Maxillo-Faciales, ORL et Ophtalmologiques"
    },
    {
        name: "Raideur du genou",
        searchText: "raideur limitation genou flexion extension",
        category: "Membres Inférieurs"
    }
];

console.log("\nScoring des candidates:");
const scores = [];

for (const candidate of candidates) {
    let score = 0;
    const searchableText = normalize(candidate.searchText);
    
    console.log(`\n📊 ${candidate.name}:`);
    console.log(`   Texte recherche: "${searchableText}"`);
    
    // Calcul du score
    keywords.forEach(userKeyword => {
        if (searchableText.includes(userKeyword)) {
            const weight = getContextualKeywordWeight(userKeyword, normalizedText);
            if (weight > 0) {
                console.log(`    ✅ '${userKeyword}' → +${weight}`);
            }
            score += weight;
        }
    });
    
    console.log(`   SCORE TOTAL: ${score}`);
    scores.push({ name: candidate.name, score, category: candidate.category });
}

console.log("\n=== RÉSULTAT FINAL ===");
scores.sort((a, b) => b.score - a.score);
console.log("Classement:");
scores.forEach((s, i) => {
    console.log(`${i + 1}. ${s.name} - Score: ${s.score} (${s.category})`);
});

console.log(`\n🏆 GAGNANT: ${scores[0].name}`);
console.log(`📊 Score: ${scores[0].score}`);
console.log(`📂 Catégorie: ${scores[0].category}`);

if (scores[0].category === "Membres Inférieurs") {
    console.log("\n✅ ✅ ✅ SUCCÈS ! La correction fonctionne !");
} else {
    console.log("\n❌ ❌ ❌ ÉCHEC ! Le problème persiste...");
    console.log("\nAnalyse:");
    console.log("- Si 'face' a été exclu du scoring (poids 0), pourquoi le nez gagne-t-il ?");
    console.log("- Il doit y avoir un autre chemin de code ou une logique de fallback");
}