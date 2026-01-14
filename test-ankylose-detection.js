// Test détection ankylose V3.3.162

const text = `âgé de 90 ans.​Victime d'un AT survenu le 11/01/87.​À l'origine d'un Traumatisme du membre inférieur gauche, ayant occasionné une fracture de la diaphyse fémorale gauche traitée chirurgicalement à 02 reprises.​Doléances :​Douleurs en période froide.​Impotence fonctionnelle.​Examen Clinique :​Marche difficile à l'aide d'1 canne avec boiterie.​Raccourcissement du Membre Inf Ghe de 03 cm.​Présence de 02 cicatrices d'intervention] sur la face latérale de la cuisse Ghe de bonne qualité.​Amyotrophie des muscles de la cuisse et de la jambe Ghe.​Genou Ghe Ankylosé en extension.​Matériel d'ostéosynthèse en place.​Décision :​Conseil Médical du 04/02/2021.​IPP = 55 % (Cinquante cinq)​DR = 05 ans.`;

console.log('=== TEST PATTERNS V3.3.162 ===\n');

// Test 1: Ankylose
const ankylosePattern = /ankylos[ée].*(?:genou|cheville|hanche)|(?:genou|cheville|hanche).*ankylos[ée]/i;
const ankyloseMatch = text.match(ankylosePattern);
console.log('1. Ankylose articulaire:');
console.log('   Pattern:', ankylosePattern);
console.log('   Match:', ankyloseMatch);
console.log('   ✅ Détecté:', ankyloseMatch ? 'OUI' : 'NON');
console.log('');

// Test 2: Amyotrophie globale
const amyotrophiePattern = /amyotrophie.*(?:cuisse.*jambe|membre.*inf[ée]rieur)/i;
const amyotrophieMatch = text.match(amyotrophiePattern);
console.log('2. Amyotrophie globale:');
console.log('   Pattern:', amyotrophiePattern);
console.log('   Match:', amyotrophieMatch);
console.log('   ✅ Détecté:', amyotrophieMatch ? 'OUI' : 'NON');
console.log('');

// Test 3: Raccourcissement
const raccPattern = /raccourcissement.*membre|in[ée]galit[ée].*membre/i;
const raccMatch = text.match(raccPattern);
console.log('3. Raccourcissement membre:');
console.log('   Pattern:', raccPattern);
console.log('   Match:', raccMatch);
console.log('   ✅ Détecté:', raccMatch ? 'OUI' : 'NON');
console.log('');

// Test 4: Matériel ostéosynthèse
const materielPattern = /mat[ée]riel.*ost[ée]osynth[èe]se.*en.*place/i;
const materielMatch = text.match(materielPattern);
console.log('4. Matériel ostéosynthèse:');
console.log('   Pattern:', materielPattern);
console.log('   Match:', materielMatch);
console.log('   ✅ Détecté:', materielMatch ? 'OUI' : 'NON');
console.log('');

// Test 5: Canne
const cannePattern = /canne|béquille|tuteur|marche.*difficile|aide.*marche/i;
const canneMatch = text.match(cannePattern);
console.log('5. Marche avec canne:');
console.log('   Pattern:', cannePattern);
console.log('   Match:', canneMatch);
console.log('   ✅ Détecté:', canneMatch ? 'OUI' : 'NON');
console.log('');

// Test 6: Chirurgies
const chirurgiesPattern = /(\d+)\s*(?:intervention|chirurgie|opération|reprise)/i;
const chirurgiesMatch = text.match(chirurgiesPattern);
console.log('6. Nombre chirurgies:');
console.log('   Pattern:', chirurgiesPattern);
console.log('   Match:', chirurgiesMatch);
console.log('   Nombre:', chirurgiesMatch ? chirurgiesMatch[1] : 'N/A');
console.log('   ✅ Détecté ≥2:', chirurgiesMatch && parseInt(chirurgiesMatch[1]) >= 2 ? 'OUI' : 'NON');
console.log('');

// Test 7: Position ankylose
const positionPattern = /(?:en\s+)?(extension|flexion|position.*interm[ée]diaire)/i;
const positionMatch = text.match(positionPattern);
console.log('7. Position ankylose:');
console.log('   Pattern:', positionPattern);
console.log('   Match:', positionMatch);
console.log('   Position:', positionMatch ? positionMatch[1] : 'N/A');
console.log('');

// Test 8: Extraction cm raccourcissement
const raccCmPattern = /raccourcissement.*?(\d+)\s*cm/i;
const raccCmMatch = text.match(raccCmPattern);
console.log('8. Extraction cm raccourcissement:');
console.log('   Pattern:', raccCmPattern);
console.log('   Match:', raccCmMatch);
console.log('   Cm:', raccCmMatch ? raccCmMatch[1] : 'N/A');
console.log('');

console.log('=== CALCUL IPP ATTENDU ===\n');
let rate = 35;
let details = ['ankylose genou (perte totale mobilité)'];

if (amyotrophieMatch) {
    rate += 5;
    details.push('amyotrophie globale membre inférieur');
}
if (raccCmMatch && parseInt(raccCmMatch[1]) >= 3) {
    rate += 5;
    details.push(`raccourcissement ${raccCmMatch[1]}cm (significatif)`);
}
if (materielMatch) {
    rate += 3;
    details.push('matériel ostéosynthèse en place');
}
if (canneMatch) {
    rate += 4;
    details.push('marche avec canne obligatoire');
}
if (chirurgiesMatch && parseInt(chirurgiesMatch[1]) >= 2) {
    rate += 3;
    details.push(`${chirurgiesMatch[1]} interventions chirurgicales`);
}

rate = Math.min(rate, 55);

console.log('Base: 35%');
console.log('Majorations:', details.slice(1).join(', '));
console.log('IPP FINAL:', rate + '%');
console.log('');
console.log('✅ CONFORME CONSEIL MÉDICAL (55%):', rate === 55 ? 'OUI' : 'NON');
