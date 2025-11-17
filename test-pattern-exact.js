// Test du pattern avec le texte exact de l'utilisateur
const normalizedText = "fracture des 2 os de la jambe droite sequelles saillie de la face interne de la jambe droite avec genou valgum";

const faceAnatomicalContext = /(?:face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre))|(?:(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre))/i;

console.log("Texte à tester:", normalizedText);
console.log("");
console.log("Pattern regex:", faceAnatomicalContext);
console.log("");

const result = faceAnatomicalContext.test(normalizedText);
console.log("✅ Le pattern matche:", result);

// Test avec extraction
const matches = normalizedText.match(faceAnatomicalContext);
if (matches) {
    console.log("Match trouvé:", matches[0]);
}

// Test des deux parties du pattern séparément
const pattern1 = /face\s+(?:interne|externe).*(?:jambe|bras|cuisse|avant-bras|membre)/i;
const pattern2 = /(?:interne|externe).*face.*(?:jambe|bras|cuisse|avant-bras|membre)/i;

console.log("");
console.log("Pattern 1 (face interne... jambe):", pattern1.test(normalizedText));
console.log("Pattern 2 (interne... face... jambe):", pattern2.test(normalizedText));

// Vérifier si "face" et "interne" et "jambe" sont tous présents
const hasFace = normalizedText.includes('face');
const hasInterne = normalizedText.includes('interne');
const hasJambe = normalizedText.includes('jambe');

console.log("");
console.log("Contient 'face':", hasFace);
console.log("Contient 'interne':", hasInterne);
console.log("Contient 'jambe':", hasJambe);
