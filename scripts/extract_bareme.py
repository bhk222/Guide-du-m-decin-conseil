#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'extraction du barème AT-MP depuis le PDF
"""

import sys
import os

try:
    import PyPDF2
    print("✅ PyPDF2 installé")
except ImportError:
    print("❌ PyPDF2 non installé. Installation en cours...")
    os.system(f"{sys.executable} -m pip install PyPDF2")
    import PyPDF2

def extract_pdf_text(pdf_path):
    """Extrait le texte du PDF"""
    print(f"📄 Ouverture du PDF: {pdf_path}")
    
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)
        
        print(f"📊 Nombre de pages: {num_pages}")
        
        full_text = ""
        for i, page in enumerate(reader.pages, 1):
            print(f"⏳ Extraction page {i}/{num_pages}...", end='\r')
            text = page.extract_text()
            full_text += f"\n\n=== PAGE {i} ===\n\n{text}"
        
        print(f"\n✅ Extraction terminée ! Total: {len(full_text)} caractères")
        
        return full_text

def main():
    # Chemin du PDF
    pdf_path = os.path.join(os.path.dirname(__file__), '..', 'BAREME AT-MP.pdf')
    
    if not os.path.exists(pdf_path):
        print(f"❌ Fichier PDF non trouvé: {pdf_path}")
        return
    
    # Extraction
    text = extract_pdf_text(pdf_path)
    
    # Sauvegarde
    output_path = os.path.join(os.path.dirname(__file__), '..', 'bareme_extracted.txt')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"💾 Fichier sauvegardé: {output_path}")
    
    # Afficher un aperçu
    print("\n" + "="*60)
    print("APERÇU DU CONTENU (1000 premiers caractères):")
    print("="*60)
    print(text[:1000])
    print("\n... (voir bareme_extracted.txt pour le contenu complet)")

if __name__ == "__main__":
    main()
