/**
 * Service de recherche sémantique locale pour l'appareillage médical
 * Utilise une approche de scoring basée sur :
 * - Correspondance exacte de mots
 * - Synonymes et variations
 * - Catégories anatomiques
 * - Indications médicales
 */

import { appareillageProduits, type AppareillageProduit } from '../data/appareillageProduits';

// Dictionnaire de synonymes et variations
const SYNONYMES: { [key: string]: string[] } = {
  // Membres
  jambe: ['membre inférieur', 'mi', 'pied', 'cheville', 'genou', 'cuisse', 'tibia', 'fémur'],
  bras: ['membre supérieur', 'ms', 'main', 'poignet', 'coude', 'épaule', 'avant-bras'],
  pied: ['plantaire', 'talus', 'calcanéum', 'métatarse', 'orteils', 'cheville'],
  main: ['doigts', 'pouce', 'paume', 'carpe', 'métacarpe'],
  
  // Types d'appareillage
  prothèse: ['prothese', 'prothétique', 'artificiel', 'implant'],
  orthèse: ['orthese', 'attelle', 'tuteur', 'maintien', 'immobilisation'],
  chaussure: ['soulier', 'chaussure orthopédique', 'bottine', 'sandale'],
  semelle: ['plantaire', 'insert', 'support'],
  
  // Pathologies
  amputation: ['amputé', 'désarticulation', 'perte'],
  fracture: ['cassure', 'brisure', 'fêlure'],
  entorse: ['foulure', 'distorsion', 'ligament'],
  paralysie: ['parésie', 'déficit moteur', 'hémiplégie', 'paraplégie'],
  arthrose: ['gonarthrose', 'coxarthrose', 'arthropathie'],
  
  // Aides
  fauteuil: ['chaise roulante', 'wheelchair', 'roulant'],
  canne: ['béquille', 'cane', 'appui'],
  déambulateur: ['cadre de marche', 'rollator', 'walker'],
  
  // Anatomie
  genou: ['rotule', 'patella', 'ménisque', 'ligament croisé'],
  épaule: ['gléno-huméral', 'coiffe des rotateurs', 'scapula'],
  dos: ['rachis', 'colonne', 'vertèbre', 'lombaire', 'dorsal', 'cervical'],
  hanche: ['coxo-fémoral', 'bassin', 'cotyle'],
};

// Normalisation du texte
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^\w\s]/g, ' ') // Remplacer la ponctuation par des espaces
    .replace(/\s+/g, ' ') // Normaliser les espaces multiples
    .trim();
}

// Extraction des mots-clés d'une requête
function extractKeywords(query: string): string[] {
  const normalized = normalizeText(query);
  const words = normalized.split(' ').filter(w => w.length > 2);
  
  // Ajouter les synonymes
  const expandedWords = new Set<string>(words);
  for (const word of words) {
    if (SYNONYMES[word]) {
      SYNONYMES[word].forEach(syn => expandedWords.add(normalizeText(syn)));
    }
  }
  
  return Array.from(expandedWords);
}

// Calcul du score de correspondance
function calculateScore(product: AppareillageProduit, keywords: string[]): number {
  let score = 0;
  
  // Texte combiné du produit pour la recherche
  const productText = normalizeText(
    `${product.nom} ${product.description} ${product.categorie} ${product.motsClefs.join(' ')} ${product.indications || ''}`
  );
  
  const productWords = productText.split(' ');
  
  for (const keyword of keywords) {
    const keywordNorm = normalizeText(keyword);
    
    // Correspondance exacte dans le nom (score élevé)
    if (normalizeText(product.nom).includes(keywordNorm)) {
      score += 10;
    }
    
    // Correspondance exacte dans la catégorie
    if (normalizeText(product.categorie).includes(keywordNorm)) {
      score += 8;
    }
    
    // Correspondance dans les mots-clés
    const motsClefs = product.motsClefs.map(m => normalizeText(m));
    if (motsClefs.some(m => m.includes(keywordNorm) || keywordNorm.includes(m))) {
      score += 5;
    }
    
    // Correspondance dans les indications
    if (product.indications && normalizeText(product.indications).includes(keywordNorm)) {
      score += 7;
    }
    
    // Correspondance dans la description
    if (normalizeText(product.description).includes(keywordNorm)) {
      score += 3;
    }
    
    // Correspondance partielle de mots (pour gérer les variations)
    const partialMatches = productWords.filter(w => 
      w.includes(keywordNorm) || keywordNorm.includes(w)
    );
    score += partialMatches.length * 1;
  }
  
  return score;
}

// Catégorisation anatomique
const CATEGORIES_ANATOMIQUES: { [key: string]: string[] } = {
  'Membre supérieur': ['bras', 'épaule', 'coude', 'avant-bras', 'poignet', 'main', 'doigt', 'pouce'],
  'Membre inférieur': ['jambe', 'hanche', 'cuisse', 'genou', 'tibia', 'cheville', 'pied', 'orteil'],
  'Rachis': ['dos', 'colonne', 'vertèbre', 'lombaire', 'dorsal', 'cervical', 'cou'],
  'Mobilité': ['fauteuil', 'canne', 'béquille', 'déambulateur', 'marche'],
};

function detectCategory(query: string): string | null {
  const normalized = normalizeText(query);
  
  for (const [category, keywords] of Object.entries(CATEGORIES_ANATOMIQUES)) {
    if (keywords.some(kw => normalized.includes(kw))) {
      return category;
    }
  }
  
  return null;
}

// Interface pour les résultats de recherche
export interface RechercheAppareillageResult {
  produit: AppareillageProduit;
  score: number;
  matchedTerms: string[];
}

/**
 * Recherche sémantique de produits d'appareillage
 * @param query - La requête de recherche en langage naturel
 * @param maxResults - Nombre maximum de résultats (défaut: 10)
 * @returns Liste de produits triés par pertinence
 */
export function rechercherAppareillage(
  query: string,
  maxResults: number = 10
): RechercheAppareillageResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  // Extraire les mots-clés avec synonymes
  const keywords = extractKeywords(query);
  
  // Détecter la catégorie anatomique
  const category = detectCategory(query);
  
  // Calculer les scores pour tous les produits
  const scoredProducts = appareillageProduits.map(product => {
    let score = calculateScore(product, keywords);
    
    // Bonus si la catégorie correspond
    if (category && normalizeText(product.categorie).includes(normalizeText(category))) {
      score += 5;
    }
    
    // Bonus CNAS
    if (product.cnas) {
      score += 1;
    }
    
    // Identifier les termes correspondants
    const matchedTerms: string[] = [];
    keywords.forEach(kw => {
      if (normalizeText(product.nom + ' ' + product.description).includes(kw)) {
        matchedTerms.push(kw);
      }
    });
    
    return {
      produit: product,
      score,
      matchedTerms
    };
  });
  
  // Trier par score décroissant et filtrer les scores nuls
  return scoredProducts
    .filter(sp => sp.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Recherche par catégorie
 */
export function rechercherParCategorie(categorie: string): AppareillageProduit[] {
  const categorieNorm = normalizeText(categorie);
  return appareillageProduits.filter(p => 
    normalizeText(p.categorie).includes(categorieNorm)
  );
}

/**
 * Obtenir toutes les catégories disponibles
 */
export function getCategories(): string[] {
  const categories = new Set(appareillageProduits.map(p => p.categorie));
  return Array.from(categories).sort();
}

/**
 * Recherche par indication médicale
 */
export function rechercherParIndication(indication: string): AppareillageProduit[] {
  const indicationNorm = normalizeText(indication);
  return appareillageProduits.filter(p => 
    p.indications && normalizeText(p.indications).includes(indicationNorm)
  );
}

/**
 * Suggestions de recherche basées sur la requête partielle
 */
export function getSuggestions(query: string, maxSuggestions: number = 5): string[] {
  if (!query || query.length < 2) {
    return [];
  }
  
  const queryNorm = normalizeText(query);
  const suggestions = new Set<string>();
  
  // Suggestions basées sur les noms de produits
  appareillageProduits.forEach(p => {
    const nomNorm = normalizeText(p.nom);
    if (nomNorm.includes(queryNorm)) {
      suggestions.add(p.nom);
    }
    
    // Suggestions basées sur les mots-clés
    p.motsClefs.forEach(kw => {
      if (normalizeText(kw).includes(queryNorm)) {
        suggestions.add(kw);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, maxSuggestions);
}
