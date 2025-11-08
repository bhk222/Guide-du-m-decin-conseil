import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

// Test cases représentatifs des cas médico-légaux fréquents
const testCases = [
    {
        id: "genou-001", 
        input: "rupture LCA genou droit suite chute avec instabilité chronique et dérobements fréquents lors de la marche", 
        expected: {type: "ligament croisé antérieur", rate: 22}
    },
    {
        id: "genou-002", 
        input: "méniscectomie totale interne avec chondropathie rotulienne stade 3 douleurs permanentes", 
        expected: {type: "méniscectomie", rate: 15}
    },
    {
        id: "vision-001", 
        input: "cataracte post-traumatique œil droit acuité visuelle 3/10 non améliorable", 
        expected: {type: "cataracte", rate: 55}  // 3/10 = sévérité moyenne selon barème → ~55%
    },
    {
        id: "vision-002", 
        input: "baisse acuité visuelle 2/10 suite traumatisme œil gauche", 
        expected: {type: "atrophie optique", rate: 55}  // Trouve "Atrophie optique post-traumatique" 2/10 = sévérité élevée
    },
    {
        id: "fracture-001", 
        input: "fracture col fémur consolidée avec raccourcissement 3 cm et boiterie", 
        expected: {type: "col du fémur", rate: 45}  // Raccourcissement 3cm → sévérité élevée selon barème
    },
    {
        id: "rachis-001", 
        input: "tassement vertébral L3 avec douleurs lombaires chroniques et limitation flexion", 
        expected: {type: "tassement", rate: 15}
    },
    {
        id: "epaule-001", 
        input: "rupture coiffe des rotateurs avec limitation abduction 90 degrés douleurs nocturnes", 
        expected: {type: "coiffe des rotateurs", rate: 20}  // Trouve "Rupture de la coiffe des rotateurs post-traumatique"
    },
    {
        id: "main-001", 
        input: "amputation index dominante au niveau articulation métacarpophalangienne", 
        expected: {type: "index", rate: 15}  // Accepte "Amputation de l'index - Désarticulation métacarpo-phalangienne"
    },
    {
        id: "cheville-001", 
        input: "fracture pilon tibial avec arthrose post-traumatique et raideur sévère", 
        expected: {type: "pilon tibial", rate: 30}
    },
    {
        id: "audition-001", 
        input: "surdité post-traumatique oreille droite perte 60 dB avec acouphènes permanents", 
        expected: {type: "surdité", rate: 70}  // 60dB + acouphènes → sévérité élevée [0,70] → 70%
    }
];

console.log('🧠 TEST EXPERT MÉDICO-LÉGAL COMPLET\n');

let totalTests = testCases.length;
let successCount = 0;

for (const testCase of testCases) {
    console.log(`\n🔍 Test ${testCase.id.toUpperCase()}`);
    console.log(`📝 Input: "${testCase.input}"`);
    console.log(`🎯 Expected: ${testCase.expected.type} (~${testCase.expected.rate}%)`);
    
    try {
        const result = comprehensiveSingleLesionAnalysis(testCase.input);
        
        if (result.type === 'proposal') {
            const actualRate = Math.round(result.rate);
            const expectedRate = testCase.expected.rate;
            const rateTolerance = Math.abs(actualRate - expectedRate) <= 5; // ±5% de tolerance
            
            // Vérification si la pathologie trouvée correspond
            const normalizedName = result.injury.name.toLowerCase();
            const normalizedPath = result.path.toLowerCase();
            const expectedType = testCase.expected.type.toLowerCase();
            
            const injuryMatch = normalizedName.includes(expectedType) ||
                               normalizedPath.includes(expectedType);
            
            if (injuryMatch && rateTolerance) {
                console.log(`✅ SUCCÈS: ${result.injury.name} (${actualRate}%)`);
                console.log(`   Path: ${result.path}`);
                successCount++;
            } else if (injuryMatch && !rateTolerance) {
                console.log(`🟡 PARTIEL: Bonne pathologie mais taux incorrect`);
                console.log(`   Trouvé: ${result.injury.name} (${actualRate}% vs ${expectedRate}% attendu)`);
                console.log(`   Path: ${result.path}`);
            } else {
                console.log(`❌ ÉCHEC: Pathologie incorrecte`);
                console.log(`   Trouvé: ${result.injury.name} (${actualRate}%)`);
                console.log(`   Path: ${result.path}`);
            }
        } else if (result.type === 'ambiguity') {
            console.log(`🤔 AMBIGUÏTÉ: Plusieurs options proposées`);
            result.choices.forEach((choice, i) => {
                console.log(`   ${i+1}. ${choice.name} (${Array.isArray(choice.rate) ? choice.rate.join('-') : choice.rate}%)`);
            });
        } else {
            console.log(`❌ ÉCHEC: Aucun résultat trouvé`);
        }
    } catch (error) {
        console.log(`💥 ERREUR: ${error}`);
    }
}

console.log(`\n📊 RÉSULTAT GLOBAL: ${successCount}/${totalTests} (${Math.round((successCount/totalTests)*100)}%)`);

if (successCount === totalTests) {
    console.log('🎉 EXPERT MÉDICO-LÉGAL PARFAIT !');
} else if (successCount >= totalTests * 0.8) {
    console.log('🎯 EXPERT MÉDICO-LÉGAL COMPÉTENT');
} else if (successCount >= totalTests * 0.6) {
    console.log('📈 EXPERT MÉDICO-LÉGAL EN PROGRESSION');
} else {
    console.log('⚠️  EXPERT MÉDICO-LÉGAL À AMÉLIORER');
}