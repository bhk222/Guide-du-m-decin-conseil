
import React, { useState, useMemo, useCallback } from 'react';
import { professionalDiseasesData } from '../data/professionalDiseases';
import { DiseaseCategory, ProfessionalDisease } from '../types';

// ──────────────── Icons ────────────────

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ClearIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const BookmarkIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${filled ? 'text-amber-500 fill-amber-500' : 'text-slate-300 hover:text-amber-400'}`} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WorkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const MedicalIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

// ──────────────── Category config ────────────────

const CATEGORY_CONFIG: Record<string, { icon: string; color: string; bgColor: string; borderColor: string; badgeColor: string; lightBg: string }> = {
    "Groupe 1": { icon: "⚗️", color: "text-purple-800", bgColor: "bg-purple-100", borderColor: "border-purple-400", badgeColor: "bg-purple-600", lightBg: "bg-purple-50" },
    "Groupe 2": { icon: "🦠", color: "text-emerald-800", bgColor: "bg-emerald-100", borderColor: "border-emerald-400", badgeColor: "bg-emerald-600", lightBg: "bg-emerald-50" },
    "Groupe 3": { icon: "🏭", color: "text-sky-800", bgColor: "bg-sky-100", borderColor: "border-sky-400", badgeColor: "bg-sky-600", lightBg: "bg-sky-50" },
};

const getCategoryConfig = (name: string) => {
    const key = Object.keys(CATEGORY_CONFIG).find(k => name.includes(k));
    return key ? CATEGORY_CONFIG[key] : CATEGORY_CONFIG["Groupe 1"];
};

// ──────────────── Helpers ────────────────

/** Parse delay string into structured items */
const parseDelays = (delay: string): string[] => {
    return delay.split('\n').map(d => d.trim()).filter(Boolean);
};

/** Highlight search terms in text */
const highlightText = (text: string, search: string): React.ReactNode => {
    if (!search || search.length < 2) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part)
            ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
            : part
    );
};

/** Extract tableau number for badge */
const getTableauNumber = (tableau: string): string => {
    const match = tableau.match(/\d+(\s*bis|\s*ter)?/i);
    return match ? match[0].trim() : tableau;
};

// ──────────────── Favorites hook ────────────────

const FAVORITES_KEY = 'mp_favorites';

const useFavorites = () => {
    const [favorites, setFavorites] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem(FAVORITES_KEY);
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch { return new Set(); }
    });

    const toggleFavorite = useCallback((tableauId: string) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(tableauId)) {
                next.delete(tableauId);
            } else {
                next.add(tableauId);
            }
            localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
            return next;
        });
    }, []);

    return { favorites, toggleFavorite };
};

// ──────────────── Disease Card ────────────────

interface DiseaseCardProps {
    disease: ProfessionalDisease;
    searchTerm: string;
    categoryConfig: ReturnType<typeof getCategoryConfig>;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease, searchTerm, categoryConfig, isFavorite, onToggleFavorite }) => {
    const [expanded, setExpanded] = useState(false);
    const delays = parseDelays(disease.delay);
    const tableauNum = getTableauNumber(disease.tableau);

    return (
        <div className={`bg-white rounded-xl shadow-sm mb-3 border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-md ${expanded ? 'ring-1 ring-primary-300' : ''}`}>
            {/* Header - always visible */}
            <div
                className="flex items-start gap-3 p-3 cursor-pointer select-none"
                onClick={() => setExpanded(!expanded)}
            >
                {/* Tableau badge */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${categoryConfig.badgeColor} text-white flex flex-col items-center justify-center text-xs font-bold shadow-sm`}>
                    <span className="text-[9px] opacity-80 leading-tight">TAB</span>
                    <span className="text-sm leading-tight">{tableauNum}</span>
                </div>

                {/* Title & short info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 leading-snug">
                        {highlightText(disease.name, searchTerm)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[11px] text-orange-700 bg-orange-50 rounded-full px-2 py-0.5 font-medium">
                            <ClockIcon />
                            {delays.length === 1 ? delays[0] : `${delays.length} délais`}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
                        className="p-1 rounded-full hover:bg-slate-100 transition-colors"
                        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                        <BookmarkIcon filled={isFavorite} />
                    </button>
                    <svg className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            {/* Expanded details */}
            {expanded && (
                <div className={`border-t border-slate-100 ${categoryConfig.lightBg}`}>
                    {/* Description */}
                    <div className="p-3 pb-2">
                        <div className="flex items-center gap-1.5 mb-2">
                            <MedicalIcon />
                            <p className="font-semibold text-xs text-slate-700 uppercase tracking-wide">Désignation de la maladie</p>
                        </div>
                        <div className="text-sm text-slate-700 leading-relaxed pl-5 whitespace-pre-line">
                            {highlightText(disease.description, searchTerm)}
                        </div>
                    </div>

                    {/* Delays */}
                    <div className="px-3 pb-2">
                        <div className="flex items-center gap-1.5 mb-2">
                            <ClockIcon />
                            <p className="font-semibold text-xs text-slate-700 uppercase tracking-wide">Délai de prise en charge</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pl-5">
                            {delays.map((d, i) => (
                                <span key={i} className="inline-block bg-orange-100 text-orange-800 text-xs font-medium rounded-md px-2.5 py-1 border border-orange-200">
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Work list */}
                    <div className="p-3 pt-2">
                        <div className="flex items-center gap-1.5 mb-2">
                            <WorkIcon />
                            <p className="font-semibold text-xs text-slate-700 uppercase tracking-wide">Liste indicative des travaux</p>
                        </div>
                        <div className="text-sm text-slate-600 leading-relaxed pl-5 whitespace-pre-line">
                            {highlightText(disease.workList, searchTerm)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ──────────────── Quick filter chips ────────────────

type FilterMode = 'all' | 'favorites' | 'groupe1' | 'groupe2' | 'groupe3';

const FILTER_CHIPS: { value: FilterMode; label: string; icon: string }[] = [
    { value: 'all', label: 'Tous', icon: '📋' },
    { value: 'favorites', label: 'Favoris', icon: '⭐' },
    { value: 'groupe1', label: 'Intoxications', icon: '⚗️' },
    { value: 'groupe2', label: 'Infections', icon: '🦠' },
    { value: 'groupe3', label: 'Ambiances', icon: '🏭' },
];

// ──────────────── Statistics banner ────────────────

const StatsBanner: React.FC<{ totalDiseases: number; totalCategories: number; filteredCount: number; favoritesCount: number }> = ({ totalDiseases, totalCategories, filteredCount, favoritesCount }) => (
    <div className="grid grid-cols-4 gap-2 px-4 pb-2">
        <div className="bg-white rounded-lg p-2 text-center shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-primary-700">{totalDiseases}</p>
            <p className="text-[10px] text-slate-500 font-medium">Tableaux</p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-purple-600">{totalCategories}</p>
            <p className="text-[10px] text-slate-500 font-medium">Groupes</p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-emerald-600">{filteredCount}</p>
            <p className="text-[10px] text-slate-500 font-medium">Résultats</p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center shadow-sm border border-slate-100">
            <p className="text-lg font-bold text-amber-500">{favoritesCount}</p>
            <p className="text-[10px] text-slate-500 font-medium">Favoris</p>
        </div>
    </div>
);

// ──────────────── Main component ────────────────

export const ProfessionalDiseasesGuide: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMode, setFilterMode] = useState<FilterMode>('all');
    const [expandAllCategories, setExpandAllCategories] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();

    const totalDiseases = useMemo(() =>
        professionalDiseasesData.reduce((sum, cat) => sum + cat.diseases.length, 0),
    []);

    const filteredData = useMemo(() => {
        let data = professionalDiseasesData;

        // Category filter
        if (filterMode === 'groupe1') data = data.filter(c => c.name.includes('Groupe 1'));
        else if (filterMode === 'groupe2') data = data.filter(c => c.name.includes('Groupe 2'));
        else if (filterMode === 'groupe3') data = data.filter(c => c.name.includes('Groupe 3'));

        // Search filter
        if (searchTerm.length >= 2) {
            const lowercasedFilter = searchTerm.toLowerCase();
            data = data.map(category => {
                const filteredDiseases = category.diseases.filter(disease =>
                    disease.name.toLowerCase().includes(lowercasedFilter) ||
                    disease.tableau.toLowerCase().includes(lowercasedFilter) ||
                    disease.description.toLowerCase().includes(lowercasedFilter) ||
                    disease.workList.toLowerCase().includes(lowercasedFilter) ||
                    disease.delay.toLowerCase().includes(lowercasedFilter)
                );
                return { ...category, diseases: filteredDiseases };
            }).filter(category => category.diseases.length > 0);
        }

        // Favorites filter
        if (filterMode === 'favorites') {
            data = data.map(category => ({
                ...category,
                diseases: category.diseases.filter(d => favorites.has(d.tableau))
            })).filter(category => category.diseases.length > 0);
        }

        return data;
    }, [searchTerm, filterMode, favorites]);

    const filteredCount = useMemo(() =>
        filteredData.reduce((sum, cat) => sum + cat.diseases.length, 0),
    [filteredData]);

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Search bar */}
            <div className="p-4 pb-2 bg-slate-50">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Rechercher tableau, maladie, agent, travaux..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 p-2.5 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm shadow-sm"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                        >
                            <ClearIcon />
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            <StatsBanner
                totalDiseases={totalDiseases}
                totalCategories={professionalDiseasesData.length}
                filteredCount={filteredCount}
                favoritesCount={favorites.size}
            />

            {/* Filter chips */}
            <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto no-scrollbar">
                {FILTER_CHIPS.map(chip => (
                    <button
                        key={chip.value}
                        onClick={() => setFilterMode(chip.value)}
                        className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                            filterMode === chip.value
                                ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300 hover:text-primary-600'
                        }`}
                    >
                        <span>{chip.icon}</span>
                        <span>{chip.label}</span>
                        {chip.value === 'favorites' && favorites.size > 0 && (
                            <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filterMode === 'favorites' ? 'bg-white/30 text-white' : 'bg-amber-100 text-amber-700'}`}>
                                {favorites.size}
                            </span>
                        )}
                    </button>
                ))}

                {/* Expand/collapse toggle */}
                <button
                    onClick={() => setExpandAllCategories(!expandAllCategories)}
                    className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200 hover:border-primary-300 transition-all ml-auto"
                    title={expandAllCategories ? "Réduire tout" : "Déplier tout"}
                >
                    <span>{expandAllCategories ? '🔽' : '▶️'}</span>
                    <span>{expandAllCategories ? 'Réduire' : 'Déplier'}</span>
                </button>
            </div>

            {/* Disease list */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 custom-scrollbar">
                {filteredData.length > 0 ? (
                    filteredData.map((category: DiseaseCategory) => {
                        const config = getCategoryConfig(category.name);
                        return (
                            <details key={category.name} className="group" open={expandAllCategories}>
                                <summary className={`cursor-pointer p-3 rounded-xl font-bold text-sm ${config.bgColor} ${config.color} ${config.borderColor} border transition-all flex justify-between items-center shadow-sm hover:shadow-md`}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{config.icon}</span>
                                        <div>
                                            <span>{category.name}</span>
                                            <span className={`ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold text-white ${config.badgeColor}`}>
                                                {category.diseases.length}
                                            </span>
                                        </div>
                                    </div>
                                    <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180 flex-shrink-0 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </summary>
                                <div className="pt-3 space-y-0">
                                    {category.diseases.map((disease: ProfessionalDisease) => (
                                        <DiseaseCard
                                            key={disease.tableau}
                                            disease={disease}
                                            searchTerm={searchTerm}
                                            categoryConfig={config}
                                            isFavorite={favorites.has(disease.tableau)}
                                            onToggleFavorite={() => toggleFavorite(disease.tableau)}
                                        />
                                    ))}
                                </div>
                            </details>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-slate-400 mt-16 space-y-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <div>
                            <p className="font-semibold text-slate-500">Aucun résultat trouvé</p>
                            <p className="text-sm mt-1">
                                {filterMode === 'favorites'
                                    ? "Vous n'avez pas encore de favoris. Appuyez sur l'icône signet pour en ajouter."
                                    : `Aucun tableau ne correspond à "${searchTerm}".`}
                            </p>
                            {(searchTerm || filterMode !== 'all') && (
                                <button
                                    onClick={() => { setSearchTerm(''); setFilterMode('all'); }}
                                    className="mt-3 px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    Réinitialiser les filtres
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};