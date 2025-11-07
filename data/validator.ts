/**
 * VALIDATEUR D'EXPERTISE MÉDICO-LÉGALE
 * Teste l'IA locale sur base d'entraînement et génère rapport de performance
 */

import { localExpertAnalysis } from '../components/AiAnalyzer';
import { trainingCases, TrainingCase, QualityMetrics, qualityThresholds } from './trainingCases';
import { niveau1Simple, niveau2Moyen, niveau3Complexe } from './trainingCasesExtension';
import { normalize } from '../components/AiAnalyzer';

// FUSION: Cas existants + extension niveau 1 + niveau 2 + niveau 3
const allTrainingCases = [...trainingCases, ...niveau1Simple, ...niveau2Moyen, ...niveau3Complexe];

export interface ValidationResult {
  caseId: string;
  category: string;
  userInput: string;
  success: boolean;
  foundInjury: string | null;
  expectedInjury: string;
  foundRate: number | null;
  expectedRate: number;
  rateDeviation: number; // Écart en %
  responseTime: number; // ms
  errors: string[];
  warnings: string[];
}

export interface ValidationReport {
  timestamp: Date;
  totalCases: number;
  successfulCases: number;
  failedCases: number;
  metrics: QualityMetrics;
  results: ValidationResult[];
  recommendations: string[];
}

/**
 * Exécute validation complète sur tous les cas d'entraînement
 */
export function runFullValidation(): ValidationReport {
  console.log('🔬 Démarrage validation expertise IA...');
  
  const results: ValidationResult[] = [];
  let totalResponseTime = 0;
  let correctRecognitions = 0;
  let correctRates = 0;
  
  // Tester chaque cas
  for (const trainingCase of allTrainingCases) {
    const startTime = performance.now();
    
    try {
      const result = localExpertAnalysis(trainingCase.userInput);
      const responseTime = performance.now() - startTime;
      totalResponseTime += responseTime;
      
      const validationResult: ValidationResult = {
        caseId: trainingCase.id,
        category: trainingCase.category,
        userInput: trainingCase.userInput,
        success: false,
        foundInjury: null,
        expectedInjury: trainingCase.expectedInjury,
        foundRate: null,
        expectedRate: trainingCase.expectedRate,
        rateDeviation: 0,
        responseTime,
        errors: [],
        warnings: []
      };
      
      // Vérifier reconnaissance lésion
      if (result.type === 'proposal') {
        validationResult.foundInjury = result.name;
        validationResult.foundRate = result.rate;
        
        // Comparer avec attendu (normalisation)
        const normalizedFound = normalize(result.name);
        const normalizedExpected = normalize(trainingCase.expectedInjury);
        
        if (normalizedFound === normalizedExpected) {
          correctRecognitions++;
          
          // Vérifier précision taux (tolérance ±3%)
          const deviation = Math.abs(result.rate - trainingCase.expectedRate);
          validationResult.rateDeviation = deviation;
          
          if (deviation <= 3) {
            correctRates++;
            validationResult.success = true;
          } else if (deviation <= 5) {
            validationResult.warnings.push(`Taux acceptable mais écart ${deviation}% (tolérance optimale ±3%)`);
            validationResult.success = true;
          } else {
            validationResult.errors.push(`Taux incorrect: trouvé ${result.rate}%, attendu ${trainingCase.expectedRate}% (écart ${deviation}%)`);
          }
        } else {
          validationResult.errors.push(`Lésion incorrecte: "${result.name}" au lieu de "${trainingCase.expectedInjury}"`);
        }
      } else if (result.type === 'ambiguity') {
        // Vérifier si lésion attendue dans les choix
        const choices = result.choices || [];
        const foundInChoices = choices.some(c => normalize(c.name) === normalize(trainingCase.expectedInjury));
        
        if (foundInChoices) {
          validationResult.warnings.push(`Lésion attendue trouvée mais nécessite clarification (ambiguïté détectée)`);
          validationResult.success = true; // Acceptable si dans les choix
          correctRecognitions++;
        } else {
          validationResult.errors.push(`Lésion attendue "${trainingCase.expectedInjury}" absente des ${choices.length} choix proposés`);
        }
      } else {
        validationResult.errors.push(`Aucune lésion trouvée (type: ${result.type})`);
      }
      
      results.push(validationResult);
      
    } catch (error) {
      const validationResult: ValidationResult = {
        caseId: trainingCase.id,
        category: trainingCase.category,
        userInput: trainingCase.userInput,
        success: false,
        foundInjury: null,
        expectedInjury: trainingCase.expectedInjury,
        foundRate: null,
        expectedRate: trainingCase.expectedRate,
        rateDeviation: 0,
        responseTime: performance.now() - startTime,
        errors: [`Exception levée: ${error instanceof Error ? error.message : String(error)}`],
        warnings: []
      };
      
      results.push(validationResult);
    }
  }
  
  // Calcul métriques globales
  const successfulCases = results.filter(r => r.success).length;
  const failedCases = results.length - successfulCases;
  
  const metrics: QualityMetrics = {
    recognitionAccuracy: (correctRecognitions / allTrainingCases.length) * 100,
    rateAccuracy: (correctRates / allTrainingCases.length) * 100,
    ambiguityDetection: 0, // À calculer séparément avec cas spécifiques ambiguïté
    justificationCompleteness: 0, // À calculer avec analyse justifications
    responseTime: totalResponseTime / allTrainingCases.length
  };
  
  // Générer recommandations
  const recommendations: string[] = [];
  
  if (metrics.recognitionAccuracy < qualityThresholds.recognitionAccuracy) {
    recommendations.push(`⚠️ Taux reconnaissance (${metrics.recognitionAccuracy.toFixed(1)}%) < seuil ${qualityThresholds.recognitionAccuracy}% → Améliorer keywords/synonymes`);
  }
  
  if (metrics.rateAccuracy < qualityThresholds.rateAccuracy) {
    recommendations.push(`⚠️ Précision taux (${metrics.rateAccuracy.toFixed(1)}%) < seuil ${qualityThresholds.rateAccuracy}% → Affiner critères gravité`);
  }
  
  if (metrics.responseTime > qualityThresholds.responseTime) {
    recommendations.push(`⚠️ Temps réponse moyen (${metrics.responseTime.toFixed(0)}ms) > seuil ${qualityThresholds.responseTime}ms → Optimiser algorithme`);
  }
  
  // Analyser erreurs par catégorie
  const errorsByCategory = new Map<string, number>();
  results.forEach(r => {
    if (!r.success) {
      const count = errorsByCategory.get(r.category) || 0;
      errorsByCategory.set(r.category, count + 1);
    }
  });
  
  errorsByCategory.forEach((count, category) => {
    if (count > 2) {
      recommendations.push(`🔴 Catégorie "${category}" : ${count} échecs → Réviser mots-clés/patterns spécifiques`);
    }
  });
  
  const report: ValidationReport = {
    timestamp: new Date(),
    totalCases: allTrainingCases.length,
    successfulCases,
    failedCases,
    metrics,
    results,
    recommendations
  };
  
  console.log(`✅ Validation terminée: ${successfulCases}/${allTrainingCases.length} cas réussis (${metrics.recognitionAccuracy.toFixed(1)}%)`);
  
  return report;
}

/**
 * Génère rapport HTML formaté
 */
export function generateHTMLReport(report: ValidationReport): string {
  const passRate = (report.successfulCases / report.totalCases * 100).toFixed(1);
  const statusEmoji = report.metrics.recognitionAccuracy >= qualityThresholds.recognitionAccuracy ? '✅' : '⚠️';
  
  let html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Rapport Validation IA Médico-Légale</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
    h1 { color: #1976D2; border-bottom: 3px solid #1976D2; padding-bottom: 10px; }
    h2 { color: #424242; margin-top: 30px; }
    .metric-box { display: inline-block; padding: 20px; margin: 10px; border-radius: 8px; min-width: 200px; text-align: center; }
    .metric-value { font-size: 32px; font-weight: bold; }
    .metric-label { font-size: 14px; color: #666; }
    .success { background: #C8E6C9; color: #2E7D32; }
    .warning { background: #FFE082; color: #F57C00; }
    .error { background: #FFCDD2; color: #C62828; }
    .test-result { margin: 15px 0; padding: 15px; border-left: 4px solid #ccc; background: #fafafa; }
    .test-result.pass { border-color: #4CAF50; }
    .test-result.fail { border-color: #F44336; }
    .recommendation { padding: 15px; margin: 10px 0; border-left: 4px solid #FF9800; background: #FFF3E0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #1976D2; color: white; }
    tr:hover { background: #f5f5f5; }
    .code { background: #263238; color: #00FF00; padding: 15px; border-radius: 5px; overflow-x: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${statusEmoji} Rapport de Validation - IA Médico-Légale</h1>
    <p><strong>Date:</strong> ${report.timestamp.toLocaleString('fr-FR')}</p>
    
    <h2>📊 Métriques Globales</h2>
    <div>
      <div class="metric-box ${report.metrics.recognitionAccuracy >= qualityThresholds.recognitionAccuracy ? 'success' : 'error'}">
        <div class="metric-value">${report.metrics.recognitionAccuracy.toFixed(1)}%</div>
        <div class="metric-label">Reconnaissance Lésions</div>
        <div class="metric-label">(Seuil: ${qualityThresholds.recognitionAccuracy}%)</div>
      </div>
      
      <div class="metric-box ${report.metrics.rateAccuracy >= qualityThresholds.rateAccuracy ? 'success' : 'warning'}">
        <div class="metric-value">${report.metrics.rateAccuracy.toFixed(1)}%</div>
        <div class="metric-label">Précision Taux IPP</div>
        <div class="metric-label">(Seuil: ${qualityThresholds.rateAccuracy}%)</div>
      </div>
      
      <div class="metric-box ${report.metrics.responseTime <= qualityThresholds.responseTime ? 'success' : 'warning'}">
        <div class="metric-value">${report.metrics.responseTime.toFixed(0)}ms</div>
        <div class="metric-label">Temps Réponse Moyen</div>
        <div class="metric-label">(Seuil: ${qualityThresholds.responseTime}ms)</div>
      </div>
      
      <div class="metric-box ${report.failedCases === 0 ? 'success' : 'error'}">
        <div class="metric-value">${report.successfulCases}/${report.totalCases}</div>
        <div class="metric-label">Cas Réussis</div>
        <div class="metric-label">(${passRate}%)</div>
      </div>
    </div>
    
    ${report.recommendations.length > 0 ? `
    <h2>💡 Recommandations d'Amélioration</h2>
    ${report.recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('')}
    ` : ''}
    
    <h2>📋 Résultats Détaillés par Cas</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Catégorie</th>
          <th>Statut</th>
          <th>Lésion Trouvée</th>
          <th>Taux Trouvé</th>
          <th>Écart</th>
          <th>Temps</th>
        </tr>
      </thead>
      <tbody>
        ${report.results.map(r => `
        <tr style="background: ${r.success ? '#E8F5E9' : '#FFEBEE'};">
          <td><strong>${r.caseId}</strong></td>
          <td>${r.category}</td>
          <td>${r.success ? '✅ Réussi' : '❌ Échec'}</td>
          <td>${r.foundInjury || '<em>Non trouvée</em>'}</td>
          <td>${r.foundRate !== null ? r.foundRate + '%' : '-'}</td>
          <td>${r.rateDeviation > 0 ? r.rateDeviation.toFixed(1) + '%' : '-'}</td>
          <td>${r.responseTime.toFixed(0)}ms</td>
        </tr>
        ${r.errors.length > 0 ? `
        <tr>
          <td colspan="7" style="background: #FFCDD2; padding: 10px;">
            <strong>❌ Erreurs:</strong><br>${r.errors.map(e => `• ${e}`).join('<br>')}
          </td>
        </tr>
        ` : ''}
        ${r.warnings.length > 0 ? `
        <tr>
          <td colspan="7" style="background: #FFF9C4; padding: 10px;">
            <strong>⚠️ Avertissements:</strong><br>${r.warnings.map(w => `• ${w}`).join('<br>')}
          </td>
        </tr>
        ` : ''}
        `).join('')}
      </tbody>
    </table>
    
    <h2>🎯 Actions Prioritaires</h2>
    <ol>
      ${report.failedCases > 0 ? `<li><strong>Analyser ${report.failedCases} cas échoués</strong> et enrichir keywords/synonymes</li>` : ''}
      ${report.metrics.recognitionAccuracy < 95 ? `<li><strong>Améliorer reconnaissance</strong>: Ajouter variations linguistiques fréquentes</li>` : ''}
      ${report.metrics.rateAccuracy < 90 ? `<li><strong>Affiner critères gravité</strong>: Réviser rateCriteria pour lésions à fort écart</li>` : ''}
      ${report.metrics.responseTime > 500 ? `<li><strong>Optimiser performance</strong>: Réduire temps recherche (caching, indexation)</li>` : ''}
      <li><strong>Tester en conditions réelles</strong>: Valider sur cas cliniques réels service médico-légal</li>
    </ol>
    
    <div style="margin-top: 40px; padding: 20px; background: #E3F2FD; border-radius: 8px;">
      <h3>📚 Prochaines Étapes</h3>
      <ul>
        <li>✅ Exécuter validation après chaque modification majeure</li>
        <li>✅ Enrichir base d'entraînement avec cas réels (objectif: 100+ cas)</li>
        <li>✅ Implémenter tests de régression automatiques</li>
        <li>✅ Collecter feedback médecins experts pour amélioration continue</li>
      </ul>
    </div>
  </div>
</body>
</html>
  `;
  
  return html;
}

/**
 * Sauvegarde rapport dans fichier
 */
export function saveReportToFile(report: ValidationReport, filename: string = 'validation-report.html'): void {
  const html = generateHTMLReport(report);
  
  // Pour environnement Node.js
  if (typeof window === 'undefined') {
    const fs = require('fs');
    fs.writeFileSync(filename, html, 'utf-8');
    console.log(`📄 Rapport sauvegardé: ${filename}`);
  } 
  // Pour navigateur
  else {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    console.log(`📄 Rapport téléchargé: ${filename}`);
  }
}

/**
 * Exécution rapide pour tests (commenté pour compatibilité ESM)
 */
/*
if (typeof window === 'undefined' && require.main === module) {
  console.log('🚀 Lancement validation expertise IA...\n');
  const report = runFullValidation();
  saveReportToFile(report);
  
  console.log('\n📊 RÉSUMÉ:');
  console.log(`   Cas testés: ${report.totalCases}`);
  console.log(`   Réussis: ${report.successfulCases} (${(report.successfulCases/report.totalCases*100).toFixed(1)}%)`);
  console.log(`   Échoués: ${report.failedCases}`);
  console.log(`   Temps moyen: ${report.metrics.responseTime.toFixed(0)}ms`);
  console.log(`\n✅ Rapport HTML généré: validation-report.html`);
}
*/
