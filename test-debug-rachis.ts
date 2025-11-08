import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG RACHIS\n');

const testCases = [
    'tassement vertébral L3 avec cyphose 15 degrés raideur lombaire',
    'entorse cervicale avec syndrome cervical chronique',
    'raideur rachis lombaire DDS 35 cm schober 3 cm'
];

for (const input of testCases) {
    console.log(`📋 Input: "${input}"`);
    
    const result = comprehensiveSingleLesionAnalysis(input);
    
    if (result.type === 'proposal') {
        console.log(`✅ Found: ${result.name} (${result.rate}%)`);
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