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
            // Construire le code officiel de la nomenclature algérienne: lettreCle + coef
            const codeOfficiel = acte.coef2 
                ? `${acte.lettreCle}${acte.coef}+${acte.coef2}` 
                : `${acte.lettreCle} ${acte.coef}`;
            
            actes.push({
                code: codeOfficiel, // Utiliser le code officiel (ex: "K 15", "B 30")
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

// Dictionnaire de synonymes médicaux courants
const synonymesMedicaux: Record<string, string[]> = {
    'fns': ['formule', 'numération', 'sanguine', 'hémogramme', 'nfs'],
    'nfs': ['formule', 'numération', 'sanguine', 'hémogramme', 'fns'],
    'hémogramme': ['formule', 'numération', 'sanguine', 'fns', 'nfs'],
    'hemogramme': ['formule', 'numération', 'sanguine', 'fns', 'nfs'],
    'prise de sang': ['prélèvement', 'ponction', 'veineuse', 'sang'],
    'radio': ['radiographie', 'radiologie', 'rx'],
    'radiographie': ['radio', 'radiologie', 'rx'],
    'echographie': ['écho', 'échographie', 'ultrason'],
    'echo': ['échographie', 'ultrason'],
    'consultation': ['visite', 'examen', 'voir', 'docteur', 'médecin'],
    'injection': ['piqûre', 'piqure', 'perfusion'],
    'perfusion': ['injection', 'intraveineuse', 'iv'],
    'ecg': ['électrocardiogramme', 'électrocardiographie', 'ekg'],
    'électrocardiogramme': ['ecg', 'ekg'],
    'eeg': ['électroencéphalogramme', 'électroencéphalographie'],
    'emg': ['électromyogramme', 'électromyographie'],
    'glycémie': ['glucose', 'sucre', 'sang'],
    'urée': ['azote', 'sang'],
    'créatinine': ['creatinine', 'rein', 'renal'],
    'iono': ['ionogramme', 'électrolytes', 'sodium', 'potassium'],
    'ionogramme': ['iono', 'électrolytes', 'sodium', 'potassium'],
    'bilan': ['analyse', 'examen', 'test'],
    'pansement': ['soins', 'plaie', 'cicatrisation'],
    'suture': ['points', 'plaie', 'recoudre']
};

/**
 * Recherche sémantique d'un acte NGAP
 */
export function rechercherActe(query: string): ActeNGAP[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    // Obtenir les synonymes médicaux pour la requête
    const synonymesRequete = synonymesMedicaux[q] || [];
    const termes = [q, ...synonymesRequete];
    
    const resultats: Array<{ acte: ActeNGAP; score: number }> = [];
    
    actesNGAP.forEach(acte => {
        let score = 0;
        
        // Correspondance exacte du code
        if (acte.code.toLowerCase() === q) {
            score += 1000;
        }
        
        // Recherche dans chaque terme (requête + synonymes médicaux)
        termes.forEach(terme => {
            // Correspondance dans le libellé
            const libelleLower = acte.libelle.toLowerCase();
            if (libelleLower.includes(terme)) {
                // Bonus si le terme est au début
                if (libelleLower.startsWith(terme)) {
                    score += 600;
                } else {
                    score += 400;
                }
            }
            
            // Correspondance dans les synonymes de l'acte
            if (acte.synonymes) {
                acte.synonymes.forEach(syn => {
                    const synLower = syn.toLowerCase();
                    if (synLower.includes(terme) || terme.includes(synLower)) {
                        score += 250;
                    }
                });
            }
            
            // Correspondance dans la catégorie
            if (acte.categorie && acte.categorie.toLowerCase().includes(terme)) {
                score += 150;
            }
        });
        
        // Correspondance partielle du code
        if (score === 0 && acte.code.toLowerCase().includes(q)) {
            score += 100;
        }
        
        if (score > 0) {
            resultats.push({ acte, score });
        }
    });
    
    resultats.sort((a, b) => b.score - a.score);
    return resultats.slice(0, 20).map(r => r.acte);
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
