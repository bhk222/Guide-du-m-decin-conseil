# Script pour corriger les lettres-clés dans le JSON depuis le fichier texte

Write-Host "🔧 Correction des lettres-clés NGAP..." -ForegroundColor Cyan
Write-Host ""

# Lire le fichier texte
$textLines = Get-Content "acte_extracted_clean.txt"

# Créer un dictionnaire des vrais codes NGAP
$ngapCodes = @{}
$extracted = 0

Write-Host "📖 Extraction des codes NGAP depuis le fichier texte..." -ForegroundColor Yellow

foreach ($line in $textLines) {
    # Format: CODE Description... LETTRE COEFFICIENT
    # Ex: 1684 Thyréostim,line (TSH)... B 70
    if ($line -match '^(\S+)\s+(.+?)\s+([A-Z])\s+(\d+)\s*$') {
        $code = $Matches[1].Trim()
        $lettre = $Matches[3].Trim()
        $coef = [int]$Matches[4]
        
        $ngapCodes[$code] = @{
            lettre = $lettre
            coefficient = $coef
        }
        $extracted++
    }
}

Write-Host "✅ Extrait $extracted codes NGAP du fichier texte" -ForegroundColor Green
Write-Host ""

# Lire le JSON existant
Write-Host "📂 Lecture du fichier JSON..." -ForegroundColor Yellow
$jsonContent = Get-Content "data\nomenclature-complete.json" -Raw
$jsonData = $jsonContent | ConvertFrom-Json

$corrected = 0
$notFound = 0
$total = $jsonData.actes.Count

Write-Host "🔄 Correction des données JSON ($total actes)..." -ForegroundColor Yellow
Write-Host ""

foreach ($acte in $jsonData.actes) {
    if ($ngapCodes.ContainsKey($acte.code)) {
        $ngapInfo = $ngapCodes[$acte.code]
        
        # Corriger la lettre-clé si elle ne correspond pas
        if ($acte.lettreCle -ne $ngapInfo.lettre) {
            Write-Host "  ⚠️  $($acte.code): lettreCle '$($acte.lettreCle)' → '$($ngapInfo.lettre)'" -ForegroundColor Yellow
            $acte.lettreCle = $ngapInfo.lettre
            $corrected++
        }
        
        # Vérifier le coefficient
        if ($acte.coefficient -ne $ngapInfo.coefficient) {
            Write-Host "  ⚠️  $($acte.code): coefficient $($acte.coefficient) → $($ngapInfo.coefficient)" -ForegroundColor Yellow
            $acte.coefficient = $ngapInfo.coefficient
        }
    } else {
        $notFound++
    }
}

Write-Host ""
Write-Host "✅ Corrigé $corrected actes" -ForegroundColor Green
Write-Host "⚠️  $notFound actes non trouvés dans le fichier texte" -ForegroundColor Yellow
Write-Host ""

# Sauvegarder le JSON corrigé
Write-Host "💾 Sauvegarde des fichiers..." -ForegroundColor Yellow

# Sauvegarder avec compression minimale pour réduire la taille
$jsonData | ConvertTo-Json -Depth 10 -Compress | Set-Content "data\nomenclature-complete.json" -Encoding UTF8
$jsonData | ConvertTo-Json -Depth 10 -Compress | Set-Content "public\nomenclature-complete.json" -Encoding UTF8

Write-Host "✅ Fichiers sauvegardés:" -ForegroundColor Green
Write-Host "   - data\nomenclature-complete.json"
Write-Host "   - public\nomenclature-complete.json"
Write-Host ""

# Afficher un exemple de correction
$exemple = $jsonData.actes | Where-Object { $_.code -eq '1684' }
if ($exemple) {
    Write-Host "📋 Exemple (TSH):" -ForegroundColor Cyan
    Write-Host "   Code: $($exemple.code)"
    Write-Host "   Libellé: $($exemple.libelle)"
    Write-Host "   Lettre-clé: $($exemple.lettreCle)"
    Write-Host "   Coefficient: $($exemple.coefficient)"
}

Write-Host ""
Write-Host "🎉 Correction terminée !" -ForegroundColor Green
