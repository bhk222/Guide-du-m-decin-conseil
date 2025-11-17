// Test complet de la détection des os avec le cas problématique
const boneTerms = {
    // Membre Supérieur
    clavicule: ['clavicule'],
    omoplate: ['omoplate', 'scapula', 'glène', 'acromion', 'coracoïde'],
    humerus: ['humérus', 'humeral', 'humerale', 'tête humérale', 'col chirurgical', 'trochiter', 'trochin', 'palette humérale'],
    radius: ['radius', 'radiale', 'styloïde radiale', 'tête radiale'],
    ulna: ['cubitus', 'ulna', 'ulnaire', 'olécrane', 'coronoïde', 'styloïde cubitale', 'cubital', 'cubitale'],
    carpe: ['carpe', 'carpien', 'scaphoïde', 'semi-lunaire', 'demi-lunaire', 'pyramidal', 'pisiforme', 'trapèze', 'trapézoïde', 'grand os', 'os crochu'],
    metacarpe: ['métacarpe', 'métacarpien', 'benett', 'rolando'],
    phalange_main: ['phalange', 'doigt', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'],

    // Membre Inférieur
    femur: ['fémur', 'fémoral', 'femorale', 'col du fémur', 'condyle fémoral', 'trochanter', 'diaphyse fémorale'],
    rotule: ['rotule', 'patella', 'patellaire'],
    tibia: ['tibia', 'tibial', 'tibiale', 'plateau tibial', 'malléole interne'],
    fibula: ['péroné', 'fibula', 'fibulaire', 'péronier', 'malléole externe'],
    tarse: ['tarse', 'astragale', 'calcanéum', 'scaphoïde tarsien', 'cuboïde', 'cunéiforme'],
    metatarse: ['métatarse', 'métatarsien', 'lisfranc'],
    phalange_pied: ['orteil', 'phalange', 'hallux'],

    // Tronc & Tête
    crane: ['crâne', 'cranien', 'rocher', 'occipital', 'frontal', 'pariétal', 'temporal'],
    face: ['maxillaire', 'mandibule', 'malaire', 'zygomatique', 'os propres du nez', 'dent', 'dentaire', 'orbite'],
    hyoide: ['hyoïde', 'hyoidien'],
    vertebre: ['vertèbre', 'vertebral', 'cervical', 'dorsal', 'lombaire', 'rachis', 'atlas', 'axis', 'apophyse', 'odontoïde'],
    sacrum: ['sacrum', 'sacro-iliaque'],
    coccyx: ['coccyx'],
    bassin: ['bassin', 'iliaque', 'pubis', 'cotyle', 'ischion', 'symphyse pubienne'],
    sternum: ['sternum', 'manubrium', 'xiphoïde'],
    cote: ['côte', 'costal', 'gril costal'],
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

const getBonesFromString = (normalizedText) => {
    const foundBones = new Set();
    for (const bone in boneTerms) {
        if (boneTerms[bone].some(term => normalizedText.includes(normalize(term)))) {
            foundBones.add(bone);
        }
    }
    
    // EXCLUSION SPÉCIALE: "face" anatomique vs "face" (visage)
    // Exclure "face" si c'est dans le contexte "face interne/externe de jambe/bras/cuisse"
    if (foundBones.has('face')) {
        const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;
        if (faceAnatomicalContext.test(normalizedText)) {
            console.log("✅ EXCLUSION ACTIVÉE: 'face' détecté dans contexte anatomique:", normalizedText.match(faceAnatomicalContext)[0]);
            foundBones.delete('face');
        }
    }
    
    // Special cases for "deux os"
    if (normalizedText.includes("deux os de l avant bras") || (normalizedText.includes('radius') && (normalizedText.includes('cubitus') || normalizedText.includes('ulna')))) {
        foundBones.add('radius');
        foundBones.add('ulna');
    }
    if (normalizedText.includes("deux os de la jambe") || (normalizedText.includes('tibia') && (normalizedText.includes('perone') || normalizedText.includes('fibula')))) {
        foundBones.add('tibia');
        foundBones.add('fibula');
    }
    return foundBones;
};

// Test avec le cas problématique
const testText = "age de 72 victime d'un at survenue le 12 mars 2010 a l'origine de fracture des 2 os de la jambe droite ; sequelles : saillie osseuse au niveau de la face interne de la jambe droite avec un genou valgum droit";
const normalizedTestText = normalize(testText);

console.log("=== TEST DE DÉTECTION DES OS ===");
console.log("Texte original:", testText);
console.log("Texte normalisé:", normalizedTestText);
console.log();

const detectedBones = getBonesFromString(normalizedTestText);
console.log("Os détectés:", Array.from(detectedBones));

if (detectedBones.has('face')) {
    console.log("❌ ERREUR: 'face' encore détecté - la correction n'a pas fonctionné");
} else {
    console.log("✅ SUCCÈS: 'face' correctement exclu");
}

if (detectedBones.has('tibia') && detectedBones.has('fibula')) {
    console.log("✅ SUCCÈS: 'tibia' et 'fibula' correctement détectés");
} else {
    console.log("❌ PROBLÈME: os de la jambe non détectés");
}