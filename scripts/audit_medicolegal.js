/**
 * Script d'audit médico-légal des données
 * Vérifie la cohérence, complétude et exactitude des taux IPP
 * Génère un rapport de corrections à appliquer
 */

import { disabilityData } from '../data/disabilityRates.js';
import fs from 'fs';
import path from 'path';

// Règles d'audit médico-légal
const auditRules = {
    // Taux IPP cohérents
    rateConsistency: {
        name: "Cohérence des taux IPP",
        check: (injury) => {
            if (Array.isArray(injury.rate)) {
                const [min, max] = injury.rate;
                if (min >= max) return { valid: false, message: `Taux min (${min}) >= max (${max})` };
                if (min < 0 || max > 100) return { valid: false, message: `Taux hors limites: [${min}, ${max}]` };
                if (max - min > 50) return { valid: false, message: `Fourchette trop large: ${max - min}%` };
            } else {
                if (injury.rate < 0 || injury.rate > 100) return { valid: false, message: `Taux hors limites: ${injury.rate}%` };
            }
            return { valid: true };
        }
    },
    
    // Critères définis pour fourchettes
    rateCriteriaDefined: {
        name: "Critères de gravité définis",
        check: (injury) => {
            if (Array.isArray(injury.rate) && !injury.rateCriteria) {
                return { valid: false, message: "Fourchette sans critères low/medium/high définis" };
            }
            if (injury.rateCriteria) {
                if (!injury.rateCriteria.low || !injury.rateCriteria.high) {
                    return { valid: false, message: "Critères incomplets (manque low ou high)" };
                }
            }
            return { valid: true };
        }
    },
    
    // Dominance main
    handDominance: {
        name: "Cohérence main dominante/non dominante",
        check: (injury, allInjuries) => {
            const name = injury.name.toLowerCase();
            if (name.includes('main dominante')) {
                const counterpart = allInjuries.find(inj => 
                    inj.name.toLowerCase().replace('dominante', 'non dominante') === name.replace('dominante', 'non dominante')
                );
                if (!counterpart) {
                    return { valid: false, message: "Lésion main dominante sans équivalent main non dominante" };
                }
                if (Array.isArray(injury.rate) && Array.isArray(counterpart.rate)) {
                    if (injury.rate[0] <= counterpart.rate[0] || injury.rate[1] <= counterpart.rate[1]) {
                        return { valid: false, message: "Taux main dominante devrait être > main non dominante" };
                    }
                }
            }
            return { valid: true };
        }
    },
    
    // Lésions anatomiques complètes
    anatomicalCompleteness: {
        name: "Complétude anatomique",
        expectedLesions: {
            'Membres Supérieurs': {
                'Doigts': ['amputation', 'fracture phalange', 'raideur', 'ankylose'],
                'Main': ['amputation', 'fracture métacarpe', 'paralysie intrinsèque'],
                'Poignet': ['fracture', 'raideur', 'ankylose', 'instabilité'],
                'Coude': ['fracture', 'raideur', 'ankylose', 'luxation'],
                'Épaule': ['fracture', 'raideur', 'ankylose', 'luxation', 'périarthrite']
            },
            'Membres Inférieurs': {
                'Orteils': ['amputation', 'fracture'],
                'Pied': ['amputation', 'fracture métatarse', 'pied bot'],
                'Cheville': ['fracture malléole', 'entorse', 'instabilité'],
                'Genou': ['fracture', 'entorse', 'lésion méniscale', 'raideur', 'instabilité'],
                'Hanche': ['fracture col', 'luxation', 'arthrose']
            },
            'Séquelles du Rachis, du Bassin et de la Moelle Épinière': {
                'Rachis': ['fracture cervicale', 'fracture dorsale', 'fracture lombaire', 'hernie discale'],
                'Bassin': ['fracture bassin', 'fracture sacrum', 'fracture coccyx']
            }
        }
    }
};

// Fonction d'audit
function auditDisabilityData() {
    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            totalCategories: disabilityData.length,
            totalSubcategories: 0,
            totalInjuries: 0,
            errors: [],
            warnings: [],
            suggestions: []
        },
        details: []
    };

    disabilityData.forEach(category => {
        report.summary.totalSubcategories += category.subcategories.length;
        
        category.subcategories.forEach(subcategory => {
            const allInjuries = subcategory.injuries;
            report.summary.totalInjuries += allInjuries.length;
            
            subcategory.injuries.forEach((injury, index) => {
                const injuryPath = `${category.name} > ${subcategory.name} > ${injury.name}`;
                
                // Appliquer les règles d'audit
                Object.entries(auditRules).forEach(([ruleKey, rule]) => {
                    if (rule.check) {
                        const result = rule.check(injury, allInjuries);
                        if (!result.valid) {
                            report.summary.errors.push({
                                path: injuryPath,
                                rule: rule.name,
                                message: result.message,
                                injury: injury
                            });
                        }
                    }
                });
            });
        });
    });

    return report;
}

// Générer corrections suggérées
function generateCorrections(report) {
    const corrections = {
        timestamp: new Date().toISOString(),
        corrections: []
    };

    report.summary.errors.forEach(error => {
        let correction = null;
        
        // Corrections automatiques suggérées
        if (error.message.includes('Taux min') && error.message.includes('>= max')) {
            correction = {
                type: 'swap_min_max',
                path: error.path,
                current: error.injury.rate,
                suggested: [error.injury.rate[1], error.injury.rate[0]],
                reason: 'Inverser min et max'
            };
        }
        
        if (error.message.includes('Fourchette sans critères')) {
            correction = {
                type: 'add_criteria',
                path: error.path,
                current: error.injury.rateCriteria,
                suggested: {
                    low: "Séquelle légère, gêne fonctionnelle minime",
                    medium: "Séquelle modérée, limitation fonctionnelle",
                    high: "Séquelle sévère, handicap fonctionnel important"
                },
                reason: 'Ajouter critères de gravité par défaut'
            };
        }
        
        if (error.message.includes('main dominante sans équivalent')) {
            const nonDominantRate = Array.isArray(error.injury.rate) 
                ? [Math.round(error.injury.rate[0] * 0.8), Math.round(error.injury.rate[1] * 0.8)]
                : Math.round(error.injury.rate * 0.8);
            
            correction = {
                type: 'add_non_dominant',
                path: error.path,
                suggested: {
                    name: error.injury.name.replace('Main Dominante', 'Main Non Dominante'),
                    rate: nonDominantRate,
                    rateCriteria: error.injury.rateCriteria,
                    description: error.injury.description
                },
                reason: 'Ajouter lésion équivalente main non dominante'
            };
        }
        
        if (correction) {
            corrections.corrections.push(correction);
        }
    });

    return corrections;
}

// Exécution de l'audit
console.log('🔍 Démarrage de l\'audit médico-légal...\n');

const auditReport = auditDisabilityData();

console.log('📊 RÉSUMÉ DE L\'AUDIT\n');
console.log(`Total catégories: ${auditReport.summary.totalCategories}`);
console.log(`Total sous-catégories: ${auditReport.summary.totalSubcategories}`);
console.log(`Total lésions: ${auditReport.summary.totalInjuries}`);
console.log(`\n❌ Erreurs détectées: ${auditReport.summary.errors.length}`);
console.log(`⚠️  Avertissements: ${auditReport.summary.warnings.length}`);
console.log(`💡 Suggestions: ${auditReport.summary.suggestions.length}\n`);

// Afficher échantillon d'erreurs
if (auditReport.summary.errors.length > 0) {
    console.log('📋 ÉCHANTILLON D\'ERREURS (10 premières):\n');
    auditReport.summary.errors.slice(0, 10).forEach((error, i) => {
        console.log(`${i + 1}. ${error.path}`);
        console.log(`   Règle: ${error.rule}`);
        console.log(`   Message: ${error.message}\n`);
    });
}

// Générer corrections
const corrections = generateCorrections(auditReport);

console.log(`\n✅ ${corrections.corrections.length} corrections automatiques générées\n`);

// Sauvegarder rapports
const outputDir = path.join(process.cwd(), 'audit_reports');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const auditReportPath = path.join(outputDir, `audit_report_${Date.now()}.json`);
const correctionsPath = path.join(outputDir, `corrections_${Date.now()}.json`);

fs.writeFileSync(auditReportPath, JSON.stringify(auditReport, null, 2));
fs.writeFileSync(correctionsPath, JSON.stringify(corrections, null, 2));

console.log(`📄 Rapport d'audit sauvegardé: ${auditReportPath}`);
console.log(`📄 Corrections suggérées: ${correctionsPath}`);

console.log('\n✅ Audit terminé avec succès!\n');
