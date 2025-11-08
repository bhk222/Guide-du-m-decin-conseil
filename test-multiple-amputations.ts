import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

async function testMultipleAmputations() {
    console.log('🧪 TEST AMPUTATIONS MULTIPLES\n');
    
    const testCases = [
        { input: 'amputation deux doigts index médius', expected: 'Amputation de deux doigts' },
        { input: 'amputation trois doigts', expected: 'Amputation de trois doigts' },
        { input: 'amputation quatre doigts', expected: 'Amputation de quatre doigts' },
        { input: 'amputation deux orteils', expected: 'Amputation de deux orteils' },
        { input: 'amputation trois orteils', expected: 'Amputation de trois orteils' }
    ];
    
    for (const test of testCases) {
        console.log(`📋 Input: "${test.input}"`);
        console.log(`🎯 Expected: ${test.expected}`);
        
        const result = comprehensiveSingleLesionAnalysis(test.input);
        
        if (result.type === 'proposal') {
            const success = result.name.includes('deux') || result.name.includes('trois') || result.name.includes('quatre');
            console.log(`${success ? '✅' : '❌'} Found: ${result.name} (${result.rate}%)`);
        } else {
            console.log(`❌ No proposal: ${result.type}`);
        }
        console.log('');
    }
}

testMultipleAmputations().catch(console.error);