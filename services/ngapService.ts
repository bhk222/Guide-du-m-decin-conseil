// Service pour la Nomenclature Générale des Actes Professionnels (NGAP)
import ngapData from '../data/ngap-complete.json';

export interface ActeNGAP {
    code: string;
    lettreCle: string;
    coefficient: number;
    libelle: string;
    tarif: number;
    categorie?: string;
    synonymes?: string[];
}

export interface ActeCalcule {
    acte: ActeNGAP;
    quantite: number;
    tarifBrut: number;
    tarifNet: number;
    taux: number;
}

export interface ResultatCalcul {
    actes: ActeCalcule[];
    totalBrut: number;
    totalNet: number;
    regles: string[];
}

// Charger et transformer les données du JSON
function chargerActesNGAP(): ActeNGAP[] {
    const actes: ActeNGAP[] = [];
    
    Object.entries(ngapData.categories).forEach(([categorieName, actesCategorie]) => {
        (actesCategorie as any[]).forEach(acte => {
            actes.push({
                code: acte.code,
                lettreCle: acte.lettreCle,
                coefficient: acte.coef,
                libelle: acte.libelle,
                tarif: acte.tarif * 100, // Convertir en centimes
                categorie: categorieName.charAt(0).toUpperCase() + categorieName.slice(1).replace(/_/g, ' '),
                synonymes: acte.synonymes || []
            });
        });
    });
    
    return actes;
}

// Base de données des actes NGAP courants
export const actesNGAP: ActeNGAP[] = chargerActesNGAP();

/**
 * Recherche sémantique d'un acte NGAP
 */
export function rechercherActe(query: string): ActeNGAP[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    const resultats: Array<{ acte: ActeNGAP; score: number }> = [];
    
    actesNGAP.forEach(acte => {
        let score = 0;
        
        if (acte.code.toLowerCase() === q) score += 1000;
        if (acte.libelle.toLowerCase().includes(q)) score += 500;
        
        if (acte.synonymes) {
            acte.synonymes.forEach(syn => {
                if (syn.toLowerCase().includes(q) || q.includes(syn.toLowerCase())) {
                    score += 300;
                }
            });
        }
        
        if (score > 0) {
            resultats.push({ acte, score });
        }
    });
    
    resultats.sort((a, b) => b.score - a.score);
    return resultats.slice(0, 10).map(r => r.acte);
}

export function trouverActeParCode(code: string): ActeNGAP | null {
    const c = code.toUpperCase().replace(/\s/g, '');
    return actesNGAP.find(a => a.code.replace(/\s/g, '') === c) || null;
}

export function calculerActes(codes: string[]): ResultatCalcul {
    const actes: ActeCalcule[] = [];
    const regles: string[] = [];
    
    if (codes.length === 0) {
        return { actes, totalBrut: 0, totalNet: 0, regles: [] };
    }
    
    const actesResolus: Array<{ acte: ActeNGAP; quantite: number }> = [];
    
    codes.forEach(code => {
        const acte = trouverActeParCode(code);
        if (acte) {
            const existing = actesResolus.find(a => a.acte.code === acte.code);
            if (existing) {
                existing.quantite++;
            } else {
                actesResolus.push({ acte, quantite: 1 });
            }
        }
    });
    
    actesResolus.forEach(item => {
        actes.push({
            acte: item.acte,
            quantite: item.quantite,
            tarifBrut: 0,
            tarifNet: 0,
            taux: 100
        });
    });
    
    return {
        actes,
        totalBrut: 0,
        totalNet: 0,
        regles: ["Codes trouvés"]
    };
}

export function parserExpression(expression: string): string[] {
    return expression
        .split(/[\+\s]+/)
        .map(c => c.trim().toUpperCase())
        .filter(c => c.length > 0);
}

export function calculerDepuisExpression(expression: string): ResultatCalcul {
    const codes = parserExpression(expression);
    return calculerActes(codes);
}

export function obtenirActesParCategorie(categorie: string): ActeNGAP[] {
    return actesNGAP.filter(a => a.categorie?.toLowerCase() === categorie.toLowerCase());
}

export function obtenirCategories(): string[] {
    const categories = new Set<string>();
    actesNGAP.forEach(a => {
        if (a.categorie) categories.add(a.categorie);
    });
    return Array.from(categories).sort();
}
