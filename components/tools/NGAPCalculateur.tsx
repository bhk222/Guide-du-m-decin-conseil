import React, { useState, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Search, Plus, Trash2, Info, FileText, Calculator, AlertTriangle } from 'lucide-react';
import {
    rechercherActe,
    calculerActes,
    type ActeNGAP,
    type ResultatCalcul,
} from '../../services/ngapService';

interface ActeSelectionne {
    acte: ActeNGAP;
    quantite: number;
}

export const NGAPCalculateur: React.FC = () => {
    const [rechercheQuery, setRechercheQuery] = useState('');
    const [resultatsRecherche, setResultatsRecherche] = useState<ActeNGAP[]>([]);
    const [actesSelectionnes, setActesSelectionnes] = useState<ActeSelectionne[]>([]);
    const [resultatCalcul, setResultatCalcul] = useState<ResultatCalcul | null>(null);
    const [isTrauma, setIsTrauma] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const handleRecherche = useCallback(() => {
        if (!rechercheQuery.trim()) { setResultatsRecherche([]); return; }
        setResultatsRecherche(rechercherActe(rechercheQuery));
    }, [rechercheQuery]);

    const ajouterActe = useCallback((acte: ActeNGAP) => {
        setActesSelectionnes(prev => {
            const existing = prev.find(a => a.acte.code === acte.code && a.acte.codeNGAP === acte.codeNGAP);
            if (existing) {
                return prev.map(a => a.acte.code === acte.code && a.acte.codeNGAP === acte.codeNGAP ? { ...a, quantite: a.quantite + 1 } : a);
            }
            return [...prev, { acte, quantite: 1 }];
        });
        setResultatsRecherche([]);
        setRechercheQuery('');
        setResultatCalcul(null);
    }, []);

    const retirerActe = useCallback((index: number) => {
        setActesSelectionnes(prev => prev.filter((_, i) => i !== index));
        setResultatCalcul(null);
    }, []);

    const modifierQuantite = useCallback((index: number, delta: number) => {
        setActesSelectionnes(prev => prev.map((item, i) => i === index ? { ...item, quantite: Math.max(1, item.quantite + delta) } : item));
        setResultatCalcul(null);
    }, []);

    const handleCalculer = useCallback(() => {
        if (actesSelectionnes.length === 0) return;
        setResultatCalcul(calculerActes(actesSelectionnes, isTrauma));
    }, [actesSelectionnes, isTrauma]);

    const reinitialiser = useCallback(() => {
        setActesSelectionnes([]);
        setResultatCalcul(null);
        setRechercheQuery('');
        setResultatsRecherche([]);
    }, []);

    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">🏥 Nomenclature & Calcul NGAP</h2>
                <p className="text-slate-600">Recherche sémantique + Calcul avec règles de cumul (Art. 12)</p>
            </div>

            {/* Guide */}
            {showInfo && (
                <Card className="bg-blue-50 border-blue-200">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-blue-900 flex items-center gap-2"><Info className="w-5 h-5" /> Guide d&apos;utilisation</h3>
                            <button onClick={() => setShowInfo(false)} className="text-blue-600 hover:text-blue-800">✕</button>
                        </div>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p>• <strong>Abréviations :</strong> FNS, NFS, VS, CRP, ECG, EEG, EMG, EFR, IRM, TDM...</p>
                            <p>• <strong>Langage naturel :</strong> &quot;prise de sang&quot;, &quot;radio thorax&quot;, &quot;kiné&quot;, &quot;os cassé&quot;...</p>
                            <p>• <strong>Codes NGAP :</strong> K 50, B 30, R 10, C, CS, AMI 2...</p>
                            <p>• <strong>Anatomie :</strong> genou, épaule, hanche, rachis, crâne...</p>
                            <p className="pt-1 border-t border-blue-200">📌 <strong>Cumul Art. 12 :</strong> 1er acte K=100%, 2ème=50% (75% trauma), 3ème+=0%. Radiologie: cumulable à 100%</p>
                        </div>
                    </div>
                </Card>
            )}
            {!showInfo && (
                <button onClick={() => setShowInfo(true)} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                    <Info className="w-4 h-4" /> Afficher le guide
                </button>
            )}

            {/* Recherche */}
            <Card>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                <Search className="w-5 h-5 text-blue-600" /> Recherche d&apos;Actes
                            </h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={rechercheQuery}
                                    onChange={(e) => setRechercheQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleRecherche()}
                                    placeholder="FNS, radio thorax, kiné, fracture genou, B30, K50, consultation..."
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button onClick={handleRecherche} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                    <Search className="w-4 h-4" /> Rechercher
                                </button>
                            </div>

                            {resultatsRecherche.length > 0 && (
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {resultatsRecherche.map((acte, idx) => (
                                        <div key={`${acte.code}-${acte.codeNGAP}-${idx}`}
                                            className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer border border-slate-200 transition-colors"
                                            onClick={() => ajouterActe(acte)}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-mono font-bold text-blue-600 text-lg">{acte.codeNGAP}</span>
                                                        {acte.code !== acte.codeNGAP && <span className="text-xs text-slate-500">({acte.code})</span>}
                                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{acte.categorie}</span>
                                                        {acte.entente && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">EP</span>}
                                                    </div>
                                                    <p className="text-sm text-slate-700 mt-1">{acte.libelle}</p>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); ajouterActe(acte); }}
                                                    className="ml-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex-shrink-0" title="Ajouter">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Actes sélectionnés */}
                    {actesSelectionnes.length > 0 && (
                        <Card>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-green-600" /> Actes sélectionnés ({actesSelectionnes.length})
                                    </h3>
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={isTrauma}
                                                onChange={(e) => { setIsTrauma(e.target.checked); setResultatCalcul(null); }}
                                                className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500" />
                                            <span className="text-sm flex items-center gap-1">
                                                <AlertTriangle className="w-4 h-4 text-orange-500" /> Trauma
                                            </span>
                                        </label>
                                        <button onClick={reinitialiser} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm flex items-center gap-1">
                                            <Trash2 className="w-3 h-3" /> Effacer
                                        </button>
                                    </div>
                                </div>

                                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-100">
                                            <tr>
                                                <th className="px-3 py-2 text-left">Code NGAP</th>
                                                <th className="px-3 py-2 text-left">Libellé</th>
                                                <th className="px-3 py-2 text-center">Lettre</th>
                                                <th className="px-3 py-2 text-center">Coef</th>
                                                <th className="px-3 py-2 text-center">Qté</th>
                                                <th className="px-3 py-2 text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {actesSelectionnes.map((item, idx) => (
                                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                    <td className="px-3 py-2 font-mono font-bold text-blue-600">{item.acte.codeNGAP}</td>
                                                    <td className="px-3 py-2 text-slate-700 max-w-xs truncate" title={item.acte.libelle}>{item.acte.libelle}</td>
                                                    <td className="px-3 py-2 text-center"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">{item.acte.lettreCle}</span></td>
                                                    <td className="px-3 py-2 text-center font-mono">{item.acte.coefficient}</td>
                                                    <td className="px-3 py-2 text-center">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button onClick={() => modifierQuantite(idx, -1)} className="w-6 h-6 bg-slate-200 rounded hover:bg-slate-300 text-sm font-bold">−</button>
                                                            <span className="w-8 text-center font-semibold">{item.quantite}</span>
                                                            <button onClick={() => modifierQuantite(idx, 1)} className="w-6 h-6 bg-slate-200 rounded hover:bg-slate-300 text-sm font-bold">+</button>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <button onClick={() => retirerActe(idx)} className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-center">
                                    <button onClick={handleCalculer} className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg flex items-center gap-2 shadow-lg">
                                        <Calculator className="w-5 h-5" /> Calculer le cumul
                                    </button>
                                </div>
                            </div>
                        </Card>
                    )}

            {/* Résultats */}
            {resultatCalcul && resultatCalcul.actes.length > 0 && (
                <ResultatsCodeCard resultat={resultatCalcul} isTrauma={isTrauma} />
            )}
        </div>
    );
};

// ============================================
// Sous-composant: Résultats mode Code
// ============================================
const ResultatsCodeCard: React.FC<{ resultat: ResultatCalcul; isTrauma: boolean }> = ({ resultat, isTrauma }) => (
    <Card className="border-2 border-green-300 bg-gradient-to-br from-white to-green-50">
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
                <Calculator className="w-5 h-5" /> Résultat du calcul NGAP {isTrauma && <span className="text-orange-600 text-sm">(Trauma)</span>}
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="px-3 py-2 text-left">N°</th>
                            <th className="px-3 py-2 text-left">Code NGAP</th>
                            <th className="px-3 py-2 text-left">Libellé</th>
                            <th className="px-3 py-2 text-center">Lettre</th>
                            <th className="px-3 py-2 text-center">Coef</th>
                            <th className="px-3 py-2 text-center">Qté</th>
                            <th className="px-3 py-2 text-center">Taux Cumul</th>
                            <th className="px-3 py-2 text-left">Règle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultat.actes.map((ac, idx) => (
                            <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-green-50/50'} ${ac.taux === 0 ? 'opacity-50' : ''}`}>
                                <td className="px-3 py-2 text-slate-500">{ac.ordre}</td>
                                <td className="px-3 py-2 font-mono font-bold text-blue-600">{ac.acte.codeNGAP}</td>
                                <td className="px-3 py-2 text-slate-700 max-w-[200px] truncate" title={ac.acte.libelle}>{ac.acte.libelle}</td>
                                <td className="px-3 py-2 text-center"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-medium">{ac.acte.lettreCle}</span></td>
                                <td className="px-3 py-2 text-center font-mono">{ac.acte.coefficient}</td>
                                <td className="px-3 py-2 text-center">{ac.quantite}</td>
                                <td className="px-3 py-2 text-center">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                        ac.taux === 100 ? 'bg-green-200 text-green-800' :
                                        ac.taux >= 50 ? 'bg-yellow-200 text-yellow-800' :
                                        'bg-red-200 text-red-800'
                                    }`}>{ac.taux}%</span>
                                </td>
                                <td className="px-3 py-2 text-xs text-slate-500 max-w-[180px] truncate" title={ac.regle}>{ac.regle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {resultat.regles.length > 0 && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-sm font-semibold text-slate-700 mb-1">Règles de cumul appliquées :</p>
                    {resultat.regles.map((regle, idx) => (
                        <p key={idx} className="text-xs text-slate-600">{regle}</p>
                    ))}
                </div>
            )}
        </div>
    </Card>
);
