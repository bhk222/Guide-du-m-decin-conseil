import React, { useState, useMemo } from 'react';
import { disabilityData } from '../data/disabilityRates';
import { InjuryCategory, InjurySubcategory, Injury, SelectedInjury } from '../types';
import { Button } from './ui/Button';

interface AnalogCalculatorProps {
    onAddInjury: (injury: SelectedInjury) => void;
}

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


export const AnalogCalculator: React.FC<AnalogCalculatorProps> = ({ onAddInjury }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [editingInjury, setEditingInjury] = useState<{ name: string; path: string } | null>(null);
    
    const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filteredData = useMemo(() => {
        if (!searchTerm) return disabilityData;

        const lowercasedFilter = normalize(searchTerm);
        const filtered: InjuryCategory[] = [];

        disabilityData.forEach(category => {
            const matchingSubcategories: InjurySubcategory[] = [];
            category.subcategories.forEach(subcategory => {
                const matchingInjuries = subcategory.injuries.filter(injury => 
                    normalize(injury.name).includes(lowercasedFilter) ||
                    normalize(injury.description || '').includes(lowercasedFilter)
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
    }, [searchTerm]);
    
    const handleToggleEditor = (injury: Injury, path: string) => {
        if (Array.isArray(injury.rate)) {
            if (editingInjury?.name === injury.name) {
                setEditingInjury(null); // Toggle off if already editing
            } else {
                setEditingInjury({ name: injury.name, path }); // Set new injury to edit
            }
        } else {
            onAddInjury({
                ...injury,
                id: `manual-${crypto.randomUUID()}`,
                chosenRate: injury.rate as number,
                category: path,
            });
            setEditingInjury(null); // Close any open editor
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="relative mb-4">
                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Rechercher (ex: fracture, raideur, sciatique...)"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-3 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2 -mr-2">
                {filteredData.map(category => (
                     <details 
                        key={category.name} 
                        className="group" 
                        open={searchTerm.length > 0 || openCategory === category.name}
                        onToggle={(e) => {
                            if ((e.target as HTMLDetailsElement).open) {
                                setOpenCategory(category.name);
                            } else if (openCategory === category.name) {
                                setOpenCategory(null);
                            }
                        }}
                     >
                        <summary className="cursor-pointer p-3 bg-slate-100 rounded-md font-bold text-slate-800 list-none flex justify-between items-center hover:bg-slate-200 transition-colors">
                            {category.name}
                             <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </summary>
                        <div className="pt-2 pl-2 space-y-2">
                            {category.subcategories.map(sub => (
                                <div key={sub.name}>
                                    <h4 className="font-semibold text-sm text-primary-700 mt-2 mb-1 pl-2">{sub.name}</h4>
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
                ))}
                 {filteredData.length === 0 && searchTerm && (
                    <div className="text-center text-slate-500 py-10">
                        <p>Aucun résultat trouvé pour "{searchTerm}".</p>
                    </div>
                 )}
            </div>
        </div>
    );
};