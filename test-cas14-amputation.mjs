/**
 * TEST CAS 14 - Amputation Main Dominante + Douleurs Fantômes + Dépression
 * 
 * Difficulté: ⭐⭐⭐⭐⭐ (5/5)
 * IPP attendu: 65-75%
 * 
 * Objectifs de test:
 * 1. Détecter amputation MAIN complète (60%) vs doigts (4-20%)
 * 2. Reconnaître douleurs membre fantôme (entité neuropathique spécifique)
 * 3. Évaluer dépression MAJEURE (Hamilton ≥20) vs anxiété légère
 * 4. Appliquer cumul Balthazard 3 SYSTÈMES (ortho + neuro + psy)
 */

import { localExpertAnalysis } from './components/AiAnalyzer.tsx';

console.log('🧪 TEST CAS 14 - Amputation Main + Phantom Pain + Dépression');
console.log('=' .repeat(70));

const cas14Description = `Ouvrier BTP 38 ans, accident presse industrielle. Amputation traumatique main droite dominante niveau poignet (désarticulation radio-carpienne), membre fantôme persistant avec douleurs neuropathiques sévères EVA 7/10 résistantes gabapentine, prégabaline, morphiniques. Syndrome dépressif majeur réactionnel (échelle Hamilton 24/52), impossibilité reconversion professionnelle (formation niveau CAP), isolement social, arrêt travail définitif.`;

console.log('\n📋 DESCRIPTION CLINIQUE:');
console.log(cas14Description);

console.log('\n🎯 CRITÈRES ATTENDUS:');
console.log('  1. Amputation main dominante désarticulation poignet: 60%');
console.log('  2. Douleurs membre fantôme chroniques résistantes: 15%');
console.log('  3. Syndrome dépressif majeur réactionnel: 10%');
console.log('  4. Cumul Balthazard: 60 + 15×0.4 + 10×0.34 ≈ 69%');

console.log('\n⏳ ANALYSE EN COURS...\n');

try {
    const result = localExpertAnalysis(cas14Description);
    
    console.log('✅ RÉSULTAT ANALYSE IA:');
    console.log('─'.repeat(70));
    console.log(`📌 Lésion détectée: ${result.name}`);
    console.log(`📊 Taux IPP calculé: ${result.rate}%`);
    console.log(`📖 Justification: ${result.justification}`);
    
    if (result.isCumul) {
        console.log(`🔗 Type: CUMUL (Balthazard)`);
    }
    
    // Validation fourchette [65-75%]
    const ippMin = 65;
    const ippMax = 75;
    const isValid = result.rate >= ippMin && result.rate <= ippMax;
    
    console.log('\n📊 VALIDATION:');
    console.log(`  - IPP attendu: [${ippMin}-${ippMax}]%`);
    console.log(`  - IPP obtenu: ${result.rate}%`);
    console.log(`  - Statut: ${isValid ? '✅ VALIDÉ' : '❌ HORS FOURCHETTE'}`);
    
    if (!isValid) {
        console.log('\n⚠️  ANALYSE ÉCART:');
        if (result.rate < ippMin) {
            console.log(`  - IPP trop faible (-${ippMin - result.rate}%)`);
            console.log('  - Causes possibles:');
            console.log('    • Amputation MAIN (60%) non détectée → Détection doigts?');
            console.log('    • Douleurs fantômes (15%) manquantes');
            console.log('    • Dépression majeure (10%) sous-évaluée');
            console.log('    • Cumul Balthazard 3 systèmes non appliqué');
        } else {
            console.log(`  - IPP trop élevé (+${result.rate - ippMax}%)`);
            console.log('  - Causes possibles:');
            console.log('    • Sur-évaluation amputation');
            console.log('    • Double comptage douleur/dépression');
        }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log(isValid ? '🎉 CAS 14 VALIDÉ ✅' : '⚠️  CAS 14 À AMÉLIORER ❌');
    console.log('='.repeat(70));
    
    process.exit(isValid ? 0 : 1);
    
} catch (error) {
    console.error('❌ ERREUR ANALYSE:', error.message);
    console.error('\n🔍 DÉTAILS ERREUR:');
    console.error(error);
    process.exit(1);
}
