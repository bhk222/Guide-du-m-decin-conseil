import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Search, Plus, Trash2, Info, FileText } from 'lucide-react';
import {
    rechercherActe,
    calculerDepuisExpression,
    obtenirCategories,
    obtenirActesParCategorie,
    type ActeNGAP,
    type ResultatCalcul
} from '../../services/ngapService';

export const NGAPCalculateur: React.FC = () => {
    const [rechercheQuery, setRechercheQuery] = useState('');
    const [resultatsRecherche, setResultatsRecherche] = useState<ActeNGAP[]>([]);
    const [expressionCalcul, setExpressionCalcul] = useState('');
    const [resultatCalcul, setResultatCalcul] = useState<ResultatCalcul | null>(null);
    const [categorieSelectionnee, setCategorieSelectionnee] = useState<string>('');
    const [showInfo, setShowInfo] = useState(false);

    const handleRecherche = () => {
        if (!rechercheQuery.trim()) {
            setResultatsRecherche([]);
            return;
        }
        const resultats = rechercherActe(rechercheQuery);
        setResultatsRecherche(resultats);
    };

    const ajouterActe = (code: string) => {
        if (expressionCalcul) {
            setExpressionCalcul(prev => prev + ' + ' + code);
        } else {
            setExpressionCalcul(code);
        }
    };

    const handleCalculer = () => {
        if (!expressionCalcul.trim()) {
            alert('⚠️ Veuillez entrer une expression');
            return;
        }
        const resultat = calculerDepuisExpression(expressionCalcul);
        setResultatCalcul(resultat);
    };

    const reinitialiser = () => {
        setExpressionCalcul('');
        setResultatCalcul(null);
    };

    const categories = obtenirCategories();

    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    🏥 Recherche NGAP
                </h2>
                <p className="text-slate-600">
                    Nomenclature Générale des Actes Professionnels - Recherche de Codes
                </p>
            </div>

            {showInfo && (
                <Card className="bg-blue-50 border-blue-200">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                                <Info className="w-5 h-5" />
                                Guide d'utilisation
                            </h3>
                            <button
                                onClick={() => setShowInfo(false)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p>• <strong>Langage naturel:</strong> "prise de sang" → B30, "voir docteur" → C</p>
                            <p>• <strong>Termes médicaux:</strong> "FNS", "hémogramme", "radio thorax"</p>
                            <p>• <strong>Codes directs:</strong> B30, C, K2, R10</p>
                        </div>
                    </div>
                </Card>
            )}

            {!showInfo && (
                <button
                    onClick={() => setShowInfo(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                    <Info className="w-4 h-4" />
                    Afficher le guide
                </button>
            )}

            <Card>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                        <Search className="w-5 h-5 text-blue-600" />
                        Recherche d'Actes
                    </h3>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={rechercheQuery}
                            onChange={(e) => setRechercheQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleRecherche()}
                            placeholder="Ex: prise de sang, voir médecin, radio poumon..."
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            onClick={handleRecherche}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Rechercher
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-slate-600">Catégories:</span>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setCategorieSelectionnee(cat);
                                    setResultatsRecherche(obtenirActesParCategorie(cat));
                                }}
                                className={`px-3 py-1 text-sm rounded-full ${
                                    categorieSelectionnee === cat
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {resultatsRecherche.length > 0 && (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {resultatsRecherche.map(acte => (
                                <div
                                    key={acte.code}
                                    className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer border border-slate-200"
                                    onClick={() => ajouterActe(acte.code)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <span className="font-mono font-bold text-blue-600 text-lg">
                                                {acte.code}
                                            </span>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">
                                                {acte.categorie}
                                            </span>
                                            <p className="text-sm text-slate-700 mt-1">{acte.libelle}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                ajouterActe(acte.code);
                                            }}
                                            className="ml-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Card>

            <Card>
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        Construction de la Formule
                    </h3>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={expressionCalcul}
                            onChange={(e) => setExpressionCalcul(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCalculer()}
                            placeholder="Ex: B30 + C + K2"
                            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-mono text-lg"
                        />
                        <button
                            onClick={handleCalculer}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Afficher
                        </button>
                        <button
                            onClick={reinitialiser}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {resultatCalcul && resultatCalcul.actes.length > 0 && (
                        <div className="mt-4 space-y-4">
                            <div className="border border-slate-200 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left">N°</th>
                                            <th className="px-4 py-3 text-left">Code NGAP</th>
                                            <th className="px-4 py-3 text-left">Description</th>
                                            <th className="px-4 py-3 text-center">Quantité</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultatCalcul.actes.map((acte, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                <td className="px-4 py-3">{idx + 1}</td>
                                                <td className="px-4 py-3 font-mono font-bold text-blue-600 text-lg">
                                                    {acte.acte.code}
                                                </td>
                                                <td className="px-4 py-3">{acte.acte.libelle}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                                        {acte.quantite}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-3">
                                    Formule NGAP à utiliser
                                </h4>
                                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                                    <p className="font-mono text-2xl text-center text-slate-800 font-bold">
                                        {expressionCalcul}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
