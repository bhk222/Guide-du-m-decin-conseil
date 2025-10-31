import React from 'react';

interface HeaderProps {
    onInstallClick: () => void;
    isInstallable: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onInstallClick, isInstallable }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm text-slate-800 p-4 border-b border-slate-200/80 w-full sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11 17.25l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 12l.648 1.938a3.375 3.375 0 002.672 2.672L21.5 17.25l-1.938.648a3.375 3.375 0 00-2.672 2.672z" />
                </svg>
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-800">IPP Assistant</h1>
                <p className="text-xs text-slate-500">Calculateur & Guide AT/MP</p>
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