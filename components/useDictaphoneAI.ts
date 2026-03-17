/**
 * 🎤 useDictaphoneAI — Dictaphone 100% autonome via Whisper IA (WebAssembly)
 * V3.3.377
 * 
 * ZÉRO dépendance externe :
 * - Pas de moteur Windows
 * - Pas de serveur Google
 * - Pas de connexion internet (après 1er chargement du modèle)
 * 
 * Fonctionnement :
 * 1. Premier usage → télécharge le modèle Whisper (~50MB), cache dans le navigateur
 * 2. Après → fonctionne 100% hors ligne, à vie
 * 3. Capture audio micro → détecte les silences → transcrit par Whisper WASM
 * 4. Commandes vocales intelligentes (ponctuation, effacement, navigation)
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════

const SAMPLE_RATE = 16000;
const SILENCE_THRESHOLD = 0.015;     // Seuil d'énergie RMS pour détecter le silence
const SILENCE_DURATION_MS = 1800;    // Durée de silence avant traitement (ms)
const MAX_CHUNK_SECONDS = 28;        // Whisper max = 30s, on coupe à 28s par sécurité
const MIN_AUDIO_SECONDS = 0.6;       // Ignorer les segments < 0.6s (bruit)
const SILENCE_CHECK_INTERVAL = 150;  // Intervalle vérification silence (ms)

// Correspondance nombres français → chiffres
const NOMBRE_FR: Record<string, number> = {
    'un': 1, 'une': 1, 'deux': 2, 'trois': 3, 'quatre': 4, 'cinq': 5,
    'six': 6, 'sept': 7, 'huit': 8, 'neuf': 9, 'dix': 10,
};

// Hallucinations Whisper courantes à filtrer
const WHISPER_HALLUCINATIONS = [
    /^merci\s+(d'avoir|de)\s+(regard|écoute|suivi)/i,
    /^sous[- ]?titrage/i,
    /^(musique|applaudissements)\s*$/i,
    /^\s*\.+\s*$/,
    /^merci\.?\s*$/i,
    /^vous\s*$/i,
];

// ═══════════════════════════════════════════════════════════════
// TRAITEMENT COMMANDES VOCALES
// ═══════════════════════════════════════════════════════════════

type VoiceResult =
    | { type: 'clear_all' }
    | { type: 'delete_words'; count: number }
    | { type: 'text'; text: string }
    | { type: 'empty' };

function processVoiceInput(raw: string): VoiceResult {
    const t = raw.trim();
    if (!t) return { type: 'empty' };

    // Filtrer les hallucinations Whisper
    for (const pattern of WHISPER_HALLUCINATIONS) {
        if (pattern.test(t)) return { type: 'empty' };
    }

    const lower = t.toLowerCase();

    // ── Effacer tout ──
    if (/^(efface[rz]?\s+(le\s+)?tout|tout\s+efface[rz]?|supprime[rz]?\s+(le\s+)?tout|tout\s+supprime[rz]?|vide[rz]?\s+(le\s+)?tout|recommence[rz]?)$/.test(lower)) {
        return { type: 'clear_all' };
    }

    // ── Effacer N mots ──
    const mN = lower.match(/^(?:efface[rz]?|supprime[rz]?)\s+(un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d+)\s+mots?$/);
    if (mN) {
        return { type: 'delete_words', count: NOMBRE_FR[mN[1]] ?? (parseInt(mN[1]) || 1) };
    }

    // ── Effacer dernier mot ──
    if (/^(efface[rz]?|supprime[rz]?)(\s+(le\s+)?dernier\s+mot|\s+un\s+mot)?$/.test(lower)) {
        return { type: 'delete_words', count: 1 };
    }

    // ── Effacer dernière phrase ──
    if (/^(efface[rz]?|supprime[rz]?)\s+(la\s+)?derni[eè]re\s+phrase$/.test(lower)) {
        return { type: 'delete_words', count: 20 };
    }

    // ── Texte avec ponctuation ──
    let p = t;
    // Multi-mots d'abord
    p = p.replace(/\bpoint\s+virgule\b/gi, ';');
    p = p.replace(/\bdeux[\s\-]+points?\b/gi, ':');
    p = p.replace(/\bpoints?\s+d[''']exclamation\b/gi, '!');
    p = p.replace(/\bpoints?\s+d[''']interrogation\b/gi, '?');
    p = p.replace(/\bpoints?\s+de\s+suspension\b/gi, '...');
    p = p.replace(/\b(?:ouvrir?|ouverture?\s+(?:de\s+)?)parenth[eè]se|parenth[eè]se\s+ouvrante?\b/gi, '(');
    p = p.replace(/\b(?:fermer?|fermeture?\s+(?:de\s+)?)parenth[eè]se|parenth[eè]se\s+fermante?\b/gi, ')');
    p = p.replace(/\bouvrir?\s+(?:les?\s+)?guillemets?\b/gi, '«');
    p = p.replace(/\bfermer?\s+(?:les?\s+)?guillemets?\b/gi, '»');
    // Retour à la ligne
    p = p.replace(/\b(?:nouvelle\s+ligne|retour\s+(?:[àa]\s+la\s+)?ligne|[àa]\s+la\s+ligne|saut\s+de\s+ligne)\b/gi, '\n');
    // Mots simples
    p = p.replace(/\bpoint\b/gi, '.');
    p = p.replace(/\bvirgule\b/gi, ',');
    p = p.replace(/\btiret\b/gi, '-');
    // Nettoyage espaces autour de la ponctuation
    p = p.replace(/\s+([.,;:!?\-)\]»])/g, '$1');
    p = p.replace(/([.,;:!?])([A-Za-zÀ-ÿ])/g, '$1 $2');

    return { type: 'text', text: p };
}

// ═══════════════════════════════════════════════════════════════
// TYPES PUBLICS
// ═══════════════════════════════════════════════════════════════

export interface DictaphoneAIState {
    isListening: boolean;
    isModelLoaded: boolean;
    isModelLoading: boolean;
    modelProgress: number;
    isProcessing: boolean;
    interimText: string;
    listenDuration: number;
    statusMessage: string;
    lastCommand: string;
    audioLevel: number; // 0-100, niveau audio en temps réel
}

export interface DictaphoneAIActions {
    toggle: () => void;
    stop: () => void;
    deleteWord: () => void;
    deleteWords: (count: number) => void;
    clearAll: () => void;
}

// ═══════════════════════════════════════════════════════════════
// HOOK PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export function useDictaphoneAI(
    _text: string,
    setText: (updater: string | ((prev: string) => string)) => void,
): [DictaphoneAIState, DictaphoneAIActions] {

    // ── État ──
    const [isListening, setIsListening] = useState(false);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [modelProgress, setModelProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [interimText, setInterimText] = useState('');
    const [listenDuration, setListenDuration] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [lastCommand, setLastCommand] = useState('');
    const [audioLevel, setAudioLevel] = useState(0);

    // ── Refs ──
    const isListeningRef = useRef(false);
    const transcriberRef = useRef<any>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioSamplesRef = useRef<Float32Array[]>([]);
    const totalSamplesRef = useRef(0);
    const lastSpeechRef = useRef(0);
    const chunkStartRef = useRef(0);
    const hadSpeechRef = useRef(false);
    const processingRef = useRef(false);
    const silenceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef(0);

    // Sync ref
    useEffect(() => { isListeningRef.current = isListening; }, [isListening]);

    // ── Timer ──
    useEffect(() => {
        if (isListening) {
            startTimeRef.current = Date.now();
            timerIntervalRef.current = setInterval(() => {
                setListenDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }, 1000);
        } else {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            setListenDuration(0);
        }
        return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
    }, [isListening]);

    // ── Actions d'édition ──
    const clearAll = useCallback(() => {
        setText('');
        setLastCommand('✓ Tout effacé');
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    const deleteWord = useCallback(() => {
        setText((prev: string) => prev.replace(/\s*\S+\s*$/, ''));
        setLastCommand('✓ Mot effacé');
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    const deleteWords = useCallback((count: number) => {
        setText((prev: string) => {
            let r = prev;
            for (let i = 0; i < count; i++) r = r.replace(/\s*\S+\s*$/, '');
            return r;
        });
        setLastCommand(`✓ ${count} mot(s) effacé(s)`);
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    // ── Concaténer les samples audio accumulés ──
    const getAccumulatedAudio = useCallback((): Float32Array | null => {
        if (totalSamplesRef.current < SAMPLE_RATE * MIN_AUDIO_SECONDS) return null;
        const result = new Float32Array(totalSamplesRef.current);
        let offset = 0;
        for (const chunk of audioSamplesRef.current) {
            result.set(chunk, offset);
            offset += chunk.length;
        }
        audioSamplesRef.current = [];
        totalSamplesRef.current = 0;
        return result;
    }, []);

    // ── Traiter l'audio accumulé avec Whisper ──
    const processAccumulatedAudio = useCallback(async () => {
        if (processingRef.current) return;
        const audio = getAccumulatedAudio();
        if (!audio) return;
        if (!transcriberRef.current) return;

        processingRef.current = true;
        setIsProcessing(true);
        setStatusMessage('🧠 Transcription IA...');

        try {
            const result = await transcriberRef.current(audio, {
                language: 'french',
                task: 'transcribe',
                return_timestamps: false,
            });

            const text = result?.text?.trim();
            if (text) {
                const cmd = processVoiceInput(text);
                switch (cmd.type) {
                    case 'clear_all':
                        clearAll();
                        break;
                    case 'delete_words':
                        deleteWords(cmd.count);
                        break;
                    case 'text':
                        if (cmd.text) {
                            setText((prev: string) => {
                                if (!prev) return cmd.text;
                                const startsWithPunct = /^[.,;:!?\-)\]\n»]/.test(cmd.text);
                                const endsClean = /[\s\n]$/.test(prev);
                                const sep = startsWithPunct || endsClean ? '' : ' ';
                                return prev + sep + cmd.text;
                            });
                        }
                        break;
                    case 'empty':
                        break;
                }
            }
        } catch (e) {
            console.error('Erreur transcription Whisper:', e);
        }

        processingRef.current = false;
        setIsProcessing(false);
        if (isListeningRef.current) {
            setStatusMessage('🎤 Écoute...');
        }
    }, [getAccumulatedAudio, clearAll, deleteWords, setText]);

    // ── Charger le modèle Whisper ──
    const loadModel = useCallback(async (): Promise<boolean> => {
        if (transcriberRef.current) return true;

        setIsModelLoading(true);
        setModelProgress(0);
        setStatusMessage('📦 Chargement du modèle Whisper (une seule fois)...');

        try {
            const { pipeline } = await import('@huggingface/transformers');

            transcriberRef.current = await pipeline(
                'automatic-speech-recognition',
                'onnx-community/whisper-tiny',
                {
                    device: 'wasm',
                    progress_callback: (info: any) => {
                        if (info.status === 'progress' && info.progress != null) {
                            const pct = Math.round(info.progress);
                            setModelProgress(pct);
                            setStatusMessage(`📦 Téléchargement: ${pct}%`);
                        } else if (info.status === 'ready') {
                            setModelProgress(100);
                        }
                    },
                },
            );

            setIsModelLoaded(true);
            setIsModelLoading(false);
            setStatusMessage('✅ Modèle prêt !');
            return true;
        } catch (err) {
            console.error('Erreur chargement modèle Whisper:', err);
            setIsModelLoading(false);
            setStatusMessage('❌ Impossible de charger le modèle. Vérifiez votre connexion pour le premier chargement.');
            return false;
        }
    }, []);

    // ── Démarrer l'enregistrement micro ──
    const startRecording = useCallback(async (): Promise<boolean> => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: SAMPLE_RATE,
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
            streamRef.current = stream;

            const ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
            audioCtxRef.current = ctx;

            const source = ctx.createMediaStreamSource(stream);
            const processor = ctx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            // Reset accumulateur
            audioSamplesRef.current = [];
            totalSamplesRef.current = 0;
            chunkStartRef.current = Date.now();
            lastSpeechRef.current = Date.now();
            hadSpeechRef.current = false;

            processor.onaudioprocess = (e: AudioProcessingEvent) => {
                if (!isListeningRef.current) return;

                const data = e.inputBuffer.getChannelData(0);

                // Calculer niveau audio RMS
                let sum = 0;
                for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
                const rms = Math.sqrt(sum / data.length);
                setAudioLevel(Math.min(100, Math.round(rms * 3000)));

                if (rms > SILENCE_THRESHOLD) {
                    lastSpeechRef.current = Date.now();
                    if (!hadSpeechRef.current) {
                        hadSpeechRef.current = true;
                        setInterimText('🗣️ Parole détectée...');
                    }
                }

                // Accumuler les samples
                const copy = new Float32Array(data.length);
                copy.set(data);
                audioSamplesRef.current.push(copy);
                totalSamplesRef.current += data.length;
            };

            source.connect(processor);
            processor.connect(ctx.destination);

            // Vérification périodique du silence
            silenceIntervalRef.current = setInterval(() => {
                if (!isListeningRef.current) return;

                const sinceLastSpeech = Date.now() - lastSpeechRef.current;
                const chunkDuration = Date.now() - chunkStartRef.current;

                // Si on a eu de la parole et maintenant silence → transcrire
                if (hadSpeechRef.current && sinceLastSpeech > SILENCE_DURATION_MS && totalSamplesRef.current > SAMPLE_RATE * MIN_AUDIO_SECONDS) {
                    hadSpeechRef.current = false;
                    setInterimText('');
                    chunkStartRef.current = Date.now();
                    processAccumulatedAudio();
                }

                // Force-process si segment trop long
                if (chunkDuration > MAX_CHUNK_SECONDS * 1000 && totalSamplesRef.current > SAMPLE_RATE) {
                    hadSpeechRef.current = false;
                    setInterimText('');
                    chunkStartRef.current = Date.now();
                    processAccumulatedAudio();
                }
            }, SILENCE_CHECK_INTERVAL);

            return true;
        } catch (err) {
            console.error('Erreur microphone:', err);
            setStatusMessage('❌ Microphone non disponible ou accès refusé');
            return false;
        }
    }, [processAccumulatedAudio]);

    // ── Arrêter l'enregistrement ──
    const stopRecording = useCallback(() => {
        if (silenceIntervalRef.current) {
            clearInterval(silenceIntervalRef.current);
            silenceIntervalRef.current = null;
        }
        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }
        if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        setInterimText('');
        setAudioLevel(0);
    }, []);

    // ── Toggle dictaphone ──
    const toggle = useCallback(async () => {
        if (isListeningRef.current) {
            // STOP
            isListeningRef.current = false;
            setIsListening(false);
            stopRecording();
            // Transcrire le reste
            if (totalSamplesRef.current > SAMPLE_RATE * MIN_AUDIO_SECONDS) {
                await processAccumulatedAudio();
            }
            audioSamplesRef.current = [];
            totalSamplesRef.current = 0;
            setStatusMessage('');
            return;
        }

        // START : charger le modèle si nécessaire
        if (!transcriberRef.current) {
            const ok = await loadModel();
            if (!ok) return;
        }

        setStatusMessage('🎤 Démarrage micro...');
        const ok = await startRecording();
        if (!ok) return;

        isListeningRef.current = true;
        setIsListening(true);
        setStatusMessage('🎤 Écoute...');
    }, [loadModel, startRecording, stopRecording, processAccumulatedAudio]);

    const stop = useCallback(() => {
        if (isListeningRef.current) toggle();
    }, [toggle]);

    // ── Nettoyage ──
    useEffect(() => {
        return () => {
            isListeningRef.current = false;
            stopRecording();
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [stopRecording]);

    return [
        { isListening, isModelLoaded, isModelLoading, modelProgress, isProcessing, interimText, listenDuration, statusMessage, lastCommand, audioLevel },
        { toggle, stop, deleteWord, deleteWords, clearAll },
    ];
}
