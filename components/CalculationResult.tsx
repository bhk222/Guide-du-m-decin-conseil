import React from 'react';
import { SelectedInjury } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface CalculationResultProps {
  selectedInjuries: SelectedInjury[];
  totalRate: number;
  onRemoveInjury: (id: string) => void;
  preexistingRate: number;
  setPreexistingRate: (value: number) => void;
  socialRate: number;
  setSocialRate: (value: number) => void;
  aiNotes?: string[];
  onGenerateSummary: () => void;
}

export const CalculationResult: React.FC<CalculationResultProps> = ({ 
    selectedInjuries, 
    totalRate, 
    onRemoveInjury, 
    preexistingRate,
    setPreexistingRate,
    socialRate,
    setSocialRate,
    aiNotes, 
    onGenerateSummary 
}) => {
  return (
    <Card className="w-full flex flex-col">
      <h3 className="text-lg font-bold mb-3 text-slate-800">Analyse des Lésions</h3>
      {selectedInjuries.length === 0 && preexistingRate === 0 && socialRate === 0 ? (
        <p className="text-slate-500 text-sm flex-grow flex items-center justify-center">Aucune lésion sélectionnée. Remplissez le formulaire guidé pour commencer.</p>
      ) : (
        <>
          <div className="space-y-3 mb-4 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2 flex-grow">
            {selectedInjuries.map((injury) => (
              <div key={injury.id} className="bg-slate-50/70 p-3 rounded-lg border border-slate-200/90 transition-all hover:shadow-sm animate-fade-in">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-3">
                    <p className="text-sm font-semibold text-slate-800">{injury.name}</p>
                    {injury.socialRate && injury.socialRate > 0 && (
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mt-1 inline-block">
                            Taux social: +{injury.socialRate}%
                        </span>
                    )}
                    {injury.category && (
                      <p className="text-xs text-slate-500 mt-1">{injury.category}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary-600 text-lg w-12 text-center">{injury.chosenRate + (injury.socialRate || 0)}%</span>
                    <Button onClick={() => onRemoveInjury(injury.id)} variant="danger" className="!p-1.5 !text-xs">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
                {injury.justification && (
                    <div className="mt-2 pt-2 border-t border-slate-200/90">
                        <details className="group">
                            <summary className="text-xs font-semibold text-slate-600 cursor-pointer list-none flex items-center group-hover:text-primary-700">
                                Détails de l'analyse IA
                                <svg className="h-4 w-4 ml-1 transition-transform duration-200 group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </summary>
                            <div className="mt-2 text-xs text-slate-700 bg-slate-100 p-2 rounded-md"
                                dangerouslySetInnerHTML={{ __html: injury.justification }}>
                            </div>
                        </details>
                    </div>
                )}
              </div>
            ))}
          </div>

           {aiNotes && aiNotes.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg animate-fade-in">
                <h4 className="font-semibold text-sm text-blue-800 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                   </svg>
                  Observations de l'Expert IA
                </h4>
                <ul className="mt-2 text-xs text-blue-700 list-disc list-inside space-y-1 pl-2">
                  {aiNotes.map((note, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-sm text-slate-800 mb-2">Ajustements et Majorations</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="preexistingRate" className="block text-sm font-medium text-slate-700">Incapacité antérieure (%)</label>
                        <input
                            type="number"
                            id="preexistingRate"
                            value={preexistingRate || ''}
                            onChange={(e) => setPreexistingRate(Number(e.target.value))}
                            className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm bg-white text-black placeholder:text-slate-400 focus:ring-primary-500/50"
                            placeholder="ex: 20"
                            min="0"
                            max="99"
                        />
                    </div>
                    <div>
                        <label htmlFor="socialRate" className="block text-sm font-medium text-slate-700">Majoration pour taux social (%)</label>
                        <input
                            type="number"
                            id="socialRate"
                            value={socialRate || ''}
                            onChange={(e) => setSocialRate(Number(e.target.value))}
                            className="mt-1 block w-full p-2 border border-slate-300 rounded-md shadow-sm bg-white text-black placeholder:text-slate-400 focus:ring-primary-500/50"
                            placeholder="ex: 5"
                            min="0"
                            max="10"
                        />
                    </div>
                </div>
            </div>


          <div className="mt-auto pt-4">
            {/* Calcul détaillé si taux antérieur présent */}
            {preexistingRate > 0 && selectedInjuries.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3 text-sm">
                <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  Détail du calcul (Art. 12)
                </h5>
                {(() => {
                  // Recalcul pour affichage détaillé
                  const newInjuryRates = selectedInjuries.map(i => i.chosenRate).sort((a, b) => b - a);
                  let remainingCapacity = 100;
                  let combinedNewRate = 0;
                  newInjuryRates.forEach(rate => {
                    const ipp = remainingCapacity * (rate / 100);
                    combinedNewRate += ipp;
                    remainingCapacity -= ipp;
                  });
                  
                  const t_preexisting = preexistingRate;
                  const t_global = t_preexisting + (100 - t_preexisting) * (combinedNewRate / 100);
                  const c1_capacityBefore = 100 - t_preexisting;
                  const c2_capacityAfter = 100 - t_global;
                  const accidentRate = c1_capacityBefore > 0 
                    ? ((c1_capacityBefore - c2_capacityAfter) / c1_capacityBefore) * 100 
                    : 0;
                  
                  return (
                    <div className="space-y-1 text-xs text-blue-700">
                      <p>• <strong>Taux antérieur:</strong> {preexistingRate}% (capacité résiduelle: {100 - preexistingRate}%)</p>
                      <p>• <strong>Taux nouvelles lésions (Balthazard):</strong> {combinedNewRate.toFixed(2)}%</p>
                      <p>• <strong>Taux global théorique:</strong> {t_global.toFixed(2)}%</p>
                      <p>• <strong>Capacité avant accident:</strong> {c1_capacityBefore.toFixed(2)}%</p>
                      <p>• <strong>Capacité après accident:</strong> {c2_capacityAfter.toFixed(2)}%</p>
                      <p className="pt-1 border-t border-blue-200 mt-1">
                        • <strong>Taux attribuable à l'accident actuel:</strong> {Math.round(accidentRate)}%
                      </p>
                      {socialRate > 0 && (
                        <p>• <strong>+ Majoration sociale:</strong> +{socialRate}%</p>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
            
            <div className="bg-accent-50 border border-accent-200 p-4 rounded-lg text-center">
              <h4 className="font-semibold text-md text-accent-800">Taux global d'incapacité estimé :</h4>
              <p className="text-5xl font-extrabold text-accent-600 my-1">{totalRate}%</p>
              {preexistingRate > 0 ? (
                   <p className="text-xs text-accent-700">
                      Calculé selon la formule pour infirmité antérieure (Art. 12).
                   </p>
              ) : selectedInjuries.length > 1 && (
                  <p className="text-xs text-accent-700">
                      Calculé selon la méthode Balthazard (capacité restante).
                  </p>
              )}
               {socialRate > 0 && (
                  <p className="text-xs text-accent-700">
                      Une majoration pour taux social de +{socialRate}% est incluse.
                  </p>
              )}
            </div>
             <Button 
                onClick={onGenerateSummary}
                disabled={selectedInjuries.length === 0 && preexistingRate === 0 && socialRate === 0}
                className="w-full mt-4"
            >
                Générer un Résumé Clinique
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};