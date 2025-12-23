# Script PowerShell pour extraire les données du PDF acte.pdf

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📚 EXTRACTION PDF NOMENCLATURE" -ForegroundColor Cyan  
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Vérifier si le fichier PDF existe
$pdfFile = "acte.pdf"
if (-not (Test-Path $pdfFile)) {
    Write-Host "❌ Fichier $pdfFile non trouvé !" -ForegroundColor Red
    Write-Host ""
    Write-Host "Placez le fichier 'acte.pdf' dans le dossier racine du projet" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Fichier PDF trouvé: $pdfFile" -ForegroundColor Green
Write-Host ""

# Créer le dossier data s'il n'existe pas
if (-not (Test-Path "data")) {
    New-Item -ItemType Directory -Path "data" | Out-Null
    Write-Host "📁 Dossier 'data' créé" -ForegroundColor Green
}

# Instruction pour l'utilisateur
Write-Host "📋 Extraction des données du PDF..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Pour extraire les données, deux options :" -ForegroundColor White
Write-Host ""
Write-Host "Option 1 - Extraction automatique (recommandé):" -ForegroundColor Cyan
Write-Host "   Utilisez l'outil en ligne pour convertir le PDF:" -ForegroundColor White
Write-Host "   1. Allez sur https://pdftotext.com ou https://pdf2json.com" -ForegroundColor White
Write-Host "   2. Uploadez 'acte.pdf'" -ForegroundColor White
Write-Host "   3. Téléchargez le fichier texte/JSON" -ForegroundColor White
Write-Host "   4. Copiez le contenu dans data/nomenclature.json" -ForegroundColor White
Write-Host ""
Write-Host "Option 2 - Extraction manuelle:" -ForegroundColor Cyan
Write-Host "   1. Ouvrez 'acte.pdf'" -ForegroundColor White
Write-Host "   2. Sélectionnez et copiez le texte" -ForegroundColor White
Write-Host "   3. Envoyez le texte à l'équipe de développement" -ForegroundColor White
Write-Host ""
Write-Host "Une fois les données extraites, le fichier sera intégré" -ForegroundColor Green
Write-Host "automatiquement dans l'application !" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
