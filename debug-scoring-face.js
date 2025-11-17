// Script pour debugger l'analyse du cas problématique
console.log("🔍 DEBUG ANALYSE IA - CAS PROBLÉMATIQUE");
console.log("=" .repeat(50));

const testText = "agé de 72 victime d'un at survenue le 12 mars 2010 a l'origine de fracture des 2 os de la jambe droite ; sequelles : saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";

console.log("Texte d'entrée:");
console.log(testText);
console.log("\n" + "=" .repeat(50));

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

// Keywords extraction
const keywords = normalizedText.split(' ').filter(word => word.length > 2);
console.log("\nMots-clés extraits (>2 char):");
console.log(keywords);

// Simulation du système de scoring
console.log("\n" + "=" .repeat(50));
console.log("🎯 SIMULATION SYSTÈME DE SCORING");

// boneTerms simulé
const boneTerms = {
    tibia: ['tibia', 'tibial', 'jambier'],
    fibula: ['péroné', 'perone', 'fibula', 'fibulaire'],
    face: ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez', 'dent', 'dentaire', 'orbite']
};

// Détection osseuse
const foundBones = new Set();
for (const bone in boneTerms) {
    if (boneTerms[bone].some(term => normalizedText.includes(normalize(term)))) {
        foundBones.add(bone);
    }
}

console.log("Os détectés (initial):", Array.from(foundBones));

// Pattern "2 os de la jambe"
const deuxOsJambe = /(?:2|deux)\s+os.*jambe/i;
if (deuxOsJambe.test(normalizedText)) {
    foundBones.add('tibia');
    foundBones.add('fibula');
    console.log("Pattern '2 os de la jambe' → Ajout tibia + fibula");
}

// Exclusion face dans contexte anatomique
const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
if (foundBones.has('face') && faceAnatomicalContext.test(normalizedText)) {
    foundBones.delete('face');
    console.log("Exclusion 'face' dans contexte anatomique");
}

console.log("Os finaux détectés:", Array.from(foundBones));

// Classification anatomique
const anatomicalKeywords = {
    'jambe': 'Membres Inférieurs',
    'tibia': 'Membres Inférieurs', 
    'péroné': 'Membres Inférieurs',
    'fibula': 'Membres Inférieurs',
    'face': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques'
};

console.log("\n🏷️ CLASSIFICATION ANATOMIQUE:");
const detectedCategories = new Set();
for (const keyword in anatomicalKeywords) {
    if (normalizedText.includes(keyword)) {
        if (keyword === 'face' && faceAnatomicalContext.test(normalizedText)) {
            console.log(`Mot-clé '${keyword}' exclu (contexte anatomique)`);
        } else {
            console.log(`Mot-clé '${keyword}' → ${anatomicalKeywords[keyword]}`);
            detectedCategories.add(anatomicalKeywords[keyword]);
        }
    }
}

console.log("\nCatégories anatomiques détectées:", Array.from(detectedCategories));

// Vérification des keywords pour scoring
const keywordWeights = {
    'fracture': 50,
    'jambe': 95,
    'tibia': 95,
    'fibula': 95,
    'face': 95, // Problématique !
    'sequelles': 40,
    'saillie': 30,
    'genou': 100,
    'valgum': 30
};

console.log("\n⚖️ POIDS DES MOTS-CLÉS:");
let totalScore = 0;
keywords.forEach(kw => {
    if (keywordWeights[kw]) {
        console.log(`'${kw}' → ${keywordWeights[kw]} points`);
        totalScore += keywordWeights[kw];
    }
});

// Vérification "face" dans le scoring
if (normalizedText.includes('face')) {
    if (faceAnatomicalContext.test(normalizedText)) {
        console.log("\n⚠️ PROBLÈME DÉTECTÉ:");
        console.log("'face' est présent dans le texte ET exclut du contexte anatomique");
        console.log("MAIS 'face' pourrait encore avoir un poids de 95 dans keywordWeights !");
        console.log("Cela pourrait faire pencher le scoring vers les séquelles maxillo-faciales");
    }
}

console.log(`\nScore total simulé: ${totalScore}`);

console.log("\n" + "=" .repeat(50));
console.log("🚨 CONCLUSION DEBUGGING:");
console.log("1. ✅ Détection osseuse fonctionne: tibia + fibula détectés");
console.log("2. ✅ Exclusion 'face' fonctionne dans boneDetection");
console.log("3. ✅ Classification anatomique fonctionne: 'Membres Inférieurs'");
console.log("4. ❌ PROBABLE: 'face' garde son poids élevé dans keywordWeights");
console.log("5. ❌ PROBABLE: Système de scoring penche vers Maxillo-Facial à cause du poids de 'face'");
console.log("\n💡 SOLUTION: Exclure 'face' des keywordWeights dans contexte anatomique !");