import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

async function testColectomie() {
    console.log('🧪 TEST DEBUG COLECTOMIE\n');
    
    const testInput = 'colectomie partielle ablation côlon traumatique';
    console.log(`📋 Input: "${testInput}"`);
    console.log(`🎯 Expected: ~23%`);
    
    const result = comprehensiveSingleLesionAnalysis(testInput);
    
    if (result.type === 'proposal') {
        console.log(`✅ Type: proposal`);
        console.log(`   Name: ${result.name}`);
        console.log(`   Rate: ${result.rate}%`);
        console.log(`   Path: ${result.path}`);
    } else if (result.type === 'ambiguity') {
        console.log(`🤔 Type: ambiguity`);
        result.choices.slice(0, 3).forEach((choice, i) => {
            console.log(`   ${i+1}. ${choice.name} (${Array.isArray(choice.rate) ? choice.rate.join('-') : choice.rate}%)`);
        });
    } else {
        console.log(`❌ Aucune proposition`);
    }
}

testColectomie().catch(console.error);