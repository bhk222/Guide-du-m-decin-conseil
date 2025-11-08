import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG AUDITION - PATTERNS VARIÉS\n');

const testCases = [
    "surdité post-traumatique oreille droite perte 60 dB avec acouphènes permanents",
    "surdité complète oreille droite oreille gauche normale",
    "surdité partielle 40 dB oreille gauche",
    "acouphènes isolés permanents sans surdité",
    "surdité totale bilatérale 100 dB",
    "hypoacousie unilatérale 50 dB suite traumatisme crânien",
    "anacousie complète oreille gauche après fracture rocher",
    "surdité perception neurosensorielle 70 dB bilatérale",
    "surdité transmission 30 dB avec perforation tympanique",
    "baisse audition moyenne 45 dB les deux oreilles"
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
