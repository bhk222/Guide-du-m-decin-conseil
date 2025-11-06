"""
Script d'extraction et analyse du barème AT-MP PDF
Compare avec la base de données existante et identifie les lésions manquantes
"""

import sys
import re
import json
from pathlib import Path

try:
    import PyPDF2
except ImportError:
    print("❌ PyPDF2 non installé. Installation...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

# Chemins
pdf_path = Path("BAREME AT-MP.pdf")
output_dir = Path("extracted_bareme")
output_dir.mkdir(exist_ok=True)

print("🔍 Extraction du PDF BAREME AT-MP...\n")

# Extraction du texte
text_content = []
try:
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        total_pages = len(pdf_reader.pages)
        print(f"📄 Total de pages: {total_pages}\n")
        
        for i, page in enumerate(pdf_reader.pages):
            text = page.extract_text()
            text_content.append(text)
            if (i + 1) % 10 == 0:
                print(f"   Extraction page {i + 1}/{total_pages}...")
        
        print(f"\n✅ Extraction terminée ({total_pages} pages)\n")

except Exception as e:
    print(f"❌ Erreur lors de l'extraction: {e}")
    sys.exit(1)

# Sauvegarder le texte complet
full_text = "\n\n=== PAGE BREAK ===\n\n".join(text_content)
output_file = output_dir / "bareme_full_text.txt"
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(full_text)

print(f"📄 Texte complet sauvegardé: {output_file}\n")

# Patterns de détection de lésions
lesion_patterns = [
    # Pattern 1: "Nom de lésion ... X%"
    r'([A-ZÉÈÊÀÂÔÎÛÇ][a-zéèêàâôîûç\s\',\-]+(?:[A-ZÉÈÊÀÂÔÎÛÇ][a-zéèêàâôîûç\s\',\-]+)*)\s*[\.…]+\s*(\d+)\s*%',
    # Pattern 2: "Nom de lésion (détails) : X à Y %"
    r'([A-ZÉÈÊÀÂÔÎÛÇ][^\n]+?)\s*:\s*(\d+)\s*à\s*(\d+)\s*%',
    # Pattern 3: "Nom de lésion X-Y%"
    r'([A-ZÉÈÊÀÂÔÎÛÇ][^\n]+?)\s*(\d+)\s*-\s*(\d+)\s*%',
]

# Extraire les lésions
lesions_found = []
for page_num, page_text in enumerate(text_content, 1):
    for pattern in lesion_patterns:
        matches = re.finditer(pattern, page_text, re.MULTILINE)
        for match in matches:
            if len(match.groups()) == 2:
                name, rate = match.groups()
                lesions_found.append({
                    'name': name.strip(),
                    'rate': int(rate),
                    'page': page_num,
                    'type': 'fixed'
                })
            elif len(match.groups()) >= 3:
                name, min_rate, max_rate = match.groups()[:3]
                lesions_found.append({
                    'name': name.strip(),
                    'rate': [int(min_rate), int(max_rate)],
                    'page': page_num,
                    'type': 'range'
                })

print(f"🔍 Lésions détectées: {len(lesions_found)}\n")

# Sauvegarder les lésions extraites
lesions_file = output_dir / "lesions_extracted.json"
with open(lesions_file, 'w', encoding='utf-8') as f:
    json.dump(lesions_found, f, indent=2, ensure_ascii=False)

print(f"📄 Lésions extraites sauvegardées: {lesions_file}\n")

# Afficher échantillon
print("📋 ÉCHANTILLON DES LÉSIONS EXTRAITES (20 premières):\n")
for i, lesion in enumerate(lesions_found[:20], 1):
    rate_str = f"{lesion['rate']}%" if lesion['type'] == 'fixed' else f"{lesion['rate'][0]}-{lesion['rate'][1]}%"
    print(f"{i:2}. {lesion['name'][:60]:60} | {rate_str:10} | Page {lesion['page']}")

if len(lesions_found) > 20:
    print(f"\n... et {len(lesions_found) - 20} autres lésions")

print("\n" + "="*80)
print(f"\n✅ Extraction terminée avec succès!")
print(f"📁 Fichiers générés dans: {output_dir}/")
print(f"   - bareme_full_text.txt ({len(full_text)} caractères)")
print(f"   - lesions_extracted.json ({len(lesions_found)} lésions)")
print("\n🔄 Prochaine étape: Comparer avec disabilityRates.ts pour identifier les manquantes\n")
