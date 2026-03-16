/**
 * Hook React pour le correcteur d'orthographe français complet
 * Tokenize, vérifie et suggère des corrections avec debounce
 * V3: Dictionnaire complet hors connexion (~15 000+ mots)
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { normalize } from '../AiAnalyzer';
import { getMedicalDictionary, FRENCH_STOP_WORDS, COMMON_MEDICAL_TYPOS } from './medicalDictionary';
import { EXTENDED_TYPOS } from '../../data/frenchDictionary';
import { findClosestTerms } from './levenshtein';

export interface SpellCheckResult {
    word: string;           // mot tel que tapé par l'utilisateur
    startIndex: number;     // position de début dans le texte
    endIndex: number;       // position de fin dans le texte
    normalizedWord: string; // mot normalisé (sans accents, minuscule)
    suggestions: string[];  // suggestions de correction (première = meilleure)
    isAutoCorrect: boolean; // true si faute courante connue (haute confiance)
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
                if (token.word.length < 3) continue;

                const normalized = normalize(token.word);

                if (FRENCH_STOP_WORDS.has(normalized)) continue;
                if (ignoredWords.current.has(normalized)) continue;
                if (/^\d+$/.test(token.word)) continue;

                // 1. Vérifier la carte de fautes courantes (haute confiance)
                const knownCorrection = COMMON_MEDICAL_TYPOS.get(normalized) || EXTENDED_TYPOS.get(normalized);
                if (knownCorrection && normalize(knownCorrection) !== normalized) {
                    const displayForm = dictionary.originalForms.get(knownCorrection) || knownCorrection;
                    newResults.push({
                        word: token.word,
                        startIndex: token.start,
                        endIndex: token.end,
                        normalizedWord: normalized,
                        suggestions: [displayForm],
                        isAutoCorrect: true,
                    });
                    continue;
                }

                // 2. Vérifier dans le dictionnaire médical
                if (dictionary.singleWords.has(normalized)) continue;

                // 3. Chercher des suggestions par Levenshtein
                const suggestions = findClosestTerms(
                    normalized,
                    dictionary.singleWords,
                    2,  // distance max
                    4   // max résultats
                );

                if (suggestions.length > 0) {
                    const displaySuggestions = suggestions.map(s => {
                        return dictionary.originalForms.get(s) || s;
                    });

                    newResults.push({
                        word: token.word,
                        startIndex: token.start,
                        endIndex: token.end,
                        normalizedWord: normalized,
                        suggestions: displaySuggestions,
                        isAutoCorrect: false,
                    });
                }
            }

            setResults(newResults);
        }, 300); // 300ms au lieu de 400ms pour plus de réactivité

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [text, dictionary]);

    // Appliquer UNE correction (gère le décalage d'indices)
    const applyCorrection = useCallback((result: SpellCheckResult, correction: string): string => {
        return text.substring(0, result.startIndex) + correction + text.substring(result.endIndex);
    }, [text]);

    // Appliquer TOUTES les corrections (de la fin vers le début pour préserver les indices)
    const applyAllCorrections = useCallback((): string => {
        if (results.length === 0) return text;

        // Trier par position décroissante pour appliquer de la fin vers le début
        const sorted = [...results].sort((a, b) => b.startIndex - a.startIndex);
        let newText = text;

        for (const result of sorted) {
            if (result.suggestions.length > 0) {
                newText = newText.substring(0, result.startIndex) +
                    result.suggestions[0] +
                    newText.substring(result.endIndex);
            }
        }

        return newText;
    }, [text, results]);

    const ignoreWord = useCallback((result: SpellCheckResult) => {
        ignoredWords.current.add(result.normalizedWord);
        setResults(prev => prev.filter(r => r.normalizedWord !== result.normalizedWord));
    }, []);

    const ignoreAll = useCallback(() => {
        for (const result of results) {
            ignoredWords.current.add(result.normalizedWord);
        }
        setResults([]);
    }, [results]);

    return { results, applyCorrection, applyAllCorrections, ignoreWord, ignoreAll };
}
