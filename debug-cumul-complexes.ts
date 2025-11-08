import { detectMultipleLesions } from './components/AiAnalyzer';

const casComplexes = [
    "fracture plateaux tibiaux avec rupture LCA opérée raideur flexion 90 degrés instabilité résiduelle",
    "polytraumatisme avec fracture fémur droit consolidée raccourcissement 3 cm et fracture poignet gauche raideur séquellaire", 
    "traumatisme crânien avec céphalées chroniques quotidiennes associé amputation 2 derniers orteils pied gauche"
];

console.log('🔍 ANALYSE DÉTECTION CUMUL - CAS COMPLEXES\n');

for (const [i, testCase] of casComplexes.entries()) {
    console.log(`📍 CAS ${i+1}: "${testCase}"`);
    
    const cumulResult = detectMultipleLesions(testCase);
    
    console.log(`   Est cumul: ${cumulResult.isCumul}`);
    console.log(`   Nombre de lésions: ${cumulResult.lesionCount}`);
    console.log(`   Mots-clés détectés: [${cumulResult.keywords.join(', ')}]`);
    console.log(`   État antérieur: ${cumulResult.hasAnteriorState} (IPP: ${cumulResult.anteriorIPP}%)`);
    
    // Analyser pourquoi ce n'est pas détecté comme cumul
    if (!cumulResult.isCumul) {
        console.log('\n   🚨 CUMUL NON DÉTECTÉ - Analyse:');
        
        // Mots-clés de cumul recherchés
        const cumulKeywords = ['avec', 'et', 'associé', 'ainsi que', 'accompagné', 'également', 'plus', 'aussi', '+'];
        const foundCumulWords = cumulKeywords.filter(kw => testCase.toLowerCase().includes(kw));
        console.log(`   - Mots de liaison trouvés: [${foundCumulWords.join(', ')}]`);
        
        // Mots-clés de lésions
        const lesionKeywords = ['fracture', 'rupture', 'traumatisme', 'amputation', 'raideur', 'instabilité', 'douleur'];
        const foundLesionWords = lesionKeywords.filter(kw => testCase.toLowerCase().includes(kw));
        console.log(`   - Mots de lésions trouvés: [${foundLesionWords.join(', ')}]`);
        
        // Analyse des régions anatomiques
        const regions = ['tibiaux', 'lca', 'fémur', 'poignet', 'crânien', 'orteils', 'pied'];
        const foundRegions = regions.filter(kw => testCase.toLowerCase().includes(kw));
        console.log(`   - Régions anatomiques trouvées: [${foundRegions.join(', ')}]`);
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
}