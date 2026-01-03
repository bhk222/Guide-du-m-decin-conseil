import { disabilityData } from './data/disabilityRates.new.js';

// Test input
const testInput = "genou droit raideur flexion 105° + instabilité LCA résiduelle";
const disabilityRates = disabilityData;

// Recherche manuelle de l'entrée attendue
const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

let found = false;
for (const category of disabilityRates) {
    for (const subcategory of category.subcategories) {
        for (const injury of subcategory.injuries) {
            const normalizedName = normalize(injury.name);
            if (normalizedName.includes('raideur') && normalizedName.includes('genou') && normalizedName.includes('instabilite') && normalizedName.includes('lca')) {
                console.log('\n✅ Entrée trouvée:');
                console.log(`Name: ${injury.name}`);
                console.log(`Rate: ${JSON.stringify(injury.rate)}`);
                console.log(`SearchTerms: ${JSON.stringify(injury.searchTerms)}`);
                console.log(`Category: ${category.name}`);
                console.log(`Subcategory: ${subcategory.name}`);
                found = true;
            }
        }
    }
}

if (!found) {
    console.log('\n❌ Entrée "Raideur genou + instabilité LCA (cumul)" non trouvée dans la DB');
}

// Chercher les lésions individuelles
console.log('\n📋 Lésions individuelles trouvées:');
for (const category of disabilityRates) {
    for (const subcategory of category.subcategories) {
        for (const injury of subcategory.injuries) {
            const normalizedName = normalize(injury.name);
            if ((normalizedName.includes('raideur') && normalizedName.includes('genou') && !normalizedName.includes('cumul')) ||
                (normalizedName.includes('instabilite') && normalizedName.includes('lca') && !normalizedName.includes('cumul'))) {
                console.log(`  - ${injury.name} [${JSON.stringify(injury.rate)}]`);
                if (injury.searchTerms) {
                    console.log(`    SearchTerms: ${injury.searchTerms.slice(0, 2).join(', ')}...`);
                }
            }
        }
    }
}
