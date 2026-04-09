/**
 * 🎤 useDictaphoneAI — Dictaphone 100% autonome via Whisper IA
 * V3.3.414 — Dictaphone complet : audio amélioré + commandes vocales étendues + anti-hallucination renforcé
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
 * 3. Capture audio micro → filtre passe-haut 80Hz → détecte parole → transcrit Whisper
 * 4. Correction médicale post-transcription automatique (~900+ mots + ~350+ expressions)
 * 5. Commandes vocales intelligentes (ponctuation, effacement phrase/ligne/mots, navigation)
 * 6. Dictionnaire complet du barème médical (anatomie, pathologies, chirurgie, médico-légal)
 * 7. Anti-hallucination renforcé (~70+ patterns filtrés)
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
const SILENCE_THRESHOLD = 0.025;     // V3.3.413: Seuil RMS relevé (0.015→0.025) — réduit faux positifs bruit ambiant
const SILENCE_DURATION_MS = 900;     // V3.3.413: 900ms — laisse le temps de réfléchir sans couper la phrase
const MAX_CHUNK_SECONDS = 10;        // V3.3.413: 10s chunks — plus de contexte pour Whisper
const PROGRESSIVE_CHUNK_MS = 6000;   // V3.3.413: Transcription progressive toutes les 6s (pas 4s)
const MIN_AUDIO_SECONDS = 0.8;       // V3.3.413: Segments min 0.8s — évite hallucinations sur micro-segments
const SILENCE_CHECK_INTERVAL = 80;   // Vérification silence

// Correspondance nombres français → chiffres (pour commandes vocales)
// V3.3.414: Étendu jusqu'à 100 pour "effacer vingt mots", etc.
const NOMBRE_FR: Record<string, number> = {
    'un': 1, 'une': 1, 'deux': 2, 'trois': 3, 'quatre': 4, 'cinq': 5,
    'six': 6, 'sept': 7, 'huit': 8, 'neuf': 9, 'dix': 10,
    'onze': 11, 'douze': 12, 'treize': 13, 'quatorze': 14, 'quinze': 15,
    'seize': 16, 'dix-sept': 17, 'dix-huit': 18, 'dix-neuf': 19, 'vingt': 20,
    'trente': 30, 'quarante': 40, 'cinquante': 50,
};

// V3.3.408: Conversion nombres français → chiffres (pour le texte dicté)
const NOMBRES_TEXTE: Record<string, string> = {
    'zéro': '0', 'un': '1', 'une': '1', 'deux': '2', 'trois': '3', 'quatre': '4',
    'cinq': '5', 'six': '6', 'sept': '7', 'huit': '8', 'neuf': '9', 'dix': '10',
    'onze': '11', 'douze': '12', 'treize': '13', 'quatorze': '14', 'quinze': '15',
    'seize': '16', 'vingt': '20', 'trente': '30', 'quarante': '40', 'cinquante': '50',
    'soixante': '60',
};

/** Convertit les nombres français composés en chiffres dans le texte */
function convertFrenchNumbers(text: string): string {
    let result = text;

    // V3.3.411: Milliers — "mille deux cents" → "1200", "deux mille" → "2000"
    result = result.replace(/\b(\d+)\s+mille\s+(\d+)\b/gi, (_, th, rest) => String(Number(th) * 1000 + Number(rest)));
    result = result.replace(/\b(deux|trois|quatre|cinq|six|sept|huit|neuf|dix)\s+mille\s+(deux|trois|quatre|cinq|six|sept|huit|neuf)\s+cents?\b/gi, (_, th, h) => {
        const thV = NOMBRES_TEXTE[th.toLowerCase()] || '1';
        const hV = NOMBRES_TEXTE[h.toLowerCase()] || '1';
        return String(Number(thV) * 1000 + Number(hV) * 100);
    });
    result = result.replace(/\b(deux|trois|quatre|cinq|six|sept|huit|neuf|dix)\s+mille\b/gi, (_, th) => {
        const v = NOMBRES_TEXTE[th.toLowerCase()] || '1';
        return String(Number(v) * 1000);
    });
    result = result.replace(/\bmille\s+(\d+)\b/gi, (_, rest) => String(1000 + Number(rest)));
    result = result.replace(/\bmille\b/gi, '1000');

    // V3.3.411: Centaines — "deux cents" → "200", "cent cinquante" → "150"  
    result = result.replace(/\b(deux|trois|quatre|cinq|six|sept|huit|neuf)\s+cents?\s+(\d+)\b/gi, (_, h, rest) => {
        const hV = NOMBRES_TEXTE[h.toLowerCase()] || '1';
        return String(Number(hV) * 100 + Number(rest));
    });
    result = result.replace(/\b(deux|trois|quatre|cinq|six|sept|huit|neuf)\s+cents?\b/gi, (_, h) => {
        const v = NOMBRES_TEXTE[h.toLowerCase()] || '1';
        return String(Number(v) * 100);
    });
    result = result.replace(/\bcent\s+(\d+)\b/gi, (_, rest) => String(100 + Number(rest)));
    // "cent pour cent" → "100%"
    result = result.replace(/\bcent\s+pour\s+cents?\b/gi, '100%');
    // "cent" seul seulement en contexte numérique (pas composé avec pour/mètres/grammes)
    result = result.replace(/\bcent\b(?!\s*(?:pour|%|mètres?|grammes?))/gi, '100');

    // V3.3.412: Fractions médicales — "un tiers" → "1/3", "deux tiers" → "2/3", etc.
    result = result.replace(/\bun\s+tiers\b/gi, '1/3');
    result = result.replace(/\bdeux\s+tiers\b/gi, '2/3');
    result = result.replace(/\bun\s+quart\b/gi, '1/4');
    result = result.replace(/\btrois\s+quarts?\b/gi, '3/4');
    result = result.replace(/\bun\s+demi\b/gi, '1/2');
    result = result.replace(/\bune\s+demie?\b/gi, '1/2');

    // Patterns composés (soixante-dix, quatre-vingts, etc.)
    result = result.replace(/\bsoixante[- ]et[- ]onze\b/gi, '71');
    result = result.replace(/\bsoixante[- ](?:et[- ])?douze\b/gi, '72');
    result = result.replace(/\bsoixante[- ](?:et[- ])?treize\b/gi, '73');
    result = result.replace(/\bsoixante[- ](?:et[- ])?quatorze\b/gi, '74');
    result = result.replace(/\bsoixante[- ](?:et[- ])?quinze\b/gi, '75');
    result = result.replace(/\bsoixante[- ](?:et[- ])?seize\b/gi, '76');
    result = result.replace(/\bsoixante[- ]dix[- ]sept\b/gi, '77');
    result = result.replace(/\bsoixante[- ]dix[- ]huit\b/gi, '78');
    result = result.replace(/\bsoixante[- ]dix[- ]neuf\b/gi, '79');
    result = result.replace(/\bsoixante[- ]dix\b/gi, '70');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ](?:et[- ])?onze\b/gi, '91');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ](?:et[- ])?douze\b/gi, '92');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ](?:et[- ])?treize\b/gi, '93');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ](?:et[- ])?quatorze\b/gi, '94');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ](?:et[- ])?quinze\b/gi, '95');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ](?:et[- ])?seize\b/gi, '96');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]dix[- ]sept\b/gi, '97');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]dix[- ]huit\b/gi, '98');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]dix[- ]neuf\b/gi, '99');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]dix\b/gi, '90');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]un\b/gi, '81');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]deux\b/gi, '82');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]trois\b/gi, '83');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]quatre\b/gi, '84');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]cinq\b/gi, '85');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]six\b/gi, '86');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]sept\b/gi, '87');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]huit\b/gi, '88');
    result = result.replace(/\bquatre[- ]vingt[s]?[- ]neuf\b/gi, '89');
    result = result.replace(/\bquatre[- ]vingt[s]?\b/gi, '80');
    // Dizaines composées simples: vingt-cinq, trente-trois, etc.
    const dizaines: [RegExp, number][] = [
        [/vingt/i, 20], [/trente/i, 30], [/quarante/i, 40],
        [/cinquante/i, 50], [/soixante/i, 60],
    ];
    const unites: [RegExp, number][] = [
        [/un|une/i, 1], [/deux/i, 2], [/trois/i, 3], [/quatre/i, 4], [/cinq/i, 5],
        [/six/i, 6], [/sept/i, 7], [/huit/i, 8], [/neuf/i, 9],
    ];
    for (const [dRe, dVal] of dizaines) {
        for (const [uRe, uVal] of unites) {
            const pattern = new RegExp(`\\b${dRe.source}[- ](?:et[- ])?${uRe.source}\\b`, 'gi');
            result = result.replace(pattern, String(dVal + uVal));
        }
    }
    // Nombres simples (après composés pour ne pas casser "vingt-cinq" → "20-5")
    // Seulement dans contexte numérique (âgé de X, X ans, X %, X/10, etc.)
    result = result.replace(/\b(?:âgée?\s+de\s+)(vingt|trente|quarante|cinquante|soixante)\b/gi, (m, nb) => {
        return m.replace(nb, NOMBRES_TEXTE[nb.toLowerCase()] || nb);
    });
    result = result.replace(/\b(vingt|trente|quarante|cinquante|soixante)\s+ans\b/gi, (m, nb) => {
        return (NOMBRES_TEXTE[nb.toLowerCase()] || nb) + ' ans';
    });
    result = result.replace(/\b(zéro|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize)\s*(?=\/\s*10|%|pour\s*cent|dixièmes?)\b/gi, (m, nb) => {
        return (NOMBRES_TEXTE[nb.toLowerCase()] || nb) + m.slice(nb.length);
    });

    // V3.3.411: Ordinals — seulement dans contexte médical (degré, doigt, orteil, rayon, côte, vertèbre, métacarpe, métatarse, jour, mois, semaine)
    // V3.3.412: Contextuels — ne pas convertir "premier ministre" etc.
    const ordinalCtx = '(?=\\s+(?:degr[eé]|doigt|orteil|rayon|côte|vertèbre|jour|mois|semaine|métacarp|métatars|phalang|intention|temps))';
    result = result.replace(new RegExp('\\bpremière?' + ordinalCtx, 'gi'), '1er');
    result = result.replace(new RegExp('\\bdeuxième' + ordinalCtx, 'gi'), '2ème');
    result = result.replace(new RegExp('\\btroisième' + ordinalCtx, 'gi'), '3ème');
    result = result.replace(new RegExp('\\bquatrième' + ordinalCtx, 'gi'), '4ème');
    result = result.replace(new RegExp('\\bcinquième' + ordinalCtx, 'gi'), '5ème');
    // Toujours convertir dans "Xème degré" (très fréquent en barème)
    result = result.replace(/\bpremière?\s+degr[eé]s?\b/gi, '1er degré');
    result = result.replace(/\bdeuxième\s+degr[eé]s?\b/gi, '2ème degré');
    result = result.replace(/\btroisième\s+degr[eé]s?\b/gi, '3ème degré');

    // V3.3.411: Medical measurements — "X centimètres" → "X cm", etc.
    result = result.replace(/\b(\d+)\s*centimètres?\b/gi, '$1 cm');
    result = result.replace(/\b(\d+)\s*millimètres?\b/gi, '$1 mm');
    result = result.replace(/\b(\d+)\s*kilogrammes?\b/gi, '$1 kg');
    result = result.replace(/\b(\d+)\s*grammes?\b/gi, '$1 g');
    result = result.replace(/\b(\d+)\s*mètres?\b(?!\s*(?:carrés?|cubes?))/gi, '$1 m');
    // "X sur 10" → "X/10" (échelle de douleur, acuité)
    result = result.replace(/\b(\d+)\s+sur\s+10\b/gi, '$1/10');
    result = result.replace(/\b(\d+)\s+sur\s+20\b/gi, '$1/20');

    return result;
}

/** V3.3.408: Auto-capitalisation après ponctuation de fin de phrase */
function autoCapitalize(text: string): string {
    // Capitaliser après . ! ? suivi d'un espace
    return text.replace(/([.!?])\s+([a-zàâéèêëïîôùûüç])/g, (_, punct, letter) => {
        return punct + ' ' + letter.toUpperCase();
    });
}

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
    // V3.3.409: Hallucinations observées supplémentaires
    /^de\s+la\s+premi[eè]re\s+fois\.?\s*$/i,
    /^et\s+de\s+la\s+premi[eè]re\s+fois/i,
    /^c[''']est\s+la\s+premi[eè]re\s+fois/i,
    /^la\s+premi[eè]re\s+fois\.?$/i,    // V3.3.410: Hallucinations supplémentaires observées
    /^\s*1\s*$/,
    /^\s*\.\s*$/,
    /^\s*,\s*$/,
    /^sous[- ]?titr/i,
    /^\s*\.\.\.\.?\s*$/,
    /^c[''']est\s+tout\s+pour/i,
    /^\s*et\s+voil[aà]\.?\s*$/i,
    /^\s*bon\.?\s*$/i,
    /^\s*alors\.?\s*$/i,
    /^\s*donc\.?\s*$/i,
    /^\s*bien\.?\s*$/i,
    /^\s*ok\.?\s*$/i,
    /^\s*oui\.?\s*$/i,
    /^\s*non\.?\s*$/i,
    /^\s*ah\.?\s*$/i,
    /^\s*oh\.?\s*$/i,
    /^\s*hein\.?\s*$/i,
    /^\s*euh\.?\s*$/i,
    /^\s*hmm+\.?\s*$/i,
    // V3.3.412: Hallucinations YouTube/podcast supplémentaires
    /^cliquez\s+sur/i,
    /^mettez\s+en\s+favoris/i,
    /^partagez\s+cette/i,
    /^laissez\s+un\s+commentaire/i,
    /^comme\s+d[''']habitude/i,
    /^je\s+recommande/i,
    /^selon\s+mon\s+exp[eé]rience/i,
    /^\s*voilà\.?\s*$/i,
    /^\s*bref\.?\s*$/i,
    /^\s*en\s+fait\.?\s*$/i,
    /^\s*tu\s+sais\.?\s*$/i,
    /^\s*vous\s+savez\.?\s*$/i,
    /^\s*allez\.?\s*$/i,
    /^\s*tiens\.?\s*$/i,
    /^\d{1,2}\s*$/,
    /^\s*…+\s*$/,
    // V3.3.414: Hallucinations Whisper observées supplémentaires (French medical context)
    /^bonjour\s+[àa]\s+tous/i,
    /^dans\s+cette\s+vid[eé]o/i,
    /^bienvenue\s+sur/i,
    /^bienvenue\s+dans/i,
    /^aujourd[''']hui\s+(?:on|nous|je)\s+(?:va|allons|vais)/i,
    /^salut\s+[àa]\s+tous/i,
    /^hello\s+everyone/i,
    /^thank\s+you\s+for\s+watching/i,
    /^thanks\s+for\s+watching/i,
    /^please\s+subscribe/i,
    /^don[''']t\s+forget/i,
    /^see\s+you\s+(?:next|in)/i,
    /^\s*bye\.?\s*$/i,
    /^\s*au\s+revoir\.?\s*$/i,
    /^\s*bonne\s+journ[eé]e\.?\s*$/i,
    /^\s*merci\s+beaucoup\.?\s*$/i,
    /^\s*je\s+ne\s+sais\s+pas\.?\s*$/i,
    /^\s*c[''']est\s+tout\.?\s*$/i,
    /^\s*et\s+c[''']est\s+tout\.?\s*$/i,
    /^sous[- ]titres?\s+r[eé]alis[eé]s?/i,
    /^traduction/i,
    /^\s*\.\.\.\s*$/,
    /^\s*\*+\s*$/,
    // Single repeated word/syllable (Whisper stuttering)
    /^(\w{1,4})\s+\1\s+\1/i,
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
 * 0b. V3.3.410: Reconstruction apostrophes & contractions d'articles
 * 1. Corrections de phrases (regex) — 1ère passe
 * 2. Corrections de mots (exact match)
 * 3. V3.3.392: Correction phonétique (normalisation sans accents → terme médical correct)
 * 3b. V3.3.411: 2ème passe phrases (après correction mots, nouvelles expressions peuvent apparaître)
 * 4. V3.3.410: Post-nettoyage typographique
 */
function medicalPostCorrection(text: string): string {
    let corrected = text;
    
    // 0. V3.3.393: Supprimer les segments d'hallucination en fin de texte
    // Whisper génère parfois "[Musique]", "Je vous invite à...", etc.
    corrected = corrected.replace(/\s*[\[\(](?:Musique|musique|Music|Applaudissements|mouillage|Mouillage|bruit|Bruit|silence|Silence)[\]\)]\s*/gi, ' ');
    corrected = corrected.replace(/\.\s*(?:Je vous invite[^.]*|N'hésitez pas[^.]*|Abonnez-vous[^.]*|Merci d'avoir[^.]*|À bientôt[^.]*|et de la premi[eè]re fois[^.]*)\s*\.?\s*$/gi, '.');
    // V3.3.414: Supprimer les mots répétés consécutifs SAUF nombres et termes médicaux courts
    // "avec avec" → "avec", mais "trente trente" reste (pourrait être "30 30")
    corrected = corrected.replace(/\b(\w{3,})\s+\1\b/gi, (match, word) => {
        // Ne pas dédupliquer les nombres
        if (/^\d+$/.test(word) || /^(un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|vingt|trente|cent)$/i.test(word)) {
            return match;
        }
        return word;
    });
    corrected = corrected.trim();
    
    // 0b. V3.3.410: Reconstruction d'apostrophes manquantes
    // Whisper omet souvent l'apostrophe: "l épaule" → "l'épaule", "d un" → "d'un"
    // V3.3.411: Fix — "h" seulement suivi de voyelle (h muet: hôpital, humérus, hémorragie)
    corrected = corrected.replace(/\b([ldnsjcmtLDNSJCMT])\s+(?=[aeéèêëiïîoôuùûy])/g, '$1\'');
    corrected = corrected.replace(/\b([ldnsjcmtLDNSJCMT])\s+(?=h[aeéèêëiïîoôuùûy])/gi, '$1\'');
    // "Qu il" → "Qu'il"
    corrected = corrected.replace(/\b([Qq]u)\s+(?=[aeéèêëiïîoôuùûy])/g, '$1\'');
    corrected = corrected.replace(/\b([Qq]u)\s+(?=h[aeéèêëiïîoôuùûy])/gi, '$1\'');
    
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
    
    // 3b. V3.3.411: 2ème passe phrases — après correction de mots, de nouvelles expressions
    // médicales peuvent apparaître (ex: mots corrigés forment un pattern de phrase reconnu)
    for (const [pattern, replacement] of PHRASE_CORRECTIONS) {
        corrected = corrected.replace(pattern, replacement);
    }
    
    // 4. V3.3.410: Post-nettoyage typographique
    // Espaces multiples
    corrected = corrected.replace(/\s{2,}/g, ' ');
    // Espace avant ponctuation
    corrected = corrected.replace(/\s+([.,;:!?])/g, '$1');
    // Pas d'espace après apostrophe
    corrected = corrected.replace(/'\s+/g, '\'');
    // Capitaliser première lettre du texte
    corrected = corrected.replace(/^([a-zàâéèêëïîôùûüç])/, (_, l) => l.toUpperCase());
    
    return corrected;
}

// ═══════════════════════════════════════════════════════════════
// TRAITEMENT COMMANDES VOCALES
// ═══════════════════════════════════════════════════════════════

type VoiceResult =
    | { type: 'clear_all' }
    | { type: 'delete_words'; count: number }
    | { type: 'delete_last_sentence' }
    | { type: 'delete_last_line' }
    | { type: 'text'; text: string }
    | { type: 'submit' }
    | { type: 'new_paragraph' }
    | { type: 'undo' }
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

    // ── Effacer dernière phrase ── V3.3.414: Trouve la vraie limite de phrase
    if (/^(efface[rz]?|supprime[rz]?)\s+(la\s+)?derni[eè]re\s+phrase$/.test(lower)) {
        return { type: 'delete_last_sentence' };
    }

    // ── V3.3.414: Effacer dernière ligne ──
    if (/^(efface[rz]?|supprime[rz]?)\s+(la\s+)?derni[eè]re\s+ligne$/.test(lower)) {
        return { type: 'delete_last_line' };
    }

    // ── V3.3.408: Analyser / Envoyer (lance l'analyse) ──
    if (/^(analyse[rz]?|envoye[rz]?|lance[rz]?\s+l[''']?analyse|valide[rz]?|c[''']?est\s+bon|go)$/i.test(lower)) {
        return { type: 'submit' };
    }

    // ── V3.3.408: Nouveau paragraphe ──
    if (/^(nouveau\s+paragraphe|paragraphe\s+suivant|prochain\s+paragraphe|alin[eé]a)$/i.test(lower)) {
        return { type: 'new_paragraph' };
    }

    // ── V3.3.408: Annuler dernière dictée ──
    if (/^(annule[rz]?|annule[rz]?\s+la\s+derni[eè]re|retour\s+en\s+arri[eè]re|undo)$/i.test(lower)) {
        return { type: 'undo' };
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

    // V3.3.408: Convertir nombres français → chiffres
    p = convertFrenchNumbers(p);
    // V3.3.408: Auto-capitalisation après ponctuation
    p = autoCapitalize(p);
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
    canUndo: boolean;
    wordCount: number;
    segmentCount: number;
}

export interface DictaphoneAIActions {
    toggle: () => void;
    stop: () => void;
    deleteWord: () => void;
    deleteWords: (count: number) => void;
    clearAll: () => void;
    undo: () => void;
    requestSubmit: () => void;
}

// ═══════════════════════════════════════════════════════════════
// HOOK PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export function useDictaphoneAI(
    _text: string,
    setText: (updater: string | ((prev: string) => string)) => void,
    onSubmitRequest?: () => void,
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
    const [canUndo, setCanUndo] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [segmentCount, setSegmentCount] = useState(0);

    // V3.3.408: Historique pour undo
    const undoStackRef = useRef<string[]>([]);
    const submitRequestRef = useRef(onSubmitRequest);
    useEffect(() => { submitRequestRef.current = onSubmitRequest; }, [onSubmitRequest]);

    // V3.3.408: Compter les mots
    useEffect(() => {
        const count = _text.trim() ? _text.trim().split(/\s+/).length : 0;
        setWordCount(count);
    }, [_text]);

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
        undoStackRef.current.push(_text);
        setCanUndo(true);
        setText('');
        setLastCommand('✓ Tout effacé');
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText, _text]);

    // V3.3.408: Annuler dernière action
    const undo = useCallback(() => {
        const prev = undoStackRef.current.pop();
        if (prev !== undefined) {
            setText(prev);
            setLastCommand('↩️ Annulé');
            setCanUndo(undoStackRef.current.length > 0);
        } else {
            setLastCommand('⚠️ Rien à annuler');
        }
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    // V3.3.414: Effacer la dernière phrase (jusqu'au dernier point/!/?)
    const deleteLastSentence = useCallback(() => {
        setText((prev: string) => {
            undoStackRef.current.push(prev);
            setCanUndo(true);
            // Trouver le dernier séparateur de phrase (. ! ?) avant le texte final
            const trimmed = prev.trimEnd();
            // Chercher le dernier . ! ? qui n'est pas le tout dernier caractère
            const lastIdx = Math.max(
                trimmed.lastIndexOf('.', trimmed.length - 2),
                trimmed.lastIndexOf('!', trimmed.length - 2),
                trimmed.lastIndexOf('?', trimmed.length - 2),
            );
            if (lastIdx > 0) {
                return trimmed.slice(0, lastIdx + 1).trimEnd();
            }
            // Pas de ponctuation trouvée → effacer tout
            return '';
        });
        setLastCommand('✓ Dernière phrase effacée');
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    // V3.3.414: Effacer la dernière ligne
    const deleteLastLine = useCallback(() => {
        setText((prev: string) => {
            undoStackRef.current.push(prev);
            setCanUndo(true);
            const lastNewline = prev.lastIndexOf('\n');
            if (lastNewline > 0) {
                return prev.slice(0, lastNewline).trimEnd();
            }
            return '';
        });
        setLastCommand('✓ Dernière ligne effacée');
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    // V3.3.408: Demander analyse
    const requestSubmit = useCallback(() => {
        if (submitRequestRef.current) {
            setLastCommand('🚀 Analyse lancée...');
            setTimeout(() => setLastCommand(''), 2500);
            submitRequestRef.current();
        }
    }, []);

    const deleteWord = useCallback(() => {
        setText((prev: string) => {
            undoStackRef.current.push(prev);
            setCanUndo(true);
            return prev.replace(/\s*\S+\s*$/, '');
        });
        setLastCommand('✓ Mot effacé');
        setTimeout(() => setLastCommand(''), 2500);
    }, [setText]);

    const deleteWords = useCallback((count: number) => {
        setText((prev: string) => {
            undoStackRef.current.push(prev);
            setCanUndo(true);
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
                return_timestamps: true,    // V3.3.413: Active le VAD interne Whisper — filtre le silence
                max_new_tokens: 256,        // V3.3.413: 256 tokens pour chunks de 10s
                // V3.3.413: Paramètres anti-hallucination critiques
                no_speech_threshold: 0.35,              // Seuil agressif — supprime segments sans parole
                compression_ratio_threshold: 2.0,       // Filtre les répétitions hallucinées
                logprob_threshold: -0.8,                // Rejette transcriptions peu confiantes
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
                    case 'delete_last_sentence':
                        deleteLastSentence();
                        break;
                    case 'delete_last_line':
                        deleteLastLine();
                        break;
                    case 'submit':
                        requestSubmit();
                        break;
                    case 'new_paragraph':
                        setText((prev: string) => prev + '\n\n');
                        setLastCommand('✓ Nouveau paragraphe');
                        setTimeout(() => setLastCommand(''), 2500);
                        break;
                    case 'undo':
                        undo();
                        break;
                    case 'text':
                        if (cmd.text) {
                            // V3.3.408: Sauvegarder état pour undo avant chaque ajout
                            setText((prev: string) => {
                                undoStackRef.current.push(prev);
                                if (undoStackRef.current.length > 30) undoStackRef.current.shift();
                                setCanUndo(true);
                                setSegmentCount(s => s + 1);
                                if (!prev) {
                                    // Premier segment : capitaliser la première lettre
                                    return cmd.text.charAt(0).toUpperCase() + cmd.text.slice(1);
                                }
                                const startsWithPunct = /^[.,;:!?\-)\]\n»]/.test(cmd.text);
                                const endsClean = /[\s\n]$/.test(prev);
                                const sep = startsWithPunct || endsClean ? '' : ' ';
                                // Auto-capitaliser si le texte précédent se termine par . ! ?
                                let newText = cmd.text;
                                if (/[.!?]\s*$/.test(prev)) {
                                    newText = newText.charAt(0).toUpperCase() + newText.slice(1);
                                }
                                return prev + sep + newText;
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
    }, [getAccumulatedAudio, clearAll, deleteWords, deleteLastSentence, deleteLastLine, setText]);

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

            // V3.3.413: Whisper SMALL d'abord (~150MB, 244M params, bien meilleur pour le médical français)
            // Fallback vers whisper-base uniquement si SMALL échoue
            setStatusMessage(modelCached 
                ? '⚡ Chargement Whisper (en cache)...' 
                : '⏳ Téléchargement Whisper SMALL (~150MB, une seule fois)...');
            
            let loaded = await tryLoadModel('onnx-community/whisper-small', hasLocalModels ? 1 : 3);
            
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
                    setStatusMessage('⏳ Re-téléchargement Whisper SMALL (~150MB)...');
                    setModelProgress(0);
                    loaded = await tryLoadModel('onnx-community/whisper-small', 2);
                } catch (cacheErr) {
                    console.warn('Erreur purge cache:', cacheErr);
                }
            }

            if (!loaded) {
                // Fallback: whisper-base (plus petit ~77MB, qualité inférieure)
                console.warn('⚠️ Whisper SMALL échoué, fallback vers whisper-base');
                setStatusMessage('⏳ Téléchargement Whisper BASE (~77MB, alternative)...');
                setModelProgress(0);
                loaded = await tryLoadModel('onnx-community/whisper-base', hasLocalModels ? 1 : 2);
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
                        const { samples, rms, isSpeechLikely } = e.data;

                        setAudioLevel(Math.min(100, Math.round(rms * 3000)));

                        // V3.3.414: Use speech likelihood from improved audio processor
                        // Combines RMS energy + zero-crossing rate + adaptive noise floor
                        if (isSpeechLikely || rms > SILENCE_THRESHOLD) {
                            lastSpeechRef.current = Date.now();
                            if (!hadSpeechRef.current) {
                                hadSpeechRef.current = true;
                                setInterimText('🗣️ Parole détectée...');
                            }
                        }

                        // Accumuler les samples (already high-pass filtered by AudioWorklet)
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
        { isListening, isModelLoaded, isModelLoading, modelProgress, isProcessing, interimText, listenDuration, statusMessage, lastCommand, audioLevel, canUndo, wordCount, segmentCount },
        { toggle, stop, deleteWord, deleteWords, clearAll, undo, requestSubmit },
    ];
}
