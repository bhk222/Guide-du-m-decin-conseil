import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG ÉPAULE\n');

const testCases = [
    'fracture tête humérale avec raideur abduction 60 degrés',
    'rupture coiffe des rotateurs complète avec impossibilité élévation',
    'raideur épaule droite abduction 80° rotation externe 40°'
];

for (const input of testCases) {
    console.log(`📋 Input: "${input}"`);
    
    const result = comprehensiveSingleLesionAnalysis(input);
    
    if (result.type === 'proposal') {
        console.log(`✅ Found: ${result.name} (${result.rate}%)`);
    } else if (result.type === 'ambiguity') {
        console.log(`🤔 Ambiguity: ${result.choices?.length} choices`);
    } else {
        console.log(`❌ No result: ${result.type}`);
    }
    console.log('');
}
