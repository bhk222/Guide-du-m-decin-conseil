import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DÉTECTION CUMULS\n');

const testCases = [
    'genou LCA + méniscectomie',
    'main amputation index + pouce',
    'vision cataracte + audition surdité 60dB',
    'simple fracture col fémur'
];

for (const test of testCases) {
    console.log(`Input: "${test}"`);
    const hasCumul = /\+|et\s+(?:aussi|egalement)|cumul|polytrauma/i.test(test);
    console.log(`Cumul détecté: ${hasCumul ? 'OUI ✅' : 'NON'}\n`);
}
