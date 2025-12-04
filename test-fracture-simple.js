// Test pour fracture du pilon tibial sans complications

const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const userInput = "fracture du pilon du tibia et fracture diaphysaire du péroné";
const normalizedText = normalize(userInput);

console.log("=== TEST FRACTURE SIMPLE (SANS COMPLICATIONS) ===");
console.log("Texte:", userInput);
console.log("Normalisé:", normalizedText);
console.log("");

// Vérifier si l'utilisateur mentionne des complications graves
const highImpactKeywords = [
    'paralysie', 'cécité', 'surdité', 'amputation', 'ankylose', 'pseudarthrose', 
    'ablation', 'perte', 'nécrose', 'désarticulation'
];

const keywords = normalizedText.split(' ');
const userMentionsHighImpact = highImpactKeywords.some(kw => 
    keywords.some(userKw => userKw.includes(kw))
);

console.log("Keywords utilisateur:", keywords);
console.log("Mentionne complication grave (pseudarthrose, etc.):", userMentionsHighImpact);
console.log("");

// Test des séquelles candidates
const candidates = [
    { name: "Fracture consolidée du pilon tibial", hasHighImpact: false },
    { name: "Pseudarthrose du tibia", hasHighImpact: true },
    { name: "Fracture consolidée des deux os de la jambe", hasHighImpact: false },
    { name: "Cal vicieux du tibia", hasHighImpact: false }
];

console.log("=== FILTRAGE DES SÉQUELLES ===");

const userExcludesComplications = normalizedText.includes('consolidee') || 
                                 normalizedText.includes('consolide') ||
                                 (!userMentionsHighImpact);

console.log("User exclut complications:", userExcludesComplications);
console.log("");

candidates.forEach(candidate => {
    const shouldExclude = userExcludesComplications && candidate.hasHighImpact;
    const status = shouldExclude ? "❌ EXCLU" : "✅ ACCEPTÉ";
    
    console.log(`${status} - ${candidate.name}`);
    if (shouldExclude) {
        console.log(`  → Raison: Complication grave non mentionnée par l'utilisateur`);
    }
});

console.log("");
console.log("=== RÉSULTAT ATTENDU ===");
console.log("✅ Fracture consolidée du pilon tibial (ACCEPTÉ)");
console.log("❌ Pseudarthrose du tibia (EXCLU - complication non mentionnée)");
