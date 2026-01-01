/**
 * ANALYSE COMPARATIVE EXHAUSTIVE
 * Word (extracted_word_content.json) vs Application (algerianBareme1967.ts + mayetReyComplement.ts)
 * 
 * Ce script compare de manière exhaustive les séquelles présentes dans :
 * 1. Le fichier Word extrait (barème officiel AT et IPP)
 * 2. L'application (barème algérien 1967 + complément Mayet-Rey)
 */

import * as fs from 'fs';
import { algerianBareme1967 } from './data/algerianBareme1967';
import { mayetReyComplement } from './data/mayetReyComplement';
import { InjuryCategory } from './types';

interface WordData {
  BAREME_AT: { [key: string]: string };
  IPP: { [key: string]: string };
}

interface ComparisonResult {
  zone: string;
  sequellesWord: SequelleExtracted[];
  sequellesApp: SequelleApp[];
  presentes: Comparaison[];
  manquentDansApp: SequelleExtracted[];
  manquentDansWord: SequelleApp[];
  divergencesIPP: Divergence[];
}

interface SequelleExtracted {
  libelle: string;
  ipp?: number | { min: number; max: number };
  source: 'BAREME_AT' | 'IPP';
  contexte: string;
}

interface SequelleApp {
  libelle: string;
  ipp: number | number[];
  source: string;
  path: string;
}

interface Comparaison {
  libelleWord: string;
  libelleApp: string;
  ippWord?: number | { min: number; max: number };
  ippApp: number | number[];
  similitude: number;
  identique: boolean;
}

interface Divergence {
  libelleWord: string;
  libelleApp: string;
  ippWord: number | { min: number; max: number };
  ippApp: number | number[];
  ecart: number;
  gravite: 'critique' | 'moyenne' | 'mineure';
  recommendation: string;
}

// Zones à analyser en priorité
const ZONES_PRIORITAIRES = [
  // Membres supérieurs
  { word: 'Épaule', app: ['Épaule'] },
  { word: 'Bras', app: ['Bras', 'Coude'] },
  { word: 'Coude', app: ['Coude', 'Coude et Avant-bras'] },
  { word: 'Poignet', app: ['Poignet'] },
  { word: 'Main', app: ['Main', 'Main et Poignet'] },
  { word: 'Omoplate', app: ['Omoplate'] },
  { word: 'Clavicule', app: ['Clavicule'] },
  
  // Membres inférieurs
  { word: 'Hanches', app: ['Hanche'] },
  { word: 'Cuisse', app: ['Cuisse'] },
  { word: 'Genou', app: ['Genou'] },
  { word: 'Jambe', app: ['Jambe'] },
  { word: 'Cheville', app: ['Cheville', 'Cheville et Pied'] },
  { word: 'Pied', app: ['Pied', 'Cheville et Pied'] },
  
  // Rachis
  { word: 'Cervical', app: ['Rachis Cervical'] },
  { word: 'Dorsal', app: ['Rachis Dorso-Lombaire'] },
  { word: 'Lombaire', app: ['Rachis Dorso-Lombaire'] },
  { word: 'Rachis', app: ['Rachis'] },
  { word: 'Colonne vertébrale', app: ['Rachis'] },
];

/**
 * Extraction des séquelles du fichier Word
 */
function extractWordSequelles(wordData: WordData, zone: string): SequelleExtracted[] {
  const sequelles: SequelleExtracted[] = [];
  
  // Chercher dans BAREME_AT
  if (wordData.BAREME_AT[zone]) {
    const content = wordData.BAREME_AT[zone];
    const extracted = parseWordContent(content, 'BAREME_AT', zone);
    sequelles.push(...extracted);
  }
  
  // Chercher dans IPP
  if (wordData.IPP[zone]) {
    const content = wordData.IPP[zone];
    const extracted = parseWordContent(content, 'IPP', zone);
    sequelles.push(...extracted);
  }
  
  return sequelles;
}

/**
 * Parser le contenu Word pour extraire les séquelles et leurs IPP
 */
function parseWordContent(content: string, source: 'BAREME_AT' | 'IPP', zone: string): SequelleExtracted[] {
  const sequelles: SequelleExtracted[] = [];
  
  // Patterns pour détecter les séquelles avec IPP
  // Format : "Description de la séquelle \t\t IPP" ou "Description \t IPP à IPP"
  const patterns = [
    // Format avec tabulations : "Ankylose complète de l'épaule en position favorable\t\t35 à 45"
    /([^\t\n]+?)\s*\t+\s*(\d+)\s*(?:à|a)\s*(\d+)/gi,
    // Format avec tabulations : "Ankylose complète de l'épaule\t\t40"
    /([^\t\n]+?)\s*\t+\s*(\d+)(?!\s*(?:à|a)\s*\d+)/gi,
    // Format sans tabulation : "Ankylose de l'épaule 35 à 45"
    /([^\d\n]{20,}?)\s+(\d+)\s*(?:à|a)\s*(\d+)/gi,
    // Format "Description. . . IPP"
    /([^\d\n]+?)\s*\.+\s*(\d+)\s*(?:à|a)?\s*(\d+)?/gi,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const libelle = match[1].trim()
        .replace(/\s+/g, ' ')
        .replace(/^\d+[°)\.]?\s*/, '') // Enlever numérotation
        .replace(/^[•\-]\s*/, ''); // Enlever puces
      
      if (libelle.length < 10) continue; // Ignorer les lignes trop courtes
      
      let ipp: number | { min: number; max: number } | undefined;
      
      if (match[3]) {
        // Plage IPP
        const min = parseInt(match[2]);
        const max = parseInt(match[3]);
        if (!isNaN(min) && !isNaN(max) && min < 100 && max <= 100 && min < max) {
          ipp = { min, max };
        }
      } else if (match[2]) {
        // IPP unique
        const val = parseInt(match[2]);
        if (!isNaN(val) && val > 0 && val <= 100) {
          ipp = val;
        }
      }
      
      if (ipp) {
        sequelles.push({
          libelle,
          ipp,
          source,
          contexte: content.substring(Math.max(0, match.index - 100), Math.min(content.length, match.index + 200))
        });
      }
    }
  }
  
  return sequelles;
}

/**
 * Extraction des séquelles de l'application
 */
function extractAppSequelles(categories: InjuryCategory[], zoneNames: string[]): SequelleApp[] {
  const sequelles: SequelleApp[] = [];
  
  function traverse(cats: InjuryCategory[], path: string[] = []) {
    for (const cat of cats) {
      const currentPath = [...path, cat.name];
      
      // Vérifier si on est dans une zone recherchée
      const isTargetZone = zoneNames.some(zoneName => 
        currentPath.some(p => p.toLowerCase().includes(zoneName.toLowerCase()) || 
                              zoneName.toLowerCase().includes(p.toLowerCase()))
      );
      
      if (cat.injuries) {
        for (const injury of cat.injuries) {
          if (isTargetZone || path.length === 0) {
            sequelles.push({
              libelle: injury.name,
              ipp: injury.rate,
              source: currentPath.join(' > '),
              path: currentPath.join(' > ')
            });
          }
        }
      }
      
      if (cat.subcategories) {
        traverse(cat.subcategories, currentPath);
      }
    }
  }
  
  traverse(categories);
  return sequelles;
}

/**
 * Calculer la similarité entre deux chaînes (algorithme de Levenshtein normalisé)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (s1 === s2) return 1;
  
  const matrix: number[][] = [];
  
  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  const distance = matrix[s1.length][s2.length];
  const maxLen = Math.max(s1.length, s2.length);
  return 1 - (distance / maxLen);
}

/**
 * Comparer les séquelles d'une zone
 */
function compareZone(wordSequelles: SequelleExtracted[], appSequelles: SequelleApp[]): {
  presentes: Comparaison[];
  manquentDansApp: SequelleExtracted[];
  manquentDansWord: SequelleApp[];
  divergencesIPP: Divergence[];
} {
  const presentes: Comparaison[] = [];
  const manquentDansApp: SequelleExtracted[] = [];
  const manquentDansWord: SequelleApp[] = [];
  const divergencesIPP: Divergence[] = [];
  
  const seenApp = new Set<number>();
  
  // Pour chaque séquelle Word, chercher la correspondance dans l'app
  for (const wordSeq of wordSequelles) {
    let bestMatch: { appSeq: SequelleApp; similarity: number; index: number } | null = null;
    
    for (let i = 0; i < appSequelles.length; i++) {
      const appSeq = appSequelles[i];
      const similarity = calculateSimilarity(wordSeq.libelle, appSeq.libelle);
      
      if (similarity > 0.6 && (!bestMatch || similarity > bestMatch.similarity)) {
        bestMatch = { appSeq, similarity, index: i };
      }
    }
    
    if (bestMatch && bestMatch.similarity > 0.7) {
      seenApp.add(bestMatch.index);
      
      const comp: Comparaison = {
        libelleWord: wordSeq.libelle,
        libelleApp: bestMatch.appSeq.libelle,
        ippWord: wordSeq.ipp,
        ippApp: bestMatch.appSeq.ipp,
        similitude: bestMatch.similarity,
        identique: bestMatch.similarity > 0.95
      };
      
      presentes.push(comp);
      
      // Vérifier divergence IPP
      const divergence = checkIPPDivergence(comp);
      if (divergence) {
        divergencesIPP.push(divergence);
      }
    } else {
      manquentDansApp.push(wordSeq);
    }
  }
  
  // Séquelles app non matchées
  for (let i = 0; i < appSequelles.length; i++) {
    if (!seenApp.has(i)) {
      manquentDansWord.push(appSequelles[i]);
    }
  }
  
  return { presentes, manquentDansApp, manquentDansWord, divergencesIPP };
}

/**
 * Vérifier divergence IPP
 */
function checkIPPDivergence(comp: Comparaison): Divergence | null {
  if (!comp.ippWord) return null;
  
  const wordIPP = typeof comp.ippWord === 'number' 
    ? { min: comp.ippWord, max: comp.ippWord }
    : comp.ippWord;
  
  const appIPP = Array.isArray(comp.ippApp)
    ? { min: comp.ippApp[0], max: comp.ippApp[1] }
    : { min: comp.ippApp, max: comp.ippApp };
  
  // Calculer l'écart (moyenne des différences)
  const ecartMin = Math.abs(wordIPP.min - appIPP.min);
  const ecartMax = Math.abs(wordIPP.max - appIPP.max);
  const ecart = (ecartMin + ecartMax) / 2;
  
  if (ecart < 2) return null; // Pas de divergence significative
  
  let gravite: 'critique' | 'moyenne' | 'mineure';
  let recommendation: string;
  
  if (ecart >= 15) {
    gravite = 'critique';
    recommendation = `Correction URGENTE nécessaire. Écart de ${ecart.toFixed(1)}% peut entraîner des erreurs majeures d'évaluation.`;
  } else if (ecart >= 8) {
    gravite = 'moyenne';
    recommendation = `Correction recommandée. Écart de ${ecart.toFixed(1)}% peut impacter l'évaluation.`;
  } else {
    gravite = 'mineure';
    recommendation = `Vérifier et ajuster si nécessaire. Écart de ${ecart.toFixed(1)}% reste dans une marge acceptable.`;
  }
  
  return {
    libelleWord: comp.libelleWord,
    libelleApp: comp.libelleApp,
    ippWord: comp.ippWord!,
    ippApp: comp.ippApp,
    ecart,
    gravite,
    recommendation
  };
}

/**
 * Générer le rapport Markdown
 */
function generateMarkdownReport(results: ComparisonResult[]): string {
  let md = `# RAPPORT D'ANALYSE COMPARATIVE EXHAUSTIVE\n\n`;
  md += `**Date:** ${new Date().toLocaleDateString('fr-FR')}\n\n`;
  md += `**Sources comparées:**\n`;
  md += `- 📄 **Word:** extracted_word_content.json (Barèmes AT et IPP officiels)\n`;
  md += `- 💻 **Application:** algerianBareme1967.ts + mayetReyComplement.ts\n\n`;
  md += `---\n\n`;
  
  // Résumé exécutif
  md += `## 📊 RÉSUMÉ EXÉCUTIF\n\n`;
  
  let totalPresentes = 0;
  let totalManquentApp = 0;
  let totalManquentWord = 0;
  let totalDivergences = 0;
  let divergencesCritiques = 0;
  let divergencesMoyennes = 0;
  let divergencesMineures = 0;
  
  for (const result of results) {
    totalPresentes += result.presentes.length;
    totalManquentApp += result.manquentDansApp.length;
    totalManquentWord += result.manquentDansWord.length;
    totalDivergences += result.divergencesIPP.length;
    
    for (const div of result.divergencesIPP) {
      if (div.gravite === 'critique') divergencesCritiques++;
      else if (div.gravite === 'moyenne') divergencesMoyennes++;
      else divergencesMineures++;
    }
  }
  
  md += `### Statistiques globales\n\n`;
  md += `| Métrique | Nombre |\n`;
  md += `|----------|--------|\n`;
  md += `| ✅ Séquelles présentes dans les deux sources | **${totalPresentes}** |\n`;
  md += `| ⚠️ Séquelles Word ABSENTES de l'application | **${totalManquentApp}** |\n`;
  md += `| ℹ️ Séquelles app ABSENTES du Word | **${totalManquentWord}** |\n`;
  md += `| 🔴 Divergences IPP CRITIQUES (écart ≥ 15%) | **${divergencesCritiques}** |\n`;
  md += `| 🟠 Divergences IPP MOYENNES (écart 8-14%) | **${divergencesMoyennes}** |\n`;
  md += `| 🟡 Divergences IPP MINEURES (écart 2-7%) | **${divergencesMineures}** |\n`;
  md += `| **TOTAL Divergences IPP** | **${totalDivergences}** |\n\n`;
  
  md += `### 🎯 Actions prioritaires\n\n`;
  
  if (divergencesCritiques > 0) {
    md += `🔴 **URGENT:** ${divergencesCritiques} divergences critiques à corriger immédiatement\n\n`;
  }
  
  if (totalManquentApp > 0) {
    md += `⚠️ **IMPORTANT:** ${totalManquentApp} séquelles du barème officiel manquent dans l'application\n\n`;
  }
  
  if (divergencesMoyennes > 0) {
    md += `🟠 **À TRAITER:** ${divergencesMoyennes} divergences moyennes à vérifier et corriger\n\n`;
  }
  
  md += `---\n\n`;
  
  // Détail par zone
  md += `## 📋 ANALYSE DÉTAILLÉE PAR ZONE ANATOMIQUE\n\n`;
  
  for (const result of results) {
    md += `### 🔹 ${result.zone}\n\n`;
    
    // Statistiques zone
    md += `**Statistiques:**\n`;
    md += `- Séquelles Word détectées: ${result.sequellesWord.length}\n`;
    md += `- Séquelles App: ${result.sequellesApp.length}\n`;
    md += `- Correspondances trouvées: ${result.presentes.length}\n`;
    md += `- Manquent dans App: ${result.manquentDansApp.length}\n`;
    md += `- Manquent dans Word: ${result.manquentDansWord.length}\n`;
    md += `- Divergences IPP: ${result.divergencesIPP.length}\n\n`;
    
    // Divergences IPP critiques et moyennes
    const critiques = result.divergencesIPP.filter(d => d.gravite === 'critique');
    const moyennes = result.divergencesIPP.filter(d => d.gravite === 'moyenne');
    const mineures = result.divergencesIPP.filter(d => d.gravite === 'mineure');
    
    if (critiques.length > 0) {
      md += `#### 🔴 DIVERGENCES CRITIQUES (${critiques.length})\n\n`;
      md += `| Libellé Word | Libellé App | IPP Word | IPP App | Écart | Recommandation |\n`;
      md += `|--------------|-------------|----------|---------|-------|----------------|\n`;
      
      for (const div of critiques) {
        const ippWordStr = typeof div.ippWord === 'number' ? `${div.ippWord}%` : `${div.ippWord.min}-${div.ippWord.max}%`;
        const ippAppStr = Array.isArray(div.ippApp) ? `${div.ippApp[0]}-${div.ippApp[1]}%` : `${div.ippApp}%`;
        md += `| ${div.libelleWord} | ${div.libelleApp} | ${ippWordStr} | ${ippAppStr} | **${div.ecart.toFixed(1)}%** | ${div.recommendation} |\n`;
      }
      md += `\n`;
    }
    
    if (moyennes.length > 0) {
      md += `#### 🟠 DIVERGENCES MOYENNES (${moyennes.length})\n\n`;
      md += `| Libellé Word | Libellé App | IPP Word | IPP App | Écart | Recommandation |\n`;
      md += `|--------------|-------------|----------|---------|-------|----------------|\n`;
      
      for (const div of moyennes) {
        const ippWordStr = typeof div.ippWord === 'number' ? `${div.ippWord}%` : `${div.ippWord.min}-${div.ippWord.max}%`;
        const ippAppStr = Array.isArray(div.ippApp) ? `${div.ippApp[0]}-${div.ippApp[1]}%` : `${div.ippApp}%`;
        md += `| ${div.libelleWord} | ${div.libelleApp} | ${ippWordStr} | ${ippAppStr} | ${div.ecart.toFixed(1)}% | ${div.recommendation} |\n`;
      }
      md += `\n`;
    }
    
    // Séquelles manquantes dans l'app (TOP 20 par zone)
    if (result.manquentDansApp.length > 0) {
      md += `#### ⚠️ SÉQUELLES WORD ABSENTES DE L'APPLICATION (${result.manquentDansApp.length})\n\n`;
      md += `> 🚨 Ces séquelles sont dans le barème officiel mais manquent dans l'application\n\n`;
      md += `| Libellé (Word) | IPP | Source |\n`;
      md += `|----------------|-----|--------|\n`;
      
      const top20 = result.manquentDansApp.slice(0, 20);
      for (const seq of top20) {
        const ippStr = typeof seq.ipp === 'number' ? `${seq.ipp}%` : `${seq.ipp?.min}-${seq.ipp?.max}%`;
        md += `| ${seq.libelle} | ${ippStr} | ${seq.source} |\n`;
      }
      
      if (result.manquentDansApp.length > 20) {
        md += `\n*... et ${result.manquentDansApp.length - 20} autres séquelles*\n`;
      }
      md += `\n`;
    }
    
    // Séquelles app non trouvées dans Word (info)
    if (result.manquentDansWord.length > 0 && result.manquentDansWord.length <= 10) {
      md += `#### ℹ️ SÉQUELLES APP ABSENTES DU WORD (${result.manquentDansWord.length})\n\n`;
      md += `> Ces séquelles sont dans l'app mais non trouvées dans le Word (peut être normal si ajouts Mayet-Rey)\n\n`;
      md += `| Libellé (App) | IPP | Source |\n`;
      md += `|---------------|-----|--------|\n`;
      
      for (const seq of result.manquentDansWord) {
        const ippStr = Array.isArray(seq.ipp) ? `${seq.ipp[0]}-${seq.ipp[1]}%` : `${seq.ipp}%`;
        md += `| ${seq.libelle} | ${ippStr} | ${seq.source} |\n`;
      }
      md += `\n`;
    }
    
    md += `---\n\n`;
  }
  
  // Corrections prioritaires
  md += `## 🛠️ LISTE DES CORRECTIONS PRIORITAIRES\n\n`;
  md += `### 1. Corrections URGENTES (Divergences critiques)\n\n`;
  
  let urgentCount = 1;
  for (const result of results) {
    const critiques = result.divergencesIPP.filter(d => d.gravite === 'critique');
    if (critiques.length > 0) {
      for (const div of critiques) {
        md += `#### ${urgentCount}. ${result.zone} - ${div.libelleApp}\n\n`;
        md += `**Problème:** Écart de ${div.ecart.toFixed(1)}% entre Word et App\n\n`;
        md += `- **Word:** ${div.libelleWord}\n`;
        const ippWordStr = typeof div.ippWord === 'number' ? `${div.ippWord}%` : `${div.ippWord.min}-${div.ippWord.max}%`;
        md += `- **IPP Word:** ${ippWordStr}\n`;
        md += `- **App:** ${div.libelleApp}\n`;
        const ippAppStr = Array.isArray(div.ippApp) ? `${div.ippApp[0]}-${div.ippApp[1]}%` : `${div.ippApp}%`;
        md += `- **IPP App:** ${ippAppStr}\n`;
        md += `- **Recommandation:** ${div.recommendation}\n\n`;
        
        md += `**Code TypeScript à corriger:**\n\`\`\`typescript\n`;
        md += `// AVANT (incorrect)\n`;
        if (Array.isArray(div.ippApp)) {
          md += `rate: [${div.ippApp[0]}, ${div.ippApp[1]}],\n`;
        } else {
          md += `rate: ${div.ippApp},\n`;
        }
        md += `\n// APRÈS (correct selon Word)\n`;
        if (typeof div.ippWord === 'number') {
          md += `rate: ${div.ippWord},\n`;
        } else {
          md += `rate: [${div.ippWord.min}, ${div.ippWord.max}],\n`;
        }
        md += `\`\`\`\n\n`;
        
        urgentCount++;
      }
    }
  }
  
  md += `### 2. Séquelles à AJOUTER dans l'application\n\n`;
  
  let ajoutCount = 1;
  for (const result of results) {
    if (result.manquentDansApp.length > 0) {
      md += `#### ${result.zone}\n\n`;
      
      const top10 = result.manquentDansApp.slice(0, 10);
      for (const seq of top10) {
        md += `${ajoutCount}. **${seq.libelle}**\n`;
        const ippStr = typeof seq.ipp === 'number' ? `${seq.ipp}` : `[${seq.ipp?.min}, ${seq.ipp?.max}]`;
        md += `   - IPP: ${ippStr}\n`;
        md += `   - Source: ${seq.source}\n\n`;
        
        md += `   **Code TypeScript à ajouter:**\n\`\`\`typescript\n`;
        md += `   {\n`;
        md += `     name: "${seq.libelle}",\n`;
        md += `     rate: ${ippStr},\n`;
        md += `     description: "Selon barème ${seq.source}"\n`;
        md += `   },\n`;
        md += `   \`\`\`\n\n`;
        
        ajoutCount++;
      }
      
      if (result.manquentDansApp.length > 10) {
        md += `   *... et ${result.manquentDansApp.length - 10} autres séquelles à ajouter*\n\n`;
      }
    }
  }
  
  return md;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🔍 Démarrage de l\'analyse comparative exhaustive...\n');
  
  // Charger les données Word
  const wordDataPath = './extracted_word_content.json';
  console.log(`📄 Chargement du fichier Word: ${wordDataPath}`);
  
  if (!fs.existsSync(wordDataPath)) {
    console.error(`❌ Erreur: Le fichier ${wordDataPath} n'existe pas`);
    console.error(`   Veuillez d'abord extraire les données du fichier Word.`);
    process.exit(1);
  }
  
  const wordData: WordData = JSON.parse(fs.readFileSync(wordDataPath, 'utf-8'));
  console.log(`✅ Fichier Word chargé`);
  console.log(`   - Sections BAREME_AT: ${Object.keys(wordData.BAREME_AT).length}`);
  console.log(`   - Sections IPP: ${Object.keys(wordData.IPP).length}\n`);
  
  // Charger les données de l'application
  console.log(`💻 Chargement des données de l'application...`);
  const allAppCategories = [...algerianBareme1967, ...mayetReyComplement];
  console.log(`✅ Données app chargées: ${allAppCategories.length} catégories principales\n`);
  
  // Analyser chaque zone
  console.log(`🔬 Analyse des zones anatomiques...\n`);
  const results: ComparisonResult[] = [];
  
  for (const zone of ZONES_PRIORITAIRES) {
    console.log(`   📍 Analyse: ${zone.word}...`);
    
    // Extraire séquelles Word
    const wordSequelles = extractWordSequelles(wordData, zone.word);
    
    // Extraire séquelles App
    const appSequelles = extractAppSequelles(allAppCategories, zone.app);
    
    // Comparer
    const comparison = compareZone(wordSequelles, appSequelles);
    
    results.push({
      zone: zone.word,
      sequellesWord: wordSequelles,
      sequellesApp: appSequelles,
      ...comparison
    });
    
    console.log(`      ✓ Word: ${wordSequelles.length} séquelles`);
    console.log(`      ✓ App: ${appSequelles.length} séquelles`);
    console.log(`      ✓ Correspondances: ${comparison.presentes.length}`);
    console.log(`      ✓ Divergences IPP: ${comparison.divergencesIPP.length}`);
    console.log(``);
  }
  
  // Générer le rapport
  console.log(`📝 Génération du rapport Markdown...\n`);
  const reportMd = generateMarkdownReport(results);
  
  // Sauvegarder le rapport
  const reportPath = './RAPPORT_ANALYSE_COMPARATIVE_EXHAUSTIVE.md';
  fs.writeFileSync(reportPath, reportMd, 'utf-8');
  console.log(`✅ Rapport sauvegardé: ${reportPath}\n`);
  
  // Sauvegarder aussi en JSON pour analyse ultérieure
  const jsonPath = './analyse_comparative_resultats.json';
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`✅ Données JSON sauvegardées: ${jsonPath}\n`);
  
  console.log(`🎉 Analyse terminée avec succès!`);
}

// Exécuter
main().catch(console.error);
