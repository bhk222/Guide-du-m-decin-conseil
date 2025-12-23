import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Upload, Search, Plus, Calculator, FileText, Trash2, Download, X, Database, Info, RefreshCw } from 'lucide-react';
import nomenclatureData from '../../data/nomenclature-static.json';

interface ActeMedical {
    code: string;
    libelle: string;
    tarif: number;
    coefficient?: number;
    categorie?: string;
    lettreCle?: string;
}

interface ActeSelectionne {
    id: string;
    acte: ActeMedical;
    quantite: number;
}

export const NomenclatureGenerale: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [actesTrouves, setActesTrouves] = useState<ActeMedical[]>([]);
    const [actesSelectionnes, setActesSelectionnes] = useState<ActeSelectionne[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [baseDeDonnees, setBaseDeDonnees] = useState<ActeMedical[]>([]);
    const [showStats, setShowStats] = useState(false);

    // Charger la base de données intégrée au démarrage
    useEffect(() => {
        if (nomenclatureData && nomenclatureData.actes) {
            setBaseDeDonnees(nomenclatureData.actes);
            console.log(`✅ Base de données chargée: ${nomenclatureData.actes.length} actes`);
        }
    }, []);

    // Recherche sémantique dans les actes
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setActesTrouves([]);
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            // Recherche dans la base de données intégrée
            const query = searchQuery.toLowerCase().trim();
            const queryWords = query.split(/\s+/);

            // Détecter recherche par code lettre-clé (ex: "B 30", "E 15", "C 20")
            const codeMatch = query.match(/^([A-Z])\s*(\d+)$/i);
            
            const resultats = baseDeDonnees
                .map(acte => {
                    let score = 0;
                    const libelleLower = acte.libelle.toLowerCase();
                    const codeLower = acte.code.toLowerCase();

                    // Recherche par code lettre-clé (ex: "B 30")
                    if (codeMatch) {
                        const [, lettre, coef] = codeMatch;
                        const lettreUpper = lettre.toUpperCase();
                        const coefNum = parseInt(coef);
                        
                        // Vérifier si l'acte correspond à cette lettre et coefficient
                        if (acte.lettreCle === lettreUpper && acte.coefficient === coefNum) {
                            score += 200; // Score très élevé pour correspondance exacte lettre-clé
                        } else if (acte.lettreCle === lettreUpper) {
                            score += 100; // Même lettre-clé
                        }
                    }

                    // Code exact
                    if (codeLower === query) score += 100;
                    else if (codeLower.includes(query)) score += 50;

                    // Libellé
                    queryWords.forEach(word => {
                        if (libelleLower.includes(word)) score += 10;
                    });

                    // Catégorie
                    if (acte.categorie?.toLowerCase().includes(query)) score += 20;

                    return { acte, score };
                })
                .filter(item => item.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 20)
                .map(item => item.acte);

            setActesTrouves(resultats);
            setIsLoading(false);
        }, 300);
    };

    // Ajouter un acte à la sélection
    const ajouterActe = (acte: ActeMedical) => {
        const nouvelActe: ActeSelectionne = {
            id: Date.now().toString(),
            acte: acte,
            quantite: 1
        };
        setActesSelectionnes([...actesSelectionnes, nouvelActe]);
    };

    // Supprimer un acte
    const supprimerActe = (id: string) => {
        setActesSelectionnes(actesSelectionnes.filter(a => a.id !== id));
    };

    // Modifier la quantité
    const modifierQuantite = (id: string, quantite: number) => {
        if (quantite < 1) return;
        setActesSelectionnes(actesSelectionnes.map(a =>
            a.id === id ? { ...a, quantite } : a
        ));
    };

    // Calculer le total avec règles de cumul
    const calculerTotal = () => {
        if (actesSelectionnes.length === 0) return { montantBrut: 0, montantNet: 0, regles: [] };

        let montantBrut = 0;
        let montantNet = 0;
        const regles: string[] = [];

        // Règle 1: Addition simple pour un seul acte
        if (actesSelectionnes.length === 1) {
            const acte = actesSelectionnes[0];
            const tarif = acte.acte.tarif * (acte.acte.coefficient || 1) * acte.quantite;
            montantBrut = tarif;
            montantNet = tarif;
            regles.push(`✓ Acte unique: ${acte.acte.libelle} (${acte.acte.code})`);
            regles.push(`  Tarif: ${acte.acte.tarif} DA × Coef ${acte.acte.coefficient} × ${acte.quantite} = ${tarif.toFixed(2)} DA`);
        } 
        // Règle 2: Cumul avec décote pour actes multiples
        else {
            // Premier acte à 100%
            const premierActe = actesSelectionnes[0];
            const tarifPremier = premierActe.acte.tarif * (premierActe.acte.coefficient || 1) * premierActe.quantite;
            montantBrut += tarifPremier;
            montantNet += tarifPremier;
            regles.push(`✓ 1er acte (100%): ${premierActe.acte.libelle} = ${tarifPremier.toFixed(2)} DA`);

            // Actes suivants à 50% (règle de cumul standard de la nomenclature)
            for (let i = 1; i < actesSelectionnes.length; i++) {
                const acte = actesSelectionnes[i];
                const tarifBrut = acte.acte.tarif * (acte.acte.coefficient || 1) * acte.quantite;
                const tarifNet = tarifBrut * 0.5; // 50% pour actes complémentaires
                
                montantBrut += tarifBrut;
                montantNet += tarifNet;
                regles.push(`✓ Acte ${i + 1} (50%): ${acte.acte.libelle} = ${tarifNet.toFixed(2)} DA`);
            }

            regles.push('');
            regles.push('📋 Règle appliquée: Premier acte 100%, actes complémentaires 50%');
            regles.push(`   (Conformément aux règles de cumul de la nomenclature générale)`);
        }

        return { montantBrut, montantNet, regles };
    };

    const { montantBrut, montantNet, regles } = calculerTotal();

    // Statistiques de la base de données
    const stats = baseDeDonnees.length > 0 ? {
        total: baseDeDonnees.length,
        categories: baseDeDonnees.reduce((acc, acte) => {
            const cat = acte.categorie || 'Autre';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number }),
        tarifMoyen: baseDeDonnees.reduce((sum, acte) => 
            sum + (acte.tarif * (acte.coefficient || 1)), 0) / baseDeDonnees.length
    } : null;

    return (
        <div className="p-4 space-y-6 max-w-7xl mx-auto">
            {/* En-tête */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    📚 Nomenclature Générale des Actes Médicaux
                </h2>
                <p className="text-slate-600">
                    Recherche sémantique d'actes médicaux et calcul automatique selon les règles de cumul
                </p>
            </div>

            {/* Base de données intégrée */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <Database size={20} className="text-indigo-600" />
                                Base de données Nomenclature Intégrée
                            </h3>
                            {baseDeDonnees.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                                        ✅ Base de données active: <span className="font-bold text-green-800">{baseDeDonnees.length} actes médicaux</span>
                                    </p>
                                    <p className="text-xs text-slate-600">
                                        📚 Source: {(nomenclatureData as any).source || 'acte.pdf'} • Version: {(nomenclatureData as any).version || '1.0'}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowStats(!showStats)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 flex items-center gap-1"
                                        >
                                            <Info size={14} />
                                            {showStats ? 'Masquer stats' : 'Voir stats'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-amber-700">
                                    ⚠️ Base de données non chargée
                                </p>
                            )}
                        </div>
                        <div className="bg-indigo-100 rounded-full p-4">
                            <Database size={32} className="text-indigo-600" />
                        </div>
                    </div>

                    {/* Statistiques */}
                    {showStats && stats && (
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <h4 className="font-semibold text-slate-800 mb-3">📊 Statistiques de la base de données</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary-600">{stats.total}</div>
                                    <div className="text-xs text-slate-600">Total actes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{Object.keys(stats.categories).length}</div>
                                    <div className="text-xs text-slate-600">Catégories</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{stats.tarifMoyen.toFixed(0)}</div>
                                    <div className="text-xs text-slate-600">Tarif moyen (DA)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {Math.max(...Object.values(stats.categories))}
                                    </div>
                                    <div className="text-xs text-slate-600">Catégorie max</div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <p className="text-xs font-semibold text-slate-700 mb-2">Répartition par catégorie:</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                                    {Object.entries(stats.categories).map(([cat, count]) => (
                                        <div key={cat} className="flex justify-between bg-slate-50 px-2 py-1 rounded">
                                            <span className="text-slate-700">{cat}:</span>
                                            <span className="font-semibold text-slate-900">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </Card>

            {/* Recherche */}
            <Card>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    🔍 Rechercher un acte médical
                </h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Ex: consultation, radiographie, B 30, E 15, 0001..."
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
                    >
                        <Search size={20} />
                        {isLoading ? 'Recherche...' : 'Rechercher'}
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                    💡 Recherchez par code (B 30, E 15), numéro (0001) ou mots-clés (consultation, radio...)
                </p>
            </Card>

            {/* Résultats de recherche */}
            {actesTrouves.length > 0 && (
                <Card>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                        📋 Résultats ({actesTrouves.length} actes trouvés)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {actesTrouves.map((acte) => (
                            <div
                                key={acte.code}
                                className="border border-slate-200 rounded-lg p-4 hover:border-primary-400 hover:bg-primary-50 transition-all"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-mono font-bold">
                                                {acte.code}
                                            </span>
                                            {acte.lettreCle && (
                                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-mono font-bold">
                                                    {acte.lettreCle} {acte.coefficient}
                                                </span>
                                            )}
                                            <span className="text-xs text-slate-500">{acte.categorie}</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-800">{acte.libelle}</p>
                                        <p className="text-xs text-slate-600 mt-1">
                                            {acte.tarif} DA × Coef {acte.coefficient} = <span className="font-bold">{(acte.tarif * (acte.coefficient || 1)).toFixed(2)} DA</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => ajouterActe(acte)}
                                        className="ml-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
                                    >
                                        <Plus size={16} />
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Actes sélectionnés et calcul */}
            {actesSelectionnes.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Liste des actes */}
                    <Card>
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <FileText size={20} />
                            Actes sélectionnés ({actesSelectionnes.length})
                        </h3>
                        <div className="space-y-3">
                            {actesSelectionnes.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="border border-slate-200 rounded-lg p-3 bg-slate-50"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="inline-block w-6 h-6 bg-primary-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                                                    {index + 1}
                                                </span>
                                                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-mono font-bold">
                                                    {item.acte.code}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-slate-800">{item.acte.libelle}</p>
                                        </div>
                                        <button
                                            onClick={() => supprimerActe(item.id)}
                                            className="ml-2 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <label className="text-xs text-slate-600">Quantité:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantite}
                                            onChange={(e) => modifierQuantite(item.id, parseInt(e.target.value) || 1)}
                                            className="w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                                        />
                                        <span className="text-xs text-slate-600">
                                            = {(item.acte.tarif * (item.acte.coefficient || 1) * item.quantite).toFixed(2)} DA
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setActesSelectionnes([])}
                            className="w-full mt-4 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors font-medium"
                        >
                            Tout effacer
                        </button>
                    </Card>

                    {/* Calcul du total */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Calculator size={20} />
                            Calcul du montant total
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Détail des règles */}
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <p className="text-sm font-medium text-slate-700 mb-2">📊 Détail du calcul:</p>
                                <div className="space-y-1 text-sm text-slate-600">
                                    {regles.map((regle, index) => (
                                        <p key={index} className={regle === '' ? 'h-2' : ''}>{regle}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Montants */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                                    <span className="text-sm font-medium text-slate-700">Montant brut:</span>
                                    <span className="text-lg font-bold text-slate-800">{montantBrut.toFixed(2)} DA</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-slate-200">
                                    <span className="text-sm font-medium text-slate-700">Réduction (cumul):</span>
                                    <span className="text-lg font-bold text-orange-600">-{(montantBrut - montantNet).toFixed(2)} DA</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-green-600 text-white rounded-lg shadow-lg">
                                    <span className="text-base font-bold">MONTANT TOTAL:</span>
                                    <span className="text-2xl font-bold">{montantNet.toFixed(2)} DA</span>
                                </div>
                            </div>

                            {/* Bouton export */}
                            <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2">
                                <Download size={20} />
                                Exporter le décompte
                            </button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Message si aucun acte */}
            {actesSelectionnes.length === 0 && actesTrouves.length === 0 && !isLoading && (
                <Card className="bg-gradient-to-br from-slate-50 to-slate-100 text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        Recherchez des actes médicaux
                    </h3>
                    <p className="text-slate-600">
                        Utilisez la barre de recherche pour trouver des actes et calculer automatiquement le montant total
                    </p>
                </Card>
            )}
        </div>
    );
};
