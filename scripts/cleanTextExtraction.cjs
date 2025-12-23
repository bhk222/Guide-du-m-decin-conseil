// Script de nettoyage du texte extrait du PDF
const fs = require('fs');
const path = require('path');

function cleanText(text) {
    let cleaned = text;
    
    // Corrections des erreurs OCR communes
    const corrections = [
        // Erreurs de caractères
        [/ral:tiale/g, 'radiale'],
        [/l'~ktt:ë/g, "l'extrémité"],
        [/I·~ktt:ë/g, "l'extrémité"],
        [/det'avant/g, "de l'avant"],
        [/de J'un/g, "de l'un"],
        [/de l'avant-bra\$/g, "de l'avant-bras"],
        [/Mem~re/g, 'Membre'],
        [/t\.Jne/g, 'Une'],
        [/r \. , • l \./g, ''],
        [/extrémitè/g, 'extrémité'],
        [/san 5/g, 'sans'],
        [/coude\./g, 'coude,'],
        [/épaule\./g, 'épaule,'],
        [/rachis\./g, 'rachis,'],
        [/hanche\./g, 'hanche,'],
        
        // Codes avec erreurs
        [/00 0(\d)/g, '000$1'],
        [/o 0(\d)/g, '00$1'],
        [/o '0(\d)/g, '00$1'],
        [/00 (\d)/g, '00$1'],
        [/{?\) 0(\d)/g, '00$1'],
        [/0021\.\/2/g, '0022/2'],
        [/0(\d{3})\.\/(\d)/g, '0$1/$2'],
        
        // "o" au lieu de "0" dans les codes
        [/^o (\d{3})/gm, '0$1'],
        [/^o(\d{3})/gm, '0$1'],
        
        // Chiffres mal reconnus
        [/\bi(\d{2,})/g, '1$1'],
        [/(\d)i(\d)/g, '$11$2'],
        [/i20/g, '120'],
        [/i50/g, '150'],
        [/O(\d)/g, '0$1'], // O majuscule en début de nombre
        [/(\d)O(\d)/g, '$10$2'], // O majuscule au milieu
        
        // Corrections orthographiques médicales
        [/Astragle/g, 'Astragale'],
        [/malléole/g, 'malléole'],
        [/Humérusl/g, 'Humérus'],
        [/èurebord/g, 'du rebord'],
        [/Fractur0S/g, 'Fractures'],
        [/frJilcture/g, 'fracture'],
        [/sanQlante/g, 'sanglante'],
        [/chiff\.tes/g, 'chiffres'],
        [/ajoûter/g, 'ajouter'],
        [/aprés/g, 'après'],
        [/COllde/g, 'Coude'],
        [/Traitemel1l/g, 'Traitement'],
        
        // Mots mal séparés
        [/,même/g, ', même'],
        [/là plaie/g, 'la plaie'],
        
        // Espaces en trop
        [/\s+\./g, '.'],
        [/\.\s+\./g, '.'],
        [/\s+,/g, ','],
        [/\s+;/g, ';'],
        [/\s+:/g, ':'],
        
        // Caractères spéciaux mal encodés
        [/'/g, "'"],
        [/'/g, "'"],
        [/"/g, '"'],
        [/"/g, '"'],
        [/–/g, '-'],
        [/—/g, '-'],
        [/…/g, '...'],
        [/￾/g, ''],
        
        // Nettoyage des points de séparation excessifs
        [/\s*[\.•o]{10,}\s*/g, ' ... '],
        [/\s*[\.•]{5,9}\s*/g, ' .. '],
    ];
    
    corrections.forEach(([pattern, replacement]) => {
        cleaned = cleaned.replace(pattern, replacement);
    });
    
    // Nettoyer les lignes
    cleaned = cleaned.split('\n').map(line => {
        line = line.trim();
        
        // Corriger les codes au début de ligne
        if (/^[oO]\s*\d{3}/.test(line)) {
            line = line.replace(/^[oO]\s*/, '0');
        }
        
        // Supprimer les espaces multiples
        line = line.replace(/\s{2,}/g, ' ');
        
        return line;
    }).join('\n');
    
    return cleaned;
}

async function cleanAndSave() {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('🧹 NETTOYAGE DU TEXTE EXTRAIT');
    console.log('═══════════════════════════════════════════════════\n');
    
    const inputPath = path.join(__dirname, '..', 'acte_extracted.txt');
    const outputPath = path.join(__dirname, '..', 'acte_extracted_clean.txt');
    
    if (!fs.existsSync(inputPath)) {
        console.error('❌ Fichier acte_extracted.txt non trouvé !');
        process.exit(1);
    }
    
    console.log('📂 Lecture du fichier original...');
    const originalText = fs.readFileSync(inputPath, 'utf-8');
    console.log(`   ${originalText.length} caractères`);
    
    console.log('\n🔧 Nettoyage en cours...');
    const cleanedText = cleanText(originalText);
    console.log(`   ${cleanedText.length} caractères après nettoyage`);
    
    console.log('\n💾 Sauvegarde...');
    fs.writeFileSync(outputPath, cleanedText, 'utf-8');
    console.log(`   ✅ Fichier nettoyé: ${outputPath}`);
    
    // Remplacer l'original
    fs.copyFileSync(outputPath, inputPath);
    console.log(`   ✅ Fichier original mis à jour`);
    
    // Statistiques
    const diffSize = originalText.length - cleanedText.length;
    const diffPercent = ((diffSize / originalText.length) * 100).toFixed(2);
    
    console.log('\n📊 STATISTIQUES:');
    console.log('═══════════════════════════════════════════════════');
    console.log(`   Taille originale:  ${originalText.length} caractères`);
    console.log(`   Taille nettoyée:   ${cleanedText.length} caractères`);
    console.log(`   Réduction:         ${Math.abs(diffSize)} caractères (${Math.abs(diffPercent)}%)`);
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('✅ NETTOYAGE TERMINÉ !');
    console.log('═══════════════════════════════════════════════════\n');
    console.log('🚀 Prochaine étape:');
    console.log('   node scripts/parseFromText.cjs\n');
}

cleanAndSave().catch(err => {
    console.error('\n❌ ERREUR:', err.message);
    process.exit(1);
});
