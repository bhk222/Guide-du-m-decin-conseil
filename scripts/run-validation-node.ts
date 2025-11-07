/**
 * Script de validation automatique TypeScript
 */

import { runFullValidation, generateHTMLReport } from '../data/validator';
import * as fs from 'fs';

console.log('🔬 Démarrage validation expertise IA (297 cas)...\n');

const startTime = Date.now();

try {
    // Exécuter validation complète
    const report = runFullValidation();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    // Afficher résumé console
    console.log('\n' + '='.repeat(80));
    console.log('📊 RÉSULTATS VALIDATION');
    console.log('='.repeat(80));
    console.log(`\n✅ Cas réussis: ${report.successfulCases}/${report.totalCases} (${(report.successfulCases/report.totalCases*100).toFixed(1)}%)`);
    console.log(`❌ Cas échoués: ${report.failedCases}/${report.totalCases} (${(report.failedCases/report.totalCases*100).toFixed(1)}%)`);
    console.log(`\n📈 Métriques:`);
    console.log(`   • Reconnaissance lésions: ${report.metrics.recognitionAccuracy.toFixed(1)}% (seuil: 95%)`);
    console.log(`   • Précision taux IPP: ${report.metrics.rateAccuracy.toFixed(1)}% (seuil: 90%)`);
    console.log(`   • Temps réponse moyen: ${report.metrics.responseTime.toFixed(0)}ms (seuil: 500ms)`);
    console.log(`\n⏱️  Durée totale: ${duration}s`);
    
    // Générer rapport HTML
    const html = generateHTMLReport(report);
    const filename = `validation-report-${new Date().toISOString().split('T')[0]}.html`;
    fs.writeFileSync(filename, html, 'utf-8');
    
    console.log(`\n📄 Rapport HTML sauvegardé: ${filename}`);
    
    // Afficher échantillon d'erreurs
    const failedCases = report.results.filter(r => !r.success);
    if (failedCases.length > 0) {
        console.log(`\n🔍 Échantillon erreurs (${Math.min(10, failedCases.length)} premiers):`);
        failedCases.slice(0, 10).forEach(c => {
            console.log(`\n   ${c.caseId} [${c.category}]:`);
            c.errors.forEach(e => console.log(`      ❌ ${e}`));
        });
    }
    
    // Résumé par catégorie
    const categoriesStats = new Map<string, { total: number; success: number }>();
    report.results.forEach(r => {
        const stats = categoriesStats.get(r.category) || { total: 0, success: 0 };
        stats.total++;
        if (r.success) stats.success++;
        categoriesStats.set(r.category, stats);
    });
    
    console.log(`\n📊 Performance par catégorie (top 10 échecs):`);
    const sortedCategories = Array.from(categoriesStats.entries())
        .map(([cat, stats]) => ({ 
            category: cat, 
            failRate: ((stats.total - stats.success) / stats.total * 100),
            failed: stats.total - stats.success,
            total: stats.total 
        }))
        .filter(c => c.failed > 0)
        .sort((a, b) => b.failed - a.failed)
        .slice(0, 10);
    
    sortedCategories.forEach(c => {
        console.log(`   ${c.category}: ${c.failed}/${c.total} échecs (${c.failRate.toFixed(0)}%)`);
    });
    
    console.log('\n' + '='.repeat(80));
    
    // Code sortie selon résultat
    if (report.metrics.recognitionAccuracy >= 95) {
        console.log('✅ VALIDATION RÉUSSIE - Reconnaissance ≥95%');
        process.exit(0);
    } else if (report.metrics.recognitionAccuracy >= 70) {
        console.log('⚠️  VALIDATION PARTIELLE - Reconnaissance ≥70% mais <95%');
        process.exit(1);
    } else {
        console.log('❌ VALIDATION ÉCHOUÉE - Reconnaissance <70%');
        process.exit(2);
    }
    
} catch (error: any) {
    console.error('\n❌ ERREUR VALIDATION:', error.message);
    console.error(error.stack);
    process.exit(3);
}
