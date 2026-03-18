/**
 * 🎤 useDictaphoneAI — Dictaphone 100% autonome via Whisper IA
 * V3.3.396 — Dictée instantanée
 * 
 * ZÉRO dépendance externe :
 * - Modèle Whisper SMALL (auto-hébergé en local, HuggingFace CDN en production)
 * - Pas de téléchargement depuis HuggingFace
 * - Pas de moteur Windows
 * - Pas de serveur Google  
 * - 100% hors ligne après premier chargement
 * 
 * Fonctionnement :
 * 1. Modèle servi depuis public/models/ (local) ou HuggingFace CDN (production)
 * 2. WebGPU (fp16, rapide) avec fallback WASM (int8, universel)
 * 3. Capture audio micro → détecte silences → transcrit Whisper
 * 4. Correction médicale post-transcription automatique (~700+ mots + ~200+ expressions)
 * 5. Commandes vocales intelligentes (ponctuation, effacement, navigation)
 * 6. Dictionnaire complet du barème médical (anatomie, pathologies, chirurgie, médico-légal)
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import {
    PHRASE_CORRECTIONS,
    WORD_CORRECTIONS,
    PHONETIC_MAP,
    normalizePhonetic,
} from '../data/whisperMedicalDictionary';

// ═══════════════════════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════════════════════

const SAMPLE_RATE = 16000;
const SILENCE_THRESHOLD = 0.015;     // Seuil d'énergie RMS pour détecter le silence
const SILENCE_DURATION_MS = 600;     // V3.3.396: 600ms → détection pause rapide, dictée quasi-instantanée
const MAX_CHUNK_SECONDS = 7;         // V3.3.396: 7s chunks courts = transcription rapide
const PROGRESSIVE_CHUNK_MS = 4000;   // V3.3.396: Forcer transcription toutes les 4s pendant parole continue
const MIN_AUDIO_SECONDS = 0.3;       // V3.3.396: Segments courts acceptés (0.3s)
const SILENCE_CHECK_INTERVAL = 80;   // V3.3.396: Vérification silence plus fréquente

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
    /^\s*$/,
    /^(\.|,|!|\?)+$/,
    // V3.3.393: Hallucinations observées en production
    /\[musique\]/i,
    /\[Musique\]/,
    /^je\s+vous\s+invite\s+[àa]/i,
    /^n'hésitez\s+pas\s+[àa]/i,
    /^abonnez[- ]?vous/i,
    /^mettez\s+un\s+like/i,
    /^merci\s+d'avoir\s+regardé/i,
    /^à\s+bientôt/i,
    /^\s*\[.*\]\s*$/,
];

// ═══════════════════════════════════════════════════════════════
// CORRECTION MÉDICALE POST-TRANSCRIPTION
// Dictionnaire complet importé de data/whisperMedicalDictionary.ts
// ~200+ patterns de phrases + ~700+ corrections de mots
// Couvre : anatomie, pathologies, chirurgie, mouvements, médico-légal
// ═══════════════════════════════════════════════════════════════

/**
 * Correction post-transcription médicale
 * 0. V3.3.393: Nettoyage hallucinations Whisper (segments parasites)
 * 1. Corrections de phrases (regex)
 * 2. Corrections de mots (exact match)
 * 3. V3.3.392: Correction phonétique (normalisation sans accents → terme médical correct)
 */
function medicalPostCorrection(text: string): string {
    let corrected = text;
    
    // 0. V3.3.393: Supprimer les segments d'hallucination en fin de texte
    // Whisper génère parfois "[Musique]", "Je vous invite à...", etc.
    corrected = corrected.replace(/\s*[\[\(](?:Musique|musique|Music|Applaudissements|mouillage|Mouillage|bruit|Bruit|silence|Silence)[\]\)]\s*/gi, ' ');
    corrected = corrected.replace(/\.\s*(?:Je vous invite[^.]*|N'hésitez pas[^.]*|Abonnez-vous[^.]*|Merci d'avoir[^.]*|À bientôt[^.]*|et de la premi[eè]re fois[^.]*)\s*\.?\s*$/gi, '.');
    // V3.3.394: Supprimer les mots répétés consécutifs ("avec avec" → "avec")
    corrected = corrected.replace(/\b(\w{2,})\s+\1\b/gi, '$1');
    corrected = corrected.trim();
    
    // 1. Corrections de phrases / expressions (priorité haute)
    for (const [pattern, replacement] of PHRASE_CORRECTIONS) {
        corrected = corrected.replace(pattern, replacement);
    }
    
    // 2. Corrections mot par mot (exact) + 3. Phonétique (fallback)
    corrected = corrected.replace(/\b[\wà-ÿÀ-ÿ'-]+\b/gi, (word) => {
        const lower = word.toLowerCase();
        
        // 2a. Exact match dans WORD_CORRECTIONS
        const correction = WORD_CORRECTIONS[lower];
        if (correction) {
            if (word[0] === word[0].toUpperCase()) {
                return correction.charAt(0).toUpperCase() + correction.slice(1);
            }
            return correction;
        }
        
        // 2b. V3.3.395: Phonetic match — normaliser et chercher dans PHONETIC_MAP (1000+ termes)
        if (word.length >= 4) {
            const norm = normalizePhonetic(word);
            const phonetic = PHONETIC_MAP.get(norm);
            if (phonetic && phonetic.toLowerCase() !== lower) {
                if (word[0] === word[0].toUpperCase()) {
                    return phonetic.charAt(0).toUpperCase() + phonetic.slice(1);
                }
                return phonetic;
            }
        }
        
        return word;
    });
    
    return corrected;
}

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
    const workletNodeRef = useRef<AudioWorkletNode | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null); // fallback
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
                max_new_tokens: 128,  // V3.3.396: 128 tokens suffisent pour chunks de 7s
            });

            const rawText = result?.text?.trim();
            if (rawText) {
                // Correction médicale post-transcription
                const text = medicalPostCorrection(rawText);
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
            // Don't crash the recording — just skip this chunk
            if (isListeningRef.current) {
                setStatusMessage('⚠️ Segment ignoré — reparlez...');
                setTimeout(() => {
                    if (isListeningRef.current) setStatusMessage('🎤 Écoute...');
                }, 2000);
            }
        }

        processingRef.current = false;
        setIsProcessing(false);
        if (isListeningRef.current) {
            setStatusMessage('🎤 Écoute...');
        }
    }, [getAccumulatedAudio, clearAll, deleteWords, setText]);

    // ── Charger le modèle Whisper ──
    // V3.3.388: Retry logic + fallback whisper-base si whisper-small échoue
    const loadModel = useCallback(async (): Promise<boolean> => {
        if (transcriberRef.current) return true;

        setIsModelLoading(true);
        setModelProgress(0);

        // Vérifier si le modèle est déjà en cache
        let modelCached = false;
        try {
            const cacheNames = await caches.keys();
            for (const name of cacheNames) {
                const cache = await caches.open(name);
                const keys = await cache.keys();
                if (keys.some(k => k.url.includes('whisper-small') || k.url.includes('whisper-base'))) {
                    modelCached = true;
                    break;
                }
            }
        } catch { /* cache API non dispo */ }

        try {
            const { pipeline, env } = await import('@huggingface/transformers');

            // Détecter si modèles locaux (dev) ou CDN (production)
            // V3.3.391: GET + Content-Type check — la SPA rewrite de Vercel retourne index.html (200 OK)
            // pour toute URL inexistante, donc HEAD seul donne un faux positif
            const hasLocalModels = await fetch('/models/onnx-community/whisper-small/config.json')
                .then(async r => {
                    if (!r.ok) return false;
                    const ct = r.headers.get('content-type') || '';
                    if (!ct.includes('json')) return false;
                    try { await r.json(); return true; } catch { return false; }
                })
                .catch(() => false);
            
            if (hasLocalModels) {
                env.allowLocalModels = true;
                env.localModelPath = '/models/';
                env.allowRemoteModels = false;
                console.log('📦 Whisper: modèles locaux');
            } else {
                env.allowLocalModels = false;
                env.allowRemoteModels = true;
                console.log('🌐 Whisper: CDN HuggingFace');
            }

            const progressCb = (info: any) => {
                if (info.status === 'progress' && info.progress != null) {
                    const pct = Math.round(info.progress);
                    setModelProgress(pct);
                    setStatusMessage(`⏳ Chargement: ${pct}%`);
                } else if (info.status === 'ready') {
                    setModelProgress(100);
                } else if (info.status === 'initiate') {
                    console.log(`📥 Téléchargement: ${info.file || info.name || ''}`);
                }
            };

            // Helper: tenter de charger un modèle avec retry
            const tryLoadModel = async (modelId: string, maxRetries: number): Promise<boolean> => {
                for (let attempt = 1; attempt <= maxRetries; attempt++) {
                    try {
                        setModelProgress(0);
                        
                        // En local: tenter WebGPU d'abord
                        if (hasLocalModels) {
                            try {
                                transcriberRef.current = await pipeline(
                                    'automatic-speech-recognition', modelId,
                                    { device: 'webgpu', dtype: 'fp16', progress_callback: progressCb },
                                );
                                console.log(`✅ ${modelId} chargé via WebGPU (fp16)`);
                                return true;
                            } catch { /* WebGPU non dispo, fallback WASM */ }
                        }
                        
                        // WASM q8 (universel)
                        transcriberRef.current = await pipeline(
                            'automatic-speech-recognition', modelId,
                            { device: 'wasm', dtype: 'q8', progress_callback: progressCb },
                        );
                        console.log(`✅ ${modelId} chargé via WASM (q8)`);
                        return true;
                    } catch (e) {
                        console.warn(`❌ Tentative ${attempt}/${maxRetries} pour ${modelId}:`, e);
                        if (attempt < maxRetries) {
                            const delay = attempt * 2000; // 2s, 4s
                            setStatusMessage(`⏳ Nouvelle tentative dans ${delay/1000}s... (${attempt}/${maxRetries})`);
                            await new Promise(r => setTimeout(r, delay));
                        }
                    }
                }
                return false;
            };

            // V3.3.392: Stratégie inversée — whisper-base D'ABORD (~77MB, rapide)
            // puis whisper-small en fallback. Post-correction médicale compense la différence.
            setStatusMessage(modelCached 
                ? '⚡ Chargement Whisper (en cache)...' 
                : '⏳ Téléchargement Whisper (~77MB, une seule fois)...');
            
            let loaded = await tryLoadModel('onnx-community/whisper-base', hasLocalModels ? 1 : 3);
            
            // 🔧 V3.3.390: Cache-busting — si le modèle était "en cache" mais échoue, purger le cache corrompu
            if (!loaded && modelCached && !hasLocalModels) {
                console.warn('⚠️ [V3.3.390] Modèle en cache mais chargement échoué → purge du cache corrompu');
                setStatusMessage('🔄 Cache corrompu détecté, nettoyage et re-téléchargement...');
                try {
                    const cacheNames = await caches.keys();
                    for (const name of cacheNames) {
                        const cache = await caches.open(name);
                        const keys = await cache.keys();
                        for (const key of keys) {
                            if (key.url.includes('whisper-small') || key.url.includes('whisper-base') || key.url.includes('onnx')) {
                                await cache.delete(key);
                            }
                        }
                    }
                    console.log('🗑️ Cache Whisper purgé, nouvelle tentative...');
                    setStatusMessage('⏳ Re-téléchargement Whisper (~77MB)...');
                    setModelProgress(0);
                    loaded = await tryLoadModel('onnx-community/whisper-base', 2);
                } catch (cacheErr) {
                    console.warn('Erreur purge cache:', cacheErr);
                }
            }

            if (!loaded && !hasLocalModels) {
                // Fallback: whisper-small (plus gros ~150MB, meilleure qualité)
                console.warn('⚠️ Whisper BASE échoué, fallback vers whisper-small');
                setStatusMessage('⏳ Téléchargement Whisper SMALL (~150MB, alternative)...');
                setModelProgress(0);
                loaded = await tryLoadModel('onnx-community/whisper-small', 2);
            }

            if (loaded) {
                setIsModelLoaded(true);
                setIsModelLoading(false);
                setStatusMessage('✅ Modèle Whisper prêt !');
                return true;
            }
            
            throw new Error('Tous les modèles ont échoué');
        } catch (err) {
            console.error('Erreur chargement modèle Whisper:', err);
            setIsModelLoading(false);
            setModelProgress(0);
            const errMsg = err instanceof Error ? err.message : String(err);
            if (errMsg.includes('SharedArrayBuffer')) {
                setStatusMessage('❌ SharedArrayBuffer non disponible. Utilisez Chrome ou Edge.');
            } else {
                setStatusMessage('❌ Échec du téléchargement. Vérifiez votre connexion et rechargez la page.');
            }
            return false;
        }
    }, []);

    // ── Démarrer l'enregistrement micro ──
    // V3.3.386: AudioWorkletNode (modern, off-main-thread) with ScriptProcessorNode fallback
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

            // Reset accumulateur
            audioSamplesRef.current = [];
            totalSamplesRef.current = 0;
            chunkStartRef.current = Date.now();
            lastSpeechRef.current = Date.now();
            hadSpeechRef.current = false;

            // ── Try AudioWorkletNode (modern, non-blocking) ──
            let useWorklet = false;
            if (ctx.audioWorklet) {
                try {
                    await ctx.audioWorklet.addModule('/audio-processor.js');
                    const workletNode = new AudioWorkletNode(ctx, 'audio-capture-processor');
                    workletNodeRef.current = workletNode;

                    workletNode.port.onmessage = (e: MessageEvent) => {
                        if (!isListeningRef.current) return;
                        const { samples, rms } = e.data;

                        setAudioLevel(Math.min(100, Math.round(rms * 3000)));

                        if (rms > SILENCE_THRESHOLD) {
                            lastSpeechRef.current = Date.now();
                            if (!hadSpeechRef.current) {
                                hadSpeechRef.current = true;
                                setInterimText('🗣️ Parole détectée...');
                            }
                        }

                        // Accumuler les samples
                        const copy = new Float32Array(samples);
                        audioSamplesRef.current.push(copy);
                        totalSamplesRef.current += copy.length;
                    };

                    source.connect(workletNode);
                    workletNode.connect(ctx.destination);
                    useWorklet = true;
                } catch {
                    // AudioWorklet failed, fall through to ScriptProcessor
                }
            }

            // ── Fallback: ScriptProcessorNode (deprecated but universal) ──
            if (!useWorklet) {
                const processor = ctx.createScriptProcessor(4096, 1, 1);
                processorRef.current = processor;

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
            }

            // V3.3.396: Vérification silence + transcription progressive pour dictée instantanée
            silenceIntervalRef.current = setInterval(() => {
                if (!isListeningRef.current) return;

                const now = Date.now();
                const sinceLastSpeech = now - lastSpeechRef.current;
                const chunkDuration = now - chunkStartRef.current;
                const hasEnoughAudio = totalSamplesRef.current > SAMPLE_RATE * MIN_AUDIO_SECONDS;

                // 1. Pause détectée (600ms silence) → transcrire immédiatement
                if (hadSpeechRef.current && sinceLastSpeech > SILENCE_DURATION_MS && hasEnoughAudio) {
                    hadSpeechRef.current = false;
                    setInterimText('');
                    chunkStartRef.current = now;
                    processAccumulatedAudio();
                    return;
                }

                // 2. Parole continue sans pause → transcrire progressivement toutes les 4s
                if (hadSpeechRef.current && chunkDuration > PROGRESSIVE_CHUNK_MS && hasEnoughAudio && !processingRef.current) {
                    setInterimText('⏳ Transcription progressive...');
                    chunkStartRef.current = now;
                    processAccumulatedAudio();
                    return;
                }

                // 3. Sécurité: force-process si segment atteint la durée max
                if (chunkDuration > MAX_CHUNK_SECONDS * 1000 && totalSamplesRef.current > SAMPLE_RATE) {
                    hadSpeechRef.current = false;
                    setInterimText('');
                    chunkStartRef.current = now;
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
        // Stop AudioWorklet
        if (workletNodeRef.current) {
            workletNodeRef.current.port.postMessage('stop');
            workletNodeRef.current.disconnect();
            workletNodeRef.current = null;
        }
        // Stop ScriptProcessor (fallback)
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
