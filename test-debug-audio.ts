import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

async function testAudition() {
    console.log('🧪 TEST DEBUG AUDITION\n');
    
    const testCases = [
        { input: 'surdité complète oreille droite oreille gauche normale', expected: 15 },
        { input: 'surdité partielle 40 dB oreille gauche', expected: 8 },
        { input: 'acouphènes isolés permanents sans surdité', expected: 10 },
        { input: 'surdité totale bilatérale 100 dB', expected: 60 }
    ];
    
    for (const test of testCases) {
        console.log(`\n📋 Input: "${test.input}"`);
        console.log(`🎯 Expected: ${test.expected}%`);
        
        const result = comprehensiveSingleLesionAnalysis(test.input);
        
        if (result.type === 'proposal') {
            console.log(`✅ Type: proposal`);
            console.log(`   Name: ${result.name}`);
            console.log(`   Rate: ${result.rate}%`);
        } else if (result.type === 'ambiguity') {
            console.log(`🤔 Type: ambiguity`);
            result.choices.slice(0, 3).forEach((choice, i) => {
                console.log(`   ${i+1}. ${choice.name} (${Array.isArray(choice.rate) ? choice.rate.join('-') : choice.rate}%)`);
            });
        } else {
            console.log(`❌ Aucune proposition`);
        }
    }
}

testAudition().catch(console.error);
