

import React, { useState } from 'react';
import { Button } from '../ui/Button';

// Define pen data structure for clarity
const norditropinePens = [
    { name: "Norditropine NordiFlex® 5mg / 1.5ml", value: '5' },
    { name: "Norditropine NordiFlex® 10mg / 1.5ml", value: '10' },
    { name: "Norditropine NordiFlex® 15mg / 1.5ml", value: '15' }
];

interface Result {
    weeklyDose: number;
    dailyDose: number;
    pensNeeded: number;
    doseUsed: number;
}

const ResultCard: React.FC<{ result: Result; penName: string; isRenal: boolean }> = ({ result, penName, isRenal }) => (
    <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="text-lg font-bold text-primary-800 mb-3 text-center">Résultats Estimés (pour 3 mois)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white rounded-md">
                <p className="font-semibold text-slate-600">Dose Hebdomadaire</p>
                <p className="text-2xl font-bold text-primary-600">{result.weeklyDose.toFixed(2)} mg</p>
            </div>
            <div className="p-3 bg-white rounded-md">
                <p className="font-semibold text-slate-600">Dose Journalière</p>
                <p className="text-2xl font-bold text-primary-600">{result.dailyDose.toFixed(3)} mg</p>
            </div>
            <div className="p-3 bg-white rounded-md col-span-1 sm:col-span-2">
                <p className="font-semibold text-slate-600">Boîtes / Stylos de <span className="font-bold">{penName}</span> nécessaires</p>
                <p className="text-2xl font-bold text-primary-600">{result.pensNeeded} stylos</p>
            </div>
        </div>
        <div className="mt-4 text-xs text-center text-slate-500 space-y-1">
             <p>* Calcul basé sur une posologie de <strong>{result.doseUsed} mg/kg/jour</strong> {isRenal ? "(posologie pour insuffisance rénale)." : "(posologie standard)."}</p>
             <p>* Ceci est une estimation pour une cure de 3 mois (13 semaines). Suivez toujours la prescription de votre médecin.</p>
        </div>
    </div>
);


export const NorditropineCalculator: React.FC = () => {
    const [weight, setWeight] = useState('');
    const [isRenalInsufficiency, setIsRenalInsufficiency] = useState(false);
    const [penStrength, setPenStrength] = useState(norditropinePens[1].value); // Default to 10mg
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        const weightNum = parseFloat(weight);
        const penStrengthNum = parseInt(penStrength, 10);

        if (isNaN(weightNum) || weightNum <= 0) {
            setError('Veuillez entrer un poids valide.');
            setResult(null);
            return;
        }
        setError('');

        const DOSE_STANDARD = 0.035; // mg/kg/jour
        const DOSE_RENAL = 0.05;    // mg/kg/jour
        const DURATION_IN_WEEKS = 13;
        
        const dailyDosePerKg = isRenalInsufficiency ? DOSE_RENAL : DOSE_STANDARD;
        
        const dailyDose = weightNum * dailyDosePerKg;
        const weeklyDose = dailyDose * 7;
        const totalDose = weeklyDose * DURATION_IN_WEEKS;
        const pensNeeded = Math.ceil(totalDose / penStrengthNum);

        setResult({ weeklyDose, dailyDose, pensNeeded, doseUsed: dailyDosePerKg });
    };

    const inputStyle = "mt-1 block w-full p-2 border border-slate-300 bg-white text-slate-900 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-500";
    const labelStyle = "block text-sm font-medium text-slate-700";

    return (
        <div>
            <p className="text-slate-600 mb-4 text-sm">Cet outil estime les besoins en Norditropine pour 3 mois. Il ne remplace en aucun cas une prescription médicale.</p>
            <div className="space-y-4">
                <div>
                    <label htmlFor="weight" className={labelStyle}>Poids du patient (kg)</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        className={inputStyle}
                        placeholder="ex: 25"
                    />
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                    <input
                        type="checkbox"
                        id="renal"
                        checked={isRenalInsufficiency}
                        onChange={e => setIsRenalInsufficiency(e.target.checked)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                     <label htmlFor="renal" className="ml-3 block text-sm font-medium text-slate-700">
                        Insuffisance rénale
                     </label>
                </div>

                 <div>
                    <label htmlFor="pen" className={labelStyle}>Stylo Norditropine</label>
                    <select
                        id="pen"
                        value={penStrength}
                        onChange={e => setPenStrength(e.target.value)}
                        className={inputStyle}
                    >
                        {norditropinePens.map(pen => (
                            <option key={pen.value} value={pen.value}>{pen.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="mt-6 p-4 bg-slate-100 border-l-4 border-slate-400 text-slate-700 rounded-r-lg">
                <h4 className="font-bold text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Conditions de Poursuite et d'Arrêt du Traitement (Réf. H.A.S.)
                </h4>
                <div className="mt-2 text-xs space-y-2">
                    <p>
                        L'arrêt du traitement par hormone de croissance est généralement envisagé lorsque :
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            La <strong>vitesse de croissance</strong> devient très faible (ex: &lt; 2 cm/an) après la première année de traitement.
                        </li>
                        <li>
                            La <strong>maturation osseuse</strong> est quasi-complète (âge osseux &gt; 14 ans chez la fille ou &gt; 16 ans chez le garçon) et associée à une faible vitesse de croissance.
                        </li>
                         <li>
                            La <strong>taille finale</strong> est considérée comme atteinte, avec fermeture des cartilages de conjugaison.
                        </li>
                    </ul>
                </div>
            </div>

             {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            <div className="mt-6">
                <Button onClick={handleCalculate} className="w-full">Calculer</Button>
            </div>
            
            {result && (
                <ResultCard 
                    result={result} 
                    penName={norditropinePens.find(p => p.value === penStrength)?.name || ''} 
                    isRenal={isRenalInsufficiency} 
                />
            )}
        </div>
    );
};
