import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SelectedInjury, Injury } from '../types';
import { localExpertAnalysis, LocalAnalysisResult } from './AiAnalyzer';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { HistoryModal, saveToHistory } from './HistoryModal';

// --- TYPES ---
interface Proposal {
    name: string;
    rate: number;
    justification: string;
    path: string;
    injury: Injury;
    status: 'pending' | 'accepted' | 'rejected';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  proposal?: Proposal;
  choices?: Injury[];
  cumulProposals?: Array<{
    id: string;
    lesionNumber: number;
    description: string;
    injury: Injury;
    justification: string;
    status: 'pending' | 'accepted' | 'rejected';
  }>;
}

interface ExclusiveAiCalculatorProps {
    onAddInjury: (injury: SelectedInjury) => void;
    victimInfo: { age: string; profession: string; sector: string; };
    selectedInjuries: SelectedInjury[];
    totalRate: number;
    hasPreexisting: boolean;
}

// --- UI SUB-COMPONENTS ---

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 p-3 animate-fade-in">
        <span className="text-slate-500 text-sm">Dr. Hakim analyse...</span>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.3s]"></div>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full [animation-delay:-0.15s]"></div>
        <div className="animate-bounce w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
    </div>
);

const ProposalBubble: React.FC<{ proposal: Proposal; onAccept: () => void; onReject: () => void; }> = ({ proposal, onAccept, onReject }) => {
    return (
        <div className="p-4 bg-primary-100/60 border-l-4 border-primary-500 rounded-r-lg">
            <h4 className="font-bold text-primary-800 text-sm">Proposition de l'Expert IA</h4>
            <div className="mt-2 p-3 bg-white rounded-md border border-primary-200/80">
                <div className="text-xs text-slate-700 space-y-2" dangerouslySetInnerHTML={{ __html: proposal.justification }}></div>
            </div>
            {proposal.status === 'pending' && (
                <div className="mt-3 flex gap-2 justify-end">
                    <Button variant="secondary" onClick={onReject} className="!text-xs !py-1 !px-3">Refuser</Button>
                    <Button onClick={onAccept} className="!text-xs !py-1 !px-3">Accepter & Ajouter</Button>
                </div>
            )}
            {proposal.status === 'accepted' && (
                <p className="mt-3 text-xs font-semibold text-green-600 text-right">✓ Accepté et ajouté au calcul.</p>
            )}
             {proposal.status === 'rejected' && (
                <p className="mt-3 text-xs font-semibold text-red-600 text-right">✗ Proposition refusée.</p>
            )}
        </div>
    );
};


const MessageBubble: React.FC<{ message: ChatMessage; onAccept: () => void; onReject: () => void; onChoiceSelect: (choiceText: string) => void; }> = ({ message, onAccept, onReject, onChoiceSelect }) => {
    const isUser = message.role === 'user';
    const textHtml = message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return (
        <div className={`flex flex-col animate-fade-in ${isUser ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-xl rounded-2xl shadow-sm ${isUser ? 'bg-primary-700 text-white rounded-br-lg' : 'bg-white border border-gray-200/80 text-slate-800 rounded-bl-lg'}`}>
                <div className="px-4 py-3 text-sm prose max-w-none prose-p:my-1 prose-strong:text-slate-800" dangerouslySetInnerHTML={{ __html: textHtml }}></div>
                {message.proposal && (
                    <ProposalBubble proposal={message.proposal} onAccept={onAccept} onReject={onReject} />
                )}
                {message.choices && (
                    <div className="p-3 border-t border-slate-200 space-y-2">
                        {message.choices.map((choice, index) => {
                             const rateText = Array.isArray(choice.rate) ? `[${choice.rate[0]}-${choice.rate[1]}]%` : `${choice.rate}%`;
                             return (
                                <button
                                    key={index}
                                    className="w-full text-left p-2 bg-slate-100 hover:bg-primary-100 rounded-md transition-colors"
                                    onClick={() => onChoiceSelect(choice.name)}
                                >
                                    <span className="text-sm font-semibold text-primary-800">{choice.name}</span>
                                    <span className="text-xs text-slate-600 block">Taux : {rateText}</span>
                                </button>
                            )
                        })}
                    </div>
                )}
                {/* 🆕 V3.3.52: Affichage cumul de lésions multiples */}
                {message.cumulProposals && (
                    <div className="p-3 border-t border-slate-200 space-y-3">
                        {message.cumulProposals.map((cumul) => {
                            const rateText = Array.isArray(cumul.injury.rate) ? `[${cumul.injury.rate[0]}-${cumul.injury.rate[1]}]%` : `${cumul.injury.rate}%`;
                            return (
                                <div key={cumul.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs font-bold rounded">
                                            Lésion {cumul.lesionNumber}
                                        </span>
                                        <span className="text-sm font-semibold text-primary-800">{rateText}</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-2">
                                        <strong>Description :</strong> {cumul.description}
                                    </p>
                                    <p className="text-xs text-slate-700 font-medium">{cumul.injury.name}</p>
                                    {cumul.status === 'pending' && (
                                        <div className="mt-2 flex gap-2 justify-end">
                                            <Button variant="secondary" onClick={onReject} className="!text-xs !py-1 !px-2">Refuser</Button>
                                            <Button onClick={onAccept} className="!text-xs !py-1 !px-2">Accepter</Button>
                                        </div>
                                    )}
                                    {cumul.status === 'accepted' && (
                                        <p className="mt-2 text-xs font-semibold text-green-600 text-right">✓ Accepté</p>
                                    )}
                                    {cumul.status === 'rejected' && (
                                        <p className="mt-2 text-xs font-semibold text-red-600 text-right">✗ Refusé</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
export const ExclusiveAiCalculator: React.FC<ExclusiveAiCalculatorProps> = ({ 
    onAddInjury, 
    victimInfo, 
    selectedInjuries, 
    totalRate, 
    hasPreexisting 
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: crypto.randomUUID(), role: 'model', text: "Bonjour. Je suis Dr. Hakim, votre expert en évaluation médico-légale. Décrivez-moi les séquelles cliniques constatées après consolidation pour que je puisse vous aider à déterminer le taux d'IPP." }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const analysisQueueRef = useRef<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // Scroll automatique à chaque nouveau message ou changement de loading
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, isLoading]);

    const processAndDisplayAnalysis = useCallback((text: string) => {
        setIsLoading(true);
        setTimeout(() => {
            try {
                const result = localExpertAnalysis(text);
                let modelMessage: ChatMessage;

                switch (result.type) {
                    case 'proposal':
                        modelMessage = {
                            id: crypto.randomUUID(), role: 'model',
                            text: "Voici mon analyse complète et ma proposition :",
                            proposal: { ...result, status: 'pending' }
                        };
                        break;
                    case 'cumul_proposals':
                        // 🆕 V3.3.52: Afficher plusieurs propositions pour cumul de lésions
                        modelMessage = {
                            id: crypto.randomUUID(), role: 'model',
                            text: result.text + "<br><br><strong>📋 Évaluations individuelles :</strong>",
                            cumulProposals: result.proposals.map((p: any, index: number) => ({
                                id: crypto.randomUUID(),
                                lesionNumber: index + 1,
                                description: p.description,
                                injury: p.injury,
                                justification: p.justification,
                                status: 'pending'
                            }))
                        };
                        break;
                     case 'ambiguity':
                        modelMessage = {
                            id: crypto.randomUUID(), role: 'model',
                            text: result.text,
                            choices: result.choices,
                        };
                        break;
                    case 'no_result':
                    default:
                        modelMessage = { id: crypto.randomUUID(), role: 'model', text: result.text };
                        break;
                }
                setMessages(prev => [...prev, modelMessage]);
            } catch (error) {
                console.error('Erreur analyse IA:', error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                setMessages(prev => [...prev, { 
                    id: crypto.randomUUID(), 
                    role: 'model', 
                    text: `Désolé, une erreur s'est produite lors de l'analyse.<br><br><em style="color: red; font-size: 11px;">Détails technique : ${errorMessage}</em><br><br>Pouvez-vous reformuler votre description ?` 
                }]);
            } finally {
                setIsLoading(false);
            }
        }, 150);
    }, []);

    const processQueueOrPrompt = useCallback(() => {
        if (analysisQueueRef.current.length > 0) {
            const nextQuery = analysisQueueRef.current.shift()!;
            const nextMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: 'model',
                text: `Parfait, la lésion précédente est enregistrée. Passons à la suivante : **"${nextQuery}"**.`
            };
            setMessages(prev => [...prev, nextMessage]);
            
            setTimeout(() => {
                processAndDisplayAnalysis(nextQuery);
            }, 800);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                const finalMessage: ChatMessage = { 
                    id: crypto.randomUUID(), 
                    role: 'model', 
                    text: "Toutes les lésions ont été évaluées. Souhaitez-vous que je **calcule le total** maintenant ?" 
                };
                setMessages(prev => [...prev, finalMessage]);
                setIsLoading(false);
            }, 600);
        }
    }, [processAndDisplayAnalysis]);


    const handleProposalResponse = useCallback((messageId: string, accepted: boolean) => {
        const messageToUpdate = messages.find(msg => msg.id === messageId && msg.proposal?.status === 'pending');
        if (!messageToUpdate || !messageToUpdate.proposal) {
            return;
        }

        const respondedProposal = messageToUpdate.proposal;

        setMessages(prev => prev.map(msg =>
            msg.id === messageId
                ? { ...msg, proposal: { ...respondedProposal, status: accepted ? 'accepted' : 'rejected' }}
                : msg
        ));

        if (accepted) {
            const selectedInjury = {
                ...respondedProposal.injury,
                id: `ai-${crypto.randomUUID()}`,
                chosenRate: respondedProposal.rate,
                category: respondedProposal.path,
                justification: respondedProposal.justification,
            };
            
            onAddInjury(selectedInjury);
            
            // Sauvegarder dans l'historique
            saveToHistory(
                'ia-exclusive',
                respondedProposal.name,
                [{
                    name: respondedProposal.name,
                    rate: respondedProposal.rate,
                    path: respondedProposal.path
                }],
                respondedProposal.rate,
                victimInfo
            );
            
            setTimeout(() => {
                processQueueOrPrompt();
            }, 500);
        } else {
            setTimeout(() => {
                const feedbackText = `Entendu. Pourriez-vous me donner plus de détails sur la séquelle pour que je puisse réévaluer le cas, ou me décrire une autre lésion ?`;
                setMessages(prev => [...prev, {id: crypto.randomUUID(), role: 'model', text: feedbackText}]);
            }, 500);
        }
    }, [messages, onAddInjury, processQueueOrPrompt]);


    const handleSend = useCallback(async (text: string, isClarification: boolean = false) => {
        const textToSend = text.trim();
        if (!textToSend || isLoading) return;

        const newUserMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: textToSend };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        
        if (isClarification) {
             processAndDisplayAnalysis(textToSend);
             return;
        }

        const calculationKeywords = ["calcul", "calcule", "total", "résultat", "c'est tout", "fini", "terminé"];
        if (calculationKeywords.some(kw => textToSend.toLowerCase().includes(kw))) {
             setIsLoading(true);
             await new Promise(res => setTimeout(res, 400));
             if (selectedInjuries.length === 0) {
                setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'model', text: "Je ne peux pas encore calculer. Veuillez d'abord me décrire une séquelle pour que je l'évalue." }]);
            } else {
                let summaryText = "Bien sûr, je procède au calcul final.\n\nLes séquelles retenues sont :\n";
                selectedInjuries.forEach(injury => {
                    summaryText += `- ${injury.name}: **${injury.chosenRate + (injury.socialRate || 0)}%**\n`;
                });
                summaryText += "\n";

                if (hasPreexisting) {
                    summaryText += "En tenant compte de l'état antérieur et en appliquant la formule de l'article 12, ";
                } else if (selectedInjuries.length > 1) {
                    summaryText += "En appliquant la méthode de la capacité restante (Balthazard), ";
                }
                summaryText += `le taux global d'incapacité qui en résulte est de **${totalRate}%**.\n\nPuis-je vous aider avec autre chose ?`;
                
                setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'model', text: summaryText }]);
            }
            setIsLoading(false);
            return;
        }
        
        // Filtrer les segments non-médicaux (profession, contexte) et états antérieurs
        const contextKeywords = /\b(profession|de profession|travaille?\s+comme|femme de menage|ouvrier|agriculteur|maçon|chauffeur|infirmier|enseignant|médecin|ingénieur|comptable|secrétaire|électricien|plombier|soudeur|peintre|menuisier|patient|patiente|homme|femme|âge|agé|agée)\b/i;
        const preexistingKeywords = /\b(état\s+antérieur|antécédent|ancien|préexistant|pré-existant|déjà\s+indemnisé|indemnisation\s+antérieure|taux\s+antérieur)\b/i;
        
        const initialDescriptions = textToSend.split(/;|\s*\+\s*/i).map(s => s.trim()).filter(Boolean);
        
        // Filtrer les segments pour ne garder que les vraies lésions post-traumatiques
        const medicalDescriptions = initialDescriptions.filter(desc => {
            const normalized = desc.toLowerCase();
            // Exclure si c'est uniquement du contexte
            if (contextKeywords.test(desc) && !/(fracture|luxation|rupture|tassement|entorse|plaie|amputation|brûlure|lésion)/i.test(desc)) {
                return false;
            }
            // Exclure si c'est un état antérieur explicite
            if (preexistingKeywords.test(desc)) {
                return false;
            }
            // Inclure si contient des termes médicaux de lésion
            return /(fracture|luxation|rupture|tassement|entorse|plaie|amputation|brûlure|lésion|douleur|raideur|ankylose|limitation|qui\s+presente|presente)/i.test(desc);
        });
        
        // Si aucune lésion médicale trouvée, envoyer tout à l'IA pour analyse complète
        if (medicalDescriptions.length === 0) {
            processAndDisplayAnalysis(textToSend);
            return;
        }
        
        // Smart merging of sequela keywords
        const primaryLesionKeywords = /\b(fracture|luxation|rupture|lesion|brulure|mutilation|contusion|plaie|section|amputation|ecrasement|entorse|tassement)\b/i;
        const sequelaKeywords = new Set(['raccourcissement', 'raideur', 'douleur', 'instabilite', 'laxite', 'gêne', 'gene', 'limitation', 'deviation', 'atrophie', 'amyotrophie', 'cal vicieux', 'troubles trophiques', 'severe', 'sévère', 'modérée', 'moderee', 'légère', 'legere']);
        const descriptions: string[] = [];
        
        if (medicalDescriptions.length > 0) {
            let currentDescription = medicalDescriptions[0];
            const hasPrimaryLesion = primaryLesionKeywords.test(currentDescription);
            
            for (let i = 1; i < medicalDescriptions.length; i++) {
                const part = medicalDescriptions[i];
                const partNormalized = part.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const partWords = partNormalized.split(' ').filter(w => !['et', 'avec', 'du', 'de', 'la', 'le', 'qui', 'presente', 'genou', 'hanche', 'epaule', 'coude', 'poignet', 'cheville', 'rachis'].includes(w));
                
                // Si la partie actuelle est une séquelle fonctionnelle ET qu'on a déjà une lésion primaire
                const isPureSequela = partWords.some(word => sequelaKeywords.has(word)) && !primaryLesionKeywords.test(part);
                
                if (hasPrimaryLesion && isPureSequela) {
                    // Fusionner avec la lésion primaire
                    currentDescription += ` + ${part}`;
                } else {
                    // Nouvelle lésion indépendante
                    descriptions.push(currentDescription);
                    currentDescription = part;
                }
            }
            descriptions.push(currentDescription);
        }

        if (descriptions.length > 1) {
            analysisQueueRef.current = descriptions.slice(1);
            setIsLoading(true);
            await new Promise(res => setTimeout(res, 400));
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: 'model',
                text: `J'ai identifié **${descriptions.length} séquelles post-traumatiques**. Commençons par la première: **"${descriptions[0]}"**.`
            }]);
            setIsLoading(false); // ✅ Désactivation AVANT l'appel pour laisser la fonction gérer son propre loading
            setTimeout(() => processAndDisplayAnalysis(descriptions[0]), 100);
        } else {
            processAndDisplayAnalysis(descriptions[0] || textToSend);
        }
    }, [isLoading, processAndDisplayAnalysis, selectedInjuries, totalRate, hasPreexisting, messages, onAddInjury, processQueueOrPrompt]);
    
    return (
        <>
            <Card className="flex flex-col h-full">
                {/* Header avec bouton historique */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700">Chat Expert IA</h3>
                    <button
                        onClick={() => setIsHistoryOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                        title="Voir l'historique des calculs"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Historique
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4 bg-slate-100 rounded-lg min-h-[400px]">
                    {messages.map((msg) => (
                        <MessageBubble 
                            key={msg.id} 
                            message={msg} 
                            onAccept={() => handleProposalResponse(msg.id, true)} 
                            onReject={() => handleProposalResponse(msg.id, false)}
                            onChoiceSelect={(choiceText) => handleSend(choiceText, true)}
                        />
                    ))}
                    {isLoading && <TypingIndicator />}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-start gap-2">
                        <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => {if(e.key === 'Enter' && !e.shiftKey) {e.preventDefault(); handleSend(userInput);}}}
                            placeholder="Décrivez les séquelles ou demandez le calcul..."
                            className="flex-1 w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/50 text-black placeholder:text-slate-400 bg-white resize-none"
                            aria-label="Décrire les séquelles cliniques ou demander le calcul"
                            disabled={isLoading}
                            rows={3}
                        />
                        <Button onClick={() => handleSend(userInput)} disabled={isLoading || !userInput.trim()} className="!p-3 self-stretch">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </Card>
            
            <HistoryModal 
                isOpen={isHistoryOpen}
                onClose={() => setIsHistoryOpen(false)}
                calculatorType="ia-exclusive"
            />
        </>
    );
};