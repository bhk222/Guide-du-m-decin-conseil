#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Extraction des lésions du PDF Bareme_indicatif_d_evaluation.pdf
avec analyse médico-légale et comparaison avec la base existante
"""

import json
import re
import os

try:
    import PyPDF2
except ImportError:
    print("❌ Module PyPDF2 requis: pip install PyPDF2")
    exit(1)

def normalize_text(text):
    """Normaliser le texte pour comparaison"""
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    # Enlever accents pour comparaison
    replacements = {
        'à': 'a', 'â': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'î': 'i', 'ï': 'i', 'ô': 'o', 'ö': 'o', 'ù': 'u', 'û': 'u', 'ü': 'u',
        'ç': 'c'
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

def extract_lesions_from_pdf(pdf_path):
    """Extrait les lésions depuis un PDF"""
    
    print(f"📖 Lecture du PDF: {pdf_path}")
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            total_pages = len(pdf_reader.pages)
            print(f"📄 Total de pages: {total_pages}")
            
            full_text = ""
            lesions = []
            
            # Extraire page par page
            for page_num in range(total_pages):
                if (page_num + 1) % 20 == 0:
                    print(f"  Traitement page {page_num + 1}/{total_pages}...")
                
                page = pdf_reader.pages[page_num]
                page_text = page.extract_text()
                full_text += page_text + "\n"
                
                # Chercher patterns dans chaque page
                # Pattern 1: "Description [min-max]" ou "Description [taux]"
                pattern1 = r'([A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ][a-zàâäéèêëïîôùûüç\s\-\'\(\)]+(?:[a-zàâäéèêëïîôùûüç\s\-\'\(\)]+){2,})\s*\[(\d{1,3})\s*(?:-|à)\s*(\d{1,3})\]'
                matches1 = re.finditer(pattern1, page_text)
                for match in matches1:
                    name = match.group(1).strip()
                    min_rate = int(match.group(2))
                    max_rate = int(match.group(3))
                    
                    if len(name) > 10 and min_rate < max_rate and max_rate <= 100:
                        lesions.append({
                            'name': name,
                            'min_rate': min_rate,
                            'max_rate': max_rate,
                            'type': 'range',
                            'page': page_num + 1
                        })
                
                # Pattern 2: "Description: X%"
                pattern2 = r'([A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ][a-zàâäéèêëïîôùûüç\s\-\'\(\)]+(?:[a-zàâäéèêëïîôùûüç\s\-\'\(\)]+){2,})\s*[:\.]\s*(\d{1,3})\s*%'
                matches2 = re.finditer(pattern2, page_text)
                for match in matches2:
                    name = match.group(1).strip()
                    rate = int(match.group(2))
                    
                    if len(name) > 10 and rate <= 100:
                        lesions.append({
                            'name': name,
                            'rate': rate,
                            'type': 'fixed',
                            'page': page_num + 1
                        })
                
                # Pattern 3: "Description X à Y"
                pattern3 = r'([A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ][a-zàâäéèêëïîôùûüç\s\-\'\(\)]+(?:[a-zàâäéèêëïîôùûüç\s\-\'\(\)]+){2,})\s+(\d{1,3})\s+à\s+(\d{1,3})'
                matches3 = re.finditer(pattern3, page_text)
                for match in matches3:
                    name = match.group(1).strip()
                    min_rate = int(match.group(2))
                    max_rate = int(match.group(3))
                    
                    if len(name) > 10 and min_rate < max_rate and max_rate <= 100:
                        lesions.append({
                            'name': name,
                            'min_rate': min_rate,
                            'max_rate': max_rate,
                            'type': 'range',
                            'page': page_num + 1
                        })
            
            # Sauvegarder le texte complet
            output_dir = "extracted_bareme"
            os.makedirs(output_dir, exist_ok=True)
            
            text_output = os.path.join(output_dir, "bareme_pdf_full_text.txt")
            with open(text_output, 'w', encoding='utf-8') as f:
                f.write(full_text)
            
            print(f"\n✅ Extraction terminée")
            print(f"📄 Texte sauvegardé: {text_output}")
            print(f"📊 Caractères extraits: {len(full_text):,}")
            print(f"🔍 Lésions brutes détectées: {len(lesions)}")
            
            # Dédupliquer
            unique_lesions = []
            seen = set()
            
            for lesion in lesions:
                key = normalize_text(lesion['name'])
                if key not in seen and len(lesion['name']) >= 15:
                    seen.add(key)
                    unique_lesions.append(lesion)
            
            print(f"🔍 Lésions uniques: {len(unique_lesions)}")
            
            # Sauvegarder
            json_output = os.path.join(output_dir, "bareme_pdf_lesions.json")
            with open(json_output, 'w', encoding='utf-8') as f:
                json.dump(unique_lesions, f, ensure_ascii=False, indent=2)
            
            print(f"💾 Lésions sauvegardées: {json_output}")
            
            # Échantillon
            if unique_lesions:
                print(f"\n📋 Échantillon (10 premières):")
                for i, lesion in enumerate(unique_lesions[:10], 1):
                    if lesion['type'] == 'fixed':
                        print(f"  {i}. {lesion['name']}: {lesion['rate']}% (page {lesion['page']})")
                    else:
                        print(f"  {i}. {lesion['name']}: {lesion['min_rate']}-{lesion['max_rate']}% (page {lesion['page']})")
            
            return unique_lesions
            
    except Exception as e:
        print(f"❌ Erreur: {e}")
        import traceback
        traceback.print_exc()
        return []

if __name__ == "__main__":
    pdf_path = r"c:\Users\HICHAME\Desktop\Guide du médecin conseil\Bareme_indicatif_d_evaluation.pdf"
    
    if not os.path.exists(pdf_path):
        print(f"❌ Fichier non trouvé: {pdf_path}")
        
        # Essayer d'autres noms
        alternatives = [
            r"c:\Users\HICHAME\Desktop\Guide du médecin conseil\BAREME AT-MP.pdf",
            r"f:\Bareme_indicatif_d_evaluation.pdf"
        ]
        
        for alt in alternatives:
            if os.path.exists(alt):
                print(f"✓ Fichier trouvé: {alt}")
                pdf_path = alt
                break
        else:
            print("❌ Aucun fichier PDF trouvé")
            exit(1)
    
    lesions = extract_lesions_from_pdf(pdf_path)
    print(f"\n✅ Total lésions extraites: {len(lesions)}")
