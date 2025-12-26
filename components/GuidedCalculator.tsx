import React, { useState, useEffect, useMemo } from 'react';
import { SelectedInjury, Injury } from '../types';
import { disabilityData } from '../data/disabilityRates';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { HistoryModal, saveToHistory } from './HistoryModal';

// --- Types ---
interface LesionState {
    id: string;
    siege: string;
    partieCorps: string;
    siegePrecis: string;
    severity: 'low' | 'low-medium' | 'medium' | 'medium-high' | 'high' | null;
    selectedInjury: Injury | null;
}

interface VictimInfo {
    age: string;
    profession: string;
    sector: string;
    gender: string;
    company?: string;
}

interface GuidedCalculatorProps {
  onAddInjury: (injury: SelectedInjury) => void;
  onRemoveInjury: (id: string) => void;
  victimInfo: VictimInfo;
  onVictimInfoChange: (info: VictimInfo) => void;
  accidentType: string;
  onAccidentTypeChange: (type: string) => void;
}

// --- Helper Data ---
const professions = ["Agent de sécurité", "Agriculteur", "Artisan", "Chauffeur", "Commerçant", "Enseignant", "Fonctionnaire", "Ingénieur", "Manutentionnaire", "Médecin", "Ouvrier du bâtiment", "Secrétaire/Assistant(e)", "Technicien de surface", "Vendeur/Vendeuse", "Sans profession", "Autre"];

const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


// --- Sub-components ---

const ImageIndicator: React.FC<{ imageUrl: string; injuryName: string }> = ({ imageUrl, injuryName }) => {
    const [show, setShow] = useState(false);
    
    return (
        <div className="relative inline-block ml-1.5">
            <div
                className="w-2 h-2 rounded-full bg-blue-500 cursor-help animate-pulse hover:animate-none"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            />
            
            {show && (
                <div 
                    className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 p-2 bg-white border-2 border-blue-300 rounded-lg shadow-2xl w-80"
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                    style={{ pointerEvents: 'auto' }}
                >
                    <img 
                        src={imageUrl} 
                        alt={injuryName}
                        className="w-full rounded-md"
                    />
                </div>
            )}
        </div>
    );
};

const AdvancedRateSelector: React.FC<{ injury: Injury; onSelect: (rate: number, severity: 'low' | 'low-medium' | 'medium' | 'medium-high' | 'high') => void }> = ({ injury, onSelect }) => {
    const [currentStep, setCurrentStep] = useState(2); // Default to medium
    const severityLevels: Array<'low' | 'low-medium' | 'medium' | 'medium-high' | 'high'> = ['low', 'low-medium', 'medium', 'medium-high', 'high'];

    const steps = useMemo(() => {
        if (!Array.isArray(injury.rate)) return [];
        const [min, max] = injury.rate;

        const lowDesc = injury.rateCriteria?.low || 'Gêne minimale, sans impact fonctionnel significatif.';
        const highDesc = injury.rateCriteria?.high || 'Perte de fonction majeure ou handicap important.';
        const mediumDesc = injury.rateCriteria?.medium;

        const generatedSteps: {
            severity: 'low' | 'low-medium' | 'medium' | 'medium-high' | 'high';
            rate: number;
            description: string;
        }[] = [
            { 
                severity: 'low', 
                rate: min, 
                description: lowDesc 
            },
            { 
                severity: 'low-medium', 
                rate: Math.round(min + (max - min) * 0.25), 
                description: 'Impact fonctionnel se situant entre la description du niveau faible et celle du niveau moyen.' 
            },
            { 
                severity: 'medium', 
                rate: Math.round((min + max) / 2), 
                description: mediumDesc || 'Impact fonctionnel modéré. Une limitation claire est observée lors des activités quotidiennes ou professionnelles.' 
            },
            { 
                severity: 'medium-high', 
                rate: Math.round(min + (max - min) * 0.75), 
                description: 'Impact fonctionnel se situant entre la description du niveau moyen et celle du niveau élevé.'
            },
            { 
                severity: 'high', 
                rate: max, 
                description: highDesc 
            }
        ];

        return generatedSteps.filter((step, index, self) =>
            index === 0 || step.rate !== self[index - 1].rate
        );
    }, [injury]);

    if (steps.length === 0) return null;

    const activeStep = steps[Math.min(currentStep, steps.length - 1)];
    const severityLabels = { low: 'Faible', 'low-medium': 'Faible-Moyen', medium: 'Moyen', 'medium-high': 'Moyen-Élevé', high: 'Élevé' };

    const handleValidate = () => {
        onSelect(activeStep.rate, activeStep.severity);
    };

    return (
        <div className="mt-3 p-3 bg-slate-100 rounded-md border border-primary-200 animate-fade-in">
            <p className="text-xs font-semibold text-slate-700 mb-2">Ajuster la gravité de la séquelle :</p>
            <div className="p-4 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                    <p className="font-bold text-lg text-primary-700">{severityLabels[activeStep.severity]}</p>
                    <p className="font-extrabold text-4xl text-accent-600 my-1">{activeStep.rate}%</p>
                    <p className="text-xs text-slate-600 h-10 flex items-center justify-center">{activeStep.description}</p>
                </div>
                <input
                    type="range"
                    min="0"
                    max={steps.length - 1}
                    value={currentStep}
                    onChange={(e) => setCurrentStep(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-3"
                    step="1"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 px-1">
                    <span>{steps[0]?.rate}% (Min)</span>
                    <span>{steps[steps.length - 1]?.rate}% (Max)</span>
                </div>
            </div>
            
            {/* Astuce clinique spécifique à la lésion */}
            {injury.clinicalTip && (
                <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                    <p className="text-xs text-blue-900">
                        <span className="font-bold">💡 Astuce d'examen :</span> {injury.clinicalTip}
                    </p>
                </div>
            )}
            
            {/* Image médicale si disponible */}
            {injury.imageUrl && (
                <div className="mt-3">
                    <img 
                        src={injury.imageUrl} 
                        alt={injury.name}
                        className="w-full rounded-md border border-slate-300 shadow-sm"
                    />
                </div>
            )}
            
            <Button onClick={handleValidate} className="w-full mt-3">
                Valider ce taux
            </Button>
        </div>
    );
};


// --- Main Component ---
export const GuidedCalculator: React.FC<GuidedCalculatorProps> = ({ 
    onAddInjury, 
    onRemoveInjury,
    victimInfo,
    onVictimInfoChange,
    accidentType,
    onAccidentTypeChange
}) => {
    const [lesions, setLesions] = useState<LesionState[]>([{ id: crypto.randomUUID(), siege: '', partieCorps: '', siegePrecis: '', severity: null, selectedInjury: null }]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    const handleVictimInfoChange = (field: keyof typeof victimInfo, value: string) => {
        onVictimInfoChange({ ...victimInfo, [field]: value });
    };

    const handleAddLesion = () => {
        setLesions(prev => [...prev, { id: crypto.randomUUID(), siege: '', partieCorps: '', siegePrecis: '', severity: null, selectedInjury: null }]);
    };

    const handleRemoveLesion = (id: string) => {
        setLesions(prev => prev.filter(l => l.id !== id));
        onRemoveInjury(id); // Inform parent
    };
    
    const handleLesionChange = (id: string, field: keyof LesionState, value: any) => {
        setLesions(prev => prev.map(lesion => {
            if (lesion.id === id) {
                const updatedLesion = { ...lesion, [field]: value };
                
                const resetSequelle = () => {
                    updatedLesion.selectedInjury = null;
                    updatedLesion.severity = null;
                };

                if (field === 'siege') {
                    updatedLesion.partieCorps = '';
                    updatedLesion.siegePrecis = '';
                    resetSequelle();
                }
                if (field === 'partieCorps') {
                    updatedLesion.siegePrecis = '';
                    resetSequelle();
                }
                 if (field === 'siegePrecis') {
                    resetSequelle();
                }
                if (field === 'selectedInjury') {
                    updatedLesion.severity = null; // Reset severity when a new injury is selected
                }
                return updatedLesion;
            }
            return lesion;
        }));
    };

    useEffect(() => {
        lesions.forEach(lesion => {
            if (lesion.selectedInjury) {
                const { selectedInjury, id, siege, partieCorps, severity, siegePrecis } = lesion;
                let isComplete = false;
                let chosenRate = 0;

                if (typeof selectedInjury.rate === 'number') {
                    chosenRate = selectedInjury.rate;
                    isComplete = true;
                } else if (severity) {
                    const [min, max] = selectedInjury.rate;
                    const steps = [ min, Math.round(min + (max - min) * 0.25), Math.round((min + max) / 2), Math.round(min + (max - min) * 0.75), max ];
                    const severityMap = { 'low': steps[0], 'low-medium': steps[1], 'medium': steps[2], 'medium-high': steps[3], 'high': steps[4] };
                    chosenRate = severityMap[severity];
                    isComplete = true;
                }

                if (isComplete) {
                    const category = `${siege} > ${partieCorps}${siegePrecis ? ` (${siegePrecis})` : ''}`;
                    
                    onAddInjury({
                        ...selectedInjury,
                        id: id,
                        chosenRate: chosenRate,
                        category: category,
                    });
                    
                    // Sauvegarder dans l'historique
                    saveToHistory(
                        'guide-ia',
                        selectedInjury.name,
                        [{
                            name: selectedInjury.name,
                            rate: chosenRate,
                            path: category
                        }],
                        chosenRate,
                        victimInfo
                    );
                }
            }
        });
    }, [lesions, onAddInjury]);


    const LesionForm: React.FC<{ lesion: LesionState, index: number }> = ({ lesion, index }) => {

        const partieCorpsOptions = useMemo(() => {
            if (!lesion.siege) return [];
            if (lesion.siege === "Membres Supérieurs") return ["Ceinture Scapulaire", "Épaule", "Bras", "Coude", "Avant-bras", "Poignet", "Main", "Doigts"];
            if (lesion.siege === "Membres Inférieurs") return ["Hanche", "Cuisse", "Genou", "Jambe", "Cheville", "Pied", "Orteils", "Membre Inférieur"];
            
            const category = disabilityData.find(c => c.name === lesion.siege);
            if (!category) return [];
            const partieCorpsSet = new Set<string>();
            category.subcategories.forEach(sub => partieCorpsSet.add(sub.name.split(' - ')[0].trim()));
            return Array.from(partieCorpsSet).sort();
        }, [lesion.siege]);

        const siegePrecisOptionsMap: { [key: string]: string[] } = useMemo(() => ({
            'Ceinture Scapulaire': ['Clavicule', 'Omoplate', 'Muscles (Biceps, Deltoïde)'], 'Épaule': ['Articulation gléno-humérale'], 'Bras': ['Humérus'], 'Coude': ['Olécrane', 'Tête radiale'], 'Avant-bras': ['Radius', 'Cubitus (Ulna)', 'Les deux os'], 'Poignet': ['Scaphoïde', 'Semi-lunaire', 'Autres os du carpe'], 'Main': ['Métacarpe'], 'Doigts': ['Pouce', 'Index', 'Médius', 'Annulaire', 'Auriculaire'],
            'Hanche': ['Col du fémur', 'Cotyle'], 'Cuisse': ['Diaphyse fémorale', 'Extrémité inférieure du fémur'], 'Genou': ['Rotule (Patella)', 'Plateaux tibiaux', 'Condyles fémoraux', 'Ménisque', 'Ligament'], 'Jambe': ['Tibia', 'Péroné (Fibula)', 'Les deux os'], 'Cheville': ['Malléole interne', 'Malléole externe', 'Bi-malléolaire'], 'Pied': ['Calcanéum', 'Astragale (Talus)', 'Scaphoïde Tarsien', 'Cuboïde', 'Métatarse'], 'Orteils': ['Gros Orteil', '2ème orteil', '3ème/4ème orteil', '5ème orteil'],
        }), []);

        const currentSiegePrecisOptions = siegePrecisOptionsMap[lesion.partieCorps.trim()] || [];

        const groupedAndFilteredInjuries = useMemo(() => {
            if (!lesion.partieCorps) return [];

            const category = disabilityData.find(c => c.name === lesion.siege);
            if (!category) return [];

            const partieCorpsLower = lesion.partieCorps.trim().toLowerCase();
            
            let relevantSubcategories = category.subcategories.filter(sub => {
                const subPart = sub.name.split(' - ')[0].trim().toLowerCase();
                // Special case for 'Cheville' to also include 'Jambe' as malleolar fractures are anatomically part of leg bones but functionally part of the ankle.
                if (partieCorpsLower === 'cheville') {
                    return subPart.includes('cheville') || subPart.includes('jambe');
                }
                // General case: use 'includes' for robustness e.g. "Cheville (Cou-de-pied)" matching "Cheville"
                return subPart.includes(partieCorpsLower);
            });

            const precisLower = normalize(lesion.siegePrecis);

            const keywordMap: { [key: string]: string[] } = {
                'humérus': ['humérus'], 'radius': ['radius', 'radiale'], 'cubitus (ulna)': ['cubitus', 'cubitale', 'olécrane'], 'les deux os': ['deux os', '2 os', 'radius et cubitus', 'tibia et péroné'], 'pouce': ['pouce'], 'index': ['index'], 'médius': ['médius'], 'annulaire': ['annulaire'], 'auriculaire': ['auriculaire'], 'métacarpe': ['métacarpe', 'benett'], 'scaphoïde': ['scaphoïde'], 'semi-lunaire': ['semi-lunaire', 'demi-lunaire'], 'clavicule': ['clavicule'], 'omoplate': ['omoplate'], 'col du fémur': ['col du fémur'], 'cotyle': ['cotyle'], 'diaphyse fémorale': ['diaphyse fémorale'], 'extrémité inférieure du fémur': ['extrémité inférieure du fémur'], 'rotule (patella)': ['rotule', 'patella'], 'plateaux tibiaux': ['tibia', 'plateau'], 'condyles fémoraux': ['fémur', 'condyles'], 'ménisque': ['ménisque'], 'ligament': ['ligament', 'tendon'], 'tibia': ['tibia', 'malléole interne'], 'péroné (fibula)': ['péroné', 'malléole externe'], 'malléole interne': ['malléolaire', 'malléole'], 'malléole externe': ['malléolaire', 'malléole'], 'bi-malléolaire': ['bi-malléolaire', 'malléolaire'], 'calcanéum': ['calcanéum'], 'astragale (talus)': ['astragale'], 'scaphoïde tarsien': ['scaphoïde'], 'cuboïde': ['cuboïde'], 'métatarse': ['métatarsien'], 'gros orteil': ['gros orteil'],
            };
            const precisKeywords = precisLower ? (keywordMap[precisLower] || [precisLower]) : [];

            return relevantSubcategories.map(sub => {
                let injuries = sub.injuries;
                
                if (lesion.siegePrecis && !lesion.siegePrecis.startsWith('Autres')) {
                    if (precisKeywords.length > 0) {
                        injuries = injuries.filter(injury => {
                            const nameLower = normalize(injury.name);
                            return precisKeywords.some(kw => nameLower.includes(kw));
                        });
                    }
                }

                return { subcategoryName: sub.name, injuries };
            }).filter(group => group.injuries.length > 0);

        }, [lesion.siege, lesion.partieCorps, lesion.siegePrecis]);

        return (
            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 relative">
                {lesions.length > 1 && (
                    <button onClick={() => handleRemoveLesion(lesion.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
                <p className="font-semibold text-md text-primary-700 mb-3">Lésion #{index + 1}</p>
                <div className="space-y-3">
                    <Select label="Siège" value={lesion.siege} onChange={e => handleLesionChange(lesion.id, 'siege', e.target.value)}>
                        <option value="">Sélectionner un siège...</option>
                        {disabilityData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </Select>
                    
                    <Select label="Partie du Corps" value={lesion.partieCorps} onChange={e => handleLesionChange(lesion.id, 'partieCorps', e.target.value)} disabled={!lesion.siege}>
                        <option value="">Sélectionner une partie...</option>
                        {partieCorpsOptions.map(m => <option key={m} value={m}>{m}</option>)}
                    </Select>

                    {currentSiegePrecisOptions.length > 0 && (
                        <Select label="Siège Précis (Os/Articulation)" value={lesion.siegePrecis} onChange={e => handleLesionChange(lesion.id, 'siegePrecis', e.target.value)} disabled={!lesion.partieCorps}>
                            <option value="">Optionnel : préciser l'os...</option>
                            {currentSiegePrecisOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </Select>
                    )}

                    {lesion.partieCorps && (
                        <div className="pt-2 animate-fade-in">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sélectionner une séquelle :</label>
                            <div className="mt-2 space-y-3 max-h-60 overflow-y-auto custom-scrollbar border p-2 rounded-md bg-white">
                                {groupedAndFilteredInjuries.length > 0 ? (
                                    groupedAndFilteredInjuries.map(group => (
                                        <div key={group.subcategoryName}>
                                            <h4 className="font-semibold text-xs text-slate-500 uppercase tracking-wider mb-1 sticky top-0 bg-white/80 backdrop-blur-sm py-1">{group.subcategoryName.split(' - ')[1] || 'Général'}</h4>
                                            <div className="space-y-1">
                                                {group.injuries.map(injury => {
                                                     const isSelected = lesion.selectedInjury?.name === injury.name;
                                                     return (
                                                        <button
                                                            key={injury.name}
                                                            onClick={() => handleLesionChange(lesion.id, 'selectedInjury', injury)}
                                                            className={`w-full text-left p-2 rounded-md transition-colors text-sm ${
                                                                isSelected ? 'bg-primary-600 text-white shadow' : 'bg-slate-50 hover:bg-primary-100'
                                                            }`}
                                                        >
                                                            <p className="font-semibold flex items-center">
                                                                {injury.name}
                                                                {injury.imageUrl && (
                                                                    <ImageIndicator imageUrl={injury.imageUrl} injuryName={injury.name} />
                                                                )}
                                                            </p>
                                                            <p className={`text-xs ${isSelected ? 'text-primary-200' : 'text-slate-600'}`}>
                                                                Taux: {typeof injury.rate === 'number' ? `${injury.rate}%` : `[${injury.rate[0]}-${injury.rate[1]}]%`}
                                                            </p>
                                                        </button>
                                                     )
                                                })}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500 text-center py-4">Aucune séquelle trouvée pour cette sélection.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {lesion.selectedInjury && Array.isArray(lesion.selectedInjury.rate) && (
                        <AdvancedRateSelector 
                            injury={lesion.selectedInjury} 
                            onSelect={(rate, severity) => {
                                handleLesionChange(lesion.id, 'severity', severity);
                            }}
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <Card>
                {/* Header avec bouton historique */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">Calculateur Guidé</h2>
                    <button
                        onClick={() => setIsHistoryOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                        title="Voir l'historique des calculs"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Historique
                    </button>
                </div>
                
                <div className="space-y-4">
                    {/* --- Section 1: Informations générales --- */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-3">1. Informations sur la victime</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Âge" type="number" value={victimInfo.age} onChange={e => handleVictimInfoChange('age', e.target.value)} placeholder="ex: 45" />
                        <Select label="Sexe" value={victimInfo.gender} onChange={e => handleVictimInfoChange('gender', e.target.value)}>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                        </Select>
                        <Select label="Fonction" value={victimInfo.profession} onChange={e => handleVictimInfoChange('profession', e.target.value)}>
                            <option value="">Sélectionner...</option>
                            {professions.map(p => <option key={p} value={p}>{p}</option>)}
                        </Select>
                        <Input label="Nom de la société (Optionnel)" type="text" value={victimInfo.company || ''} onChange={e => handleVictimInfoChange('company', e.target.value)} placeholder="ex: Entreprise ABC" />
                        <Select label="Secteur" value={victimInfo.sector} onChange={e => handleVictimInfoChange('sector', e.target.value)} className="md:col-span-2">
                            <option value="prive">Privé</option>
                            <option value="public">Public</option>
                        </Select>
                    </div>
                </div>

                {/* --- Section 2: Type d'accident --- */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-3">2. Circonstances de l'événement</h3>
                    <Input 
                        label="" 
                        type="text" 
                        value={accidentType} 
                        onChange={e => onAccidentTypeChange(e.target.value)} 
                        placeholder="Décrire les circonstances (ex: Accident de trajet, chute...)" 
                    />
                </div>

                {/* --- Section 3: Lésions --- */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-3">3. Siège(s) Lésionnel(s)</h3>
                    <div className="space-y-4">
                        {lesions.map((lesion, index) => (
                            <LesionForm key={lesion.id} lesion={lesion} index={index} />
                        ))}
                    </div>
                    <Button onClick={handleAddLesion} variant="secondary" className="mt-4 w-full">
                        Ajouter un autre siège lésionnel
                    </Button>
                </div>
            </div>
        </Card>
            
            <HistoryModal 
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                calculatorType="guide-ia"
            />
        </>
    );
};

// --- Form Element Components ---
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
        <input {...props} className="w-full p-2 border border-slate-300 rounded-md bg-white text-black placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500/50 disabled:bg-slate-100 disabled:cursor-not-allowed" />
    </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, children, ...props }) => (
    <div>
        {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
        <select {...props} className="w-full p-2 border border-slate-300 rounded-md bg-white text-black focus:ring-2 focus:ring-primary-500/50 disabled:bg-slate-100 disabled:cursor-not-allowed">
            {children}
        </select>
    </div>
);