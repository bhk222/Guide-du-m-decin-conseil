// Test de l'analyse IA pour déboguer le problème
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

// Test des patterns de détection d'os
const boneTerms = {
    tibia: ['tibia', 'tibial', 'jambier'],
    fibula: ['péroné', 'perone', 'fibula', 'fibulaire'],
    face: ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez', 'dent', 'dentaire', 'orbite']
};

console.log("\n=== TEST DÉTECTION OSSEUSE ===");

// Test de détection de "face"
console.log("Mots contenant 'face':", normalizedText.split(' ').filter(word => word.includes('face')));

// Test du pattern d'exclusion pour face
const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
const shouldExcludeFace = faceAnatomicalContext.test(normalizedText);
console.log("Pattern d'exclusion 'face' détecté:", shouldExcludeFace);

// Test pattern "2 os de la jambe"
const deuxOsJambe = /(?:2|deux)\s+os.*jambe/i;
const deuxOsMatch = deuxOsJambe.test(normalizedText);
console.log("Pattern '2 os de la jambe' détecté:", deuxOsMatch);

// Simulation de la détection d'os
const foundBones = new Set();

for (const bone in boneTerms) {
    if (boneTerms[bone].some(term => normalizedText.includes(normalize(term)))) {
        foundBones.add(bone);
    }
}

// Exclusion spéciale pour face
if (foundBones.has('face') && shouldExcludeFace) {
    foundBones.delete('face');
    console.log("'face' exclu du contexte anatomique");
}

// Ajout spécial pour "2 os de la jambe"
if (deuxOsMatch) {
    foundBones.add('tibia');
    foundBones.add('fibula');
    console.log("Ajout tibia + fibula pour '2 os de la jambe'");
}

console.log("Os détectés:", Array.from(foundBones));

// Test des mots-clés anatomiques
const anatomicalKeywords = {
    'jambe': 'Membres Inférieurs',
    'tibia': 'Membres Inférieurs', 
    'péroné': 'Membres Inférieurs',
    'face': 'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques'
};

console.log("\n=== TEST CLASSIFICATION ANATOMIQUE ===");
for (const keyword in anatomicalKeywords) {
    if (normalizedText.includes(keyword)) {
        if (keyword === 'face' && shouldExcludeFace) {
            console.log(`Mot-clé '${keyword}' exclu (contexte anatomique)`);
        } else {
            console.log(`Mot-clé '${keyword}' → ${anatomicalKeywords[keyword]}`);
        }
    }
}