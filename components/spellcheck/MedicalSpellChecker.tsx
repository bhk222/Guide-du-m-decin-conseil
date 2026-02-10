/**
 * Composant UI du correcteur d'orthographe médical
 * Panneau amber affiché sous le textarea avec suggestions cliquables
 */

import React from 'react';
import { SpellCheckResult } from './useMedicalSpellCheck';

interface MedicalSpellCheckerProps {
    results: SpellCheckResult[];
    onApply: (result: SpellCheckResult, correction: string) => void;
    onIgnore: (result: SpellCheckResult) => void;
    onDismiss: () => void;
}

export const MedicalSpellChecker: React.FC<MedicalSpellCheckerProps> = ({
    results,
    onApply,
    onIgnore,
    onDismiss,
}) => {
    if (results.length === 0) return null;

    return (
        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 animate-in fade-in">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Correcteur medical ({results.length} suggestion{results.length > 1 ? 's' : ''})
                </h4>
                <button
                    onClick={onDismiss}
                    className="text-amber-400 hover:text-amber-600 transition-colors p-0.5"
                    title="Fermer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {results.map((result, idx) => (
                    <div key={`${result.startIndex}-${idx}`} className="flex items-center gap-2 py-1 text-sm flex-wrap">
                        <span className="text-red-600 line-through font-mono text-xs bg-red-50 px-1.5 py-0.5 rounded">
                            {result.word}
                        </span>
                        <span className="text-slate-400 text-xs">→</span>
                        <div className="flex items-center gap-1 flex-wrap">
                            {result.suggestions.map((suggestion, sIdx) => (
                                <button
                                    key={sIdx}
                                    onClick={() => onApply(result, suggestion)}
                                    className="px-2 py-0.5 bg-white border border-amber-300 rounded text-xs text-amber-900 hover:bg-amber-100 hover:border-amber-400 transition-colors cursor-pointer"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => onIgnore(result)}
                            className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-auto whitespace-nowrap"
                        >
                            Ignorer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
