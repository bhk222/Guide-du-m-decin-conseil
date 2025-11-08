import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG ÉTAT ANTÉRIEUR\n');

const testCases = [
    "aggravation arthrose genou suite traumatisme IPP antérieur 10%",
    "révision IPP fracture col fémur état antérieur consolidé",
    "rechute lombalgie chronique après nouvel accident travail",
    "évaluation séquelles sur état antérieur prothèse hanche",
    "traumatisme crânien avec antécédent AVC séquellaire 15%",
    "fracture radius sur arthrose préexistante poignet",
    "entorse cheville aggravant laxité ligamentaire ancienne",
    "nouveau traumatisme épaule IPP antérieur rupture coiffe 20%",
    "réévaluation après chirurgie réparatrice cicatrice 5%",
    "consolidation fracture tibia sur pseudarthrose antérieure"
];

testCases.forEach((text, index) => {
    console.log(`📋 Test ${index + 1}: "${text}"`);
    const result = comprehensiveSingleLesionAnalysis(text);
    if (result.type !== 'no_result' && 'name' in result) {
        console.log(`✅ Found: ${result.name} (${result.rate}%)\n`);
    } else {
        console.log('❌ Not found\n');
    }
});