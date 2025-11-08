import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG ORTEILS - PATTERNS VARIÉS\n');

const testCases = [
    "amputation gros orteil",
    "amputation deux orteils pied",
    "ankylose gros orteil hallux rigidus",
    "amputation tous les orteils sauf gros orteil",
    "amputation partielle gros orteil phalange distale",
    "ankylose interphalangienne 2ème orteil",
    "amputation 3 orteils dont gros orteil",
    "raideur hallux limitation 50%",
    "amputation désarticulation métatarsophalangienne gros orteil",
    "séquelles fracture phalanges orteils avec raideur"
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
