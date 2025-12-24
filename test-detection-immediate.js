// Test rapide de détection des lésions
const casInput = "traumatisme de la main droite : amputation P3 D5 avec une repture du flechiseur du P2 D4";

console.log('═══════════════════════════════════════════════════════════════');
console.log('TEST DÉTECTION LÉSIONS - CAS COMPLEXE');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📝 INPUT:', casInput);
console.log('\n');

// Étape 1: Corrections orthographiques
let processed = casInput.toLowerCase();
processed = processed.replace(/\brepture\b/gi, 'rupture');
processed = processed.replace(/\bfl[eéè]chiss?eur/gi, 'fléchisseur');

console.log('✅ Après corrections orthographiques:');
console.log(processed);
console.log('\n');

// Étape 2: Détecter amputation P3 D5
const amputationPattern = /(?:ablation|amputation).*(?:phalange\s+)?(?:ungu[eé]ale|distale|terminale|P3).*(?:enti[eè]re|compl[eè]te)?.*(?:auriculaire|d5)(?!.*(?:interm[eé]diaire|P2|2\s*phalanges|deux\s*phalanges|3\s*phalanges|trois\s*phalanges))/i;
const amputationMatch = casInput.match(amputationPattern);

console.log('🔍 TEST PATTERN AMPUTATION P3 D5:');
console.log('Pattern:', amputationPattern.toString());
console.log('Match:', amputationMatch ? '✅ DÉTECTÉ' : '❌ NON DÉTECTÉ');
if (amputationMatch) {
    console.log('Texte matché:', amputationMatch[0]);
}
console.log('\n');

// Étape 3: Détecter rupture fléchisseur
const rupturePattern1 = /(?:rupture|repture|section|l[eé]sion).*(?:du|des)?.*(?:tendon|tendons)?.*fl[eéè]chiss?eur.*(?:du|de\s+la|du\s+p[1-3]|de\s+p[1-3]).*(?:d[2-5]|index|m[eé]dius|annulaire|auriculaire)/i;
const rupturePattern2 = /(?:rupture|repture|section|l[eé]sion).*(?:du|des)?.*fl[eéè]chiss?eur.*(?:d[2-5]|index|m[eé]dius|annulaire|auriculaire)/i;

const ruptureMatch1 = casInput.match(rupturePattern1);
const ruptureMatch2 = casInput.match(rupturePattern2);

console.log('🔍 TEST PATTERN RUPTURE FLÉCHISSEUR P2 D4:');
console.log('Pattern 1 (avec phalange):', ruptureMatch1 ? '✅ DÉTECTÉ' : '❌ NON DÉTECTÉ');
if (ruptureMatch1) {
    console.log('  Texte matché:', ruptureMatch1[0]);
}
console.log('Pattern 2 (simple):', ruptureMatch2 ? '✅ DÉTECTÉ' : '❌ NON DÉTECTÉ');
if (ruptureMatch2) {
    console.log('  Texte matché:', ruptureMatch2[0]);
}
console.log('\n');

// Résumé
console.log('═══════════════════════════════════════════════════════════════');
console.log('📊 RÉSUMÉ DÉTECTION');
console.log('═══════════════════════════════════════════════════════════════');
console.log('Lésion 1 (Amputation P3 D5):', amputationMatch ? '✅' : '❌');
console.log('Lésion 2 (Rupture fléchisseur P2 D4):', (ruptureMatch1 || ruptureMatch2) ? '✅' : '❌');
console.log('\n');

if (amputationMatch && (ruptureMatch1 || ruptureMatch2)) {
    console.log('✅ SUCCÈS: Les 2 lésions sont détectées !');
    console.log('IPP attendu: 11-15% (cumul)');
} else {
    console.log('❌ ÉCHEC: Toutes les lésions ne sont pas détectées');
    console.log('Corrections nécessaires dans les patterns');
}
console.log('\n');
