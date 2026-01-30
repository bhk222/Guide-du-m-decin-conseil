import { disabilityData } from './data/disabilityRates.ts';

const searchName = "Séquelles de fracture/luxation du rachis lombaire - Avec lésion neurologique légère";

console.log('\n🔍 RECHERCHE DANS disabilityRates.ts:\n');
console.log(`Nom recherché: "${searchName}"`);
console.log(`Longueur: ${searchName.length}`);
console.log(`Caractères: ${Array.from(searchName).map((c, i) => `[${i}:${c.charCodeAt(0)}]`).join('')}\n`);

let found = false;

for (const category of disabilityData) {
    for (const subcategory of category.subcategories) {
        for (const injury of subcategory.injuries) {
            if (injury.name.includes('rachis lombaire') && injury.name.includes('Avec')) {
                console.log(`\n✅ TROUVÉ:`);
                console.log(`Nom barème: "${injury.name}"`);
                console.log(`Longueur: ${injury.name.length}`);
                console.log(`Caractères: ${Array.from(injury.name).map((c, i) => `[${i}:${c.charCodeAt(0)}]`).join('')}`);
                console.log(`\nTaux: ${injury.rate}`);
                console.log(`SearchTerms: ${injury.searchTerms?.slice(0, 3).join(', ')}...`);
                
                console.log(`\n🔬 COMPARAISON:`);
                console.log(`Égalité stricte: ${injury.name === searchName}`);
                console.log(`Égalité lower/trim: ${injury.name.toLowerCase().trim() === searchName.toLowerCase().trim()}`);
                console.log(`Contient nom: ${injury.name.includes(searchName)}`);
                console.log(`Est contenu: ${searchName.includes(injury.name)}`);
                
                found = true;
            }
        }
    }
}

if (!found) {
    console.log('\n❌ AUCUNE RUBRIQUE TROUVÉE avec "rachis lombaire" ET "Avec"');
}
