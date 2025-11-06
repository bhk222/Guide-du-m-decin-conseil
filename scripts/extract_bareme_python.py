"""
Script pour extraire toutes les lésions du BAREME AT-MP.pdf
et comparer avec la base de données actuelle
"""

import re
import json
from pathlib import Path

try:
    import PyPDF2
except ImportError:
    print("❌ PyPDF2 non installé. Installation...")
    import subprocess
    subprocess.check_call(["pip", "install", "PyPDF2"])
    import PyPDF2

def extract_text_from_pdf(pdf_path):
    """Extraire tout le texte du PDF"""
    print(f"📖 Lecture du PDF : {pdf_path}")
    
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        total_pages = len(pdf_reader.pages)
        print(f"   📄 {total_pages} pages détectées")
        
        full_text = ""
        for page_num in range(total_pages):
            page = pdf_reader.pages[page_num]
            text = page.extract_text()
            full_text += f"\n\n=== PAGE {page_num + 1} ===\n\n{text}"
            
            if (page_num + 1) % 50 == 0:
                print(f"   ⏳ {page_num + 1}/{total_pages} pages traitées...")
        
        print(f"   ✅ Extraction terminée : {len(full_text)} caractères\n")
        return full_text

def extract_lesions_from_text(text):
    """Extraire les lésions avec leurs taux IPP"""
    print("🔍 Extraction des lésions avec taux IPP...")
    
    lesions = []
    
    # Patterns pour détecter les lésions
    patterns = [
        # Format: "Fracture de la clavicule ... 5 à 10%"
        r'([A-ZÀ-Ÿ][a-zà-ÿ\s\-\'()]+(?:[a-zà-ÿ\-\'()]+)?)\s*[\.]{2,}\s*(\d+)\s*(?:à|–|-)\s*(\d+)\s*%',
        
        # Format: "Amputation du pouce ... 25%"
        r'([A-ZÀ-Ÿ][a-zà-ÿ\s\-\'()]+(?:[a-zà-ÿ\-\'()]+)?)\s*[\.]{2,}\s*(\d+)\s*%',
        
        # Format: "Lesion : 10-20%"
        r'([A-ZÀ-Ÿ][a-zà-ÿ\s\-\'()]+)\s*:\s*(\d+)\s*[-–]\s*(\d+)\s*%',
        
        # Format: "Lesion : 15%"
        r'([A-ZÀ-Ÿ][a-zà-ÿ\s\-\'()]+)\s*:\s*(\d+)\s*%'
    ]
    
    for pattern in patterns:
        matches = re.finditer(pattern, text, re.MULTILINE)
        for match in matches:
            lesion_name = match.group(1).strip()
            
            # Nettoyer le nom de la lésion
            lesion_name = re.sub(r'\s+', ' ', lesion_name)
            lesion_name = lesion_name.strip('.,;:-')
            
            # Exclure les faux positifs
            if len(lesion_name) < 10:  # Trop court
                continue
            if any(keyword in lesion_name.lower() for keyword in ['page', 'article', 'chapitre', 'tableau']):
                continue
            
            # Extraire le taux IPP
            if len(match.groups()) == 3:  # Range
                rate = [int(match.group(2)), int(match.group(3))]
            else:  # Fixed
                rate = int(match.group(2))
            
            lesions.append({
                'name': lesion_name,
                'rate': rate
            })
    
    # Déduplication
    seen = set()
    unique_lesions = []
    for lesion in lesions:
        key = lesion['name'].lower()
        if key not in seen:
            seen.add(key)
            unique_lesions.append(lesion)
    
    print(f"   ✅ {len(unique_lesions)} lésions uniques extraites\n")
    return unique_lesions

def load_current_database():
    """Charger la base de données actuelle"""
    print("📊 Chargement de la base de données actuelle...")
    
    db_path = Path(__file__).parent.parent / 'data' / 'disabilityRates.ts'
    with open(db_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire les noms de lésions
    pattern = r'name:\s*"([^"]+)"'
    matches = re.findall(pattern, content)
    
    print(f"   ✅ {len(matches)} lésions chargées\n")
    return [name.lower().strip() for name in matches]

def normalize(text):
    """Normaliser un texte pour comparaison"""
    # Enlever les accents
    import unicodedata
    text = unicodedata.normalize('NFD', text)
    text = ''.join(char for char in text if unicodedata.category(char) != 'Mn')
    
    # Lowercase et nettoyage
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'\s+', ' ', text)
    
    return text

def compare_with_database(pdf_lesions, db_lesions):
    """Comparer les lésions du PDF avec la base de données"""
    print("🔍 Comparaison avec la base de données...\n")
    
    missing = []
    partial_matches = []
    exact_matches = []
    
    for pdf_lesion in pdf_lesions:
        pdf_name = pdf_lesion['name']
        pdf_normalized = normalize(pdf_name)
        
        # Chercher correspondance exacte
        found_exact = False
        for db_name in db_lesions:
            db_normalized = normalize(db_name)
            
            if pdf_normalized == db_normalized:
                exact_matches.append(pdf_lesion)
                found_exact = True
                break
        
        if found_exact:
            continue
        
        # Chercher correspondance partielle (30 premiers caractères)
        found_partial = False
        for db_name in db_lesions:
            db_normalized = normalize(db_name)
            
            if len(pdf_normalized) >= 30 and len(db_normalized) >= 30:
                if pdf_normalized[:30] == db_normalized[:30]:
                    partial_matches.append({
                        'pdf': pdf_name,
                        'db': db_name,
                        'rate': pdf_lesion['rate']
                    })
                    found_partial = True
                    break
        
        if not found_partial:
            missing.append(pdf_lesion)
    
    print(f"📊 Résultats de la comparaison :")
    print(f"   ✅ Correspondances exactes : {len(exact_matches)}")
    print(f"   🔄 Correspondances partielles : {len(partial_matches)}")
    print(f"   ❌ Lésions manquantes : {len(missing)}\n")
    
    return {
        'exact_matches': exact_matches,
        'partial_matches': partial_matches,
        'missing': missing
    }

def generate_report(comparison_results, pdf_lesions):
    """Générer un rapport détaillé"""
    print("📝 Génération du rapport...\n")
    
    report = {
        'date': str(Path(__file__).stat().st_mtime),
        'total_lesions_in_pdf': len(pdf_lesions),
        'exact_matches': len(comparison_results['exact_matches']),
        'partial_matches': len(comparison_results['partial_matches']),
        'missing_lesions': len(comparison_results['missing']),
        'missing_details': comparison_results['missing'][:50]  # Top 50
    }
    
    # Sauvegarder le rapport
    report_path = Path(__file__).parent.parent / 'audit_reports' / 'bareme_comparison.json'
    report_path.parent.mkdir(exist_ok=True)
    
    with open(report_path, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Rapport sauvegardé : {report_path}")
    
    # Afficher les lésions manquantes
    if comparison_results['missing']:
        print(f"\n❌ TOP 20 LÉSIONS MANQUANTES :\n")
        for i, lesion in enumerate(comparison_results['missing'][:20], 1):
            rate_str = f"[{lesion['rate'][0]}-{lesion['rate'][1]}%]" if isinstance(lesion['rate'], list) else f"{lesion['rate']}%"
            print(f"   {i}. {lesion['name']} : {rate_str}")

def main():
    """Fonction principale"""
    print("=" * 60)
    print("🔍 EXTRACTION ET COMPARAISON BARÈME AT-MP")
    print("=" * 60 + "\n")
    
    # Chemin du PDF
    pdf_path = Path(__file__).parent.parent / 'BAREME AT-MP.pdf'
    
    if not pdf_path.exists():
        print(f"❌ Fichier non trouvé : {pdf_path}")
        return
    
    # Étape 1 : Extraire le texte du PDF
    pdf_text = extract_text_from_pdf(pdf_path)
    
    # Sauvegarder le texte extrait
    text_output_path = Path(__file__).parent.parent / 'bareme_extracted_python.txt'
    with open(text_output_path, 'w', encoding='utf-8') as f:
        f.write(pdf_text)
    print(f"💾 Texte extrait sauvegardé : {text_output_path}\n")
    
    # Étape 2 : Extraire les lésions
    pdf_lesions = extract_lesions_from_text(pdf_text)
    
    # Étape 3 : Charger la base de données actuelle
    db_lesions = load_current_database()
    
    # Étape 4 : Comparer
    comparison = compare_with_database(pdf_lesions, db_lesions)
    
    # Étape 5 : Générer le rapport
    generate_report(comparison, pdf_lesions)
    
    print("\n" + "=" * 60)
    print("✅ TRAITEMENT TERMINÉ")
    print("=" * 60)

if __name__ == '__main__':
    main()
