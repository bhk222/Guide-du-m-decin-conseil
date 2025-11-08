import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

console.log('🧪 TEST DEBUG DOIGTS DÉTAILLÉ\n');

const testCases = [
    "amputation pouce main dominante désarticulation",
    "amputation index main dominante phalange distale",
    "amputation médius main dominante métacarpophalangienne", 
    "amputation annulaire main dominante complète",
    "amputation auriculaire main dominante partielle",
    "raideur index suite fracture phalange proximale",
    "ankylose majeur en flexion suite traumatisme",
    "amputation deux doigts index et majeur main droite",
    "amputation trois doigts sauf pouce et auriculaire",
    "section tendons fléchisseurs index avec raideur"
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