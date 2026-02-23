// Test 4 cas cliniques différents - Traçage logique de l'IA exclusive
function normalize(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-']/g, ' ');
}

// =============================================================
// CAS 1: Fracture épaule + rupture coiffe + raideur
// =============================================================
console.log('========================================');
console.log('CAS 1: FRACTURE EPAULE + RUPTURE COIFFE');
console.log('========================================');

const cas1 = `Patient de 52 ans, accident de travail. Chute de 3 mètres sur l'épaule droite (main dominante). 
Fracture de la tête humérale droite avec rupture transfixiante du sus-épineux. 
Intervention chirurgicale avec ostéosynthèse et réparation de la coiffe des rotateurs.
A la consolidation: raideur de l'épaule droite avec abduction limitée à 70°, rotation externe limitée à 20°, 
douleurs persistantes à l'effort. Amyotrophie deltoïdienne modérée. Force musculaire diminuée (testing 3/5).`;

const norm1 = normalize(cas1);

// Priority handlers check (localExpertAnalysis)
const isPouteauColles1 = /pouteau[\s-]?colles/i.test(cas1); // false
const isHernieDiscale1 = /hernie.*discale/i.test(cas1); // false
const isBrulure1 = /br[uû]lure/i.test(cas1); // false
const isAmputationDoigt1 = /amputation.*doigt/i.test(cas1); // false
const isPlexus1 = /plexus.*brachial/i.test(cas1); // false
const isClavicule1 = /fracture.*clavicule/i.test(cas1); // false
const isTC1 = /traumatisme.*cr[aâ]n/i.test(cas1); // false

console.log('Priority handlers bypass:', !isPouteauColles1 && !isHernieDiscale1 && !isBrulure1 && !isAmputationDoigt1 && !isPlexus1 && !isClavicule1 && !isTC1 ? 'YES (goes to detectedSequelae)' : 'NO');

// detectedSequelae check
console.log('\n--- detectedSequelae detection ---');
// Will it detect multiple sequelae?
// Member sup detection
const hasRupCoiffe = /rupture.*coiffe|coiffe.*rupture|rupture.*(?:sus|supra|sous|infra)[\s-]?[eéè]pineux/i.test(cas1);
const hasFractureHumerale = /fracture.*(?:t[eê]te|col|tubérosit).*hum[eé]r/i.test(cas1);
const hasRaideurEpaule = /raideur.*[eé]paule|[eé]paule.*raideur/i.test(cas1);
const hasAbduction = /abduction.*(?:limit[eé]e|r[eé]duite).*(?:\d+)/i.test(cas1);

console.log('Rupture coiffe:', hasRupCoiffe);
console.log('Fracture humérale:', hasFractureHumerale);
console.log('Raideur épaule:', hasRaideurEpaule);
console.log('Abduction limitée:', hasAbduction);

// Expert rules matching in comprehensiveSingleLesionAnalysis
console.log('\n--- Expert rules matching ---');
// 1. Rupture coiffe p999 (the key rule)
const rupCoiffeP999 = /rupture\s+(?:de\s+la\s+)?coiffe\s+(?:des\s+)?rotateurs|rupture.*(?:sus|supra|sous|infra)[- ]?[eéè]pineux|(?:sus|supra|sous|infra)[- ]?[eéè]pineux.*rupture|transfixiante.*(?:sus|supra|sous|infra)[- ]?[eéè]pineux/i;
console.log('P999 Rupture coiffe:', rupCoiffeP999.test(cas1));

const rupCoiffeCtx = /[eé]paule|abduction|rotateurs|supra|sus.*[eé]pineux|sous.*[eé]pineux/i;
console.log('P999 Context:', rupCoiffeCtx.test(cas1));

const rupCoiffeNeg = /complète/i;
console.log('P999 NegContext (should NOT match):', rupCoiffeNeg.test(cas1));

// 2. Raideur épaule + abduction 60-90° p98
const raideurAbdP98 = /raideur.*épaule|épaule.*raideur|limitation.*épaule/i;
const abdCtx = /abduction.*(?:60|65|70|75|80|85|90)°|abduction.*(?:60|65|70|75|80|85|90)\s*degr/i;
console.log('P98 Raideur+abd:', raideurAbdP98.test(cas1), abdCtx.test(cas1));

// 3. Fracture humérus p93
const fractHumerP93 = /fracture.*h[uû]m[eé]r|h[uû]m[eé]r.*fracture/i;
const fractHCtx = /[eé]paule|bras|diaphyse|col\s+chirurgical|consolid[eé]/i;
console.log('P93 Fracture humér:', fractHumerP93.test(cas1), fractHCtx.test(cas1));

// Severity for rupture coiffe
console.log('\n--- Severity for P999 rupture coiffe ---');
const hasTransfixing = /transfixiante?|transfixe/i.test(cas1);
const hasMassive = /massive|irr[eé]parable|pseudo.*paralytique/i.test(cas1);
const hasSevereLimit = /(?:impossibilit[eé]|impossibles?)\s+(?:de\s+)?(?:[eé]l[eé]vation|abduction|rotation)|(?:[eé]l[eé]vation|abduction|rotation)\s+(?:impossibles?|abolie)/i.test(cas1);
const hasSignificantLoss = /perte.*force.*importante|amyotrophie.*marqu[eé]e|testing.*[0-2]|force.*diminu[eé]e/i.test(cas1);

console.log('Transfixiante:', hasTransfixing, '→ affects severity');
console.log('Massive:', hasMassive);
console.log('SevereLimit:', hasSevereLimit);
console.log('SignificantLoss:', hasSignificantLoss);
console.log('Force diminuée match:', /force.*diminu[eé]e/i.test(cas1));

// BUG CHECK: "testing 3/5" - does it match testing.*[0-2]?
console.log('\nBUG CHECK: testing 3/5 matches testing.*[0-2]?', /testing.*[0-2]/i.test(cas1));
// Answer: NO because 3 is not [0-2]. But "force diminuée" matches.

console.log('\nVERDICT CAS 1:');
console.log('- P999 rupture coiffe fires → Barème: "Rupture de la coiffe des rotateurs post-traumatique (MD)" [10-30%]');
console.log('- Severity: MOYEN (transfixiante + force diminuée) → mid-range ~20%');
console.log('- PROBLEME: Fracture tête humérale [20-30%] IGNORÉE');
console.log('- PROBLEME: Raideur épaule avec abduction 70° IGNORÉE (normalement 12-22%)');
console.log('- IPP correct attendu: ~25% (Barème 1967 épaule combinée)');
console.log('- IPP système: ~20% (rupture coiffe seule, trop bas)');

// =============================================================
// CAS 2: Entorse grave genou + laxité résiduelle + ménisque
// =============================================================
console.log('\n\n========================================');
console.log('CAS 2: ENTORSE GRAVE GENOU LCA + MENISQUE');
console.log('========================================');

const cas2 = `Patient de 35 ans, accident de sport (football). Entorse grave du genou droit avec rupture du ligament croisé antérieur (LCA) et lésion du ménisque interne.
Ligamentoplastie du LCA type Kenneth-Jones et méniscectomie partielle interne.
A la consolidation: laxité résiduelle antérieure modérée (tiroir antérieur positif à 5mm), 
genou droit avec flexion à 120° (normal 140°), extension complète.
Amyotrophie quadricipitale de 2 cm. Douleurs à la descente des escaliers.
Chondropathie fémoro-tibiale interne débutante à l'IRM de contrôle.`;

const norm2 = normalize(cas2);

console.log('--- Priority handlers ---');
console.log('All priority handlers bypassed:', !(/pouteau|hernie|brulure|amputation.*doigt|plexus|clavicule|traumatisme.*cran/i.test(cas2)) ? 'YES' : 'NO');

console.log('\n--- Expert rules matching ---');
// LCA + méniscectomie cumul rule (p10500)
const lcaMenisqueP10500a = /(?:lca|ligament.*crois[eé].*ant[eé]rieur).*(?:\+|avec|et|ainsi|associee?).*(?:meniscectomie|menisque|chondropathie|fracture)/i;
console.log('P10500 LCA+ménisque combo A:', lcaMenisqueP10500a.test(norm2));
// The text says "LCA et lésion du ménisque" - but normalize removes accents
const lcaMenisqueB = /(?:meniscectomie|menisque).*(?:\+|avec|et|ainsi|associee?).*(?:lca|ligament.*crois[eé])/i;
console.log('P10500 LCA+ménisque combo B:', lcaMenisqueB.test(norm2));

// Check more carefully
console.log('norm2 has LCA...et...menisque:', /lca.*et.*menisque/i.test(norm2));
console.log('norm2 has ligament.*croise.*anterieur.*et.*menisque:', /ligament.*croise.*anterieur.*et.*menisque/i.test(norm2));

// Instabilité/Laxité genou (p11000)
const laxiteP11000 = /genou.*laxit[eé]|laxit[eé].*genou/i;
console.log('P11000 Laxité genou:', laxiteP11000.test(cas2));
const instabP11000 = /genou.*instabilit[eé]|instabilit[eé].*genou/i;
console.log('P11000 Instabilité genou:', instabP11000.test(cas2));
// NegContext for these is /raideur/i
console.log('NegContext raideur:', /raideur/i.test(cas2));

// Arthrose genou (p11000)
const arthroseP11000 = /arthrose.*genou|genou.*arthrose|gonarthrose|arthrose.*f[eé]moro.*pat|f[eé]moro.*patellaire|arthrose.*patellaire/i;
console.log('P11000 Arthrose genou:', arthroseP11000.test(cas2));
// chondropathie is NOT arthrose!
console.log('Chondropathie ≠ arthrose:', /chondropathie/i.test(cas2), '(not caught by arthrose rule)');

// Raideur genou + instabilité (p10700)
const raidGenou = /raideur.*genou|genou.*raideur/i;
const instCtx = /instabilit[eé]|laxit[eé]|lca|ligament/i;
console.log('P10700 Raideur genou+instab:', raidGenou.test(cas2), instCtx.test(cas2));
// NOTE: cas2 doesn't say "raideur du genou" explicitly, it says "flexion à 120°"

// Check what actually fires - LCA keyword detection
console.log('\n--- Keyword scoring ---');
console.log('genou:', /genou/i.test(cas2));
console.log('lca:', /lca/i.test(cas2));
console.log('menisque:', /m[eé]nisque/i.test(cas2));
console.log('meniscectomie:', /m[eé]niscectomie/i.test(cas2));
console.log('laxite:', /laxit[eé]/i.test(cas2));
console.log('ligament croise:', /ligament.*crois[eé]/i.test(cas2));
console.log('chondropathie:', /chondropathie/i.test(cas2));

// BUG: the P10500 LCA+ménisque rule requires "avec|et|ainsi|associee?" between LCA and ménisque
// But the text says "rupture du ligament croisé antérieur (LCA) et lésion du ménisque"
// With normalize this becomes "rupture du ligament croise anterieur (lca) et lesion du menisque"
// The regex /(?:lca|ligament.*crois[eé].*ant[eé]rieur).*(?:\+|avec|et|ainsi|associee?).*(?:meniscectomie|menisque)/i
// After normalize: /(?:lca|ligament.*croise.*anterieur).*(?:\+|avec|et|ainsi|associee?).*(?:meniscectomie|menisque)/i
// "lca) et lesion du menisque" → should match "lca...et...menisque"

// Wait - the rule tests on cas2 (original text with accents) but expertRules work on... let me check
// Expert rules use pattern.test on... the input text or normalized?
// From code structure: the rules check against the original text, since they have [eé] patterns

console.log('\nDirect regex test on original:');
const regexA = /(?:lca|ligament.*crois[eé].*ant[eé]rieur).*(?:\+|avec|et|ainsi|associee?).*(?:meniscectomie|menisque)/i;
console.log('LCA+menisque on original:', regexA.test(cas2));
console.log('LCA+menisque on norm:', regexA.test(norm2));

console.log('\nVERDICT CAS 2:');
// If no text says "raideur genou", the raideur+instab rule won't fire
// laxité genou (p11000) has negContext /raideur/i → doesn't match in cas2 (no "raideur") → MATCH
// BUT wait - cas2 doesn't say "raideur" literally → negContext doesn't trigger → rule should fire
console.log('- P11000 Laxité genou should fire → Barème: "Laxité chronique du genou" [5-20%]');
console.log('- P10500 LCA+ménisque cumul detected:', regexA.test(cas2));
if (regexA.test(cas2)) {
    console.log('  → Combined barème: LCA [10-25%] + Méniscectomie [5-15%]');
    console.log('  → Bug possible: Balthazard ou simple addition?');
}
console.log('- Chondropathie fémoro-tibiale: NON détectée (pas de règle spécifique)');
console.log('- Amyotrophie quadricipitale: NON détectée comme facteur aggravant');
console.log('- IPP correct attendu: ~15-18% (LCA opéré + méniscectomie + chondropathie + amyotrophie)');

// =============================================================
// CAS 3: Rachis cervical - Whiplash / entorse cervicale
// =============================================================
console.log('\n\n========================================');
console.log('CAS 3: WHIPLASH / ENTORSE CERVICALE');
console.log('========================================');

const cas3 = `Patiente de 40 ans, AVP (accident de la voie publique), collision arrière à basse vitesse.
Coup du lapin cervical. Entorse cervicale bénigne C4-C5.
Scanner cervical normal, pas de fracture ni luxation.
A la consolidation (12 mois): cervicalgies chroniques avec raideur du rachis cervical.
DMS (Distance Menton-Sternum) à 12 cm (normale > 18 cm). 
Rotations cervicales limitées à 50° bilatéralement (normale 80°).
Céphalées postérieures fréquentes, vertiges positionnels intermittents.
Pas de signe neurologique déficitaire. IRM cervicale: protrusion discale C4-C5 sans conflit radiculaire.`;

const norm3 = normalize(cas3);

console.log('--- Priority handlers ---');
const isHernieDiscale3 = /hernie.*discale/i.test(cas3);
console.log('Hernie discale priority handler:', isHernieDiscale3, '→', isHernieDiscale3 ? 'FIRES - but this is NOT herniated disc!' : 'DOES NOT FIRE');
// "protrusion discale" != "hernie discale" - good
console.log('Protrusion discale:', /protrusion.*discale/i.test(cas3));

console.log('\n--- Expert rules matching ---');
// Whiplash/Coup du lapin (p999)
const whiplashP999 = /mal.*cou|cervicalgie|douleur.*cervical/i;
const whiplashCtx = /chute|traumatisme|accident|whiplash|coup.*lapin/i;
console.log('P999 Whiplash pattern:', whiplashP999.test(cas3), 'context:', whiplashCtx.test(cas3));
// → searchTerms: "Syndrome post-traumatique cervical chronique (Whiplash / Coup du lapin)"

// Raideur cervicale + DMS (p10500)  
const raidCervP10500 = /raideur.*rachis.*cervical|rachis.*cervical.*raideur/i;
const dmsCtx = /dms.*(?:10|15|20)|distance.*menton.*sternum/i;
console.log('P10500 Raideur cervicale+DMS:', raidCervP10500.test(cas3), dmsCtx.test(cas3));

// Raideur cervicale DMS p97
const raidCervP97 = /raideur.*(?:rachis.*)?cervical|rachis.*cervical.*raideur/i;
const dmsCtxP97 = /DMS.*(?:\d+)\s*cm|distance.*menton.*sternum.*(?:\d+)|rotation.*limit[eé]/i;
console.log('P97 Raideur cervicale+DMS:', raidCervP97.test(cas3), dmsCtxP97.test(cas3));

// Raideur cervicale + DMS 15-18 + inclinaisons (p94)
const raidCervP94 = /raideur.*cervical|cervical.*raideur/i;
const dmsIncl = /DMS.*(?:15|16|17|18).*cm|inclinaison.*limit[eé]|rotation.*limit[eé]/i;
console.log('P94 Raideur+inclinaisons:', raidCervP94.test(cas3), dmsIncl.test(cas3));

// Hernie cervicale (p94)
const hernieCervP94 = /hernie.*discale.*(?:cervical|C\d)|cervical.*hernie.*discale/i;
console.log('P94 Hernie cervicale:', hernieCervP94.test(cas3));

// Céphalées (p999)
const cephP999 = /mal.*t[eê]te|c[eé]phal[eé]e/i;
const cephCtx = /chute|traumatisme|accident|coup|cr[aâ]ne|persistant|chronique/i;
console.log('P999 Céphalées pattern:', cephP999.test(cas3), cephCtx.test(cas3));

// Vertiges detection
console.log('Vertiges:', /vertige/i.test(cas3));

// NOW - which rule fires FIRST?
console.log('\n--- Priority ordering ---');
console.log('P10500: Raideur cervicale DMS → fires?', raidCervP10500.test(cas3) && dmsCtx.test(cas3));
console.log('P999: Whiplash (mal cou/cervicalgie) → fires?', whiplashP999.test(cas3) && whiplashCtx.test(cas3));
console.log('P999: Céphalées → fires?', cephP999.test(cas3) && cephCtx.test(cas3));
console.log('P97: Raideur cervicale DMS → fires?', raidCervP97.test(cas3) && dmsCtxP97.test(cas3));

// BUG ANALYSIS:
// P10500 > P999 > P97 - so raideur cervicale DMS wins if it matches
// P10500 Context: /dms.*(?:10|15|20)|distance.*menton.*sternum/i
// Text: "DMS (Distance Menton-Sternum) à 12 cm" → matches /dms.*1/ ? NO, DMS...12 matches /dms.*1/ NO
// Let me check: "DMS (Distance Menton-Sternum) à 12 cm" - regex /dms.*(?:10|15|20)/
// This needs DMS followed by 10, 15, or 20 - BUT value is 12, which is NOT 10, 15, or 20!
console.log('\nBUG: DMS 12cm matches DMS.*(?:10|15|20)?', /dms.*(?:10|15|20)/i.test('DMS (Distance Menton-Sternum) à 12 cm'));
// Hmm actually... "DMS (Distance Menton-Sternum) à 12" contains "12" which contains "1" followed later by "2"
// But regex (?:10|15|20) matches "10" or "15" or "20" as literal sequences, NOT "12"
// Wait: "DMS (Distance Menton-Sternum) à 12" → DMS matches, then .* matches anything, then (?:10|15|20)
// The word "Menton" contains no 10, "Sternum" no 15/20, but "12" contains "1" then "2" 
// (?:10|15|20) matches "12"? NO! "12" is not "10" or "15" or "20"
// HOWEVER: "à 12" → "12" doesn't match. BUT wait, the .* is greedy, and after DMS, the text has "Distance"
// which contains "10" NO... Let me test properly:
console.log('Does "DMS à 12 cm" match /dms.*(?:10|15|20)/i?', /dms.*(?:10|15|20)/i.test('DMS à 12 cm'));
console.log('Does "DMS à 15 cm" match /dms.*(?:10|15|20)/i?', /dms.*(?:10|15|20)/i.test('DMS à 15 cm'));

// DMS P97 context check: /DMS.*(?:\d+)\s*cm/
console.log('DMS P97 context /DMS.*(\\d+)\\s*cm/:', /DMS.*(?:\d+)\s*cm/i.test(cas3));

// PROBLEM: P10500 won't match DMS 12cm (only 10, 15, 20 are listed)
// P97 WILL match because it uses \d+ generically
// P97 searchTerms: "Raideur rachis cervical"

console.log('\nVERDICT CAS 3:');
console.log('- P10500 Raideur cervicale DMS: FAILS (DMS 12cm not in 10|15|20)');
console.log('- P999 Whiplash: cervicalgies + accident → MATCHES');
console.log('- P999 Céphalées: céphalées + chronique → MATCHES');  
console.log('- P97 Raideur cervicale DMS generic: MATCHES');
console.log('- HIGHEST PRIORITY: P10500 fails → P999 fires (Whiplash)');
console.log('  → Barème: "Syndrome post-traumatique cervical" [5-15%]');
console.log('- BUG 1: DMS rule uses hardcoded 10|15|20 - misses DMS 12cm');
console.log('- BUG 2: Raideur cervicale + DMS mesurée = signe objectif → devrait orienter');
console.log('         vers raideur cervicale [8-18%] plutôt que whiplash subjectif [5-15%]');
console.log('- BUG 3: Si whiplash fire, les vertiges + céphalées aggravent mais la raideur OBJECTIVE est perdue');
console.log('- IPP correct attendu: ~10-12% (raideur objectivée DMS 12cm + céphalées + vertiges)');

// =============================================================
// CAS 4: Fracture du scaphoïde avec pseudarthrose
// =============================================================
console.log('\n\n========================================');
console.log('CAS 4: FRACTURE SCAPHOIDE + PSEUDARTHROSE');
console.log('========================================');

const cas4 = `Patient de 28 ans, chute sur la main gauche (main non dominante) en rollerblading.
Fracture du scaphoïde carpien gauche, traitée initialement par immobilisation plâtrée 3 mois.
Évolution vers une pseudarthrose du scaphoïde diagnostiquée à 6 mois.
Intervention chirurgicale: greffe osseuse + vis de Herbert.
A la consolidation (18 mois): douleurs résiduelles du poignet gauche à la prise de force et en déviation radiale.
Raideur du poignet avec flexion à 50° (normale 80°), extension à 40° (normale 70°).
Force de préhension diminuée (30 kg vs 45 kg côté droit).
Radiographie: consolidation obtenue mais arthrose radio-scaphoïdienne débutante.`;

const norm4 = normalize(cas4);

console.log('--- Priority handlers ---');
console.log('All bypassed:', !(/pouteau|hernie|brulure|amputation.*doigt|plexus|clavicule|traumatisme.*cran/i.test(cas4)) ? 'YES' : 'NO');

// Pouteau-Colles check - is this a Pouteau-Colles?
const isPouteau4 = /pouteau[\s-]?colles/i.test(cas4);
const isRadiusInf4 = /fracture.*(?:extr[eé]mit[eé]|distale?).*(?:inf[eé]rieure?|inf).*radius/i.test(cas4);
console.log('Pouteau-Colles:', isPouteau4, '| Radius inférieur:', isRadiusInf4);
// scaphoïde ≠ radius → correctly bypassed

console.log('\n--- Expert rules matching ---');
// Pseudarthrose scaphoïde (p999)
const pseudScapP999 = /scapho[ïi]de.*pseudarthrose|pseudarthrose.*scapho[ïi]de/i;
const pseudScapCtx = /poignet|carpien|carpe|instabilit[eé]|douleurs/i;
const pseudScapNeg = /dominante|gauche|droite|côt[eé]/i;
console.log('P999 Pseudarthrose scaphoïde:', pseudScapP999.test(cas4), 'ctx:', pseudScapCtx.test(cas4));
console.log('P999 NegContext (dominante|gauche|droite):', pseudScapNeg.test(cas4));
// BUG: negativeContext matches "gauche" → this rule WON'T fire!
// The negativeContext says "skip if dominant/gauche/droite/côté mentioned"  
// But cas4 says "main gauche (main non dominante)" → "gauche" is in text → RULE SKIPPED

// Fracture scaphoïde grave (p999)
const fractScapGrave = /fracture.*scapho[ïi]de/i;
const graveCtx = /(?:raideur.*douleur|douleur.*raideur|douleurs.*accentu[eé]es|g[eê]ne.*fonctionnelle.*pouce|pouce.*g[eê]ne)/i;
console.log('P999 Fracture scaphoïde grave:', fractScapGrave.test(cas4), 'graveCtx:', graveCtx.test(cas4));
// "douleurs résiduelles...Raideur du poignet" → douleurs...raideur matches? Let me check
console.log('  douleur.*raideur test:', /douleur.*raideur/i.test(cas4));

// Fracture scaphoïde moyenne (p998)
const moyenneCtx = /douleurs.*mod[eé]r[eé]es|faible.*limitation|limitation.*faible/i;
console.log('P998 Fracture scaphoïde moyenne ctx:', moyenneCtx.test(cas4));

// Fracture scaphoïde consolidée sans séquelle (p9900)
const sansSqCtx = /sans.*s[eé]quelle|examen.*normal|r[eé]cup[eé]ration.*compl[eè]te|mobilit[eé].*normale/i;
const sansSqNeg = /raideur|douleur|limitation|pseudarthrose/i;
console.log('P9900 Sans séquelle ctx:', sansSqCtx.test(cas4), 'neg:', sansSqNeg.test(cas4));

// Fracture scaphoïde légère (p92, fallback)
const legereCtx = /poignet|carpien|carpe|l[eé]g[eè]re|insignifiant/i;
console.log('P92 Fracture scaphoïde légère:', fractScapGrave.test(cas4), 'ctx:', legereCtx.test(cas4));

console.log('\nBUG ANALYSIS:');
console.log('1. P999 pseudarthrose scaphoïde has negContext matching "gauche" → RULE SKIPPED');
console.log('   This is wrong - the intent was to avoid generic entries when laterality is specified,');
console.log('   but we actually WANT laterality to route to MD/MND barème entries');
console.log('2. P999 fracture grave: "douleur.*raideur" check:');
// Let's trace: "douleurs résiduelles du poignet gauche à la prise de force et en déviation radiale.\nRaideur du poignet"
// "douleurs...Raideur" → /douleur.*raideur/i → YES because .* spans newlines? NO! . doesn't match \n by default
// But test() with /i flag... let me check
const textBlock4 = 'douleurs résiduelles du poignet gauche.\nRaideur du poignet';
console.log('   douleur.*raideur across newline:', /douleur.*raideur/i.test(textBlock4));
console.log('   douleur.*raideur same line:', /douleur.*raideur/i.test('douleurs et raideur'));
// . doesn't match \n → FALSE across lines

// But in cas4 the whole text is multiline - is the text joined before testing?
// Looking at the preprocessed text (with enrichments) it likely joins or the text is on different lines
console.log('   In full cas4 text, douleur before raideur on same line?');
console.log('   cas4 line check:', /douleurs.*raideur/i.test(cas4));
// This depends on whether the text has literal newlines vs displayed newlines

console.log('\n3. What will ACTUALLY match?');
// pseudarthrose P999 → BLOCKED by negContext 
// fracture grave P999 → context check questionable (across lines)
// fracture moyenne P998 → NO (no "douleurs modérées")
// fracture sans séquelle P9900 → NO (negContext "raideur" blocks)
// fracture légère P92 → YES (fallback, matches /poignet/)

console.log('VERDICT CAS 4:');
console.log('- Pseudarthrose scaphoïde (P999): BLOCKED par negContext "gauche"');
console.log('- Fracture grave (P999): dépend de newlines dans le texte');
console.log('- Fracture légère (P92): FALLBACK → "Forme légère avec raideurs insignifiantes" [6% MD]');
console.log('  MAIS ceci est pour Main Dominante! Patient = MND → devrait être 5%');
console.log('- BUG MAJEUR: Pseudarthrose avec greffe osseuse classée "forme légère" = absurde');
console.log('- IPP correct attendu: 10-15% MND (pseudarthrose opérée + raideur + force diminuée)');
console.log('- IPP système: ~6% (forme légère MD alors que MND) → ERREUR CLINIQUE MAJEURE');

console.log('\n\n========================================');
console.log('RESUME DES BUGS IDENTIFIES');
console.log('========================================');
console.log('CAS 1: Fracture épaule + coiffe → rupture coiffe seul (~20%), ignore fracture humérale et raideur');
console.log('       → Besoin handler combiné fracture épaule + coiffe');
console.log('CAS 2: LCA + ménisque + chondropathie → probablement correct (LCA+ménisque cumul détecté)');
console.log('       → Vérifier que chondropathie et amyotrophie aggravent');
console.log('CAS 3: Whiplash + raideur cervicale → whiplash seul, perd la raideur DMS 12cm');
console.log('       → BUG: DMS hardcodé 10|15|20 dans P10500, rate le 12cm');
console.log('       → Besoin regex flexible pour DMS');
console.log('CAS 4: Pseudarthrose scaphoïde → forme légère (BUG MAJEUR)');
console.log('       → BUG 1: negContext "gauche" bloque la règle pseudarthrose');
console.log('       → BUG 2: contexte "douleur.*raideur" ne traverse pas les lignes');
console.log('       → Résultat: ~6% au lieu de 10-15%');
