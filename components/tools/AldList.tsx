import React, { useState, useMemo, useCallback } from 'react';
import { aldData } from '../../data/aldList';
import type { AldItem } from '../../data/aldList';

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-accent-200/80 text-accent-900 px-0.5 rounded-sm">{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

interface AldListItemProps {
    item: AldItem;
    level: number;
    searchTerm: string;
    forceOpen: boolean;
    isLast: boolean;
}

const AldListItem: React.FC<AldListItemProps> = ({ item, level, searchTerm, forceOpen, isLast }) => {
    const hasChildren = item.children && item.children.length > 0;
    const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
    const [showTooltip, setShowTooltip] = useState(false);
    
    const showChildren = (forceOpen || isExpanded) && hasChildren;

    const handleToggle = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div className="relative">
             {/* Tree lines */}
            <div className="absolute left-[-18px] top-0 h-full">
                { level > 0 && <span className={`absolute top-0 w-px h-full bg-slate-200 ${isLast ? 'h-[18px]' : ''}`} />}
                { level > 0 && <span className="absolute top-[17px] h-px w-4 bg-slate-200" />}
            </div>

            <div className="relative">
                <div 
                    className={`flex items-center gap-1 rounded-md transition-colors ${hasChildren ? 'cursor-pointer hover:bg-slate-200/60' : item.tooltip ? 'cursor-help hover:bg-blue-50' : ''}`}
                    onClick={handleToggle}
                    onMouseEnter={() => item.tooltip && setShowTooltip(true)}
                    onMouseLeave={() => item.tooltip && setShowTooltip(false)}
                >
                    {hasChildren && (
                        <svg className={`h-4 w-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${showChildren ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                    {!hasChildren && <div className="w-4 flex-shrink-0"></div>}
                     <p className={`py-1.5 flex-grow ${level === 0 ? 'text-primary-800 text-md font-bold' : 'text-slate-800 text-sm'} ${item.tooltip ? 'flex items-center gap-1' : ''}`}>
                        <span className="font-semibold text-slate-500 mr-2">{item.code}</span>
                        <Highlight text={item.name} highlight={searchTerm} />
                        {item.tooltip && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 inline-block ml-1 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        )}
                    </p>
                </div>

                {/* Tooltip/Vignette */}
                {item.tooltip && showTooltip && (
                    <div 
                        className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] w-[700px] max-h-[85vh] overflow-y-auto bg-white border-2 border-primary-500 rounded-lg shadow-2xl p-6"
                        style={{ maxWidth: 'calc(100vw - 40px)' }}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        {/* Bouton fermer */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div 
                            dangerouslySetInnerHTML={{ __html: item.tooltip }}
                            className="prose prose-sm max-w-none text-slate-800"
                        />
                    </div>
                )}

                {/* Overlay sombre */}
                {item.tooltip && showTooltip && (
                    <div 
                        className="fixed inset-0 bg-black/40 z-[9998]"
                        onClick={() => setShowTooltip(false)}
                    />
                )}
            </div>
            
            {showChildren && (
                <div className="mt-1 pl-5">
                    {item.children!.map((child, index) => (
                        <AldListItem 
                            key={child.code} 
                            item={child} 
                            level={level + 1} 
                            searchTerm={searchTerm} 
                            forceOpen={forceOpen}
                            isLast={index === item.children!.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const getAllMatchingCodes = (items: AldItem[], term: string): Set<string> => {
    const lowercasedTerm = term.toLowerCase();
    const openCodes = new Set<string>();

    function search(item: AldItem, parents: string[]): boolean {
        const isMatch = item.name.toLowerCase().includes(lowercasedTerm) || item.code.toLowerCase().includes(lowercasedTerm);
        const childrenMatch = item.children?.some(child => search(child, [...parents, item.code]));

        if (isMatch || childrenMatch) {
            parents.forEach(p => openCodes.add(p));
            return true;
        }
        return false;
    }

    items.forEach(item => search(item, []));
    return openCodes;
};


export const AldList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        const term = searchTerm.trim();
        if (!term) return aldData;
        const lowercasedTerm = term.toLowerCase();

        function filter(items: AldItem[]): AldItem[] {
            return items.reduce((acc, item) => {
                const children = item.children ? filter(item.children) : [];
                const isMatch = item.name.toLowerCase().includes(lowercasedTerm) || item.code.toLowerCase().includes(lowercasedTerm);
                if (isMatch || children.length > 0) {
                    acc.push({ ...item, children });
                }
                return acc;
            }, [] as AldItem[]);
        }
        return filter(aldData);
    }, [searchTerm]);

    const forceOpenCodes = useMemo(() => {
        const term = searchTerm.trim();
        return term ? getAllMatchingCodes(aldData, term) : new Set<string>();
    }, [searchTerm]);

    return (
        <div className="p-4 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-600 mb-4 text-sm">
                Consultez la liste des Affections de Longue Durée (ALD). Cliquez sur une catégorie pour la déplier ou la replier.
            </p>
            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                </span>
                <input
                    type="text"
                    placeholder="Rechercher par nom ou code (ex: C03, cancer, diabète...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 p-2 bg-white text-black placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                {filteredData.length > 0 ? (
                     <div className="space-y-3">
                        {filteredData.map((item, index) => (
                           <AldListItem 
                                key={item.code} 
                                item={item} 
                                level={0} 
                                searchTerm={searchTerm.trim()} 
                                forceOpen={searchTerm.trim().length > 0} 
                                isLast={index === filteredData.length - 1}
                            />
                        ))}
                    </div>
                ) : (
                     <div className="text-center text-slate-500 mt-10">
                        <p>Aucun résultat trouvé pour "{searchTerm}".</p>
                    </div>
                )}
            </div>
        </div>
    );
};