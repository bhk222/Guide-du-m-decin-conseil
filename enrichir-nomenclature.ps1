# Script pour enrichir TOUS les actes avec les codes NGAP complets

Write-Host "🔧 Enrichissement complet de la nomenclature..." -ForegroundColor Cyan
Write-Host ""

# Charger les données existantes
Write-Host "📂 Chargement des fichiers..." -ForegroundColor Yellow
$nomenclature = Get-Content "data\nomenclature-complete.json" -Raw | ConvertFrom-Json
$ngapData = Get-Content "data\ngap-complete.json" -Raw | ConvertFrom-Json

Write-Host "   nomenclature-complete.json: $($nomenclature.actes.Count) actes" -ForegroundColor Gray
Write-Host "   ngap-complete.json: $($ngapData.totalActes) actes" -ForegroundColor Gray
Write-Host ""

# Créer un dictionnaire avec toutes les données NGAP
$ngapDict = @{}

# Ajouter les actes de toutes les catégories
foreach ($cat in $ngapData.categories.PSObject.Properties) {
    $categoryName = $cat.Name
    $actes = $cat.Value
    
    foreach ($acte in $actes) {
        if ($acte.code -and $acte.lettreCle -and $acte.coef) {
            $key = $acte.code
            if (-not $ngapDict.ContainsKey($key)) {
                $ngapDict[$key] = @{
                    lettreCle = $acte.lettreCle
                    coefficient = $acte.coef
                    libelle = $acte.libelle
                    categorie = $categoryName
                }
            }
        }
    }
}

Write-Host "📊 Dictionnaire NGAP créé: $($ngapDict.Count) codes" -ForegroundColor Green
Write-Host ""

# Enrichir les actes de la nomenclature
$enrichis = 0
$nouveaux = 0
$sansCorrespondance = 0

Write-Host "🔄 Enrichissement des actes..." -ForegroundColor Yellow

foreach ($acte in $nomenclature.actes) {
    if ($ngapDict.ContainsKey($acte.code)) {
        $ngapInfo = $ngapDict[$acte.code]
        
        # Mettre à jour avec les données NGAP
        $ancien = "$($acte.lettreCle) $($acte.coefficient)"
        $acte.lettreCle = $ngapInfo.lettreCle
        $acte.coefficient = $ngapInfo.coefficient
        $nouveau = "$($acte.lettreCle) $($acte.coefficient)"
        
        if ($ancien -ne $nouveau) {
            Write-Host "  ✓ $($acte.code): $ancien → $nouveau" -ForegroundColor Green
            $enrichis++
        }
    } else {
        $sansCorrespondance++
    }
}

# Ajouter les actes qui n'existent pas dans nomenclature-complete.json
$codesExistants = @{}
foreach ($acte in $nomenclature.actes) {
    $codesExistants[$acte.code] = $true
}

Write-Host ""
Write-Host "➕ Ajout des actes manquants..." -ForegroundColor Yellow

foreach ($code in $ngapDict.Keys) {
    if (-not $codesExistants.ContainsKey($code)) {
        $ngapInfo = $ngapDict[$code]
        
        $nouvelActe = [PSCustomObject]@{
            coefficient = $ngapInfo.coefficient
            categorie = $ngapInfo.categorie
            tarif = 30  # Tarif de base par défaut
            code = $code
            libelle = $ngapInfo.libelle
            lettreCle = $ngapInfo.lettreCle
        }
        
        $nomenclature.actes += $nouvelActe
        Write-Host "  + $code : $($ngapInfo.lettreCle) $($ngapInfo.coefficient)" -ForegroundColor Cyan
        $nouveaux++
        
        # Limiter l'affichage
        if ($nouveaux -gt 50) {
            Write-Host "  ... ($($ngapDict.Count - $codesExistants.Count) actes manquants au total)" -ForegroundColor Gray
            break
        }
    }
}

$nomenclature.total = $nomenclature.actes.Count

Write-Host ""
Write-Host "✅ Enrichis: $enrichis actes" -ForegroundColor Green
Write-Host "➕ Nouveaux: $nouveaux actes" -ForegroundColor Cyan
Write-Host "⚠️  Sans correspondance: $sansCorrespondance actes" -ForegroundColor Yellow
Write-Host "📊 Total final: $($nomenclature.actes.Count) actes" -ForegroundColor Magenta
Write-Host ""

# Sauvegarder
Write-Host "💾 Sauvegarde..." -ForegroundColor Yellow
$nomenclature | ConvertTo-Json -Depth 10 -Compress | Set-Content "data\nomenclature-complete.json" -Encoding UTF8
$nomenclature | ConvertTo-Json -Depth 10 -Compress | Set-Content "public\nomenclature-complete.json" -Encoding UTF8

Write-Host "✅ Fichiers sauvegardés!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Enrichissement terminé!" -ForegroundColor Green
