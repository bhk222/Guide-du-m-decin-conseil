

import React from 'react';

// Calculateur IPP — calculatrice simple
const CalculatorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <rect x="6" y="4" width="12" height="5" rx="1" />
      <circle cx="8" cy="13" r="0.8" fill="currentColor" />
      <circle cx="12" cy="13" r="0.8" fill="currentColor" />
      <circle cx="16" cy="13" r="0.8" fill="currentColor" />
      <circle cx="8" cy="17" r="0.8" fill="currentColor" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" />
      <rect x="14.5" y="15.5" width="3" height="3" rx="0.5" />
    </svg>
);

// Juridique — balance de la justice
const GuideIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="19" />
      <path d="M5 7l7-4 7 4" />
      <path d="M5 7l-2 8h4z" />
      <circle cx="5" cy="15" r="2" />
      <path d="M19 7l-2 8h4z" />
      <circle cx="19" cy="15" r="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="19" x2="12" y2="21" />
    </svg>
);

// Maladies professionnelles — dossier médical avec croix
const DiseasesIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="12" x2="12" y2="18" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
);

// Outils — boîte à outils médicale
const ToolsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="20" height="12" rx="2" />
      <path d="M16 9V6a4 4 0 00-8 0v3" />
      <line x1="12" y1="13" x2="12" y2="17" />
      <line x1="10" y1="15" x2="14" y2="15" />
    </svg>
);

// Appareillage — chaussure orthopédique
const AppareillageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18v2H3z" />
      <path d="M4 18v-4c0-1 .5-2 2-2.5l3-1V8a2 2 0 014 0v1l5 2c1.5.5 2 1.5 2 3v4" />
      <path d="M9 10.5l4 1.5" />
      <line x1="7" y1="20" x2="7" y2="18" />
      <line x1="17" y1="20" x2="17" y2="18" />
    </svg>
);


interface NavButtonProps {
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center h-12 px-4 rounded-full transition-all duration-300 ease-in-out gap-2 ${
        isActive ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-primary-600'
      }`}
      aria-label={label}
    >
      {icon}
      <span
        className={`text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
          isActive ? 'max-w-20 ml-1' : 'max-w-0'
        }`}
      >
        {isActive ? label : ''}
      </span>
    </button>
  );
};

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'calculator', label: 'Calcul', icon: <CalculatorIcon /> },
    { id: 'legislative', label: 'Juridique', icon: <GuideIcon /> },
    { id: 'diseases', label: 'Maladies', icon: <DiseasesIcon /> },
    { id: 'appareillage', label: 'Appareillage', icon: <AppareillageIcon /> },
    { id: 'tools', label: 'Outils', icon: <ToolsIcon /> },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-lg rounded-full shadow-xl p-1.5 border border-white/30">
            {tabs.map((tab) => (
                <NavButton 
                    key={tab.id}
                    label={tab.label}
                    icon={tab.icon}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                />
            ))}
        </div>
    </nav>
  );
};