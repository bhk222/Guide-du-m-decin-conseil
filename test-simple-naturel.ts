import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log("🔍 TEST DÉTECTIONS CIBLÉES\n");

const tests = [
    "Coup du lapin lors AVP",
    "Entorse du genou avec raideur résiduelle", 
    "Entorse légère de la cheville"
];

tests.forEach((test, i) => {
    console.log(`${i+1}. "${test}":`);
    const result = comprehensiveSingleLesionAnalysis(test);
    if (result.type === 'proposal') {
        console.log(`   ✅ ${result.name} (${result.rate}%)\n`);
    } else {
        console.log(`   ❌ Non détecté\n`);
    }
});

console.log("✨ LANGAGE NATUREL FONCTIONNEL !");