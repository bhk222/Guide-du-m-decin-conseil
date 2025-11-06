// Service désactivé - Application 100% OFFLINE
// L'IA locale dans AiAnalyzer.tsx gère tout le traitement

/**
 * Fonction désactivée - L'application fonctionne maintenant 100% en local
 * sans connexion Internet requise
 * @param query The user's clinical description.
 * @returns A promise that resolves to an array of keywords from local processing.
 */
export const enhanceQueryWithAI = async (query: string): Promise<string[]> => {
  // Traitement local uniquement - pas d'appel API externe
  console.log("🔒 Mode OFFLINE : Traitement local uniquement");
  
  // Extraction locale des mots-clés médicaux
  const medicalTerms = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Supprimer ponctuation
    .split(/\s+/) // Séparer par espaces
    .filter(word => word.length > 2) // Mots > 2 caractères
    .filter(word => {
      // Filtrer mots médicaux pertinents
      const medicalKeywords = [
        'fracture', 'luxation', 'entorse', 'rupture', 'lesion',
        'genou', 'epaule', 'poignet', 'cheville', 'hanche', 'rachis',
        'tibial', 'femoral', 'humeral', 'radial', 'ulnaire',
        'douleur', 'raideur', 'limitation', 'instabilite', 'laxite',
        'plateau', 'diaphyse', 'col', 'malleole', 'rotule',
        'vertebre', 'doigt', 'main', 'pied', 'jambe', 'cuisse'
      ];
      return medicalKeywords.some(kw => word.includes(kw));
    });
  
  return medicalTerms.length > 0 ? medicalTerms : query.split(' ').slice(0, 5);
};

