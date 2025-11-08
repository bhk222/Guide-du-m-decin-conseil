import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG MEMBRES SUPÉRIEURS\n');

const testCases = [
    "fracture diaphyse humérale consolidée avec cal vicieux",
    "fracture olécrane avec arthrose du coude",
    "fracture radius poignet avec limitation pronosupination",
    "fracture scaphoïde carpien pseudarthrose",
    "luxation épaule récidivante avec instabilité chronique",
    "fracture styloïde radiale consolidée raideur poignet",
    "épicondylite chronique post-traumatique résistante",
    "fracture col chirurgical huméral consolidé raideur épaule",
    "fracture both bones avant-bras avec cal vicieux rotation",
    "syndrome canal carpien post-traumatique opéré"
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