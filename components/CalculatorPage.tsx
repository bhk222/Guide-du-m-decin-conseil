import React, { useState } from 'react';
import { GuidedCalculator } from './GuidedCalculator';
import { CalculationResult } from './CalculationResult';
import { ExclusiveAiCalculator } from './ExclusiveAiCalculator';
import { AnalogCalculator } from './AnalogCalculator';
import { Card } from './ui/Card';
import { SelectedInjury } from '../types';

type Method = 'guided' | 'exclusive' | 'manual';

interface CalculatorPageProps {
    selectedInjuries: SelectedInjury[];
    totalRate: number;
    onAddInjury: (injury: SelectedInjury) => void;
    onRemoveInjury: (id: string) => void;
    preexistingRate: number;
    setPreexistingRate: (value: number) => void;
    socialRate: number;
    setSocialRate: (value: number) => void;
    aiNotes: string[];
    onGenerateSummary: () => void;
    victimInfo: { age: string; profession: string; sector: string; gender: string; company?: string; };
    onVictimInfoChange: (info: { age: string; profession: string; sector: string; gender: string; company?: string; }) => void;
    accidentType: string;
    onAccidentTypeChange: (type: string) => void;
}

const MethodButton: React.FC<{
    label: string;
    value: Method;
    current: Method;
    onClick: (value: Method) => void;
}> = ({ label, value, current, onClick }) => (
    <button
        onClick={() => onClick(value)}
        className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-colors ${
            current === value ? 'bg-white text-primary-700 shadow' : 'text-slate-600 hover:bg-slate-300/50'
        }`}
    >
        {label}
    </button>
);


export const CalculatorPage: React.FC<CalculatorPageProps> = (props) => {
    const [activeMethod, setActiveMethod] = useState<Method>('manual');

    const renderActiveMethod = () => {
        const calculationResultPanel = (
            <CalculationResult 
                selectedInjuries={props.selectedInjuries} 
                totalRate={props.totalRate} 
                onRemoveInjury={props.onRemoveInjury}
                preexistingRate={props.preexistingRate}
                setPreexistingRate={props.setPreexistingRate}
                socialRate={props.socialRate}
                setSocialRate={props.setSocialRate}
                aiNotes={props.aiNotes}
                onGenerateSummary={props.onGenerateSummary}
            />
        );

        switch (activeMethod) {
            case 'guided':
                 return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <GuidedCalculator 
                            onAddInjury={props.onAddInjury}
                            onRemoveInjury={props.onRemoveInjury}
                            victimInfo={props.victimInfo}
                            onVictimInfoChange={props.onVictimInfoChange}
                            accidentType={props.accidentType}
                            onAccidentTypeChange={props.onAccidentTypeChange}
                        />
                        {calculationResultPanel}
                    </div>
                );
            case 'exclusive':
                 return (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ExclusiveAiCalculator 
                            onAddInjury={props.onAddInjury} 
                            victimInfo={props.victimInfo}
                            selectedInjuries={props.selectedInjuries}
                            totalRate={props.totalRate}
                            hasPreexisting={props.preexistingRate > 0}
                        />
                        {calculationResultPanel}
                    </div>
                );
            case 'manual':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <AnalogCalculator onAddInjury={props.onAddInjury} />
                        {calculationResultPanel}
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="p-2 sm:p-4 space-y-4">
            <Card className="!p-1">
                 <div className="flex-shrink-0 p-1 bg-slate-200 rounded-lg flex gap-1">
                    <MethodButton label="Recherche Analogique" value="manual" current={activeMethod} onClick={setActiveMethod} />
                    <MethodButton label="Guide IA" value="guided" current={activeMethod} onClick={setActiveMethod} />
                    <MethodButton label="IA Exclusive" value="exclusive" current={activeMethod} onClick={setActiveMethod} />
                </div>
            </Card>

            <Card className="!p-3 !bg-amber-500/10 border-amber-500/20 text-amber-900">
                <p className="text-xs font-medium">
                    Cet outil fournit une estimation à titre informatif et ne remplace pas une expertise médicale légale. Le calcul final peut varier.
                </p>
            </Card>
            
            <div className="animate-fade-in">
                 {renderActiveMethod()}
            </div>
        </div>
    );
};
