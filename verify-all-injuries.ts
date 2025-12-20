// Script de vérification : toutes les lésions du barème sont-elles dans les listes déroulantes ?

import { disabilityData } from './data/disabilityRates';

console.log('🔍 VÉRIFICATION EXHAUSTIVE DES LÉSIONS\n');
console.log('=' .repeat(80));

let totalInjuries = 0;
let totalWithRate = 0;
const allInjuries: { name: string; rate: any; path: string }[] = [];

// Parcourir toutes les catégories
disabilityData.forEach(category => {
    console.log(`\n📁 ${category.name}`);
    
    category.subcategories.forEach(subcategory => {
        console.log(`  📂 ${subcategory.name}`);
        
        subcategory.injuries.forEach(injury => {
            totalInjuries++;
            const path = `${category.name} > ${subcategory.name}`;
            allInjuries.push({ name: injury.name, rate: injury.rate, path });
            
            if (injury.rate !== undefined && injury.rate !== null) {
                totalWithRate++;
                
                // Afficher les lésions avec leur taux
                if (Array.isArray(injury.rate)) {
                    console.log(`    ✓ ${injury.name} [${injury.rate[0]}-${injury.rate[1]}%]`);
                } else {
                    console.log(`    ✓ ${injury.name} [${injury.rate}%]`);
                }
            } else {
                console.log(`    ⚠️  ${injury.name} [SANS TAUX]`);
            }
        });
    });
});

console.log('\n' + '='.repeat(80));
console.log('\n📊 STATISTIQUES GLOBALES\n');
console.log(`Total de lésions dans le barème : ${totalInjuries}`);
console.log(`Lésions avec taux IPP : ${totalWithRate}`);
console.log(`Lésions sans taux : ${totalInjuries - totalWithRate}`);

// Rechercher les doublons
console.log('\n' + '='.repeat(80));
console.log('\n🔎 VÉRIFICATION DES DOUBLONS\n');

const injuryNames = allInjuries.map(i => i.name);
const duplicates = injuryNames.filter((name, index) => injuryNames.indexOf(name) !== index);

if (duplicates.length > 0) {
    console.log(`⚠️  ${duplicates.length} doublons détectés :\n`);
    const uniqueDuplicates = [...new Set(duplicates)];
    uniqueDuplicates.forEach(name => {
        const occurrences = allInjuries.filter(i => i.name === name);
        console.log(`  "${name}" :`);
        occurrences.forEach(occ => {
            const rateStr = Array.isArray(occ.rate) ? `[${occ.rate[0]}-${occ.rate[1]}%]` : `[${occ.rate}%]`;
            console.log(`    - ${occ.path} ${rateStr}`);
        });
    });
} else {
    console.log('✅ Aucun doublon détecté');
}

// Lister les catégories principales
console.log('\n' + '='.repeat(80));
console.log('\n📋 RÉPARTITION PAR CATÉGORIE\n');

const categoryStats: { [key: string]: number } = {};
disabilityData.forEach(category => {
    let count = 0;
    category.subcategories.forEach(sub => {
        count += sub.injuries.length;
    });
    categoryStats[category.name] = count;
});

Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count]) => {
        console.log(`${name.padEnd(40)} : ${count} lésions`);
    });

console.log('\n' + '='.repeat(80));
console.log('\n✅ VÉRIFICATION TERMINÉE');
console.log('\nToutes ces lésions DOIVENT être accessibles via :');
console.log('  1. La recherche IA (analyse sémantique + règles expertes)');
console.log('  2. Les listes déroulantes (catégorie > sous-catégorie > lésion)');
console.log('  3. La recherche par mots-clés dans l\'interface\n');
