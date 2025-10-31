
import React, { useState } from 'react';
import { Button } from '../ui/Button';

// Data for Algerian market insulins - assumptions on packaging
const insulins = {
    basal: [
        { name: "Lantus (Glargine 100U/ml)", unitsPerBox: 1500 }, // 5x3ml
        { name: "Toujeo (Glargine 300U/ml)", unitsPerBox: 1350 }, // 3x1.5ml
        { name: "Levemir (Detemir)", unitsPerBox: 1500 },
        { name: "Abasaglar (Glargine 100U/ml)", unitsPerBox: 1500 },
        { name: "Tresiba (Degludec 100U/ml)", unitsPerBox: 1500 },
        { name: "Insulatard (NPH)", unitsPerBox: 1500 }
    ],
    bolus: [
        { name: "Novorapid (Aspart)", unitsPerBox: 1500 },
        { name: "Humalog (Lispro)", unitsPerBox: 1500 },
        { name: "Apidra (Glulisine)", unitsPerBox: 1500 },
        { name: "Actrapid (Humaine Régulière)", unitsPerBox: 1000 } // Vials 10ml
    ],
    premixed: [
        { name: "Novomix 30 (Aspart 30/70)", unitsPerBox: 1500 },
        { name: "Humalog Mix 25 (Lispro 25/75)", unitsPerBox: 1500 },
        { name: "Humalog Mix 50 (Lispro 50/50)", unitsPerBox: 1500 },
        { name: "Mixtard 30 (Humaine 30/70)", unitsPerBox: 1500 }
    ]
};

type Schema = 'basal-bolus' | 'premixed';

interface ResultLine {
    label: string;
    value: string;
    subValue?: string;
}
interface Result {
    lines: ResultLine[];
    notes: string[];
}

const ResultCard: React.FC<{ result: Result }> = ({ result }) => (
    <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="text-lg font-bold text-primary-800 mb-3 text-center">Résultats Estimés (pour 3 mois)</h3>
        <div className="space-y-3">
            {result.lines.map((line, index) => (
                <div key={index} className="p-3 bg-white rounded-md shadow-sm">
                    <p className="font-semibold text-slate-600">{line.label}</p>
                    <p className="text-xl font-bold text-primary-600">{line.value}</p>
                    {line.subValue && <p className="text-xs text-slate-500">{line.subValue}</p>}
                </div>
            ))}
        </div>
        <div className="mt-4 text-xs text-slate-500 space-y-1">
            {result.notes.map((note, i) => <p key={i}>* {note}</p>)}
            <p className="font-bold text-center pt-2">* Ceci est une estimation. Suivez toujours la prescription de votre médecin.</p>
        </div>
    </div>
);


export const InsulinCalculator: React.FC = () => {
    const [schema, setSchema] = useState<Schema>('basal-bolus');
    const [weight, setWeight] = useState('');
    const [testsPerDay, setTestsPerDay] = useState('');
    
    // State for basal-bolus schema
    const [basalInsulin, setBasalInsulin] = useState(insulins.basal[0].name);
    const [bolusInsulin, setBolusInsulin] = useState(insulins.bolus[0].name);
    
    // State for premixed schema
    const [premixedInsulin, setPremixedInsulin] = useState(insulins.premixed[0].name);

    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState('');

    const handleCalculate = () => {
        const weightNum = parseFloat(weight);
        const testsNum = parseInt(testsPerDay, 10);

        if (isNaN(weightNum) || weightNum <= 0) {
            setError('Veuillez entrer un poids valide.');
            setResult(null);
            return;
        }
         if (isNaN(testsNum) || testsNum < 0) {
            setError('Veuillez entrer un nombre de tests valide.');
            setResult(null);
            return;
        }
        setError('');

        const DURATION_IN_DAYS = 90;
        const TDD_FACTOR = 1.0; // Total Daily Dose factor (1 U/kg)
        const STRIPS_PER_BOX = 50;
        
        const tdd = weightNum * TDD_FACTOR;
        const totalStripsNeeded = testsNum * DURATION_IN_DAYS;
        const stripBoxes = Math.ceil(totalStripsNeeded / STRIPS_PER_BOX);
        
        let calculatedResult: Result;

        if (schema === 'basal-bolus') {
            const basalDose = tdd * (1/3);
            const bolusDose = tdd * (2/3);
            const bolusPerMeal = bolusDose / 3;

            const selectedBasal = insulins.basal.find(i => i.name === basalInsulin)!;
            const selectedBolus = insulins.bolus.find(i => i.name === bolusInsulin)!;
            
            const totalBasalNeeded = basalDose * DURATION_IN_DAYS;
            const totalBolusNeeded = bolusDose * DURATION_IN_DAYS;
            
            const basalBoxes = Math.ceil(totalBasalNeeded / selectedBasal.unitsPerBox);
            const bolusBoxes = Math.ceil(totalBolusNeeded / selectedBolus.unitsPerBox);

            calculatedResult = { 
                lines: [
                    { label: "Dose Totale Journalière (TDD)", value: `${tdd.toFixed(1)} Unités/jour`, subValue: "Basé sur 1 U/kg" },
                    { label: `Dose Basale (${selectedBasal.name})`, value: `${basalDose.toFixed(1)} Unités/jour`, subValue: "Répartition à 1/3 de la TDD"},
                    { label: `Dose Bolus (${selectedBolus.name})`, value: `${bolusDose.toFixed(1)} Unités/jour`, subValue: `Répartition à 2/3 de la TDD (soit ~${bolusPerMeal.toFixed(1)}U par repas)` },
                    { label: `Boîtes de ${selectedBasal.name}`, value: `${basalBoxes} boîte(s)`, subValue: `Pour 3 mois, basé sur ${selectedBasal.unitsPerBox}U par boîte` },
                    { label: `Boîtes de ${selectedBolus.name}`, value: `${bolusBoxes} boîte(s)`, subValue: `Pour 3 mois, basé sur ${selectedBolus.unitsPerBox}U par boîte` },
                    { label: "Boîtes de bandelettes", value: `${stripBoxes} boîte(s)`, subValue: `Pour 3 mois, basé sur ${testsNum} tests/jour et ${STRIPS_PER_BOX} bandelettes/boîte` }
                ], 
                notes: [
                    "Le calcul pour le schéma Basal-Bolus est basé sur 1/3 insuline lente et 2/3 insuline rapide.",
                    "Le nombre de boîtes est calculé pour une période de 3 mois (90 jours)."
                ]
            };
        } else { // Premixed schema
            const morningDose = tdd * (2/3);
            const eveningDose = tdd * (1/3);

            const selectedPremixed = insulins.premixed.find(i => i.name === premixedInsulin)!;
            
            const totalPremixedNeeded = tdd * DURATION_IN_DAYS;
            const premixedBoxes = Math.ceil(totalPremixedNeeded / selectedPremixed.unitsPerBox);

             calculatedResult = { 
                lines: [
                    { label: "Dose Totale Journalière (TDD)", value: `${tdd.toFixed(1)} Unités/jour`, subValue: "Basé sur 1 U/kg" },
                    { label: `Insuline Mixte (${selectedPremixed.name})`, value: `${morningDose.toFixed(1)} U matin / ${eveningDose.toFixed(1)} U soir`, subValue: "Répartition 2/3 matin, 1/3 soir"},
                    { label: `Boîtes de ${selectedPremixed.name}`, value: `${premixedBoxes} boîte(s)`, subValue: `Pour 3 mois, basé sur ${selectedPremixed.unitsPerBox}U par boîte` },
                    { label: "Boîtes de bandelettes", value: `${stripBoxes} boîte(s)`, subValue: `Pour 3 mois, basé sur ${testsNum} tests/jour et ${STRIPS_PER_BOX} bandelettes/boîte` }
                ], 
                notes: [
                    "Le calcul pour le schéma Prémélangé est basé sur 2/3 de la dose le matin et 1/3 le soir.",
                    "Le nombre de boîtes est calculé pour une période de 3 mois (90 jours)."
                ]
            };
        }
        
        setResult(calculatedResult);
    };
    
    const inputStyle = "mt-1 block w-full p-2 border border-slate-300 bg-white text-slate-900 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder:text-slate-500";
    const labelStyle = "block text-sm font-medium text-slate-700";

    const SchemaButton: React.FC<{
        label: string;
        value: Schema;
        current: Schema;
        onClick: (value: Schema) => void;
    }> = ({ label, value, current, onClick }) => (
        <button
            onClick={() => onClick(value)}
            className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-colors ${
                current === value
                ? 'bg-primary-500 text-white shadow'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <p className="text-slate-600 mb-4 text-sm">Cet outil estime les besoins en insuline et bandelettes sur 3 mois. Il ne remplace en aucun cas une prescription médicale.</p>
            
            <div className="space-y-4">
                {/* Schema Selector */}
                <div>
                    <label className={labelStyle}>Choisir le schéma thérapeutique</label>
                    <div className="mt-2 flex gap-2 p-1 bg-slate-100 rounded-lg">
                        <SchemaButton label="Basal-Bolus (Lente + Rapide)" value="basal-bolus" current={schema} onClick={setSchema} />
                        <SchemaButton label="Prémélangée (Mixte)" value="premixed" current={schema} onClick={setSchema} />
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="weight" className={labelStyle}>Poids du patient (kg)</label>
                        <input type="number" id="weight" value={weight} onChange={e => setWeight(e.target.value)} className={inputStyle} placeholder="ex: 70" />
                    </div>
                     <div>
                        <label htmlFor="tests" className={labelStyle}>Tests glycémiques / jour</label>
                        <input type="number" id="tests" value={testsPerDay} onChange={e => setTestsPerDay(e.target.value)} className={inputStyle} placeholder="ex: 4"/>
                    </div>
                </div>

                {schema === 'basal-bolus' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg border animate-fade-in">
                        <div>
                            <label htmlFor="basal" className={labelStyle}>Insuline Lente (Basale)</label>
                            <select id="basal" value={basalInsulin} onChange={e => setBasalInsulin(e.target.value)} className={inputStyle}>
                                {insulins.basal.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="bolus" className={labelStyle}>Insuline Rapide (Bolus)</label>
                            <select id="bolus" value={bolusInsulin} onChange={e => setBolusInsulin(e.target.value)} className={inputStyle}>
                                {insulins.bolus.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {schema === 'premixed' && (
                    <div className="p-3 bg-gray-50 rounded-lg border animate-fade-in">
                        <label htmlFor="premixed" className={labelStyle}>Insuline Prémélangée</label>
                        <select id="premixed" value={premixedInsulin} onChange={e => setPremixedInsulin(e.target.value)} className={inputStyle}>
                            {insulins.premixed.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                        </select>
                    </div>
                )}
            </div>

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
            
            <div className="mt-6">
                <Button onClick={handleCalculate} className="w-full">Calculer les besoins pour 3 mois</Button>
            </div>
            
            {result && <ResultCard result={result} />}
        </div>
    );
};
