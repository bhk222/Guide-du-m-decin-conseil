import React from 'react';
import { CnasLogo } from './ui/CnasLogo';

interface TopAppBarProps {
    title: string;
    onInstallClick: () => void;
    isInstallable: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, onInstallClick, isInstallable }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm text-slate-800 p-4 border-b border-slate-200/80 w-full sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
            <CnasLogo className="h-12 w-12" />
            <div>
                <h1 className="text-xl font-bold text-slate-800">{title}</h1>
                <p className="text-xs text-slate-500">Guide du Médecin Conseil</p>
            </div>
        </div>
        {isInstallable && (
            <button 
                onClick={onInstallClick} 
                className="bg-primary-600 text-white font-semibold py-2 px-3 rounded-xl hover:bg-primary-700 transition-all duration-200 flex items-center gap-2 text-sm hover:-translate-y-0.5 hover:shadow-lg"
                title="Installer l'application"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="hidden sm:inline">Installer</span>
            </button>
        )}
      </div>
    </header>
  );
};