/**
 * Hook React pour le correcteur d'orthographe médical
 * Tokenize, vérifie et suggère des corrections avec debounce
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { normalize } from '../AiAnalyzer';
import { getMedicalDictionary, FRENCH_STOP_WORDS } from './medicalDictionary';
import { findClosestTerms } from './levenshtein';

export interface SpellCheckResult {
    word: string;           // mot tel que tapé par l'utilisateur
    startIndex: number;     // position de début dans le texte
    endIndex: number;       // position de fin dans le texte
    normalizedWord: string; // mot normalisé (sans accents, minuscule)
    suggestions: string[];  // suggestions de correction
}

interface TokenInfo {
    word: string;
    start: number;
    end: number;
}

function tokenize(text: string): TokenInfo[] {
    const tokens: TokenInfo[] = [];
    const regex = /[a-zàâäéèêëïîôùûüœæç]+/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
        tokens.push({
            word: match[0],
            start: match.index,
            end: match.index + match[0].length,
        });
    }
    return tokens;
}

export function useMedicalSpellCheck(text: string) {
    const [results, setResults] = useState<SpellCheckResult[]>([]);
    const ignoredWords = useRef<Set<string>>(new Set());
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const dictionary = useMemo(() => getMedicalDictionary(), []);

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        if (!text || text.trim().length < 3) {
            setResults([]);
            return;
        }

        debounceTimer.current = setTimeout(() => {
            const tokens = tokenize(text);
            const newResults: SpellCheckResult[] = [];

            for (const token of tokens) {
                // Ignorer les mots courts (< 3 chars)
                if (token.word.length < 3) continue;

                const normalized = normalize(token.word);

                // Ignorer les stop-words
                if (FRENCH_STOP_WORDS.has(normalized)) continue;

                // Ignorer les mots déjà marqués "ignorer" par l'utilisateur
                if (ignoredWords.current.has(normalized)) continue;

                // Ignorer les nombres
                if (/^\d+$/.test(token.word)) continue;

                // Vérifier si le mot existe dans le dictionnaire médical
                if (dictionary.singleWords.has(normalized)) continue;

                // Mot non trouvé → chercher des suggestions
                const suggestions = findClosestTerms(
                    normalized,
                    dictionary.singleWords,
                    2,  // distance max
                    4   // max résultats
                );

                // Ne signaler que si on a des suggestions pertinentes
                if (suggestions.length > 0) {
                    // Restaurer les formes originales (avec accents) si possible
                    const displaySuggestions = suggestions.map(s => {
                        return dictionary.originalForms.get(s) || s;
                    });

                    newResults.push({
                        word: token.word,
                        startIndex: token.start,
                        endIndex: token.end,
                        normalizedWord: normalized,
                        suggestions: displaySuggestions,
                    });
                }
            }

            setResults(newResults);
        }, 400);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [text, dictionary]);

    const applyCorrection = useCallback((result: SpellCheckResult, correction: string): string => {
        return text.substring(0, result.startIndex) + correction + text.substring(result.endIndex);
    }, [text]);

    const ignoreWord = useCallback((result: SpellCheckResult) => {
        ignoredWords.current.add(result.normalizedWord);
        setResults(prev => prev.filter(r => r.normalizedWord !== result.normalizedWord));
    }, []);

    return { results, applyCorrection, ignoreWord };
}
