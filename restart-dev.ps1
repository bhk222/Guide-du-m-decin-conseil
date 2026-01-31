#!/usr/bin/env pwsh
# Script de redémarrage automatique du serveur Vite
# Usage: .\restart-dev.ps1

Write-Host "🔄 Redémarrage du serveur de développement..." -ForegroundColor Cyan
Write-Host ""

# 1. Arrêter les processus Node/Vite en cours
Write-Host "1️⃣ Arrêt des processus Node/Vite..." -ForegroundColor Yellow
$processes = Get-Process | Where-Object { 
    $_.ProcessName -like "*node*" -or 
    $_.ProcessName -like "*vite*" 
}

if ($processes) {
    $processes | ForEach-Object {
        Write-Host "   ⏹️  Arrêt: $($_.ProcessName) (PID: $($_.Id))" -ForegroundColor Gray
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
    Start-Sleep -Seconds 2
    Write-Host "   ✅ Processus arrêtés" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  Aucun processus actif détecté" -ForegroundColor Gray
}

Write-Host ""

# 2. Vérifier que package.json existe
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json introuvable" -ForegroundColor Red
    Write-Host "   Assurez-vous d'être dans le dossier du projet" -ForegroundColor Yellow
    exit 1
}

# 3. Nettoyer le cache Vite (optionnel mais recommandé)
Write-Host "2️⃣ Nettoyage du cache Vite..." -ForegroundColor Yellow
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue
    Write-Host "   ✅ Cache supprimé" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  Pas de cache à nettoyer" -ForegroundColor Gray
}

Write-Host ""

# 4. Redémarrer le serveur
Write-Host "3️⃣ Démarrage du serveur Vite..." -ForegroundColor Yellow
Write-Host "   📡 Lancement sur http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

# Attendre 1 seconde avant de lancer
Start-Sleep -Seconds 1

# Lancer le serveur en mode interactif
npm run dev

# Note: Le script restera bloqué ici tant que le serveur tourne
# Utilisez Ctrl+C pour arrêter le serveur
