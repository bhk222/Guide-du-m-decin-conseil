/**
 * Test de débogage : vérifier si searchTerms sont lus
 */

import { disabilityData } from './data/disabilityRates.new';

// Trouver une entrée avec searchTerms
const allInjuries = disabilityData.flatMap(cat => 
    cat.subcategories.flatMap(sub => 
        sub.injuries.map(inj => ({ ...inj, path: `${cat.name} > ${sub.name}` }))
    )
);

console.log('\n🔍 RECHERCHE ENTRIES AVEC SEARCHTERMS:\n');

// Chercher "Raideur genou + instabilité LCA (cumul)"
const cumulEntry = allInjuries.find(inj => inj.name.includes('Raideur genou + instabilité LCA'));

if (cumulEntry) {
    console.log('✅ Entrée trouvée:');
    console.log(`   Name: ${cumulEntry.name}`);
    console.log(`   Rate: ${Array.isArray(cumulEntry.rate) ? `[${cumulEntry.rate[0]}-${cumulEntry.rate[1]}%]` : `${cumulEntry.rate}%`}`);
    console.log(`   SearchTerms: ${cumulEntry.searchTerms ? JSON.stringify(cumulEntry.searchTerms) : 'UNDEFINED'}`);
    console.log(`   Path: ${cumulEntry.path}`);
} else {
    console.log('❌ Entrée NON trouvée');
}

// Compter combien d'entrées ont searchTerms
const withSearchTerms = allInjuries.filter(inj => inj.searchTerms && inj.searchTerms.length > 0);
const withoutSearchTerms = allInjuries.filter(inj => !inj.searchTerms || inj.searchTerms.length === 0);

console.log(`\n📊 STATISTIQUES:`);
console.log(`   Total entrées: ${allInjuries.length}`);
console.log(`   Avec searchTerms: ${withSearchTerms.length} (${(withSearchTerms.length / allInjuries.length * 100).toFixed(1)}%)`);
console.log(`   Sans searchTerms: ${withoutSearchTerms.length} (${(withoutSearchTerms.length / allInjuries.length * 100).toFixed(1)}%)`);

// Afficher 5 exemples avec searchTerms
console.log(`\n✅ Exemples AVEC searchTerms (5 premiers):`);
withSearchTerms.slice(0, 5).forEach(inj => {
    console.log(`   - ${inj.name}`);
    console.log(`     Terms: [${inj.searchTerms!.slice(0, 3).join(', ')}...]`);
});
