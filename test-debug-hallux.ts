import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

async function testHallux() {
    console.log('🧪 TEST DEBUG HALLUX RIGIDUS\n');
    
    const testInput = 'ankylose gros orteil hallux rigidus';
    console.log(`📋 Input: "${testInput}"`);
    console.log(`🎯 Expected: ~7% (range [3,10] → medium)`);
    
    const result = comprehensiveSingleLesionAnalysis(testInput);
    
    if (result.type === 'proposal') {
        console.log(`✅ Type: proposal`);
        console.log(`   Name: ${result.name}`);
        console.log(`   Rate: ${result.rate}%`);
        console.log(`   Path: ${result.path}`);
    } else if (result.type === 'ambiguity') {
        console.log(`🤔 Type: ambiguity`);
        result.choices.slice(0, 5).forEach((choice, i) => {
            console.log(`   ${i+1}. ${choice.name} (${Array.isArray(choice.rate) ? choice.rate.join('-') : choice.rate}%)`);
        });
    } else {
        console.log(`❌ Aucune proposition`);
    }
}

testHallux().catch(console.error);