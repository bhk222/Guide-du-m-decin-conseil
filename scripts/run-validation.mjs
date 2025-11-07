/**
 * Script de validation automatique - Lance validation 297 cas
 * Usage: node scripts/run-validation.mjs
 * 
 * Note: Utilise l'environnement Node avec import dynamique TypeScript
 */

import { execSync } from 'child_process';

console.log('🔬 Compilation TypeScript et lancement validation...\n');

try {
    // Utiliser tsx pour exécuter TypeScript directement
    const result = execSync('npx tsx scripts/run-validation-node.ts', {
        encoding: 'utf-8',
        stdio: 'inherit'
    });
} catch (error) {
    console.error('❌ Erreur lors de la validation');
    process.exit(1);
}
