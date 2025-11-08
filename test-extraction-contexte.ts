// Test: Que reste-t-il après nettoyage du contexte patient ?

const input = `Ouvrier métallurgiste de 42 ans, main droite coincée dans une presse hydraulique défectueuse lors du repositionnement d'une tôle. Transporté d'urgence à l'hôpital avec perte sanguine importante. 2. Constatations cliniques : Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures. 3. Examens complémentaires : Radiographie : fracture comminutive du radius distal. EMG : lésion complète du nerf médian. 4. Discussion médico-légale : Accident typique du travail, survenu dans l'exercice des fonctions. Les séquelles sont majeures : perte fonctionnelle totale de la main dominante, douleur neuropathique chronique, troubles du sommeil, gêne sociale importante. 5. Conclusion : Amputation fonctionnelle du membre supérieur dominant.`;

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST: NETTOYAGE DU CONTEXTE PATIENT');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📝 INPUT ORIGINAL:');
console.log(input);
console.log('\n');

// Simulation extractPatientContext
function extractPatientContext(text: string) {
    let cleanedText = text;
    let profession: string | undefined;
    let age: string | undefined;
    
    // Pattern profession + âge (ex: "Ouvrier métallurgiste de 42 ans")
    const professionPattern = /(ouvrier|employ[eé]|cadre|ing[eé]nieur|technicien|agriculteur|m[eé]canicien|soudeur|[eé]lectricien|plombier|ma[cç]on|menuisier|chauffeur|infirmi[èe]re?|m[eé]decin|professeur|comptable|secr[eé]taire|vendeur|cuisinier|serveur|gardien|agent|chef|directeur|g[eé]rant|artisan|commer[cç]ant)\s+[a-zàâäéèêëïîôùûü\-\s]+(?:\s+de\s+)?(\d{1,2})\s+ans/i;
    
    const profMatch = professionPattern.exec(text);
    if (profMatch) {
        profession = profMatch[0].replace(/\s+de\s+\d+\s+ans/i, '').trim();
        age = profMatch[2];
        cleanedText = cleanedText.replace(profMatch[0], '').trim();
        console.log(`✂️ PROFESSION EXTRAITE: "${profession}"`);
        console.log(`✂️ ÂGE EXTRAIT: ${age} ans`);
        console.log(`📝 Texte après extraction: "${cleanedText.substring(0, 150)}..."\n`);
    }
    
    return { profession, age, cleanedText };
}

// Simulation extractPreexistingConditions
function extractPreexistingConditions(text: string) {
    let cleanedText = text;
    const preexisting: string[] = [];
    
    // Patterns états antérieurs
    const anteriorPatterns = [
        /(?:antécédents?|ant[eé]c[eé]dents?|état antérieur|[eé]tat ant[eé]rieur)[:\s]*([^.]+)/gi,
        /(?:avant l'accident|pr[eé]-existant)[:\s]*([^.]+)/gi
    ];
    
    for (const pattern of anteriorPatterns) {
        const matches = text.matchAll(pattern);
        for (const match of matches) {
            if (match[1]) {
                preexisting.push(match[1].trim());
                cleanedText = cleanedText.replace(match[0], '').trim();
            }
        }
    }
    
    if (preexisting.length > 0) {
        console.log(`✂️ ANTÉCÉDENTS EXTRAITS: ${preexisting.length}`);
        preexisting.forEach(a => console.log(`   - "${a}"`));
        console.log(`📝 Texte après extraction: "${cleanedText.substring(0, 150)}..."\n`);
    }
    
    return { preexisting, cleanedText };
}

const step1 = extractPatientContext(input);
const step2 = extractPreexistingConditions(step1.cleanedText);

console.log('═══════════════════════════════════════════════════════════════');
console.log('📊 RÉSULTAT FINAL:');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Profession: ${step1.profession || 'Non détectée'}`);
console.log(`Âge: ${step1.age || 'Non détecté'} ans`);
console.log(`Antécédents: ${step2.preexisting.length > 0 ? step2.preexisting.join(', ') : 'Aucun'}`);
console.log(`\nTexte nettoyé final:`);
console.log(`"${step2.cleanedText}"`);
console.log(`\nLongueur: ${step2.cleanedText.length} caractères`);

// Test condition de blocage
const hasLesionKeywords = /amputation|fracture|perte|an?kylose|paralysie|section|rupture|luxation|entorse/i.test(step2.cleanedText);

console.log(`\n🔍 TEST CONDITION BLOCAGE:`);
console.log(`   profession && finalCleanedText.length < 10: ${step1.profession && step2.cleanedText.length < 10}`);
console.log(`   hasLesionKeywords: ${hasLesionKeywords}`);
console.log(`   BLOQUE?: ${step1.profession && step2.cleanedText.length < 10 && !hasLesionKeywords ? '🔴 OUI' : '🟢 NON'}`);

if (hasLesionKeywords) {
    console.log('\n✅ Le texte contient des keywords de lésions importantes');
    console.log('   → L\'analyse devrait continuer normalement');
} else {
    console.log('\n❌ PROBLÈME: Aucun keyword de lésion trouvé dans le texte nettoyé!');
    console.log('   → Le système va bloquer avec "Je ne peux pas encore calculer"');
}
