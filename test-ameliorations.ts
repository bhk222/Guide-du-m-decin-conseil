import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

/**
 * TEST DES AMÉLIORATIONS PROGRESSIVES
 * Focus sur les catégories qui échouaient le plus :
 * - Doigts (25 échecs) 
 * - Orteils (13 échecs)
 * - Audition (17 échecs)
 * - Viscères (15 échecs)
 */

interface TestCase {
    id: string;
    category: string;
    input: string;
    expectedKeywords: string[];  // Mots-clés qui doivent apparaître dans le résultat
    expectedRate: number;
}

const testCases: TestCase[] = [
    // DOIGTS (5 cas représentatifs sur 25)
    {
        id: "doigt-001",
        category: "Doigts",
        input: "amputation pouce main dominante",
        expectedKeywords: ["pouce", "amputation"],
        expectedRate: 28
    },
    {
        id: "doigt-002",
        category: "Doigts",
        input: "amputation index main dominante",
        expectedKeywords: ["index", "amputation"],
        expectedRate: 15
    },
    {
        id: "doigt-003",
        category: "Doigts",
        input: "amputation médius main dominante",
        expectedKeywords: ["médius", "amputation"],
        expectedRate: 12
    },
    {
        id: "doigt-004",
        category: "Doigts",
        input: "amputation annulaire main dominante",
        expectedKeywords: ["annulaire", "amputation"],
        expectedRate: 10
    },
    {
        id: "doigt-005",
        category: "Doigts",
        input: "amputation auriculaire main dominante",
        expectedKeywords: ["auriculaire", "amputation"],
        expectedRate: 8
    },
    
    // ORTEILS (3 cas représentatifs sur 13)
    {
        id: "orteil-001",
        category: "Orteils",
        input: "amputation gros orteil",
        expectedKeywords: ["gros orteil", "amputation"],
        expectedRate: 7
    },
    {
        id: "orteil-002",
        category: "Orteils",
        input: "amputation deux orteils pied",
        expectedKeywords: ["orteil", "amputation"],
        expectedRate: 3
    },
    {
        id: "orteil-003",
        category: "Orteils",
        input: "ankylose gros orteil hallux rigidus",
        expectedKeywords: ["gros orteil", "ankylose"],
        expectedRate: 7
    },
    
    // AUDITION (4 cas représentatifs sur 17)
    {
        id: "audio-001",
        category: "Audition",
        input: "surdité complète oreille droite oreille gauche normale",
        expectedKeywords: ["surdité", "oreille"],
        expectedRate: 15
    },
    {
        id: "audio-002",
        category: "Audition",
        input: "surdité partielle 40 dB oreille gauche",
        expectedKeywords: ["surdité", "40"],
        expectedRate: 8
    },
    {
        id: "audio-003",
        category: "Audition",
        input: "acouphènes isolés permanents sans surdité",
        expectedKeywords: ["acouphènes", "bourdonnement"],
        expectedRate: 10
    },
    {
        id: "audio-004",
        category: "Audition",
        input: "surdité totale bilatérale 100 dB",
        expectedKeywords: ["surdité", "bilatéral"],
        expectedRate: 60
    },
    
    // VISCÈRES (3 cas représentatifs sur 15)
    {
        id: "viscere-001",
        category: "Viscères",
        input: "splénectomie totale ablation rate",
        expectedKeywords: ["splénectomie", "rate"],
        expectedRate: 30
    },
    {
        id: "viscere-002",
        category: "Viscères",
        input: "néphrectomie unilatérale rein unique restant normal",
        expectedKeywords: ["néphrectomie", "rein"],
        expectedRate: 30
    },
    {
        id: "viscere-003",
        category: "Viscères",
        input: "colectomie partielle ablation côlon traumatique",
        expectedKeywords: ["colectomie", "colon"],
        expectedRate: 23
    }
];

console.log('🧪 TEST AMÉLIORATIONS PROGRESSIVES\n');

let successCount = 0;
let totalTests = testCases.length;

for (const testCase of testCases) {
    console.log(`\n📋 Test ${testCase.id.toUpperCase()} (${testCase.category})`);
    console.log(`📝 Input: "${testCase.input}"`);
    console.log(`🎯 Expected keywords: ${testCase.expectedKeywords.join(', ')} (~${testCase.expectedRate}%)`);
    
    try {
        const result = comprehensiveSingleLesionAnalysis(testCase.input);
        
        if (result.type === 'proposal') {
            const actualRate = Math.round(result.rate);
            const rateTolerance = Math.abs(actualRate - testCase.expectedRate) <= 5;
            
            // Vérifier si au moins UN mot-clé attendu est présent
            const normalizedName = result.injury.name.toLowerCase();
            const normalizedPath = result.path.toLowerCase();
            const hasKeyword = testCase.expectedKeywords.some(keyword => 
                normalizedName.includes(keyword.toLowerCase()) || 
                normalizedPath.includes(keyword.toLowerCase())
            );
            
            if (hasKeyword && rateTolerance) {
                console.log(`✅ SUCCÈS: ${result.injury.name} (${actualRate}%)`);
                console.log(`   Path: ${result.path}`);
                successCount++;
            } else if (hasKeyword) {
                console.log(`🟡 PARTIEL: Bonne pathologie mais taux incorrect`);
                console.log(`   Trouvé: ${result.injury.name} (${actualRate}% vs ${testCase.expectedRate}% attendu)`);
            } else {
                console.log(`❌ ÉCHEC: Pathologie incorrecte`);
                console.log(`   Trouvé: ${result.injury.name} (${actualRate}%)`);
                console.log(`   Path: ${result.path}`);
            }
        } else if (result.type === 'ambiguity') {
            console.log(`🤔 AMBIGUÏTÉ: ${result.choices.length} options proposées`);
            result.choices.slice(0, 3).forEach((choice, i) => {
                console.log(`   ${i+1}. ${choice.name} (${Array.isArray(choice.rate) ? choice.rate.join('-') : choice.rate}%)`);
            });
        } else {
            console.log(`❌ ÉCHEC: Aucune lésion trouvée`);
        }
    } catch (error) {
        console.log(`❌ ERREUR: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
}

const successRate = Math.round((successCount / totalTests) * 100);
console.log(`\n\n📊 RÉSULTAT GLOBAL: ${successCount}/${totalTests} (${successRate}%)`);

if (successRate >= 80) {
    console.log('🎯 EXCELLENT: Amélioration significative !');
} else if (successRate >= 60) {
    console.log('📈 BON: Progression notable, continuer amélioration');
} else if (successRate >= 40) {
    console.log('⚠️  MOYEN: Amélioration visible mais insuffisante');
} else {
    console.log('🔴 FAIBLE: Nécessite travail approfondi');
}
