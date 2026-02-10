import React, { useState, useMemo, useCallback } from 'react';
import { disabilityData } from '../data/disabilityRates';
import { InjuryCategory, InjurySubcategory, Injury, SelectedInjury } from '../types';
import { Button } from './ui/Button';

interface AnalogCalculatorProps {
    onAddInjury: (injury: SelectedInjury) => void;
}

// ─── Types pour le filtre par région anatomique ───
type AnatomicalRegion = 'all' | 'tete' | 'rachis' | 'nerfs' | 'face' | 'thorax' | 'mbr_sup' | 'mbr_inf' | 'brulures' | 'respiratoire' | 'autres';

interface RegionFilter {
    key: AnatomicalRegion;
    label: string;
    emoji: string;
    color: string;
    activeColor: string;
    matchCategories: string[]; // partial matches on category name
}

const REGION_FILTERS: RegionFilter[] = [
    { key: 'all', label: 'Tout', emoji: '📋', color: 'bg-slate-100 text-slate-700 border-slate-300', activeColor: 'bg-primary-600 text-white border-primary-600', matchCategories: [] },
    { key: 'tete', label: 'Tête & Neuro', emoji: '🧠', color: 'bg-purple-50 text-purple-700 border-purple-200', activeColor: 'bg-purple-600 text-white border-purple-600', matchCategories: ['Crâniennes', 'Neurologiques', 'Psychiatriques'] },
    { key: 'rachis', label: 'Rachis & Bassin', emoji: '🦴', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', activeColor: 'bg-indigo-600 text-white border-indigo-600', matchCategories: ['Rachis', 'Bassin', 'Moelle'] },
    { key: 'nerfs', label: 'Nerfs', emoji: '⚡', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', activeColor: 'bg-yellow-600 text-white border-yellow-600', matchCategories: ['Nerfs Crâniens', 'Nerfs Périphériques', 'Séquelles des Nerfs'] },
    { key: 'face', label: 'Face & ORL & Yeux', emoji: '👁️', color: 'bg-blue-50 text-blue-700 border-blue-200', activeColor: 'bg-blue-600 text-white border-blue-600', matchCategories: ['Maxillo', 'ORL', 'Ophtalmologiques'] },
    { key: 'thorax', label: 'Thorax & Abdomen', emoji: '❤️', color: 'bg-red-50 text-red-700 border-red-200', activeColor: 'bg-red-600 text-white border-red-600', matchCategories: ['Thoraciques', 'Abdominales', 'Cardio'] },
    { key: 'mbr_sup', label: 'Mbres Supérieurs', emoji: '💪', color: 'bg-green-50 text-green-700 border-green-200', activeColor: 'bg-green-600 text-white border-green-600', matchCategories: ['Membres Supérieurs'] },
    { key: 'mbr_inf', label: 'Mbres Inférieurs', emoji: '🦵', color: 'bg-teal-50 text-teal-700 border-teal-200', activeColor: 'bg-teal-600 text-white border-teal-600', matchCategories: ['Membres Inférieurs'] },
    { key: 'brulures', label: 'Brûlures & Peau', emoji: '🔥', color: 'bg-orange-50 text-orange-700 border-orange-200', activeColor: 'bg-orange-600 text-white border-orange-600', matchCategories: ['Brûlures', 'Dermatologiques'] },
    { key: 'respiratoire', label: 'Respiratoire', emoji: '🫁', color: 'bg-sky-50 text-sky-700 border-sky-200', activeColor: 'bg-sky-600 text-white border-sky-600', matchCategories: ['Respiratoires'] },
    { key: 'autres', label: 'Autres', emoji: '🧬', color: 'bg-gray-50 text-gray-700 border-gray-200', activeColor: 'bg-gray-600 text-white border-gray-600', matchCategories: ['Algodystrophie', 'Endocriniennes', 'Infectieuses', 'Hématologiques', 'Obstétricales', 'Amputations Multiples', 'Psychiatriques Sévères', 'Maladies Professionnelles'] },
];

// Component for medical image tooltip
const ImageIndicator: React.FC<{ imageUrl: string; injuryName: string; clinicalTip?: string }> = ({ imageUrl, injuryName, clinicalTip }) => {
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
                <div className="absolute z-50 left-0 top-full mt-2 p-3 bg-white border-2 border-blue-300 rounded-lg shadow-2xl w-96 max-h-[500px] overflow-y-auto pointer-events-none">
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
                        className="w-full rounded-md border border-slate-200 mb-3"
                    />
                    {clinicalTip && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="text-xs font-semibold text-slate-700 mb-2">💡 Points clés d'examen clinique</p>
                            <p className="text-xs text-slate-600 leading-relaxed">{clinicalTip}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const GuidedRateSelector: React.FC<{
    injury: Injury;
    onAdd: (rate: number) => void;
    onCancel: () => void;
}> = ({ injury, onAdd, onCancel }) => {
    if (!Array.isArray(injury.rate)) return null;

    const [currentStepIndex, setCurrentStepIndex] = useState(2); // Default to medium

    const steps = useMemo(() => {
        // FIX: Add array check for type narrowing inside useMemo.
        if (!Array.isArray(injury.rate)) return [];
        const [min, max] = injury.rate;

        const lowDesc = injury.rateCriteria?.low || 'Gêne minimale, sans impact fonctionnel significatif.';
        const highDesc = injury.rateCriteria?.high || 'Perte de fonction majeure ou handicap important.';
        const mediumDesc = injury.rateCriteria?.medium;

        const generatedSteps: {
            severity: string;
            rate: number;
            description: string;
        }[] = [
            { severity: 'Faible', rate: min, description: lowDesc },
            { severity: 'Faible-Moyen', rate: Math.round(min + (max - min) * 0.25), description: 'Impact fonctionnel se situant entre la description du niveau faible et celle du niveau moyen.' },
            { severity: 'Moyen', rate: Math.round((min + max) / 2), description: mediumDesc || 'Impact fonctionnel modéré. Une limitation claire est observée lors des activités quotidiennes ou professionnelles.' },
            { severity: 'Moyen-Élevé', rate: Math.round(min + (max - min) * 0.75), description: 'Impact fonctionnel se situant entre la description du niveau moyen et celle du niveau élevé.' },
            { severity: 'Élevé', rate: max, description: highDesc }
        ];
        
        return generatedSteps.filter((step, index, self) =>
            index === 0 || step.rate !== self[index - 1].rate
        );
    }, [injury]);

    if (steps.length === 0) return null;

    const activeStepIndex = Math.min(currentStepIndex, steps.length - 1);
    const activeStep = steps[activeStepIndex];

    return (
        <div className="bg-slate-100 p-3 rounded-b-lg -mt-1 border border-t-0 border-slate-200/90 animate-fade-in shadow-inner">
            <div className="text-center p-4 bg-white rounded-lg shadow-inner">
                 <p className="font-bold text-lg text-primary-700">{activeStep.severity}</p>
                 <p className="font-extrabold text-4xl text-accent-600 my-1">{activeStep.rate}%</p>
                 <p className="text-xs text-slate-600 h-10 flex items-center justify-center">{activeStep.description}</p>
                <input
                    type="range"
                    min="0"
                    max={steps.length - 1}
                    value={activeStepIndex}
                    onChange={(e) => setCurrentStepIndex(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-3 accent-primary-500"
                    step="1"
                />
                 <div className="flex justify-between text-xs font-medium text-slate-500 mt-1">
                    <span>{steps[0].rate}% (Min)</span>
                    <span>{steps[steps.length - 1].rate}% (Max)</span>
                </div>
            </div>
            {(injury.name.toLowerCase().includes('cataracte') || 
              injury.name.toLowerCase().includes('acuité') ||
              injury.name.toLowerCase().includes('vision') ||
              injury.name.toLowerCase().includes('auditive') ||
              injury.name.toLowerCase().includes('audiométrie') ||
              injury.name.toLowerCase().includes('décibel') ||
              injury.name.toLowerCase().includes('abduction') ||
              injury.name.toLowerCase().includes('flexion') ||
              injury.name.toLowerCase().includes('extension') ||
              injury.name.toLowerCase().includes('amplitude') ||
              injury.name.toLowerCase().includes('mobilité')) && (
                <div className="mt-3 mb-2 border border-blue-300 bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-900 leading-relaxed">
                        <span className="font-bold">💡 Astuce :</span> Pour une évaluation précise avec <span className="font-semibold">critères cliniques chiffrés</span> (acuité visuelle, audiométrie, amplitudes articulaires...), utilisez l'onglet <span className="font-bold text-blue-700">"Guide IA"</span> pour une analyse détaillée.
                    </p>
                </div>
            )}
            <div className="mt-3 flex justify-end gap-2">
                <Button variant="secondary" onClick={onCancel} className="!text-xs !py-1 !px-2">Annuler</Button>
                <Button onClick={() => onAdd(activeStep.rate)} className="!text-xs !py-1 !px-2">Valider le Taux</Button>
            </div>
        </div>
    );
};


// Fonction pour obtenir l'emoji et la couleur de badge par catégorie (élargie à TOUTES les catégories)
const getCategoryStyle = (categoryName: string): { emoji: string; color: string; gradient: string } => {
    const n = categoryName.toLowerCase();
    if (n.includes('crâniennes') || n.includes('neurologiques') || n.includes('psychiatriques')) return { emoji: '🧠', color: 'bg-purple-100 text-purple-700', gradient: 'from-purple-50 to-purple-100' };
    if (n.includes('rachis') || n.includes('moelle')) return { emoji: '🦴', color: 'bg-indigo-100 text-indigo-700', gradient: 'from-indigo-50 to-indigo-100' };
    if (n.includes('nerfs')) return { emoji: '⚡', color: 'bg-yellow-100 text-yellow-700', gradient: 'from-yellow-50 to-yellow-100' };
    if (n.includes('maxillo') || n.includes('orl') || n.includes('ophtalmologiques')) return { emoji: '👁️', color: 'bg-blue-100 text-blue-700', gradient: 'from-blue-50 to-blue-100' };
    if (n.includes('thoraciques') || n.includes('cardio') || n.includes('abdominales')) return { emoji: '❤️', color: 'bg-red-100 text-red-700', gradient: 'from-red-50 to-red-100' };
    if (n.includes('membres supérieurs')) return { emoji: '💪', color: 'bg-green-100 text-green-700', gradient: 'from-green-50 to-green-100' };
    if (n.includes('membres inférieurs')) return { emoji: '🦵', color: 'bg-teal-100 text-teal-700', gradient: 'from-teal-50 to-teal-100' };
    if (n.includes('algodystrophie') || n.includes('douloureux régional')) return { emoji: '🔥', color: 'bg-amber-100 text-amber-700', gradient: 'from-amber-50 to-amber-100' };
    if (n.includes('respiratoires') || n.includes('respiratoire')) return { emoji: '🫁', color: 'bg-sky-100 text-sky-700', gradient: 'from-sky-50 to-sky-100' };
    if (n.includes('brûlures')) return { emoji: '🔥', color: 'bg-orange-100 text-orange-700', gradient: 'from-orange-50 to-orange-100' };
    if (n.includes('maladies professionnelles')) return { emoji: '🏭', color: 'bg-lime-100 text-lime-700', gradient: 'from-lime-50 to-lime-100' };
    if (n.includes('endocrinien') || n.includes('métaboliques')) return { emoji: '🧪', color: 'bg-violet-100 text-violet-700', gradient: 'from-violet-50 to-violet-100' };
    if (n.includes('infectieuses')) return { emoji: '🦠', color: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-50 to-emerald-100' };
    if (n.includes('hématologiques')) return { emoji: '🩸', color: 'bg-rose-100 text-rose-700', gradient: 'from-rose-50 to-rose-100' };
    if (n.includes('dermatologiques')) return { emoji: '🩹', color: 'bg-pink-100 text-pink-700', gradient: 'from-pink-50 to-pink-100' };
    if (n.includes('obstétricales') || n.includes('gynécologiques')) return { emoji: '🤰', color: 'bg-fuchsia-100 text-fuchsia-700', gradient: 'from-fuchsia-50 to-fuchsia-100' };
    if (n.includes('amputations multiples') || n.includes('polyhandicap')) return { emoji: '♿', color: 'bg-gray-100 text-gray-700', gradient: 'from-gray-50 to-gray-100' };
    if (n.includes('psychiatriques sévères')) return { emoji: '🧠', color: 'bg-purple-100 text-purple-700', gradient: 'from-purple-50 to-purple-100' };
    // catégories détaillées (Mayet-Rey)
    if (n.includes('détaillés') && n.includes('supérieurs')) return { emoji: '✋', color: 'bg-green-100 text-green-700', gradient: 'from-green-50 to-green-100' };
    if (n.includes('détaillés') && n.includes('inférieurs')) return { emoji: '🦶', color: 'bg-teal-100 text-teal-700', gradient: 'from-teal-50 to-teal-100' };
    if (n.includes('rachis') && !n.includes('bassin')) return { emoji: '🦴', color: 'bg-indigo-100 text-indigo-700', gradient: 'from-indigo-50 to-indigo-100' };
    return { emoji: '📋', color: 'bg-slate-100 text-slate-700', gradient: 'from-slate-50 to-slate-100' };
};

export const AnalogCalculator: React.FC<AnalogCalculatorProps> = ({ onAddInjury }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [editingInjury, setEditingInjury] = useState<{ name: string; path: string } | null>(null);
    const [activeRegion, setActiveRegion] = useState<AnatomicalRegion>('all');
    const [expandAll, setExpandAll] = useState(false);
    
    const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Organisation hiérarchique par ordre anatomique logique (tête → pieds → systémique)
    const organizedData = useMemo(() => {
        const categoryOrder = [
            // Tête & Neurologie
            'Séquelles Crâniennes, Neurologiques et Psychiatriques',
            // Rachis & Bassin
            'Séquelles du Rachis, du Bassin et de la Moelle Épinière',
            'Rachis', // from algerianBareme1967
            // Nerfs
            'Séquelles des Nerfs Crâniens et Périphériques',
            // Face, ORL, Yeux
            'Séquelles Maxillo-Faciales, ORL et Ophtalmologiques',
            // Thorax & Abdomen
            'Séquelles Thoraciques, Abdominales, Pelviennes et Cardio-vasculaires',
            // Membres Supérieurs
            'Membres Supérieurs',
            'Membres Supérieurs Détaillés',
            // Membres Inférieurs
            'Membres Inférieurs',
            'Membres Inférieurs Détaillés',
            // Systèmes spécialisés
            'Algodystrophie et Syndromes Douloureux Régionaux Complexes',
            'Séquelles Respiratoires',
            'Séquelles de Brûlures',
            'Maladies Professionnelles Indemnisables',
            'Séquelles Endocriniennes et Métaboliques',
            'Séquelles de Maladies Infectieuses Post-Traumatiques',
            'Séquelles Hématologiques',
            'Séquelles Dermatologiques Étendues',
            'Séquelles Obstétricales et Gynécologiques Post-Traumatiques',
            'Amputations Multiples et Polyhandicap',
            'Séquelles Psychiatriques Sévères et Spécifiques',
        ];

        return [...disabilityData].sort((a, b) => {
            const indexA = categoryOrder.indexOf(a.name);
            const indexB = categoryOrder.indexOf(b.name);
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    }, []);

    // Filtrage par région anatomique
    const regionFilteredData = useMemo(() => {
        if (activeRegion === 'all') return organizedData;
        const regionDef = REGION_FILTERS.find(r => r.key === activeRegion);
        if (!regionDef) return organizedData;
        
        return organizedData.filter(category => {
            return regionDef.matchCategories.some(match => 
                category.name.toLowerCase().includes(match.toLowerCase())
            );
        });
    }, [activeRegion, organizedData]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return regionFilteredData;

        const lowercasedFilter = normalize(searchTerm);
        const filtered: InjuryCategory[] = [];

        regionFilteredData.forEach(category => {
            const matchingSubcategories: InjurySubcategory[] = [];
            category.subcategories.forEach(subcategory => {
                const matchingInjuries = subcategory.injuries.filter(injury => 
                    normalize(injury.name).includes(lowercasedFilter) ||
                    normalize(injury.description || '').includes(lowercasedFilter) ||
                    (injury.searchTerms && injury.searchTerms.some(t => normalize(t).includes(lowercasedFilter)))
                );
                if (matchingInjuries.length > 0) {
                    matchingSubcategories.push({ ...subcategory, injuries: matchingInjuries });
                }
            });
            if (matchingSubcategories.length > 0 || normalize(category.name).includes(lowercasedFilter)) {
                 const subcategoriesToShow = matchingSubcategories.length > 0 ? matchingSubcategories : category.subcategories;
                filtered.push({ ...category, subcategories: subcategoriesToShow });
            }
        });
        return filtered;
    }, [searchTerm, regionFilteredData]);

    // Stats
    const totalStats = useMemo(() => {
        let totalCategories = filteredData.length;
        let totalSubcategories = 0;
        let totalInjuries = 0;
        filteredData.forEach(cat => {
            totalSubcategories += cat.subcategories.length;
            cat.subcategories.forEach(sub => {
                totalInjuries += sub.injuries.length;
            });
        });
        return { totalCategories, totalSubcategories, totalInjuries };
    }, [filteredData]);
    
    const handleToggleEditor = useCallback((injury: Injury, path: string) => {
        if (Array.isArray(injury.rate)) {
            if (editingInjury?.name === injury.name) {
                setEditingInjury(null);
            } else {
                setEditingInjury({ name: injury.name, path });
            }
        } else {
            onAddInjury({
                ...injury,
                id: `manual-${crypto.randomUUID()}`,
                chosenRate: injury.rate as number,
                category: path,
            });
            setEditingInjury(null);
        }
    }, [editingInjury, onAddInjury]);

    const handleExpandAll = useCallback(() => {
        setExpandAll(prev => !prev);
    }, []);

    const handleRegionChange = useCallback((region: AnatomicalRegion) => {
        setActiveRegion(region);
        setOpenCategory(null);
    }, []);

    // Suggestions de recherche rapides
    const quickSearches = [
        { label: 'Fracture', term: 'fracture' },
        { label: 'Raideur', term: 'raideur' },
        { label: 'Amputation', term: 'amputation' },
        { label: 'Ankylose', term: 'ankylose' },
        { label: 'Hernie discale', term: 'hernie discale' },
        { label: 'Sciatique', term: 'sciatique' },
        { label: 'Épilepsie', term: 'épilepsie' },
        { label: 'Hémiplégie', term: 'hémiplégie' },
    ];

    return (
        <div className="flex flex-col h-full">
            {/* ─── Barre de recherche ─── */}
            <div className="relative mb-3">
                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Rechercher une lésion (ex: fracture, raideur, sciatique...)"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 p-3 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* ─── Recherches rapides (quand pas de terme) ─── */}
            {!searchTerm && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {quickSearches.map(qs => (
                        <button
                            key={qs.term}
                            onClick={() => setSearchTerm(qs.term)}
                            className="text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-all"
                        >
                            🔍 {qs.label}
                        </button>
                    ))}
                </div>
            )}
            
            {/* ─── Filtres par région anatomique ─── */}
            <div className="mb-3">
                <div className="flex flex-wrap gap-1.5">
                    {REGION_FILTERS.map(region => (
                        <button
                            key={region.key}
                            onClick={() => handleRegionChange(region.key)}
                            className={`text-xs px-2.5 py-1.5 rounded-full border font-medium transition-all duration-200 ${
                                activeRegion === region.key
                                    ? region.activeColor + ' shadow-sm'
                                    : region.color + ' hover:shadow-sm'
                            }`}
                        >
                            {region.emoji} {region.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Barre de statistiques + actions ─── */}
            <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-primary-400"></span>
                        <strong className="text-slate-700">{totalStats.totalCategories}</strong> catégories
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-accent-400"></span>
                        <strong className="text-slate-700">{totalStats.totalInjuries}</strong> lésions
                    </span>
                </div>
                <button
                    onClick={handleExpandAll}
                    className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 transition-colors"
                >
                    {expandAll ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                            Tout replier
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            Tout déplier
                        </>
                    )}
                </button>
            </div>
            
            {/* ─── Liste des catégories ─── */}
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2 -mr-2">
                {filteredData.length === 0 && (searchTerm || activeRegion !== 'all') && (
                    <div className="text-center text-slate-500 py-10">
                        <p className="text-lg font-semibold mb-2">🔍 Aucun résultat trouvé</p>
                        <p className="text-sm">Essayez avec d'autres termes ou changez le filtre de région</p>
                        {activeRegion !== 'all' && (
                            <button 
                                onClick={() => { setActiveRegion('all'); setSearchTerm(''); }}
                                className="mt-3 text-sm text-primary-600 hover:text-primary-800 underline"
                            >
                                Réinitialiser les filtres
                            </button>
                        )}
                    </div>
                )}
                {filteredData.map((category, catIndex) => {
                    const shouldShowImage = category.name === "Épaule - Amputation et Désarticulation" ||
                                          category.name === "Bras - Amputations" ||
                                          category.name === "Coude - Désarticulation" ||
                                          category.name === "Avant-bras - Amputations" ||
                                          category.name === "Poignet - Désarticulation" ||
                                          category.name === "Main - Amputations";
                    
                    const categoryStyle = getCategoryStyle(category.name);
                    const totalInjuries = category.subcategories.reduce((acc, sub) => acc + sub.injuries.length, 0);
                    const isOpen = searchTerm.length > 0 || expandAll || openCategory === category.name;
                    
                    return (
                     <details 
                        key={category.name} 
                        className="group" 
                        open={isOpen}
                        onToggle={(e) => {
                            if ((e.target as HTMLDetailsElement).open) {
                                setOpenCategory(category.name);
                            } else if (openCategory === category.name) {
                                setOpenCategory(null);
                            }
                        }}
                     >
                        <summary className={`cursor-pointer p-3 bg-gradient-to-r ${categoryStyle.gradient} rounded-lg font-bold text-slate-800 list-none flex justify-between items-center hover:shadow-md transition-all duration-200 shadow-sm border border-slate-200`}>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-400 w-5 text-right">{catIndex + 1}.</span>
                                    <span className={`px-2.5 py-1 rounded-full text-sm font-bold ${categoryStyle.color}`}>
                                        {categoryStyle.emoji}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm leading-tight">{category.name}</span>
                                    <span className="text-xs font-normal text-slate-500">
                                        {category.subcategories.length} sous-catégorie{category.subcategories.length > 1 ? 's' : ''} · {totalInjuries} lésion{totalInjuries > 1 ? 's' : ''}
                                    </span>
                                </div>
                                {shouldShowImage && (
                                  <span 
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold cursor-help transition-colors relative group/tooltip ml-2"
                                    title="Voir le diagramme d'amputation"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.open('/images/medical/AMPUTATION%20DE%20SEGMENT%20MBR%20SUP.jpg', '_blank');
                                    }}
                                  >
                                    📷
                                  </span>
                                )}
                            </div>
                             <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180 text-slate-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </summary>
                        <div className="pt-2 pl-2 space-y-2">
                            {category.subcategories.map((sub, subIndex) => (
                                <div key={sub.name} className="mb-3">
                                    <h4 className="font-semibold text-sm text-primary-700 mt-3 mb-2 pl-2 flex items-center gap-2 border-l-4 border-primary-300">
                                        <span className="bg-primary-50 px-2 py-0.5 rounded flex items-center gap-1.5">
                                            <span className="text-xs font-bold text-primary-400">{catIndex + 1}.{subIndex + 1}</span>
                                            📌 {sub.name}
                                        </span>
                                        <span className="text-xs font-normal text-slate-500">({sub.injuries.length} lésion{sub.injuries.length > 1 ? 's' : ''})</span>
                                    </h4>
                                     <div className="space-y-1">
                                        {sub.injuries.map(injury => {
                                            const isEditing = editingInjury?.name === injury.name;
                                            return (
                                             <div key={injury.name}>
                                                <div className={`p-3 bg-white border border-slate-200/70 flex items-start justify-between gap-3 hover:border-primary-300 ${isEditing ? 'rounded-t-lg' : 'rounded-lg'}`}>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm text-slate-900 flex items-center">
                                                            {injury.imageUrl && (
                                                                <ImageIndicator imageUrl={injury.imageUrl} injuryName={injury.name} clinicalTip={injury.clinicalTip} />
                                                            )}
                                                            {injury.name}
                                                        </p>
                                                        {injury.description && <p className="text-xs text-slate-500 mt-1">{injury.description}</p>}
                                                        <p className="text-xs font-bold text-accent-700 mt-2">
                                                            Taux indicatif : {typeof injury.rate === 'number' ? `${injury.rate}%` : `${injury.rate[0]}-${injury.rate[1]}%`}
                                                        </p>
                                                        {Array.isArray(injury.rate) && injury.rateCriteria && (
                                                            <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs text-slate-600">
                                                                <p className="font-semibold text-slate-500 mb-1">Critères d'évaluation :</p>
                                                                <div className="space-y-1 pl-2">
                                                                    <div className="flex items-start">
                                                                        <span className="font-bold text-green-700 w-[90px] flex-shrink-0">Faible ({injury.rate[0]}%):</span>
                                                                        <span className="ml-2">{injury.rateCriteria.low}</span>
                                                                    </div>
                                                                    {injury.rateCriteria.medium && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-bold text-yellow-700 w-[90px] flex-shrink-0">Moyen (~{Math.round((injury.rate[0] + injury.rate[1]) / 2)}%):</span>
                                                                            <span className="ml-2">{injury.rateCriteria.medium}</span>
                                                                        </div>
                                                                    )}
                                                                    <div className="flex items-start">
                                                                        <span className="font-bold text-red-700 w-[90px] flex-shrink-0">Élevé ({injury.rate[1]}%):</span>
                                                                        <span className="ml-2">{injury.rateCriteria.high}</span>
                                                                    </div>
                                                                </div>
                                                                {(injury.name.toLowerCase().includes('cataracte') || 
                                                                  injury.name.toLowerCase().includes('acuité') ||
                                                                  injury.name.toLowerCase().includes('vision')) && (
                                                                    <div className="mt-2 pt-2 border-t border-blue-200 bg-blue-50 p-2 rounded">
                                                                        <p className="text-xs text-blue-800">
                                                                            <span className="font-bold">💡 Astuce :</span> Pour une évaluation précise avec acuité visuelle chiffrée (ex: 2/10), utilisez l'onglet <span className="font-semibold">"Guide IA"</span> pour une analyse clinique détaillée.
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Button 
                                                        onClick={() => handleToggleEditor(injury, `${category.name} > ${sub.name}`)}
                                                        className="!px-3 !py-1.5 self-center"
                                                        variant={isEditing ? 'secondary' : 'primary'}
                                                    >
                                                         {Array.isArray(injury.rate)
                                                            ? (isEditing ? 'Annuler' : 'Préciser')
                                                            : 'Ajouter'
                                                        }
                                                    </Button>
                                                </div>
                                                {isEditing && Array.isArray(injury.rate) && (
                                                    <GuidedRateSelector
                                                        injury={injury}
                                                        onAdd={(rate) => {
                                                            onAddInjury({
                                                                ...injury,
                                                                id: `manual-${crypto.randomUUID()}`,
                                                                chosenRate: rate,
                                                                category: editingInjury.path,
                                                            });
                                                            setEditingInjury(null);
                                                        }}
                                                        onCancel={() => setEditingInjury(null)}
                                                    />
                                                )}
                                             </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </details>
                    );
                })}
            </div>
        </div>
    );
};