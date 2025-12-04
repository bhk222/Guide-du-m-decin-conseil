// Test extraction lésions individuelles

const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const extractIndividualLesions = (text) => {
    const normalized = normalize(text);
    const lesions = [];
    
    console.log("Input normalized:", normalized);
    
    // Pattern 1: Fractures multiples sur même os (trochanter et diaphyse)
    const sameBonePattern = /fracture.*?(trochanter|col|diaphyse|pilon|plateau|condyle|epicondyle).*?(?:et|,).*?(trochanter|col|diaphyse|pilon|plateau|condyle|epicondyle)/i;
    const sameBoneMatch = sameBonePattern.exec(normalized);
    
    console.log("Pattern 1 match:", sameBoneMatch);
    
    if (sameBoneMatch) {
        const part1 = sameBoneMatch[1];
        const part2 = sameBoneMatch[2];
        const boneContext = normalized.includes('femur') || normalized.includes('femorale') ? 'femur' : 
                          normalized.includes('tibia') || normalized.includes('tibiale') ? 'tibia' :
                          normalized.includes('humer') ? 'humerus' : '';
        
        console.log("Part1:", part1, "Part2:", part2, "Bone:", boneContext);
        
        lesions.push(`fracture ${part1} ${boneContext}`.trim());
        lesions.push(`fracture ${part2} ${boneContext}`.trim());
        return lesions;
    }
    
    // Pattern 2: Séparation par "+" (ex: "fracture humérus + entorse genou")
    if (normalized.includes(' + ')) {
        const parts = normalized.split(/\s*\+\s*/);
        return parts.filter(p => p.length > 5);
    }
    
    // Pattern 3: Séparation par "et" entre deux fractures distinctes
    const twoFracturesPattern = /fracture.*?(?:et|,)\s*fracture/i;
    if (twoFracturesPattern.test(normalized)) {
        const parts = normalized.split(/\s*(?:et|,)\s*(?=fracture)/i);
        return parts.filter(p => p.length > 5);
    }
    
    // Si aucun pattern détecté, retourner le texte original
    console.log("No pattern matched, returning original");
    return [normalized];
};

const testCases = [
    "Fracture du trochanter et diaphyse fémorale",
    "fracture trochanter et diaphyse femorale",
    "fracture du pilon du tibia et fracture diaphysaire du péroné",
    "fracture humérus + entorse genou"
];

console.log("=== TEST EXTRACTION LÉSIONS INDIVIDUELLES ===\n");

testCases.forEach(test => {
    console.log(`\n📝 Input: "${test}"`);
    const result = extractIndividualLesions(test);
    console.log(`✅ Résultat: [${result.length} lésions]`);
    result.forEach((lesion, i) => console.log(`   ${i+1}. "${lesion}"`));
    console.log("---");
});
