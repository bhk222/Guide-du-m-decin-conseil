/**
 * INTERFACE DE VALIDATION ET MONITORING IA
 * Composant React pour tester/valider l'expertise médico-légale
 */

import React, { useState } from 'react';
import { runFullValidation, ValidationReport, generateHTMLReport } from '../data/validator';
import { trainingCases } from '../data/trainingCases';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const IAValidator: React.FC = () => {
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRunValidation = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simuler progression (car validation synchrone)
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 100);
    
    try {
      // Exécuter validation
      await new Promise(resolve => setTimeout(resolve, 50)); // Laisser UI se mettre à jour
      const validationReport = runFullValidation();
      setReport(validationReport);
      setProgress(100);
    } catch (error) {
      console.error('Erreur validation:', error);
      alert('Erreur lors de la validation. Voir console pour détails.');
    } finally {
      clearInterval(interval);
      setIsRunning(false);
    }
  };

  const handleDownloadReport = () => {
    if (!report) return;
    
    const html = generateHTMLReport(report);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `validation-ia-${new Date().toISOString().split('T')[0]}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const passRate = report ? (report.successfulCases / report.totalCases * 100).toFixed(1) : '0';
  const statusColor = report && report.metrics.recognitionAccuracy >= 95 ? 'text-green-600' : 'text-orange-600';
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-primary-700 mb-2">
            🔬 Validation Expertise IA Médico-Légale
          </h1>
          <p className="text-slate-600 mb-6">
            Testez automatiquement l'IA sur {trainingCases.length} cas cliniques de référence pour évaluer sa performance
          </p>

          {/* Boutons d'action */}
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={handleRunValidation}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  Validation en cours...
                </>
              ) : (
                <>
                  ▶️ Lancer Validation
                </>
              )}
            </Button>
            
            {report && (
              <Button 
                variant="secondary"
                onClick={handleDownloadReport}
                className="flex items-center gap-2"
              >
                📥 Télécharger Rapport HTML
              </Button>
            )}
          </div>

          {/* Barre de progression */}
          {isRunning && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Test en cours...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-primary-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Résultats */}
          {report && (
            <div className="space-y-6">
              {/* Métriques globales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
                  <div className="text-3xl font-bold text-green-700">{passRate}%</div>
                  <div className="text-sm text-green-600">Taux de Réussite</div>
                  <div className="text-xs text-green-500 mt-1">{report.successfulCases}/{report.totalCases} cas</div>
                </div>

                <div className={`bg-gradient-to-br ${report.metrics.recognitionAccuracy >= 95 ? 'from-blue-50 to-blue-100' : 'from-orange-50 to-orange-100'} p-6 rounded-lg border-l-4 ${report.metrics.recognitionAccuracy >= 95 ? 'border-blue-500' : 'border-orange-500'}`}>
                  <div className={`text-3xl font-bold ${report.metrics.recognitionAccuracy >= 95 ? 'text-blue-700' : 'text-orange-700'}`}>
                    {report.metrics.recognitionAccuracy.toFixed(1)}%
                  </div>
                  <div className={`text-sm ${report.metrics.recognitionAccuracy >= 95 ? 'text-blue-600' : 'text-orange-600'}`}>
                    Reconnaissance Lésions
                  </div>
                  <div className={`text-xs ${report.metrics.recognitionAccuracy >= 95 ? 'text-blue-500' : 'text-orange-500'} mt-1`}>
                    Seuil: 95%
                  </div>
                </div>

                <div className={`bg-gradient-to-br ${report.metrics.rateAccuracy >= 90 ? 'from-purple-50 to-purple-100' : 'from-red-50 to-red-100'} p-6 rounded-lg border-l-4 ${report.metrics.rateAccuracy >= 90 ? 'border-purple-500' : 'border-red-500'}`}>
                  <div className={`text-3xl font-bold ${report.metrics.rateAccuracy >= 90 ? 'text-purple-700' : 'text-red-700'}`}>
                    {report.metrics.rateAccuracy.toFixed(1)}%
                  </div>
                  <div className={`text-sm ${report.metrics.rateAccuracy >= 90 ? 'text-purple-600' : 'text-red-600'}`}>
                    Précision Taux IPP
                  </div>
                  <div className={`text-xs ${report.metrics.rateAccuracy >= 90 ? 'text-purple-500' : 'text-red-500'} mt-1`}>
                    Seuil: 90%
                  </div>
                </div>

                <div className={`bg-gradient-to-br ${report.metrics.responseTime <= 500 ? 'from-teal-50 to-teal-100' : 'from-yellow-50 to-yellow-100'} p-6 rounded-lg border-l-4 ${report.metrics.responseTime <= 500 ? 'border-teal-500' : 'border-yellow-500'}`}>
                  <div className={`text-3xl font-bold ${report.metrics.responseTime <= 500 ? 'text-teal-700' : 'text-yellow-700'}`}>
                    {report.metrics.responseTime.toFixed(0)}ms
                  </div>
                  <div className={`text-sm ${report.metrics.responseTime <= 500 ? 'text-teal-600' : 'text-yellow-600'}`}>
                    Temps Réponse
                  </div>
                  <div className={`text-xs ${report.metrics.responseTime <= 500 ? 'text-teal-500' : 'text-yellow-500'} mt-1`}>
                    Seuil: 500ms
                  </div>
                </div>
              </div>

              {/* Recommandations */}
              {report.recommendations.length > 0 && (
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                  <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                    💡 Recommandations d'Amélioration
                  </h3>
                  <ul className="space-y-2">
                    {report.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-orange-700 flex gap-2">
                        <span>•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cas échoués */}
              {report.failedCases > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                    ❌ Cas Échoués ({report.failedCases})
                  </h3>
                  <div className="space-y-3">
                    {report.results.filter(r => !r.success).map(result => (
                      <div key={result.caseId} className="bg-white p-3 rounded border border-red-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-semibold text-red-700">{result.caseId}</span>
                            <span className="text-xs text-gray-500 ml-2">{result.category}</span>
                          </div>
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                            {result.responseTime.toFixed(0)}ms
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-700 mb-2">
                          <strong>Input:</strong> "{result.userInput.substring(0, 80)}..."
                        </div>
                        
                        <div className="text-sm mb-2">
                          <span className="text-gray-600">Attendu:</span>{' '}
                          <span className="font-semibold text-green-700">{result.expectedInjury}</span>
                          <span className="text-gray-400 mx-2">→</span>
                          <span className="text-gray-600">Trouvé:</span>{' '}
                          <span className="font-semibold text-red-700">{result.foundInjury || 'Aucune'}</span>
                        </div>
                        
                        {result.errors.length > 0 && (
                          <div className="text-xs text-red-600 bg-red-50 p-2 rounded mt-2">
                            {result.errors.map((err, idx) => (
                              <div key={idx}>• {err}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cas réussis (aperçu) */}
              {report.successfulCases > 0 && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                    ✅ Cas Réussis ({report.successfulCases})
                  </h3>
                  <p className="text-sm text-green-700">
                    L'IA a correctement identifié {report.successfulCases} lésions sur {report.totalCases} avec une précision de taux moyenne excellente.
                  </p>
                  {report.successfulCases === report.totalCases && (
                    <p className="text-sm text-green-800 font-semibold mt-2">
                      🎉 Perfection ! Tous les cas ont été traités correctement.
                    </p>
                  )}
                </div>
              )}

              {/* Actions prioritaires */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3">🎯 Prochaines Étapes</h3>
                <ol className="space-y-2 text-sm text-blue-700">
                  <li>1. Télécharger le rapport HTML détaillé ci-dessus</li>
                  <li>2. Analyser les cas échoués et enrichir les mots-clés/synonymes dans <code className="bg-blue-100 px-1 rounded">AiAnalyzer.tsx</code></li>
                  <li>3. Ajouter de nouveaux cas d'entraînement dans <code className="bg-blue-100 px-1 rounded">trainingCases.ts</code></li>
                  <li>4. Re-exécuter la validation après chaque modification</li>
                  <li>5. Objectif: Atteindre 100% de reconnaissance avec {trainingCases.length}+ cas</li>
                </ol>
              </div>
            </div>
          )}

          {/* Info initiale */}
          {!report && !isRunning && (
            <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-lg">
              <h3 className="font-bold text-slate-800 mb-3">📚 À propos de cette validation</h3>
              <p className="text-sm text-slate-700 mb-3">
                Ce module teste l'IA locale sur <strong>{trainingCases.length} cas cliniques de référence</strong> couvrant :
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• Lésions oculaires (cataracte, uvéite, décollement rétine)</li>
                <li>• Membres inférieurs (genou LCA/LCP, cheville, pied)</li>
                <li>• Rachis (lombaire, cervical)</li>
                <li>• Membres supérieurs (épaule, main)</li>
                <li>• Nerfs périphériques (radial, sciatique)</li>
                <li>• Variations linguistiques et langage familier</li>
              </ul>
              <p className="text-sm text-slate-700 mt-3">
                Chaque cas vérifie : reconnaissance lésion, précision taux IPP (±3%), temps de réponse.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
