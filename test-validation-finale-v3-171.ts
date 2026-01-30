import { localExpertAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST VALIDATION FINALE V3.3.171\n');
console.log('='.repeat(80));

// ========== CAS 1: Fracture-Luxation L1 avec steppage et amyotrophie ==========
console.log('\n📋 CAS 1: Fracture-Luxation L1 avec signes neurologiques');
console.log('-'.repeat(80));

const cas1 = `agé de 70 ans ; victime d'un AT 14.07.1991 ; fracture luxation de L1 ; traité chirurgicalement ; séquelles amyotrophie du membre inferieur gauche ; marche avec steppage ; raideur du rachis`;

console.log('📝 Description clinique:');
console.log(`   "${cas1}"`);
console.log('\n🔍 Analyse...\n');

const result1 = localExpertAnalysis(cas1);

console.log('✅ Résultat:');
console.log(`   Type: ${result1.type}`);

if (result1.type === 'proposal') {
    const rate = Array.isArray(result1.injury.rate) ? result1.injury.rate[0] : result1.injury.rate;
    console.log(`   Rubrique: ${result1.injury.name}`);
    console.log(`   IPP: ${Array.isArray(result1.injury.rate) ? `${result1.injury.rate[0]}-${result1.injury.rate[1]}%` : `${result1.injury.rate}%`}`);
    console.log(`   Justification: ${result1.justification}`);
    
    if (rate >= 40 && rate <= 43) {
        console.log(`\n✅ ✅ ✅ CAS 1 RÉUSSI! IPP ${rate}% dans [40-43%]`);
    } else {
        console.log(`\n❌ ❌ ❌ CAS 1 ÉCHOUÉ! IPP ${rate}% hors de [40-43%]`);
        console.log(`   NOTE: Si le taux est ~20%, c'est qu'il manque les signes neurologiques`);
    }
} else if (result1.type === 'cumul_proposals') {
    console.log(`   Propositions multiples (${result1.proposals.length} lésions):`);
    let total = 0;
    result1.proposals.forEach((prop: any, i: number) => {
        const rate = Array.isArray(prop.injury.rate) ? prop.injury.rate[0] : prop.injury.rate;
        total += rate;
        console.log(`   ${i+1}. ${prop.injury.name} → ${Array.isArray(prop.injury.rate) ? `${prop.injury.rate[0]}-${prop.injury.rate[1]}%` : `${prop.injury.rate}%`}`);
    });
    console.log(`\n   Total (somme simple): ${total}%`);
    console.log(`   (Balthazar sera inférieur)`);
    
    if (total >= 40 && total <= 50) {
        console.log(`\n✅ ✅ ✅ CAS 1 RÉUSSI! Total ~${total}% proche de [40-43%]`);
    } else {
        console.log(`\n❌ ❌ ❌ CAS 1 ÉCHOUÉ! Total ${total}% loin de [40-43%]`);
    }
}

// ========== CAS 2: Amputation D5 + luxations M4-M5 ==========
console.log('\n' + '='.repeat(80));
console.log('\n📋 CAS 2: Amputation D5 avec amyotrophie et déviation');
console.log('-'.repeat(80));

const cas2 = `71 ans ; amputation totale du D5 main droite avec luxation m4 m5. Sequelle amyotrophie de la main droite ; cicatrice rectracile . Diviation D2 D3 D4 ; diminution de la force de serrage`;

console.log('📝 Description clinique:');
console.log(`   "${cas2}"`);
console.log('\n🔍 Analyse...\n');

const result2 = localExpertAnalysis(cas2);

console.log('✅ Résultat:');
console.log(`   Type: ${result2.type}`);

if (result2.type === 'proposal') {
    const rate = Array.isArray(result2.injury.rate) ? result2.injury.rate[0] : result2.injury.rate;
    console.log(`   Rubrique: ${result2.injury.name}`);
    console.log(`   IPP: ${Array.isArray(result2.injury.rate) ? `${result2.injury.rate[0]}-${result2.injury.rate[1]}%` : `${result2.injury.rate}%`}`);
    console.log(`   Justification: ${result2.justification}`);
    
    if (rate >= 28 && rate <= 30) {
        console.log(`\n✅ ✅ ✅ CAS 2 RÉUSSI! IPP ${rate}% dans [28-30%]`);
    } else {
        console.log(`\n❌ ❌ ❌ CAS 2 ÉCHOUÉ! IPP ${rate}% hors de [28-30%]`);
        console.log(`   NOTE: Si le taux est ~22%, vérifier détection amyotrophie/déviation`);
    }
} else if (result2.type === 'cumul_proposals') {
    console.log(`   Propositions multiples (${result2.proposals.length} lésions):`);
    let total = 0;
    result2.proposals.forEach((prop: any, i: number) => {
        const rate = Array.isArray(prop.injury.rate) ? prop.injury.rate[0] : prop.injury.rate;
        total += rate;
        console.log(`   ${i+1}. ${prop.injury.name} → ${Array.isArray(prop.injury.rate) ? `${prop.injury.rate[0]}-${prop.injury.rate[1]}%` : `${prop.injury.rate}%`}`);
    });
    console.log(`\n   Total (somme simple): ${total}%`);
    console.log(`   (Balthazar sera inférieur)`);
    
    if (total >= 28 && total <= 35) {
        console.log(`\n✅ ✅ ✅ CAS 2 RÉUSSI! Total ~${total}% proche de [28-30%]`);
    } else {
        console.log(`\n❌ ❌ ❌ CAS 2 ÉCHOUÉ! Total ${total}% loin de [28-30%]`);
    }
}

console.log('\n' + '='.repeat(80));
console.log('\n🏁 TEST TERMINÉ\n');
