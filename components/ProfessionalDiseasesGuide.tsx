
import React, { useState, useMemo } from 'react';
import { professionalDiseasesData } from '../data/professionalDiseases';
import { DiseaseCategory, ProfessionalDisease } from '../types';

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const DiseaseCard: React.FC<{ disease: ProfessionalDisease }> = ({ disease }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-primary-500">
        <h4 className="font-bold text-md text-primary-800">{disease.tableau} : {disease.name}</h4>
        <div className="mt-3 space-y-3 text-sm">
            <div>
                <p className="font-semibold text-slate-700">Description :</p>
                <p className="text-slate-600">{disease.description}</p>
            </div>
             <div>
                <p className="font-semibold text-slate-700">Délai de prise en charge :</p>
                <p className="text-slate-600">{disease.delay}</p>
            </div>
             <div>
                <p className="font-semibold text-slate-700">Liste indicative des principaux travaux :</p>
                <p className="text-slate-600">{disease.workList}</p>
            </div>
        </div>
    </div>
);


export const ProfessionalDiseasesGuide: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        if (!searchTerm) {
            return professionalDiseasesData;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        
        return professionalDiseasesData.map(category => {
            const filteredDiseases = category.diseases.filter(disease => 
                disease.name.toLowerCase().includes(lowercasedFilter) ||
                disease.tableau.toLowerCase().includes(lowercasedFilter) ||
                disease.description.toLowerCase().includes(lowercasedFilter) ||
                disease.workList.toLowerCase().includes(lowercasedFilter)
            );

            return { ...category, diseases: filteredDiseases };
        }).filter(category => category.diseases.length > 0);

    }, [searchTerm]);


    return (
        <div className="flex flex-col h-full bg-background">
            <div className="p-4 bg-background">
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Rechercher par nom, tableau, travaux..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 p-2 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2 custom-scrollbar">
               {filteredData.length > 0 ? (
                    filteredData.map((category: DiseaseCategory) => (
                        <details key={category.name} className="group" open>
                            <summary className="cursor-pointer p-3 bg-slate-200 rounded-md font-bold text-slate-800 group-open:bg-primary-200 group-open:text-primary-900 transition-colors flex justify-between items-center">
                                {category.name}
                                <svg className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </summary>
                            <div className="p-3">
                                {category.diseases.map((disease: ProfessionalDisease) => (
                                    <DiseaseCard key={disease.tableau} disease={disease} />
                                ))}
                            </div>
                        </details>
                    ))
                ) : (
                    <div className="text-center text-slate-500 mt-10">
                        <p>Aucun résultat trouvé pour "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};