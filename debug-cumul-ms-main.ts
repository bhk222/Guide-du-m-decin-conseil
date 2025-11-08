import { detectMultipleLesions } from './components/AiAnalyzer';

const cases = [
    "amputation pouce main dominante sans possibilité préhension pollici digitale opposition impossible",
    "amputation index main dominante niveau articulation métacarpo phalangienne",
    "section tendons fléchisseurs médius avec impossibilité flexion active doigts raideur"
];

console.log('🔍 ANALYSE DÉTECTION CUMULS MS-MAIN\n');

for (const [i, testCase] of cases.entries()) {
    console.log(`📍 CAS ${i+1}: "${testCase}"`);
    
    const cumulResult = detectMultipleLesions(testCase);
    
    console.log(`   Est cumul: ${cumulResult.isCumul}`);
    console.log(`   Nombre de lésions: ${cumulResult.lesionCount}`);
    console.log(`   Mots-clés détectés: [${cumulResult.keywords.join(', ')}]`);
    console.log(`   État antérieur: ${cumulResult.hasAnteriorState} (IPP: ${cumulResult.anteriorIPP}%)`);
    
    if (cumulResult.isCumul) {
        console.log(`   💡 CUMUL DÉTECTÉ - plusieurs lésions identifiées`);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
}