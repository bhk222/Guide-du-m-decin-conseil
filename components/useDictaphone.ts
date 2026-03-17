/**
 * 🎤 useDictaphone — Hook professionnel de dictée vocale hors connexion
 * V3.3.376
 * 
 * Fonctionnalités :
 * - Reconnaissance vocale continue en français (fr-FR)
 * - Commandes vocales intelligentes (ponctuation, effacement, navigation)
 * - Preview en temps réel du texte en cours de reconnaissance
 * - Auto-redémarrage robuste après silence
 * - Nettoyage propre à la destruction du composant
 * - Compatible Edge (offline natif Windows), Chrome, Safari
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// CONSTANTES - Commandes vocales
// ═══════════════════════════════════════════════════════════════

const NOMBRE_MAP: Record<string, number> = {
    'un': 1, 'une': 1, 'deux': 2, 'trois': 3, 'quatre': 4, 'cinq': 5,
    'six': 6, 'sept': 7, 'huit': 8, 'neuf': 9, 'dix': 10,
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
};

// ═══════════════════════════════════════════════════════════════
// TRAITEMENT DES COMMANDES VOCALES
// ═══════════════════════════════════════════════════════════════

type VoiceResult =
    | { type: 'clear_all' }
    | { type: 'delete_words'; count: number }
    | { type: 'text'; text: string };

function processVoiceInput(raw: string): VoiceResult {
    const t = raw.trim();
    const lower = t.toLowerCase();

    // ── Commandes d'effacement total ──
    if (/^(efface[rz]?\s+(le\s+)?tout|tout\s+efface[rz]?|supprime[rz]?\s+(le\s+)?tout|tout\s+supprime[rz]?|vide[rz]?\s+(le\s+)?tout|tout\s+vide[rz]?|efface[rz]?\s+tout\s+le\s+texte|supprime[rz]?\s+tout\s+le\s+texte|recommence[rz]?)$/.test(lower)) {
        return { type: 'clear_all' };
    }

    // ── Effacer N mots ──
    const mN = lower.match(/^(?:efface[rz]?|supprime[rz]?)\s+(un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d+)\s+mots?$/);
    if (mN) {
        return { type: 'delete_words', count: NOMBRE_MAP[mN[1]] ?? (parseInt(mN[1]) || 1) };
    }

    // ── Effacer le dernier mot / effacer ──
    if (/^(efface[rz]?|supprime[rz]?)(\s+(le\s+)?dernier\s+mot|\s+un\s+mot)?$/.test(lower)) {
        return { type: 'delete_words', count: 1 };
    }

    // ── Effacer la dernière phrase ──
    if (/^(efface[rz]?|supprime[rz]?)\s+(la\s+)?dernière\s+phrase$/.test(lower)) {
        return { type: 'delete_words', count: 20 }; // approximation d'une phrase
    }

    // ── Pas une commande → texte avec remplacement ponctuation ──
    let processed = t;

    // D'abord les expressions multi-mots (avant les mots simples)
    processed = processed.replace(/\bpoint\s+virgule\b/gi, ';');
    processed = processed.replace(/\bdeux[\s-]+points?\b/gi, ':');
    processed = processed.replace(/\bpoints?\s+d[''']exclamation\b/gi, '!');
    processed = processed.replace(/\bpoints?\s+d[''']interrogation\b/gi, '?');
    processed = processed.replace(/\bpoints?\s+de\s+suspension\b/gi, '...');
    processed = processed.replace(/\bouverture?\s+(?:de\s+)?parenthèse|parenthèse\s+ouvrante?\b/gi, '(');
    processed = processed.replace(/\bfermeture?\s+(?:de\s+)?parenthèse|parenthèse\s+fermante?\b/gi, ')');
    processed = processed.replace(/\bouvrir?\s+(?:les?\s+)?guillemets?\b/gi, '«');
    processed = processed.replace(/\bfermer?\s+(?:les?\s+)?guillemets?\b/gi, '»');

    // Nouvelle ligne / retour à la ligne (en milieu de phrase aussi)
    processed = processed.replace(/\b(?:nouvelle\s+ligne|retour\s+(?:à\s+la\s+)?ligne|à\s+la\s+ligne|saut\s+de\s+ligne)\b/gi, '\n');

    // Mots simples de ponctuation
    processed = processed.replace(/\bpoint\b/gi, '.');
    processed = processed.replace(/\bvirgule\b/gi, ',');
    processed = processed.replace(/\btiret\b/gi, '-');
    processed = processed.replace(/\bslash\b/gi, '/');
    processed = processed.replace(/\barobase\b/gi, '@');

    // Nettoyage : supprimer espaces avant ponctuation
    processed = processed.replace(/\s+([.,;:!?\-)\]»])/g, '$1');
    // Ajouter espace après ponctuation si manquant (sauf avant \n)
    processed = processed.replace(/([.,;:!?])([A-Za-zÀ-ÿ])/g, '$1 $2');

    return { type: 'text', text: processed };
}

// ═══════════════════════════════════════════════════════════════
// TYPES PUBLICS
// ═══════════════════════════════════════════════════════════════

export interface DictaphoneState {
    /** Le dictaphone est en mode écoute */
    isListening: boolean;
    /** Texte interim (en cours de reconnaissance, pas encore final) */
    interimText: string;
    /** Durée d'écoute en secondes */
    listenDuration: number;
    /** Message de statut */
    statusMessage: string;
    /** Dernière commande vocale reconnue */
    lastCommand: string;
}

export interface DictaphoneActions {
    /** Démarrer / arrêter la dictée */
    toggle: () => void;
    /** Arrêter la dictée */
    stop: () => void;
    /** Effacer le dernier mot */
    deleteWord: () => void;
    /** Effacer N mots */
    deleteWords: (count: number) => void;
    /** Effacer tout */
    clearAll: () => void;
}

// ═══════════════════════════════════════════════════════════════
// HOOK PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export function useDictaphone(
    text: string,
    setText: (updater: string | ((prev: string) => string)) => void,
): [DictaphoneState, DictaphoneActions] {
    // ── État ──
    const [isListening, setIsListening] = useState(false);
    const [interimText, setInterimText] = useState('');
    const [listenDuration, setListenDuration] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [lastCommand, setLastCommand] = useState('');

    // ── Refs (pour éviter les closures périmées) ──
    const isListeningRef = useRef(false);
    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef(0);
    const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sync ref avec state
    useEffect(() => { isListeningRef.current = isListening; }, [isListening]);

    // ── Timer durée d'écoute ──
    useEffect(() => {
        if (isListening) {
            startTimeRef.current = Date.now();
            timerRef.current = setInterval(() => {
                setListenDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
            setListenDuration(0);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isListening]);

    // ── Actions d'édition ──
    const clearAll = useCallback(() => {
        setText('');
        setLastCommand('✓ Tout effacé');
        setTimeout(() => setLastCommand(''), 2000);
    }, [setText]);

    const deleteWord = useCallback(() => {
        setText((prev: string) => prev.replace(/\s*\S+\s*$/, ''));
        setLastCommand('✓ Dernier mot effacé');
        setTimeout(() => setLastCommand(''), 2000);
    }, [setText]);

    const deleteWords = useCallback((count: number) => {
        setText((prev: string) => {
            let result = prev;
            for (let i = 0; i < count; i++) {
                result = result.replace(/\s*\S+\s*$/, '');
            }
            return result;
        });
        setLastCommand(`✓ ${count} mot(s) effacé(s)`);
        setTimeout(() => setLastCommand(''), 2000);
    }, [setText]);

    // ── Créer l'instance SpeechRecognition ──
    const createRecognition = useCallback(() => {
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) return null;

        const recognition = new SR();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'fr-FR';
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
            let finalText = '';
            let interim = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalText += transcript;
                } else {
                    interim += transcript;
                }
            }

            // Afficher le texte interim en temps réel
            setInterimText(interim);

            if (finalText) {
                setInterimText('');
                const result = processVoiceInput(finalText);

                switch (result.type) {
                    case 'clear_all':
                        clearAll();
                        break;
                    case 'delete_words':
                        deleteWords(result.count);
                        break;
                    case 'text':
                        setText((prev: string) => {
                            if (!prev) return result.text;
                            // Ne pas ajouter d'espace si le nouveau texte commence par ponctuation ou newline
                            const startsWithPunct = /^[.,;:!?\-)\]»\n]/.test(result.text);
                            const endsWithSpace = /[\s\n]$/.test(prev);
                            const separator = startsWithPunct || endsWithSpace ? '' : ' ';
                            return prev + separator + result.text;
                        });
                        break;
                }
            }
        };

        recognition.onerror = (event: any) => {
            const error = event.error;
            if (error === 'no-speech') {
                setStatusMessage('Pas de voix détectée...');
                // On ne coupe pas — le auto-restart dans onend gère la reprise
            } else if (error === 'audio-capture') {
                setStatusMessage('Microphone non disponible');
                setIsListening(false);
            } else if (error === 'not-allowed') {
                setStatusMessage('Accès microphone refusé');
                setIsListening(false);
            } else if (error === 'network') {
                setStatusMessage('Mode hors connexion — utilisez Edge pour la dictée offline');
                // Ne pas couper immédiatement, tenter un redémarrage
            } else {
                setStatusMessage(`Erreur: ${error}`);
            }
        };

        recognition.onend = () => {
            setInterimText('');
            // Redémarrer automatiquement si toujours en mode écoute
            if (isListeningRef.current) {
                // Petit délai pour éviter les boucles rapides
                restartTimeoutRef.current = setTimeout(() => {
                    if (isListeningRef.current && recognitionRef.current) {
                        try {
                            recognitionRef.current.start();
                            setStatusMessage('Écoute...');
                        } catch (e) {
                            // Si start() échoue (déjà en cours), on ignore
                            setIsListening(false);
                            setStatusMessage('');
                        }
                    }
                }, 300);
            } else {
                setStatusMessage('');
            }
        };

        recognition.onstart = () => {
            setStatusMessage('Écoute...');
        };

        recognition.onspeechstart = () => {
            setStatusMessage('Parole détectée...');
        };

        recognition.onspeechend = () => {
            setStatusMessage('Traitement...');
        };

        return recognition;
    }, [clearAll, deleteWords, setText]);

    // ── Toggle dictaphone ──
    const toggle = useCallback(() => {
        if (isListeningRef.current) {
            // STOP
            isListeningRef.current = false;
            setIsListening(false);
            setInterimText('');
            setStatusMessage('');
            if (restartTimeoutRef.current) {
                clearTimeout(restartTimeoutRef.current);
                restartTimeoutRef.current = null;
            }
            try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
            recognitionRef.current = null;
            return;
        }

        // START
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) {
            alert('Reconnaissance vocale non supportée.\n\nUtilisez Microsoft Edge pour la dictée hors connexion,\nou Google Chrome avec connexion internet.');
            return;
        }

        // Toujours recréer une instance fraîche (évite les états corrompus)
        try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
        recognitionRef.current = createRecognition();
        if (!recognitionRef.current) return;

        try {
            recognitionRef.current.start();
            isListeningRef.current = true;
            setIsListening(true);
            setStatusMessage('Démarrage...');
        } catch (e) {
            setStatusMessage('Impossible de démarrer le microphone');
            isListeningRef.current = false;
            setIsListening(false);
        }
    }, [createRecognition]);

    const stop = useCallback(() => {
        if (isListeningRef.current) toggle();
    }, [toggle]);

    // ── Nettoyage à la destruction ──
    useEffect(() => {
        return () => {
            isListeningRef.current = false;
            if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
            try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
            recognitionRef.current = null;
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return [
        { isListening, interimText, listenDuration, statusMessage, lastCommand },
        { toggle, stop, deleteWord, deleteWords, clearAll },
    ];
}
