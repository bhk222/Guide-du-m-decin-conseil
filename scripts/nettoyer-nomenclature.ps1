# Script pour nettoyer les libellés de la nomenclature
$inputFile = "c:\Users\HICHAME\Desktop\Guide du médecin conseil\data\nomenclature-complete.json"

Write-Host "🧹 Nettoyage de la nomenclature..." -ForegroundColor Cyan

$json = Get-Content $inputFile -Raw -Encoding UTF8 | ConvertFrom-Json

$cleanedCount = 0

foreach ($acte in $json.actes) {
    $originalLibelle = $acte.libelle
    
    # Nettoyer les suffixes de lettre-clé
    $acte.libelle = $acte.libelle -replace '\s*\.\.\.\s*[A-Z]\s*$', ''
    $acte.libelle = $acte.libelle -replace '\s*[A-Z]\s+\d+\s*$', ''
    $acte.libelle = $acte.libelle -replace '\s*\.\.\.$', ''
    $acte.libelle = $acte.libelle.Trim()
    
    if ($originalLibelle -ne $acte.libelle) {
        $cleanedCount++
    }
}

Write-Host "✅ $cleanedCount libellés nettoyés" -ForegroundColor Green

# Sauvegarder
$jsonContent = $json | ConvertTo-Json -Depth 10 -Compress
[System.IO.File]::WriteAllText($inputFile, $jsonContent, [System.Text.Encoding]::UTF8)

Write-Host "💾 Fichier sauvegardé" -ForegroundColor Green
