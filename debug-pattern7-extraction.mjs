/**
 * DEBUG - Vérifier extraction Pattern 7
 */

const tests = [
    "amputation P3 D5 avec repture du flechisseur du P2 D4",
    "amputation P3 D5 avec repture du flechisseur du P2 D4 main droite",
    "amputation P3 D5 avec rupture du fléchisseur du P2 D4 main dominante"
];

const amputationTendonPattern = /(?:amputation|perte|desart).*?(?:p[123]|phalange).*?(?:d[1-5]|doigt).*?(?:avec|et|ainsi\s+qu['"]une?|associee?\s+[aà]).*?(?:r[ue]pture|section|l[eé]sion).*?(?:fl[eé]chisseur|extenseur|tendon)/i;

console.log('\n🔍 DEBUG EXTRACTION PATTERN 7\n');
console.log('='.repeat(80));

tests.forEach((text, idx) => {
    console.log(`\nTEST ${idx + 1}: "${text}"`);
    console.log('-'.repeat(80));
    
    // Test pattern général
    const matches = amputationTendonPattern.test(text);
    console.log(`✅ Pattern match: ${matches ? 'OUI' : 'NON'}`);
    
    if (matches) {
        // Extraire amputation
        const amputationPart = text.match(/(?:amputation|perte|desart).*?(?:p[123]|phalange).*?(?:d[1-5]|doigt|pouce|index|m[eé]dius|annulaire|auriculaire).*?(?=(?:avec|et|ainsi|associ[eé]e?))/i)?.[0] || '';
        console.log(`📋 amputationPart: "${amputationPart}"`);
        
        // Extraire tendon
        const tendonPart = text.match(/(?:avec|et|ainsi\s+qu['"]une?|associ[eé]e?\s+[aà])\s*(?:r[ue]pture|section|l[eé]sion).*?(?:fl[eé]chisseur|extenseur|tendon).*?(?:p[123]|phalange)?.*?(?:d[1-5]|doigt|pouce|index|m[eé]dius|annulaire|auriculaire)/i)?.[0] || '';
        console.log(`📋 tendonPart: "${tendonPart}"`);
        
        if (amputationPart && tendonPart) {
            const cleanTendonPart = tendonPart.replace(/^(?:avec|et|ainsi\s+qu['"]une?|associ[eé]e?\s+[aà])\s*/i, '').trim();
            console.log(`✅ Extraction réussie:`);
            console.log(`   1. ${amputationPart.trim()}`);
            console.log(`   2. ${cleanTendonPart}`);
        } else {
            console.log(`❌ Extraction échouée:`);
            console.log(`   - amputationPart vide: ${!amputationPart}`);
            console.log(`   - tendonPart vide: ${!tendonPart}`);
            
            // Debug sub-patterns tendonPart
            if (!tendonPart) {
                console.log(`\n   🔬 Debug tendonPart extraction:`);
                const avec = text.match(/avec|et|ainsi/i)?.[0];
                console.log(`      - "avec" trouvé: ${avec || 'NON'}`);
                
                const rupture = text.match(/r[ue]pture|section|l[eé]sion/i)?.[0];
                console.log(`      - "r[ue]pture" trouvé: ${rupture || 'NON'}`);
                
                const flechisseur = text.match(/fl[eé]chisseur|extenseur|tendon/i)?.[0];
                console.log(`      - "fl[eé]chisseur" trouvé: ${flechisseur || 'NON'}`);
                
                const doigt = text.match(/d[1-5]|doigt|annulaire|auriculaire/i)?.[0];
                console.log(`      - "d[1-5]|doigt" trouvé: ${doigt || 'NON'}`);
                
                // Tester pattern simplifié
                const simplePattern = /avec.*repture.*flechisseur.*d4/i;
                console.log(`\n      - Pattern simplifié test: ${simplePattern.test(text)}`);
                
                const simpleExtract = text.match(/avec.*repture.*flechisseur.*[pd][0-9]/i)?.[0];
                console.log(`      - Extraction simple: "${simpleExtract || 'AUCUNE'}"`);
            }
        }
    } else {
        console.log(`❌ Pattern ne matche pas (ne devrait jamais arriver)`);
    }
});

console.log('\n' + '='.repeat(80));
console.log('\n💡 DIAGNOSTIC:');
console.log('  - Si amputationPart OK mais tendonPart vide → Problème regex extraction tendon');
console.log('  - Si les deux vides → Problème regex extraction');
console.log('  - Vérifier lookhead (?=...) dans amputationPart et lookahead pattern dans tendonPart\n');
