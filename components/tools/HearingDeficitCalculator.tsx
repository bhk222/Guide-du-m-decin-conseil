
import React, { useState } from 'react';
import { Button } from '../ui/Button';

const freqs = [500, 1000, 2000, 4000];

interface EarData {
    500: string;
    1000: string;
    2000: string;
    4000: string;
}

interface Result {
    right: { average: number; lossPercent: number };
    left: { average: number; lossPercent: number };
    binauralPercent: number;
    interpretation: string;
}

const getInterpretation = (db: number): string => {
    if (db <= 25) return "Audition normale";
    if (db <= 40) return "Perte auditive légère";
    if (db <= 70) return "Perte auditive modérée";
    if (db <= 90) return "Perte auditive sévère";
    return "Perte auditive profonde";
};


const ResultCard: React.FC<{ result: Result }> = ({ result }) => (
    <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="text-lg font-bold text-primary-800 mb-4 text-center">Résultats de l'Audiogramme</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-white rounded-md text-center">
                <h4 className="font-semibold text-slate-700">Oreille Droite</h4>
                <p className="text-2xl font-bold text-primary-600">{result.right.lossPercent.toFixed(1)}%</p>
                <p className="text-xs text-slate-500">Perte moyenne: {result.right.average.toFixed(1)} dB</p>
            </div>
            <div className="p-3 bg-white rounded-md text-center">
                <h4 className="font-semibold text-slate-700">Oreille Gauche</h4>
                <p className="text-2xl font-bold text-primary-600">{result.left.lossPercent.toFixed(1)}%</p>
                <p className="text-xs text-slate-500">Perte moyenne: {result.left.average.toFixed(1)} dB</p>
            </div>
        </div>
        <div className="p-4 bg-white rounded-md text-center">
            <h4 className="font-semibold text-slate-700">Perte Binaurale Pondérée</h4>
            <p className="text-3xl font-bold text-accent-500 my-1">{result.binauralPercent.toFixed(1)}%</p>
            <p className="font-semibold text-md text-slate-800 mt-2">{result.interpretation}</p>
        </div>
        <p className="text-xs text-center mt-4 text-slate-500">Calcul selon la méthode de Fowler. Ne remplace pas un avis médical.</p>
    </div>
);

const AudiogramExampleSVG: React.FC<{ caPoints: string, coPoints: string }> = ({ caPoints, coPoints }) => (
    <svg viewBox="0 0 100 80" className="w-full h-auto bg-white border rounded-md mt-2">
        <g transform="translate(5, 5)">
            {/* Grid lines */}
            {[0, 20, 40, 60].map(y => (
                <line key={y} x1="0" y1={y} x2="90" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
            ))}
             {[0, 30, 60, 90].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="60" stroke="#e5e7eb" strokeWidth="0.5" />
            ))}
            {/* 25dB line */}
            <line x1="0" y1="12.5" x2="90" y2="12.5" stroke="#fca5a5" strokeWidth="0.5" strokeDasharray="2 2" />
            <text x="92" y="14.5" fill="#fca5a5" fontSize="4">25dB</text>

            {/* CO line */}
            <polyline points={coPoints} fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2"/>
            {/* CA line */}
            <polyline points={caPoints} fill="none" stroke="#ef4444" strokeWidth="1"/>
        </g>
    </svg>
);


const ReadingGuide: React.FC = () => (
    <details className="group bg-gray-50 rounded-lg p-3 mb-4 border transition-colors hover:border-primary-200">
        <summary className="cursor-pointer font-semibold text-slate-700 list-none flex justify-between items-center group-hover:text-primary-700">
            Guide de lecture d'un audiogramme
             <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </summary>
        <div className="mt-4 pt-4 border-t text-sm text-slate-600 space-y-6">
            <p>L'audiogramme compare la <span className="font-bold text-red-500">Conduction Aérienne (CA)</span> et la <span className="font-bold text-blue-500">Conduction Osseuse (CO)</span> pour déterminer le type de surdité.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h5 className="font-bold text-slate-800">1. Audition Normale</h5>
                    <AudiogramExampleSVG caPoints="0,5 30,7 60,6 90,8" coPoints="0,4 30,6 60,5 90,7" />
                    <p className="mt-2">Les courbes de CA et CO sont au-dessus de 25 dB. L'audition est normale.</p>
                </div>
                 <div>
                    <h5 className="font-bold text-slate-800">2. Surdité de Perception</h5>
                    <AudiogramExampleSVG caPoints="0,30 30,35 60,45 90,50" coPoints="0,29 30,34 60,44 90,49" />
                    <p className="mt-2">Les deux courbes (CA et CO) sont abaissées et proches. Cela indique une atteinte de l'oreille interne.</p>
                </div>
                 <div>
                    <h5 className="font-bold text-slate-800">3. Surdité de Transmission</h5>
                    <AudiogramExampleSVG caPoints="0,30 30,35 60,32 90,38" coPoints="0,5 30,7 60,6 90,8" />
                    <p className="mt-2">La CO est normale mais la CA est abaissée. L'écart entre les deux indique un problème dans l'oreille externe ou moyenne.</p>
                </div>
                 <div>
                    <h5 className="font-bold text-slate-800">4. Surdité Mixte</h5>
                    <AudiogramExampleSVG caPoints="0,45 30,50 60,55 90,60" coPoints="0,25 30,30 60,35 90,40" />
                    <p className="mt-2">Les deux courbes sont abaissées, avec un écart persistant entre elles. Cela indique une atteinte combinée.</p>
                </div>
            </div>
        </div>
    </details>
);

const GuidedAnalyzer: React.FC = () => {
    type Answer = 'yes' | 'no' | '';
    interface EarAnswers {
        co: Answer;
        ca: Answer;
        gap: Answer;
    }
    const [answers, setAnswers] = useState<{right: EarAnswers, left: EarAnswers}>({
        right: { co: '', ca: '', gap: '' },
        left: { co: '', ca: '', gap: '' }
    });
    const [result, setResult] = useState<{right: {text: string, reason: string}, left: {text: string, reason: string}} | null>(null);

    const handleAnswerChange = (ear: 'right' | 'left', question: keyof EarAnswers, value: Answer) => {
        setAnswers(prev => ({ ...prev, [ear]: { ...prev[ear], [question]: value } }));
        setResult(null); // Reset result on new input
    };
    
    const getDiagnosis = ({ co, ca, gap }: EarAnswers): {text: string, reason: string} => {
        if (!co || !ca) return {text: "Analyse en attente...", reason: "Veuillez répondre aux deux premières questions."};
        if (co === 'yes' && ca === 'yes') return { text: "Audition Normale", reason: "Les conductions aérienne et osseuse sont normales." };
        if (co === 'yes' && ca === 'no') return { text: "Surdité de Transmission", reason: "La conduction osseuse normale mais aérienne altérée indique un problème de transmission (oreille externe/moyenne)." };
        if (co === 'no' && ca === 'no') {
            if (!gap) return {text: "Réponse manquante", reason: "Veuillez préciser s'il existe un écart entre les deux courbes."};
            return gap === 'yes' 
                ? { text: "Surdité Mixte", reason: "Les deux conductions sont altérées avec un écart, indiquant une atteinte de transmission ET de perception." }
                : { text: "Surdité de Perception", reason: "Les deux conductions sont altérées et proches, indiquant une atteinte de l'oreille interne." };
        }
        return { text: "Combinaison incohérente", reason: "Veuillez vérifier les courbes sur votre audiogramme."};
    }

    const handleDiagnose = () => {
        setResult({
            right: getDiagnosis(answers.right),
            left: getDiagnosis(answers.left)
        });
    }

    const Question: React.FC<{
        label: string;
        ear: 'right' | 'left';
        qKey: keyof EarAnswers;
        value: Answer;
    }> = ({ label, ear, qKey, value }) => (
        <div className="mb-3">
            <p className="text-sm text-slate-700 mb-1">{label}</p>
            <div className="flex gap-2">
                {(['yes', 'no'] as const).map(option => (
                    <button key={option} onClick={() => handleAnswerChange(ear, qKey, option)}
                        className={`flex-1 text-xs py-1.5 px-3 rounded-md transition-colors ${
                            value === option 
                            ? 'bg-primary-500 text-white font-semibold shadow-md' 
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}>
                        {option === 'yes' ? 'Oui' : 'Non'}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <h4 className="font-bold text-slate-800 border-b border-slate-300 pb-1 mb-3">Oreille Droite</h4>
                    <Question label="1. CO normale (&lt;25dB) ?" ear="right" qKey="co" value={answers.right.co} />
                    <Question label="2. CA normale (&lt;25dB) ?" ear="right" qKey="ca" value={answers.right.ca} />
                     {answers.right.co === 'no' && answers.right.ca === 'no' && (
                        <div className="animate-fade-in">
                            <Question label="3. Y a-t-il un écart CA/CO ?" ear="right" qKey="gap" value={answers.right.gap} />
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 border-b border-slate-300 pb-1 mb-3">Oreille Gauche</h4>
                     <Question label="1. CO normale (&lt;25dB) ?" ear="left" qKey="co" value={answers.left.co} />
                    <Question label="2. CA normale (&lt;25dB) ?" ear="left" qKey="ca" value={answers.left.ca} />
                     {answers.left.co === 'no' && answers.left.ca === 'no' && (
                         <div className="animate-fade-in">
                            <Question label="3. Y a-t-il un écart CA/CO ?" ear="left" qKey="gap" value={answers.left.gap} />
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <Button onClick={handleDiagnose} className="w-full">
                    Poser le diagnostic
                </Button>
            </div>
            {result && (
                <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg animate-fade-in">
                    <h4 className="text-lg font-bold text-green-800 mb-3">Diagnostic de l'Assistant</h4>
                    <div className="space-y-2">
                        <div>
                            <p className="font-semibold text-slate-800">Oreille Droite : <span className="font-bold text-primary-700">{result.right.text}</span></p>
                            <p className="text-xs text-slate-600 pl-2">Raisonnement : {result.right.reason}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-slate-800">Oreille Gauche : <span className="font-bold text-primary-700">{result.left.text}</span></p>
                             <p className="text-xs text-slate-600 pl-2">Raisonnement : {result.left.reason}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export const HearingDeficitCalculator: React.FC = () => {
    const initialEarState: EarData = { 500: '', 1000: '', 2000: '', 4000: '' };
    const [rightEar, setRightEar] = useState<EarData>(initialEarState);
    const [leftEar, setLeftEar] = useState<EarData>(initialEarState);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState('');

    const handleInputChange = (ear: 'right' | 'left', freq: number, value: string) => {
        const setter = ear === 'right' ? setRightEar : setLeftEar;
        setter(prev => ({ ...prev, [freq]: value }));
    };

    const calculateLoss = () => {
        try {
            setError('');
            const calcEar = (data: EarData) => {
                const values = freqs.map(f => parseInt(data[f], 10));
                if (values.some(isNaN)) throw new Error('Veuillez remplir toutes les cases avec des nombres.');
                
                const average = values.reduce((sum, val) => sum + val, 0) / freqs.length;
                const lossPercent = Math.max(0, (average - 25) * 1.5);
                return { average, lossPercent: Math.min(100, lossPercent) };
            };

            const rightResult = calcEar(rightEar);
            const leftResult = calcEar(leftEar);

            const [betterEar, worseEar] = rightResult.lossPercent < leftResult.lossPercent 
                ? [rightResult, leftResult] 
                : [leftResult, rightResult];
            
            const binauralPercent = ((betterEar.lossPercent * 5) + (worseEar.lossPercent * 1)) / 6;
            const interpretation = getInterpretation(Math.max(rightResult.average, leftResult.average));

            setResult({ right: rightResult, left: leftResult, binauralPercent, interpretation });

        } catch (e: any) {
            setError(e.message);
            setResult(null);
        }
    };
    
    return (
        <div className="space-y-8">
            {/* AI Analyzer Section */}
            <div>
                 <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Analyseur Guidé par IA Locale</h3>
                 <p className="text-slate-600 mb-4 text-sm text-center">Répondez aux questions pour aider l'assistant à interpréter l'audiogramme.</p>
                 <GuidedAnalyzer />
            </div>
            
            <hr className="border-slate-200" />

            {/* Manual Calculator Section */}
            <div>
                 <h3 className="text-lg font-bold text-slate-800 text-center mb-2">Calculateur Manuel du Déficit</h3>
                <p className="text-slate-600 mb-4 text-sm text-center">Entrez les seuils d'audition en décibels (dB) pour chaque fréquence.</p>
                
                <ReadingGuide />

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">Fréquence</th>
                                <th scope="col" className="px-6 py-3">Oreille Droite (dB)</th>
                                <th scope="col" className="px-6 py-3">Oreille Gauche (dB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {freqs.map(freq => (
                                <tr key={freq} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{freq} Hz</th>
                                    <td className="px-6 py-4">
                                        <input type="number" value={rightEar[freq]} onChange={e => handleInputChange('right', freq, e.target.value)} className="w-full p-1 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="number" value={leftEar[freq]} onChange={e => handleInputChange('left', freq, e.target.value)} className="w-full p-1 border border-slate-300 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                <div className="mt-6">
                    <Button onClick={calculateLoss} className="w-full">Calculer le Déficit</Button>
                </div>

                {result && <ResultCard result={result} />}
            </div>
        </div>
    );
};
