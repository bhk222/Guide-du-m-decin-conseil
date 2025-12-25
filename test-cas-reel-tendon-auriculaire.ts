/**
 * TEST CAS RÉEL: Amputation P3 auriculaire + Rupture fléchisseur annulaire
 * 
 * Description clinique:
 * "amputation P3 D5 avec rupture du fléchisseur du P2 D4"
 * 
 * Analyse anatomique correcte:
 * - D5 = Auriculaire (5ème doigt)
 * - D4 = Annulaire (4ème doigt)
 * - P3 = Phalange distale
 * - P2 = Phalange intermédiaire (Zone II de Verdan - zone critique)
 * 
 * Attendu:
 * - Composant 1: Amputation auriculaire P3 (D5) → 4%
 * - Composant 2: Rupture fléchisseur annulaire Zone II (D4) → 8% (moyenne 6-10%)
 * - Cumul Balthazard: 4 + 8 × (100-4)/100 = 4 + 7.68 = 11.68% ≈ 12%
 */

import { disabilityData } from './data/disabilityRates';

// Extraction de toutes les lésions avec leurs chemins
const allInjuries = disabilityData.flatMap(cat => 
    cat.subcategories.flatMap(sub => 
        sub.injuries.map(inj => ({
            ...inj,
            category: cat.name,
            subcategory: sub.name,
            path: `${cat.name} > ${sub.name}`
        }))
    )
);

console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('🧪 TEST CAS RÉEL: AMPUTATION P3 AURICULAIRE + RUPTURE FLÉCHISSEUR ANNULAIRE');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

const casDescription = "amputation P3 D5 avec rupture du fléchisseur du P2 D4";

console.log('📋 DESCRIPTION CLINIQUE:');
console.log(`   "${casDescription}"\n`);

console.log('🎯 ANALYSE ANATOMIQUE CORRECTE:');
console.log('   - D5 = Auriculaire (5ème doigt)');
console.log('   - D4 = Annulaire (4ème doigt)');
console.log('   - P3 = Phalange distale → Amputation');
console.log('   - P2 = Phalange intermédiaire → Zone II Verdan (zone critique "no man\'s land")\n');

console.log('🎯 CALCUL IPP ATTENDU:');
console.log('   Composant 1: Amputation auriculaire P3 (dominante) → 4%');
console.log('   Composant 2: Rupture fléchisseur annulaire Zone II → 8% (fourchette 6-10%)');
console.log('   Cumul Balthazard: 4 + 8 × (100-4)/100 = 4 + 7.68 = 11.68%');
console.log('   IPP TOTAL ATTENDU: ≈ 12%\n');

console.log('─'.repeat(75));
console.log('ÉTAPE 1: VÉRIFICATION PRÉSENCE DANS DATABASE');
console.log('─'.repeat(75) + '\n');

// Recherche composant 1: Amputation auriculaire P3
// Note: Dans algerianBareme1967.ts, "Désarticulation 2ème phalange" = P3 (phalange distale)
console.log('🔍 Recherche: "Amputation auriculaire P3"');
const amputation = allInjuries.find(inj => 
    /auriculaire/i.test(inj.name) &&
    /amputation|désarticulation/i.test(inj.name) &&
    /2.*phalange|P3|distale/i.test(inj.name)
    // Pas besoin de "dominante" - barème algérien = implicitement main dominante
);

if (amputation) {
    console.log(`   ✅ TROUVÉ: "${amputation.name}"`);
    console.log(`   📍 Path: ${amputation.path}`);
    console.log(`   💯 Taux: ${amputation.rate}%`);
} else {
    console.log('   ❌ NON TROUVÉ dans la base');
}

// Recherche composant 2: Rupture fléchisseur annulaire Zone II
console.log('\n🔍 Recherche: "Rupture fléchisseur annulaire Zone II"');

// Recherche avec différents patterns
const patterns = [
    {
        desc: "Pattern exact Zone II",
        test: (inj: any) => 
            /annulaire/i.test(inj.name) &&
            /fléchisseur/i.test(inj.name) &&
            /zone.*ii|zone.*2/i.test(inj.name) &&
            /dominante/i.test(inj.name)
    },
    {
        desc: "Pattern général tendon annulaire",
        test: (inj: any) => 
            /annulaire/i.test(inj.name) &&
            /fléchisseur|tendon/i.test(inj.name) &&
            /dominante/i.test(inj.name)
    },
    {
        desc: "Pattern P2 + annulaire (localisation anatomique)",
        test: (inj: any) => 
            /annulaire/i.test(inj.name) &&
            /fléchisseur/i.test(inj.name) &&
            /P2|intermédiaire|gaine/i.test(inj.name)
    }
];

let tendonFound = null;
for (const pattern of patterns) {
    const result = allInjuries.find(pattern.test);
    if (result) {
        console.log(`   ✅ TROUVÉ avec "${pattern.desc}"`);
        console.log(`   📌 Lésion: "${result.name}"`);
        console.log(`   📍 Path: ${result.path}`);
        if (Array.isArray(result.rate)) {
            const avgRate = Math.round((result.rate[0] + result.rate[1]) / 2);
            console.log(`   💯 Taux: [${result.rate[0]}-${result.rate[1]}%] → Moyenne: ${avgRate}%`);
        } else {
            console.log(`   💯 Taux: ${result.rate}%`);
        }
        tendonFound = result;
        break;
    }
}

if (!tendonFound) {
    console.log('   ❌ NON TROUVÉ dans la base');
}

console.log('\n' + '─'.repeat(75));
console.log('ÉTAPE 2: CALCUL IPP CUMUL (FORMULE BALTHAZARD)');
console.log('─'.repeat(75) + '\n');

if (amputation && tendonFound) {
    const ipp1 = amputation.rate as number;
    const ipp2 = Array.isArray(tendonFound.rate) 
        ? Math.round((tendonFound.rate[0] + tendonFound.rate[1]) / 2)
        : tendonFound.rate as number;
    
    // Formule Balthazard: IPP_total = IPP1 + IPP2 × (100-IPP1)/100
    const ippTotal = ipp1 + ipp2 * (100 - ipp1) / 100;
    
    console.log('📊 DÉTAIL DU CALCUL:');
    console.log(`   Lésion 1 (amputation): ${ipp1}%`);
    console.log(`   Lésion 2 (tendon): ${ipp2}%`);
    console.log(`   \n   Formule Balthazard:`);
    console.log(`   IPP_total = ${ipp1} + ${ipp2} × (100-${ipp1})/100`);
    console.log(`   IPP_total = ${ipp1} + ${ipp2} × ${100 - ipp1}/100`);
    console.log(`   IPP_total = ${ipp1} + ${(ipp2 * (100 - ipp1) / 100).toFixed(2)}`);
    console.log(`   IPP_total = ${ippTotal.toFixed(2)}%`);
    console.log(`   \n   ✅ IPP TOTAL ARRONDI: ${Math.round(ippTotal)}%`);
    
    console.log('\n🎯 VALIDATION:');
    const attendu = 12;
    const obtenu = Math.round(ippTotal);
    if (obtenu === attendu) {
        console.log(`   ✅ SUCCÈS: ${obtenu}% = ${attendu}% attendu`);
    } else {
        console.log(`   ⚠️  DIFFÉRENCE: ${obtenu}% vs ${attendu}% attendu (écart: ${Math.abs(obtenu - attendu)}%)`);
    }
} else {
    console.log('❌ IMPOSSIBLE DE CALCULER: Lésions manquantes dans la base');
    if (!amputation) console.log('   - Amputation auriculaire P3 introuvable');
    if (!tendonFound) console.log('   - Rupture fléchisseur annulaire Zone II introuvable');
}

console.log('\n' + '═'.repeat(75));
console.log('📝 DIAGNOSTIC TEST');
console.log('═'.repeat(75) + '\n');

if (amputation && tendonFound) {
    console.log('✅ TEST RÉUSSI: Les deux composants sont présents dans la base');
    console.log('   → L\'IA devrait maintenant détecter correctement ce cas');
    console.log('   → Le calcul IPP cumul devrait être correct (≈12%)');
} else {
    console.log('❌ TEST ÉCHOUÉ: Composants manquants');
    console.log('   → Vérifier que les séquences tendineuses ont bien été ajoutées');
    console.log('   → Vérifier data/mayetReyComplement.ts lignes 63-90');
}

console.log('\n' + '═'.repeat(75));
console.log('🔄 PROCHAINES ÉTAPES');
console.log('═'.repeat(75) + '\n');

console.log('1. Si test réussi: Tester dans l\'interface IA (AiAnalyzer)');
console.log('2. Vérifier que l\'IA détecte les deux composants séparément');
console.log('3. Vérifier que le cumul Balthazard s\'applique automatiquement');
console.log('4. Valider avec d\'autres cas similaires (D2, D3 + tendons)\n');
