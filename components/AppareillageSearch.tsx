import React, { useState, useEffect } from 'react';
import { Search, Package, FileText, CheckCircle, AlertCircle, Brain } from 'lucide-react';
import { Appareillage } from '../types';
import { appareillageDatabase } from '../data/appareillage';
import { searchWithAI, enrichedSearch, loadPDFCache, searchInPDFCache, AISearchResult } from '../services/appareillageAI';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

export const AppareillageSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Appareillage[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Appareillage | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [pdfContext, setPdfContext] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  // Charger le PDF en cache au montage
  useEffect(() => {
    loadPDFCache();
  }, []);

  // Recherche dans la base de données
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setAiResult(null);
      setPdfContext('');
      return;
    }

    // Protection contre les recherches multiples simultanées
    if (isSearching) {
      return;
    }

    setIsSearching(true);
    setAiSuggestion('');
    setAiResult(null);
    setPdfContext('');

    try {
      const query = searchQuery.toLowerCase().trim();

      // 1. Recherche locale dans la base
      const localResults = appareillageDatabase.filter(item => 
        item.reference.toLowerCase().includes(query) ||
        item.nom.toLowerCase().includes(query) ||
        item.categorie?.toLowerCase().includes(query) ||
        item.indications?.some(ind => ind.toLowerCase().includes(query)) ||
        // 🔥 RECHERCHE EXACTE DANS LES RÉFÉRENCES COMPOSÉES (PS 1R01, PI 06, OI 39 N 52, etc.)
        (item.references_composees && item.references_composees.some(ref => 
          ref.toLowerCase() === query || ref.toLowerCase().includes(query)
        ))
      );

      setSearchResults(localResults);

      // 2. Si aucun résultat local, chercher dans le PDF brut
      let foundInPDF = false;
      if (localResults.length === 0) {
        try {
          const pdfResult = searchInPDFCache(searchQuery);
          if (pdfResult) {
            setPdfContext(pdfResult);
            setAiSuggestion('📄 Contexte trouvé dans le PDF CNAS');
            foundInPDF = true;
          }
        } catch (err) {
          console.warn('PDF search failed:', err);
        }
      }

      // 3. Recherche enrichie avec IA (si disponible)
      try {
        const enriched = await enrichedSearch(searchQuery, localResults);
        
        if (enriched.ai) {
          setAiResult(enriched.ai);
          setAiSuggestion(`🤖 IA locale: "${enriched.ai.nom}" (confiance: ${enriched.ai.confidence}%)`);
        } else if (localResults.length === 0 && !foundInPDF) {
          setAiSuggestion('❌ Aucun résultat trouvé. Vérifiez la référence ou essayez avec un terme médical.');
        }
      } catch (err) {
        console.warn('AI search failed:', err);
        if (localResults.length === 0 && !foundInPDF) {
          setAiSuggestion('❌ Aucun résultat trouvé.');
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setAiSuggestion('❌ Erreur lors de la recherche.');
    } finally {
      // GARANTIT que isSearching repasse à false
      setIsSearching(false);
    }
  };

  // Effet de recherche temps réel
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
        setAiResult(null);
        setPdfContext('');
      }
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Gestionnaire ENTRÉE - annule le debounce et lance immédiatement
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Annuler le timer de debounce
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      // Lancer la recherche immédiatement
      handleSearch();
    }
  };

  // Affichage des détails du produit
  const ProductDetails: React.FC<{ product: Appareillage }> = ({ product }) => (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="border-b pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.nom}</h2>
            <p className="text-lg text-blue-600 font-semibold mt-1">
              Référence: {product.reference}
            </p>
            <p className="text-sm text-gray-600 mt-1">{product.categorie}</p>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.remboursement === '100%' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {product.remboursement} remboursé
            </span>
            {product.type && (
              <p className="text-xs text-gray-500 mt-1">{product.type}</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Indications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Indications médicales
        </h3>
        <ul className="space-y-2">
          {product.indications.map((indication, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-600 mt-1">•</span>
              <span className="text-gray-700">{indication}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Adjonctions (si disponibles) */}
      {product.adjonctions && product.adjonctions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Adjonctions possibles
          </h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <ul className="space-y-2">
              {product.adjonctions.map((adj, index) => (
                <li key={index} className="text-sm text-gray-700 font-mono">
                  {adj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Critères de conformité */}
      {product.criteres_conformite && product.criteres_conformite.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Critères de conformité
          </h3>
          <div className="bg-orange-50 rounded-lg p-4">
            <ul className="space-y-2">
              {product.criteres_conformite.map((critere, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">✓</span>
                  <span className="text-gray-700">{critere}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Bouton retour */}
      <div className="pt-4 border-t">
        <Button
          onClick={() => setSelectedProduct(null)}
          variant="outline"
          className="w-full"
        >
          ← Retour à la recherche
        </Button>
      </div>
    </div>
  );

  // Vue principale
  if (selectedProduct) {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <ProductDetails product={selectedProduct} />
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Barre de recherche */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Recherche d'appareillage
        </h1>
        <p className="text-gray-600 mb-6">
          Recherchez un produit d'appareillage par référence, nom ou indication médicale.
        </p>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Ex: SO 01, Semelle, 701, Fauteuil, Pied plat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {aiSuggestion && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-700">{aiSuggestion}</p>
          </div>
        )}
      </Card>

      {/* Résultats IA / Contexte PDF */}
      {aiResult && (
        <Card className="p-6 bg-purple-50 border-purple-200">
          <div className="flex items-start gap-3">
            <Brain className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 mb-2">
                Résultat IA Locale - {aiResult.reference}
              </h3>
              <p className="text-sm text-purple-800 mb-3">
                <strong>{aiResult.nom}</strong>
              </p>
              <p className="text-sm text-gray-700 mb-3">{aiResult.description}</p>
              
              {aiResult.indications.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-purple-900 mb-1">Indications:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {aiResult.indications.map((ind, i) => (
                      <li key={i}>• {ind}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex items-center gap-4 text-xs text-purple-600">
                <span>Confiance: {aiResult.confidence}%</span>
                <span>{aiResult.source}</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {pdfContext && !aiResult && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">
                Extrait du PDF CNAS
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                ...{pdfContext}...
              </p>
              <p className="text-xs text-blue-600 mt-2">
                ℹ️ Utilisez l'IA locale pour une analyse complète (Ollama requis)
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Résultats de recherche */}
      {isSearching && (
        <Card className="p-6 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-3">Recherche en cours...</p>
        </Card>
      )}

      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            {searchResults.length} produit{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
          </p>
          {searchResults.map((product, index) => (
            <Card
              key={index}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.reference}
                    </span>
                    <h3 className="font-semibold text-gray-900">{product.nom}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{product.categorie}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    product.remboursement === '100%' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {product.remboursement}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isSearching && searchQuery.length >= 2 && searchResults.length === 0 && (
        <Card className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">
            Aucun produit trouvé pour "{searchQuery}"
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Essayez avec une référence (ex: SO 01, 701) ou un terme médical (ex: pied plat, fauteuil)
          </p>
        </Card>
      )}

      {/* Guide rapide */}
      {searchQuery.length === 0 && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Guide de recherche</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Par référence:</strong> SO 01, 701, FR.STANDARD, etc.</li>
            <li>• <strong>Par nom:</strong> Semelle, Chaussure, Fauteuil, etc.</li>
            <li>• <strong>Par indication:</strong> Pied plat, Scoliose, Paraplégie, etc.</li>
            <li>• <strong>Par catégorie:</strong> Podo-orthèses, Orthèses, Fauteuils, etc.</li>
          </ul>
          <p className="text-xs text-blue-600 mt-4">
            Base de données: {appareillageDatabase.length} produits d'appareillage CNAS
          </p>
        </Card>
      )}
    </div>
  );
};
