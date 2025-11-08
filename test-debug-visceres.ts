import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG VISCÈRES\n');

const testCases = [
    "splénectomie totale ablation rate suite rupture traumatique",
    "néphrectomie unilatérale rein gauche après traumatisme rénal",
    "colectomie partielle ablation côlon post-traumatique",
    "cholécystectomie ablation vésicule biliaire traumatisme abdominal",
    "hépatectomie partielle section hépatique accident voiture",
    "gastrectomie partielle perforation estomac traumatique",
    "hystérectomie ablation utérus traumatisme pelvien",
    "orchidectomie ablation testicule traumatisme scrotal",
    "pneumonectomie ablation poumon traumatisme thoracique",
    "pancréatectomie partielle section pancréas accident"
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