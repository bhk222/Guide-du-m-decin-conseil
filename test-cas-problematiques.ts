import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const failedCases = [
    { input: "J'ai mal au dos depuis la chute", expected: "rachialgie ou lombalgie" },
    { input: "Mal à la tête persistant", expected: "céphalée post-traumatique" },
    { input: "Tour de reins après avoir soulevé une charge", expected: "lumbago" },
    { input: "Entorse de la cheville, ça fait 2 mois", expected: "consolidation atteinte" }
];

console.log("🔍 ANALYSE DES CAS PROBLÉMATIQUES\n");

failedCases.forEach((testCase, i) => {
    console.log(`${i+1}. "${testCase.input}"`);
    console.log(`   Attendu: ${testCase.expected}`);
    
    const result = comprehensiveSingleLesionAnalysis(testCase.input);
    
    if (result.type === 'proposal') {
        console.log(`   Résultat: ✅ ${result.name} (${result.rate}%)`);
    } else if (result.type === 'no_result') {
        console.log(`   Résultat: ❌ ${result.text.substring(0, 80)}...`);
    } else {
        console.log(`   Résultat: ⚠️ Ambiguïté (${result.choices.length} choix)`);
    }
    console.log("");
});
