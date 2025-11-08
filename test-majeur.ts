import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST SPÉCIFIQUE MAJEUR\n');

const testCases = [
    "ankylose doigt majeur en flexion suite traumatisme",
    "raideur du majeur après fracture phalange", 
    "ankylose médius suite traumatisme doigt"
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