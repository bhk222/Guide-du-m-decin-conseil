import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const text = "rupture coiffe des rotateurs complète avec impossibilité élévation active testing 0/5 amyotrophie supra épineux";
console.log(`Text: "${text}"\n`);

const result = comprehensiveSingleLesionAnalysis(text);

if (result.type === 'proposal') {
    console.log(`✅ Type: proposal`);
    console.log(`   Name: ${result.name}`);
    console.log(`   Rate: ${result.rate}%`);
} else if (result.type === 'ambiguity') {
    console.log(`🤔 Type: ambiguity (${result.choices?.length} choices)`);
    result.choices?.slice(0, 3).forEach((c, i) => {
        console.log(`   ${i+1}. ${c.name}`);
    });
} else {
    console.log(`❌ Type: ${result.type}`);
}
