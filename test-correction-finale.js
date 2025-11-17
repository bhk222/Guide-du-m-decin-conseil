// Test avec la correction pour "2 os de la jambe"
const getBonesFromString = (normalizedText) => {
    const foundBones = new Set();
    
    // Test simple pour les os de base d'abord
    if (normalizedText.includes("tibia")) foundBones.add('tibia');
    if (normalizedText.includes("fibula")) foundBones.add('fibula');
    if (normalizedText.includes("perone")) foundBones.add('fibula');
    
    // Test pour "face" (visage)
    const faceTerms = ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez', 'dent', 'dentaire', 'orbite'];
    for (const term of faceTerms) {
        if (normalizedText.includes(term.toLowerCase())) {
            foundBones.add('face');
            break;
        }
    }
    
    // EXCLUSION SPÉCIALE: "face" anatomique vs "face" (visage)
    if (foundBones.has('face')) {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            console.log("✅ EXCLUSION ACTIVÉE: 'face' détecté dans contexte anatomique");
            foundBones.delete('face');
        }
    }
    
    // Special cases for "deux os" ou "2 os"
    if (normalizedText.includes("deux os de la jambe") || normalizedText.includes("2 os de la jambe")) {
        console.log("✅ Détection spéciale: 'deux os de la jambe' ou '2 os de la jambe'");
        foundBones.add('tibia');
        foundBones.add('fibula');
    }
    
    return foundBones;
};

const normalize = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Supprimer accents
        .replace(/[-']/g, ' ')            // Remplacer tirets et apostrophes par espaces
        .replace(/\s+/g, ' ')             // Normaliser espaces multiples
        .trim();
};

// Test avec le cas problématique
const testText = "age de 72 victime d'un at survenue le 12 mars 2010 a l'origine de fracture des 2 os de la jambe droite ; sequelles : saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";
const normalizedTestText = normalize(testText);

console.log("=== TEST CORRIGÉ ===");
console.log("Texte normalisé:", normalizedTestText);
console.log();

const detectedBones = getBonesFromString(normalizedTestText);
console.log("Os détectés:", Array.from(detectedBones));

if (detectedBones.has('face')) {
    console.log("❌ ERREUR: 'face' encore détecté");
} else {
    console.log("✅ SUCCÈS: 'face' correctement exclu");
}

if (detectedBones.has('tibia') && detectedBones.has('fibula')) {
    console.log("✅ SUCCÈS: 'tibia' et 'fibula' correctement détectés");
} else {
    console.log("❌ PROBLÈME: os de la jambe non détectés");
}