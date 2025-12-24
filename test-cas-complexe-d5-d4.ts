// Test cas complexe: Amputation P3 D5 + Rupture fléchisseur P2 D4

const casInput = "traumatisme de la main droite : amputation P3 D5 avec une repture du flechiseur du P2 D4";

console.log('════════════════════════════════════════════════════════════');
console.log('🔍 TEST CAS COMPLEXE - 2 LÉSIONS DISTINCTES');
console.log('════════════════════════════════════════════════════════════\n');

console.log('📝 INPUT BRUT:');
console.log(casInput);
console.log('\n');

// ÉTAPE 1: Corrections orthographiques
let step1 = casInput;
step1 = step1.replace(/\brepture\b/gi, 'rupture');
step1 = step1.replace(/\bfl[eéè]chiss?eur/gi, 'fléchisseur');
console.log('✅ ÉTAPE 1 - Corrections orthographiques:');
console.log(step1);
console.log('\n');

// ÉTAPE 2: Transformation abréviations doigts
let step2 = step1;
step2 = step2.replace(/\b([dD])([1-5])\b/gi, (match, d, num) => {
    const doigts = ['', 'pouce', 'index', 'médius', 'annulaire', 'auriculaire'];
    return `doigt ${doigts[parseInt(num)]}`;
});
console.log('✅ ÉTAPE 2 - Transformation D4/D5:');
console.log(step2);
console.log('\n');

// ÉTAPE 3: Transformation phalanges
let step3 = step2;
step3 = step3.replace(/\bP3\b/gi, 'phalange distale P3');
step3 = step3.replace(/\bP2\b/gi, 'phalange moyenne P2');
console.log('✅ ÉTAPE 3 - Transformation P2/P3:');
console.log(step3);
console.log('\n');

console.log('════════════════════════════════════════════════════════════');
console.log('📊 ANALYSE ATTENDUE:');
console.log('════════════════════════════════════════════════════════════');
console.log('');
console.log('🔸 LÉSION 1: Amputation P3 D5');
console.log('  └─ Amputation phalange distale auriculaire (main dominante)');
console.log('  └─ Barème: Ablation phalange unguéale de l\'auriculaire (Main Dominante)');
console.log('  └─ IPP: 3% (taux fixe)');
console.log('');
console.log('🔸 LÉSION 2: Rupture fléchisseur P2 D4');
console.log('  └─ Rupture tendon fléchisseur phalange moyenne annulaire');
console.log('  └─ Barème: Section des tendons fléchisseurs doigt long');
console.log('  └─ IPP: 8-12% (fourchette)');
console.log('');
console.log('🔸 CUMUL (Formule Balthazar):');
console.log('  └─ IPP minimum: 3 + 8 × (1 - 3/100) = 10.76% ≈ 11%');
console.log('  └─ IPP maximum: 3 + 12 × (1 - 3/100) = 14.64% ≈ 15%');
console.log('  └─ IPP TOTAL: 11-15%');
console.log('');
console.log('════════════════════════════════════════════════════════════');
