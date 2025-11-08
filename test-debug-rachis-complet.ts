import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG RACHIS COMPLET\n');

const testCases = [
    "tassement vertébral L3 avec douleurs lombaires chroniques",
    "tassement vertébral C5 avec raideur cervicale",
    "tassement vertébral D8 avec cyphose dorsale",
    "spondylolisthésis L5-S1 post-traumatique",
    "entorse cervicale avec syndrome post-traumatique",
    "hernie discale L4-L5 post-traumatique opérée",
    "fracture processus transverse L2 consolidée",
    "raideur rachis lombaire DDS 35 cm",
    "limitation flexion rachis cervical 50%",
    "arthrodèse lombaire L4-L5 post-traumatique"
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