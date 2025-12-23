// Service d'extraction et parsing de PDF pour la nomenclature médicale

interface ActeMedical {
    code: string;
    libelle: string;
    tarif: number;
    coefficient?: number;
    categorie?: string;
}

// Parser le texte extrait du PDF pour en faire une base de données structurée
export const parsePdfText = (text: string): ActeMedical[] => {
    const actes: ActeMedical[] = [];
    const lines = text.split('\n');
    
    // Regex pour détecter les patterns courants dans une nomenclature
    // Format typique: CODE | Libellé de l'acte | Tarif | Coefficient
    const patterns = [
        // Pattern 1: CODE  Libellé  Tarif  Coef
        /^([A-Z0-9]+)\s+(.+?)\s+(\d+[.,]?\d*)\s*DA?\s*[xX×]?\s*(\d+[.,]?\d*)?/i,
        // Pattern 2: CODE - Libellé - Tarif DA
        /^([A-Z0-9]+)\s*[-|]\s*(.+?)\s*[-|]\s*(\d+[.,]?\d*)\s*DA?/i,
        // Pattern 3: CODE Libellé Tarif
        /^([A-Z0-9]{1,10})\s+([A-Za-zÀ-ÿ\s\-']+)\s+(\d+[.,]?\d*)/,
    ];

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.length < 10) continue;

        for (const pattern of patterns) {
            const match = trimmedLine.match(pattern);
            if (match) {
                const [, code, libelle, tarifStr, coefStr] = match;
                const tarif = parseFloat(tarifStr.replace(',', '.'));
                const coefficient = coefStr ? parseFloat(coefStr.replace(',', '.')) : 1;

                // Déterminer la catégorie
                let categorie = 'Autre';
                const libelleLower = libelle.toLowerCase();
                if (libelleLower.includes('consult')) categorie = 'Consultation';
                else if (libelleLower.includes('visite')) categorie = 'Visite';
                else if (libelleLower.includes('chirurg') || libelleLower.includes('opér')) categorie = 'Chirurgie';
                else if (libelleLower.includes('radio') || libelleLower.includes('échograph')) categorie = 'Imagerie';
                else if (libelleLower.includes('anesthé')) categorie = 'Anesthésie';
                else if (libelleLower.includes('soin') || libelleLower.includes('pansement')) categorie = 'Soins';
                else if (libelleLower.includes('biologie') || libelleLower.includes('analys')) categorie = 'Biologie';
                else if (libelleLower.includes('kinesither') || libelleLower.includes('rééducation')) categorie = 'Kinésithérapie';

                if (tarif > 0 && code && libelle) {
                    actes.push({
                        code: code.trim().toUpperCase(),
                        libelle: libelle.trim(),
                        tarif,
                        coefficient,
                        categorie
                    });
                }
                break;
            }
        }
    }

    return actes;
};

// Extraction du PDF en utilisant l'API FileReader
export const extractPdfData = async (file: File): Promise<ActeMedical[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                
                // Utiliser pdfjs-dist pour extraire le texte
                const pdfjsLib = (window as any).pdfjsLib;
                if (!pdfjsLib) {
                    // Fallback: essayer de parser le texte brut
                    const text = new TextDecoder().decode(arrayBuffer);
                    const actes = parsePdfText(text);
                    resolve(actes);
                    return;
                }

                // Charger le PDF avec pdf.js
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                
                let fullText = '';
                
                // Extraire le texte de chaque page
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items
                        .map((item: any) => item.str)
                        .join(' ');
                    fullText += pageText + '\n';
                }

                // Parser le texte extrait
                const actes = parsePdfText(fullText);
                resolve(actes);
            } catch (error) {
                console.error('Erreur lors de l\'extraction PDF:', error);
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error('Erreur lors de la lecture du fichier'));
        };

        reader.readAsArrayBuffer(file);
    });
};

// Recherche sémantique dans la base de données
export const rechercherActes = (actes: ActeMedical[], query: string): ActeMedical[] => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase().trim();
    const queryWords = queryLower.split(/\s+/);

    return actes
        .map(acte => {
            let score = 0;

            // Score pour correspondance exacte du code
            if (acte.code.toLowerCase() === queryLower) {
                score += 100;
            } else if (acte.code.toLowerCase().includes(queryLower)) {
                score += 50;
            }

            // Score pour correspondance dans le libellé
            const libelleLower = acte.libelle.toLowerCase();
            queryWords.forEach(word => {
                if (libelleLower.includes(word)) {
                    score += 10;
                }
            });

            // Score pour correspondance dans la catégorie
            if (acte.categorie?.toLowerCase().includes(queryLower)) {
                score += 20;
            }

            return { acte, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.acte);
};

// Sauvegarder la base de données en localStorage
export const sauvegarderBaseDeDonnees = (actes: ActeMedical[]): void => {
    try {
        localStorage.setItem('nomenclature_db', JSON.stringify(actes));
        localStorage.setItem('nomenclature_db_date', new Date().toISOString());
        console.log(`✅ Base de données sauvegardée: ${actes.length} actes`);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
    }
};

// Charger la base de données depuis localStorage
export const chargerBaseDeDonnees = (): ActeMedical[] | null => {
    try {
        const data = localStorage.getItem('nomenclature_db');
        if (!data) return null;
        
        const actes = JSON.parse(data) as ActeMedical[];
        const date = localStorage.getItem('nomenclature_db_date');
        console.log(`✅ Base de données chargée: ${actes.length} actes (${date})`);
        return actes;
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        return null;
    }
};

// Effacer la base de données
export const effacerBaseDeDonnees = (): void => {
    localStorage.removeItem('nomenclature_db');
    localStorage.removeItem('nomenclature_db_date');
    console.log('🗑️ Base de données effacée');
};

// Obtenir les statistiques de la base de données
export const getStatistiques = (actes: ActeMedical[]): {
    total: number;
    categories: { [key: string]: number };
    tarifMoyen: number;
} => {
    const categories: { [key: string]: number } = {};
    let sommeTarifs = 0;

    actes.forEach(acte => {
        const cat = acte.categorie || 'Autre';
        categories[cat] = (categories[cat] || 0) + 1;
        sommeTarifs += acte.tarif * (acte.coefficient || 1);
    });

    return {
        total: actes.length,
        categories,
        tarifMoyen: actes.length > 0 ? sommeTarifs / actes.length : 0
    };
};
