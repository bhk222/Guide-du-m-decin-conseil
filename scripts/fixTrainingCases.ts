/**
 * Script de correction automatique des cas tests
 * Aligne les expectedInjury et expectedRate avec les noms exacts de disabilityRates.ts
 */

import { disabilityData } from '../data/disabilityRates';
import type { Injury } from '../types';

// Fonction pour normaliser le texte
const normalize = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[-']/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
};

// Extraire toutes les lésions de la base
const allInjuries: Array<{ name: string; rate: number | [number, number]; path: string }> = [];

disabilityData.forEach(category => {
    category.subcategories.forEach(subcategory => {
        subcategory.injuries.forEach(injury => {
            allInjuries.push({
                name: injury.name,
                rate: injury.rate,
                path: `${category.name} > ${subcategory.name}`
            });
        });
    });
});

// Fonction pour trouver la meilleure correspondance
const findBestMatch = (userInput: string, expectedInjury: string): { name: string; rate: number | [number, number] } | null => {
    const normalizedInput = normalize(userInput);
    const normalizedExpected = normalize(expectedInjury);
    
    // 1. Chercher d'abord par correspondance exacte avec expectedInjury
    let exactMatch = allInjuries.find(inj => normalize(inj.name) === normalizedExpected);
    if (exactMatch) {
        return { name: exactMatch.name, rate: exactMatch.rate };
    }
    
    // 2. Chercher par correspondance partielle (60% mots communs)
    const expectedWords = normalizedExpected.split(' ').filter(w => w.length > 2);
    let bestMatch: typeof allInjuries[0] | null = null;
    let bestScore = 0;
    
    allInjuries.forEach(inj => {
        const injWords = normalize(inj.name).split(' ').filter(w => w.length > 2);
        const commonWords = expectedWords.filter(ew => injWords.some(iw => iw.includes(ew) || ew.includes(iw)));
        const score = commonWords.length / expectedWords.length;
        
        if (score > bestScore && score >= 0.6) {
            bestScore = score;
            bestMatch = inj;
        }
    });
    
    if (bestMatch) {
        return { name: bestMatch.name, rate: bestMatch.rate };
    }
    
    // 3. Chercher par userInput
    const inputWords = normalizedInput.split(' ').filter(w => w.length > 2);
    bestScore = 0;
    bestMatch = null;
    
    allInjuries.forEach(inj => {
        const injWords = normalize(inj.name).split(' ').filter(w => w.length > 2);
        const commonWords = inputWords.filter(ew => injWords.some(iw => iw.includes(ew) || ew.includes(iw)));
        const score = commonWords.length / Math.max(inputWords.length, 1);
        
        if (score > bestScore && score >= 0.5) {
            bestScore = score;
            bestMatch = inj;
        }
    });
    
    return bestMatch ? { name: bestMatch.name, rate: bestMatch.rate } : null;
};

console.log('🔍 Analyse des lésions disponibles...');
console.log(`📊 Total lésions dans base: ${allInjuries.length}`);
console.log('\n✅ Script prêt ! Utilisez findBestMatch(userInput, expectedInjury) pour trouver les correspondances.');
console.log('\nExemple:');
console.log('const match = findBestMatch("splénectomie totale", "Splénectomie totale (ablation de la rate)");');
console.log('if (match) console.log(`Trouvé: ${match.name} @ ${match.rate}`);');

export { findBestMatch, allInjuries };
