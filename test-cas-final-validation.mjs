import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('🧪 TEST FINAL V3.3.171 - VALIDATION SEARCHTERMS\n');
console.log('='  .repeat(80));

// CAS 1: Texte COMPLET tel qu'il devrait être entré par l'utilisateur
const cas1TextComplet = `agé de 70 ans ; victime d'un AT 14.07.1991 ; fracture luxation de L1 ; traité chirurgicalement ; séquelles amyotrophie du membre inferieur gauche ; marche avec steppage ; raideur du rachis`;

console.log('\n📋 CAS 1: Fracture-Luxation L1 avec steppage et amyotrophie');
console.log('📝 Texte COMPLET saisi:');
console.log(`   "${cas1TextComplet}"`);
console.log('\n🔍 Analyse en cours...\n');

try {
    const result1 = localExpertAnalysis(cas1TextComplet);
    
    console.log('✅ Type de résultat:', result1.type);
    
    if (result1.type === 'proposal') {
        console.log('📊 Proposition unique:');
        console.log(`   - Rubrique: ${result1.injury.name}`);
        console.log(`   - Taux: ${Array.isArray(result1.injury.rate) ? `${result1.injury.rate[0]}-${result1.injury.rate[1]}%` : `${result1.injury.rate}%`}`);
        console.log(`   - Justification: ${result1.justification}`);
        
        const expectedMin = 40;
        const expectedMax = 43;
        const actualRate = Array.isArray(result1.injury.rate) ? result1.injury.rate[0] : result1.injury.rate;
        
        if (actualRate >= expectedMin && actualRate <= expectedMax) {
            console.log(`\n✅ ✅ ✅ CAS 1 RÉUSSI! Taux dans la fourchette attendue [${expectedMin}-${expectedMax}%]`);
        } else {
            console.log(`\n❌ ❌ ❌ CAS 1 ÉCHOUÉ! Taux ${actualRate}% hors fourchette attendue [${expectedMin}-${expectedMax}%]`);
        }
    } else if (result1.type === 'cumul_proposals') {
        console.log('📊 Propositions multiples (cumul):');
        let totalMin = 0;
        result1.proposals.forEach((prop, index) => {
            const rate = Array.isArray(prop.injury.rate) ? prop.injury.rate[0] : prop.injury.rate;
            totalMin += rate;
            console.log(`   ${index + 1}. ${prop.injury.name} - ${Array.isArray(prop.injury.rate) ? `${prop.injury.rate[0]}-${prop.injury.rate[1]}%` : `${prop.injury.rate}%`}`);
        });
        
        console.log(`\n📈 Estimation totale (somme simple): ~${totalMin}%`);
        console.log(`   (Note: Le calcul Balthazard donnera un résultat différent)`);
        
        const expectedMin = 40;
        const expectedMax = 43;
        
        if (totalMin >= expectedMin && totalMin <= expectedMax + 10) {
            console.log(`\n✅ ✅ ✅ CAS 1 RÉUSSI! Total ~${totalMin}% proche de la fourchette attendue [${expectedMin}-${expectedMax}%]`);
        } else {
            console.log(`\n❌ ❌ ❌ CAS 1 ÉCHOUÉ! Total ${totalMin}% très éloigné de [${expectedMin}-${expectedMax}%]`);
        }
    } else {
        console.log(`\n❌ Type de résultat inattendu: ${result1.type}`);
        console.log('Résultat complet:', JSON.stringify(result1, null, 2));
    }
    
} catch (error) {
    console.error('❌ ERREUR lors de l\'analyse CAS 1:', error.message);
}

console.log('\n' + '='.repeat(80));

// CAS 2: Texte COMPLET
const cas2TextComplet = `71 ans ; amputation totale du D5 main droite avec luxation m4 m5. Sequelle amyotrophie de la main droite ; cicatrice rectracile . Diviation D2 D3 D4 ; diminution de la force de serrage`;

console.log('\n📋 CAS 2: Amputation D5 + luxations M4-M5 avec amyotrophie');
console.log('📝 Texte COMPLET saisi:');
console.log(`   "${cas2TextComplet}"`);
console.log('\n🔍 Analyse en cours...\n');

try {
    const result2 = localExpertAnalysis(cas2TextComplet);
    
    console.log('✅ Type de résultat:', result2.type);
    
    if (result2.type === 'proposal') {
        console.log('📊 Proposition unique:');
        console.log(`   - Rubrique: ${result2.injury.name}`);
        console.log(`   - Taux: ${Array.isArray(result2.injury.rate) ? `${result2.injury.rate[0]}-${result2.injury.rate[1]}%` : `${result2.injury.rate}%`}`);
        console.log(`   - Justification: ${result2.justification}`);
        
        const expectedMin = 28;
        const expectedMax = 30;
        const actualRate = Array.isArray(result2.injury.rate) ? result2.injury.rate[0] : result2.injury.rate;
        
        if (actualRate >= expectedMin && actualRate <= expectedMax) {
            console.log(`\n✅ ✅ ✅ CAS 2 RÉUSSI! Taux dans la fourchette attendue [${expectedMin}-${expectedMax}%]`);
        } else {
            console.log(`\n❌ ❌ ❌ CAS 2 ÉCHOUÉ! Taux ${actualRate}% hors fourchette attendue [${expectedMin}-${expectedMax}%]`);
        }
    } else if (result2.type === 'cumul_proposals') {
        console.log('📊 Propositions multiples (cumul):');
        let totalMin = 0;
        result2.proposals.forEach((prop, index) => {
            const rate = Array.isArray(prop.injury.rate) ? prop.injury.rate[0] : prop.injury.rate;
            totalMin += rate;
            console.log(`   ${index + 1}. ${prop.injury.name} - ${Array.isArray(prop.injury.rate) ? `${prop.injury.rate[0]}-${prop.injury.rate[1]}%` : `${prop.injury.rate}%`}`);
        });
        
        console.log(`\n📈 Estimation totale (somme simple): ~${totalMin}%`);
        console.log(`   (Note: Le calcul Balthazard donnera un résultat différent)`);
        
        const expectedMin = 28;
        const expectedMax = 30;
        
        if (totalMin >= expectedMin && totalMin <= expectedMax + 10) {
            console.log(`\n✅ ✅ ✅ CAS 2 RÉUSSI! Total ~${totalMin}% proche de la fourchette attendue [${expectedMin}-${expectedMax}%]`);
        } else {
            console.log(`\n❌ ❌ ❌ CAS 2 ÉCHOUÉ! Total ${totalMin}% très éloigné de [${expectedMin}-${expectedMax}%]`);
        }
    } else {
        console.log(`\n❌ Type de résultat inattendu: ${result2.type}`);
        console.log('Résultat complet:', JSON.stringify(result2, null, 2));
    }
    
} catch (error) {
    console.error('❌ ERREUR lors de l\'analyse CAS 2:', error.message);
}

console.log('\n' + '='.repeat(80));
console.log('\n🏁 TEST TERMINÉ\n');
