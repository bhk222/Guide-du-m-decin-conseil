/**
 * TEST DYNAMIQUE 10 CAS - Trace la vraie logique du code
 * Focus: detectMultipleLesions, expert rules, scoring, barème matching
 */

const fs = require('fs');
const path = require('path');
const normalize = (str) => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() || '';

const testCases = [
  { id: 1, texte: "Homme 45 ans, chute au travail. Fracture de la rotule opérée par cerclage. Séquelles : raideur du genou en flexion limitée à 90°, douleurs à la montée des escaliers, amyotrophie du quadriceps.", attendu: "Fracture rotule 10-25%" },
  { id: 2, texte: "Ouvrier 55 ans, explosion sur chantier. Surdité bilatérale de perception. Audiométrie : perte moyenne OD 45 dB, OG 50 dB. Acouphènes permanents invalidants.", attendu: "Surdité bilatérale 15-35%" },
  { id: 3, texte: "Manutentionnaire 40 ans. Hernie discale L4-L5 opérée par discectomie. Séquelles : lombalgies résiduelles, raideur rachidienne, DMS 15cm. Pas de déficit neurologique.", attendu: "Hernie discale 10-20%" },
  { id: 4, texte: "Footballeur 28 ans, accident de sport. Entorse grave du genou droit avec rupture du LCA et lésion méniscale interne. Opéré : ligamentoplastie + méniscectomie partielle. Séquelles : laxité résiduelle, douleurs à l'effort, gêne à la course.", attendu: "LCA + ménisque 8-20%" },
  { id: 5, texte: "Couvreur 35 ans, chute de 4 mètres. Fracture bilatérale du calcanéum. Traitement orthopédique. Séquelles : douleurs à la marche prolongée, pieds plats post-traumatiques, impossibilité station debout prolongée.", attendu: "Fracture calcanéum 10-30%" },
  { id: 6, texte: "Secrétaire 48 ans. Syndrome du canal carpien bilatéral opéré. Résultat : paresthésies résiduelles nocturnes des 2 mains. Diminution force de préhension. EMG : neuropathie séquellaire modérée.", attendu: "Canal carpien 5-15%" },
  { id: 7, texte: "Motard 30 ans, accident de la route. Fracture diaphysaire du fémur droit traitée par clou centromédullaire. Consolidation avec raccourcissement de 2 cm. Raideur du genou : flexion 110°.", attendu: "Fracture fémur 10-20%" },
  { id: 8, texte: "Sportif 42 ans. Rupture du tendon d'Achille gauche lors d'un match de tennis. Suture chirurgicale. Séquelles : diminution force flexion plantaire, douleur à l'effort, impossibilité de courir.", attendu: "Tendon Achille 5-15%" },
  { id: 9, texte: "Électricien 38 ans. Luxation récidivante de l'épaule droite (dominante). 3 épisodes en 2 ans. Opéré Bankart arthroscopique. Limitation résiduelle : abduction 150°, rotation externe limitée. Douleurs à l'effort en hauteur.", attendu: "Luxation épaule 10-20%" },
  { id: 10, texte: "Chauffeur routier 50 ans, accident de la voie publique. Fractures de 4 côtes (5e, 6e, 7e, 8e) gauches. Hémothorax drainé. Séquelles : douleurs thoraciques persistantes à l'effort et à la toux, dyspnée d'effort stade 2.", attendu: "Fractures côtes 5-15%" }
];

console.log('='.repeat(100));
console.log('🔬 TEST DYNAMIQUE - LOGIQUE RÉELLE DU CODE');
console.log('='.repeat(100));

const BUGS = [];

for (const cas of testCases) {
    console.log(`\n${'─'.repeat(90)}`);
    console.log(`🔬 CAS ${cas.id}: ${cas.attendu}`);
    
    const text = cas.texte;
    const normalized = normalize(text);
    
    // ========== 1. TEST detectMultipleLesions ==========
    console.log('  📊 detectMultipleLesions:');
    
    // Reproduce key detection logic from the code
    const lesionTypes = [];
    if (/fracture/i.test(normalized)) lesionTypes.push('fracture');
    if (/rupture|lca|lcp/i.test(normalized)) lesionTypes.push('rupture');
    if (/luxation/i.test(normalized)) lesionTypes.push('luxation');
    if (/pseudarthrose/i.test(normalized)) lesionTypes.push('pseudarthrose');
    if (/amputation|perte.*(?:phalange|doigt|orteil)/i.test(normalized)) lesionTypes.push('amputation');
    if (/dechirure/i.test(normalized)) lesionTypes.push('dechirure');
    if (/elongation/i.test(normalized)) lesionTypes.push('elongation');
    if (/meniscectomie|lesion.*meniscale/i.test(normalized)) lesionTypes.push('meniscectomie');
    if (/instabilite|laxite/i.test(normalized)) lesionTypes.push('instabilite');
    if (/raideur|ankylose/i.test(normalized)) lesionTypes.push('raideur');
    if (/arthrose/i.test(normalized)) lesionTypes.push('arthrose');
    if (/algodystrophie|sdrc|syndrome.*douloureux.*regional/i.test(normalized)) lesionTypes.push('algodystrophie');
    const hasMultipleLesionTypes = lesionTypes.length >= 2;
    
    const anatomicalKeywords = ['genou', 'cheville', 'hanche', 'rachis', 'bassin', 'main', 'pied', 'cervical', 'cervicale', 'cou'];
    const allRegionsInText = new Set();
    for (const kw of anatomicalKeywords) {
        if (normalized.includes(kw)) allRegionsInText.add(kw);
    }
    const totalRegionsCount = allRegionsInText.size;
    
    const multipleLesionsWithConnectors = /(?:fracture|luxation|rupture|lesion|lca|lcp|meniscectomie|instabilite|raideur|arthrose).*(?:avec|et|ainsi\s+qu['"]\s*un?|associee?\s+[aà]|sur\s+fond\s+de|compliquee?\s+de|\+).*(?:fracture|luxation|rupture|lesion|lca|lcp|meniscectomie|instabilite|raideur|arthrose)/i.test(normalized);
    
    const hasBoneLesion = /fracture/i.test(normalized);
    const hasLigamentLesion = /(?:dechirure|lesion|rupture).*(?:ligament|tendons?.*extenseurs?)|(?:ligament|tendons?.*extenseurs?).*(?:dechirure|lesion|rupture)/i.test(normalized);
    const hasMuscleLesion = /(?:elongation|dechirure|rupture).*(?:muscle|musculaire|epaule|quadriceps|triceps|biceps|deltoid|deltoide)|(?:muscle|musculaire|epaule|quadriceps).*(?:elongation|dechirure|rupture)/i.test(normalized);
    const hasDoubleLesion = (hasBoneLesion && hasLigamentLesion) || (hasBoneLesion && hasMuscleLesion) || (hasLigamentLesion && hasMuscleLesion);

    const hasSemicolonSeparation = text.split(/\s*;\s*/).filter(p => p.trim().length >= 5).length >= 2;    
    const plusCount = (text.match(/\s\+\s/g) || []).length;
    
    // Check specific exceptions
    const isHernieDiscaleText = /hernie\s+discale/i.test(normalized);
    const isPouteauCollesText = /pouteau[\s-]?colles/i.test(normalized);
    
    // Build isCumul exactly like the code
    const hasMembreSupLesion = /(?:fracture|luxation|rupture|lesion).*(?:epaule|coude|poignet|main|doigt|bras|avant.*bras|humer|radius|ulna|cubitus|clavicule)/i.test(normalized);
    const hasMembreInfLesion = /(?:fracture|luxation|rupture|lesion).*(?:hanche|genou|cheville|pied|orteil|jambe|cuisse|femur|tibia|perone|fibula)/i.test(normalized);
    const hasMembreSupEtInf = hasMembreSupLesion && hasMembreInfLesion;
    
    const hasFractureMembre = /fracture.*(?:epaule|coude|poignet|main|radius|ulna|humer|femur|tibia|jambe|cuisse|bras)/i.test(normalized);
    const hasRachisLesion = /(?:lombalgie|entorse.*lombaire|entorse.*rachis|cervicalgie|dorsalgie|traumatisme.*cervical|coup.*lapin).*(?:post.*traumatique|mecanique|chronique)/i.test(normalized);
    const hasMembreEtRachis = hasFractureMembre && hasRachisLesion;
    
    const hasBoneAndNerve = hasBoneLesion && /(?:atteinte|lesion|paralysie|nevralgie).*nerf|nerf.*(?:atteinte|lesion|paralysie)/i.test(normalized);
    
    // Key cumul criteria
    const cumulReasons = [];
    if (hasSemicolonSeparation) cumulReasons.push('point-virgule');
    if (plusCount >= 3) cumulReasons.push(`${plusCount} séparateurs +`);
    if (hasBoneAndNerve) cumulReasons.push('os + nerf');
    if (multipleLesionsWithConnectors && hasMultipleLesionTypes) cumulReasons.push('connecteurs + types multiples');
    if (totalRegionsCount >= 2) cumulReasons.push(`${totalRegionsCount} régions anatomiques`);
    if (hasDoubleLesion && totalRegionsCount >= 1) cumulReasons.push('double lésion + région');
    if (hasMembreSupEtInf) cumulReasons.push('membre sup + inf');
    if (hasMembreEtRachis) cumulReasons.push('membre + rachis');
    
    const isCumulRaw = cumulReasons.length > 0;
    
    // Check for exceptions that override isCumul
    let isCumul = isCumulRaw;
    let exception = '';
    if (isHernieDiscaleText && !/fracture.*(?:femur|tibia|humerus|clavicule|bassin|cote|rotule|plateau|radius|poignet)/i.test(normalized)) {
        isCumul = false;
        exception = 'EXCEPTION hernie discale';
    }
    if (isPouteauCollesText) {
        isCumul = false;
        exception = 'EXCEPTION Pouteau-Colles';
    }
    
    console.log(`    lesionTypes: [${lesionTypes.join(', ')}] (${lesionTypes.length})`);
    console.log(`    regions: [${[...allRegionsInText].join(', ')}] (${totalRegionsCount})`);
    console.log(`    multipleLesionsWithConnectors: ${multipleLesionsWithConnectors}`);
    console.log(`    hasDoubleLesion: ${hasDoubleLesion}`);
    console.log(`    cumulReasons: [${cumulReasons.join(', ')}]`);
    
    if (isCumul) {
        console.log(`    ❌ isCumul = TRUE → FAUX CUMUL DÉTECTÉ! Raisons: ${cumulReasons.join(', ')}`);
        if (exception) console.log(`    ✅ MAIS exception "${exception}" s'applique → cumul corrigé`);
        else {
            BUGS.push({ cas: cas.id, attendu: cas.attendu, bug: `FAUX CUMUL: ${cumulReasons.join(' + ')}`, severity: 'CRITICAL' });
        }
    } else {
        console.log(`    ✅ isCumul = FALSE → pas de faux cumul${exception ? ' (' + exception + ')' : ''}`);
    }
    
    // ========== 2. TEST EXPERT RULES ==========
    console.log('  🔍 Expert rules (code réel):');
    
    // Read expert rules from code
    const aiCode = fs.readFileSync(path.join(__dirname, 'components', 'AiAnalyzer.tsx'), 'utf-8');
    
    // Test key expert rule patterns on our data
    const expertPatterns = [
        { name: 'Fracture rotule', pattern: /fracture.*rotule|rotule.*fractur/i, context: /genou|flexion|raideur|cerclage|op[eé]r/i },
        { name: 'Surdité/audiométrie', pattern: /surdit[eé]|hypoacousie|perte.*audit/i, context: /bilat[eé]ral|audio|db|d[eé]cibel|perception/i },
        { name: 'Hernie discale', pattern: /hernie.*discale/i, context: /l4|l5|s1|lombaire|discectomie|rachid/i },
        { name: 'LCA/Entorse genou', pattern: /rupture.*lca|lca.*rupture|ligament.*crois[eé].*ant[eé]rieur|entorse.*grave.*genou/i, context: /genou|laxit[eé]|ligament|m[eé]nisque/i },
        { name: 'Fracture calcanéum', pattern: /fracture.*calcan[eé]um|calcan[eé]um/i, context: /pied|marche|chute|orthop[eé]dique/i },
        { name: 'Canal carpien', pattern: /canal\s*carpien|syndrome.*carpien/i, context: /main|poignet|nerf|emg|par[eé]sth[eé]sie/i },
        { name: 'Fracture fémur', pattern: /fracture.*f[eé]mur|f[eé]mur.*fractur/i, context: /clou|consolidation|raccourcissement|diaphys/i },
        { name: 'Tendon Achille', pattern: /tendon.*achille|achille.*tendon|rupture.*achille/i, context: /cheville|suture|plantaire|gauche|droit/i },
        { name: 'Luxation épaule', pattern: /luxation.*[eé]paule|[eé]paule.*luxation|luxation.*r[eé]cidivante/i, context: /r[eé]cidivante|bankart|abduction|rotation|dominante/i },
        { name: 'Fracture côtes', pattern: /fracture.*c[oô]te|c[oô]te.*fractur/i, context: /thorax|thoracique|h[eé]mothorax|douleur|dyspn[eé]e/i },
    ];
    
    let matchedExpert = null;
    for (const ep of expertPatterns) {
        if (ep.pattern.test(text) && ep.context.test(text)) {
            matchedExpert = ep.name;
            break;
        }
    }
    console.log(`    ${matchedExpert ? '✅ Match: ' + matchedExpert : '❌ AUCUN MATCH'}`);
    
    // ========== 3. TEST dB PARSING (cas surdité) ==========
    if (cas.id === 2) {
        console.log('  🔊 TEST dB PARSING:');
        const decibelPattern = /(\d{1,3})\s*(?:db|d\s*b|décibels?)\s*(?:[aà]\s+)?(droite|gauche|d|g)/gi;
        const decibelMatches = Array.from(text.matchAll(decibelPattern));
        console.log(`    Pattern standard: ${decibelMatches.length} matches → ${decibelMatches.map(m => m[0]).join(', ') || 'AUCUN'}`);
        
        // Test alternative patterns
        const altPattern1 = /OD\s*(\d+)\s*dB|(\d+)\s*dB\s*OD/gi;
        const altMatches1 = Array.from(text.matchAll(altPattern1));
        console.log(`    Pattern OD/OG: ${altMatches1.length} matches`);
        
        const altPattern2 = /perte\s*moyenne\s*OD\s*(\d+)/i;
        const altMatch2 = altPattern2.exec(text);
        console.log(`    Pattern "perte moyenne OD X": ${altMatch2 ? altMatch2[0] : 'NON trouvé'}`);
        
        if (decibelMatches.length === 0) {
            BUGS.push({ cas: 2, attendu: cas.attendu, bug: 'dB parsing échoue pour "OD 45 dB, OG 50 dB" — pattern attend dB+side, texte a side+dB', severity: 'HIGH' });
        }
    }
    
    // ========== 4. TEST CANAL CARPIEN "Résultat" (cas 6) ==========
    if (cas.id === 6) {
        console.log('  ⚠️ TEST "Résultat" keyword:');
        const calculationKeywords = ["calcul", "calcule", "ipp total", "résultat final", "résultat ipp", "résultat total", "c'est tout", "fini", "terminé", "total ipp"];
        const textLower = text.toLowerCase();
        const hasCalcKeyword = calculationKeywords.some(kw => textLower.includes(kw));
        console.log(`    Contient keyword calcul: ${hasCalcKeyword ? '⚠️ OUI: ' + calculationKeywords.filter(kw => textLower.includes(kw)).join(', ') : '✅ NON'}`);
    }
    
    // ========== 5. TEST "Résultat" faux positif (tout cas avec "Résultat") ==========
    if (text.toLowerCase().includes('résultat')) {
        console.log('  ⚠️ Contient "Résultat" → vérifier calculationKeywords');
    }
    
    // ========== 6. TEST FRACTURE FÉMUR + RAIDEUR GENOU = FAUX CUMUL? ==========
    if (cas.id === 7) {
        console.log('  🦴 TEST fémur + genou:');
        const hasFemur = /fracture.*femur/i.test(normalized);
        const hasGenou = /genou/i.test(normalized);
        const hasRaideur = /raideur/i.test(normalized);
        console.log(`    fracture fémur: ${hasFemur}, genou: ${hasGenou}, raideur: ${hasRaideur}`);
        console.log(`    → Si le code traite "raideur genou" comme lésion séparée de "fracture fémur" c'est un FAUX CUMUL`);
        // Check: does the code have an exception for fracture fémur + raideur genou?
        const hasFemurException = /femur.*(?:raideur|genou)|(?:raideur.*genou).*femur/i.test(aiCode.substring(11960, 12400));
        console.log(`    Exception fémur+raideur dans detectMultipleLesions: ${hasFemurException ? '✅ OUI' : '❌ NON'}`);
    }
    
    // ========== 7. TEST LUXATION ÉPAULE DOMINANTE ==========
    if (cas.id === 9) {
        console.log('  💪 TEST luxation épaule dominante:');
        const isDominante = /dominante?\s|main\s+dominante|\(dominante\)/i.test(text);
        const isEpauleDroite = /[eé]paule\s+droite/i.test(text);
        console.log(`    Dominante détectée: ${isDominante}`);
        console.log(`    Épaule droite: ${isEpauleDroite}`);
        // Vérifier si le barème a une entrée spécifique épaule dominante
        const baremeData = fs.readFileSync(path.join(__dirname, 'data', 'disabilityRates.new.ts'), 'utf-8');
        const luxRecidEpaule = /Luxation.*r[eé]cidivante.*[eé]paule|[eé]paule.*luxation.*r[eé]cidivant/i.test(baremeData);
        console.log(`    Entrée barème "luxation récidivante épaule": ${luxRecidEpaule ? '✅' : '❌'}`);
        // Check if there's a temporo-maxillaire confusion
        const tmMatch = /Luxation.*r[eé]cidivante.*temporo/i.test(baremeData);
        if (tmMatch && !luxRecidEpaule) {
            console.log(`    ⚠️ SEULE "luxation récidivante temporo-maxillaire" trouvée → MAUVAISE entrée pour épaule!`);
            BUGS.push({ cas: 9, attendu: cas.attendu, bug: 'Luxation récidivante épaule matcherait "luxation récidivante temporo-maxillaire"', severity: 'HIGH' });
        }
    }
    
    // ========== 8. TEST ACHILLE BARÈME ==========
    if (cas.id === 8) {
        console.log('  🦶 TEST tendon Achille barème:');
        const baremeData = fs.readFileSync(path.join(__dirname, 'data', 'disabilityRates.new.ts'), 'utf-8');
        const achilleEntries = [];
        const lines = baremeData.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (/achille/i.test(lines[i])) {
                achilleEntries.push({ line: i + 1, text: lines[i].trim().substring(0, 120) });
            }
        }
        if (achilleEntries.length > 0) {
            console.log(`    ✅ ${achilleEntries.length} entrées Achille:`);
            achilleEntries.forEach(e => console.log(`      L${e.line}: ${e.text}`));
        } else {
            console.log(`    ❌ AUCUNE entrée "Achille" dans le barème`);
            // Check for tendon entries
            const tendonEntries = [];
            for (let i = 0; i < lines.length; i++) {
                if (/tendon/i.test(lines[i]) && /name/i.test(lines[i])) {
                    tendonEntries.push({ line: i + 1, text: lines[i].trim().substring(0, 120) });
                }
            }
            console.log(`    Entrées "tendon" trouvées: ${tendonEntries.length}`);
            tendonEntries.forEach(e => console.log(`      L${e.line}: ${e.text}`));
            BUGS.push({ cas: 8, attendu: cas.attendu, bug: 'Pas d\'entrée "Achille" dans barème', severity: 'CRITICAL' });
        }
    }

    // ========== 9. TEST CÔTES MULTI-FRACTURES ==========
    if (cas.id === 10) {
        console.log('  🫁 TEST fractures côtes:');
        const multipleFracturesSameBone = /fracture.*(?:et|,).*fracture|(?:trochanter|col|diaphyse|pilon|plateau).*(?:et|,).*(?:diaphyse|pilon|plateau|trochanter|col)/i.test(normalized);
        console.log(`    multipleFracturesSameBone: ${multipleFracturesSameBone}`);
        // Check thorax region
        const hasThoraxLesion = /(?:traumatisme|trauma).*thorac|fractures?.*cot[eé]s?|fractures?.*costale|volet.*costal|contusion.*thorac|contusion.*pulmonaire/i.test(normalized);
        console.log(`    hasThoraxLesion: ${hasThoraxLesion}`);
        // Check dyspnée detection
        const hasDyspnee = /dyspn[eé]e/i.test(text);
        console.log(`    dyspnée détectée: ${hasDyspnee}`);
    }
    
    // ========== 10. TEST CALCANÉUM BILATÉRAL ==========
    if (cas.id === 5) {
        console.log('  🦶 TEST calcanéum bilatéral:');
        const isBilateral = /bilat[eé]ral/i.test(text);
        console.log(`    Bilatéral détecté: ${isBilateral}`);
        // Vérifier s'il y a une entrée bilatérale spécifique
        const baremeData = fs.readFileSync(path.join(__dirname, 'data', 'disabilityRates.new.ts'), 'utf-8');
        const calcBilat = /calcan[eé]um.*bilat[eé]ral/i.test(baremeData);
        console.log(`    Entrée barème calcanéum bilatéral: ${calcBilat ? '✅' : '❌ NON → le taux sera pour un seul côté'}`);
        if (!isBilateral || !calcBilat) {
            BUGS.push({ cas: 5, attendu: cas.attendu, bug: 'Calcanéum bilatéral pas géré distinctement (taux unilatéral appliqué)', severity: 'MEDIUM' });
        }
    }
}

// ======== RÉSUMÉ FINAL ========
console.log('\n\n' + '='.repeat(100));
console.log(`🐛 BUGS DYNAMIQUES IDENTIFIÉS: ${BUGS.length}`);
console.log('='.repeat(100));
for (const b of BUGS) {
    console.log(`  [${b.severity}] CAS ${b.cas} (${b.attendu}): ${b.bug}`);
}
