// Script pour extraire les vrais codes NGAP depuis le fichier texte
import { readFileSync, writeFileSync } from 'fs';

console.log('🔧 Correction des codes NGAP...\n');

// Lire le fichier texte original
const textContent = readFileSync('acte_extracted_clean.txt', 'utf-8');
const lines = textContent.split('\n');

// Lire le JSON existant
const jsonData = JSON.parse(readFileSync('data/nomenclature-complete.json', 'utf-8'));
const actes = jsonData.actes;

// Map pour stocker les vrais codes NGAP (lettre-clé + coefficient)
const ngapCodes = new Map();

console.log('📖 Extraction des codes NGAP depuis le fichier texte...');

let extracted = 0;
for (const line of lines) {
    // Format: CODE Description... LETTRE COEFFICIENT
    // Ex: 1684 Thyréostim,line (TSH)... B 70
    const match = line.match(/^(\d+|[\w\/-]+)\s+(.+?)\s+([A-Z])\s+(\d+)\s*$/);
    
    if (match) {
        const [, code, description, lettre, coef] = match;
        ngapCodes.set(code.trim(), {
            lettre: lettre.trim(),
            coefficient: parseInt(coef)
        });
        extracted++;
    }
}

console.log(`✅ Extrait ${extracted} codes NGAP du fichier texte\n`);

// Corriger les actes dans le JSON
let corrected = 0;
let notFound = 0;

console.log('🔄 Correction des données JSON...');

for (const acte of actes) {
    const ngapInfo = ngapCodes.get(acte.code);
    
    if (ngapInfo) {
        // Corriger la lettre-clé si elle ne correspond pas
        if (acte.lettreCle !== ngapInfo.lettre) {
            console.log(`  ⚠️  ${acte.code}: lettreCle "${acte.lettreCle}" → "${ngapInfo.lettre}"`);
            acte.lettreCle = ngapInfo.lettre;
            corrected++;
        }
        
        // Vérifier le coefficient
        if (acte.coefficient !== ngapInfo.coefficient) {
            console.log(`  ⚠️  ${acte.code}: coefficient ${acte.coefficient} → ${ngapInfo.coefficient}`);
            acte.coefficient = ngapInfo.coefficient;
        }
        
        // Ajouter le code NGAP complet
        acte.codeNGAP = `${ngapInfo.lettre} ${ngapInfo.coefficient}`;
    } else {
        notFound++;
    }
}

console.log(`\n✅ Corrigé ${corrected} actes`);
console.log(`⚠️  ${notFound} actes non trouvés dans le fichier texte`);

// Sauvegarder le JSON corrigé
writeFileSync('data/nomenclature-complete-fixed.json', JSON.stringify(jsonData, null, 2));
writeFileSync('public/nomenclature-complete.json', JSON.stringify(jsonData, null, 2));

console.log('\n✅ Fichiers sauvegardés:');
console.log('   - data/nomenclature-complete-fixed.json');
console.log('   - public/nomenclature-complete.json');

// Afficher un exemple de correction
const exemple = actes.find(a => a.code === '1684');
if (exemple) {
    console.log('\n📋 Exemple (TSH):');
    console.log(`   Code: ${exemple.code}`);
    console.log(`   Libellé: ${exemple.libelle}`);
    console.log(`   Lettre-clé: ${exemple.lettreCle}`);
    console.log(`   Coefficient: ${exemple.coefficient}`);
    console.log(`   Code NGAP: ${exemple.codeNGAP}`);
}

console.log('\n🎉 Correction terminée !');
