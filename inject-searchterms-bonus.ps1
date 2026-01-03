$file = "c:\Users\HICHAME\Desktop\Guide du médecin conseil\components\AiAnalyzer.tsx"
$content = Get-Content $file -Raw

# Pattern à remplacer (sans les caractères spéciaux qui posent problème)
$lineNumber = 4191
$lines = $content -split "`r?`n"

# Trouver l'index exact
$targetLine = "                currentScore += specificityBonus;"
$foundIndex = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].Trim() -eq $targetLine.Trim()) {
        $foundIndex = $i
        break
    }
}

if ($foundIndex -eq -1) {
    Write-Host "❌ Ligne cible non trouvée"
    exit 1
}

Write-Host "✅ Trouvé à l'index: $foundIndex (ligne $($foundIndex + 1))"

# Insérer le nouveau code après cette ligne (après la ligne vide)
$newCode = @"
                
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
"@

# Insérer après la ligne vide (index + 2)
$insertIndex = $foundIndex + 2
$newLines = $lines[0..$insertIndex] + ($newCode -split "`r?`n") + $lines[($insertIndex + 1)..($lines.Count - 1)]

# Sauvegarder
$newContent = $newLines -join "`r`n"
Set-Content $file -Value $newContent -NoNewline

Write-Host "✅ Code injecté avec succès après la ligne $($insertIndex + 1)"
