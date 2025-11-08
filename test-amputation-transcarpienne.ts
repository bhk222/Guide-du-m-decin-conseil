import { disabilityData } from './data/disabilityRates';

const allInjuriesWithPaths = disabilityData.flatMap(cat => 
    cat.subcategories.flatMap(sub => 
        sub.injuries.map(inj => ({
            ...inj,
            path: `${cat.name} > ${sub.name}`
        }))
    )
);

function normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['\-\s]/g, '');
}

// Test règle experte amputation transcarpienne
const input = "Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures.";

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST: AMPUTATION TRANSCARPIENNE (TERME MÉDICAL)');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Input: "${input}"\n`);

// Test pattern
const pattern1 = /amputation\s+(?:trans)?carpien/i;
const context1 = /main|poignet|carpe/i;

console.log('🔍 TEST RÈGLE EXPERTE:');
console.log(`   Pattern /amputation\\s+(?:trans)?carpien/i: ${pattern1.test(input)}`);
console.log(`   Context /main|poignet|carpe/i: ${context1.test(input)}`);

if (pattern1.test(input) && context1.test(input)) {
    console.log('   ✅ Règle experte MATCHED!\n');
    
    const searchTerm = "Amputation de la main (Main Dominante)";
    const directMatch = allInjuriesWithPaths.find(item => 
        normalize(item.name) === normalize(searchTerm)
    );
    
    if (directMatch) {
        console.log('📊 RÉSULTAT:');
        console.log(`   Séquelle: ${directMatch.name}`);
        console.log(`   Taux IPP: ${Array.isArray(directMatch.rate) ? `${directMatch.rate[0]}-${directMatch.rate[1]}%` : `${directMatch.rate}%`}`);
        console.log(`   Rubrique: ${directMatch.path}`);
    }
} else {
    console.log('   ❌ Règle experte NOT matched\n');
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('TEST 2: PERTE FONCTIONNELLE TOTALE MAIN DOMINANTE');
console.log('═══════════════════════════════════════════════════════════════\n');

const input2 = "perte fonctionnelle totale de la main dominante";

console.log(`Input: "${input2}"\n`);

const pattern2 = /(?:perte|amputation).*(?:totale|fonctionnelle).*main/i;
const context2 = /dominante?|droite?|membre.*sup[eé]rieur/i;

console.log('🔍 TEST RÈGLE EXPERTE:');
console.log(`   Pattern: ${pattern2.test(input2)}`);
console.log(`   Context: ${context2.test(input2)}`);

if (pattern2.test(input2) && context2.test(input2)) {
    console.log('   ✅ Règle experte MATCHED!\n');
    
    const searchTerm = "Amputation de la main (Main Dominante)";
    const directMatch = allInjuriesWithPaths.find(item => 
        normalize(item.name) === normalize(searchTerm)
    );
    
    if (directMatch) {
        console.log('📊 RÉSULTAT:');
        console.log(`   Séquelle: ${directMatch.name}`);
        console.log(`   Taux IPP: ${Array.isArray(directMatch.rate) ? `${directMatch.rate[0]}-${directMatch.rate[1]}%` : `${directMatch.rate}%`}`);
    }
}
