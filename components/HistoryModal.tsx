import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

interface HistoryEntry {
    id: string;
    timestamp: number;
    type: 'ia-exclusive' | 'guide-ia';
    description: string;
    injuries: Array<{
        name: string;
        rate: number;
        path: string;
    }>;
    totalRate: number;
    victimInfo?: {
        age?: string;
        profession?: string;
        sector?: string;
    };
}

interface HistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    calculatorType: 'ia-exclusive' | 'guide-ia';
}

const HISTORY_STORAGE_KEY = 'ipp_calculator_history';

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, calculatorType }) => {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

    useEffect(() => {
        if (isOpen) {
            loadHistory();
        }
    }, [isOpen]);

    const loadHistory = () => {
        try {
            const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
            if (stored) {
                const allHistory: HistoryEntry[] = JSON.parse(stored);
                const filtered = allHistory
                    .filter(entry => entry.type === calculatorType)
                    .sort((a, b) => b.timestamp - a.timestamp);
                setHistory(filtered);
            }
        } catch (error) {
            console.error('Erreur chargement historique:', error);
        }
    };

    const deleteEntry = (id: string) => {
        try {
            const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
            if (stored) {
                const allHistory: HistoryEntry[] = JSON.parse(stored);
                const updated = allHistory.filter(entry => entry.id !== id);
                localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
                loadHistory();
                if (selectedEntry?.id === id) {
                    setSelectedEntry(null);
                }
            }
        } catch (error) {
            console.error('Erreur suppression historique:', error);
        }
    };

    const clearAllHistory = () => {
        if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
            try {
                const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
                if (stored) {
                    const allHistory: HistoryEntry[] = JSON.parse(stored);
                    const filtered = allHistory.filter(entry => entry.type !== calculatorType);
                    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
                    setHistory([]);
                    setSelectedEntry(null);
                }
            } catch (error) {
                console.error('Erreur effacement historique:', error);
            }
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-primary-700 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-xl font-bold">
                            Historique - {calculatorType === 'ia-exclusive' ? 'IA Exclusive' : 'Guide IA'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Liste historique */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-slate-800">Calculs récents ({history.length})</h3>
                            {history.length > 0 && (
                                <button 
                                    onClick={clearAllHistory}
                                    className="text-xs text-red-600 hover:text-red-700 hover:underline"
                                >
                                    Tout effacer
                                </button>
                            )}
                        </div>
                        
                        {history.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="font-medium">Aucun calcul dans l'historique</p>
                                <p className="text-sm mt-1">Les calculs IPP apparaîtront ici</p>
                            </div>
                        ) : (
                            <div className="space-y-2 custom-scrollbar max-h-[500px] overflow-y-auto pr-2">
                                {history.map(entry => (
                                    <div 
                                        key={entry.id}
                                        onClick={() => setSelectedEntry(entry)}
                                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                            selectedEntry?.id === entry.id 
                                                ? 'border-primary-500 bg-primary-50 shadow-md' 
                                                : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-500 mb-1">{formatDate(entry.timestamp)}</p>
                                                <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                                                    {entry.description || 'Calcul IPP'}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteEntry(entry.id);
                                                }}
                                                className="ml-2 text-red-500 hover:text-red-700 p-1"
                                                title="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-slate-600">
                                                {entry.injuries.length} lésion{entry.injuries.length > 1 ? 's' : ''}
                                            </span>
                                            <span className="text-sm font-bold text-primary-700">
                                                IPP: {entry.totalRate}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Détails sélection */}
                    <div className="border-l border-slate-200 pl-4">
                        {selectedEntry ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Détails du calcul</h3>
                                    <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-2">
                                        <div>
                                            <span className="font-semibold text-slate-700">Date:</span>{' '}
                                            <span className="text-slate-600">{formatDate(selectedEntry.timestamp)}</span>
                                        </div>
                                        {selectedEntry.victimInfo?.age && (
                                            <div>
                                                <span className="font-semibold text-slate-700">Âge:</span>{' '}
                                                <span className="text-slate-600">{selectedEntry.victimInfo.age} ans</span>
                                            </div>
                                        )}
                                        {selectedEntry.victimInfo?.profession && (
                                            <div>
                                                <span className="font-semibold text-slate-700">Profession:</span>{' '}
                                                <span className="text-slate-600">{selectedEntry.victimInfo.profession}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 mb-2">Lésions évaluées</h4>
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                        {selectedEntry.injuries.map((injury, idx) => (
                                            <div key={idx} className="bg-white border border-slate-200 p-3 rounded-lg">
                                                <p className="text-sm font-semibold text-slate-800 mb-1">{injury.name}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-slate-500">{injury.path}</span>
                                                    <span className="font-bold text-primary-700">{injury.rate}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-primary-50 border border-primary-200 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-slate-800">IPP Total</span>
                                        <span className="text-3xl font-bold text-primary-700">{selectedEntry.totalRate}%</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                                <div className="text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Sélectionnez un calcul pour voir les détails
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 p-4 flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Fermer
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Helper function to save to history
export const saveToHistory = (
    type: 'ia-exclusive' | 'guide-ia',
    description: string,
    injuries: Array<{ name: string; rate: number; path: string }>,
    totalRate: number,
    victimInfo?: { age?: string; profession?: string; sector?: string }
) => {
    try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        const history: HistoryEntry[] = stored ? JSON.parse(stored) : [];
        
        const entry: HistoryEntry = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            type,
            description,
            injuries,
            totalRate,
            victimInfo
        };
        
        history.push(entry);
        
        // Garder maximum 100 entrées
        if (history.length > 100) {
            history.shift();
        }
        
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Erreur sauvegarde historique:', error);
    }
};
