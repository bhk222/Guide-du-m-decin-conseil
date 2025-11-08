import { disabilityData as disabilityRates } from './data/disabilityRates';

const searchTermLombaire = "Tassement d'une vertèbre lombaire - Avec cyphose et/ou raideur";
const searchTermDorsal = "Tassement d'une vertèbre dorsale - Avec cyphose";
const searchTermPouce = "Amputation du pouce - Désarticulation métacarpo-phalangienne";
const searchTermIndex = "Amputation de l'index - Désarticulation métacarpo-phalangienne";

console.log("🔍 DEBUG SEARCH TERMS\n");

console.log("📍 Recherche Pouce:", searchTermPouce);
const foundPouce = disabilityRates
    .flatMap(cat => cat.subcategories)
    .flatMap(sub => sub.injuries)
    .find(d => d.name === searchTermPouce);
console.log("   Trouvé:", foundPouce ? `OUI - rate: ${foundPouce.rate}` : "NON");

console.log("\n📍 Recherche Index:", searchTermIndex);
const foundIndex = disabilityRates
    .flatMap(cat => cat.subcategories)
    .flatMap(sub => sub.injuries)
    .find(d => d.name === searchTermIndex);
console.log("   Trouvé:", foundIndex ? `OUI - rate: ${foundIndex.rate}` : "NON");

console.log("\n📍 Recherche Lombaire:", searchTermLombaire);
const foundLombaire = disabilityRates
    .flatMap(cat => cat.subcategories)
    .flatMap(sub => sub.injuries)
    .find(d => d.name === searchTermLombaire);
console.log("   Trouvé:", foundLombaire ? `OUI - rate: ${foundLombaire.rate}` : "NON");

console.log("\n📍 Recherche Dorsal:", searchTermDorsal);
const foundDorsal = disabilityRates
    .flatMap(cat => cat.subcategories)
    .flatMap(sub => sub.injuries)
    .find(d => d.name === searchTermDorsal);
console.log("   Trouvé:", foundDorsal ? `OUI - rate: ${foundDorsal.rate}` : "NON");

// Recherche fuzzy
console.log("\n📍 Entrées similaires à 'tassement vertèbre lombaire':");
const similarLombaire = disabilityRates
    .flatMap(cat => cat.subcategories)
    .flatMap(sub => sub.injuries)
    .filter(d => d.name.toLowerCase().includes('tassement') && d.name.toLowerCase().includes('lombaire'))
    .map(d => `   - ${d.name} (${d.rate})`);
similarLombaire.forEach(s => console.log(s));

console.log("\n📍 Entrées similaires à 'tassement vertèbre dorsale':");
const similarDorsal = disabilityRates
    .flatMap(cat => cat.subcategories)
    .flatMap(sub => sub.injuries)
    .filter(d => d.name.toLowerCase().includes('tassement') && d.name.toLowerCase().includes('dorsal'))
    .map(d => `   - ${d.name} (${d.rate})`);
similarDorsal.forEach(s => console.log(s));
