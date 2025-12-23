import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Upload, Search, Plus, Calculator, FileText, Trash2, Download, X, Database, Info } from 'lucide-react';
import {
    extractPdfData,
    rechercherActes,
    sauvegarderBaseDeDonnees,
    chargerBaseDeDonnees,
    effacerBaseDeDonnees,
    getStatistiques
} from '../../services/pdfExtractor';

interface ActeMedical {
    code: string;
    libelle: string;
    tarif: number;
    coefficient?: number;
    categorie?: string;
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
    const [isExtracting, setIsExtracting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showStats, setShowStats] = useState(false);

    // Charger la base de données au démarrage
    useEffect(() => {
        const dbExistante = chargerBaseDeDonnees();
        if (dbExistante) {
            setBaseDeDonnees(dbExistante);
        }
    }, []);

    // Charger et extraire le PDF
    const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.pdf')) {
            alert('⚠️ Veuillez sélectionner un fichier PDF');
            return;
        }

        setIsExtracting(true);
        
        try {
            // Extraire les données du PDF
            const actesExtraits = await extractPdfData(file);
            
            if (actesExtraits.length === 0) {
                alert('⚠️ Aucun acte médical trouvé dans ce PDF. Vérifiez le format du fichier.');
                setIsExtracting(false);
                return;
            }

            // Sauvegarder dans la base de données
            setBaseDeDonnees(actesExtraits);
            sauvegarderBaseDeDonnees(actesExtraits);
            
            setIsExtracting(false);
            alert(`✅ PDF extrait avec succès !\n\n${actesExtraits.length} actes médicaux enregistrés dans la base de données.`);
        } catch (error) {
            console.error('Erreur lors de l\'extraction du PDF:', error);
            setIsExtracting(false);
            alert('❌ Erreur lors de l\'extraction du PDF. Vérifiez que le fichier est bien lisible.');
        }
    };

    // Recherche sémantique dans les actes
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setActesTrouves([]);
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            // Utiliser la base de données si elle existe, sinon utiliser des exemples
            if (baseDeDonnees.length > 0) {
                const resultats = rechercherActes(baseDeDonnees, searchQuery);
                setActesTrouves(resultats.slice(0, 20)); // Limiter à 20 résultats
            } else {
                // Base de données d'exemple si aucun PDF n'est chargé
                const actesExemples: ActeMedical[] = [
                    { code: 'C', libelle: 'Consultation au cabinet', tarif: 2500, coefficient: 1, categorie: 'Consultation' },
                    { code: 'V', libelle: 'Visite à domicile', tarif: 2500, coefficient: 1.5, categorie: 'Visite' },
                    { code: 'CS', libelle: 'Consultation spécialiste', tarif: 2800, coefficient: 1, categorie: 'Consultation' },
                    { code: 'AMI4', libelle: 'Acte médical infirmier niveau 4', tarif: 1500, coefficient: 2, categorie: 'Soins' },
                    { code: 'KE', libelle: 'Échographie', tarif: 3500, coefficient: 1, categorie: 'Imagerie' },
                    { code: 'QZRB010', libelle: 'Radiographie thorax de face', tarif: 2500, coefficient: 1.5, categorie: 'Radiologie' },
                    { code: 'ADC', libelle: 'Acte de chirurgie majeure', tarif: 10000, coefficient: 3, categorie: 'Chirurgie' },
                    { code: 'K', libelle: 'Acte technique simple', tarif: 2000, coefficient: 2, categorie: 'Technique' },
                    { code: 'KC', libelle: 'Acte technique complexe', tarif: 2000, coefficient: 4, categorie: 'Technique' },
                    { code: 'ATM', libelle: 'Anesthésie', tarif: 5000, coefficient: 2, categorie: 'Anesthésie' },
                    { code: 'SF', libelle: 'Sage-femme - Consultation', tarif: 2200, coefficient: 1, categorie: 'Sage-femme' },
                    { code: 'IK', libelle: 'Indemnité de déplacement', tarif: 500, coefficient: 1, categorie: 'Déplacement' },
                ];

                const resultats = rechercherActes(actesExemples, searchQuery);
                setActesTrouves(resultats);
            }
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
    const stats = baseDeDonnees.length > 0 ? getStatistiques(baseDeDonnees) : null;

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

            {/* Upload PDF et gestion base de données */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                <Database size={20} />
                                Base de données Nomenclature
                            </h3>
                            {baseDeDonnees.length > 0 ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-green-700 font-medium">
                                        ✅ Base de données active: {baseDeDonnees.length} actes médicaux
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowStats(!showStats)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 flex items-center gap-1"
                                        >
                                            <Info size={14} />
                                            {showStats ? 'Masquer stats' : 'Voir stats'}
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm('Êtes-vous sûr de vouloir effacer la base de données ?')) {
                                                    effacerBaseDeDonnees();
                                                    setBaseDeDonnees([]);
                                                    setActesTrouves([]);
                                                    alert('🗑️ Base de données effacée');
                                                }
                                            }}
                                            className="px-3 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700 flex items-center gap-1"
                                        >
                                            <Trash2 size={14} />
                                            Effacer la BDD
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-600">
                                    Importez le PDF de la nomenclature pour créer votre base de données
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isExtracting}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors font-medium flex items-center gap-2"
                        >
                            <Upload size={20} />
                            {isExtracting ? 'Extraction...' : baseDeDonnees.length > 0 ? 'Remplacer PDF' : 'Charger PDF'}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handlePdfUpload}
                            className="hidden"
                        />
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

                    {isExtracting && (
                        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                                <span>Extraction du PDF en cours... Veuillez patienter.</span>
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
                        placeholder="Ex: consultation, radiographie, chirurgie, échographie..."
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
                    💡 Utilisez des mots-clés naturels pour trouver rapidement les actes
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
