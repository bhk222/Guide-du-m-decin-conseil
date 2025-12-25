/**
 * TEST IA COMPLET - CAS RÉEL: Amputation P3 auriculaire + Rupture fléchisseur annulaire
 * 
 * Description: "amputation P3 D5 avec rupture du fléchisseur du P2 D4"
 * 
 * Objectif: Vérifier que l'IA détecte maintenant correctement:
 * 1. Les deux composants séparés (amputation + tendon)
 * 2. Le cumul automatique (formule Balthazard)
 * 3. Le calcul IPP total = 12%
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

const casDescription = "Accident de travail, main dominante. Amputation P3 D5 (auriculaire) avec rupture du fléchisseur du P2 D4 (annulaire) au niveau de la gaine digitale.";

console.log('═══════════════════════════════════════════════════════════════════════════');
console.log('🧪 TEST IA COMPLET - AMPUTATION AURICULAIRE + RUPTURE FLÉCHISSEUR ANNULAIRE');
console.log('═══════════════════════════════════════════════════════════════════════════\n');

console.log('📋 DESCRIPTION CLINIQUE:');
console.log(`   "${casDescription}"\n`);

console.log('🎯 ANALYSE ATTENDUE:');
console.log('   Composant 1: Amputation auriculaire P3 (D5) → 4%');
console.log('   Composant 2: Rupture fléchisseur annulaire Zone II (D4) → 8%');
console.log('   Cumul Balthazard: 4 + 8 × (100-4)/100 = 11.68% ≈ 12%');
console.log('   IPP TOTAL ATTENDU: 12%\n');

console.log('─'.repeat(75));
console.log('ANALYSE IA EN COURS...');
console.log('─'.repeat(75) + '\n');

try {
    const result = localExpertAnalysis(casDescription);
    
    console.log('✅ RÉSULTAT ANALYSE IA:');
    console.log('─'.repeat(75));
    console.log(`📌 Type: ${result.type}`);
    
    if (result.type === 'proposal') {
        console.log(`📌 Lésion détectée: ${result.name}`);
        console.log(`💯 Taux IPP calculé: ${result.rate}%`);
        console.log(`📍 Chemin: ${result.path}`);
        
        if (Array.isArray(result.injury?.rate)) {
            console.log(`📊 Fourchette barème: [${result.injury.rate[0]}-${result.injury.rate[1]}%]`);
        } else {
            console.log(`📊 Taux barème: ${result.injury?.rate}%`);
        }
        
        if (result.isCumul) {
            console.log(`🔗 Cumul détecté: OUI ✅`);
        } else {
            console.log(`🔗 Cumul détecté: NON ⚠️`);
        }
        
        console.log(`\n📝 Justification:\n${result.justification.substring(0, 500)}...\n`);
        
        // Validation
        console.log('─'.repeat(75));
        console.log('🎯 VALIDATION:');
        console.log('─'.repeat(75));
        
        const attendu = 12;
        const obtenu = result.rate;
        const ecart = Math.abs(obtenu - attendu);
        
        // Critères de validation
        const criteres = {
            tauxCorrect: ecart <= 2, // Tolérance ±2%
            detecteAuriculaire: /auriculaire|D5|5.*doigt/i.test(result.name),
            detecteAnnulaire: /annulaire|D4|4.*doigt/i.test(result.name) || /fléchisseur|tendon/i.test(result.name),
            detecteAmputation: /amputation|désarticulation|phalange/i.test(result.name),
            detecteTendon: /fléchisseur|tendon|rupture|section/i.test(result.name),
            cumulDetecte: result.isCumul === true
        };
        
        console.log(`\n✓ Taux IPP: ${obtenu}% (attendu: ${attendu}%) → ${criteres.tauxCorrect ? '✅' : '❌'} écart: ${ecart}%`);
        console.log(`✓ Détection auriculaire (D5): ${criteres.detecteAuriculaire ? '✅' : '❌'}`);
        console.log(`✓ Détection annulaire (D4): ${criteres.detecteAnnulaire ? '✅' : '❌'}`);
        console.log(`✓ Détection amputation: ${criteres.detecteAmputation ? '✅' : '❌'}`);
        console.log(`✓ Détection tendon: ${criteres.detecteTendon ? '✅' : '❌'}`);
        console.log(`✓ Cumul activé: ${criteres.cumulDetecte ? '✅' : '❌'}`);
        
        const nbSuccess = Object.values(criteres).filter(v => v === true).length;
        const nbTotal = Object.keys(criteres).length;
        const score = (nbSuccess / nbTotal * 100).toFixed(0);
        
        console.log(`\n📊 SCORE: ${nbSuccess}/${nbTotal} critères validés (${score}%)`);
        
        if (nbSuccess === nbTotal) {
            console.log(`\n🎉 TEST RÉUSSI - L'IA détecte correctement le cas complexe !`);
        } else if (nbSuccess >= nbTotal * 0.5) {
            console.log(`\n⚠️  TEST PARTIEL - L'IA détecte partiellement le cas`);
            console.log(`Critères manquants:`);
            Object.entries(criteres).forEach(([key, val]) => {
                if (!val) console.log(`  - ${key}`);
            });
        } else {
            console.log(`\n❌ TEST ÉCHOUÉ - L'IA ne détecte pas correctement le cas`);
        }
        
    } else if (result.type === 'cumul_proposals') {
        console.log(`🔗 Type: CUMUL PROPOSITIONS (${result.lesionCount} lésions détectées)`);
        console.log(`\n📋 Lésions détectées:\n`);
        result.proposals.forEach((prop, index) => {
            console.log(`   ${index + 1}. ${prop.injury.name}`);
            const rate = Array.isArray(prop.injury.rate) 
                ? `[${prop.injury.rate[0]}-${prop.injury.rate[1]}%]`
                : `${prop.injury.rate}%`;
            console.log(`      Taux: ${rate}`);
            console.log(`      Justification: ${prop.justification.substring(0, 150)}...\n`);
        });
        
        console.log('✅ EXCELLENT - L\'IA détecte un cumul de lésions !');
        console.log('   → Les deux composants sont identifiés séparément');
        console.log('   → Application automatique du cumul Balthazard à faire manuellement\n');
        
    } else if (result.type === 'ambiguity') {
        console.log(`⚠️  Type: AMBIGUÏTÉ (${result.choices.length} choix possibles)`);
        console.log(`\nChoix détectés:\n`);
        result.choices.forEach((choice, index) => {
            const rate = Array.isArray(choice.rate) 
                ? `[${choice.rate[0]}-${choice.rate[1]}%]`
                : `${choice.rate}%`;
            console.log(`   ${index + 1}. ${choice.name} → ${rate}`);
        });
        
    } else {
        console.log(`❌ Type: NO_RESULT`);
        console.log(`L'IA n'a pas pu identifier de lésion correspondante.`);
    }
    
} catch (error) {
    console.error('❌ ERREUR LORS DE L\'ANALYSE:', error.message);
}

console.log('\n' + '═'.repeat(75));
console.log('📝 DIAGNOSTIC FINAL');
console.log('═'.repeat(75) + '\n');

console.log('Si l\'IA a détecté:');
console.log('  ✅ Les deux composants (amputation + tendon) → Base de données complète');
console.log('  ✅ Le cumul automatique → Pattern matching fonctionnel');
console.log('  ✅ Taux IPP ≈ 12% → Calcul correct');
console.log('\nAlors: Les 27 séquences tendineuses ajoutées fonctionnent parfaitement ! 🎉');
console.log('\nSinon:');
console.log('  ⚠️  Pattern matching à améliorer pour détecter D4 vs D5');
console.log('  ⚠️  Règles expertes à ajouter pour les cas multi-composants');
console.log('  ⚠️  Synonymes à enrichir (P2, P3, Zone II, gaine digitale)\n');
