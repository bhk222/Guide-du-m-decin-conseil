import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const testCasesV2 = [
    // Descriptions vagues maintenant améliorées
    { input: "J'ai mal au dos depuis la chute", category: "Rachis vague" },
    { input: "Mal à la tête persistant", category: "Crâne vague" },
    { input: "Mal au dos en bas", category: "Lombalgie vague" },
    { input: "Tour de reins après avoir soulevé une charge", category: "Lumbago" },
    { input: "Mal au cou après l'accident", category: "Cervicalgie vague" },
    
    // Douleurs membres vagues
    { input: "Mal à l'épaule droite", category: "Épaule vague" },
    { input: "Mal au genou gauche", category: "Genou vague" },
    { input: "Mal à la cheville", category: "Cheville vague" },
    { input: "Mal au poignet", category: "Poignet vague" },
    { input: "Mal au coude", category: "Coude vague" },
    
    // Descriptions plus précises (doivent toujours fonctionner)
    { input: "Coup du lapin lors AVP", category: "Whiplash précis" },
    { input: "Entorse genou avec raideur", category: "Genou précis" },
    { input: "Fracture cheville cassée", category: "Cheville précise" }
];

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║       🧪 TEST LANGAGE NATUREL AVANCÉ - VERSION 2            ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");

let detected = 0;
let ambiguous = 0;
let failed = 0;

testCasesV2.forEach((testCase, i) => {
    const result = comprehensiveSingleLesionAnalysis(testCase.input);
    
    let status = "";
    if (result.type === 'proposal') {
        status = `✅ ${result.name} (${result.rate}%)`;
        detected++;
    } else if (result.type === 'ambiguity') {
        status = `⚠️  Ambiguïté (${result.choices.length} choix)`;
        ambiguous++;
    } else {
        status = `❌ Non détecté`;
        failed++;
    }
    
    console.log(`${i+1}. [${testCase.category}]`);
    console.log(`   "${testCase.input}"`);
    console.log(`   ${status}\n`);
});

console.log("╔══════════════════════════════════════════════════════════════╗");
console.log("║                      📊 RÉSULTATS                            ║");
console.log("╚══════════════════════════════════════════════════════════════╝");
console.log(`✅ Détectés précisément : ${detected}/${testCasesV2.length}`);
console.log(`⚠️  Ambiguïtés (choix multiples) : ${ambiguous}/${testCasesV2.length}`);
console.log(`❌ Échecs : ${failed}/${testCasesV2.length}`);
console.log(`📈 Taux de succès (détecté + ambiguïté) : ${((detected + ambiguous) / testCasesV2.length * 100).toFixed(1)}%\n`);

if (failed === 0) {
    console.log("🎊 TOUS LES CAS TRAITÉS (détection ou ambiguïté) !");
}
