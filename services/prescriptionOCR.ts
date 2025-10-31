// Service IA locale pour déchiffrer les ordonnances illisibles
// Utilise Ollama avec vision pour OCR médical intelligent

export interface PrescriptionItem {
  medicament: string;
  dosage: string;
  forme: string;
  posologie: string;
  duree: string;
  confidence: number;
}

export interface OCRResult {
  items: PrescriptionItem[];
  texte_brut: string;
  warnings: string[];
  suggestions: string[];
  confidence_globale: number;
}

/**
 * Déchiffrer une ordonnance avec IA locale (Ollama + Vision)
 */
export async function decipherPrescriptionWithAI(imageBase64: string): Promise<OCRResult | null> {
  try {
    // Vérifier disponibilité Ollama
    const isAvailable = await checkOllamaAvailability();
    if (!isAvailable) {
      console.log('❌ Ollama non disponible - utiliser OCR basique');
      return null;
    }

    // Utiliser Ollama avec vision (llava)
    const prompt = buildMedicalOCRPrompt();
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llava',  // Modèle avec vision
        prompt: prompt,
        images: [imageBase64.replace(/^data:image\/\w+;base64,/, '')],
        stream: false,
        options: {
          temperature: 0.1,  // Très précis pour médical
          top_p: 0.95,
        }
      })
    });

    if (!response.ok) {
      throw new Error('Erreur API Ollama');
    }

    const data = await response.json();
    return parseOCRResponse(data.response);

  } catch (error) {
    console.error('Erreur déchiffrage IA:', error);
    return null;
  }
}

/**
 * Améliorer transcription avec IA
 */
export async function enhanceTranscriptionWithAI(texte: string): Promise<string> {
  try {
    const isAvailable = await checkOllamaAvailability();
    if (!isAvailable) return texte;

    const prompt = `Tu es un expert en déchiffrage d'ordonnances médicales algériennes.

TEXTE TRANSCRIT (possiblement avec erreurs):
"${texte}"

INSTRUCTIONS:
1. Corrige les fautes de frappe et abréviations médicales
2. Identifie les noms de médicaments (utilise DCI algériennes)
3. Standardise le format: Médicament + Dosage + Forme + Posologie + Durée
4. Ajoute les unités manquantes (mg, ml, cp, etc.)
5. Corrige les erreurs courantes d'écriture médicale

Abréviations courantes:
- cp = comprimé, gél = gélule, inj = injectable
- 1/j = 1 fois par jour, 2/j = 2 fois par jour, 3/j = 3 fois par jour
- matin/M, midi/M, soir/S
- pdt = pendant, jrs = jours

FORMAT DE SORTIE (ligne par ligne):
[Nom Médicament] [Dosage] [Forme]
Posologie: [détails]
Durée: [nombre de jours]

RÉPONDS UNIQUEMENT avec le texte corrigé, sans explications.`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.2,
          top_p: 0.9,
        }
      })
    });

    if (!response.ok) return texte;

    const data = await response.json();
    return data.response.trim() || texte;

  } catch (error) {
    console.error('Erreur amélioration IA:', error);
    return texte;
  }
}

/**
 * Suggérer médicaments depuis texte partiel
 */
export async function suggestMedicationsFromPartial(partial: string, localDatabase: any[]): Promise<any[]> {
  try {
    const isAvailable = await checkOllamaAvailability();
    
    // Recherche locale d'abord
    const localResults = localDatabase.filter(drug =>
      (drug.name?.toLowerCase().includes(partial.toLowerCase()) ||
       drug.dci?.toLowerCase().includes(partial.toLowerCase()))
    ).slice(0, 5);

    if (localResults.length > 0 || !isAvailable) {
      return localResults;
    }

    // Si aucun résultat et IA disponible, demander suggestions
    const prompt = `Tu es un expert pharmaceutique algérien.

TEXTE PARTIEL: "${partial}"

Suggère 3-5 médicaments algériens possibles qui correspondent à ce texte partiel.
Format JSON uniquement:
[
  {"nom": "Nom commercial", "dci": "DCI", "forme": "forme"},
  ...
]

Réponds UNIQUEMENT avec le JSON.`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: prompt,
        stream: false,
        options: { temperature: 0.3 }
      })
    });

    if (!response.ok) return localResults;

    const data = await response.json();
    const jsonMatch = data.response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const aiSuggestions = JSON.parse(jsonMatch[0]);
      return [...localResults, ...aiSuggestions.slice(0, 3)];
    }

    return localResults;

  } catch (error) {
    console.error('Erreur suggestions IA:', error);
    return localDatabase.filter(drug =>
      (drug.name?.toLowerCase().includes(partial.toLowerCase()) ||
       drug.dci?.toLowerCase().includes(partial.toLowerCase()))
    ).slice(0, 5);
  }
}

/**
 * Vérifier disponibilité Ollama
 */
async function checkOllamaAvailability(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Construire prompt OCR médical
 */
function buildMedicalOCRPrompt(): string {
  return `Tu es un expert en lecture d'ordonnances médicales manuscrites algériennes.

ANALYSE cette image d'ordonnance et extrais TOUTES les informations médicales.

INSTRUCTIONS CRITIQUES:
1. Lis CHAQUE ligne, même si l'écriture est difficile
2. Identifie: Médicaments, Dosages, Formes pharmaceutiques, Posologie, Durée
3. Déchiffre les abréviations médicales courantes
4. Corrige les erreurs d'orthographe évidentes
5. Si incertain, indique [?] après le mot

ABRÉVIATIONS ALGÉRIENNES COURANTES:
- cp/cpr = comprimé, gél = gélule, amp = ampoule, fl = flacon
- 1x/j = 1 fois par jour, 2x/j = 2 fois par jour, 3x/j = 3 fois par jour
- mat/M = matin, mid/M = midi, soir/S = soir
- av repas = avant repas, ap repas = après repas
- pdt = pendant, j = jours, sem = semaines

FORMAT DE RÉPONSE (JSON):
{
  "items": [
    {
      "medicament": "nom exact du médicament",
      "dosage": "250mg",
      "forme": "comprimé",
      "posologie": "1 comprimé 3 fois par jour",
      "duree": "7 jours",
      "confidence": 85
    }
  ],
  "texte_brut": "transcription complète ligne par ligne",
  "warnings": ["écriture illisible sur ligne 3", ...],
  "confidence_globale": 75
}

RÉPONDS UNIQUEMENT avec le JSON, sans texte supplémentaire.`;
}

/**
 * Parser réponse OCR
 */
function parseOCRResponse(response: string): OCRResult {
  try {
    // Extraire JSON
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Pas de JSON trouvé');
    }

    const data = JSON.parse(jsonMatch[0]);

    return {
      items: data.items || [],
      texte_brut: data.texte_brut || '',
      warnings: data.warnings || [],
      suggestions: data.suggestions || [],
      confidence_globale: data.confidence_globale || 50
    };

  } catch (error) {
    console.error('Erreur parsing OCR:', error);
    return {
      items: [],
      texte_brut: response,
      warnings: ['Erreur de parsing - voir texte brut'],
      suggestions: [],
      confidence_globale: 30
    };
  }
}

/**
 * Analyser et corriger texte médical
 */
export async function analyzeMedicalText(texte: string): Promise<{
  corrected: string;
  medications: string[];
  warnings: string[];
}> {
  try {
    const isAvailable = await checkOllamaAvailability();
    if (!isAvailable) {
      return {
        corrected: texte,
        medications: extractMedicationsBasic(texte),
        warnings: []
      };
    }

    const prompt = `Analyse ce texte médical et identifie les médicaments, corrige les erreurs:

"${texte}"

Réponds en JSON:
{
  "corrected": "texte corrigé",
  "medications": ["med1", "med2"],
  "warnings": ["avertissement si nécessaire"]
}`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama2',
        prompt: prompt,
        stream: false,
        options: { temperature: 0.1 }
      })
    });

    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    const jsonMatch = data.response.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        corrected: result.corrected || texte,
        medications: result.medications || [],
        warnings: result.warnings || []
      };
    }

    return {
      corrected: texte,
      medications: extractMedicationsBasic(texte),
      warnings: []
    };

  } catch (error) {
    console.error('Erreur analyse:', error);
    return {
      corrected: texte,
      medications: extractMedicationsBasic(texte),
      warnings: []
    };
  }
}

/**
 * Extraction basique de médicaments (fallback)
 */
function extractMedicationsBasic(texte: string): string[] {
  const lines = texte.split('\n');
  const medications: string[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && /^[A-Z]/.test(trimmed)) {
      const firstWord = trimmed.split(/[\s,]/)[0];
      if (firstWord.length > 3) {
        medications.push(firstWord);
      }
    }
  }
  
  return medications;
}
