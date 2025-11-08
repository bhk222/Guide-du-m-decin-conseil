import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG VISION - PATTERNS MANQUÉS');

const testCases = [
    "décollement de rétine traumatique avec baisse acuité visuelle 3/10",
    "corps étranger intraoculaire métallique avec cataracte secondaire",
    "kératite post-traumatique avec opacités cornéennes",
    "hémophtalmie post-traumatique œil droit acuité 4/10",
    "contusion oculaire avec mydriase paralytique"
];

testCases.forEach((text, index) => {
    console.log(`\n📋 Input: "${text}"`);
    const result = comprehensiveSingleLesionAnalysis(text);
    if (result.type !== 'no_result' && 'name' in result) {
        console.log(`✅ Found: ${result.name} (${result.rate}%)`);
    } else {
        console.log('❌ Not found');
    }
});