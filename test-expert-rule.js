const normalize = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/œ/g, 'oe')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const text = normalize("victime d'un accident de travail a l'origine de cécité totale de l'œil gauche");
console.log("Normalized text:", text);
console.log("");

// Test expert rule
const pattern = /cecite.*oeil|oeil.*cecite|perte.*vision.*oeil|oeil.*(?:perdu|aveugle)|vision.*oeil.*(?:perdu|perte)/i;
const context = /oeil|yeux|vision/i;
const negativeContext = /deux\s+yeux|bilateral|les\s+yeux|maxillaire|machoire|dent|fracture/i;

console.log("Pattern test:", pattern.test(text));
console.log("Context test:", context.test(text));
console.log("Negative context test:", negativeContext.test(text));
console.log("");

if (pattern.test(text) && context.test(text)) {
    if (negativeContext.test(text)) {
        console.log("❌ BLOCKED by negativeContext!");
        console.log("Text contains:", text.match(negativeContext));
    } else {
        console.log("✅ Expert rule should match!");
    }
} else {
    console.log("❌ Pattern or context doesn't match");
}
