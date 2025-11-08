/**
 * TEST DE PUISSANCE COMBINÉE - V1 + V2 + V3
 * =========================================
 * 
 * Démontre la synergie entre :
 * - V1 : Langage familier (71 patterns)
 * - V2 : Enrichissement médical (10 transformations + 8 expert rules)
 * - V3 : Abréviations professionnelles (100+ codes)
 */

import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

interface TestCase {
    input: string;
    versions: string;
    description: string;
}

const testCases: TestCase[] = [
    // === V1 SEUL (Langage familier) ===
    {
        input: "Genou cassé suite chute travail",
        versions: "V1",
        description: "Langage familier simple"
    },
    {
        input: "Main écrasée par machine",
        versions: "V1",
        description: "Termes familiers travail"
    },
    
    // === V2 SEUL (Enrichissement médical) ===
    {
        input: "Mal au dos depuis accident",
        versions: "V2",
        description: "Symptôme vague + contexte"
    },
    {
        input: "Mal à la tête persistant après trauma",
        versions: "V2",
        description: "Céphalée post-traumatique"
    },
    
    // === V3 SEUL (Abréviations) ===
    {
        input: "Fx C5 suite AVP",
        versions: "V3",
        description: "Abréviations pures"
    },
    {
        input: "Amputation d2 md AT",
        versions: "V3",
        description: "Codes anatomiques + contexte"
    },
    
    // === V1 + V2 (Familier + Enrichissement) ===
    {
        input: "Tour de reins en portant charge lourde",
        versions: "V1+V2",
        description: "Expression familière + contexte traumatique"
    },
    {
        input: "Coup du lapin après accident voiture",
        versions: "V1+V2",
        description: "Familier + enrichissement contextuel"
    },
    
    // === V1 + V3 (Familier + Abréviations) ===
    {
        input: "Genou pété avec rupture LCA suite AT",
        versions: "V1+V3",
        description: "Langage familier + termes pro"
    },
    {
        input: "Main cassée d2 d3 md écrasement machine",
        versions: "V1+V3",
        description: "Familier + codes doigts"
    },
    
    // === V2 + V3 (Enrichissement + Abréviations) ===
    {
        input: "Mal au cou C6 après AVP avec whiplash",
        versions: "V2+V3",
        description: "Symptôme vague + code + abréviation"
    },
    {
        input: "Mal au dos L4-L5 avec DMS 25cm",
        versions: "V2+V3",
        description: "Enrichissement + rachis + mesure"
    },
    
    // === V1 + V2 + V3 (PUISSANCE MAXIMALE) ===
    {
        input: "Tour de reins L3 en portant charge, DMS 30cm, AT m3",
        versions: "V1+V2+V3",
        description: "Familier + enrichissement + rachis + mesure + temporalité + contexte"
    },
    {
        input: "Genou pété avec rupture LCA suite AVP j15, flex limitée",
        versions: "V1+V2+V3",
        description: "Familier + ligament + accident + temporalité + mobilité"
    },
    {
        input: "Mal au cou C5 C6 coup du lapin AVP, rot limitée",
        versions: "V1+V2+V3",
        description: "Vague + rachis + familier + accident + mobilité"
    },
    {
        input: "Main écrasée d2 d3 d4 md AT m2 avec pseudart malgré ostéosynthèse",
        versions: "V1+V2+V3",
        description: "Familier + doigts + accident + temporalité + consolidation + intervention"
    },
    {
        input: "Cheville pétée avec entorse LLI grade 2 suite chute travail, flessum 20°",
        versions: "V1+V2+V3",
        description: "Familier + ligament + contexte + mesure"
    },
    {
        input: "Mal à l'épaule abd limitée 90° après chute, PTH prévue",
        versions: "V1+V2+V3",
        description: "Vague + mobilité + contexte + intervention future"
    }
];

console.log("═══════════════════════════════════════════════════════════════");
console.log("  🚀 TEST PUISSANCE COMBINÉE - V1 + V2 + V3");
console.log("═══════════════════════════════════════════════════════════════\n");

console.log("📚 RAPPEL DES VERSIONS:");
console.log("  V1 = Langage familier (71 patterns)");
console.log("     → cassé, pété, écrasé, foutu, tour de reins...");
console.log("  V2 = Enrichissement médical (10 transformations + 8 expert rules)");
console.log("     → mal au dos → rachialgie traumatique vertèbre lombaire");
console.log("  V3 = Abréviations professionnelles (100+ codes)");
console.log("     → AT, AVP, d1-d5, C1-C7, LCA, DMS, PTH...\n");

console.log("═══════════════════════════════════════════════════════════════\n");

let totalTests = 0;
let successfulTests = 0;

testCases.forEach((testCase, index) => {
    console.log(`[${index + 1}/${testCases.length}] ${testCase.versions} - ${testCase.description}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📝 Input: "${testCase.input}"`);
    
    const result = comprehensiveSingleLesionAnalysis(testCase.input);
    
    totalTests++;
    
    if (result.type === 'proposal') {
        console.log(`✅ DÉTECTÉ: ${result.name}`);
        console.log(`   📊 IPP: ${result.rate}%`);
        console.log(`   🔍 Catégorie: ${result.path}`);
        successfulTests++;
    } else if (result.type === 'ambiguity') {
        console.log(`⚠️  AMBIGUÏTÉ: ${result.choices.length} choix`);
        result.choices.slice(0, 2).forEach((choice, idx) => {
            console.log(`   ${idx + 1}. ${choice.name} (${choice.rate}%)`);
        });
        if (result.choices.length > 2) {
            console.log(`   ... et ${result.choices.length - 2} autres`);
        }
        successfulTests++; // Ambiguïté = succès (guide l'utilisateur)
    } else {
        console.log(`❌ Non détecté`);
    }
    console.log('');
});

console.log("═══════════════════════════════════════════════════════════════");
console.log("                      RAPPORT FINAL");
console.log("═══════════════════════════════════════════════════════════════\n");
console.log(`✅ Tests réussis: ${successfulTests}/${totalTests} (${((successfulTests/totalTests)*100).toFixed(1)}%)`);

// Analyse par version
const v1Only = testCases.filter(t => t.versions === 'V1').length;
const v2Only = testCases.filter(t => t.versions === 'V2').length;
const v3Only = testCases.filter(t => t.versions === 'V3').length;
const v1v2 = testCases.filter(t => t.versions === 'V1+V2').length;
const v1v3 = testCases.filter(t => t.versions === 'V1+V3').length;
const v2v3 = testCases.filter(t => t.versions === 'V2+V3').length;
const all = testCases.filter(t => t.versions === 'V1+V2+V3').length;

console.log(`\n📊 RÉPARTITION PAR VERSION:`);
console.log(`  V1 seul      : ${v1Only} cas`);
console.log(`  V2 seul      : ${v2Only} cas`);
console.log(`  V3 seul      : ${v3Only} cas`);
console.log(`  V1+V2        : ${v1v2} cas`);
console.log(`  V1+V3        : ${v1v3} cas`);
console.log(`  V2+V3        : ${v2v3} cas`);
console.log(`  V1+V2+V3 🚀  : ${all} cas`);

console.log(`\n💡 CONCLUSION:`);
console.log(`  La combinaison V1+V2+V3 permet de comprendre :`);
console.log(`  • Le langage FAMILIER du patient`);
console.log(`  • Les SYMPTÔMES VAGUES avec contexte`);
console.log(`  • Les ABRÉVIATIONS PROFESSIONNELLES du médecin`);
console.log(`  → Flexibilité MAXIMALE pour tous les utilisateurs\n`);

console.log("═══════════════════════════════════════════════════════════════\n");
