import React, { useState, useMemo, useCallback } from 'react';
import { disabilityData } from '../data/disabilityRates';
import { InjuryCategory, InjurySubcategory, Injury, SelectedInjury } from '../types';
import { Button } from './ui/Button';

interface AnalogCalculatorProps {
    onAddInjury: (injury: SelectedInjury) => void;
}

// ═══════════════════════════════════════════════════════════
//  SUPER-GROUPES ANATOMIQUES — Organisation hiérarchique
// ═══════════════════════════════════════════════════════════

interface SuperGroup {
    id: string;
    name: string;
    emoji: string;
    description: string;
    gradient: string;
    lightBg: string;
    border: string;
    text: string;
    iconBg: string;
    hoverBg: string;
    categoryMatchers: string[];
}

const SUPER_GROUPS: SuperGroup[] = [
    {
        id: 'neuro',
        name: 'Système Nerveux & Crâne',
        emoji: '🧠',
        description: 'Crâniennes, neurologiques, psychiatriques',
        gradient: 'from-purple-500 to-indigo-600',
        lightBg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        iconBg: 'bg-purple-100',
        hoverBg: 'hover:bg-purple-50',
        categoryMatchers: ['Crâniennes', 'Psychiatriques Sévères'],
    },
    {
        id: 'rachis',
        name: 'Rachis & Bassin',
        emoji: '🦴',
        description: 'Rachis, bassin, moelle épinière',
        gradient: 'from-indigo-500 to-blue-600',
        lightBg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-700',
        iconBg: 'bg-indigo-100',
        hoverBg: 'hover:bg-indigo-50',
        categoryMatchers: ['Rachis', 'Bassin', 'Moelle'],
    },
    {
        id: 'nerfs',
        name: 'Nerfs Crâniens & Périphériques',
        emoji: '⚡',
        description: 'Système nerveux périphérique',
        gradient: 'from-amber-400 to-yellow-500',
        lightBg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-700',
        iconBg: 'bg-amber-100',
        hoverBg: 'hover:bg-amber-50',
        categoryMatchers: ['Nerfs'],
    },
    {
        id: 'face',
        name: 'Face, ORL & Yeux',
        emoji: '👁️',
        description: 'Maxillo-faciales, ORL, ophtalmologiques',
        gradient: 'from-blue-500 to-cyan-500',
        lightBg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconBg: 'bg-blue-100',
        hoverBg: 'hover:bg-blue-50',
        categoryMatchers: ['Maxillo', 'ORL', 'Ophtalmologiques'],
    },
    {
        id: 'thorax',
        name: 'Thorax, Abdomen & Cardio',
        emoji: '❤️',
        description: 'Thoraciques, abdominales, cardiovasculaires',
        gradient: 'from-red-500 to-rose-500',
        lightBg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-700',
        iconBg: 'bg-red-100',
        hoverBg: 'hover:bg-red-50',
        categoryMatchers: ['Thoraciques', 'Abdominales', 'Cardio'],
    },
    {
        id: 'mbr_sup',
        name: 'Membres Supérieurs',
        emoji: '💪',
        description: 'Épaule, bras, coude, avant-bras, main',
        gradient: 'from-emerald-500 to-green-600',
        lightBg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-700',
        iconBg: 'bg-emerald-100',
        hoverBg: 'hover:bg-emerald-50',
        categoryMatchers: ['Membres Supérieurs'],
    },
    {
        id: 'mbr_inf',
        name: 'Membres Inférieurs',
        emoji: '🦵',
        description: 'Hanche, cuisse, genou, cheville, pied',
        gradient: 'from-teal-500 to-cyan-600',
        lightBg: 'bg-teal-50',
        border: 'border-teal-200',
        text: 'text-teal-700',
        iconBg: 'bg-teal-100',
        hoverBg: 'hover:bg-teal-50',
        categoryMatchers: ['Membres Inférieurs'],
    },
    {
        id: 'respiratoire',
        name: 'Appareil Respiratoire',
        emoji: '🫁',
        description: 'Séquelles respiratoires post-traumatiques',
        gradient: 'from-sky-400 to-blue-500',
        lightBg: 'bg-sky-50',
        border: 'border-sky-200',
        text: 'text-sky-700',
        iconBg: 'bg-sky-100',
        hoverBg: 'hover:bg-sky-50',
        categoryMatchers: ['Respiratoires'],
    },
    {
        id: 'peau',
        name: 'Brûlures & Peau',
        emoji: '🔥',
        description: 'Brûlures, dermatologiques étendues',
        gradient: 'from-orange-400 to-red-500',
        lightBg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        iconBg: 'bg-orange-100',
        hoverBg: 'hover:bg-orange-50',
        categoryMatchers: ['Brûlures', 'Dermatologiques'],
    },
    {
        id: 'systemic',
        name: 'Pathologies Systémiques',
        emoji: '🧬',
        description: 'Endocriniennes, infectieuses, hématologiques, professionnelles',
        gradient: 'from-violet-500 to-purple-600',
        lightBg: 'bg-violet-50',
        border: 'border-violet-200',
        text: 'text-violet-700',
        iconBg: 'bg-violet-100',
        hoverBg: 'hover:bg-violet-50',
        categoryMatchers: ['Algodystrophie', 'Endocriniennes', 'Infectieuses', 'Hématologiques', 'Maladies Professionnelles', 'Obstétricales', 'Gynécologiques', 'Amputations Multiples', 'Polyhandicap'],
    },
];


// ═══════════════════════════════════════════════════════════
//  Composant: Indicateur d'image médicale
// ═══════════════════════════════════════════════════════════

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


// ═══════════════════════════════════════════════════════════
//  Composant: Sélecteur guidé de taux (curseur min-max)
// ═══════════════════════════════════════════════════════════

const GuidedRateSelector: React.FC<{
    injury: Injury;
    onAdd: (rate: number) => void;
    onCancel: () => void;
}> = ({ injury, onAdd, onCancel }) => {
    if (!Array.isArray(injury.rate)) return null;

    const [currentStepIndex, setCurrentStepIndex] = useState(2);

    const steps = useMemo(() => {
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


// ═══════════════════════════════════════════════════════════
//  Utilitaire: Trouver le super-groupe d'une catégorie
// ═══════════════════════════════════════════════════════════

const getCategoryGroup = (categoryName: string): SuperGroup => {
    const catNameLower = categoryName.toLowerCase();
    return SUPER_GROUPS.find(sg =>
        sg.categoryMatchers.some(m => catNameLower.includes(m.toLowerCase()))
    ) || SUPER_GROUPS[SUPER_GROUPS.length - 1];
};


// ═══════════════════════════════════════════════════════════
//  Composant principal: AnalogCalculator
// ═══════════════════════════════════════════════════════════

export const AnalogCalculator: React.FC<AnalogCalculatorProps> = ({ onAddInjury }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
    const [editingInjury, setEditingInjury] = useState<{ name: string; path: string } | null>(null);
    
    const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // ═══════════════════════════════════════════════════════════
    //  🆕 V3.3.354: RECHERCHE SÉMANTIQUE AMÉLIORÉE
    //  Multi-token AND, synonymes médicaux, scoring de pertinence
    // ═══════════════════════════════════════════════════════════

    // Dictionnaire de synonymes médicaux bidirectionnels
    const MEDICAL_SYNONYMS: Record<string, string[]> = useMemo(() => ({
        // Anatomie membre supérieur
        'epaule': ['scapulaire', 'gleno-humerale', 'omoplate', 'acromio', 'scapulo', 'coiffe', 'sus-epineux', 'sous-epineux', 'deltoide'],
        'bras': ['humerus', 'humeral', 'diaphyse humerale', 'brachial'],
        'coude': ['olecrane', 'epicondyle', 'epitrochlee', 'cubital', 'radial'],
        'avant-bras': ['radius', 'cubitus', 'ulna', 'radio-cubital', 'prono-supination'],
        'poignet': ['carpien', 'scaphoide', 'semi-lunaire', 'lunatum', 'radio-carpien'],
        'main': ['metacarpien', 'metacarpe', 'paume', 'palmaire', 'prehension', 'doigt'],
        'doigt': ['phalange', 'phalangien', 'interphalangien', 'index', 'medius', 'annulaire', 'auriculaire', 'pouce'],
        'pouce': ['thenar', 'trapeze', 'metacarpien pouce', 'opposition'],
        // Anatomie membre inférieur
        'hanche': ['coxo-femoral', 'cotyle', 'acetabulum', 'coxarthrose', 'femoral', 'trochanter'],
        'cuisse': ['femur', 'femoral', 'diaphyse femorale', 'quadriceps'],
        'genou': ['gonalgie', 'rotule', 'patella', 'menisque', 'croise', 'lca', 'lcp', 'condyle', 'genu', 'gonarthrose', 'tibio-femoral'],
        'jambe': ['tibia', 'perone', 'fibula', 'tibial', 'diaphyse tibiale', 'jambier'],
        'cheville': ['malleole', 'bimalleolaire', 'trimalleolaire', 'astragale', 'talus', 'tibio-tarsien', 'talo-crural'],
        'pied': ['calcaneum', 'metatarsien', 'orteil', 'tarse', 'lisfranc', 'chopart', 'plantaire', 'tarsien'],
        // Rachis
        'rachis': ['vertebre', 'vertebral', 'colonne', 'spinal', 'disc', 'intervertebral'],
        'cervical': ['cervicale', 'cervicalgie', 'cervicarthrose', 'cervico', 'cou', 'nuque', 'atlas', 'axis'],
        'dorsal': ['dorsale', 'dorsalgie', 'thoracique'],
        'lombaire': ['lombalgie', 'lombosciatalgie', 'lombarthrose', 'lombo', 'lumbago'],
        // Types de lésions
        'fracture': ['fracturaire', 'cal vicieux', 'pseudarthrose', 'consolidation', 'trait de fracture', 'comminutive'],
        'luxation': ['subluxation', 'dislocation', 'desarticulation', 'instabilite'],
        'entorse': ['ligament', 'ligamentaire', 'laxite', 'croise', 'lateral', 'sprain'],
        'rupture': ['dechirure', 'section', 'arrachement', 'lesion'],
        'raideur': ['ankylose', 'limitation', 'enraidissement', 'flessum', 'blocage', 'arthrodese'],
        'amputation': ['ablation', 'desarticulation', 'moignon', 'prothese'],
        // Pathologies
        'hernie': ['discale', 'protrusion', 'extrusion', 'discopathie'],
        'sciatique': ['sciatalgie', 'radiculalgie', 'cruralgie', 'lombosciatalgie', 'radiculopathie'],
        'algodystrophie': ['sdrc', 'sudeck', 'dystrophie', 'capsulite'],
        'arthrose': ['gonarthrose', 'coxarthrose', 'cervicarthrose', 'lombarthrose', 'omarthrose', 'degeneratif'],
        'paralysie': ['paresie', 'hemiplegie', 'paraplegie', 'tetraplegie', 'deficit moteur', 'plegie'],
        'epilepsie': ['comitialite', 'crise comitiale', 'convulsion'],
        'brulure': ['degre', 'greffe cutanee', 'cicatrice', 'escarres'],
        'tendon': ['tendineuse', 'tendineux', 'flechisseur', 'extenseur', 'tendinopathie', 'tenosynovite'],
        'nerf': ['nerveux', 'neuropathie', 'nevralgie', 'paresthesie', 'hypoesthesie', 'median', 'cubital', 'radial', 'sciatique poplite'],
        // Séquelles
        'douleur': ['algie', 'algique', 'douloureux', 'souffrance', 'syndrome douloureux'],
        'boiterie': ['claudication', 'marche', 'deambulation', 'appui'],
        'cicatrice': ['cicatriciel', 'cheloide', 'adherente', 'retractile', 'inesthetique', 'disgracieuse'],
        // ORL / Ophtalmo
        'surdite': ['hypoacousie', 'auditive', 'audiometrie', 'decibel', 'acouphene', 'oreille'],
        'cecite': ['amaurose', 'vision', 'acuite visuelle', 'ophtalmologique', 'oeil'],
        'nez': ['nasale', 'septum', 'deviation', 'anosmie', 'os propres'],
        // Viscéral
        'rate': ['splenectomie', 'spleen'],
        'rein': ['nephrectomie', 'renale'],
        'foie': ['hepatique', 'hepatectomie'],
        'intestin': ['colectomie', 'gastrectomie', 'grele'],
        // Abréviations courantes
        'lca': ['ligament croise anterieur', 'croise anterieur', 'genou croise'],
        'lcp': ['ligament croise posterieur', 'croise posterieur'],
        'lle': ['ligament lateral externe'],
        'lli': ['ligament lateral interne'],
        'tc': ['traumatisme cranien', 'traumatisme craniocervical', 'cranien'],
        'sdrc': ['algodystrophie', 'sudeck', 'syndrome douloureux regional complexe'],
        'ptsd': ['stress post-traumatique', 'etat de stress', 'psychotraumatisme'],
    }), []);

    // Expand a search token with its medical synonyms
    const expandWithSynonyms = useCallback((token: string): string[] => {
        const results = [token];
        const normToken = normalize(token);
        
        // Direct match: token is a key
        if (MEDICAL_SYNONYMS[normToken]) {
            results.push(...MEDICAL_SYNONYMS[normToken]);
        }
        
        // Reverse match: token appears in a synonym list
        for (const [key, synonyms] of Object.entries(MEDICAL_SYNONYMS)) {
            if (synonyms.some(s => normalize(s) === normToken || normalize(s).includes(normToken) || normToken.includes(normalize(s)))) {
                results.push(key);
                results.push(...synonyms);
            }
        }
        
        // Partial key match (e.g., "cervic" matches "cervical")
        for (const [key, synonyms] of Object.entries(MEDICAL_SYNONYMS)) {
            if (normToken.length >= 3 && (key.includes(normToken) || normToken.includes(key))) {
                results.push(key);
                results.push(...synonyms);
            }
        }
        
        return [...new Set(results.map(r => normalize(r)))];
    }, [MEDICAL_SYNONYMS]);

    // Score an injury against search tokens
    const scoreInjury = useCallback((injury: Injury, tokens: string[], expandedTokens: string[][]): number => {
        const normName = normalize(injury.name);
        const normDesc = normalize(injury.description || '');
        const normSearchTerms = (injury.searchTerms || []).map(t => normalize(t)).join(' ');
        const allText = `${normName} ${normDesc} ${normSearchTerms}`;
        
        let totalScore = 0;
        let allTokensMatch = true;
        
        for (let i = 0; i < tokens.length; i++) {
            const expanded = expandedTokens[i];
            let tokenScore = 0;
            let tokenMatches = false;
            
            for (const variant of expanded) {
                // Exact word in name (highest priority)
                if (normName.includes(variant)) {
                    const bonus = variant === normalize(tokens[i]) ? 100 : 60; // direct vs synonym
                    tokenScore = Math.max(tokenScore, bonus);
                    tokenMatches = true;
                }
                // In description
                if (normDesc.includes(variant)) {
                    const bonus = variant === normalize(tokens[i]) ? 40 : 25;
                    tokenScore = Math.max(tokenScore, bonus);
                    tokenMatches = true;
                }
                // In searchTerms
                if (normSearchTerms.includes(variant)) {
                    const bonus = variant === normalize(tokens[i]) ? 50 : 30;
                    tokenScore = Math.max(tokenScore, bonus);
                    tokenMatches = true;
                }
            }
            
            if (!tokenMatches) {
                allTokensMatch = false;
                break;
            }
            totalScore += tokenScore;
        }
        
        // All tokens must match (AND logic)
        if (!allTokensMatch) return 0;
        
        // Bonus for exact phrase match in name
        const fullQuery = tokens.join(' ');
        if (normName.includes(normalize(fullQuery))) totalScore += 200;
        
        // Bonus for shorter names (more specific matches rank higher)
        totalScore += Math.max(0, 50 - Math.floor(normName.length / 5));
        
        return totalScore;
    }, []);

    // ─── Mapper les catégories dans les super-groupes ───
    const groupedData = useMemo(() => {
        const result: Record<string, InjuryCategory[]> = {};
        SUPER_GROUPS.forEach(sg => { result[sg.id] = []; });
        
        disabilityData.forEach(category => {
            const catNameLower = category.name.toLowerCase();
            let assigned = false;
            for (const sg of SUPER_GROUPS) {
                if (sg.categoryMatchers.some(m => catNameLower.includes(m.toLowerCase()))) {
                    result[sg.id].push(category);
                    assigned = true;
                    break;
                }
            }
            if (!assigned) {
                result['systemic'].push(category);
            }
        });
        
        return result;
    }, []);

    // ─── Statistiques par super-groupe ───
    const groupStats = useMemo(() => {
        const stats: Record<string, { categories: number; subcategories: number; injuries: number }> = {};
        SUPER_GROUPS.forEach(sg => {
            const cats = groupedData[sg.id] || [];
            let subcategories = 0;
            let injuries = 0;
            cats.forEach(cat => {
                subcategories += cat.subcategories.length;
                cat.subcategories.forEach(sub => { injuries += sub.injuries.length; });
            });
            stats[sg.id] = { categories: cats.length, subcategories, injuries };
        });
        return stats;
    }, [groupedData]);

    // ─── Totaux globaux ───
    const totalStats = useMemo(() => {
        let injuries = 0;
        disabilityData.forEach(cat => cat.subcategories.forEach(sub => { injuries += sub.injuries.length; }));
        return { categories: disabilityData.length, injuries };
    }, []);

    // ─── Résultats de recherche sémantique (V3.3.354) ───
    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return null;
        
        // Tokenize search input (split on spaces, hyphens as separate tokens too)
        const rawTokens = normalize(searchTerm.trim()).split(/\s+/).filter(t => t.length >= 2);
        if (rawTokens.length === 0) return null;
        
        // Expand each token with synonyms
        const expandedTokens = rawTokens.map(t => expandWithSynonyms(t));
        
        // Score all injuries
        const scoredResults: Array<{ injury: Injury; category: InjuryCategory; subcategory: InjurySubcategory; score: number }> = [];
        
        disabilityData.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.injuries.forEach(injury => {
                    const score = scoreInjury(injury, rawTokens, expandedTokens);
                    if (score > 0) {
                        scoredResults.push({ injury, category, subcategory, score });
                    }
                });
            });
        });
        
        // Sort by score descending
        scoredResults.sort((a, b) => b.score - a.score);
        
        // Rebuild category structure from scored results (preserving sort order)
        const categoryMap = new Map<string, Map<string, Injury[]>>();
        const categoryOrder: string[] = [];
        
        for (const { injury, category, subcategory } of scoredResults) {
            if (!categoryMap.has(category.name)) {
                categoryMap.set(category.name, new Map());
                categoryOrder.push(category.name);
            }
            const subMap = categoryMap.get(category.name)!;
            if (!subMap.has(subcategory.name)) {
                subMap.set(subcategory.name, []);
            }
            subMap.get(subcategory.name)!.push(injury);
        }
        
        // Convert back to InjuryCategory[]
        const filtered: InjuryCategory[] = [];
        for (const catName of categoryOrder) {
            const originalCat = disabilityData.find(c => c.name === catName);
            if (!originalCat) continue;
            const subMap = categoryMap.get(catName)!;
            const subcategories: InjurySubcategory[] = [];
            for (const [subName, injuries] of subMap) {
                const originalSub = originalCat.subcategories.find(s => s.name === subName);
                if (originalSub) {
                    subcategories.push({ ...originalSub, injuries });
                }
            }
            filtered.push({ ...originalCat, subcategories });
        }
        
        // Also include category-name matches
        const lowercasedFilter = normalize(searchTerm.trim());
        disabilityData.forEach(category => {
            if (normalize(category.name).includes(lowercasedFilter) && !filtered.find(f => f.name === category.name)) {
                filtered.push(category);
            }
        });
        
        return filtered;
    }, [searchTerm, expandWithSynonyms, scoreInjury]);

    // ─── Compteur résultats de recherche ───
    const searchResultsCount = useMemo(() => {
        if (!searchResults) return 0;
        let count = 0;
        searchResults.forEach(cat => cat.subcategories.forEach(sub => { count += sub.injuries.length; }));
        return count;
    }, [searchResults]);

    // ════════════════ Handlers ════════════════

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

    const toggleCategory = useCallback((catName: string) => {
        setOpenCategories(prev => {
            const next = new Set(prev);
            if (next.has(catName)) next.delete(catName);
            else next.add(catName);
            return next;
        });
    }, []);

    const openGroupView = useCallback((groupId: string) => {
        setActiveGroup(groupId);
        setOpenCategories(new Set());
        setEditingInjury(null);
    }, []);

    const goBackToGrid = useCallback(() => {
        setActiveGroup(null);
        setOpenCategories(new Set());
        setEditingInjury(null);
    }, []);

    // ─── Quick searches ───
    const quickSearches = [
        { label: 'Fracture', term: 'fracture' },
        { label: 'Raideur', term: 'raideur' },
        { label: 'Amputation', term: 'amputation' },
        { label: 'Ankylose', term: 'ankylose' },
        { label: 'Hernie discale', term: 'hernie discale' },
        { label: 'Sciatique', term: 'sciatique' },
        { label: 'Épilepsie', term: 'épilepsie' },
        { label: 'Hémiplégie', term: 'hémiplégie' },
        { label: 'Canal carpien', term: 'canal carpien' },
        { label: 'Coiffe rotateurs', term: 'coiffe rotateurs' },
        { label: 'Algodystrophie', term: 'algodystrophie' },
        { label: 'Ménisque', term: 'ménisque' },
    ];

    // Resolve active group
    const activeSuperGroup = activeGroup ? SUPER_GROUPS.find(sg => sg.id === activeGroup) : null;
    const activeCategories = activeGroup ? groupedData[activeGroup] || [] : [];

    // ════════════════ Render helpers ════════════════

    // ─── Rendu d'une lésion individuelle ───
    const renderInjury = (injury: Injury, categoryName: string, subName: string) => {
        const isEditing = editingInjury?.name === injury.name;
        const path = `${categoryName} > ${subName}`;
        return (
            <div key={injury.name}>
                <div className={`p-3 bg-white border border-slate-200/80 flex items-start justify-between gap-3 hover:border-primary-300 transition-colors ${isEditing ? 'rounded-t-lg border-b-0' : 'rounded-lg'}`}>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-900 flex items-center flex-wrap">
                            {injury.imageUrl && (
                                <ImageIndicator imageUrl={injury.imageUrl} injuryName={injury.name} clinicalTip={injury.clinicalTip} />
                            )}
                            <span className="break-words">{injury.name}</span>
                        </p>
                        {injury.description && (
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{injury.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center text-xs font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full border border-accent-200">
                                {typeof injury.rate === 'number' ? `${injury.rate}%` : `${injury.rate[0]}–${injury.rate[1]}%`}
                            </span>
                        </div>
                        {Array.isArray(injury.rate) && injury.rateCriteria && (
                            <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                                <div className="space-y-1">
                                    <div className="flex items-start">
                                        <span className="font-bold text-green-600 w-20 flex-shrink-0">Min ({injury.rate[0]}%)</span>
                                        <span className="ml-1">{injury.rateCriteria.low}</span>
                                    </div>
                                    {injury.rateCriteria.medium && (
                                        <div className="flex items-start">
                                            <span className="font-bold text-yellow-600 w-20 flex-shrink-0">Moy (~{Math.round((injury.rate[0] + injury.rate[1]) / 2)}%)</span>
                                            <span className="ml-1">{injury.rateCriteria.medium}</span>
                                        </div>
                                    )}
                                    <div className="flex items-start">
                                        <span className="font-bold text-red-600 w-20 flex-shrink-0">Max ({injury.rate[1]}%)</span>
                                        <span className="ml-1">{injury.rateCriteria.high}</span>
                                    </div>
                                </div>
                                {(injury.name.toLowerCase().includes('cataracte') || 
                                  injury.name.toLowerCase().includes('acuité') ||
                                  injury.name.toLowerCase().includes('vision')) && (
                                    <div className="mt-2 pt-2 border-t border-blue-200 bg-blue-50 p-2 rounded">
                                        <p className="text-xs text-blue-800">
                                            <span className="font-bold">💡 Astuce :</span> Pour une évaluation précise avec acuité visuelle chiffrée, utilisez l'onglet <span className="font-semibold">"Guide IA"</span>.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <Button 
                        onClick={() => handleToggleEditor(injury, path)}
                        className="!px-3 !py-1.5 self-center flex-shrink-0"
                        variant={isEditing ? 'secondary' : 'primary'}
                    >
                        {Array.isArray(injury.rate) ? (isEditing ? 'Annuler' : 'Préciser') : 'Ajouter'}
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
                                category: path,
                            });
                            setEditingInjury(null);
                        }}
                        onCancel={() => setEditingInjury(null)}
                    />
                )}
            </div>
        );
    };

    // ─── Rendu d'une sous-catégorie ───
    const renderSubcategory = (sub: InjurySubcategory, categoryName: string, group: SuperGroup) => (
        <div key={sub.name} className="mb-4">
            <h4 className={`font-semibold text-sm ${group.text} mb-2 pl-3 flex items-center gap-2 border-l-[3px] ${group.border}`}>
                <span className={`${group.lightBg} px-2.5 py-1 rounded-md flex items-center gap-1.5`}>
                    📌 {sub.name}
                </span>
                <span className="text-xs font-normal text-slate-400">({sub.injuries.length})</span>
            </h4>
            <div className="space-y-1.5 pl-3">
                {sub.injuries.map(injury => renderInjury(injury, categoryName, sub.name))}
            </div>
        </div>
    );

    // ─── Rendu d'une catégorie (accordéon) ───
    const renderCategory = (category: InjuryCategory, group: SuperGroup) => {
        const isOpen = openCategories.has(category.name) || !!searchTerm;
        const totalInjuries = category.subcategories.reduce((acc, sub) => acc + sub.injuries.length, 0);
        
        const shouldShowImage = category.name === "Épaule - Amputation et Désarticulation" ||
            category.name === "Bras - Amputations" ||
            category.name === "Coude - Désarticulation" ||
            category.name === "Avant-bras - Amputations" ||
            category.name === "Poignet - Désarticulation" ||
            category.name === "Main - Amputations";

        return (
            <div key={category.name} className="mb-2">
                <button
                    onClick={() => toggleCategory(category.name)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                        isOpen 
                            ? `${group.lightBg} ${group.border} shadow-sm` 
                            : `bg-white ${group.border} ${group.hoverBg}`
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <span className={`w-8 h-8 rounded-lg ${group.iconBg} flex items-center justify-center text-sm flex-shrink-0`}>
                                {group.emoji}
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className={`font-bold text-[13px] leading-tight ${isOpen ? group.text : 'text-slate-700'}`}>
                                    {category.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[11px] text-slate-400">
                                        {category.subcategories.length} sous-cat.
                                    </span>
                                    <span className="text-slate-300">·</span>
                                    <span className="text-[11px] text-slate-400">
                                        {totalInjuries} lésion{totalInjuries > 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                            {shouldShowImage && (
                                <span 
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold cursor-help transition-colors"
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
                        <svg className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-slate-400 flex-shrink-0 ml-2`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>
                {isOpen && (
                    <div className="mt-2 pl-2 space-y-2 animate-fade-in">
                        {category.subcategories.map(sub => renderSubcategory(sub, category.name, group))}
                    </div>
                )}
            </div>
        );
    };

    // ════════════════════════════════════════════════════════
    //  RENDU PRINCIPAL
    // ════════════════════════════════════════════════════════

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
                    placeholder="Recherche sémantique (ex: fracture genou, raideur épaule, hernie lombaire...)"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); if (e.target.value) setActiveGroup(null); }}
                    className="w-full pl-10 pr-10 p-3 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* ─── Quick searches (vue grille uniquement) ─── */}
            {!searchTerm && !activeGroup && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {quickSearches.map(qs => (
                        <button
                            key={qs.term}
                            onClick={() => setSearchTerm(qs.term)}
                            className="text-xs px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-all shadow-sm"
                        >
                            🔍 {qs.label}
                        </button>
                    ))}
                </div>
            )}

            {/* ─── Zone scrollable ─── */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 -mr-1">

                {/* ═══════════════════════════════════════════════
                    VUE 1 : Grille des super-groupes anatomiques
                   ═══════════════════════════════════════════════ */}
                {!searchTerm && !activeGroup && (
                    <>
                        {/* Stats globales */}
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 px-1">
                            <div className="flex items-center gap-1.5">
                                <span className="inline-block w-2 h-2 rounded-full bg-primary-400"></span>
                                <strong className="text-slate-700">{totalStats.categories}</strong> catégories
                            </div>
                            <span className="text-slate-300">·</span>
                            <div className="flex items-center gap-1.5">
                                <span className="inline-block w-2 h-2 rounded-full bg-accent-400"></span>
                                <strong className="text-slate-700">{totalStats.injuries}</strong> lésions
                            </div>
                            <span className="text-slate-300">·</span>
                            <div className="flex items-center gap-1.5">
                                <strong className="text-slate-700">10</strong> régions
                            </div>
                        </div>

                        {/* Titre de section */}
                        <div className="flex items-center gap-2 mb-4 px-1">
                            <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                            <h2 className="text-sm font-bold text-slate-700">Organisation Anatomique</h2>
                        </div>

                        {/* Grille de cartes */}
                        <div className="grid grid-cols-2 gap-3">
                            {SUPER_GROUPS.map(sg => {
                                const stats = groupStats[sg.id];
                                return (
                                    <button
                                        key={sg.id}
                                        onClick={() => openGroupView(sg.id)}
                                        className={`text-left rounded-xl overflow-hidden border ${sg.border} bg-white hover:shadow-lg transition-all duration-300 group/card active:scale-[0.98]`}
                                    >
                                        {/* Barre de gradient supérieure */}
                                        <div className={`h-1.5 bg-gradient-to-r ${sg.gradient}`}></div>
                                        
                                        {/* Corps de la carte */}
                                        <div className="p-3.5">
                                            <div className="flex items-start gap-3">
                                                <span className={`w-11 h-11 rounded-xl ${sg.iconBg} flex items-center justify-center text-2xl flex-shrink-0 group-hover/card:scale-110 transition-transform duration-300 shadow-sm`}>
                                                    {sg.emoji}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className={`font-bold text-[13px] ${sg.text} leading-tight`}>
                                                        {sg.name}
                                                    </h3>
                                                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                                                        {sg.description}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Badges statistiques */}
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className={`text-[10px] font-bold ${sg.text} ${sg.lightBg} px-2 py-0.5 rounded-md`}>
                                                    {stats.categories} catégorie{stats.categories > 1 ? 's' : ''}
                                                </span>
                                                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                                    {stats.injuries} lésion{stats.injuries > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Astuce en bas */}
                        <div className="mt-4 px-1">
                            <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200/50 rounded-xl p-3.5">
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    <span className="font-bold text-primary-700">💡 Astuce :</span> Cliquez sur une région pour explorer ses catégories, ou utilisez la <span className="font-semibold">barre de recherche</span> pour trouver une lésion spécifique.
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* ═══════════════════════════════════════════════
                    VUE 2 : Détail d'un super-groupe sélectionné
                   ═══════════════════════════════════════════════ */}
                {!searchTerm && activeGroup && activeSuperGroup && (
                    <>
                        {/* En-tête du groupe avec bouton retour */}
                        <div className={`rounded-xl overflow-hidden border ${activeSuperGroup.border} mb-4 bg-white shadow-sm`}>
                            <div className={`h-2 bg-gradient-to-r ${activeSuperGroup.gradient}`}></div>
                            <div className="p-3.5 flex items-center gap-3">
                                <button
                                    onClick={goBackToGrid}
                                    className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0"
                                    title="Retour aux régions"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Retour
                                </button>
                                <span className={`w-10 h-10 rounded-xl ${activeSuperGroup.iconBg} flex items-center justify-center text-xl flex-shrink-0`}>
                                    {activeSuperGroup.emoji}
                                </span>
                                <div className="min-w-0">
                                    <h2 className={`font-bold text-base ${activeSuperGroup.text} leading-tight`}>
                                        {activeSuperGroup.name}
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {groupStats[activeGroup].categories} catégorie{groupStats[activeGroup].categories > 1 ? 's' : ''} · {groupStats[activeGroup].subcategories} sous-catégorie{groupStats[activeGroup].subcategories > 1 ? 's' : ''} · {groupStats[activeGroup].injuries} lésion{groupStats[activeGroup].injuries > 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bouton "Tout déplier / replier" */}
                        <div className="flex justify-end mb-2 px-1">
                            <button
                                onClick={() => {
                                    if (openCategories.size === activeCategories.length) {
                                        setOpenCategories(new Set());
                                    } else {
                                        setOpenCategories(new Set(activeCategories.map(c => c.name)));
                                    }
                                }}
                                className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 transition-colors"
                            >
                                {openCategories.size === activeCategories.length ? (
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

                        {/* Liste des catégories du groupe */}
                        <div className="space-y-2">
                            {activeCategories.map(cat => renderCategory(cat, activeSuperGroup))}
                        </div>

                        {activeCategories.length === 0 && (
                            <div className="text-center text-slate-400 py-10">
                                <p className="text-4xl mb-3">📭</p>
                                <p className="text-sm font-medium">Aucune catégorie dans ce groupe</p>
                            </div>
                        )}
                    </>
                )}

                {/* ═══════════════════════════════════════════════
                    VUE 3 : Résultats de recherche
                   ═══════════════════════════════════════════════ */}
                {searchTerm && searchResults && (
                    <>
                        {/* Statistiques de recherche */}
                        <div className="flex items-center gap-2 text-xs mb-3 px-1 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium border border-primary-200">
                                🔍 <strong>{searchResultsCount}</strong> résultat{searchResultsCount > 1 ? 's' : ''}
                            </span>
                            <span className="text-slate-400">dans</span>
                            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                                <strong>{searchResults.length}</strong> catégorie{searchResults.length > 1 ? 's' : ''}
                            </span>
                            {normalize(searchTerm.trim()).split(/\s+/).filter(t => t.length >= 2).some(t => {
                                const normT = normalize(t);
                                return Object.keys(MEDICAL_SYNONYMS).some(k => k === normT) ||
                                    Object.values(MEDICAL_SYNONYMS).some(syns => syns.some(s => normalize(s) === normT || normalize(s).includes(normT)));
                            }) && (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-medium border border-amber-200">
                                    🧠 Synonymes médicaux activés
                                </span>
                            )}
                        </div>

                        {searchResults.length === 0 ? (
                            <div className="text-center text-slate-500 py-10">
                                <p className="text-4xl mb-3">🔍</p>
                                <p className="text-base font-semibold mb-1">Aucun résultat trouvé</p>
                                <p className="text-sm text-slate-400 mb-2">Essayez avec d'autres termes de recherche</p>
                                <p className="text-xs text-slate-400 mb-4">💡 Essayez des termes plus généraux comme « fracture », « raideur », « genou »</p>
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="text-sm text-primary-600 hover:text-primary-800 font-medium underline underline-offset-2"
                                >
                                    Effacer la recherche
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {searchResults.map(category => {
                                    const group = getCategoryGroup(category.name);
                                    return renderCategory(category, group);
                                })}
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};
