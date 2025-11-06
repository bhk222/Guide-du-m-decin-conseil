/**
 * Audit médico-légal simplifié - Analyse directe des fichiers
 */

import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Lire et parser le fichier disabilityRates.ts
const disabilityRatesPath = path.join(dataDir, 'disabilityRates.ts');
const content = fs.readFileSync(disabilityRatesPath, 'utf-8');

console.log('🔍 AUDIT MÉDICO-LÉGAL - ANALYSE DES DONNÉES\n');
console.log('═══════════════════════════════════════════════\n');

// Statistiques de base
const injuries = content.match(/\{\s*name:\s*["']([^"']+)["']/g) || [];
const rateRanges = content.match(/rate:\s*\[(\d+),\s*(\d+)\]/g) || [];
const fixedRates = content.match(/rate:\s*(\d+)(?!,)/g) || [];

console.log('📊 STATISTIQUES GÉNÉRALES:');
console.log(`   Total de lésions détectées: ${injuries.length}`);
console.log(`   Taux avec fourchettes: ${rateRanges.length}`);
console.log(`   Taux fixés: ${fixedRates.length}\n`);

// Analyse des incohérences
console.log('🔍 ANALYSE DES INCOHÉRENCES:\n');

let issues = [];

// 1. Fourchettes inversées ou incohérentes
rateRanges.forEach((range, idx) => {
    const match = range.match(/rate:\s*\[(\d+),\s*(\d+)\]/);
    if (match) {
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        if (min >= max) {
            issues.push({
                type: 'ERREUR CRITIQUE',
                message: `Fourchette inversée: [${min}, ${max}]`,
                line: idx + 1
            });
        }
        if (max - min > 50) {
            issues.push({
                type: 'AVERTISSEMENT',
                message: `Fourchette très large: [${min}, ${max}] (écart: ${max - min}%)`,
                line: idx + 1
            });
        }
    }
});

// 2. Lésions sans critères
const injuriesWithRanges = content.match(/\{\s*name:[^}]+rate:\s*\[[^\]]+\][^}]*?\}/gs) || [];
injuriesWithRanges.forEach((injury, idx) => {
    if (!injury.includes('rateCriteria')) {
        const nameMatch = injury.match(/name:\s*["']([^"']+)["']/);
        if (nameMatch) {
            issues.push({
                type: 'MANQUE',
                message: `Lésion "${nameMatch[1]}" : fourchette sans critères de gravité`,
                line: idx + 1
            });
        }
    }
});

// 3. Lésions main dominante sans contrepartie
const dominantHandInjuries = injuries.filter(inj => inj.includes('Main Dominante'));
dominantHandInjuries.forEach((inj) => {
    const name = inj.match(/name:\s*["']([^"']+)["']/)[1];
    const nonDominant = name.replace('Main Dominante', 'Main Non Dominante');
    if (!content.includes(nonDominant)) {
        issues.push({
            type: 'MANQUE',
            message: `Lésion "${name}" sans équivalent main non dominante`,
            suggestion: `Ajouter: "${nonDominant}"`
        });
    }
});

// 4. Lésions anatomiques manquantes communes
const commonLesions = [
    { name: 'Fracture tassement vertébral', region: 'Rachis' },
    { name: 'Hernie discale lombaire', region: 'Rachis' },
    { name: 'Entorse grave cheville', region: 'Cheville' },
    { name: 'Rupture ligament croisé', region: 'Genou' },
    { name: 'Fracture scaphoïde', region: 'Poignet' },
    { name: 'Syndrome canal carpien', region: 'Poignet' }
];

commonLesions.forEach(lesion => {
    const normalized = lesion.name.toLowerCase().replace(/[éèê]/g, 'e');
    const contentNormalized = content.toLowerCase().replace(/[éèê]/g, 'e');
    if (!contentNormalized.includes(normalized)) {
        issues.push({
            type: 'SUGGESTION',
            message: `Lésion courante potentiellement manquante: "${lesion.name}" (${lesion.region})`
        });
    }
});

// Afficher les issues
const errors = issues.filter(i => i.type === 'ERREUR CRITIQUE');
const warnings = issues.filter(i => i.type === 'AVERTISSEMENT');
const missing = issues.filter(i => i.type === 'MANQUE');
const suggestions = issues.filter(i => i.type === 'SUGGESTION');

console.log(`❌ ERREURS CRITIQUES (${errors.length}):`);
errors.slice(0, 5).forEach(err => console.log(`   • ${err.message}`));
if (errors.length > 5) console.log(`   ... et ${errors.length - 5} autres\n`);
else console.log('');

console.log(`⚠️  AVERTISSEMENTS (${warnings.length}):`);
warnings.slice(0, 5).forEach(warn => console.log(`   • ${warn.message}`));
if (warnings.length > 5) console.log(`   ... et ${warnings.length - 5} autres\n`);
else console.log('');

console.log(`📋 ÉLÉMENTS MANQUANTS (${missing.length}):`);
missing.slice(0, 10).forEach(miss => {
    console.log(`   • ${miss.message}`);
    if (miss.suggestion) console.log(`     → ${miss.suggestion}`);
});
if (missing.length > 10) console.log(`   ... et ${missing.length - 10} autres\n`);
else console.log('');

console.log(`💡 SUGGESTIONS D'AMÉLIORATION (${suggestions.length}):`);
suggestions.forEach(sug => console.log(`   • ${sug.message}`));
console.log('');

// Sauvegarder rapport
const outputDir = path.join(process.cwd(), 'audit_reports');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const report = {
    timestamp: new Date().toISOString(),
    statistics: {
        totalInjuries: injuries.length,
        rateRanges: rateRanges.length,
        fixedRates: fixedRates.length
    },
    issues: {
        errors: errors.length,
        warnings: warnings.length,
        missing: missing.length,
        suggestions: suggestions.length
    },
    details: issues
};

const reportPath = path.join(outputDir, `audit_report_${Date.now()}.json`);
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('═══════════════════════════════════════════════\n');
console.log(`📄 Rapport complet sauvegardé: ${reportPath}\n`);
console.log('✅ Audit terminé!\n');
