/**
 * TEST 10 CAS CLINIQUES DIVERSIFIÉS - V3.3.226
 * Trace chaque cas à travers la logique IA pour identifier les bugs
 */

// Simuler l'environnement
const normalize = (str) => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() || '';

// ======== 10 CAS CLINIQUES DIVERSIFIÉS ========
const testCases = [
  {
    id: 1,
    titre: "Fracture rotule avec raideur du genou",
    texte: "Homme 45 ans, chute au travail. Fracture de la rotule opérée par cerclage. Séquelles : raideur du genou en flexion limitée à 90°, douleurs à la montée des escaliers, amyotrophie du quadriceps.",
    attendu: { pathologie: "Fracture de la rotule", taux_min: 10, taux_max: 25, notes: "Raideur genou + amyotrophie → fourchette moyenne-haute" }
  },
  {
    id: 2,
    titre: "Surdité bilatérale post-traumatique",
    texte: "Ouvrier 55 ans, explosion sur chantier. Surdité bilatérale de perception. Audiométrie : perte moyenne OD 45 dB, OG 50 dB. Acouphènes permanents invalidants.",
    attendu: { pathologie: "Surdité bilatérale", taux_min: 15, taux_max: 35, notes: "Surdité moyenne + acouphènes invalidants" }
  },
  {
    id: 3,
    titre: "Hernie discale L4-L5 opérée",
    texte: "Manutentionnaire 40 ans. Hernie discale L4-L5 opérée par discectomie. Séquelles : lombalgies résiduelles, raideur rachidienne, DMS 15cm. Pas de déficit neurologique.",
    attendu: { pathologie: "Hernie discale opérée", taux_min: 10, taux_max: 20, notes: "Lombalgie résiduelle sans déficit neuro" }
  },
  {
    id: 4,
    titre: "Entorse grave du genou LCA + ménisque",
    texte: "Footballeur 28 ans, accident de sport. Entorse grave du genou droit avec rupture du LCA et lésion méniscale interne. Opéré : ligamentoplastie + méniscectomie partielle. Séquelles : laxité résiduelle, douleurs à l'effort, gêne à la course.",
    attendu: { pathologie: "Entorse grave genou", taux_min: 8, taux_max: 20, notes: "LCA reconstruit + méniscectomie" }
  },
  {
    id: 5,
    titre: "Fracture calcanéum bilatérale",
    texte: "Couvreur 35 ans, chute de 4 mètres. Fracture bilatérale du calcanéum. Traitement orthopédique. Séquelles : douleurs à la marche prolongée, pieds plats post-traumatiques, impossibilité station debout prolongée.",
    attendu: { pathologie: "Fracture calcanéum", taux_min: 10, taux_max: 30, notes: "Bilatéral = majoration" }
  },
  {
    id: 6,
    titre: "Syndrome du canal carpien bilatéral opéré",
    texte: "Secrétaire 48 ans. Syndrome du canal carpien bilatéral opéré. Résultat : paresthésies résiduelles nocturnes des 2 mains. Diminution force de préhension. EMG : neuropathie séquellaire modérée.",
    attendu: { pathologie: "Canal carpien", taux_min: 5, taux_max: 15, notes: "Bilatéral opéré avec séquelles modérées" }
  },
  {
    id: 7,
    titre: "Fracture du fémur avec raccourcissement",
    texte: "Motard 30 ans, accident de la route. Fracture diaphysaire du fémur droit traitée par clou centromédullaire. Consolidation avec raccourcissement de 2 cm. Raideur du genou : flexion 110°.",
    attendu: { pathologie: "Fracture fémur + raccourcissement", taux_min: 10, taux_max: 20, notes: "Raccourcissement 2cm + raideur" }
  },
  {
    id: 8,
    titre: "Rupture tendon d'Achille",
    texte: "Sportif 42 ans. Rupture du tendon d'Achille gauche lors d'un match de tennis. Suture chirurgicale. Séquelles : diminution force flexion plantaire, douleur à l'effort, impossibilité de courir.",
    attendu: { pathologie: "Rupture tendon d'Achille", taux_min: 5, taux_max: 15, notes: "Suturé avec séquelles fonctionnelles" }
  },
  {
    id: 9,
    titre: "Luxation récidivante épaule",
    texte: "Électricien 38 ans. Luxation récidivante de l'épaule droite (dominante). 3 épisodes en 2 ans. Opéré Bankart arthroscopique. Limitation résiduelle : abduction 150°, rotation externe limitée. Douleurs à l'effort en hauteur.",
    attendu: { pathologie: "Luxation récidivante épaule", taux_min: 10, taux_max: 20, notes: "Épaule dominante après chirurgie" }
  },
  {
    id: 10,
    titre: "Traumatisme thoracique - fractures de côtes multiples",
    texte: "Chauffeur routier 50 ans, accident de la voie publique. Fractures de 4 côtes (5e, 6e, 7e, 8e) gauches. Hémothorax drainé. Séquelles : douleurs thoraciques persistantes à l'effort et à la toux, dyspnée d'effort stade 2.",
    attendu: { pathologie: "Fractures côtes multiples", taux_min: 5, taux_max: 15, notes: "4 côtes + hémothorax + douleurs + dyspnée" }
  }
];

// ======== SIMULATION LOGIQUE IA ========
console.log('=' .repeat(100));
console.log('🧪 TEST 10 CAS CLINIQUES DIVERSIFIÉS - Analyse logique IA V3.3.226');
console.log('=' .repeat(100));

// Charger données barème
const fs = require('fs');
const path = require('path');
const dataFile = fs.readFileSync(path.join(__dirname, 'data', 'disabilityRates.new.ts'), 'utf-8');

// Parser les entrées du barème (extraction simplifiée)
function extractBaremeEntries(data) {
    const entries = [];
    const nameRegex = /name:\s*["'`]([^"'`]+)["'`]/g;
    const rateRegex = /rate:\s*(\[?\d+(?:\s*,\s*\d+)?\]?)/g;
    const searchTermsRegex = /searchTerms:\s*\[([^\]]*)\]/g;
    
    let nameMatch;
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const nm = /name:\s*["'`]([^"'`]+)["'`]/.exec(line);
        if (nm) {
            // Look for rate in next few lines
            let rate = null;
            for (let j = i; j < Math.min(i + 5, lines.length); j++) {
                const rm = /rate:\s*(\[?\s*\d+(?:\s*,\s*\d+)?\s*\]?)/.exec(lines[j]);
                if (rm) {
                    const rateStr = rm[1].trim();
                    if (rateStr.startsWith('[')) {
                        const nums = rateStr.match(/\d+/g);
                        rate = nums ? [parseInt(nums[0]), parseInt(nums[1])] : null;
                    } else {
                        rate = parseInt(rateStr);
                    }
                    break;
                }
            }
            // Look for searchTerms
            let searchTerms = [];
            for (let j = i; j < Math.min(i + 5, lines.length); j++) {
                const stm = /searchTerms:\s*\[([^\]]*)\]/.exec(lines[j]);
                if (stm) {
                    searchTerms = stm[1].match(/["'`]([^"'`]+)["'`]/g)?.map(s => s.replace(/["'`]/g, '')) || [];
                    break;
                }
            }
            entries.push({ name: nm[1], rate, searchTerms, line: i });
        }
    }
    return entries;
}

const allEntries = extractBaremeEntries(dataFile);
console.log(`📚 ${allEntries.length} entrées barème chargées\n`);

// ======== LOGIQUE DES EXPERT RULES (reproduite du code) ========
const expertRules = [
    // Rotule
    { pattern: /fracture.*rotule|rotule.*fracture/i, context: /genou|raideur|flexion|cerclage|op[eé]r/i, searchTerms: ['Fracture de la rotule'], priority: 100 },
    // Surdité  
    { pattern: /surdit[eé]|perte.*audition|hypoacousie/i, context: /audition|audio|perception|db|d[eé]cibel|oreille|bilat[eé]ral/i, searchTerms: ['Surdité'], priority: 100 },
    // Hernie discale
    { pattern: /hernie.*discale|discectomie|disque.*herni[eé]/i, context: /lombaire|l4|l5|s1|rachid|lomb/i, searchTerms: ['Hernie discale'], priority: 100 },
    // Entorse genou LCA
    { pattern: /entorse.*grave.*genou|rupture.*lca|ligament.*crois[eé].*ant[eé]rieur/i, context: /genou|laxit[eé]|ligament|m[eé]nisque/i, searchTerms: ['Entorse grave du genou'], priority: 100 },
    // Calcanéum
    { pattern: /fracture.*calcan[eé]um|calcan[eé]um.*fracture/i, context: /pied|marche|chute|talon/i, searchTerms: ['Fracture du calcanéum'], priority: 100 },
    // Canal carpien
    { pattern: /canal\s*carpien|syndrome.*carpien/i, context: /main|poignet|par[eé]sth[eé]sie|emg|nerf.*m[eé]dian/i, searchTerms: ['Canal carpien', 'Syndrome du canal carpien'], priority: 100 },
    // Fémur
    { pattern: /fracture.*f[eé]mur|f[eé]mur.*fracture/i, context: /clou|consolidation|raccourcissement|cuisse/i, searchTerms: ['Fracture du fémur'], priority: 100 },
    // Tendon Achille
    { pattern: /rupture.*tendon.*achille|tendon.*achille.*rupture/i, context: /cheville|suture|flexion.*plantaire/i, searchTerms: ['Rupture du tendon d\'Achille'], priority: 100 },
    // Luxation épaule
    { pattern: /luxation.*[eé]paule|[eé]paule.*luxation/i, context: /r[eé]cidivante|bankart|abduction|rotation/i, searchTerms: ['Luxation récidivante'], priority: 100 },
    // Côtes
    { pattern: /fracture.*c[oô]te|c[oô]te.*fracture/i, context: /thorax|thoracique|h[eé]mothorax|douleur/i, searchTerms: ['Fracture de côtes'], priority: 100 },
];

// ======== TESTS ========
const bugs = [];

for (const cas of testCases) {
    console.log('\n' + '─'.repeat(100));
    console.log(`\n🔬 CAS ${cas.id}: ${cas.titre}`);
    console.log(`📝 "${cas.texte.substring(0, 120)}..."`);
    console.log(`🎯 Attendu: ${cas.attendu.pathologie} → ${cas.attendu.taux_min}-${cas.attendu.taux_max}%`);
    
    const normalizedText = normalize(cas.texte);
    
    // TEST 1: Détection via scoring keywords
    console.log('\n  📊 TEST SCORING KEYWORDS:');
    const scoringKeywords = {
        'fracture rotule': 70, 'rotule': 60, 'raideur genou': 65,
        'surdite': 70, 'hypoacousie': 65, 'acouphenes': 60, 'perte audition': 70,
        'hernie discale': 75, 'discectomie': 70, 'lombalgie': 60,
        'entorse grave': 70, 'lca': 65, 'menisque': 60, 'ligamentoplastie': 70,
        'calcaneum': 70, 'fracture calcaneum': 75,
        'canal carpien': 75, 'syndrome canal carpien': 80,
        'fracture femur': 75, 'raccourcissement': 60,
        'tendon achille': 75, 'rupture tendon': 70,
        'luxation epaule': 70, 'luxation recidivante': 75, 'bankart': 70,
        'fracture cote': 65, 'hemothorax': 60, 'dyspnee': 55,
    };
    
    let bestKeyword = null;
    let bestScore = 0;
    for (const [kw, score] of Object.entries(scoringKeywords)) {
        if (normalizedText.includes(kw)) {
            if (score > bestScore) { bestScore = score; bestKeyword = kw; }
        }
    }
    console.log(`    Meilleur mot-clé: "${bestKeyword}" (score: ${bestScore})`);
    
    // TEST 2: Expert rules match
    console.log('  🔍 TEST EXPERT RULES:');
    let matchedRule = null;
    for (const rule of expertRules) {
        if (rule.pattern.test(normalizedText) && rule.context.test(normalizedText)) {
            if (rule.negativeContext && rule.negativeContext.test(normalizedText)) continue;
            matchedRule = rule;
            break;
        }
    }
    if (matchedRule) {
        console.log(`    ✅ Règle matchée: ${matchedRule.searchTerms[0]}`);
    } else {
        console.log(`    ❌ AUCUNE RÈGLE EXPERTE NE MATCH`);
    }
    
    // TEST 3: Recherche dans barème
    console.log('  📖 TEST BARÈME:');
    const relevantEntries = allEntries.filter(e => {
        const eName = normalize(e.name);
        // Test si le nom de l'entrée correspond au cas
        const textWords = normalizedText.split(/\s+/).filter(w => w.length > 3);
        const nameWords = eName.split(/\s+/).filter(w => w.length > 3);
        const commonWords = nameWords.filter(w => textWords.includes(w));
        return commonWords.length >= 2;
    }).slice(0, 5);
    
    if (relevantEntries.length === 0) {
        // Essayer avec searchTerms
        const stEntries = allEntries.filter(e => {
            return e.searchTerms.some(st => {
                const nst = normalize(st);
                return normalizedText.includes(nst) || nst.split(' ').filter(w => w.length > 3).every(w => normalizedText.includes(w));
            });
        }).slice(0, 5);
        
        if (stEntries.length > 0) {
            console.log(`    Trouvé via searchTerms: ${stEntries.map(e => `"${e.name}" [${Array.isArray(e.rate) ? e.rate.join('-') : e.rate}%]`).join(', ')}`);
        } else {
            console.log(`    ❌ AUCUNE ENTRÉE BARÈME TROUVÉE`);
            bugs.push({ cas: cas.id, titre: cas.titre, bug: 'Aucune entrée barème trouvée', severity: 'HIGH' });
        }
    } else {
        console.log(`    Entrées trouvées: ${relevantEntries.map(e => `"${e.name}" [${Array.isArray(e.rate) ? e.rate.join('-') : e.rate}%]`).join(', ')}`);
    }
    
    // TEST 4: Vérifier detectedSequelae (multi-lésions faux positif)
    console.log('  🔄 TEST MULTI-LÉSIONS (faux positif):');
    const detectedParts = [];
    if (/raideur/i.test(cas.texte)) detectedParts.push('raideur');
    if (/douleur/i.test(cas.texte)) detectedParts.push('douleur');
    if (/limitation/i.test(cas.texte)) detectedParts.push('limitation');
    if (/amyotrophie/i.test(cas.texte)) detectedParts.push('amyotrophie');
    if (/acouph[eè]ne/i.test(cas.texte)) detectedParts.push('acouphènes');
    if (/laxit[eé]/i.test(cas.texte)) detectedParts.push('laxité');
    if (/raccourcissement/i.test(cas.texte)) detectedParts.push('raccourcissement');
    if (/par[eé]sth[eé]sie/i.test(cas.texte)) detectedParts.push('paresthésie');
    if (/dyspn[eé]e/i.test(cas.texte)) detectedParts.push('dyspnée');
    
    if (detectedParts.length >= 2) {
        console.log(`    ⚠️ ${detectedParts.length} sous-séquelles détectées: ${detectedParts.join(', ')}`);
        console.log(`    → Risque de faux cumul si système les traite comme lésions séparées`);
    } else {
        console.log(`    ✅ Pas de risque de faux cumul`);
    }
    
    // TEST 5: Vérification du taux
    console.log('  💰 TEST TAUX:');
    if (relevantEntries.length > 0) {
        const bestEntry = relevantEntries[0];
        if (Array.isArray(bestEntry.rate)) {
            const [min, max] = bestEntry.rate;
            const mid = Math.round((min + max) / 2);
            console.log(`    Entrée "${bestEntry.name}": [${min}-${max}%], milieu=${mid}%`);
            if (mid < cas.attendu.taux_min || mid > cas.attendu.taux_max) {
                console.log(`    ⚠️ Taux milieu ${mid}% hors attendu [${cas.attendu.taux_min}-${cas.attendu.taux_max}%]`);
            }
        } else if (bestEntry.rate !== null) {
            console.log(`    Entrée "${bestEntry.name}": ${bestEntry.rate}%`);
            if (bestEntry.rate < cas.attendu.taux_min || bestEntry.rate > cas.attendu.taux_max) {
                console.log(`    ⚠️ Taux ${bestEntry.rate}% hors attendu [${cas.attendu.taux_min}-${cas.attendu.taux_max}%]`);
            }
        }
    }
}

// ======== TESTS SPÉCIFIQUES LOGIQUE CODE ========
console.log('\n\n' + '='.repeat(100));
console.log('🔬 TESTS SPÉCIFIQUES SUR LA LOGIQUE DU CODE');
console.log('='.repeat(100));

// Lire le fichier AiAnalyzer.tsx
const aiCode = fs.readFileSync(path.join(__dirname, 'components', 'AiAnalyzer.tsx'), 'utf-8');

// TEST A: Vérifier que les entrées barème existent pour nos 10 cas
console.log('\n📋 TEST A: Existence des entrées barème pour les pathologies testées');
const pathologiesToCheck = [
    { search: 'rotule', desc: 'Fracture de la rotule' },
    { search: 'surdite', desc: 'Surdité' },
    { search: 'hernie discale', desc: 'Hernie discale' },
    { search: 'entorse.*genou|lca|ligament croise', desc: 'Entorse grave genou/LCA' },
    { search: 'calcaneum', desc: 'Fracture calcanéum' },
    { search: 'canal carpien', desc: 'Syndrome canal carpien' },
    { search: 'femur.*diaphys|diaphys.*femur', desc: 'Fracture diaphysaire fémur' },
    { search: 'tendon.*achille|achille', desc: 'Tendon Achille' },
    { search: 'luxation.*epaule|luxation.*recidivante', desc: 'Luxation épaule' },
    { search: 'fracture.*cote|cotes.*fracture', desc: 'Fracture côtes' },
];

for (const p of pathologiesToCheck) {
    const re = new RegExp(p.search, 'i');
    const found = allEntries.filter(e => re.test(normalize(e.name)));
    if (found.length > 0) {
        console.log(`  ✅ ${p.desc}: ${found.length} entrées → "${found[0].name}" [${Array.isArray(found[0].rate) ? found[0].rate.join('-') : found[0].rate}%]`);
    } else {
        // Try searchTerms
        const foundST = allEntries.filter(e => e.searchTerms.some(st => re.test(normalize(st))));
        if (foundST.length > 0) {
            console.log(`  ✅ ${p.desc} (via searchTerms): ${foundST.length} entrées → "${foundST[0].name}" [${Array.isArray(foundST[0].rate) ? foundST[0].rate.join('-') : foundST[0].rate}%]`);
        } else {
            console.log(`  ❌ ${p.desc}: AUCUNE ENTRÉE TROUVÉE`);
            bugs.push({ cas: 'barème', titre: p.desc, bug: `Entrée barème manquante pour "${p.search}"`, severity: 'CRITICAL' });
        }
    }
}

// TEST B: Vérifier les expert rules dans le code
console.log('\n📋 TEST B: Expert rules dans AiAnalyzer.tsx');
const expertPatterns = [
    { search: 'rotule', desc: 'Fracture rotule' },
    { search: 'surdit|surdité|hypoacousie', desc: 'Surdité' },
    { search: 'hernie.discale', desc: 'Hernie discale' },
    { search: 'entorse.grave|rupture.lca|ligament.croise', desc: 'Entorse grave genou' },
    { search: 'calcan', desc: 'Fracture calcanéum' },
    { search: 'canal.carpien|carpien', desc: 'Canal carpien' },
    { search: 'femur', desc: 'Fracture fémur' },
    { search: 'tendon.achille|achille', desc: 'Tendon Achille' },
    { search: 'luxation.*epaule|luxation.recidivante', desc: 'Luxation épaule' },
    { search: 'cote.*fracture|fracture.*cote|hemothorax', desc: 'Fracture côtes' },
];

for (const p of expertPatterns) {
    const re = new RegExp(`pattern:.*${p.search}`, 'i');
    const match = re.test(aiCode);
    if (match) {
        console.log(`  ✅ ${p.desc}: Expert rule trouvée`);
    } else {
        console.log(`  ❌ ${p.desc}: PAS d'expert rule → risque de mauvais matching`);
        bugs.push({ cas: 'expert', titre: p.desc, bug: `Pas d'expert rule spécifique`, severity: 'MEDIUM' });
    }
}

// TEST C: Vérifier scoring keywords dans le code
console.log('\n📋 TEST C: Scoring keywords / synonymes dans AiAnalyzer.tsx');
const synonymChecks = [
    { search: "'rotule'", desc: 'rotule' },
    { search: "'surdite'|'surdité'", desc: 'surdité' },
    { search: "'hernie discale'|'hernie'", desc: 'hernie discale' },
    { search: "'calcaneum'|'calcanéum'", desc: 'calcanéum' },
    { search: "'canal carpien'", desc: 'canal carpien' },
    { search: "'tendon achille'|'tendon d.achille'", desc: 'tendon achille' },
    { search: "'luxation recidivante'|'luxation epaule'", desc: 'luxation épaule' },
    { search: "'fracture cote'|'fractures cotes'", desc: 'fractures côtes' },
    { search: "'dyspnee'|'dyspnée'", desc: 'dyspnée' },
    { search: "'raccourcissement'", desc: 'raccourcissement' },
];

for (const s of synonymChecks) {
    const re = new RegExp(s.search, 'i');
    const match = re.test(aiCode);
    console.log(`  ${match ? '✅' : '⚠️'} ${s.desc}: ${match ? 'trouvé' : 'NON trouvé dans scoring/synonymes'}`);
}

// TEST D: Vérifier les negativeContext dangereux
console.log('\n📋 TEST D: Risques de negativeContext bloquant');
const negContextIssues = [
    { pattern: 'rotule', negRisks: ['genou', 'raideur'] },
    { pattern: 'surdité', negRisks: ['oreille'] },
    { pattern: 'calcanéum', negRisks: ['pied', 'marche'] },
    { pattern: 'canal carpien', negRisks: ['main', 'poignet'] },
    { pattern: 'luxation épaule', negRisks: ['épaule'] },
];

// Check negativeContext in expert rules around these patterns
const negContextRe = /negativeContext:\s*\/([^/]+)\//g;
let negMatch;
const allNegContexts = [];
while ((negMatch = negContextRe.exec(aiCode)) !== null) {
    allNegContexts.push(negMatch[1]);
}
console.log(`  Total negativeContext trouvés: ${allNegContexts.length}`);

for (const nc of negContextIssues) {
    const risks = nc.negRisks.filter(r => allNegContexts.some(ctx => ctx.includes(r)));
    if (risks.length > 0) {
        console.log(`  ⚠️ ${nc.pattern}: mots "${risks.join(', ')}" dans des negativeContext → risque de blocage`);
    } else {
        console.log(`  ✅ ${nc.pattern}: pas de risque negativeContext`);
    }
}

// TEST E: Vérifier le DMS hardcoded (bug fixé en V3.3.225 mais vérifions les cas)
console.log('\n📋 TEST E: DMS non-standard (ex: DMS 15cm)');
const dmsMatch = /dms\s*(?:=|:)?\s*(\d+)\s*cm/i.exec('DMS 15cm');
if (dmsMatch) {
    const dmsValue = parseInt(dmsMatch[1]);
    // Vérifier si le code ne supporte que 10|15|20
    const dmsHardcoded = /10\|15\|20|dms.*(?:10|15|20)/i.test(aiCode);
    console.log(`  DMS ${dmsValue}cm détectable: ${dmsMatch ? 'OUI' : 'NON'}`);
    if (dmsHardcoded) {
        console.log(`  ⚠️ DMS pourrait être limité aux valeurs 10/15/20 (vérifier V3.3.225 fix)`);
    }
}

// ======== RÉSUMÉ DES BUGS ========
console.log('\n\n' + '='.repeat(100));
console.log(`🐛 RÉSUMÉ: ${bugs.length} BUGS/PROBLÈMES IDENTIFIÉS`);
console.log('='.repeat(100));

for (const bug of bugs) {
    console.log(`  [${bug.severity}] CAS ${bug.cas} (${bug.titre}): ${bug.bug}`);
}

if (bugs.length === 0) {
    console.log('  ✅ Aucun bug critique détecté dans les tests statiques');
    console.log('  → Tests dynamiques nécessaires pour vérifier le comportement réel');
}

console.log('\n📌 NOTE: Ce test est STATIQUE. Les vrais bugs se trouvent dans le flux dynamique.');
console.log('→ Prochaine étape: tester chaque cas dans la vraie fonction comprehensiveSingleLesionAnalysis');
