import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { disabilityData } from '../../data/disabilityRates';
import { Injury } from '../../types';

interface SearchResult {
    injury: Injury;
    path: string;
}

// Component for medical image tooltip
const ImageIndicator: React.FC<{ imageUrl: string; injuryName: string }> = ({ imageUrl, injuryName }) => {
    const [show, setShow] = useState(false);
    
    return (
        <div className="relative inline-block mr-2">
            <button
                type="button"
                className="inline-flex items-center justify-center w-5 h-5 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors cursor-help"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onClick={(e) => e.stopPropagation()}
                title="Voir l'illustration médicale"
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </button>
            
            {show && (
                <div className="absolute z-50 left-0 top-full mt-2 p-3 bg-white border-2 border-blue-300 rounded-lg shadow-2xl w-96 pointer-events-none">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-sm text-blue-900">Illustration médicale</h4>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShow(false);
                            }}
                            className="text-slate-400 hover:text-slate-600 pointer-events-auto"
                        >
                            ✕
                        </button>
                    </div>
                    <img 
                        src={imageUrl} 
                        alt={injuryName}
                        className="w-full rounded-md border border-slate-200"
                    />
                </div>
            )}
        </div>
    );
};

export const ReverseIppSearch: React.FC = () => {
    const [targetRate, setTargetRate] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = () => {
        const rate = parseInt(targetRate, 10);
        setSearchPerformed(true);
        setError('');

        if (isNaN(rate) || rate < 0 || rate > 100) {
            setError('Veuillez entrer un taux valide entre 0 et 100.');
            setResults([]);
            return;
        }

        const foundInjuries: SearchResult[] = [];
        disabilityData.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.injuries.forEach(injury => {
                    let match = false;
                    if (typeof injury.rate === 'number' && injury.rate === rate) {
                        match = true;
                    } else if (Array.isArray(injury.rate) && rate >= injury.rate[0] && rate <= injury.rate[1]) {
                        match = true;
                    }

                    if (match) {
                        foundInjuries.push({
                            injury: injury,
                            path: `${category.name} > ${subcategory.name.replace(' - ', ' > ')}`
                        });
                    }
                });
            });
        });

        setResults(foundInjuries);
    };

    const inputStyle = "mt-1 block w-full p-2 border border-slate-300 bg-white text-slate-900 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-500";
    const labelStyle = "block text-sm font-medium text-slate-700";

    return (
        <div>
            <p className="text-slate-600 mb-4 text-sm">Entrez un taux d'IPP pour trouver toutes les lésions uniques correspondantes dans le barème. Cet outil ne prend pas en compte les combinaisons de lésions.</p>
            
            <div className="flex items-end gap-4">
                <div className="flex-grow">
                    <label htmlFor="target-rate" className={labelStyle}>Taux d'IPP Cible (%)</label>
                    <input
                        type="number"
                        id="target-rate"
                        value={targetRate}
                        onChange={e => setTargetRate(e.target.value)}
                        className={inputStyle}
                        placeholder="ex: 25"
                        min="0"
                        max="100"
                    />
                </div>
                <Button onClick={handleSearch}>Rechercher</Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            
            <div className="mt-6">
                {searchPerformed && (
                    <>
                        <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">
                            Résultats de la recherche ({results.length})
                        </h3>
                        {results.length > 0 ? (
                            <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar -mr-3 pr-3">
                                {results.map((result, index) => (
                                    <div key={index} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                        <p className="font-semibold text-primary-700 flex items-center">
                                            {result.injury.imageUrl && (
                                                <ImageIndicator imageUrl={result.injury.imageUrl} injuryName={result.injury.name} />
                                            )}
                                            {result.injury.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">{result.path}</p>
                                        <div className="mt-2 text-xs">
                                            {typeof result.injury.rate === 'number' ? (
                                                <span className="font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Taux fixe : {result.injury.rate}%</span>
                                            ) : (
                                                <span className="font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Fourchette : {result.injury.rate[0]}-{result.injury.rate[1]}%</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 text-center py-4">Aucune lésion unique trouvée pour le taux de {targetRate}%.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};