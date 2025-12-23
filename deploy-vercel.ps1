# 🚀 DÉPLOIEMENT VERCEL AUTOMATIQUE
# Script PowerShell pour déployer l'application sur Vercel

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT VERCEL - GUIDE DU MÉDECIN CONSEIL" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Vercel CLI est installé
Write-Host "📦 Vérification de Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI n'est pas installé" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 Installation de Vercel CLI..." -ForegroundColor Yellow
    Write-Host "   Exécution: npm install -g vercel" -ForegroundColor White
    npm install -g vercel
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Vercel CLI installé avec succès" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Échec de l'installation" -ForegroundColor Red
        Write-Host "   Veuillez exécuter manuellement: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "✅ Vercel CLI déjà installé" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Préparation du build..." -ForegroundColor Yellow

# Build de l'application
Write-Host "   Exécution: npm run build" -ForegroundColor White
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "   ❌ Échec du build" -ForegroundColor Red
    exit 1
}

Write-Host "   ✅ Build réussi" -ForegroundColor Green

# Vérifier les fichiers critiques
Write-Host ""
Write-Host "🔍 Vérification des fichiers..." -ForegroundColor Yellow

$distExists = Test-Path "dist"
if (-not $distExists) {
    Write-Host "   ❌ Dossier 'dist' introuvable" -ForegroundColor Red
    exit 1
}

$indexExists = Test-Path "dist/index.html"
if (-not $indexExists) {
    Write-Host "   ❌ Fichier 'dist/index.html' introuvable" -ForegroundColor Red
    exit 1
}

Write-Host "   ✅ Tous les fichiers sont prêts" -ForegroundColor Green

# Statistiques
$distFiles = Get-ChildItem -Recurse dist | Measure-Object -Property Length -Sum
$totalSizeMB = [math]::Round($distFiles.Sum / 1MB, 2)
Write-Host "   📁 Fichiers: $($distFiles.Count)" -ForegroundColor White
Write-Host "   💾 Taille: $totalSizeMB MB" -ForegroundColor White

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ PRÊ-DÉPLOIEMENT TERMINÉ" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Demander confirmation
Write-Host "🚀 Prêt à déployer sur Vercel en production" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Fonctionnalités incluses:" -ForegroundColor Cyan
Write-Host "   ✅ Calculateur IPP avec 45 cas validés" -ForegroundColor White
Write-Host "   ✅ Assistant Juridique" -ForegroundColor White
Write-Host "   ✅ Maladies Professionnelles" -ForegroundColor White
Write-Host "   ✅ Appareillage CNAS" -ForegroundColor White
Write-Host "   ✅ 📚 NOMENCLATURE GENERALE (NOUVEAU)" -ForegroundColor White
Write-Host "   ✅ 8 Outils spécialisés" -ForegroundColor White
Write-Host "   ✅ Mode offline PWA" -ForegroundColor White
Write-Host ""

$response = Read-Host "Voulez-vous continuer? (O/N)"

if ($response -eq "O" -or $response -eq "o" -or $response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "🚀 Déploiement en cours..." -ForegroundColor Cyan
    Write-Host ""
    
    # Déployer sur Vercel
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "🎉 DÉPLOIEMENT RÉUSSI!" -ForegroundColor Green
        Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Prochaines étapes:" -ForegroundColor Yellow
        Write-Host "   1. Vérifiez l'URL de production affichée ci-dessus" -ForegroundColor White
        Write-Host "   2. Testez l'application en ligne" -ForegroundColor White
        Write-Host "   3. Vérifiez la nouvelle rubrique NOMENCLATURE GENERALE" -ForegroundColor White
        Write-Host "   4. Partagez l'URL avec vos utilisateurs" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
        Write-Host ""
        Write-Host "Solutions possibles:" -ForegroundColor Yellow
        Write-Host "   1. Exécutez: vercel login" -ForegroundColor White
        Write-Host "   2. Vérifiez votre connexion internet" -ForegroundColor White
        Write-Host "   3. Réessayez: vercel --prod" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "❌ Déploiement annulé par l'utilisateur" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Pour déployer plus tard, exécutez:" -ForegroundColor Cyan
    Write-Host "   .\deploy-vercel.ps1" -ForegroundColor White
    Write-Host ""
}
