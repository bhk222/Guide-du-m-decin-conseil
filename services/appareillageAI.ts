// Service IA locale intelligent pour l'appareillage CNAS
// Utilise Ollama pour recherche sémantique avancée

export interface AISearchResult {
  reference: string;
  nom: string;
  description: string;
  indications: string[];
  criteres_conformite: string[];
  confidence: number; // 0-100
  source: string;
}

/**
 * Recherche intelligente avec IA locale (Ollama)
 * Comprend les références partielles et trouve les informations complètes
 */
export async function searchWithAI(query: string): Promise<AISearchResult | null> {
  try {
    // Vérifier si Ollama est disponible
    const isAvailable = await checkOllamaAvailability();
    if (!isAvailable) {
      console.log('IA locale non disponible - recherche classique activée');
      return null;
    }

    // Construire le prompt intelligent
    const prompt = buildIntelligentPrompt(query);

    // Interroger Ollama
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.1, // Très précis
          top_p: 0.9,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur API Ollama');
    }

    const data = await response.json();
    return parseAIResponse(data.response, query);

  } catch (error) {
    console.error('Erreur IA locale:', error);
    return null;
  }
}

/**
 * Vérifier la disponibilité d'Ollama
 */
async function checkOllamaAvailability(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
      signal: AbortSignal.timeout(2000)
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Construire un prompt intelligent avec contexte PDF
 */
function buildIntelligentPrompt(query: string): string {
  return `Tu es un expert en appareillage orthopédique CNAS (Algérie).

CONTEXTE DU GUIDE CNAS:
Le Guide CNAS 2022 "Appareillage et Dispositifs Médicaux" contient:

PODO-ORTHÈSES:
- SO 01, SO 02: Semelles orthopédiques
- 701-709: Chaussures orthopédiques personnalisées
- Adjonctions: AS47, AS50, AS51, AS52, AP22, AP24, AR31, AR32, AD13-16, MO91-92

ORTHÈSES MEMBRES INFÉRIEURS:
- OI 36 N11: Attelle cruro-pédieuse articulée
- OI 59 C91: Petit Appareil de Marche (PAM)
- GAM: Grands Appareils de Marche

ORTHÈSES MEMBRES SUPÉRIEURS:
- OS 79 G01: Attelle palmaire Type 1
- OS 13 N01: Orthèse de Sarmiento
- OS 16 N02: Orthèses diverses

CORSETS/ORTHÈSES TRONC:
- Milwaukee, Lyonnais, Boston, Chêneau
- Corsets anti-cyphose, lombaires

FAUTEUILS:
- FR.STANDARD: Fauteuil roulant standard
- FRE: Fauteuil Roulant Électrique
- VAM: Voiturette À Moteur

UTILISATEUR DEMANDE: "${query}"

INSTRUCTIONS:
1. Identifie la référence exacte si c'est une référence CNAS
2. Si référence trouvée, fournis:
   - Nom complet du produit
   - Description technique
   - Indications médicales principales
   - Critères de conformité
3. Si référence partielle, trouve la correspondance la plus proche
4. Sois précis et médical dans ta réponse

FORMAT DE RÉPONSE (JSON):
{
  "reference": "référence exacte",
  "nom": "nom complet du produit",
  "description": "description technique complète",
  "indications": ["indication 1", "indication 2"],
  "criteres": ["critère 1", "critère 2"],
  "confidence": 85
}

Réponds UNIQUEMENT avec le JSON, sans texte supplémentaire.`;
}

/**
 * Parser la réponse de l'IA
 */
function parseAIResponse(response: string, originalQuery: string): AISearchResult | null {
  try {
    // Extraire le JSON de la réponse
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Si pas de JSON, essayer de comprendre la réponse
      return parseTextResponse(response, originalQuery);
    }

    const data = JSON.parse(jsonMatch[0]);

    return {
      reference: data.reference || originalQuery,
      nom: data.nom || 'Produit non identifié',
      description: data.description || 'Description non disponible',
      indications: Array.isArray(data.indications) ? data.indications : [],
      criteres_conformite: Array.isArray(data.criteres) ? data.criteres : [],
      confidence: data.confidence || 50,
      source: 'IA Locale (Ollama)'
    };

  } catch (error) {
    console.error('Erreur parsing réponse IA:', error);
    return parseTextResponse(response, originalQuery);
  }
}

/**
 * Parser une réponse texte de l'IA
 */
function parseTextResponse(text: string, query: string): AISearchResult | null {
  // Extraction intelligente depuis le texte
  const lines = text.split('\n').filter(l => l.trim());
  
  let result: AISearchResult = {
    reference: query,
    nom: '',
    description: '',
    indications: [],
    criteres_conformite: [],
    confidence: 60,
    source: 'IA Locale (Ollama - Texte)'
  };

  // Chercher les patterns dans la réponse
  for (const line of lines) {
    if (line.toLowerCase().includes('référence') || line.toLowerCase().includes('reference')) {
      const match = line.match(/([A-Z]{1,3}\s*\d{1,3}\s*[A-Z]\d{1,2})/i);
      if (match) result.reference = match[0];
    }
    
    if (line.toLowerCase().includes('nom') || line.toLowerCase().includes('produit')) {
      result.nom = line.split(':')[1]?.trim() || line;
    }

    if (line.toLowerCase().includes('description')) {
      result.description = line.split(':')[1]?.trim() || '';
    }

    if (line.toLowerCase().includes('indication')) {
      result.indications.push(line.split(':')[1]?.trim() || line);
    }

    if (line.toLowerCase().includes('critère') || line.toLowerCase().includes('conformité')) {
      result.criteres_conformite.push(line.split(':')[1]?.trim() || line);
    }
  }

  return result.nom ? result : null;
}

/**
 * Recherche enrichie: combine recherche locale + IA
 */
export async function enrichedSearch(
  query: string, 
  localResults: any[]
): Promise<{ local: any[], ai: AISearchResult | null }> {
  
  // Si recherche locale a trouvé des résultats, pas besoin d'IA
  if (localResults.length > 0) {
    return { local: localResults, ai: null };
  }

  // Sinon, lancer recherche IA
  console.log('Aucun résultat local, interrogation IA...');
  const aiResult = await searchWithAI(query);

  return { local: [], ai: aiResult };
}

/**
 * Extraire références du texte brut du PDF
 */
export function extractReferencesFromPDF(pdfText: string): Map<string, string> {
  const references = new Map<string, string>();
  
  // Pattern pour références CNAS
  const refPattern = /([A-Z]{1,3}\s*\d{1,3}\s*[A-Z]\d{1,2})/g;
  const matches = pdfText.matchAll(refPattern);

  for (const match of matches) {
    const ref = match[0].trim();
    // Extraire le contexte autour de la référence (200 caractères)
    const startIdx = Math.max(0, match.index! - 100);
    const endIdx = Math.min(pdfText.length, match.index! + 100);
    const context = pdfText.substring(startIdx, endIdx);
    
    references.set(ref, context);
  }

  return references;
}

/**
 * Amélioration: charger tout le PDF en mémoire pour recherche instantanée
 */
let pdfCache: string | null = null;

export async function loadPDFCache(): Promise<void> {
  try {
    const response = await fetch('/data/appareillage_raw.txt');
    if (response.ok) {
      pdfCache = await response.text();
      console.log('✅ PDF chargé en cache:', pdfCache.length, 'caractères');
    }
  } catch (error) {
    console.error('Erreur chargement PDF:', error);
  }
}

export function searchInPDFCache(reference: string): string | null {
  if (!pdfCache) return null;

  // Recherche insensible à la casse et aux espaces
  const cleanRef = reference.replace(/\s+/g, '\\s*');
  const regex = new RegExp(cleanRef, 'gi');
  
  const match = pdfCache.match(regex);
  if (!match) return null;

  // Extraire le contexte (500 caractères autour)
  const idx = pdfCache.indexOf(match[0]);
  const start = Math.max(0, idx - 250);
  const end = Math.min(pdfCache.length, idx + 250);
  
  return pdfCache.substring(start, end);
}
