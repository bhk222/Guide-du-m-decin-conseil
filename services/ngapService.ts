// Service pour la Nomenclature Générale des Actes Professionnels (NGAP)
// Version simplifiée - recherche de codes uniquement

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

// Base de données des actes NGAP courants
export const actesNGAP: ActeNGAP[] = [
    // CONSULTATIONS
    {
        code: "C",
        lettreCle: "C",
        coefficient: 1,
        libelle: "Consultation au cabinet - Médecin généraliste",
        tarif: 2500,
        categorie: "Consultation",
        synonymes: ["consultation", "consult", "cs", "generaliste", "medecin", "voir medecin", "rdv"]
    },
    {
        code: "CS",
        lettreCle: "CS",
        coefficient: 1,
        libelle: "Consultation au cabinet - Médecin spécialiste",
        tarif: 3000,
        categorie: "Consultation",
        synonymes: ["consultation specialiste", "specialiste", "expert"]
    },
    {
        code: "V",
        lettreCle: "V",
        coefficient: 1,
        libelle: "Visite à domicile - Médecin généraliste",
        tarif: 3000,
        categorie: "Visite",
        synonymes: ["visite", "domicile", "a domicile", "chez moi", "venir maison"]
    },
    {
        code: "VS",
        lettreCle: "VS",
        coefficient: 1,
        libelle: "Visite à domicile - Médecin spécialiste",
        tarif: 3500,
        categorie: "Visite",
        synonymes: ["visite specialiste", "domicile specialiste"]
    },
    
    // CHIRURGIE
    {
        code: "K2",
        lettreCle: "K",
        coefficient: 2,
        libelle: "Acte de chirurgie - Coefficient 2 (injection intraveineuse)",
        tarif: 800,
        categorie: "Chirurgie",
        synonymes: ["injection", "piqure", "iv", "intraveineuse", "perfusion"]
    },
    {
        code: "K5",
        lettreCle: "K",
        coefficient: 5,
        libelle: "Acte de chirurgie - Coefficient 5",
        tarif: 800,
        categorie: "Chirurgie",
        synonymes: ["chirurgie", "operation"]
    },
    {
        code: "K10",
        lettreCle: "K",
        coefficient: 10,
        libelle: "Acte de chirurgie - Coefficient 10",
        tarif: 800,
        categorie: "Chirurgie",
        synonymes: ["chirurgie", "operation"]
    },
    {
        code: "K20",
        lettreCle: "K",
        coefficient: 20,
        libelle: "Acte de chirurgie - Coefficient 20",
        tarif: 800,
        categorie: "Chirurgie",
        synonymes: ["chirurgie", "operation"]
    },
    {
        code: "K50",
        lettreCle: "K",
        coefficient: 50,
        libelle: "Acte de chirurgie - Coefficient 50",
        tarif: 800,
        categorie: "Chirurgie",
        synonymes: ["chirurgie", "grosse operation"]
    },
    
    // BIOLOGIE
    {
        code: "B10",
        lettreCle: "B",
        coefficient: 10,
        libelle: "Acte de biologie - Coefficient 10 (glycémie, créatinine)",
        tarif: 300,
        categorie: "Biologie",
        synonymes: ["analyse", "glycemie", "sucre", "creatinine", "labo"]
    },
    {
        code: "B20",
        lettreCle: "B",
        coefficient: 20,
        libelle: "Acte de biologie - Coefficient 20",
        tarif: 300,
        categorie: "Biologie",
        synonymes: ["analyse", "bilan"]
    },
    {
        code: "B30",
        lettreCle: "B",
        coefficient: 30,
        libelle: "Acte de biologie - Coefficient 30 (FNS - Formule numération sanguine)",
        tarif: 300,
        categorie: "Biologie",
        synonymes: ["fns", "nfs", "prise de sang", "hemogramme", "numeration", "analyse sang"]
    },
    {
        code: "B40",
        lettreCle: "B",
        coefficient: 40,
        libelle: "Acte de biologie - Coefficient 40 (bilan complet)",
        tarif: 300,
        categorie: "Biologie",
        synonymes: ["bilan", "bilan complet", "analyses"]
    },
    {
        code: "B50",
        lettreCle: "B",
        coefficient: 50,
        libelle: "Acte de biologie - Coefficient 50",
        tarif: 300,
        categorie: "Biologie",
        synonymes: ["bilan", "grand bilan"]
    },
    
    // RADIOLOGIE
    {
        code: "R10",
        lettreCle: "R",
        coefficient: 10,
        libelle: "Acte de radiologie - Coefficient 10 (radio simple)",
        tarif: 1000,
        categorie: "Radiologie",
        synonymes: ["radio", "radiographie", "rayon x", "rx", "radio thorax", "radio poumon"]
    },
    {
        code: "R20",
        lettreCle: "R",
        coefficient: 20,
        libelle: "Acte de radiologie - Coefficient 20",
        tarif: 1000,
        categorie: "Radiologie",
        synonymes: ["radio", "echographie", "echo"]
    },
    {
        code: "R30",
        lettreCle: "R",
        coefficient: 30,
        libelle: "Acte de radiologie - Coefficient 30",
        tarif: 1000,
        categorie: "Radiologie",
        synonymes: ["scanner", "irm", "imagerie"]
    },
    
    // SOINS INFIRMIERS
    {
        code: "AMI2",
        lettreCle: "AMI",
        coefficient: 2,
        libelle: "Acte infirmier - Coefficient 2 (injection, pansement)",
        tarif: 300,
        categorie: "Soins Infirmiers",
        synonymes: ["infirmier", "injection", "pansement", "piqure", "soin"]
    },
    {
        code: "AMI5",
        lettreCle: "AMI",
        coefficient: 5,
        libelle: "Acte infirmier - Coefficient 5",
        tarif: 300,
        categorie: "Soins Infirmiers",
        synonymes: ["soin infirmier", "pansement"]
    },
    
    // KINESITHERAPIE
    {
        code: "AMM5",
        lettreCle: "AMM",
        coefficient: 5,
        libelle: "Séance de kinésithérapie - Coefficient 5",
        tarif: 400,
        categorie: "Kinésithérapie",
        synonymes: ["kine", "kinesitherapie", "reeducation", "massage", "seance"]
    },
    {
        code: "AMM10",
        lettreCle: "AMM",
        coefficient: 10,
        libelle: "Séance de kinésithérapie - Coefficient 10",
        tarif: 400,
        categorie: "Kinésithérapie",
        synonymes: ["kine", "reeducation"]
    }
];

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
