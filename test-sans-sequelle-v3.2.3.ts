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

function determineSeverity(text: string) {
    return { level: 'moyen' as const, confidence: 0.5 };
}

function comprehensiveSingleLesionAnalysis(enrichedText: string) {
    const normalizedInputText = enrichedText.toLowerCase();
    
    // Transformations des abréviations médicales (V3.2)
    const medicalAbbreviations: [RegExp, string | ((substring: string, ...args: any[]) => string)][] = [
        // Phalanges
        [/\b([pP])1\b/gi, 'phalange proximale P1 '],
        [/\b([pP])2\b/gi, 'phalange moyenne P2 '],
        [/\b([pP])3\b/gi, 'phalange distale P3 '],
        
        // Doigts - V3.2.2: Extended lookahead pour consolid|avec|raideur|ankylose|douleur|séquelle
        [/\b([dD])([1-5])\b(?=\s*(?:de|du|mg|md|main|gauche|droite|fracture|amputation|ecrasement|arrachement|consolid|avec|raideur|ankylose|douleur|s[eé]quelle))/gi, (match, d, num) => {
            const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
            return `${d.toLowerCase() === 'd' ? 'doigt' : 'Doigt'} ${doigts[parseInt(num)]} `;
        }],
        
        // Séquelles
        [/\bs[eé]quelle\s+douleureuse/gi, 'raideur avec douleur '],
    ];
    
    let processedText = enrichedText;
    for (const [pattern, replacement] of medicalAbbreviations) {
        if (typeof replacement === 'function') {
            processedText = processedText.replace(pattern, replacement);
        } else {
            processedText = processedText.replace(pattern, replacement);
        }
    }
    
    const workingText = processedText;
    
    console.log('📝 Input:', enrichedText);
    console.log('✨ Transformed:', workingText);
    
    // Règles expertes (V3.2.3 avec détection "sans séquelle")
    const expertRules = [
        // === RÈGLE SPÉCIALE: CONSOLIDATION SANS SÉQUELLE = 0% IPP ===
        {
            pattern: /fracture.*(?:sans|consolidé)|consolidé.*fracture/i,  // Ajouté "sans" pour détecter "fracture...sans séquelle"
            context: /sans.*s[eé]quelle/i,
            searchTerms: ["__SANS_SEQUELLE__"],  // Marqueur spécial
            priority: 10000
        },
        
        // === RÈGLES FRACTURES DE PHALANGES ===
        {
            pattern: /fracture.*(?:p1|p2|phalange\s+(?:proximale|moyenne|prox|moy)).*(?:index|d2)/i,
            context: /ankylose/i,
            searchTerms: ["Ankylose de l'index (totalité) (Main Dominante)"],
            priority: 1000,
            negativeContext: /sans.*s[eé]quelle/i
        },
        {
            pattern: /fracture.*(?:p1|phalange\s+(?:proximale|prox)).*(?:index|d2)/i,
            context: /main|doigt/i,
            searchTerms: ["Raideur d'une articulation de l'index (Main Dominante)"],
            priority: 999,
            negativeContext: /sans.*s[eé]quelle/i
        },
    ];
    
    // Tester les règles expertes
    for (const rule of expertRules) {
        console.log(`\n🔍 Testing rule with priority ${rule.priority}:`);
        console.log(`   Pattern test: ${rule.pattern.test(workingText)}`);
        console.log(`   Context test: ${rule.context.test(workingText)}`);
        
        if (rule.pattern.test(workingText) && rule.context.test(workingText)) {
            console.log('   ✅ Pattern + context matched!');
            
            // Vérifier negativeContext si présent
            if (rule.negativeContext && rule.negativeContext.test(workingText)) {
                console.log('   ⛔ Negative context detected - skipping rule');
                continue;
            }
            
            // 🎯 CAS SPÉCIAL: Consolidation SANS séquelle = 0% IPP
            if (rule.searchTerms.includes("__SANS_SEQUELLE__")) {
                console.log('   🎯 MARQUEUR SANS SÉQUELLE DÉTECTÉ!');
                return {
                    type: 'no_result',
                    text: `✅ <strong>CONSOLIDATION SANS SÉQUELLE DÉTECTÉE</strong><br><br>` +
                          `La fracture est consolidée <strong>sans séquelle résiduelle</strong>.<br><br>` +
                          `📊 <strong>Taux IPP = 0%</strong> (guérison ad integrum)<br><br>` +
                          `Aucune incapacité permanente partielle n'est à retenir.`
                };
            }
            
            // Recherche directe dans les données
            const directMatch = allInjuriesWithPaths.find(item => 
                rule.searchTerms.some(term => 
                    normalize(item.name) === normalize(term)
                )
            );
            
            if (directMatch) {
                console.log(`   ✅ Direct match found: ${directMatch.name}`);
                const severityData = determineSeverity(normalizedInputText);
                let chosenRate: number;
                if (Array.isArray(directMatch.rate)) {
                    const [minRate, maxRate] = directMatch.rate;
                    chosenRate = severityData.level === 'élevé' ? maxRate : 
                                 severityData.level === 'faible' ? minRate : 
                                 Math.round((minRate + maxRate) / 2);
                } else {
                    chosenRate = directMatch.rate;
                }
                
                return {
                    type: 'proposal',
                    name: directMatch.name,
                    rate: chosenRate
                };
            } else {
                console.log('   ❌ No direct match found in barème');
            }
        }
    }
    
    console.log('\n❌ No expert rule matched');
    return {
        type: 'no_result',
        text: 'No expert rule matched'
    };
}

// === TESTS V3.2.3: SANS SÉQUELLE ===

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST 1: FRACTURE DE P1 DU D2 SANS SEQUELLES (CRITICAL BUG)');
console.log('═══════════════════════════════════════════════════════════════');
const result1 = comprehensiveSingleLesionAnalysis('FRACTURE DE P1 DU D2 SANS SEQUELLES');
console.log('\n📊 RESULT:');
console.log('   Type:', result1.type);
if (result1.type === 'proposal') {
    console.log('   Name:', result1.name);
    console.log('   Rate:', result1.rate);
} else {
    console.log('   Text:', result1.text);
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('TEST 2: fracture P1 de D2 consolidée sans séquelle (lowercase)');
console.log('═══════════════════════════════════════════════════════════════');
const result2 = comprehensiveSingleLesionAnalysis('fracture P1 de D2 consolidée sans séquelle');
console.log('\n📊 RESULT:');
console.log('   Type:', result2.type);
if (result2.type === 'proposal') {
    console.log('   Name:', result2.name);
    console.log('   Rate:', result2.rate);
} else {
    console.log('   Text:', result2.text);
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('TEST 3: fracture P1 de D2 consolidée (pas de mention séquelle)');
console.log('═══════════════════════════════════════════════════════════════');
const result3 = comprehensiveSingleLesionAnalysis('fracture P1 de D2 consolidée');
console.log('\n📊 RESULT:');
console.log('   Type:', result3.type);
if (result3.type === 'proposal') {
    console.log('   Name:', result3.name);
    console.log('   Rate:', result3.rate);
} else {
    console.log('   Text:', result3.text);
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('TEST 4: fracture P1 de D2 consolidée avec raideur (control)');
console.log('═══════════════════════════════════════════════════════════════');
const result4 = comprehensiveSingleLesionAnalysis('fracture P1 de D2 consolidée avec raideur');
console.log('\n📊 RESULT:');
console.log('   Type:', result4.type);
if (result4.type === 'proposal') {
    console.log('   Name:', result4.name);
    console.log('   Rate:', result4.rate);
    console.log('   ✅ Expected: Raideur d\'une articulation de l\'index (Main Dominante) - 4% IPP');
} else {
    console.log('   Text:', result4.text);
}

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('TEST 5: fracture P1 de D2 avec ankylose (control)');
console.log('═══════════════════════════════════════════════════════════════');
const result5 = comprehensiveSingleLesionAnalysis('fracture P1 de D2 avec ankylose');
console.log('\n📊 RESULT:');
console.log('   Type:', result5.type);
if (result5.type === 'proposal') {
    console.log('   Name:', result5.name);
    console.log('   Rate:', result5.rate);
    console.log('   ✅ Expected: Ankylose de l\'index (totalité) (Main Dominante) - 15% IPP');
} else {
    console.log('   Text:', result5.text);
}
