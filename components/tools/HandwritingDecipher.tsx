
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Drug } from '../../types';
import { localDrugDatabase } from '../../data/drugList';
import { createWorker } from 'tesseract.js';
import { 
    enhanceTranscriptionWithAI, 
    suggestMedicationsFromPartial,
    analyzeMedicalText
} from '../../services/prescriptionOCR';

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const commonAbbreviations = [
    { abbr: "cp", full: "comprimé" }, { abbr: "gél", full: "gélule" },
    { abbr: "inj", full: "injectable" }, { abbr: "sirop", full: "sirop" },
    { abbr: "gtt", full: "gouttes" }, { abbr: "matin", full: "matin" },
    { abbr: "midi", full: "midi" }, { abbr: "soir", full: "soir" },
    { abbr: "pdt", full: "pendant" }, { abbr: "jrs", full: "jours" },
    { abbr: "1/j", full: "1 fois par jour" }, { abbr: "2/j", full: "2 fois par jour" },
    { abbr: "3/j", full: "3 fois par jour" }, { abbr: "si besoin", full: "si besoin" },
];

export const HandwritingDecipher: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [transcription, setTranscription] = useState('');
    const [suggestions, setSuggestions] = useState<Drug[]>([]);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [ocrProgress, setOcrProgress] = useState(0);
    const [aiStatus, setAiStatus] = useState<string>('');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result as string;
                setImagePreview(base64);
                
                // Lancer OCR automatiquement avec Tesseract.js
                setIsProcessing(true);
                setAiStatus('🤖 Analyse de l\'ordonnance en cours...');
                setOcrProgress(0);
                
                try {
                    const worker = await createWorker('fra', 1, {
                        logger: (m) => {
                            if (m.status === 'recognizing text') {
                                setOcrProgress(Math.round(m.progress * 100));
                            }
                        }
                    });
                    
                    const { data } = await worker.recognize(base64);
                    const extractedText = data.text.trim();
                    const confidence = Math.round(data.confidence);
                    
                    await worker.terminate();
                    
                    if (extractedText) {
                        setTranscription(extractedText);
                        setAiStatus(`✅ Analyse terminée (Confiance: ${confidence}%)`);
                    } else {
                        setTranscription('');
                        setAiStatus('⚠️ Aucun texte détecté. Veuillez transcrire manuellement.');
                    }
                } catch (error) {
                    console.error('Erreur OCR:', error);
                    setAiStatus('❌ Erreur lors de l\'analyse. Veuillez transcrire manuellement.');
                } finally {
                    setIsProcessing(false);
                    setOcrProgress(0);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTranscriptionChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setTranscription(text);

        const cursorPos = e.target.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPos);
        const lastWord = textBeforeCursor.split(/[\s\n]+/).pop();

        if (lastWord && lastWord.length > 2) {
            const lowerLastWord = lastWord.toLowerCase();
            
            // Utiliser suggestions IA améliorées
            const aiSuggestions = await suggestMedicationsFromPartial(lowerLastWord, localDrugDatabase);
            setSuggestions(aiSuggestions);
            setActiveSuggestion(0);
        } else {
            setSuggestions([]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion(prev => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            handleSuggestionClick(suggestions[activeSuggestion]);
        } else if (e.key === 'Escape') {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (drug: Drug) => {
        if (!textareaRef.current) return;
        const drugName = drug.name || drug.dci;
        const cursorPos = textareaRef.current.selectionStart;
        const textBeforeCursor = transcription.substring(0, cursorPos);
        const lastWordIndex = textBeforeCursor.search(/\S+$/);
        const newText = textBeforeCursor.substring(0, lastWordIndex) + drugName + " " + transcription.substring(cursorPos);

        setTranscription(newText);
        setSuggestions([]);

        setTimeout(() => {
            const newCursorPos = lastWordIndex + drugName.length + 1;
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const insertAbbreviation = (text: string) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const currentText = textareaRef.current.value;
        const newText = currentText.substring(0, start) + text + " " + currentText.substring(end);
        setTranscription(newText);
        
        setTimeout(() => {
            textareaRef.current?.focus();
            const newCursorPos = start + text.length + 1;
            textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    // Améliorer la transcription avec IA
    const handleEnhanceWithAI = async () => {
        if (!transcription.trim()) {
            setAiStatus('⚠️ Veuillez d\'abord saisir du texte à améliorer.');
            return;
        }
        
        setIsEnhancing(true);
        setAiStatus('🤖 Amélioration du texte avec IA...');
        
        try {
            const enhanced = await enhanceTranscriptionWithAI(transcription);
            
            // Si le texte est identique, l'IA n'était pas disponible
            if (enhanced === transcription) {
                setAiStatus('ℹ️ IA non disponible. Installez Ollama pour l\'amélioration automatique.\nVotre texte reste inchangé.');
            } else {
                setTranscription(enhanced);
                setAiStatus('✅ Texte amélioré avec succès !');
                setTimeout(() => setAiStatus(''), 3000);
            }
        } catch (error) {
            setAiStatus('ℹ️ IA non disponible. Installez Ollama pour utiliser cette fonctionnalité.');
        } finally {
            setIsEnhancing(false);
        }
    };

    // Analyser le texte médical
    const handleAnalyze = async () => {
        if (!transcription.trim()) {
            setAiStatus('⚠️ Veuillez d\'abord saisir du texte à analyser.');
            return;
        }
        
        setIsEnhancing(true);
        setAiStatus('🤖 Analyse médicale en cours...');
        
        try {
            const analysis = await analyzeMedicalText(transcription);
            
            // Vérifier si l'IA a fonctionné
            if (analysis.corrected === transcription && analysis.medications.length === 0) {
                setAiStatus('ℹ️ IA non disponible. Installez Ollama pour l\'analyse automatique.');
            } else {
                setTranscription(analysis.corrected);
                
                let status = '✅ Analyse terminée !\n';
                if (analysis.medications.length > 0) {
                    status += `💊 Médicaments détectés: ${analysis.medications.join(', ')}\n`;
                }
                if (analysis.warnings.length > 0) {
                    status += `⚠️ ${analysis.warnings.join(', ')}`;
                }
                
                setAiStatus(status);
            }
        } catch (error) {
            setAiStatus('ℹ️ IA non disponible. Installez Ollama pour utiliser cette fonctionnalité.');
        } finally {
            setIsEnhancing(false);
        }
    };

    return (
        <div>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">🤖 IA Locale pour OCR Automatique</p>
                <p className="text-xs text-blue-800 mb-2">
                    Pour activer l'analyse automatique des ordonnances manuscrites :
                </p>
                <ol className="text-xs text-blue-800 space-y-1 ml-4">
                    <li>1. Téléchargez <a href="https://ollama.ai" target="_blank" rel="noopener" className="underline font-semibold">Ollama</a></li>
                    <li>2. Installez les modèles : <code className="bg-blue-100 px-1 rounded">ollama pull llava</code> et <code className="bg-blue-100 px-1 rounded">ollama pull llama2</code></li>
                    <li>3. Lancez le serveur : <code className="bg-blue-100 px-1 rounded">ollama serve</code></li>
                </ol>
                <p className="text-xs text-blue-700 mt-2">
                    ℹ️ Sans Ollama, vous pouvez toujours transcrire manuellement avec suggestions intelligentes.
                </p>
            </div>

            {aiStatus && (
                <div className={`mb-4 p-3 rounded-lg ${
                    aiStatus.includes('❌') ? 'bg-red-50 border border-red-200 text-red-900' :
                    aiStatus.includes('⚠️') ? 'bg-orange-50 border border-orange-200 text-orange-900' :
                    aiStatus.includes('ℹ️') ? 'bg-blue-50 border border-blue-200 text-blue-900' :
                    'bg-green-50 border border-green-200 text-green-900'
                }`}>
                    <p className="text-sm whitespace-pre-line">{aiStatus}</p>
                </div>
            )}

            <p className="text-slate-600 mb-4 text-sm">
                📸 Prenez une photo d'une ordonnance. L'IA analysera automatiquement l'écriture manuscrite.
            </p>
            
            <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            
            {!imagePreview ? (
                 <button 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={isProcessing}
                    className="w-full border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-primary-500 transition-colors disabled:opacity-50"
                >
                    <UploadIcon />
                    <span className="mt-2 text-sm font-medium text-slate-600">
                        {isProcessing ? '🤖 Analyse en cours...' : 'Cliquez pour prendre ou choisir une photo'}
                    </span>
                </button>
            ) : (
                <div className="space-y-4">
                    <div className="border border-slate-200 rounded-lg p-2 bg-gray-100">
                        <img src={imagePreview} alt="Aperçu de l'ordonnance" className="max-h-60 w-auto mx-auto rounded-md shadow-md" />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={() => fileInputRef.current?.click()} variant="secondary" disabled={isProcessing}>
                            Changer l'image
                        </Button>
                        {ocrProgress > 0 && (
                            <div className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm flex items-center justify-center">
                                ⏳ Progression: {ocrProgress}%
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-800">Zone de Transcription Assistée par IA</h3>
                    <div className="flex gap-2">
                        <Button 
                            onClick={handleEnhanceWithAI} 
                            variant="secondary" 
                            size="sm"
                            disabled={isEnhancing || !transcription.trim()}
                        >
                            {isEnhancing ? '⏳' : '✨'} Améliorer
                        </Button>
                        <Button 
                            onClick={handleAnalyze} 
                            variant="secondary" 
                            size="sm"
                            disabled={isEnhancing || !transcription.trim()}
                        >
                            {isEnhancing ? '⏳' : '🔍'} Analyser
                        </Button>
                    </div>
                </div>

                {/* Statut de l'analyse */}
                {aiStatus && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900 whitespace-pre-line">{aiStatus}</p>
                    </div>
                )}
                
                <div className="mb-2">
                    <p className="text-xs text-slate-500 mb-2">Aides rapides :</p>
                    <div className="flex flex-wrap gap-1.5">
                        {commonAbbreviations.map(item => (
                            <button key={item.abbr} onClick={() => insertAbbreviation(item.full)} title={item.full} className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full hover:bg-slate-300 transition">
                                {item.abbr}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <textarea
                        ref={textareaRef}
                        value={transcription}
                        onChange={handleTranscriptionChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Commencez à transcrire ici... L'assistant vous aidera."
                        className="w-full h-40 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50"
                        aria-label="Zone de transcription"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={`${suggestion.dci}-${index}`}
                                    className={`px-3 py-2 cursor-pointer text-sm ${index === activeSuggestion ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'}`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <span className="font-bold">{suggestion.name || suggestion.dci}</span>
                                    <span className="text-xs ml-2">({suggestion.dci})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
