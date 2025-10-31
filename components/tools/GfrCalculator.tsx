
import React, { useState, useCallback } from 'react';
import { Button } from '../ui/Button';

// --- Interfaces ---
interface CkdStageInfo {
    stage: string;
    description: string;
    colorClass: string;
}

interface CalculationResult {
    value: number;
    title: string;
    unit: string;
    stageInfo?: CkdStageInfo;
    note: string;
}

// --- Formules et leurs propriétés ---
const formulas = {
    'ckd-epi': {
        name: 'CKD-EPI 2021',
        requiresWeight: false,
        note: "Formule la plus récente et recommandée pour estimer le DFG. Le diagnostic de l'IRC aux stades 1 et 2 nécessite d'autres marqueurs (ex: albuminurie).",
        description: "Recommandée pour le diagnostic et le suivi de l'IRC.",
        unit: "mL/min/1.73m²"
    },
    'cockcroft-gault': {
        name: 'Cockcroft-Gault',
        requiresWeight: true,
        note: "Cette formule estime la Clairance de la Créatinine (CrCl). Elle n'est pas normalisée à la surface corporelle et reste utilisée pour l'ajustement posologique de nombreux médicaments.",
        description: "Utile pour l'adaptation posologique des médicaments.",
        unit: "mL/min"
    },
    'mdrd': {
        name: 'MDRD',
        requiresWeight: false,
        note: "Ancienne formule d'estimation du DFG, généralement moins précise que CKD-EPI, surtout pour les DFG > 60. Le facteur ethnique n'est pas appliqué ici.",
        description: "Ancienne formule, moins utilisée aujourd'hui.",
        unit: "mL/min/1.73m²"
    }
};
type FormulaKey = keyof typeof formulas;

// --- Fonctions de Calcul ---
const calculateCkdEpi = (creatinineMgL: number, age: number, isFemale: boolean): number => {
    const creatinineMgDl = creatinineMgL / 10;
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const sexFactor = isFemale ? 1.012 : 1;

    return 142 *
        Math.pow(Math.min(creatinineMgDl / kappa, 1.0), alpha) *
        Math.pow(Math.max(creatinineMgDl / kappa, 1.0), -1.200) *
        Math.pow(0.9938, age) *
        sexFactor;
};

const calculateCockcroftGault = (creatinineMgL: number, age: number, weight: number, isFemale: boolean): number => {
    const creatinineMgDl = creatinineMgL / 10;
    if (creatinineMgDl <= 0) return 0;
    const sexFactor = isFemale ? 0.85 : 1.0;
    return ((140 - age) * weight * sexFactor) / (72 * creatinineMgDl);
};

const calculateMdrd = (creatinineMgL: number, age: number, isFemale: boolean): number => {
    const creatinineMgDl = creatinineMgL / 10;
    const sexFactor = isFemale ? 0.742 : 1.0;
    return 175 * Math.pow(creatinineMgDl, -1.154) * Math.pow(age, -0.203) * sexFactor;
};

const getGfrStage = (gfr: number): CkdStageInfo => {
    if (gfr >= 90) return { stage: "Stade 1", description: "Fonction rénale normale ou élevée.", colorClass: "bg-green-100 border-green-500 text-green-800" };
    if (gfr >= 60) return { stage: "Stade 2", description: "Insuffisance rénale chronique (IRC) légère.", colorClass: "bg-yellow-100 border-yellow-500 text-yellow-800" };
    if (gfr >= 45) return { stage: "Stade 3a", description: "IRC légère à modérée.", colorClass: "bg-orange-100 border-orange-500 text-orange-800" };
    if (gfr >= 30) return { stage: "Stade 3b", description: "IRC modérée à sévère.", colorClass: "bg-orange-200 border-orange-600 text-orange-900" };
    if (gfr >= 15) return { stage: "Stade 4", description: "IRC sévère.", colorClass: "bg-red-100 border-red-500 text-red-800" };
    return { stage: "Stade 5", description: "IRC terminale.", colorClass: "bg-red-200 border-red-600 text-red-900" };
};

// --- Composants UI ---
const ResultCard: React.FC<{ result: CalculationResult }> = ({ result }) => (
    <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg animate-fade-in">
        <h3 className="text-lg font-bold text-primary-800 mb-3 text-center">Résultats ({result.title})</h3>
        <div className="text-center">
            <p className="font-semibold text-slate-600">{result.title.includes('DFG') ? 'Débit de Filtration Glomérulaire' : 'Clairance de la Créatinine'}</p>
            <p className="text-4xl font-extrabold text-primary-600 my-1">{result.value.toFixed(0)}</p>
            <p className="text-sm text-slate-500">{result.unit}</p>
        </div>
        {result.stageInfo && (
            <div className={`mt-4 p-3 rounded-lg text-center border-l-4 ${result.stageInfo.colorClass}`}>
                <p className="font-bold text-lg">{result.stageInfo.stage}</p>
                <p className="text-sm">{result.stageInfo.description}</p>
            </div>
        )}
        <p className="text-xs text-center mt-4 text-slate-500">
            {result.note}
        </p>
    </div>
);

const FormulaButton: React.FC<{ label: string; description: string; value: FormulaKey; current: FormulaKey; onClick: (value: FormulaKey) => void; }> = 
    ({ label, description, value, current, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`flex-1 py-2 px-3 text-center rounded-md transition-colors ${
            current === value ? 'bg-primary-500 text-white shadow' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
    >
        <span className="font-semibold text-xs md:text-sm block">{label}</span>
        <span className="text-xs hidden md:block">{description}</span>
    </button>
);

const SexButton: React.FC<{ label: string; value: 'male' | 'female'; current: 'male' | 'female'; onClick: (value: 'male' | 'female') => void; }> = 
    ({ label, value, current, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-colors ${
            current === value ? 'bg-primary-500 text-white shadow' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
        }`}
    >
        {label}
    </button>
);

// --- Composant Principal ---
export const GfrCalculator: React.FC = () => {
    const [creatinine, setCreatinine] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState<'male' | 'female'>('male');
    const [formula, setFormula] = useState<FormulaKey>('ckd-epi');
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [error, setError] = useState('');
    
    const performCalculation = useCallback((
        creatinineStr: string,
        ageStr: string,
        weightStr: string,
        sexVal: 'male' | 'female',
        formulaVal: FormulaKey
    ) => {
        const creatinineNum = parseFloat(creatinineStr);
        const ageNum = parseInt(ageStr, 10);

        if (isNaN(creatinineNum) || creatinineNum <= 0) {
            throw new Error("Veuillez entrer une créatininémie valide (mg/L).");
        }
        if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
            throw new Error("Veuillez entrer un âge valide.");
        }

        const isFemale = sexVal === 'female';
        let calculatedResult: CalculationResult;

        switch (formulaVal) {
            case 'cockcroft-gault':
                const weightNum = parseFloat(weightStr);
                if (isNaN(weightNum) || weightNum <= 0) {
                    throw new Error("Pour Cockcroft-Gault, veuillez entrer un poids valide (kg).");
                }
                calculatedResult = {
                    value: calculateCockcroftGault(creatinineNum, ageNum, weightNum, isFemale),
                    title: formulas[formulaVal].name,
                    unit: formulas[formulaVal].unit,
                    note: formulas[formulaVal].note
                };
                break;
            
            case 'mdrd':
                const mdrdValue = calculateMdrd(creatinineNum, ageNum, isFemale);
                calculatedResult = {
                    value: mdrdValue,
                    title: formulas[formulaVal].name,
                    unit: formulas[formulaVal].unit,
                    stageInfo: getGfrStage(mdrdValue),
                    note: formulas[formulaVal].note
                };
                break;

            case 'ckd-epi':
            default:
                const ckdEpiValue = calculateCkdEpi(creatinineNum, ageNum, isFemale);
                calculatedResult = {
                    value: ckdEpiValue,
                    title: formulas[formulaVal].name,
                    unit: formulas[formulaVal].unit,
                    stageInfo: getGfrStage(ckdEpiValue),
                    note: formulas[formulaVal].note
                };
                break;
        }
        return calculatedResult;
    }, []);

    const handleCalculateClick = () => {
        setError('');
        setResult(null);
        try {
            const res = performCalculation(creatinine, age, weight, sex, formula);
            setResult(res);
        } catch (e: any) {
            setError(e.message);
        }
    };
    
    const inputStyle = "mt-1 block w-full p-2 border border-slate-300 bg-white text-slate-900 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-500";
    const labelStyle = "block text-sm font-medium text-slate-700";
    
    return (
        <div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
                <h3 className="text-lg font-bold text-slate-800 text-center mb-1">Calculateur de Fonction Rénale</h3>
                 <p className="text-slate-600 mb-4 text-sm text-center">Calculez le DFG ou la Clairance de la Créatinine.</p>
                <div className="space-y-4">
                    <div>
                        <label className={labelStyle}>Formule de Calcul</label>
                        <div className="mt-2 flex flex-col md:flex-row gap-2 p-1 bg-slate-100 rounded-lg">
                        {Object.keys(formulas).map(key => (
                            <FormulaButton
                                key={key}
                                label={formulas[key as FormulaKey].name}
                                description={formulas[key as FormulaKey].description}
                                value={key as FormulaKey}
                                current={formula}
                                onClick={setFormula}
                            />
                        ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="creatinine" className={labelStyle}>Créatinine (mg/L)</label>
                            <input type="number" id="creatinine" value={creatinine} onChange={e => setCreatinine(e.target.value)} className={inputStyle} placeholder="ex: 12" />
                        </div>
                        <div>
                            <label htmlFor="age" className={labelStyle}>Âge (années)</label>
                            <input type="number" id="age" value={age} onChange={e => setAge(e.target.value)} className={inputStyle} placeholder="ex: 55"/>
                        </div>
                    </div>

                    {formulas[formula].requiresWeight && (
                        <div className="animate-fade-in">
                            <label htmlFor="weight" className={labelStyle}>Poids (kg)</label>
                            <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} className={inputStyle} placeholder="ex: 70" />
                        </div>
                    )}

                    <div>
                        <label className={labelStyle}>Sexe Biologique</label>
                        <div className="mt-2 flex gap-2 p-1 bg-slate-100 rounded-lg">
                            <SexButton label="Homme" value="male" current={sex} onClick={setSex} />
                            <SexButton label="Femme" value="female" current={sex} onClick={setSex} />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <Button onClick={handleCalculateClick} className="w-full">Calculer</Button>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            {result && <ResultCard result={result} />}
        </div>
    );
};
