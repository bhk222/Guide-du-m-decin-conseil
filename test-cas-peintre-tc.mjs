#!/usr/bin/env node
import { analyzeText } from './components/AiAnalyzer.tsx';

console.log('🧪 TEST CAS PEINTRE - TC avec séquelles multiples\n');
console.log('═'.repeat(80));
console.log('📋 CAS CLINIQUE:');
console.log('Peintre de bâtiment, chute de 4 mètres, sans casque. Perte de connaissance');
console.log('initiale, hospitalisation en neurochirurgie. Séquelles: Troubles cognitifs');
console.log('persistants, hémiparésie gauche légère, vertiges à l\'effort, céphalées chroniques.');
console.log('═'.repeat(80));
console.log();

const textePeintre = `Peintre de bâtiment, chute de 4 mètres, sans casque. Perte de connaissance initiale, hospitalisation en neurochirurgie. Examen : Troubles cognitifs persistants, hémiparésie gauche légère, vertiges à l'effort, céphalées chroniques.`;

try {
    const result = await analyzeText(textePeintre, false, false, []);
    
    console.log('📊 RÉSULTAT DÉTECTION:\n');
    console.log('🎯 Lésion proposée:', result.detectedLesion);
    console.log('📊 IPP:', result.ipp + '%');
    console.log('🗂️ Catégorie:', result.category || 'Non spécifié');
    console.log();
    console.log('═'.repeat(80));
    console.log('🔍 ANALYSE DES ERREURS:\n');
    
    let hasError = false;
    
    // Validation 1: Doit détecter "Commotion cérébro-spinale prolongée" ou syndrome complet
    const hasCommotionProlongee = result.detectedLesion?.includes('Commotion') || 
                                   result.detectedLesion?.includes('syndrome complet') ||
                                   result.detectedLesion?.includes('Contusions cérébrales');
    
    if (!hasCommotionProlongee) {
        console.log('   ❌ ERREUR 1: Ne détecte pas le syndrome neurologique complet');
        console.log(`      Détecté: "${result.detectedLesion}"`);
        console.log('      Attendu: "Commotion cérébro-spinale prolongée (syndrome complet)" ou équivalent');
        hasError = true;
    } else {
        console.log('   ✅ Syndrome neurologique complet détecté');
    }
    
    // Validation 2: Doit proposer un IPP cohérent (≥ 30% pour syndrome complet)
    const ippValue = parseInt(result.ipp);
    if (ippValue < 30) {
        console.log(`   ❌ ERREUR 2: IPP trop faible (${result.ipp}%) pour syndrome complet`);
        console.log('      Attendu: ≥ 30% (4 séquelles neurologiques post-TC)');
        hasError = true;
    } else {
        console.log(`   ✅ IPP cohérent avec syndrome complet (${result.ipp}%)`);
    }
    
    // Validation 3: Ne doit PAS proposer dialogue cumul manuel
    if (result.needsUserChoice || result.ambiguity) {
        console.log('   ❌ ERREUR 3: Propose dialogue cumul manuel au lieu de détection automatique');
        console.log('      Le système devrait détecter automatiquement le syndrome complet');
        hasError = true;
    } else {
        console.log('   ✅ Détection automatique sans dialogue');
    }
    
    console.log();
    if (!hasError) {
        console.log('✅ TEST PASSED - Syndrome complet correctement détecté');
    } else {
        console.log('❌ TEST FAILED - Voir erreurs ci-dessus');
        process.exit(1);
    }
    
} catch (error) {
    console.error('❌ ERREUR DURANT LE TEST:', error);
    process.exit(1);
}
