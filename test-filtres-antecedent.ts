const text = `Homme de 50 ans, manutentionnaire, victime d'un accident de travail par chute avec traumatisme du genou droit. Le patient présente une gonalgie chronique antérieure connue, traitée épisodiquement avant l'accident.`;

// Copier la fonction normalize
const normalize = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Copier le pattern qui devrait matcher
const pattern1 = /(?:pr[eé]sente|pr[eé]sentait|souffre|souffrait)\s+(?:une?|des?|d'une?)\s+([a-zàéèêëïôù\s]+?)\s+(?:chronique|ancienne?)\s+(?:ant[eé]rieure?|pr[eé]existante?)\s+connue?/gi;

const pattern2 = /([a-zàéèêëïôù\s]+?)\s+(?:chronique|ancienne?)\s+(?:ant[eé]rieure?|pr[eé]existante?)\s+connue?,?\s+trait[eé]e?\s+(?:[eé]pisodiquement\s+)?avant\s+l'?accident/gi;

console.log('🧪 TEST ANTÉCÉDENT AVEC FILTRES\n');

// Test Pattern 1
const match1 = pattern1.exec(text);
if (match1) {
    const condition = match1[1].trim();
    const conditionNormalized = normalize(condition);
    
    console.log('✅ Pattern 1 matché');
    console.log('  - Match complet:', match1[0]);
    console.log('  - Groupe capturé (condition):', condition);
    console.log('  - Longueur:', condition.length);
    console.log('  - Normalized:', conditionNormalized);
    
    // Vérifier filtres
    const sequelaKeywords = [
        'persistante', 'persistant', 'residuelle', 'residuel', 'sequellaire',
        'post-traumatique', 'post traumatique', 'consecutive', 'secondaire',
        'suite', 'apres', 'depuis', 'residue', 'demeure'
    ];
    
    const isSequela = sequelaKeywords.some(kw => conditionNormalized.includes(kw));
    
    // Primary lesion
    const primaryLesionPresent = /\b(fracture|luxation|rupture|entorse|lesion|traumatisme|trauma|plaie|section|amputation|ecrasement|contusion|brulure)/i.test(normalize(text));
    
    // Explicit preexisting
    const hasExplicitPreexisting = /ant[eé]rieure?|pr[eé]existante?|chronique.*avant|avant.*accident/i.test(match1[0]);
    
    const isLikelySequela = !hasExplicitPreexisting && primaryLesionPresent && (
        conditionNormalized.includes('douleur') ||
        conditionNormalized.includes('raideur') ||
        conditionNormalized.includes('limitation')
    );
    
    console.log('\n🔍 FILTRES:');
    console.log('  - Length > 5?', condition.length > 5);
    console.log('  - Is sequela?', isSequela);
    console.log('  - Primary lesion present?', primaryLesionPresent);
    console.log('  - Has explicit preexisting?', hasExplicitPreexisting);
    console.log('  - Is likely sequela?', isLikelySequela);
    
    if (condition.length > 5 && !isSequela && !isLikelySequela) {
        console.log('\n✅ ANTÉCÉDENT DEVRAIT ÊTRE AJOUTÉ');
    } else {
        console.log('\n❌ ANTÉCÉDENT FILTRÉ');
        if (condition.length <= 5) console.log('   → Raison: trop court');
        if (isSequela) console.log('   → Raison: mot-clé séquelle');
        if (isLikelySequela) console.log('   → Raison: probablement séquelle');
    }
}
