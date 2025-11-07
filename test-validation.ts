/**
 * SCRIPT DE TEST RAPIDE - VALIDATION IA
 * Exécute validation automatique et affiche résultats console
 * Usage: npm run test:validation
 */

import { runFullValidation, generateHTMLReport, saveReportToFile } from './data/validator';
import { trainingCases } from './data/trainingCases';

console.log('\n🔬 VALIDATION EXPERTISE IA MÉDICO-LÉGALE\n');
console.log(`📊 Base d'entraînement: ${trainingCases.length} cas cliniques\n`);
console.log('⚙️  Exécution tests automatiques...\n');

// Exécuter validation
const report = runFullValidation();

// Afficher résumé console
console.log('═══════════════════════════════════════════════════');
console.log('📈 RÉSULTATS VALIDATION');
console.log('═══════════════════════════════════════════════════\n');

console.log(`✅ Taux de réussite:        ${(report.successfulCases / report.totalCases * 100).toFixed(1)}% (${report.successfulCases}/${report.totalCases} cas)`);
console.log(`🔍 Reconnaissance lésions:  ${report.metrics.recognitionAccuracy.toFixed(1)}% ${report.metrics.recognitionAccuracy >= 95 ? '✅' : '⚠️'}`);
console.log(`📐 Précision taux IPP:      ${report.metrics.rateAccuracy.toFixed(1)}% ${report.metrics.rateAccuracy >= 90 ? '✅' : '⚠️'}`);
console.log(`⚡ Temps réponse moyen:     ${report.metrics.responseTime.toFixed(0)}ms ${report.metrics.responseTime <= 500 ? '✅' : '⚠️'}\n`);

// Cas échoués
if (report.failedCases > 0) {
  console.log('═══════════════════════════════════════════════════');
  console.log(`❌ CAS ÉCHOUÉS (${report.failedCases})`);
  console.log('═══════════════════════════════════════════════════\n');
  
  report.results.filter(r => !r.success).forEach((result, idx) => {
    console.log(`${idx + 1}. ${result.caseId} (${result.category})`);
    console.log(`   Input: "${result.userInput.substring(0, 60)}..."`);
    console.log(`   Attendu: ${result.expectedInjury} (${result.expectedRate}%)`);
    console.log(`   Trouvé:  ${result.foundInjury || 'AUCUNE'} (${result.foundRate}%)`);
    if (result.errors.length > 0) {
      console.log(`   Erreurs: ${result.errors.join(', ')}`);
    }
    console.log('');
  });
}

// Recommandations
if (report.recommendations.length > 0) {
  console.log('═══════════════════════════════════════════════════');
  console.log('💡 RECOMMANDATIONS');
  console.log('═══════════════════════════════════════════════════\n');
  
  report.recommendations.forEach((rec, idx) => {
    console.log(`${idx + 1}. ${rec}`);
  });
  console.log('');
}

// Statistiques par catégorie
console.log('═══════════════════════════════════════════════════');
console.log('📊 STATISTIQUES PAR CATÉGORIE');
console.log('═══════════════════════════════════════════════════\n');

const categoryStats = report.results.reduce((acc, result) => {
  if (!acc[result.category]) {
    acc[result.category] = { total: 0, success: 0 };
  }
  acc[result.category].total++;
  if (result.success) acc[result.category].success++;
  return acc;
}, {} as Record<string, { total: number; success: number }>);

Object.entries(categoryStats).forEach(([category, stats]) => {
  const percentage = (stats.success / stats.total * 100).toFixed(0);
  const status = stats.success === stats.total ? '✅' : stats.success === 0 ? '❌' : '⚠️';
  console.log(`${status} ${category.padEnd(25)} ${stats.success}/${stats.total} (${percentage}%)`);
});

console.log('\n═══════════════════════════════════════════════════');
console.log('💾 GÉNÉRATION RAPPORT HTML');
console.log('═══════════════════════════════════════════════════\n');

// Générer et sauvegarder rapport HTML
try {
  const filename = `validation-report-${new Date().toISOString().split('T')[0]}.html`;
  saveReportToFile(report, filename);
  console.log(`✅ Rapport sauvegardé: ${filename}`);
  console.log('   Ouvrez ce fichier dans un navigateur pour voir le rapport détaillé.\n');
} catch (error) {
  console.error('❌ Erreur sauvegarde rapport:', error);
  console.log('   Utilisez l\'interface web pour télécharger le rapport.\n');
}

// Verdict final
console.log('═══════════════════════════════════════════════════');
console.log('🏆 VERDICT FINAL');
console.log('═══════════════════════════════════════════════════\n');

if (report.metrics.recognitionAccuracy >= 95 && report.metrics.rateAccuracy >= 90 && report.metrics.responseTime <= 500) {
  console.log('🎉 EXCELLENT ! L\'IA atteint tous les objectifs de performance.');
  console.log('   → Prochaine étape: Enrichir la base avec nouveaux cas (objectif: 50+ cas)\n');
} else if (report.metrics.recognitionAccuracy >= 85 && report.metrics.rateAccuracy >= 80) {
  console.log('👍 BON NIVEAU. Quelques améliorations à apporter.');
  console.log('   → Analyser cas échoués et enrichir keywords/synonymes\n');
} else {
  console.log('⚠️  NIVEAU INSUFFISANT. Améliorations prioritaires nécessaires.');
  console.log('   → Consulter recommandations ci-dessus et rapport HTML détaillé\n');
}

console.log('═══════════════════════════════════════════════════\n');

// Export résultats pour usage programmatique
export { report };
