import React, { useState, useEffect, useCallback } from 'react';
import { localDrugDatabase } from '../../data/drugList';
import { Drug } from '../../types';
import { Button } from '../ui/Button';

// --- HOOKS ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value); }, delay);
    return () => { clearTimeout(handler); };
  }, [value, delay]);
  return debouncedValue;
}

// --- ICONS ---
const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
const PillIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h4a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
const ContraindicationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
const InteractionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 002.5 6h15A11.954 11.954 0 0010 1.944zM10 18.056l-5.5-3.056V6h11v9z" clipRule="evenodd" /></svg>;


// --- UI COMPONENTS ---

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

const DetailSection: React.FC<{ title: string; data?: string | string[]; icon: React.ReactNode }> = ({ title, data, icon }) => {
    if (!data || (Array.isArray(data) && data.length === 0)) return null;

    return (
        <details className="group" open>
            <summary className="cursor-pointer list-none flex items-center gap-2 p-2 bg-slate-100 rounded-t-md font-semibold text-slate-700 group-open:bg-slate-200">
                {icon}
                {title}
                <div className="ml-auto"><ChevronDownIcon /></div>
            </summary>
            <div className="p-3 border border-t-0 border-slate-200 rounded-b-md text-sm">
                {Array.isArray(data) ? (
                    <ul className="list-disc pl-5 space-y-1">
                        {data.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                ) : <p>{data}</p>}
            </div>
        </details>
    );
}

const DrugDetailsView: React.FC<{ drug: Drug; onClose: () => void }> = ({ drug, onClose }) => (
    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg animate-fade-in relative">
        <Button onClick={onClose} variant="secondary" className="!absolute !top-2 !right-2 !p-1.5 !rounded-full !h-auto !w-auto">
            <CloseIcon />
        </Button>
        <h4 className="font-bold text-lg text-primary-800 pr-8">{drug.name || drug.dci}</h4>
        {drug.name && <p className="text-sm text-slate-600">DCI: {drug.dci}</p>}
        {drug.dosage && <p className="text-sm text-slate-500 mt-1">{drug.dosage}</p>}
        
        <div className="mt-4 space-y-2">
            <DetailSection title="Conditions de Remboursement" data={drug.remboursement} icon={<ShieldIcon />} />
            <DetailSection title="Classe Thérapeutique" data={drug.classe_therapeutique} icon={<PillIcon />} />
            <DetailSection title="Indications" data={drug.indications} icon={<InfoIcon />} />
            <DetailSection title="Posologie" data={drug.posologie} icon={<InfoIcon />} />
            <DetailSection title="Contre-indications" data={drug.contre_indications} icon={<ContraindicationIcon />} />
            <DetailSection title="Interactions" data={drug.interactions} icon={<InteractionIcon />} />
        </div>
    </div>
);

const DrugCard: React.FC<{ drug: Drug; searchTerm: string; onSelect: () => void; isSelected: boolean }> = ({ drug, searchTerm, onSelect, isSelected }) => (
    <li className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors ${isSelected ? 'bg-primary-100' : 'hover:bg-primary-50'}`} onClick={onSelect}>
        <h4 className="font-bold text-md text-primary-700">
             <Highlight text={drug.name || drug.dci} highlight={searchTerm} />
        </h4>
        {drug.dci && drug.name && drug.dci.toLowerCase() !== drug.name.toLowerCase() && (
             <p className="text-sm font-medium text-slate-500">
                 DCI: <Highlight text={drug.dci} highlight={searchTerm} />
             </p>
        )}
        {drug.dosage && <p className="text-sm text-slate-500 mt-1"><Highlight text={drug.dosage} highlight={searchTerm} /></p>}
    </li>
);

// --- SEARCH LOGIC ---
const levenshteinDistance = (a: string = '', b: string = ''): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;
    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(matrix[j - 1][i] + 1, matrix[j][i - 1] + 1, matrix[j - 1][i - 1] + cost);
        }
    }
    return matrix[b.length][a.length];
};

const drugSynonyms: { [key: string]: string[] } = {
    paracetamol: ['parac', 'para', 'cetamol', 'doli', 'efferalgan'], ibuprofene: ['ibu', 'adfen', 'profen'], amoxicilline: ['amox', 'amoxic'], 'acide acetylsalicylique': ['aspirine', 'aspegic', 'asa'], diclofenac: ['diclo', 'diclofen', 'voltar'], ketoprofene: ['keto', 'ketopro', 'profenid'], metformine: ['metfo', 'glucophage'], atorvastatine: ['ator', 'tahor'], simvastatine: ['zocor', 'simva'], omeprazole: ['mopral', 'omepra'],
};
const synonymMap = new Map<string, string>();
Object.entries(drugSynonyms).forEach(([key, values]) => { values.forEach(syn => synonymMap.set(syn, key)); });

// --- MAIN COMPONENT ---
export const DrugDictionary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [filteredDrugs, setFilteredDrugs] = useState<Drug[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 250);
    const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

    const handleSelectDrug = useCallback((drug: Drug) => {
        if (selectedDrug && selectedDrug.dci === drug.dci && selectedDrug.name === drug.name) {
             setSelectedDrug(null);
        } else {
            setSelectedDrug(drug);
        }
    }, [selectedDrug]);

    useEffect(() => {
        const trimmedSearch = debouncedSearchTerm.trim();
        setSelectedDrug(null);

        if (trimmedSearch.length < 2) {
            setFilteredDrugs([]);
            setIsSearching(false);
            return;
        }
        
        setIsSearching(true);

        const searchTimeout = setTimeout(() => {
            const lowercasedFilter = trimmedSearch.toLowerCase();
            const searchTerms = new Set<string>([lowercasedFilter]);
            if (synonymMap.has(lowercasedFilter)) {
                searchTerms.add(synonymMap.get(lowercasedFilter)!);
            }

            const results: { drug: Drug, score: number }[] = [];
            const limit = 50;

            for (const drug of localDrugDatabase) {
                let score = 0;
                const lowerName = drug.name?.toLowerCase() || '';
                const lowerDci = drug.dci.toLowerCase();

                let directMatch = false;
                for (const term of searchTerms) {
                    if (lowerName.startsWith(term) || lowerDci.startsWith(term)) {
                        score = Math.max(score, 100); directMatch = true; break;
                    }
                    if (lowerName.includes(term) || lowerDci.includes(term)) {
                        score = Math.max(score, 80); directMatch = true;
                    }
                }
                if (!directMatch && lowercasedFilter.length > 3) {
                    const threshold = lowercasedFilter.length > 6 ? 2 : 1;
                    const nameDist = levenshteinDistance(lowercasedFilter, lowerName);
                    const dciDist = levenshteinDistance(lowercasedFilter, lowerDci);
                    if (Math.min(nameDist, dciDist) <= threshold) {
                         score = Math.max(score, 60 - Math.min(nameDist, dciDist) * 10);
                    }
                }
                if (score > 0) results.push({ drug, score });
            }
            results.sort((a, b) => b.score - a.score);
            setFilteredDrugs(results.slice(0, limit).map(r => r.drug));
            setIsSearching(false);
        }, 20);

        return () => clearTimeout(searchTimeout);
    }, [debouncedSearchTerm]);

    return (
        <div>
            <p className="text-slate-600 mb-4 text-sm">
              Base de données complète des médicaments. Cliquez sur une fiche pour voir les détails.
            </p>
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="text-slate-400" />
                </span>
                <input
                    type="text"
                    placeholder="Rechercher par nom ou DCI..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-2 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    aria-label="Rechercher un médicament"
                />
            </div>
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar -mr-3 pr-3">
                {isSearching ? (
                    <div className="text-center text-slate-500 p-6">Recherche...</div>
                ) : filteredDrugs.length > 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <ul>
                            {filteredDrugs.map((drug, index) => {
                                const isSelected = selectedDrug ? (selectedDrug.dci === drug.dci && selectedDrug.name === drug.name) : false;
                                return (
                                    <div key={`${drug.dci}-${drug.name || ''}-${index}`}>
                                        <DrugCard 
                                            drug={drug} 
                                            searchTerm={debouncedSearchTerm.trim()} 
                                            onSelect={() => handleSelectDrug(drug)}
                                            isSelected={isSelected}
                                        />
                                        {isSelected && selectedDrug && (
                                             <div className="p-2 pt-0 bg-primary-100">
                                                <DrugDetailsView 
                                                    drug={selectedDrug}
                                                    onClose={() => setSelectedDrug(null)}
                                                />
                                             </div>
                                        )}
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    debouncedSearchTerm.trim().length >= 2 && (
                        <p className="text-center text-slate-500 p-4">
                            Aucun médicament trouvé localement pour "{debouncedSearchTerm}".
                        </p>
                    )
                )}
            </div>
        </div>
    );
};