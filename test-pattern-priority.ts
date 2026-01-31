/**
 * 🧪 TEST: Quel pattern s'active pour le texte du maçon ?
 */

const testText = "fracture déplacée du radius distal gauche, associée à une déchirure partielle des tendons extenseurs du poignet ainsi qu'une élongation musculaire de l'épaule gauche. L'évolution a été marquée par des douleurs résiduelles du poignet, une limitation de la mobilité articulaire, une diminution de la force de préhension";

const normalize = (str: string) => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const normalized = normalize(testText);
console.log('📝 Texte normalisé:');
console.log(normalized.substring(0, 150) + '...');
console.log('');

// Pattern 0: Cervical + fracture (PRIORITAIRE - return si 2 lésions)
const cervicalFracturePattern = /(?:fracture.*(?:poignet|radius|humerus|femur|tibia|clavicule|scaphoide)).*?(?:ainsi\s+qu['\']un?|associee?\s+[aà]|avec|sur\s+fond\s+de|et\s+un).*?(?:traumatisme\s+cervical|rachis\s+cervical|cervicalgie)/i;
console.log('🔍 Pattern 0 (cervical+fracture):');
console.log('   Match:', cervicalFracturePattern.test(normalized) ? '✅ OUI - RETURN IMMÉDIAT !' : '❌ Non');
console.log('');

// Pattern 0C: Coude + côtes (PRIORITAIRE - return si 2 lésions)
const coudesCotesPattern = /(?:fracture.*coude|fracture.*condyle|luxation.*ulna).*(?:avec|associee?|et).*fractures?.*cote|fractures?.*cote.*(?:avec|associee?|et).*(?:coude|condyle)/i;
console.log('🔍 Pattern 0C (coude+côtes):');
console.log('   Match:', coudesCotesPattern.test(normalized) ? '✅ OUI - RETURN IMMÉDIAT !' : '❌ Non');
console.log('');

// Pattern 0B: Fracture + ligament + muscle (NOTRE CAS)
const fractureMatch = normalized.match(/fracture\s+(?:non\s+)?(?:deplacee?)?\s*(?:du|de\s+la)?\s*(?:tiers)?\s*(?:distal|proximal|moyen)?\s*(?:du|de\s+la)?\s*(?:tibia|femur|humerus|genou|radius|cubitus)\s*(?:droit|gauche)?/i);
const ligamentMatch = normalized.match(/(?:dechirure|lesion|rupture)\s+(?:partielle?|complete?|totale?)?\s*(?:du|de\s+la|des)?\s*(?:ligament\s+(?:collateral|croise|lateral|lca|lcp)|tendons?\s+extenseurs?)\s*(?:medial|interne|externe|anterieur|posterieur|poignet|main)?\s*(?:du|de\s+la)?\s*(?:genou|coude|poignet)?\s*(?:droit|gauche)?/i);
const muscleMatch = normalized.match(/(?:elongation|dechirure|rupture)\s+(?:musculaire?)?\s*(?:du|de\s+la?|de\s+l|l)?\s*(?:muscle|quadriceps|epaule|triceps|biceps|deltoid)\s*(?:gauche|droit)?/i);
const raideurMatch = normalized.match(/(?:limitation|raideur)\s+(?:articulaire|residuelle)?\s*(?:du|de\s+la)?\s*(?:genou|hanche|coude|poignet|cheville|mobilite)/i);
const algiesMatch = normalized.match(/(?:algies?|douleurs?)\s+(?:m[ée]caniques?)?\s*(?:persistantes?|chroniques?|r[ée]siduelles?)?/i);
const deficitForceMatch = normalized.match(/(?:diminution|d[ée]ficit|perte)\s+(?:de\s+la?)?\s*force\s+(?:musculaire?)?/i);

console.log('🔍 Pattern 0B (polytraumatisme membre):');
console.log('   fractureMatch:', fractureMatch ? fractureMatch[0].substring(0, 50) : '❌ NULL');
console.log('   ligamentMatch:', ligamentMatch ? ligamentMatch[0].substring(0, 50) : '❌ NULL');
console.log('   muscleMatch:', muscleMatch ? muscleMatch[0].substring(0, 50) : '❌ NULL');
console.log('   raideurMatch:', raideurMatch ? raideurMatch[0].substring(0, 50) : '❌ NULL');
console.log('   algiesMatch:', algiesMatch ? algiesMatch[0].substring(0, 50) : '❌ NULL');
console.log('   deficitForceMatch:', deficitForceMatch ? deficitForceMatch[0].substring(0, 50) : '❌ NULL');

const componentCount = [fractureMatch, ligamentMatch, muscleMatch, raideurMatch, algiesMatch, deficitForceMatch].filter(m => m).length;
const conditionActivated = componentCount >= 3 && fractureMatch && (ligamentMatch || muscleMatch);

console.log('');
console.log('📊 Résumé:');
console.log('   componentCount:', componentCount);
console.log('   Condition Pattern 0B activée:', conditionActivated ? '✅ OUI' : '❌ Non');
console.log('   Nombre de lésions extraites:', conditionActivated ? [fractureMatch, ligamentMatch, muscleMatch].filter(m => m).length : 0);
