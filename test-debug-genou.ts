import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG GENOU\n');

const testCases = [
    { input: 'rupture LCA opérée avec laxité résiduelle dérobements fréquents', expected: 'LCA' },
    { input: 'méniscectomie totale interne avec chondropathie rotulienne', expected: 'méniscectomie' }
];

for (const test of testCases) {
    console.log(`📋 Input: "${test.input}"`);
    console.log(`🎯 Expected: ${test.expected}`);
    
    const result = comprehensiveSingleLesionAnalysis(test.input);
    
    if (result.type === 'proposal') {
        const success = result.name.toLowerCase().includes(test.expected.toLowerCase());
        console.log(`${success ? '✅' : '❌'} Found: ${result.name}`);
        console.log(`   Rate: ${result.rate}%`);
    } else if (result.type === 'ambiguity') {
        console.log(`🤔 Ambiguity: ${result.choices?.length} choices`);
        result.choices?.slice(0, 3).forEach((c, i) => {
            console.log(`   ${i+1}. ${c.name}`);
        });
    } else {
        console.log(`❌ No result: ${result.type}`);
    }
    console.log('');
}
