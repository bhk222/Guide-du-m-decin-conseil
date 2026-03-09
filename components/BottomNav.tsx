

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

// Appareillage — chaussure réaliste (sneaker / basket de profil)
const AppareillageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.3">
      {/* Semelle épaisse */}
      <path d="M1 19.5c0-.8.4-1.4 1-1.5h18c.8.1 1.3.7 1.3 1.5s-.5 1.3-1.3 1.5H2c-.6-.1-1-.7-1-1.5z" fill="currentColor" opacity="0.85"/>
      {/* Corps de la chaussure — forme sneaker */}
      <path d="M3.5 18c0 0 .2-3 .8-4.5C5 11.8 6 10.5 7.5 10c1-.3 2-.5 3-.4.8.1 1.5.5 2 1l1.5 1.5c.8.7 2 1.2 3.2 1.3l2.8.2c1 .1 1.5.8 1.5 1.8V18H3.5z" opacity="0.7"/>
      {/* Languette haute à l'arrière */}
      <path d="M4.5 14.5C5 12.5 5.8 11 7 10.2c.8-.5 1.5-.7 2.2-.7V7c0-.8.5-1.5 1.3-1.5s1.3.7 1.3 1.5v3.5l-.3-.2" fill="currentColor" opacity="0.55"/>
      {/* Bout avant renforcé */}
      <path d="M17 14.4c1 .1 2.3.2 3 .4.7.2 1 .7 1 1.4V18h-5.5v-2.5c0-.5.5-1 1.5-1.1z" opacity="0.9"/>
      {/* Lacets */}
      <line x1="9.5" y1="8.5" x2="11" y2="9.8" strokeWidth="0.7" stroke="currentColor" opacity="0.5"/>
      <line x1="9.2" y1="10" x2="11" y2="10.8" strokeWidth="0.7" stroke="currentColor" opacity="0.5"/>
      <line x1="8.5" y1="11.2" x2="10.5" y2="11.8" strokeWidth="0.7" stroke="currentColor" opacity="0.5"/>
      {/* Détail semelle — ligne de séparation */}
      <line x1="2" y1="18.2" x2="21" y2="18.2" strokeWidth="0.6" stroke="currentColor" opacity="0.4"/>
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