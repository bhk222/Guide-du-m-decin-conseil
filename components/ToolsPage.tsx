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

const InsulinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-9l-3 3 3 3m6-6l3 3-3 3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 8.5h8M8 15.5h8M4 5h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.05 2.39L6.5 4h11l-.55-1.61a2 2 0 00-1.9-1.39H8.94a2 2 0 00-1.89 1.39z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.05 21.61L6.5 20h11l-.55 1.61a2 2 0 01-1.9 1.39H8.94a2 2 0 01-1.89-1.39z" />
    </svg>
);

const HearingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.5V7a5 5 0 00-10 0v1.5M10.5 12H12m-4.5 3.5A6.5 6.5 0 0012 22a6.5 6.5 0 004.5-6.5" />
    </svg>
);

const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h3m-3 3h3m-3 3h3m-3 3h3M4.5 21v-15a1.5 1.5 0 011.5-1.5h12a1.5 1.5 0 011.5 1.5v15M7.5 21a2 2 0 01-2-2v-2.5a2 2 0 012-2h9a2 2 0 012 2V19a2 2 0 01-2 2h-9z" />
    </svg>
);

const KidneyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.984 2.52a9.993 9.993 0 00-11.41 10.45 9.993 9.993 0 0010.45 11.41 9.993 9.993 0 0011.41-10.45 9.993 9.993 0 00-10.45-11.41z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 15a4 4 0 100-8 4 4 0 000 8z"/>
    </svg>
);

const AldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const PillIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.22 1.01l-7.21 7.21c-1.34 1.34-1.34 3.52 0 4.86l7.21 7.21c1.34 1.34 3.52 1.34 4.86 0l7.21-7.21c1.34-1.34-1.34 3.52 0-4.86l-7.21-7.21a3.44 3.44 0 00-4.86 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.01 11.96l8.95 8.95" />
    </svg>
);

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
    </svg>
);

const tools = [
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