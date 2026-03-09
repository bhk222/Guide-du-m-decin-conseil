import React, { useState } from 'react';
import { Card } from './ui/Card';
import { ToolModal } from './tools/ToolModal';
import { InsulinCalculator } from './tools/InsulinCalculator';
import { HearingDeficitCalculator } from './tools/HearingDeficitCalculator';
import { NorditropineCalculator } from './tools/NorditropineCalculator';
import { GfrCalculator } from './tools/GfrCalculator';
import { AldList } from './tools/AldList';
import { DrugDictionary } from './tools/DrugDictionary';
import { ReverseIppSearch } from './tools/ReverseIppSearch';
import { NomenclatureGenerale } from './tools/NomenclatureGenerale';
import { NGAPCalculateur } from './tools/NGAPCalculateur';

// --- Modern gradient icon wrapper ---
const IconBubble: React.FC<{ from: string; to: string; children: React.ReactNode }> = ({ from, to, children }) => (
  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
    {children}
  </div>
);

// --- SVG icons (white, 24x24) ---
const InsulinIcon = () => (
  <IconBubble from="#3B82F6" to="#1D4ED8">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Insulin vial */}
      <rect x="3" y="6" width="8" height="14" rx="2" />
      <path d="M5 6V4.5A1.5 1.5 0 016.5 3h1A1.5 1.5 0 019 4.5V6" />
      <line x1="3" y1="10" x2="11" y2="10" />
      <line x1="5" y1="13" x2="9" y2="13" opacity="0.6" />
      <line x1="5" y1="16" x2="9" y2="16" opacity="0.6" />
      {/* Syringe */}
      <path d="M15 20l4-4" />
      <rect x="16.5" y="8.5" width="3" height="9" rx="0.5" transform="rotate(-45 18 13)" />
      <path d="M21.5 5.5l-3 3" />
      <line x1="22" y1="5" x2="21" y2="4" />
      <line x1="14" y1="14" x2="13" y2="15" />
    </svg>
  </IconBubble>
);

const HearingIcon = () => (
  <IconBubble from="#8B5CF6" to="#6D28D9">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5c0-3.6 2.7-6.5 6-6.5s6 2.9 6 6.5c0 4.5-3 7-4 10-.5 1.5-1 2.5-2 3.5"/>
      <path d="M6 8.5C6 11 7.5 13 9 15"/>
      <path d="M20 5c.6.8 1 1.8 1 3"/>
      <path d="M19.5 10.5c.3.5.5 1 .5 1.5"/>
    </svg>
  </IconBubble>
);

const GrowthIcon = () => (
  <IconBubble from="#10B981" to="#047857">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Height ruler */}
      <path d="M4 3v18" />
      <line x1="4" y1="5" x2="7" y2="5" />
      <line x1="4" y1="8" x2="6" y2="8" />
      <line x1="4" y1="11" x2="7" y2="11" />
      <line x1="4" y1="14" x2="6" y2="14" />
      <line x1="4" y1="17" x2="7" y2="17" />
      {/* Child figure */}
      <circle cx="15" cy="7" r="2.5" />
      <path d="M15 9.5v5" />
      <path d="M12 12.5l3 1 3-1" />
      <path d="M13 19l2-4.5 2 4.5" />
      {/* Growth arrow */}
      <path d="M19 14V5" />
      <path d="M17 7l2-2 2 2" />
    </svg>
  </IconBubble>
);

const KidneyIcon = () => (
  <IconBubble from="#EF4444" to="#B91C1C">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 2C6 2 3.5 4.5 3.5 8c0 2 .8 3.5 1.5 5 .7 1.5 1 2.8 1 4.5C6 20 8 22 10.5 22c1.5 0 2.5-.8 2.5-2 0-1.5-1-2.5-1-4 0-2 1.5-3 1.5-5.5C13.5 7 12 2 8.5 2z"/>
      <path d="M15.5 2C18 2 20.5 4.5 20.5 8c0 2-.8 3.5-1.5 5-.7 1.5-1 2.8-1 4.5C18 20 16 22 13.5 22c-1.5 0-2.5-.8-2.5-2 0-1.5 1-2.5 1-4 0-2-1.5-3-1.5-5.5C10.5 7 12 2 15.5 2z"/>
    </svg>
  </IconBubble>
);

const AldIcon = () => (
  <IconBubble from="#F59E0B" to="#D97706">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
      <rect x="9" y="2" width="6" height="4" rx="1"/>
      <path d="M9 12l2 2 4-4"/>
      <path d="M9 17h6"/>
    </svg>
  </IconBubble>
);

const PillIcon = () => (
  <IconBubble from="#EC4899" to="#BE185D">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 1.5l-8 8a4.95 4.95 0 007 7l8-8a4.95 4.95 0 00-7-7z"/>
      <line x1="6.5" y1="12.5" x2="11.5" y2="7.5"/>
      <path d="M18 14v8"/>
      <path d="M14 18h8"/>
    </svg>
  </IconBubble>
);

const TargetIcon = () => (
  <IconBubble from="#06B6D4" to="#0E7490">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
    </svg>
  </IconBubble>
);

const NGAPIcon = () => (
  <IconBubble from="#6366F1" to="#4338CA">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      <circle cx="11" cy="11" r="3"/>
      <path d="M13.5 13.5L16 16"/>
    </svg>
  </IconBubble>
);

const tools = [
    {
        id: "ngap",
        title: "Nomenclature Générale",
        description: "Recherche sémantique d'actes médicaux pour trouver les codes NGAP. Ex: FNS → B30, consultation → C, injection → K2.",
        icon: <NGAPIcon />,
        component: <NGAPCalculateur />
    },
    {
        id: "insulin",
        title: "Calculateur d'Insuline",
        description: "Estimez les doses d'insuline (tous types), le nombre de boîtes pour 3 mois, et les bandelettes réactives selon le poids.",
        icon: <InsulinIcon />,
        component: <InsulinCalculator />
    },
    {
        id: "hearing",
        title: "Calculateur de Déficit Auditif",
        description: "Calculez le déficit auditif à partir des résultats de l'audiogramme et obtenez une interprétation claire.",
        icon: <HearingIcon />,
        component: <HearingDeficitCalculator />
    },
    {
        id: "growth",
        title: "Calculateur de Norditropine",
        description: "Calculez la dose de Norditropine et le nombre de boîtes nécessaires pour une cure de 3 mois.",
        icon: <GrowthIcon />,
        component: <NorditropineCalculator />
    },
     {
        id: "gfr",
        title: "Calculateur de DFG",
        description: "Estimez le Débit de Filtration Glomérulaire (CKD-EPI) à partir de la créatinine, l'âge et le sexe.",
        icon: <KidneyIcon />,
        component: <GfrCalculator />
    },
    {
        id: "ald",
        title: "Liste des ALD",
        description: "Consultez la liste des Affections de Longue Durée (ALD) reconnues, ouvrant droit à une prise en charge spécifique.",
        icon: <AldIcon />,
        component: <AldList />
    },
    {
        id: "drugs",
        title: "Dictionnaire des Médicaments",
        description: "Consultez une base de données locale de médicaments courants, avec leurs DCI et dosages.",
        icon: <PillIcon />,
        component: <DrugDictionary />
    },
    {
        id: "reverse-ipp",
        title: "Recherche Inversée d'IPP",
        description: "Entrez un taux d'IPP cible et trouvez toutes les lésions uniques correspondantes dans le barème.",
        icon: <TargetIcon />,
        component: <ReverseIppSearch />
    }
];

export const ToolsPage: React.FC = () => {
    const [activeTool, setActiveTool] = useState<(typeof tools)[0] | null>(null);
    const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

    const handleToolClick = (tool: (typeof tools)[0]) => {
        setSelectedToolId(tool.id);
        // Add a slight delay to allow the animation to play before opening the modal
        setTimeout(() => {
            setActiveTool(tool);
            setSelectedToolId(null); // Reset after opening
        }, 150);
    };

    return (
        <div className="p-2 sm:p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {tools.map(tool => (
                    <Card 
                        key={tool.id} 
                        className={`flex flex-col items-center text-center p-6 transition-transform duration-300 transform hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer group ${selectedToolId === tool.id ? 'scale-95 opacity-75' : 'active:scale-95 active:opacity-75'}`}
                        onClick={() => handleToolClick(tool)}
                    >
                        <div className="mb-4">{tool.icon}</div>
                        <h3 className="text-lg font-bold mt-2 text-slate-800">{tool.title}</h3>
                        <p className="text-slate-500 text-xs mt-2 flex-grow">{tool.description}</p>
                        <span className="mt-4 text-xs bg-primary-600/10 text-primary-700 font-semibold px-3 py-1 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
                            Lancer l'outil
                        </span>
                    </Card>
                ))}
            </div>
             {activeTool && (
                <ToolModal title={activeTool.title} isOpen={!!activeTool} onClose={() => setActiveTool(null)}>
                    {activeTool.component}
                </ToolModal>
            )}
        </div>
    );
};