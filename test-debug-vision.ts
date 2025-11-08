import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG VISION\n');

const testCases = [
    { input: 'cataracte post traumatique avec baisse acuité visuelle OD 4/10 OG 8/10', expected: 35 },
    { input: 'uvéite chronique post traumatique avec poussées fréquentes', expected: 25 }
];

for (const test of testCases) {
    console.log(`📋 Input: "${test.input}"`);
    console.log(`🎯 Expected: ${test.expected}%`);
    
    const result = comprehensiveSingleLesionAnalysis(test.input);
    
    if (result.type === 'proposal') {
        console.log(`✅ Found: ${result.name}`);
        console.log(`   Rate: ${result.rate}% (expected ${test.expected}%)`);
        const deviation = Math.abs(result.rate - test.expected);
        console.log(`   Deviation: ${deviation}% ${deviation <= 5 ? '✅' : '❌'}`);
    } else {
        console.log(`❌ No proposal: ${result.type}`);
    }
    console.log('');
}
