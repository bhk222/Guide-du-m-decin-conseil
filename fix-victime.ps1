$f = "c:\Users\HICHAME\Desktop\Guide du m`u00e9decin conseil\components\LegislativeGuide.tsx"
$c = [System.IO.File]::ReadAllText("components/LegislativeGuide.tsx", [System.Text.Encoding]::UTF8)
$count = 0

# Each replacement: old -> new
$replacements = @(
    ,@("la victime ne per`u00e7oit pas une rente", "l'assur`u00e9 ne per`u00e7oit pas une rente")
)

# Simple approach - just do global replace with exclusion list
# Replace ALL "la victime" -> "l'assur`u00e9" except in legal citations
# Legal citations we want to keep contain Art. XX quotes

$before = ($c | Select-String -Pattern 'la victime' -AllMatches).Matches.Count
Write-Host "Before: $before occurrences of 'la victime'"
