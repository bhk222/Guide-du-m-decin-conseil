function normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['\-\s]/g, '');
}

function detectMultipleLesions(text: string): { 
    isCumul: boolean; 
    lesionCount: number; 
    keywords: string[];
    hasAnteriorState: boolean;
    anteriorIPP: number | null;
} {
    const normalized = normalize(text);
    
    // 1. Keywords explicites de cumul
    const cumulKeywords = [
        'polytraumatisme', 'plusieurs lesions', 'sequelles multiples',
        'formule balthazar', 'balthazar'
    ];
    const foundKeywords = cumulKeywords.filter(kw => normalized.includes(kw));
    
    // 2. Détection état antérieur avec IPP
    const anteriorMatch = /etat anterieur.*?ipp\s*(\d+)\s*%/i.exec(normalized);
    const hasAnteriorState = anteriorMatch !== null;
    const anteriorIPP = anteriorMatch ? parseInt(anteriorMatch[1]) : null;
    
    // 3. Comptage séparateurs de lésions (+ et AVEC)
    const plusCount = (text.match(/\s\+\s/g) || []).length;
    const avecCount = (text.match(/\s+avec\s+/gi) || []).length;
    const totalSeparators = plusCount + avecCount;
    
    // 4. Comptage lésions anatomiques DISTINCTES
    // Split par "+" OU "avec" (case-insensitive)
    const parts = text.split(/\s*(?:\+|avec)\s*/i);
    const anatomicalKeywords = [
        'genou', 'cheville', 'epaule', 'coude', 'poignet', 'hanche',
        'rachis', 'bassin', 'main', 'pied', 'humerus', 'tibia', 'femur',
        'rotule', 'bras', 'avant-bras', 'cuisse', 'jambe'
    ];
    
    let distinctRegions = 0;
    const regionsFound = new Set<string>();
    
    for (const part of parts) {
        const partNorm = normalize(part);
        for (const kw of anatomicalKeywords) {
            if (partNorm.includes(kw) && !regionsFound.has(kw)) {
                regionsFound.add(kw);
                distinctRegions++;
                break;
            }
        }
    }
    
    console.log(`📊 DÉTECTION CUMUL:`);
    console.log(`   Keywords trouvés: ${foundKeywords.length} - [${foundKeywords.join(', ')}]`);
    console.log(`   Séparateurs "+": ${plusCount}`);
    console.log(`   Séparateurs "AVEC": ${avecCount}`);
    console.log(`   Total séparateurs: ${totalSeparators}`);
    console.log(`   Régions distinctes: ${distinctRegions} - [${Array.from(regionsFound).join(', ')}]`);
    console.log(`   État antérieur: ${hasAnteriorState} (IPP: ${anteriorIPP}%)`);
    
    // 5. Critères de cumul OPTIMISÉS
    const isCumul = 
        foundKeywords.length > 0 ||
        plusCount >= 3 ||
        (totalSeparators >= 2 && distinctRegions >= 2);
    
    const lesionCount = Math.max(
        totalSeparators + 1,
        distinctRegions,
        hasAnteriorState ? 2 : 1
    );
    
    console.log(`   → isCumul: ${isCumul}`);
    console.log(`   → lesionCount: ${lesionCount}`);
    
    return {
        isCumul,
        lesionCount: isCumul ? lesionCount : 1,
        keywords: foundKeywords,
        hasAnteriorState,
        anteriorIPP
    };
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST: FRACTURE PLATEAU TIBIAL + FLEXUM GENOU + FRACTURE HUMÉRUS');
console.log('═══════════════════════════════════════════════════════════════\n');

const input = 'FRACTURE DU PLATEUX TIBIALE GAUCHE AVEC UN FLEXUM DU GENOU GAUCHE AVEC FRACTURE DU DIAPHYSE HUMERALE';
console.log(`Input: "${input}"\n`);

const result = detectMultipleLesions(input);

console.log('\n📋 RÉSULTAT:');
console.log(`   isCumul: ${result.isCumul}`);
console.log(`   lesionCount: ${result.lesionCount}`);

if (!result.isCumul) {
    console.log('\n⚠️ PROBLÈME: Le système ne détecte PAS de lésions multiples!');
    console.log('   → Il va analyser seulement UNE lésion (probablement la première trouvée)');
    console.log('   → Les autres lésions seront IGNORÉES');
    console.log('\n💡 SOLUTION: Ajouter détection "AVEC" comme séparateur de lésions');
    console.log('   quand il y a plusieurs régions anatomiques distinctes');
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('TEST CONTRÔLE: Format avec "+"');
console.log('═══════════════════════════════════════════════════════════════\n');

const input2 = 'FRACTURE DU PLATEAU TIBIAL GAUCHE + FLEXUM DU GENOU GAUCHE + FRACTURE DU DIAPHYSE HUMERALE';
console.log(`Input: "${input2}"\n`);

const result2 = detectMultipleLesions(input2);

console.log('\n📋 RÉSULTAT:');
console.log(`   isCumul: ${result2.isCumul}`);
console.log(`   lesionCount: ${result2.lesionCount}`);
