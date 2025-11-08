import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG BIMALLÉOLAIRE\n');

const testCases = [
    "fracture bimalléolaire consolidée en bonne position",
    "fracture bi-malléolaire consolidée",
    "fracture malléolaire externe et interne",
    "fracture des deux malléoles"
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