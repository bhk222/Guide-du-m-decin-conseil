import fs from 'fs';
import path from 'path';

console.log("🔍 Intégration intelligente des lésions supplémentaires (sans doublons)\n");

// Lire le fichier des lésions supplémentaires
const supplementaryPath = path.join(process.cwd(), 'data', 'lesions_supplementaires.txt');
const supplementaryContent = fs.readFileSync(supplementaryPath, 'utf-8');

// Lire le fichier disabilityRates.ts actuel
const disabilityRatesPath = path.join(process.cwd(), 'data', 'disabilityRates.ts');
const currentContent = fs.readFileSync(disabilityRatesPath, 'utf-8');

// Extraire toutes les lésions du fichier actuel
const currentInjuries = [];
const currentRegex = /{\s*name:\s*"([^"]+)",\s*rate:/g;
let match;
while ((match = currentRegex.exec(currentContent)) !== null) {
  currentInjuries.push(match[1].toLowerCase().trim());
}

console.log(`📊 Base de données actuelle : ${currentInjuries.length} lésions`);

// Fonction pour normaliser les noms (pour détection des doublons)
function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Enlever les accents
    .replace(/[^\w\s-]/g, '') // Enlever la ponctuation
    .replace(/\s+/g, ' '); // Normaliser les espaces
}

// Fonction pour vérifier si une lésion existe déjà
function isDuplicate(lesionName) {
  const normalizedNew = normalize(lesionName);
  
  for (const existing of currentInjuries) {
    const normalizedExisting = normalize(existing);
    
    // Vérifier les correspondances exactes ou très proches
    if (normalizedExisting === normalizedNew) {
      return true;
    }
    
    // Vérifier si les 30 premiers caractères correspondent (pour les lésions longues)
    if (normalizedExisting.substring(0, 30) === normalizedNew.substring(0, 30)) {
      return true;
    }
  }
  
  return false;
}

// Extraire UNIQUEMENT les lésions non-doublons
const newLesions = [];
const skippedDuplicates = [];

// Parser le fichier supplémentaire injury par injury
const injuryRegex = /{\s*name:\s*"([^"]+)",\s*rate:\s*(\[[^\]]+\]|\d+),\s*description:\s*"([^"]+)",?\s*(rateCriteria:\s*{[^}]+})?\s*}/gs;

let injuryMatch;
while ((injuryMatch = injuryRegex.exec(supplementaryContent)) !== null) {
  const lesionName = injuryMatch[1];
  const fullInjuryText = injuryMatch[0];
  
  if (isDuplicate(lesionName)) {
    skippedDuplicates.push(lesionName);
    console.log(`  ⏭️  DOUBLON ignoré : "${lesionName}"`);
  } else {
    newLesions.push({
      name: lesionName,
      code: fullInjuryText
    });
    console.log(`  ✅ NOUVEAU : "${lesionName}"`);
  }
}

console.log(`\n📊 Résumé :`);
console.log(`   ✅ Nouvelles lésions à ajouter : ${newLesions.length}`);
console.log(`   ⏭️  Doublons ignorés : ${skippedDuplicates.length}`);
console.log(`   📈 Total après intégration : ${currentInjuries.length + newLesions.length} lésions\n`);

if (newLesions.length === 0) {
  console.log("✅ Toutes les lésions supplémentaires sont déjà dans la base de données !");
  console.log("   Aucune modification nécessaire.\n");
  process.exit(0);
}

// Organiser les nouvelles lésions par catégorie
const categories = {
  endocrine: [],
  infectious: [],
  hematologic: [],
  dermatologic: [],
  obstetric: [],
  amputations: [],
  psychiatric: []
};

for (const lesion of newLesions) {
  const name = lesion.name.toLowerCase();
  
  if (name.includes('diabète') || name.includes('insuffisance surrénalienne')) {
    categories.endocrine.push(lesion);
  } else if (name.includes('ostéomyélite') || name.includes('fasciite') || name.includes('tétanos')) {
    categories.infectious.push(lesion);
  } else if (name.includes('anémie') || name.includes('coagulation')) {
    categories.hematologic.push(lesion);
  } else if (name.includes('cicatrice') || name.includes('chéloïde') || name.includes('vitiligo')) {
    categories.dermatologic.push(lesion);
  } else if (name.includes('déchirure périnéale') || name.includes('prolapsus')) {
    categories.obstetric.push(lesion);
  } else if (name.includes('amputation d\'un membre supérieur et d\'un membre inférieur')) {
    categories.amputations.push(lesion);
  } else if (name.includes('dépression') || name.includes('schizophrénie')) {
    categories.psychiatric.push(lesion);
  }
}

// Générer le code TypeScript à insérer
console.log("📝 Génération du code TypeScript pour les nouvelles lésions...\n");

let insertionCode = "";

// Section Endocrinologie (si nouvelles lésions)
if (categories.endocrine.length > 0) {
  insertionCode += `
  // ========================================
  // TROUBLES ENDOCRINIENS ET MÉTABOLIQUES
  // Ajouté automatiquement le ${new Date().toLocaleDateString('fr-FR')}
  // ========================================
  {
    name: "Séquelles Endocriniennes et Métaboliques",
    subcategories: [
      {
        name: "Troubles Endocriniens Post-Traumatiques",
        injuries: [\n`;
  
  categories.endocrine.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.endocrine.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Section Infections (si nouvelles lésions)
if (categories.infectious.length > 0) {
  insertionCode += `
  // ========================================
  // INFECTIONS POST-TRAUMATIQUES
  // ========================================
  {
    name: "Séquelles de Maladies Infectieuses Post-Traumatiques",
    subcategories: [
      {
        name: "Infections Graves",
        injuries: [\n`;
  
  categories.infectious.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.infectious.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Section Hématologie (si nouvelles lésions)
if (categories.hematologic.length > 0) {
  insertionCode += `
  // ========================================
  // SÉQUELLES HÉMATOLOGIQUES
  // ========================================
  {
    name: "Séquelles Hématologiques",
    subcategories: [
      {
        name: "Troubles Hématologiques Post-Traumatiques",
        injuries: [\n`;
  
  categories.hematologic.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.hematologic.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Section Dermatologie (si nouvelles lésions)
if (categories.dermatologic.length > 0) {
  insertionCode += `
  // ========================================
  // SÉQUELLES DERMATOLOGIQUES
  // ========================================
  {
    name: "Séquelles Dermatologiques Étendues",
    subcategories: [
      {
        name: "Cicatrices et Troubles Pigmentaires",
        injuries: [\n`;
  
  categories.dermatologic.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.dermatologic.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Section Obstétrique (si nouvelles lésions)
if (categories.obstetric.length > 0) {
  insertionCode += `
  // ========================================
  // SÉQUELLES OBSTÉTRICALES
  // ========================================
  {
    name: "Séquelles Obstétricales et Gynécologiques Post-Traumatiques",
    subcategories: [
      {
        name: "Traumatismes Obstétricaux",
        injuries: [\n`;
  
  categories.obstetric.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.obstetric.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Section Amputations (si nouvelles lésions)
if (categories.amputations.length > 0) {
  insertionCode += `
  // ========================================
  // POLYHANDICAP - AMPUTATIONS MULTIPLES
  // ========================================
  {
    name: "Polyhandicap et Amputations Multiples",
    subcategories: [
      {
        name: "Amputations Combinées",
        injuries: [\n`;
  
  categories.amputations.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.amputations.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Section Psychiatrie (si nouvelles lésions)
if (categories.psychiatric.length > 0) {
  insertionCode += `
  // ========================================
  // TROUBLES PSYCHIATRIQUES SÉVÈRES
  // ========================================
  {
    name: "Séquelles Psychiatriques Sévères",
    subcategories: [
      {
        name: "Troubles Psychiatriques Post-Traumatiques",
        injuries: [\n`;
  
  categories.psychiatric.forEach((lesion, index) => {
    insertionCode += `          ${lesion.code}`;
    if (index < categories.psychiatric.length - 1) insertionCode += ',';
    insertionCode += '\n';
  });
  
  insertionCode += `        ]
      }
    ]
  },\n`;
}

// Trouver la position d'insertion (avant le dernier crochet fermant)
const lastBracketIndex = currentContent.lastIndexOf('];');

if (lastBracketIndex === -1) {
  console.error("❌ Erreur : impossible de trouver la fin du tableau dans disabilityRates.ts");
  process.exit(1);
}

// Créer le nouveau contenu
const beforeArray = currentContent.substring(0, lastBracketIndex);
const afterArray = currentContent.substring(lastBracketIndex);

const newContent = beforeArray + ',' + insertionCode + afterArray;

// Sauvegarder
const backupPath = path.join(process.cwd(), 'data', 'disabilityRates.backup.ts');
const newPath = path.join(process.cwd(), 'data', 'disabilityRates.new.ts');

fs.writeFileSync(backupPath, currentContent);
fs.writeFileSync(newPath, newContent);

console.log(`✅ Fichiers générés :`);
console.log(`   📄 Backup : data/disabilityRates.backup.ts`);
console.log(`   📄 Nouveau fichier : data/disabilityRates.new.ts\n`);

console.log(`📋 Détails des ajouts :`);
if (categories.endocrine.length > 0) console.log(`   🔬 Endocrinologie : ${categories.endocrine.length} lésions`);
if (categories.infectious.length > 0) console.log(`   🦠 Infections : ${categories.infectious.length} lésions`);
if (categories.hematologic.length > 0) console.log(`   🩸 Hématologie : ${categories.hematologic.length} lésions`);
if (categories.dermatologic.length > 0) console.log(`   🔬 Dermatologie : ${categories.dermatologic.length} lésions`);
if (categories.obstetric.length > 0) console.log(`   👶 Obstétrique : ${categories.obstetric.length} lésions`);
if (categories.amputations.length > 0) console.log(`   🦾 Amputations : ${categories.amputations.length} lésions`);
if (categories.psychiatric.length > 0) console.log(`   🧠 Psychiatrie : ${categories.psychiatric.length} lésions\n`);

console.log(`\n📋 PROCHAINES ÉTAPES :`);
console.log(`   1. Examiner data/disabilityRates.new.ts`);
console.log(`   2. Si OK, appliquer : mv data/disabilityRates.new.ts data/disabilityRates.ts`);
console.log(`   3. Vérifier la compilation : npm run build`);
console.log(`   4. Tester l'application\n`);
