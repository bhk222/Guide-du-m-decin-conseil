import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST SPONDYLOLISTHÉSIS\n');

const testCases = [
    "spondylolisthésis L5-S1 post-traumatique",
    "spondylolisthesis L5 S1 traumatique",
    "listthesis L5-S1 modifié par traumatisme",
    "glissement vertébral L5 post-traumatique"
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