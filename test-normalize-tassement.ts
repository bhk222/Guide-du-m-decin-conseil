// Test normalisation tassement
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, "'")
    .replace(/['"«»]/g, ' ')
    .trim();
}

// searchTerm de ma règle
const searchTerm = "Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur";

// Nom du barème
const baremeName = "Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur";

console.log("🔍 COMPARAISON NORMALIZE:");
console.log("searchTerm:", searchTerm);
console.log("baremeName:", baremeName);
console.log("\nNormalized searchTerm:", normalize(searchTerm));
console.log("Normalized baremeName:", normalize(baremeName));
console.log("\nMatch:", normalize(searchTerm) === normalize(baremeName));

// Test avec le texte d'entrée
const userInput = "tassement vertébral L3 avec cyphose 15 degrés raideur lombaire distance doigts sol 40cm lombalgie chronique";
const pattern = /tassement.*vert[eé]br.*L\d/i;
const context = /cyphose.*\d+.*degr[eé]s|raideur.*lombaire|DDS|lombalgie/i;

console.log("\n🎯 TEST PATTERN:");
console.log("Input:", userInput);
console.log("Pattern match:", pattern.test(userInput));
console.log("Context match:", context.test(userInput));
