/**
 * 🧪 TEST UNITAIRE - Détection Raccourcissement v2.7
 * 
 * Ce fichier teste la fonction de détection du raccourcissement
 * dans l'analyse médico-légale
 */

// Simulation de la fonction normalize (copiée de AiAnalyzer.tsx)
function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/'/g, "'")
        .replace(/[''`]/g, "'");
}

// Simulation de la fonction extractTemporalityAndIntensity
function extractShorteningFromText(text) {
    const normalized = normalize(text);
    
    // Détection du raccourcissement en centimètres
    const shorteningMatch = /raccourcissement.*?(\d+)\s*cm|inegalite.*?(\d+)\s*cm|membre.*?court.*?(\d+)\s*cm/i.exec(normalized);
    
    if (shorteningMatch) {
        const cm = parseInt(shorteningMatch[1] || shorteningMatch[2] || shorteningMatch[3]);
        return cm;
    }
    
    return undefined;
}

// Fonction de détermination de sévérité basée sur raccourcissement
function determineSeverityByShortening(shortening) {
    if (shortening === undefined) {
        return { level: 'non détecté', signs: [] };
    }
    
    if (shortening >= 4) {
        return { 
            level: 'élevé', 
            signs: [`Raccourcissement membre : ${shortening} cm (sévère)`]
        };
    } else if (shortening >= 2) {
        return { 
            level: 'moyen', 
            signs: [`Raccourcissement membre : ${shortening} cm (modéré)`]
        };
    } else if (shortening >= 1) {
        return { 
            level: 'faible', 
            signs: [`Raccourcissement membre : ${shortening} cm (léger)`]
        };
    }
    
    return { level: 'non applicable', signs: [] };
}

// TESTS
console.log('🧪 ========================================');
console.log('   TEST DÉTECTION RACCOURCISSEMENT v2.7');
console.log('========================================\n');

const testCases = [
    {
        id: 1,
        description: "Fracture du fémur consolidée avec raccourcissement de 4 cm",
        expectedShortening: 4,
        expectedSeverity: 'élevé'
    },
    {
        id: 2,
        description: "Fracture diaphysaire fémorale. Raccourcissement de 2 cm. Boiterie légère.",
        expectedShortening: 2,
        expectedSeverity: 'moyen'
    },
    {
        id: 3,
        description: "Fracture col fémoral. Inégalité de longueur des membres de 1 cm.",
        expectedShortening: 1,
        expectedSeverity: 'faible'
    },
    {
        id: 4,
        description: "Fracture complexe avec raccourcissement de 5 cm. Boiterie importante.",
        expectedShortening: 5,
        expectedSeverity: 'élevé'
    },
    {
        id: 5,
        description: "Fracture du fémur consolidée. Pas de raccourcissement. Mobilité normale.",
        expectedShortening: undefined,
        expectedSeverity: 'non détecté'
    },
    {
        id: 6,
        description: "Membre inférieur court de 3 cm suite à fracture",
        expectedShortening: 3,
        expectedSeverity: 'moyen'
    }
];

let passed = 0;
let failed = 0;

testCases.forEach(test => {
    console.log(`\n📝 TEST ${test.id}:`);
    console.log(`Description: "${test.description}"`);
    
    const detectedShortening = extractShorteningFromText(test.description);
    const severity = determineSeverityByShortening(detectedShortening);
    
    console.log(`   Raccourcissement détecté: ${detectedShortening !== undefined ? detectedShortening + ' cm' : 'AUCUN'}`);
    console.log(`   Sévérité calculée: ${severity.level}`);
    console.log(`   Attendu: ${test.expectedShortening !== undefined ? test.expectedShortening + ' cm' : 'AUCUN'} → ${test.expectedSeverity}`);
    
    const shorteningMatch = detectedShortening === test.expectedShortening;
    const severityMatch = severity.level === test.expectedSeverity;
    
    if (shorteningMatch && severityMatch) {
        console.log('   ✅ SUCCÈS');
        passed++;
    } else {
        console.log('   ❌ ÉCHEC');
        if (!shorteningMatch) {
            console.log(`      - Raccourcissement: attendu ${test.expectedShortening}, obtenu ${detectedShortening}`);
        }
        if (!severityMatch) {
            console.log(`      - Sévérité: attendu ${test.expectedSeverity}, obtenu ${severity.level}`);
        }
        failed++;
    }
});

console.log('\n========================================');
console.log(`📊 RÉSULTATS: ${passed}/${testCases.length} tests réussis`);
if (failed > 0) {
    console.log(`❌ ${failed} tests échoués`);
} else {
    console.log('✅ TOUS LES TESTS RÉUSSIS !');
}
console.log('========================================\n');

// Test de régression: vérifier que d'autres patterns ne sont pas affectés
console.log('🔍 TESTS DE RÉGRESSION:\n');

const regressionTests = [
    "Fracture du fémur avec raideur importante",
    "Cal vicieux du tibia avec boiterie",
    "Fracture consolidée avec limitation de 50%"
];

regressionTests.forEach((text, index) => {
    const shortening = extractShorteningFromText(text);
    console.log(`Test régression ${index + 1}: "${text}"`);
    console.log(`   Raccourcissement: ${shortening !== undefined ? shortening + ' cm (⚠️ FAUX POSITIF)' : 'non détecté ✅'}\n`);
});

console.log('========================================\n');
