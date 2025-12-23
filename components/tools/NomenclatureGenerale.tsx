import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { searchNomenclature, NomenclatureRule } from '../../services/nomenclatureData';

export const NomenclatureGenerale: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<NomenclatureRule[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState<'bareme' | 'manuel' | 'atmp'>('bareme');
    const [calculationInputs, setCalculationInputs] = useState<{ [key: string]: string }>({});
    const [calculationResult, setCalculationResult] = useState<string>('');

    // Recherche sémantique dans les règles de nomenclature
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setCalculationResult('');
        setCalculationInputs({}); // Reset inputs

        // Simuler un léger délai pour l'expérience utilisateur
        setTimeout(() => {
            const results = searchNomenclature(searchQuery, selectedPdf);
            setSearchResults(results);
            setIsLoading(false);
        }, 400);
    };

    const handleCalculate = (rule: NomenclatureRule) => {
        if (!rule.calculation || !rule.variables) {
            setCalculationResult('⚠️ Aucune formule de calcul disponible pour cette règle');
            return;
        }

        try {
            // Vérifier si toutes les variables ont des valeurs
            const allInputsProvided = rule.variables.every(v => 
                calculationInputs[v.name]?.trim() && !isNaN(parseFloat(calculationInputs[v.name]))
            );

            if (!allInputsProvided) {
                setCalculationResult('⚠️ Veuillez renseigner toutes les variables nécessaires avec des valeurs numériques');
                return;
            }

            // Calculs selon le type de règle
            if (rule.id === 'balthazard') {
                const ipp1 = parseFloat(calculationInputs['IPP1'] || '0');
                const ipp2 = parseFloat(calculationInputs['IPP2'] || '0');
                const ipp3 = calculationInputs['IPP3'] ? parseFloat(calculationInputs['IPP3']) : null;
                
                let result = ipp1 + ((100 - ipp1) * ipp2 / 100);
                
                if (ipp3 !== null) {
                    result = result + ((100 - result) * ipp3 / 100);
                    setCalculationResult(`✅ IPP totale (3 lésions): ${result.toFixed(2)}%\n` +
                        `Détail: IPP1+IPP2 = ${(ipp1 + ((100 - ipp1) * ipp2 / 100)).toFixed(2)}%, puis +IPP3 = ${result.toFixed(2)}%`);
                } else {
                    setCalculationResult(`✅ IPP totale (2 lésions): ${result.toFixed(2)}%`);
                }
            } 
            else if (rule.id === 'art12') {
                const tauxAnterieur = parseFloat(calculationInputs['taux_antérieur'] || '0');
                const tauxGlobal = parseFloat(calculationInputs['taux_global'] || '0');
                
                if (tauxAnterieur >= 100) {
                    setCalculationResult('❌ Le taux antérieur ne peut pas être ≥ 100%');
                    return;
                }
                
                if (tauxGlobal <= tauxAnterieur) {
                    setCalculationResult('❌ Le taux global doit être supérieur au taux antérieur');
                    return;
                }
                
                const c1 = 100 - tauxAnterieur;
                const c2 = 100 - tauxGlobal;
                const result = ((c1 - c2) / c1) * 100;
                
                setCalculationResult(
                    `✅ IPP imputable au nouvel accident: ${result.toFixed(2)}%\n\n` +
                    `Détail du calcul:\n` +
                    `• Capacité avant: C1 = 100 - ${tauxAnterieur} = ${c1}%\n` +
                    `• Capacité après: C2 = 100 - ${tauxGlobal} = ${c2}%\n` +
                    `• IPP = ((${c1} - ${c2}) / ${c1}) × 100 = ${result.toFixed(2)}%`
                );
            }
            else if (rule.id === 'rente_travail') {
                const salaire = parseFloat(calculationInputs['Salaire_annuel'] || '0');
                const ipp = parseFloat(calculationInputs['IPP'] || '0');
                
                if (ipp < 10) {
                    setCalculationResult('⚠️ Pour un taux < 10%, une indemnité en capital est versée (pas de rente)');
                    return;
                }
                
                let rente: number;
                if (ipp <= 50) {
                    rente = salaire * (ipp / 2) / 100;
                } else {
                    const partie1 = salaire * (50 / 2) / 100;
                    const partie2 = salaire * ((ipp - 50) * 1.5) / 100;
                    rente = partie1 + partie2;
                }
                
                const renteTrimestrielle = rente / 4;
                
                setCalculationResult(
                    `✅ Calcul de la rente:\n\n` +
                    `• Rente annuelle: ${rente.toFixed(2)} DA\n` +
                    `• Rente trimestrielle: ${renteTrimestrielle.toFixed(2)} DA\n` +
                    `• Rente mensuelle (indicatif): ${(rente / 12).toFixed(2)} DA`
                );
            }
            else if (rule.id === 'capacite_restante') {
                const ipp = parseFloat(calculationInputs['IPP'] || '0');
                const capacite = 100 - ipp;
                
                setCalculationResult(
                    `✅ Capacité restante: ${capacite.toFixed(2)}%\n\n` +
                    `Pour un taux d'IPP de ${ipp}%, la personne conserve ${capacite.toFixed(2)}% de sa capacité fonctionnelle.`
                );
            }
            else if (rule.id === 'ipp_sociale') {
                const ippMedicale = parseFloat(calculationInputs['IPP_médicale'] || '0');
                const ippSociale = parseFloat(calculationInputs['IPP_sociale'] || '0');
                const total = Math.min(100, ippMedicale + ippSociale);
                
                setCalculationResult(
                    `✅ IPP globale: ${total.toFixed(2)}%\n\n` +
                    `Composition:\n` +
                    `• Taux médical: ${ippMedicale}%\n` +
                    `• Majoration sociale: ${ippSociale}%\n` +
                    `• Total: ${total}%` + (total === 100 ? ' (plafonné à 100%)' : '')
                );
            }
            else {
                setCalculationResult('⚠️ Calcul non implémenté pour cette règle');
            }
        } catch (error) {
            setCalculationResult('❌ Erreur dans le calcul. Vérifiez vos valeurs.');
        }
    };

    const handleInputChange = (variable: string, value: string) => {
        setCalculationInputs(prev => ({
            ...prev,
            [variable]: value
        }));
        // Reset le résultat quand on change une valeur
        setCalculationResult('');
    };

    const renderCalculationInputs = (rule: NomenclatureRule) => {
        if (!rule.variables || rule.variables.length === 0) return null;

        return (
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                <p className="text-sm font-medium text-slate-700">
                    📊 Calculer avec vos valeurs:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rule.variables.map((variable) => (
                        <div key={variable.name}>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                                {variable.description}
                                {variable.unit && ` (${variable.unit})`}
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min={variable.min}
                                max={variable.max}
                                value={calculationInputs[variable.name] || ''}
                                onChange={(e) => handleInputChange(variable.name, e.target.value)}
                                placeholder={variable.min !== undefined ? `${variable.min}-${variable.max || '∞'}` : '0.00'}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => handleCalculate(rule)}
                    className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                >
                    🧮 Calculer
                </button>
                {calculationResult && (
                    <div className={`mt-3 p-3 rounded-lg text-sm font-medium whitespace-pre-line ${
                        calculationResult.includes('✅')
                            ? 'bg-green-100 text-green-800'
                            : calculationResult.includes('❌')
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                    }`}>
                        {calculationResult}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 space-y-6">
            {/* En-tête */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    📚 Nomenclature Générale
                </h2>
                <p className="text-slate-600 text-sm">
                    Recherchez des règles et lois dans les documents de référence et effectuez des calculs
                </p>
            </div>

            {/* Sélection du PDF */}
            <Card>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">
                        Base de données de référence
                    </label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedPdf('bareme')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedPdf === 'bareme'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                        >
                            📖 Barème Indicatif
                        </button>
                        <button
                            onClick={() => setSelectedPdf('atmp')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedPdf === 'atmp'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                        >
                            ⚖️ Barème AT-MP
                        </button>
                        <button
                            onClick={() => setSelectedPdf('manuel')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedPdf === 'manuel'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                        >
                            🏥 Manuel Appareillage
                        </button>
                    </div>
                </div>
            </Card>

            {/* Barre de recherche */}
            <Card>
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-slate-700">
                        Recherche sémantique
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="Ex: calcul taux antérieur, formule balthazard, cumul IPP..."
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isLoading || !searchQuery.trim()}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isLoading ? '🔍 Recherche...' : '🔍 Rechercher'}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500">
                        💡 Conseil: Utilisez des termes naturels comme "comment calculer un taux antérieur" 
                        ou "formule de cumul des lésions"
                    </p>
                </div>
            </Card>

            {/* Résultats de recherche */}
            {searchResults.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-800">
                        📋 Résultats trouvés ({searchResults.length})
                    </h3>
                    {searchResults.map((result, index) => (
                        <Card key={result.id} className="bg-gradient-to-r from-blue-50 to-white">
                            <div className="space-y-4">
                                {/* En-tête du résultat */}
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-800">
                                            {result.rule}
                                        </h4>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                                {result.article}
                                            </span>
                                            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                                {result.source === 'bareme' ? '📖 Barème Indicatif' : 
                                                 result.source === 'atmp' ? '⚖️ AT-MP' : '🏥 Manuel'}
                                            </span>
                                            {result.calculation && (
                                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                    🧮 Calcul disponible
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                    {result.description}
                                </p>

                                {/* Exemples */}
                                {result.examples && result.examples.length > 0 && (
                                    <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                                        <p className="text-xs font-semibold text-amber-800 mb-2">💡 Exemples:</p>
                                        <ul className="text-xs text-amber-700 space-y-1">
                                            {result.examples.map((example, idx) => (
                                                <li key={idx}>• {example}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Formule de calcul */}
                                {result.calculation && (
                                    <div className="mt-4 space-y-3">
                                        <div className="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                            <pre className="whitespace-pre-wrap">{result.calculation}</pre>
                                        </div>

                                        {/* Zone de saisie pour les variables */}
                                        {renderCalculationInputs(result)}
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Message si aucun résultat */}
            {!isLoading && searchResults.length === 0 && searchQuery && (
                <Card className="text-center py-8">
                    <p className="text-slate-500">
                        🔍 Aucun résultat trouvé pour "{searchQuery}"
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                        Essayez avec d'autres termes de recherche
                    </p>
                </Card>
            )}

            {/* Guide d'utilisation */}
            {!searchQuery && (
                <Card className="bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                            💡 Comment utiliser cet outil?
                        </h4>
                        <ul className="text-sm text-slate-600 space-y-2">
                            <li>✅ Sélectionnez d'abord la base de données de référence (Barème, AT-MP, Manuel)</li>
                            <li>✅ Effectuez une recherche sémantique en langage naturel</li>
                            <li>✅ Consultez les règles et lois trouvées avec leurs références</li>
                            <li>✅ Si une formule de calcul est disponible, saisissez vos valeurs</li>
                            <li>✅ Obtenez le résultat calculé automatiquement</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-amber-200">
                            <p className="text-xs text-slate-500">
                                <strong>Exemples de recherches:</strong> "article 12", "formule balthazard", 
                                "cumul des taux", "calcul capacité", "taux global"
                            </p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};
