import React, { useState, useEffect, useCallback } from 'react';
import { CalculationResult } from './components/CalculationResult';
// FIX: Corrected the import of LegislativeGuide
import { LegislativeGuide } from './components/LegislativeGuide';
import { ProfessionalDiseasesGuide } from './components/ProfessionalDiseasesGuide';
import { ToolsPage } from './components/ToolsPage';
import { BottomNav } from './components/BottomNav';
import { TopAppBar } from './components/TopAppBar';
import { SummaryModal } from './components/modals/SummaryModal';
import { SelectedInjury } from './types';
import { Card } from './components/ui/Card';
import { Login } from './components/Login';
import { CalculatorPage } from './components/CalculatorPage';
import { AppareillageSearch } from './components/AppareillageSearch';

const tabTitles: { [key: string]: string } = {
    calculator: 'Calculateur IPP',
    legislative: 'Assistant Juridique',
    diseases: 'Maladies professionnelles',
    appareillage: 'Appareillage CNAS',
    tools: 'Outils'
};

export const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const saved = localStorage.getItem('isAuthenticated');
        return saved === 'true';
    });
    const [activeTab, setActiveTab] = useState('calculator');
    const [selectedInjuries, setSelectedInjuries] = useState<SelectedInjury[]>([]);
    const [totalRate, setTotalRate] = useState(0);
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [preexistingRate, setPreexistingRate] = useState<number>(0);
    const [socialRate, setSocialRate] = useState<number>(0);
    const [aiNotes, setAiNotes] = useState<string[]>([]);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [summaryText, setSummaryText] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // State lifted from GuidedCalculator
    const [victimInfo, setVictimInfo] = useState({ age: '', profession: '', sector: 'prive', gender: 'homme', company: '' });
    const [accidentType, setAccidentType] = useState('');

    // Version de l'application
    useEffect(() => {
        console.log('🏥 Guide du Médecin Conseil - Version V3.3.183 - FIX classification MS/MI pour cal vicieux');
        console.log('📅 Build:', new Date().toISOString());
    }, []);

    // Détecter le statut en ligne/hors ligne
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        const calculateTotalRate = () => {
            const globalSocialRate = socialRate || 0;
    
            if (selectedInjuries.length === 0 && preexistingRate === 0) {
                setTotalRate(globalSocialRate > 0 ? Math.min(100, globalSocialRate) : 0);
                return;
            }
    
            // Step 1: Combine all NEW injuries using Balthazard's formula
            const newInjuryRates = selectedInjuries.map(i => i.chosenRate).sort((a, b) => b - a);
            let remainingCapacityForNew = 100;
            let combinedNewRate = 0;
            newInjuryRates.forEach(rate => {
                const ippFromRate = remainingCapacityForNew * (rate / 100);
                combinedNewRate += ippFromRate;
                remainingCapacityForNew -= ippFromRate;
            });
    
            let finalMedicalRate = 0;
    
            // Step 2: Apply pre-existing condition logic (Art. 12) if applicable
            if (preexistingRate > 0 && preexistingRate < 100) {
                // The rate for the new accident is calculated based on remaining capacity.
                // This formula simplifies to the Balthazard combination of the new injuries,
                // but we calculate it explicitly for legal clarity.
                const t_preexisting = preexistingRate;
                
                // Calculate total theoretical incapacity by combining pre-existing rate with the new combined rate.
                const t_global = t_preexisting + (100 - t_preexisting) * (combinedNewRate / 100);
    
                const c1_capacityBefore = 100 - t_preexisting;
                const c2_capacityAfter = 100 - t_global;
    
                if (c1_capacityBefore > 0) {
                    // This is the rate attributable to the new accident
                    finalMedicalRate = ((c1_capacityBefore - c2_capacityAfter) / c1_capacityBefore) * 100;
                } else {
                    finalMedicalRate = 0; // Should not happen with the check `preexistingRate < 100`
                }
            } else {
                // No pre-existing condition, the medical rate is just the Balthazard combination of new injuries.
                finalMedicalRate = combinedNewRate;
            }
            
            // Step 3: Round the final medical rate and add the global social rate at the very end.
            const roundedMedicalRate = Math.round(finalMedicalRate);
            const finalRateWithSocial = roundedMedicalRate + globalSocialRate;
            
            setTotalRate(Math.min(100, finalRateWithSocial));
        };
    
        calculateTotalRate();
    }, [selectedInjuries, preexistingRate, socialRate]);


    const handleInstallClick = async () => {
        if (!installPrompt) {
            return;
        }
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
    };
    
    const handleAddInjury = useCallback((injury: SelectedInjury) => {
      console.log('🔧 [APP] handleAddInjury appelé avec:', injury);
      console.log('🔧 [APP] État actuel selectedInjuries:', selectedInjuries);
      
      try {
          setSelectedInjuries(prev => {
            console.log('🔧 [APP] Prev injuries:', prev);
            const existingIndex = prev.findIndex(i => i.id === injury.id);
            console.log('🔧 [APP] Index existant:', existingIndex);
            
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = injury;
                console.log('✅ [APP] Mise à jour lésion existante, nouvelles injuries:', updated);
                return updated;
            }
            const newInjuries = [...prev, injury];
            console.log('✅ [APP] Ajout nouvelle lésion, nouvelles injuries:', newInjuries);
            return newInjuries;
          });
      } catch (error) {
          console.error('❌ [APP] Erreur dans handleAddInjury:', error);
          throw error;
      }
    }, []);

    const handleRemoveInjury = useCallback((id: string) => {
        setSelectedInjuries(prev => prev.filter(injury => injury.id !== id));
    }, []);

    const handleGenerateSummary = () => {
        let summary = "RÉSUMÉ CLINIQUE D'ÉVALUATION D'INCAPACITÉ\n";
        summary += "========================================\n\n";

        // Paragraph 1: Victim context
        const isMale = victimInfo.gender === 'homme';
        const genderPronoun = isMale ? "d'un" : "d'une";
        const assuredText = isMale ? "assuré" : "assurée";
        const ageText = victimInfo.age ? `${isMale ? 'âgé' : 'âgée'} de ${victimInfo.age} ans` : "dont l'âge n'a pas été précisé";
        
        let professionText = '';
        if (victimInfo.profession && victimInfo.profession !== "Sans profession") {
            professionText = `, exerçant la profession de ${victimInfo.profession}`;
            if (victimInfo.company) {
                professionText += ` au niveau de ${victimInfo.company}`;
            }
        }

        summary += `Il s'agit ${genderPronoun} ${assuredText} ${ageText}${professionText}. `;
        
        if (accidentType) {
            summary += `L'évaluation est réalisée dans les suites d'un(e) ${accidentType.toLowerCase()}.\n\n`;
        } else {
            summary += `L'évaluation est réalisée dans un contexte d'accident du travail ou de maladie professionnelle.\n\n`;
        }

        // Paragraph 2: Pre-existing condition
        if (preexistingRate > 0) {
            summary += `L'anamnèse révèle un état antérieur déjà indemnisé à hauteur de ${preexistingRate}%. Le calcul tiendra compte de cette incapacité préexistante conformément à la législation (Art. 12).\n\n`;
        }

        // Paragraph 3: Lesion description
        summary += "L'examen clinique et l'étude du dossier médical ont permis de retenir les séquelles suivantes :\n";
        selectedInjuries.forEach((injury, index) => {
            summary += `   - ${injury.name}, localisée au niveau de ${injury.category || 'non spécifié'}. Pour cette séquelle, un taux de ${injury.chosenRate}% a été retenu.`;
            if (injury.socialRate) {
                summary += ` Une majoration pour taux social de ${injury.socialRate}% a été appliquée.`;
            }
            summary += `\n`;
        });

        // Paragraph 4: Calculation method and conclusion
        summary += "\nEn conclusion, et après application du barème indicatif, le taux d'incapacité permanente partielle (IPP) est déterminé comme suit :\n\n";
        if (preexistingRate > 0) {
            summary += `   Méthode de calcul : Conformément à l'article 12 de la loi, le calcul a été effectué en tenant compte de la capacité restante de la victime suite à son état antérieur de ${preexistingRate}%.\n`;
        } else if (selectedInjuries.length > 1) {
            summary += "   Méthode de calcul : La formule de Balthazard (capacité restante) a été utilisée pour combiner les taux des différentes lésions et obtenir un taux global consolidé.\n";
        } else {
            summary += "   Méthode de calcul : Le taux correspond à la seule lésion évaluée.\n";
        }
        
        if (socialRate > 0) {
            summary += `   Majoration : Une majoration globale pour taux social de ${socialRate}% a été appliquée au taux médical calculé.\n`;
        }

        summary += `\n   LE TAUX GLOBAL D'INCAPACITÉ PERMANENTE PARTIELLE (IPP) RÉSULTANT DE CET ÉVÉNEMENT EST ESTIMÉ À : ${totalRate}%\n`;
        
        summary += "\n========================================\n";
        summary += "Avis : Ce résumé est généré à titre informatif et ne remplace pas une expertise médicale légale complète. Le taux est une estimation basée sur le barème indicatif.";

        setSummaryText(summary);
        setIsSummaryModalOpen(true);
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'calculator':
                return (
                    <CalculatorPage
                        selectedInjuries={selectedInjuries}
                        totalRate={totalRate}
                        onAddInjury={handleAddInjury}
                        onRemoveInjury={handleRemoveInjury}
                        preexistingRate={preexistingRate}
                        setPreexistingRate={setPreexistingRate}
                        socialRate={socialRate}
                        setSocialRate={setSocialRate}
                        aiNotes={aiNotes}
                        onGenerateSummary={handleGenerateSummary}
                        victimInfo={victimInfo}
                        onVictimInfoChange={setVictimInfo}
                        accidentType={accidentType}
                        onAccidentTypeChange={setAccidentType}
                    />
                );
            case 'legislative':
                return <LegislativeGuide />;
            case 'diseases':
                return <ProfessionalDiseasesGuide />;
            case 'appareillage':
                return <AppareillageSearch />;
            case 'tools':
                return <ToolsPage />;
            default:
                return null;
        }
    };

    if (!isAuthenticated) {
        return <Login onLoginSuccess={() => {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
        }} />;
    }

    return (
        <div className="relative min-h-screen bg-background text-slate-800 flex flex-col font-sans">
            <TopAppBar 
                title={tabTitles[activeTab]} 
                onInstallClick={handleInstallClick} 
                isInstallable={!!installPrompt}
                onLogout={() => {
                    setIsAuthenticated(false);
                    localStorage.removeItem('isAuthenticated');
                }}
            />

            {/* Indicateur de statut hors ligne */}
            {!isOnline && (
                <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50 font-medium shadow-lg animate-fade-in">
                    📵 Mode Hors Ligne - Données en cache disponibles
                </div>
            )}

            <main className="flex-1 overflow-y-auto pb-24 custom-scrollbar z-10">
                 <div key={activeTab} className="animate-fade-in h-full">
                    {renderContent()}
                </div>
            </main>
            
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <SummaryModal 
                isOpen={isSummaryModalOpen}
                onClose={() => setIsSummaryModalOpen(false)}
                summaryText={summaryText}
            />
        </div>
    );
};