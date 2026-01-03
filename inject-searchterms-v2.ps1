cd "c:\Users\HICHAME\Desktop\Guide du médecin conseil"
$file = "components\AiAnalyzer.tsx"
$content = Get-Content $file -Raw
$lines = $content -split "`r?`n"

# Trouver l'index
$targetIdx = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].Trim() -eq "currentScore += specificityBonus;") {
        $targetIdx = $i
        break
    }
}

if ($targetIdx -eq -1) {
    Write-Host "❌ Ligne non trouvée"
    exit 1
}

Write-Host "✅ Ligne trouvée à l'index $targetIdx"

# Code à insérer (après la ligne vide, donc index + 2) - BONUS MASSIF
$newCode = @'
                
                // 🆕 V3.3.139: Bonus MASSIF pour correspondance searchTerms (cumuls prioritaires)
                if (injury.searchTerms && injury.searchTerms.length > 0) {
                    const userNormalized = normalize(normalizedText);
                    const userWords = userNormalized.split(' ').filter(w => w.length > 2);
                    
                    let bestSimilarity = 0;
                    injury.searchTerms.forEach(term => {
                        const termNormalized = normalize(term);
                        const termWords = termNormalized.split(' ').filter(w => w.length > 2);
                        
                        // Calculer le chevauchement de mots
                        const overlap = userWords.filter(w => termWords.includes(w));
                        const similarity = overlap.length / Math.max(userWords.length, termWords.length);
                        
                        if (similarity > bestSimilarity) {
                            bestSimilarity = similarity;
                        }
                    });
                    
                    // Attribuer un bonus MASSIF pour prioriser les entrées avec searchTerms
                    if (bestSimilarity >= 0.6) {
                        // Haute similarité (60%+): bonus ÉNORME pour forcer le cumul
                        currentScore += 5000;
                    } else if (bestSimilarity >= 0.4) {
                        // Similarité modérée (40-60%): bonus important
                        currentScore += 2000;
                    } else if (bestSimilarity >= 0.25) {
                        // Chevauchement partiel (25-40%): bonus moyen
                        currentScore += 500;
                    }
                }
'@

# Insérer après la ligne vide (index + 2)
$insertIdx = $targetIdx + 2
$newCodeLines = $newCode -split "`r?`n"
$before = $lines[0..$insertIdx]
$after = $lines[($insertIdx + 1)..($lines.Count - 1)]
$newLines = $before + $newCodeLines + $after

# Sauvegarder
$newContent = $newLines -join "`r`n"
Set-Content $file -Value $newContent -NoNewline -Encoding UTF8

$newLineCount = (Get-Content $file | Measure-Object -Line).Lines
Write-Host "✅ Code injecté! $newLineCount lignes (était $($lines.Count))"
