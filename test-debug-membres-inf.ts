import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG MEMBRES INFÉRIEURS\n');

const testCases = [
    "fracture diaphyse fémorale consolidée avec cal vicieux",
    "fracture plateau tibial externe avec arthrose secondaire",
    "fracture malléole externe consolidée avec raideur cheville",
    "entorse grave cheville avec laxité ligamentaire chronique",
    "fracture rotule avec arthrose fémoro-patellaire",
    "luxation hanche traumatique avec nécrose tête fémorale",
    "fracture bimalléolaire consolidée en bonne position",
    "pseudarthrose tibia nécessitant ostéosynthèse",
    "syndrome loge jambe avec séquelles musculaires",
    "fracture col fémur consolidée raccourcissement 2 cm"
];

testCases.forEach((text, index) => {
    console.log(`📋 Test ${index + 1}: "${text}"`);
    const result = comprehensiveSingleLesionAnalysis(text);
    if (result.type !== 'no_result' && 'name' in result) {
        console.log(`✅ Found: ${result.name} (${result.rate}%)\n`);
    } else {
        console.log('❌ Not found\n');
    }
});
