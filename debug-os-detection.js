// Debug détaillé de la détection des os
const boneTerms = {
    tibia: ['tibia', 'tibial', 'tibiale', 'plateau tibial', 'malléole interne'],
    fibula: ['péroné', 'fibula', 'fibulaire', 'péronier', 'malléole externe'],
    face: ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez', 'dent', 'dentaire', 'orbite'],
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

const testText = "age de 72 victime d'un at survenue le 12 mars 2010 a l'origine de fracture des 2 os de la jambe droite ; sequelles : saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";
const normalizedTestText = normalize(testText);

console.log("=== DEBUG DÉTECTION DES OS ===");
console.log("Texte normalisé:", normalizedTestText);
console.log();

// Test de chaque os individuellement
for (const bone in boneTerms) {
    console.log(`--- Test pour '${bone}' ---`);
    for (const term of boneTerms[bone]) {
        const normalizedTerm = normalize(term);
        const found = normalizedTestText.includes(normalizedTerm);
        console.log(`  '${term}' -> '${normalizedTerm}' : ${found ? '✅ TROUVÉ' : '❌ NON TROUVÉ'}`);
    }
    
    const boneDetected = boneTerms[bone].some(term => normalizedTestText.includes(normalize(term)));
    console.log(`  RÉSULTAT pour ${bone}: ${boneDetected ? '✅ DÉTECTÉ' : '❌ NON DÉTECTÉ'}`);
    console.log();
}

// Test spécial pour "deux os de la jambe"
console.log("=== TEST SPÉCIAL 'deux os de la jambe' ===");
console.log("Contient 'deux os de la jambe':", normalizedTestText.includes("deux os de la jambe"));
console.log("Contient 'tibia':", normalizedTestText.includes("tibia"));
console.log("Contient 'fibula':", normalizedTestText.includes("fibula"));
console.log("Contient 'perone':", normalizedTestText.includes("perone"));

// Test du regex face
console.log("=== TEST EXCLUSION FACE ===");
const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
const faceMatch = normalizedTestText.match(faceAnatomicalContext);
console.log("Match regex face:", faceMatch);
if (faceMatch) {
    console.log("Texte matché:", faceMatch[0]);
}