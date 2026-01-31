#!/usr/bin/env pwsh
# Script de redémarrage automatique du serveur Vite (en arrière-plan)
# Usage: .\restart-dev-background.ps1

Write-Host "🔄 Redémarrage du serveur de développement (mode arrière-plan)..." -ForegroundColor Cyan
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

# 2. Nettoyer le cache Vite
Write-Host "2️⃣ Nettoyage du cache Vite..." -ForegroundColor Yellow
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue
    Write-Host "   ✅ Cache supprimé" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  Pas de cache à nettoyer" -ForegroundColor Gray
}

Write-Host ""

# 3. Redémarrer le serveur en arrière-plan
Write-Host "3️⃣ Démarrage du serveur Vite en arrière-plan..." -ForegroundColor Yellow

$job = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}

# Attendre que le serveur démarre
Start-Sleep -Seconds 3

Write-Host "   ✅ Serveur démarré (Job ID: $($job.Id))" -ForegroundColor Green
Write-Host "   📡 URL: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""

# 4. Ouvrir le navigateur automatiquement
Write-Host "4️⃣ Ouverture du navigateur..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"
Write-Host "   ✅ Navigateur ouvert" -ForegroundColor Green

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "✅ Serveur redémarré avec succès!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Commandes utiles:" -ForegroundColor Cyan
Write-Host "   • Voir les logs: Get-Job | Receive-Job -Keep" -ForegroundColor Gray
Write-Host "   • Arrêter le serveur: Stop-Job $($job.Id); Remove-Job $($job.Id)" -ForegroundColor Gray
Write-Host "   • Liste des jobs: Get-Job" -ForegroundColor Gray
Write-Host ""
