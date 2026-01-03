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

# Code à insérer (après la ligne vide, donc index + 2)
$newCode = @'
                
                // 🆕 V3.3.139: Bonus pour correspondance searchTerms
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
                    
                    // Attribuer un bonus basé sur la meilleure similarité trouvée
                    if (bestSimilarity >= 0.7) {
                        // Haute similarité: bonus significatif
                        currentScore += 150;
                    } else if (bestSimilarity >= 0.5) {
                        // Similarité modérée: bonus moyen
                        currentScore += 75;
                    } else if (bestSimilarity >= 0.3) {
                        // Quelque chevauchement: petit bonus
                        currentScore += 30;
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

Write-Host "✅ Code injecté avec succès!"
