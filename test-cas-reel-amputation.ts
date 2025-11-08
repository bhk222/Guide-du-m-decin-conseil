import { disabilityData } from './data/disabilityRates';

const allInjuriesWithPaths = disabilityData.flatMap(cat => 
    cat.subcategories.flatMap(sub => 
        sub.injuries.map(inj => ({
            ...inj,
            path: `${cat.name} > ${sub.name}`
        }))
    )
);

function normalize(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/['\-\s]/g, '');
}

// Simulation complète de l'analyse
function testCompleteInput(input: string) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('TEST ANALYSE COMPLÈTE - CAS RÉEL UTILISATEUR');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('📝 INPUT COMPLET:\n');
    console.log(input);
    console.log('\n');
    
    // Test détection lésions multiples
    const avecCount = (input.match(/\s+avec\s+/gi) || []).length;
    const plusCount = (input.match(/\s\+\s/g) || []).length;
    
    console.log('🔍 DÉTECTION LÉSIONS MULTIPLES:');
    console.log(`   Séparateurs "AVEC": ${avecCount}`);
    console.log(`   Séparateurs "+": ${plusCount}`);
    
    // Détection régions anatomiques
    const parts = input.split(/\s*(?:\+|avec)\s*/i);
    const anatomicalKeywords = [
        'genou', 'cheville', 'epaule', 'coude', 'poignet', 'hanche',
        'rachis', 'bassin', 'main', 'pied', 'humerus', 'tibia', 'femur',
        'rotule', 'bras', 'avant-bras', 'cuisse', 'jambe', 'radius', 'cubitus'
    ];
    
    const regionsFound = new Set<string>();
    for (const part of parts) {
        const partNorm = normalize(part);
        for (const kw of anatomicalKeywords) {
            if (partNorm.includes(kw)) {
                regionsFound.add(kw);
            }
        }
    }
    
    console.log(`   Régions anatomiques: ${regionsFound.size} - [${Array.from(regionsFound).join(', ')}]`);
    console.log('\n');
    
    // Test règles expertes
    console.log('🎯 TEST RÈGLES EXPERTES:\n');
    
    const rules = [
        {
            name: "Sans séquelle",
            pattern: /fracture.*(?:sans|consolidé)|consolidé.*fracture/i,
            context: /sans.*s[eé]quelle/i
        },
        {
            name: "Amputation transcarpienne",
            pattern: /amputation\s+(?:trans)?carpien/i,
            context: /main|poignet|carpe/i
        },
        {
            name: "Perte fonctionnelle main",
            pattern: /(?:perte|amputation).*(?:totale|fonctionnelle).*main/i,
            context: /dominante?|droite?|membre.*sup[eé]rieur/i
        }
    ];
    
    let matchedRule = null;
    for (const rule of rules) {
        const patternMatch = rule.pattern.test(input);
        const contextMatch = rule.context.test(input);
        
        console.log(`Règle "${rule.name}":`);
        console.log(`   Pattern: ${patternMatch}`);
        console.log(`   Context: ${contextMatch}`);
        console.log(`   → ${patternMatch && contextMatch ? '✅ MATCHED' : '❌ Not matched'}\n`);
        
        if (patternMatch && contextMatch && !matchedRule) {
            matchedRule = rule.name;
        }
    }
    
    if (matchedRule) {
        console.log(`\n✅ RÈGLE EXPERTE ACTIVÉE: "${matchedRule}"`);
        
        if (matchedRule === "Amputation transcarpienne" || matchedRule === "Perte fonctionnelle main") {
            const searchTerm = "Amputation de la main (Main Dominante)";
            const directMatch = allInjuriesWithPaths.find(item => 
                normalize(item.name) === normalize(searchTerm)
            );
            
            if (directMatch) {
                console.log('\n📊 RÉSULTAT ATTENDU:');
                console.log(`   Séquelle: ${directMatch.name}`);
                console.log(`   Taux IPP: ${Array.isArray(directMatch.rate) ? `${directMatch.rate[0]}-${directMatch.rate[1]}%` : `${directMatch.rate}%`}`);
                console.log(`   Rubrique: ${directMatch.path}`);
            }
        }
    } else {
        console.log('\n❌ AUCUNE RÈGLE EXPERTE NE MATCH');
        console.log('   → Le système va tenter semantic search');
        console.log('   → Risque de proposer "fracture radius" au lieu d\'amputation');
    }
    
    // Test semantic search fallback
    console.log('\n\n🔎 TEST SEMANTIC SEARCH (fallback):');
    const keywords = ['amputation', 'main', 'transcarpienne', 'perte', 'fonctionnelle'];
    
    for (const keyword of keywords) {
        const results = allInjuriesWithPaths.filter(item => 
            normalize(item.name).includes(normalize(keyword))
        ).slice(0, 3);
        
        if (results.length > 0) {
            console.log(`\nKeyword "${keyword}": ${results.length} résultats`);
            results.forEach((r, i) => {
                const rate = Array.isArray(r.rate) ? `${r.rate[0]}-${r.rate[1]}%` : `${r.rate}%`;
                console.log(`   ${i+1}. ${r.name} - ${rate}`);
            });
        }
    }
}

const fullInput = `Ouvrier métallurgiste de 42 ans, main droite coincée dans une presse hydraulique défectueuse lors du repositionnement d'une tôle. Transporté d'urgence à l'hôpital avec perte sanguine importante. 2. Constatations cliniques : Amputation transcarpienne, plaies contuses multiples, fracture ouverte du radius distal, délabrement tendineux et cutané. Mobilité nulle du poignet, douleurs neuropathiques majeures. 3. Examens complémentaires : Radiographie : fracture comminutive du radius distal. EMG : lésion complète du nerf médian. 4. Discussion médico-légale : Accident typique du travail, survenu dans l'exercice des fonctions. Les séquelles sont majeures : perte fonctionnelle totale de la main dominante, douleur neuropathique chronique, troubles du sommeil, gêne sociale importante. 5. Conclusion : Amputation fonctionnelle du membre supérieur dominant.`;

testCompleteInput(fullInput);
