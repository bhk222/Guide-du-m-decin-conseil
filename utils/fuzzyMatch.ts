// ═══════════════════════════════════════════════════════════════
// FUZZY MATCHING ENGINE — V3.3.300
// Recherche floue sur les 986 entrées du barème CNAS
// Zéro dépendance externe, optimisé pour le navigateur
// ═══════════════════════════════════════════════════════════════

import { disabilityData } from '../data/disabilityRates.new';
import { Injury } from '../types';

// ─── Types ───────────────────────────────────────────────────

export interface FuzzyMatch {
  injury: Injury;
  path: string;
  score: number;        // 0-100 score de confiance
  matchedOn: string;    // Le terme qui a le mieux matché
}

export interface FuzzySearchResult {
  type: 'fuzzy_suggestions';
  text: string;
  suggestions: FuzzyMatch[];
  bestScore: number;
}

// ─── Index du barème (calculé une seule fois) ────────────────

interface IndexedEntry {
  injury: Injury;
  path: string;
  tokens: string[];      // Tokens normalisés du nom
  allTerms: string[];    // name + searchTerms normalisés
  bigramSet: Set<string>;
}

let _index: IndexedEntry[] | null = null;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlever accents
    .replace(/[''`]/g, ' ')
    .replace(/[-–—]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  const stopWords = new Set([
    'de', 'du', 'des', 'la', 'le', 'les', 'un', 'une', 'et', 'ou', 'avec',
    'sans', 'par', 'pour', 'sur', 'dans', 'en', 'au', 'aux', 'a', 'l',
    'qui', 'que', 'dont', 'son', 'sa', 'ses', 'ce', 'cette', 'ces',
    'main', 'dominante', 'non', 'droit', 'droite', 'gauche', 'd', 'nd'
  ]);
  return normalize(text)
    .split(' ')
    .filter(w => w.length > 1 && !stopWords.has(w));
}

function bigrams(text: string): Set<string> {
  const norm = normalize(text);
  const set = new Set<string>();
  for (let i = 0; i < norm.length - 1; i++) {
    set.add(norm.substring(i, i + 2));
  }
  return set;
}

function buildIndex(): IndexedEntry[] {
  if (_index) return _index;

  _index = [];
  for (const cat of disabilityData) {
    for (const sub of cat.subcategories) {
      for (const inj of sub.injuries) {
        const path = `${cat.name} > ${sub.name}`;
        const allTerms = [inj.name, ...(inj.searchTerms || [])].map(normalize);
        const tokens = tokenize(inj.name);
        const bigramSet = bigrams(inj.name);
        // Ajouter aussi les bigrams des searchTerms
        for (const term of (inj.searchTerms || [])) {
          for (const bg of bigrams(term)) {
            bigramSet.add(bg);
          }
        }
        _index.push({ injury: { ...inj, path }, path, tokens, allTerms, bigramSet });
      }
    }
  }
  return _index;
}

// ─── Algorithmes de similarité ──────────────────────────────

/**
 * Distance de Levenshtein optimisée (O(n*m) mémoire O(min(n,m)))
 */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  // Garder le plus court dans `b` pour optimiser la mémoire
  if (a.length < b.length) [a, b] = [b, a];

  const bLen = b.length;
  let prev = new Array(bLen + 1);
  let curr = new Array(bLen + 1);

  for (let j = 0; j <= bLen; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        curr[j - 1] + 1,      // insertion
        prev[j] + 1,          // deletion
        prev[j - 1] + cost    // substitution
      );
    }
    [prev, curr] = [curr, prev];
  }
  return prev[bLen];
}

/**
 * Similarité Levenshtein normalisée (0-1)
 */
function levenshteinSimilarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshtein(a, b) / maxLen;
}

/**
 * Similarité Jaccard sur tokens (0-1)
 */
function tokenJaccard(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 && tokensB.length === 0) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  let intersection = 0;
  for (const t of setA) {
    if (setB.has(t)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Similarité Dice sur bigrammes (0-1) — meilleur pour les typos
 */
function bigramDice(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 0;
  let intersection = 0;
  for (const bg of setA) {
    if (setB.has(bg)) intersection++;
  }
  return (2 * intersection) / (setA.size + setB.size);
}

/**
 * Bonus de sous-chaîne : si un token de la query est contenu dans le nom barème
 */
function substringBonus(queryTokens: string[], entryNorm: string): number {
  let bonus = 0;
  for (const token of queryTokens) {
    if (token.length >= 4 && entryNorm.includes(token)) {
      bonus += 0.15; // Bonus par token trouvé en substring
    }
  }
  return Math.min(bonus, 0.45); // Cap à 0.45
}

/**
 * Meilleur match Levenshtein token par token (pour les typos sur un seul mot)
 */
function bestTokenLevenshtein(queryTokens: string[], entryTokens: string[]): number {
  if (queryTokens.length === 0 || entryTokens.length === 0) return 0;
  
  let totalBestSim = 0;
  let matchedCount = 0;
  
  for (const qt of queryTokens) {
    if (qt.length < 3) continue; // Ignorer les tokens trop courts
    let bestSim = 0;
    for (const et of entryTokens) {
      if (et.length < 3) continue;
      const sim = levenshteinSimilarity(qt, et);
      if (sim > bestSim) bestSim = sim;
    }
    if (bestSim >= 0.6) { // Seuil minimum de similarité par token
      totalBestSim += bestSim;
      matchedCount++;
    }
  }
  
  return queryTokens.length > 0 ? totalBestSim / queryTokens.length : 0;
}

// ─── Scoring composite ──────────────────────────────────────

function computeScore(queryTokens: string[], queryBigrams: Set<string>, queryNorm: string, entry: IndexedEntry): { score: number; matchedOn: string } {
  // 1. Token Jaccard (poids 30%)
  const jaccard = tokenJaccard(queryTokens, entry.tokens);
  
  // 2. Bigram Dice (poids 25%)
  const dice = bigramDice(queryBigrams, entry.bigramSet);
  
  // 3. Meilleur match token-level Levenshtein (poids 25%)
  const tokenLev = bestTokenLevenshtein(queryTokens, entry.tokens);
  
  // 4. Substring bonus (poids 10%)
  const subBonus = substringBonus(queryTokens, normalize(entry.injury.name));
  
  // 5. Longueur de correspondance bonus (poids 10%) — pénaliser les entrées très longues vs query courte
  const lenRatio = Math.min(queryTokens.length, entry.tokens.length) / Math.max(queryTokens.length, entry.tokens.length, 1);
  
  // Score composite
  let score = (jaccard * 0.30 + dice * 0.25 + tokenLev * 0.25 + subBonus * 0.10 + lenRatio * 0.10) * 100;
  
  // Bonus: check searchTerms — si un searchTerm a un meilleur Dice, boost le score
  let matchedOn = entry.injury.name;
  if (entry.injury.searchTerms) {
    for (const term of entry.injury.searchTerms) {
      const termBigrams = bigrams(term);
      const termDice = bigramDice(queryBigrams, termBigrams);
      if (termDice > dice) {
        const termScore = (jaccard * 0.20 + termDice * 0.35 + tokenLev * 0.25 + subBonus * 0.10 + lenRatio * 0.10) * 100;
        if (termScore > score) {
          score = termScore;
          matchedOn = term;
        }
      }
    }
  }
  
  return { score, matchedOn };
}

// ─── API publique ───────────────────────────────────────────

/**
 * Recherche floue dans les 986 entrées du barème.
 * Retourne les meilleurs matchs triés par score décroissant.
 * 
 * @param query - Le texte clinique de l'utilisateur
 * @param topN - Nombre de résultats à retourner (défaut: 5)
 * @param minScore - Score minimum pour être inclus (défaut: 15)
 */
export function fuzzySearchBareme(query: string, topN: number = 5, minScore: number = 15): FuzzyMatch[] {
  const index = buildIndex();
  const queryNorm = normalize(query);
  const queryTokens = tokenize(query);
  const queryBigrams = bigrams(query);
  
  if (queryTokens.length === 0) return [];
  
  const scored: FuzzyMatch[] = [];
  
  for (const entry of index) {
    const { score, matchedOn } = computeScore(queryTokens, queryBigrams, queryNorm, entry);
    if (score >= minScore) {
      scored.push({
        injury: entry.injury,
        path: entry.path,
        score: Math.round(score * 10) / 10,
        matchedOn
      });
    }
  }
  
  // Trier par score décroissant
  scored.sort((a, b) => b.score - a.score);
  
  // Dédupliquer : si 2 entrées ont le même nom, garder celle avec le meilleur score
  const seen = new Set<string>();
  const deduped: FuzzyMatch[] = [];
  for (const match of scored) {
    if (!seen.has(match.injury.name)) {
      seen.add(match.injury.name);
      deduped.push(match);
    }
  }
  
  return deduped.slice(0, topN);
}

/**
 * Vérifie si le meilleur match fuzzy est assez bon pour être proposé automatiquement.
 * - score >= 55 → auto-match (haute confiance)
 * - score 30-55 → suggestions (confiance intermédiaire)
 * - score < 30 → no_result
 */
export function fuzzyAutoThreshold(matches: FuzzyMatch[]): 'auto' | 'suggest' | 'none' {
  if (matches.length === 0) return 'none';
  const best = matches[0].score;
  if (best >= 55) return 'auto';
  if (best >= 30) return 'suggest';
  return 'none';
}

/**
 * Formatte le résultat fuzzy en FuzzySearchResult pour l'UI
 */
export function buildFuzzyResult(query: string, matches: FuzzyMatch[]): FuzzySearchResult {
  const threshold = fuzzyAutoThreshold(matches);
  let text: string;
  
  if (threshold === 'suggest') {
    text = `🔍 Votre description ne correspond pas exactement au barème, mais voici les entrées les plus proches. Voulez-vous en sélectionner une ?`;
  } else {
    text = `Aucune correspondance trouvée dans le barème pour "${query.substring(0, 80)}".`;
  }
  
  return {
    type: 'fuzzy_suggestions',
    text,
    suggestions: matches.slice(0, 5),
    bestScore: matches.length > 0 ? matches[0].score : 0
  };
}
