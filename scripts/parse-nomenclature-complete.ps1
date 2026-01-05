# Script AMÉLIORÉ pour parser la nomenclature complète et extraire TOUS les 1721 actes
# Lit le fichier acte_extracted_clean.txt et extrait TOUS les actes

$inputFile = "c:\Users\HICHAME\Desktop\Guide du médecin conseil\acte_extracted_clean.txt"
$outputFile = "c:\Users\HICHAME\Desktop\Guide du médecin conseil\data\nomenclature-complete.json"

Write-Host "🔍 Lecture du fichier $inputFile..." -ForegroundColor Cyan

$content = Get-Content $inputFile -Encoding UTF8
$actes = @()
$currentCategory = "Autre"

# Patterns pour détecter les catégories
$categoryPatterns = @{
    "Consultation" = "CONSULTATION|VISITE"
    "Chirurgie" = "CHIRURGIE|OPERATION|INTERVENTION|TRAITEMENT CHIRURGICAL"
    "Biologie" = "BIOLOGIE|DOSAGE|EXAMEN DE LABORATOIRE|ANALYSE"
    "Imagerie" = "RADIODIAGNOSTIC|RADIOGRAPHIE|SCANNER|IRM|ECHOGRAPHIE"
    "Soins" = "SOIN|PANSEMENT|INJECTION"
    "Kinésithérapie" = "KINESITHERAPIE|REEDUCATION|MASSAGE"
}

# Compteurs
$totalLines = $content.Count
$actesCount = 0
$lineNumber = 0

Write-Host "📊 Traitement de $totalLines lignes..." -ForegroundColor Yellow

foreach ($line in $content) {
    $lineNumber++
    
    # Afficher la progression tous les 500 lignes
    if ($lineNumber % 500 -eq 0) {
        Write-Host "  Ligne $lineNumber/$totalLines - Actes trouvés: $actesCount" -ForegroundColor Gray
    }
    
    # Détecter changement de catégorie
    foreach ($cat in $categoryPatterns.Keys) {
        if ($line -match $categoryPatterns[$cat]) {
            $currentCategory = $cat
            break
        }
    }
    
    # PATTERN 1: Code numérique avec coefficient (ex: "0003 Main, styloïdes... 20")
    if ($line -match '^\s*(\d{4}(/[0-9])?)\s+(.+?)\s+(\d+)\s*$') {
        $code = $matches[1]
        $libelle = $matches[3].Trim()
        $coefficient = [int]$matches[4]
        
        $acte = @{
            code = $code
            libelle = $libelle
            tarif = $coefficient * 30
            coefficient = $coefficient
            lettreCle = "K"
            categorie = $currentCategory
        }
        
        $actes += $acte
        $actesCount++
    }
    # PATTERN 2: Code numérique avec 2 coefficients (ex: "0172/2 2°... 50 30")
    elseif ($line -match '^\s*(\d{4}(/[0-9])?)\s+(.+?)\s+(\d+)\s+(\d+)\s*$') {
        $code = $matches[1]
        $libelle = $matches[3].Trim()
        $coef1 = [int]$matches[4]
        $coef2 = [int]$matches[5]
        
        # Utiliser le coefficient le plus élevé
        $coefficient = [Math]::Max($coef1, $coef2)
        
        $acte = @{
            code = $code
            libelle = $libelle
            tarif = $coefficient * 30
            coefficient = $coefficient
            lettreCle = "K"
            categorie = $currentCategory
        }
        
        $actes += $acte
        $actesCount++
    }
    # PATTERN 3: Code avec numérotation et coefficient décimal/points (ex: "0160 Injection... 1,5" ou "0180 Description... 80..")
    elseif ($line -match '^\s*(\d{4})\s+(.+?)\s+([\d,\.]+)\s*\.?\.*\s*$') {
        $code = $matches[1]
        $libelle = $matches[2].Trim()
        $coefficientStr = $matches[3].Replace(',', '.').TrimEnd('.')
        
        # Nettoyer les points de suspension
        while ($coefficientStr.EndsWith('.')) {
            $coefficientStr = $coefficientStr.Substring(0, $coefficientStr.Length - 1)
        }
        
        try {
            $coefficient = [int][Math]::Ceiling([double]$coefficientStr)
            
            $acte = @{
                code = $code
                libelle = $libelle
                tarif = $coefficient * 30
                coefficient = $coefficient
                lettreCle = "K"
                categorie = $currentCategory
            }
            
            $actes += $acte
            $actesCount++
        } catch {
            # Ignorer les conversions échouées
        }
    }
    # PATTERN 4: Acte sans code au début mais avec coefficient à la fin (ex: "Description de l'acte... 50")
    elseif ($line -match '^([A-ZÀÉÈÊËÏÎÔÙÛÇ][^0-9]{20,}?)\s+(\d{1,3})\s*$') {
        $libelle = $matches[1].Trim()
        $coefficient = [int]$matches[2]
        
        # Générer un code unique
        $code = "AUTO-" + ($actesCount + 1)
        
        $acte = @{
            code = $code
            libelle = $libelle
            tarif = $coefficient * 30
            coefficient = $coefficient
            lettreCle = "K"
            categorie = $currentCategory
        }
        
        $actes += $acte
        $actesCount++
    }
    # PATTERN 5: Lettre-clé explicite (ex: "K 50 Description" ou "B 70 Cortisol")
    elseif ($line -match '^\s*([A-Z])\s+(\d+)\s+(.+)$') {
        $lettreClé = $matches[1]
        $coefficient = [int]$matches[2]
        $libelle = $matches[3].Trim()
        
        if ($libelle.Length -lt 5) { continue }
        
        $tarifBase = switch ($lettreClé) {
            "K" { 30 }
            "C" { 50 }
            "V" { 30 }
            "B" { 30 }
            "P" { 10 }
            "R" { 30 }
            "Z" { 30 }
            default { 30 }
        }
        
        $acte = @{
            code = "$lettreClé$coefficient"
            libelle = $libelle
            tarif = $coefficient * $tarifBase
            coefficient = $coefficient
            lettreCle = $lettreClé
            categorie = $currentCategory
        }
        
        $actes += $acte
        $actesCount++
    }
    # PATTERN 6: Description + lettre-clé à la fin (ex: "Dosage de cortisol B 70")
    elseif ($line -match '^(.+?)\s+([A-Z])\s+(\d+)\s*$') {
        $libelle = $matches[1].Trim()
        $lettreClé = $matches[2]
        $coefficient = [int]$matches[3]
        
        if ($libelle.Length -lt 5) { continue }
        
        $tarifBase = switch ($lettreClé) {
            "K" { 30 }
            "C" { 50 }
            "V" { 30 }
            "B" { 30 }
            "P" { 10 }
            "R" { 30 }
            "Z" { 30 }
            default { 30 }
        }
        
        $acte = @{
            code = "$lettreClé$coefficient-" + ($actesCount + 1)
            libelle = $libelle
            tarif = $coefficient * $tarifBase
            coefficient = $coefficient
            lettreCle = $lettreClé
            categorie = $currentCategory
        }
        
        $actes += $acte
        $actesCount++
    }
}

Write-Host "`n✅ Extraction terminée: $actesCount actes trouvés" -ForegroundColor Green

# Créer la structure JSON finale
$nomenclature = @{
    version = "2.0-complete"
    date = (Get-Date -Format "yyyy-MM-dd")
    source = "acte_extracted_clean.txt (parsing complet amélioré)"
    total = $actes.Count
    categories = @{}
    actes = $actes
}

# Calculer les statistiques par catégorie
$actes | Group-Object categorie | ForEach-Object {
    $nomenclature.categories[$_.Name] = $_.Count
}

# Sauvegarder en JSON
Write-Host "💾 Sauvegarde dans $outputFile..." -ForegroundColor Cyan
$jsonContent = $nomenclature | ConvertTo-Json -Depth 10 -Compress
[System.IO.File]::WriteAllText($outputFile, $jsonContent, [System.Text.Encoding]::UTF8)

Write-Host "`n🎉 TERMINÉ!" -ForegroundColor Green
Write-Host "📊 Statistiques:" -ForegroundColor Yellow
Write-Host "   Total actes: $($actes.Count)" -ForegroundColor White
Write-Host "   Objectif: 1721 actes" -ForegroundColor Cyan
$pourcentage = [Math]::Round(($actes.Count / 1721) * 100, 1)
Write-Host "   Progression: $pourcentage%" -ForegroundColor $(if ($pourcentage -ge 95) { "Green" } else { "Yellow" })
Write-Host "   Catégories:" -ForegroundColor White
$nomenclature.categories.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object {
    Write-Host "      - $($_.Key): $($_.Value)" -ForegroundColor Gray
}
