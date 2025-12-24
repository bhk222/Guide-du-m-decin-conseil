import { analyzeLocalDisability } from './services/localAnalysis';

const casTest = `Le patient est un salarié âgé de 38 ans, exerçant la fonction de manutentionnaire qualifié. L'accident est survenu sur le lieu et pendant le temps de travail, lors de la manipulation manuelle d'une charge lourde. Au cours de l'effort, une perte d'équilibre a entraîné un mouvement de torsion brutal du membre inférieur droit associé à un choc direct. L'examen clinique et les explorations radiologiques ont mis en évidence une fracture non déplacée du tiers distal du tibia droit, associée à une déchirure partielle du ligament collatéral médial du genou droit ainsi qu'une élongation musculaire du quadriceps. Ces lésions ont nécessité une immobilisation, un traitement antalgique et une prise en charge fonctionnelle spécialisée. Sur le plan évolutif, les séquelles potentielles comprennent une raideur articulaire résiduelle du genou, des algies mécaniques persistantes à l'effort, une diminution de la force musculaire du membre inférieur droit et un retentissement fonctionnel modéré, susceptibles de justifier une évaluation médico-légale en vue de la détermination d'une incapacité permanente partielle.`;

console.log('🧪 TEST FIX LIGAMENT COLLATÉRAL MÉDIAL → LLI\n');
console.log('=' .repeat(80));

async function test() {
    const result = await analyzeLocalDisability(casTest);
    
    console.log('\n📋 RÉSULTAT ANALYSE:\n');
    
    if (result.type === 'multipleInjuries') {
        console.log(`✅ CUMUL DÉTECTÉ: ${result.injuries.length} lésions\n`);
        
        result.injuries.forEach((injury, i) => {
            console.log(`📌 LÉSION ${i + 1}:`);
            console.log(`   Nom: ${injury.injury.name}`);
            console.log(`   IPP: ${injury.rate}%`);
            console.log(`   Fourchette: [${injury.injury.rate[0]}-${injury.injury.rate[1]}%]`);
            console.log('');
        });
        
        console.log(`\n💰 IPP TOTAL CUMULÉ: ${result.totalRate}%`);
        console.log(`📊 Formule: ${result.cumulFormula || 'Balthazar'}`);
        
        console.log('\n' + '='.repeat(80));
        console.log('🔍 VALIDATION:\n');
        
        // Vérifier lésion 1: Fracture tibia
        const lesion1 = result.injuries[0];
        const isTibiaOK = /tibia|jambe/i.test(lesion1.injury.name);
        console.log(`1️⃣ Fracture tibia: ${isTibiaOK ? '✅ OK' : '❌ ÉCHEC'}`);
        console.log(`   Détecté: "${lesion1.injury.name}"`);
        
        // Vérifier lésion 2: Ligament collatéral médial (LLI)
        const lesion2 = result.injuries[1];
        const isLLI = /lli|ligament.*lat[eé]ral.*interne|ligament.*collat[eé]ral.*m[eé]dial/i.test(lesion2.injury.name);
        const isWrongLCP = /lcp|ligament.*crois[eé].*post[eé]rieur/i.test(lesion2.injury.name);
        
        console.log(`\n2️⃣ Ligament collatéral médial (LLI): ${isLLI ? '✅ OK' : '❌ ÉCHEC'}`);
        console.log(`   Détecté: "${lesion2.injury.name}"`);
        if (isWrongLCP) {
            console.log(`   ⚠️ ERREUR: Détecte LCP au lieu de LLI!`);
        }
        
        // Vérifier présence lésion 3: Élongation quadriceps
        const hasQuadriceps = result.injuries.length >= 3 && 
            /quadriceps|tendinopathie.*quadricip/i.test(result.injuries[2]?.injury.name || '');
        
        console.log(`\n3️⃣ Élongation quadriceps: ${hasQuadriceps ? '✅ OK' : '⚠️ NON DÉTECTÉ'}`);
        if (result.injuries.length >= 3) {
            console.log(`   Détecté: "${result.injuries[2].injury.name}"`);
        } else {
            console.log(`   ⚠️ Seulement ${result.injuries.length} lésions détectées au lieu de 3`);
        }
        
        // Vérifier facteur de réduction bizarre
        console.log('\n🔍 Vérification facteur de réduction:');
        result.injuries.forEach((inj, i) => {
            if (inj.rate < inj.injury.rate[0]) {
                console.log(`   ⚠️ Lésion ${i+1}: IPP réduit à ${inj.rate}% (min ${inj.injury.rate[0]}%)`);
                console.log(`      → Facteur appliqué: ${((inj.rate / inj.injury.rate[0]) * 100).toFixed(0)}%`);
            }
        });
        
    } else if (result.type === 'proposal') {
        console.log(`❌ PAS DE CUMUL DÉTECTÉ`);
        console.log(`   Lésion unique: ${result.injury.name}`);
        console.log(`   IPP: ${result.rate}%`);
    }
}

test().catch(console.error);
