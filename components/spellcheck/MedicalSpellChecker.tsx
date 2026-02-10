/**
 * Composant UI du correcteur d'orthographe médical
 * V2: Panneau compact avec "Tout corriger", "Tout ignorer", badges auto-correct
 */

import React from 'react';
import { SpellCheckResult } from './useMedicalSpellCheck';

interface MedicalSpellCheckerProps {
    results: SpellCheckResult[];
    onApply: (result: SpellCheckResult, correction: string) => void;
    onIgnore: (result: SpellCheckResult) => void;
    onApplyAll: () => void;
    onIgnoreAll: () => void;
    onDismiss: () => void;
}

export const MedicalSpellChecker: React.FC<MedicalSpellCheckerProps> = ({
    results,
    onApply,
    onIgnore,
    onApplyAll,
    onIgnoreAll,
    onDismiss,
}) => {
    if (results.length === 0) return null;

    const autoCorrectCount = results.filter(r => r.isAutoCorrect).length;

    return (
        <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2.5 animate-in fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-amber-800 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Correcteur
                    </h4>
                    {/* Badge compteur */}
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                        {results.length}
                    </span>
                    {autoCorrectCount > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-800">
                            {autoCorrectCount} auto
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1.5">
                    {/* Tout corriger */}
                    <button
                        onClick={onApplyAll}
                        className="px-2 py-0.5 text-[10px] font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        title="Appliquer toutes les corrections"
                    >
                        Tout corriger
                    </button>
                    {/* Tout ignorer */}
                    <button
                        onClick={onIgnoreAll}
                        className="px-2 py-0.5 text-[10px] font-medium bg-slate-200 text-slate-600 rounded hover:bg-slate-300 transition-colors"
                        title="Ignorer toutes les suggestions"
                    >
                        Tout ignorer
                    </button>
                    {/* Fermer */}
                    <button
                        onClick={onDismiss}
                        className="text-amber-400 hover:text-amber-600 transition-colors p-0.5"
                        title="Fermer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Liste des corrections */}
            <div className="space-y-1 max-h-28 overflow-y-auto">
                {results.map((result, idx) => (
                    <div
                        key={`${result.startIndex}-${idx}`}
                        className={`flex items-center gap-1.5 py-0.5 text-xs flex-wrap ${
                            result.isAutoCorrect ? 'bg-green-50 rounded px-1.5 -mx-1' : ''
                        }`}
                    >
                        {/* Mot erroné */}
                        <span className="text-red-600 line-through font-mono text-[11px] bg-red-50 px-1 py-0.5 rounded">
                            {result.word}
                        </span>

                        <span className="text-slate-400 text-[10px]">&rarr;</span>

                        {/* Suggestions */}
                        <div className="flex items-center gap-1 flex-wrap">
                            {result.suggestions.map((suggestion, sIdx) => (
                                <button
                                    key={sIdx}
                                    onClick={() => onApply(result, suggestion)}
                                    className={`px-1.5 py-0.5 rounded text-[11px] cursor-pointer transition-colors ${
                                        result.isAutoCorrect && sIdx === 0
                                            ? 'bg-green-100 border border-green-300 text-green-900 hover:bg-green-200 font-medium'
                                            : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
                                    }`}
                                >
                                    {suggestion}
                                    {result.isAutoCorrect && sIdx === 0 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="inline h-2.5 w-2.5 ml-0.5 -mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Ignorer */}
                        <button
                            onClick={() => onIgnore(result)}
                            className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors ml-auto"
                        >
                            ignorer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
