import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SelectedInjury, Injury } from '../types';
import { localExpertAnalysis, LocalAnalysisResult } from './AiAnalyzer';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

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
    const analysisQueueRef = useRef<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const processAndDisplayAnalysis = useCallback((text: string) => {
        setIsLoading(true);
        setTimeout(() => {
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
            setIsLoading(false);
        }, 400 + Math.random() * 400);
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
            onAddInjury({
                ...respondedProposal.injury,
                id: `ai-${crypto.randomUUID()}`,
                chosenRate: respondedProposal.rate,
                category: respondedProposal.path,
                justification: respondedProposal.justification,
            });
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
        
        // Smart merging of sequela keywords
        const sequelaKeywords = new Set(['raccourcissement', 'raideur', 'douleur', 'instabilite', 'laxite', 'gêne', 'gene', 'limitation', 'deviation', 'atrophie', 'amyotrophie', 'cal vicieux', 'troubles trophiques']);
        const initialDescriptions = textToSend.split(/;|\s*\+\s*/i).map(s => s.trim()).filter(Boolean);
        const descriptions: string[] = [];
        
        if (initialDescriptions.length > 0) {
            let currentDescription = initialDescriptions[0];
            for (let i = 1; i < initialDescriptions.length; i++) {
                const part = initialDescriptions[i];
                const partWords = part.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').filter(w => !['et', 'avec', 'du', 'de', 'la'].includes(w));
                
                const isPureSequela = partWords.length > 0 && partWords.every(word => sequelaKeywords.has(word));

                if (isPureSequela && partWords.length < 3) { // Only merge short, pure sequela descriptions
                    currentDescription += ` avec ${part}`;
                } else {
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
                text: `J'ai identifié **${descriptions.length} lésions distinctes**. Commençons par la première: **"${descriptions[0]}"**.`
            }]);
            processAndDisplayAnalysis(descriptions[0]);
        } else {
            processAndDisplayAnalysis(descriptions[0] || textToSend);
        }
    }, [isLoading, processAndDisplayAnalysis, selectedInjuries, totalRate, hasPreexisting, messages, onAddInjury, processQueueOrPrompt]);
    
    return (
        <Card className="flex flex-col h-full">
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
    );
};