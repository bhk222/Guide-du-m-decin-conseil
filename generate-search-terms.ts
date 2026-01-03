/**
 * GÉNÉRATEUR AUTOMATIQUE DE SEARCHTERMS
 * Ajoute searchTerms intelligents aux 272+ entrées DB sans searchTerms
 * v3.3.138 - 03/01/2026
 */

import * as fs from 'fs';
import * as path from 'path';

// Dictionnaire de synonymes médicaux (extrait d'AiAnalyzer)
const medicalSynonyms: { [key: string]: string[] } = {
  genou: ['genou', 'genoux', 'fémoro-tibial', 'femorotibial'],
  lca: ['lca', 'ligament croisé antérieur', 'croisé antérieur', 'pivot central'],
  raideur: ['raideur', 'limitation', 'restriction', 'limité', 'restreint'],
  instabilité: ['instabilité', 'instable', 'laxité', 'laxe', 'dérobement'],
  cheville: ['cheville', 'tibio-tarsien', 'tibiotarsien'],
  epaule: ['épaule', 'epaule', 'scapulo-huméral', 'scapulohuméral'],
  coude: ['coude', 'huméro-cubital', 'olécrane'],
  poignet: ['poignet', 'radio-carpien', 'radiocarpien'],
  hanche: ['hanche', 'coxo-fémoral', 'coxofémoral'],
  rachis: ['rachis', 'colonne', 'vertèbre', 'vertébral'],
  cumul: ['cumul', 'combiné', 'associé', 'multiple'],
  polytraumatisme: ['polytraumatisme', 'poly-traumatisme', 'multiples lésions', 'lésions multiples'],
  fracture: ['fracture', 'cassure', 'bris'],
  amputation: ['amputation', 'ablation', 'perte'],
  menisque: ['ménisque', 'menisque', 'méniscectomie'],
  pilon: ['pilon tibial', 'pilon'],
  malleolaire: ['malléolaire', 'malleolaire', 'bimalléolaire', 'bi-malléolaire'],
  cotyle: ['cotyle', 'acétabulum', 'sourcil cotyloïdien'],
  sacrum: ['sacrum', 'sacré'],
  coiffe: ['coiffe', 'coiffe rotateurs', 'sus-épineux'],
  olecrane: ['olécrane', 'olecrane'],
  calcaneum: ['calcanéum', 'calcaneum', 'thalamique'],
  syndrome_cervical: ['syndrome cervical', 'cervicalgie'],
  col_femur: ['col fémur', 'col du fémur'],
  radius: ['radius', 'radial'],
  luxation: ['luxation', 'déboîtement'],
  plateaux_tibiaux: ['plateaux tibiaux', 'plateau tibial'],
  entorse: ['entorse', 'foulure'],
  arthrose: ['arthrose', 'gonarthrose', 'coxarthrose', 'omarthrose'],
  nerf: ['nerf', 'nerveux', 'sciatique', 'cubital', 'radial', 'fibulaire'],
  membre: ['membre', 'mi', 'ms'],
  superieur: ['supérieur', 'superieur', 'bras', 'avant-bras'],
  inferieur: ['inférieur', 'inferieur', 'jambe', 'cuisse'],
  tassement: ['tassement', 'tassé', 'compression'],
  dds: ['dds', 'distance doigts-sol'],
  dms: ['dms', 'distance menton-sternum'],
  vision: ['vision', 'visuel', 'oeil', 'œil'],
  audition: ['audition', 'auditif', 'surdité', 'hypoacousie'],
  rate: ['rate', 'splénectomie', 'splénique'],
  rein: ['rein', 'néphrectomie', 'rénal'],
  poumon: ['poumon', 'pulmonaire', 'lobectomie', 'pneumonectomie'],
  estomac: ['estomac', 'gastrique', 'gastrectomie'],
  colon: ['côlon', 'colon', 'colectomie'],
};

// Fonction de nettoyage et extraction des termes clés
function extractKeyTerms(name: string): string[] {
  // Nettoyer le texte
  let cleaned = name.toLowerCase()
    .replace(/\(cumul\)/gi, '')
    .replace(/\(polytraumatisme.*?\)/gi, '')
    .replace(/\(main dominante\)/gi, 'main dominante')
    .replace(/\(main non dominante\)/gi, 'main non dominante')
    .replace(/[+\-()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleaned.split(' ').filter(w => w.length > 2);
}

// Générer variations avec synonymes
function generateVariations(terms: string[]): string[] {
  const variations = new Set<string>();
  
  // Variation 1: ordre original
  variations.add(terms.join(' '));
  
  // Variation 2: avec synonymes principaux
  const withSynonyms = terms.map(term => {
    for (const [key, syns] of Object.entries(medicalSynonyms)) {
      if (syns.includes(term) && syns[0] !== term) {
        return syns[0];
      }
    }
    return term;
  });
  variations.add(withSynonyms.join(' '));
  
  // Variation 3: ordre inversé (pour cumuls)
  if (terms.length > 2) {
    const reversed = [...terms].reverse();
    variations.add(reversed.join(' '));
  }
  
  // Variation 4: termes principaux seulement (sans articles/prépositions)
  const mainTerms = terms.filter(t => 
    !['de', 'la', 'le', 'du', 'des', 'avec', 'sur', 'pour', 'sans', 'état', 'antérieur'].includes(t)
  );
  if (mainTerms.length !== terms.length) {
    variations.add(mainTerms.join(' '));
  }
  
  // Variation 5: paires de termes clés
  if (terms.length >= 3) {
    for (let i = 0; i < terms.length - 1; i++) {
      variations.add(`${terms[i]} ${terms[i+1]}`);
    }
  }
  
  return Array.from(variations).slice(0, 5); // Max 5 variations
}

// Fonction principale de génération
function generateSearchTerms(name: string): string[] {
  const keyTerms = extractKeyTerms(name);
  const variations = generateVariations(keyTerms);
  
  // Ajouter patterns spécifiques pour certains types
  const searchTerms = [...variations];
  
  // Pattern cumul
  if (name.includes('cumul')) {
    searchTerms.push(keyTerms.filter(t => t !== 'cumul').join(' '));
  }
  
  // Pattern état antérieur
  if (name.includes('état antérieur') || name.includes('sur état')) {
    const withoutEtat = keyTerms.filter(t => !['état', 'antérieur', 'sur'].includes(t));
    searchTerms.push(withoutEtat.join(' '));
    searchTerms.push('etat anterieur ' + withoutEtat.join(' '));
  }
  
  // Pattern polytraumatisme
  if (name.includes('polytraumatisme')) {
    searchTerms.push('polytraumatisme ' + keyTerms.filter(t => t !== 'polytraumatisme').join(' '));
  }
  
  return [...new Set(searchTerms)].slice(0, 6); // Max 6 searchTerms
}

// Lire et traiter le fichier  
async function processFile() {
  const filePath = path.join(process.cwd(), 'data', 'disabilityRates.new.ts');
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let modifiedCount = 0;
  
  // Utiliser regex pour trouver toutes les entrées { name: "...", rate: ..., description: "..." }
  // et y insérer searchTerms juste après "name: "...","
  
  const entryPattern = /(\{\s*name:\s*"([^"]+)",\s*)(rate:)/g;
  
  const newContent = content.replace(entryPattern, (match, prefix, name, rateKeyword) => {
    // Vérifier si searchTerms existe déjà dans cette entrée
    // On ne peut pas facilement vérifier avec regex, donc on génère toujours
    // (le replace ne modifiera que les entrées matchées)
    
    // Détecter si cette entrée a déjà searchTerms en regardant dans les 200 caractères suivants
    const contextStart = content.indexOf(match);
    const contextEnd = Math.min(contextStart + 500, content.length);
    const context = content.substring(contextStart, contextEnd);
    
    if (context.includes('searchTerms:')) {
      // Déjà présent, ne pas modifier
      return match;
    }
    
    const searchTerms = generateSearchTerms(name);
    const searchTermsStr = `searchTerms: [${searchTerms.map(t => `"${t}"`).join(', ')}], `;
    
    modifiedCount++;
    return `${prefix}${searchTermsStr}${rateKeyword}`;
  });
  
  // Écrire le fichier modifié
  fs.writeFileSync(filePath, newContent, 'utf-8');
  
  console.log(`\n✅ Génération terminée !`);
  console.log(`📊 ${modifiedCount} entrées modifiées`);
  console.log(`💾 Fichier sauvegardé: ${filePath}`);
}

// Exécuter
processFile().catch(console.error);
