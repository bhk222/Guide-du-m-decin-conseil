#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour extraire les produits d'appareillage du PDF 
et générer une base de données enrichie pour la recherche sémantique.
"""

import PyPDF2
import re
import json

def extract_appareillage_from_pdf(pdf_path):
    """Extrait les informations d'appareillage du PDF."""
    products = []
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            print(f"Nombre de pages: {len(pdf_reader.pages)}")
            
            full_text = ""
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                full_text += text + "\n"
                
                # Afficher un aperçu toutes les 10 pages
                if (page_num + 1) % 10 == 0:
                    print(f"Page {page_num + 1} extraite...")
            
            # Sauvegarder le texte brut
            with open('appareillage_extracted_raw.txt', 'w', encoding='utf-8') as f:
                f.write(full_text)
            print(f"\nTexte brut sauvegardé dans appareillage_extracted_raw.txt")
            print(f"Longueur totale: {len(full_text)} caractères")
            
            # Parser le texte pour extraire les produits
            products = parse_products(full_text)
            
    except Exception as e:
        print(f"Erreur lors de l'extraction: {e}")
        return []
    
    return products

def parse_products(text):
    """Parse le texte pour extraire les produits d'appareillage avec TOUS les détails."""
    products = []
    
    # Patterns de recherche ENRICHIS pour différents types de produits
    patterns = {
        'Prothèses': [
            r'(?i)prothèse\s+([^\n.]+?)(?:\s*[-:]\s*([^\n]+))?',
            r'(?i)membre\s+(?:artificiel|prothétique)\s+([^\n]+)',
            r'(?i)amputation\s+[^\n]+\s+prothèse\s+([^\n]+)',
        ],
        'Orthèses': [
            r'(?i)orthèse\s+([^\n.]+?)(?:\s*[-:]\s*([^\n]+))?',
            r'(?i)(?:corset|attelle|collier|genouillère|chevillère)\s+([^\n]+)',
            r'(?i)maintien\s+(?:du|de la|des)\s+([^\n]+)',
        ],
        'Chaussures orthopédiques': [
            r'(?i)chaussure\s+(?:orthopédique|thérapeutique|correctrice)\s+([^\n]+)',
            r'(?i)semelle\s+(?:orthopédique|thermoformée|de correction)\s+([^\n]+)',
            r'(?i)pied\s+(?:bot|plat|creux|valgus|varus)\s+[^\n]+(?:chaussure|semelle)\s+([^\n]+)',
        ],
        'Aides à la mobilité': [
            r'(?i)fauteuil\s+(?:roulant|manuel|électrique)\s+([^\n]+)',
            r'(?i)chaise\s+roulante\s+([^\n]+)',
            r'(?i)(?:canne|béquille|déambulateur)\s+([^\n]+)',
            r'(?i)aide\s+(?:à la marche|technique)\s+([^\n]+)',
        ],
        'Appareillage spécifique': [
            r'(?i)appareil\s+(?:auditif|de correction|de soutien)\s+([^\n]+)',
            r'(?i)prothèse\s+(?:oculaire|mammaire|dentaire)\s+([^\n]+)',
        ],
    }
    
    # Recherche exhaustive par patterns avec catégories
    for category, pattern_list in patterns.items():
        for pattern in pattern_list:
            matches = re.finditer(pattern, text, re.IGNORECASE | re.MULTILINE)
            for match in matches:
                full_match = match.group(0).strip()
                detail_match = match.group(1) if match.lastindex >= 1 else full_match
                
                if len(full_match) > 15 and len(full_match) < 300:
                    # Extraire le contexte autour (±200 caractères)
                    start_pos = max(0, match.start() - 200)
                    end_pos = min(len(text), match.end() + 200)
                    context = text[start_pos:end_pos]
                    
                    # Recherche d'indications médicales dans le contexte
                    indications = extract_indications(context)
                    
                    # Recherche de critères de conformité
                    criteres = extract_criteres(context)
                    
                    # Recherche de références (codes produit)
                    references = extract_references(context)
                    
                    products.append({
                        'category': category,
                        'name': full_match[:150],  # Limiter la longueur
                        'description': detail_match[:250],
                        'indications': indications,
                        'criteres': criteres,
                        'references': references,
                        'context': context[:300]  # Garder le contexte
                    })
    
    # Recherche SPÉCIFIQUE de codes CNAS (SO, PR, OT, CH, etc.)
    cnas_pattern = r'(?:SO|PR|OT|CH|FA|CA|AT|OR)\s*[-_]?\s*\d{2,4}\s*[:\-]?\s*([^\n]{10,200})'
    cnas_matches = re.finditer(cnas_pattern, text, re.IGNORECASE | re.MULTILINE)
    for match in cnas_matches:
        code = match.group(0).split(':')[0].strip()
        description = match.group(1).strip()
        
        # Contexte autour de la référence
        start_pos = max(0, match.start() - 300)
        end_pos = min(len(text), match.end() + 300)
        context = text[start_pos:end_pos]
        
        products.append({
            'code': code,
            'category': determine_category(code),
            'name': f"{code} - {description[:100]}",
            'description': description[:250],
            'indications': extract_indications(context),
            'criteres': extract_criteres(context),
            'references': [code],
            'context': context[:300]
        })
    
    # Recherche de numéros de page avec descriptions détaillées
    page_sections = re.split(r'\n\s*\n', text)
    for section in page_sections:
        # Sections avec "Désignation", "Indication", "Prescription"
        if any(keyword in section.lower() for keyword in ['désignation', 'indication', 'prescription', 'critères', 'conformité']):
            lines = section.split('\n')
            if len(lines) >= 2 and len(section) > 50:
                products.append({
                    'category': 'Section détaillée',
                    'name': lines[0][:150],
                    'description': section[:300],
                    'indications': extract_indications(section),
                    'criteres': extract_criteres(section),
                    'references': extract_references(section),
                    'context': section[:300]
                })
    
    # Dédupliquer en gardant les entrées les plus complètes
    unique_products = []
    seen = set()
    
    for product in products:
        # Clé unique basée sur le nom
        key = re.sub(r'\s+', ' ', product.get('name', '').lower()[:80])
        
        if key and key not in seen and len(key) > 10:
            seen.add(key)
            unique_products.append(product)
    
    # Trier par catégorie puis par nom
    unique_products.sort(key=lambda x: (x.get('category', ''), x.get('name', '')))
    
    return unique_products

def extract_indications(text):
    """Extrait les indications médicales du contexte."""
    indications = []
    
    # Patterns pour indications
    indication_patterns = [
        r'(?i)indication\s*[:\-]\s*([^\n.]+)',
        r'(?i)(?:pour|en cas de)\s+([^\n,]{10,100})',
        r'(?i)(?:pathologie|maladie|affection)\s*[:\-]\s*([^\n]+)',
        r'(?i)(?:après|suite à)\s+([^\n]{10,80})',
        r'(?i)(?:amputation|fracture|luxation|entorse|arthrose|paralysie)\s+([^\n]{5,60})',
    ]
    
    for pattern in indication_patterns:
        matches = re.finditer(pattern, text)
        for match in matches:
            indication = match.group(1).strip()
            if indication and len(indication) > 5:
                indications.append(indication[:100])
    
    return list(set(indications))[:5]  # Max 5 indications uniques

def extract_criteres(text):
    """Extrait les critères de conformité du contexte."""
    criteres = []
    
    # Patterns pour critères
    critere_patterns = [
        r'(?i)critère\s*[:\-]\s*([^\n.]+)',
        r'(?i)conformité\s*[:\-]\s*([^\n]+)',
        r'(?i)(?:norme|standard|spécification)\s+([^\n]{10,100})',
        r'(?i)doit\s+(?:être|comporter|respecter)\s+([^\n]{10,100})',
        r'(?i)caractéristique\s*[:\-]\s*([^\n]+)',
    ]
    
    for pattern in critere_patterns:
        matches = re.finditer(pattern, text)
        for match in matches:
            critere = match.group(1).strip()
            if critere and len(critere) > 5:
                criteres.append(critere[:150])
    
    return list(set(criteres))[:5]  # Max 5 critères uniques

def extract_references(text):
    """Extrait les références CNAS du contexte."""
    references = []
    
    # Patterns de références
    ref_patterns = [
        r'\b(?:SO|PR|OT|CH|FA|CA|AT|OR)[-_]?\d{2,4}\b',
        r'\b\d{3,4}[-_]\d{2,4}\b',
        r'\bRef\.?\s*[:\-]?\s*([A-Z0-9\-]+)\b',
    ]
    
    for pattern in ref_patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            ref = match.group(0).strip().upper()
            if ref and len(ref) >= 4:
                references.append(ref)
    
    return list(set(references))[:3]  # Max 3 références

def determine_category(code):
    """Détermine la catégorie d'un code CNAS."""
    code_upper = code.upper()
    
    if code_upper.startswith('SO'):
        return 'Chaussures orthopédiques'
    elif code_upper.startswith('PR'):
        return 'Prothèses'
    elif code_upper.startswith(('OT', 'OR', 'AT')):
        return 'Orthèses'
    elif code_upper.startswith('CH'):
        return 'Chaussures'
    elif code_upper.startswith('FA'):
        return 'Fauteuils'
    elif code_upper.startswith('CA'):
        return 'Cannes et aides à la marche'
    else:
        return 'Appareillage médical'

def save_products_json(products, output_path):
    """Sauvegarde les produits en JSON."""
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    print(f"\n{len(products)} produits sauvegardés dans {output_path}")

def generate_typescript_database(products, output_path):
    """Génère un fichier TypeScript avec la base de données enrichie."""
    
    # En-tête TypeScript
    ts_content = """// Base de données d'appareillage extraite du Manuel Guide Appareillage Interactif
// Générée automatiquement - Ne pas modifier manuellement

export interface AppareillageProduit {
  id: string;
  nom: string;
  categorie: string;
  description: string;
  motsClefs: string[];
  indications?: string;
  prixReference?: number;
  cnas?: boolean;
}

export const appareillageProduits: AppareillageProduit[] = [
"""
    
    # Ajouter les produits existants (base initiale)
    existing_products = [
        {
            'id': 'CHAUS-001',
            'nom': 'Chaussures orthopédiques sur mesure',
            'categorie': 'Chaussures',
            'description': 'Chaussures orthopédiques confectionnées sur mesure pour correction des déformations du pied',
            'motsClefs': ['chaussure', 'orthopédique', 'pied', 'mesure', 'correction', 'déformation'],
            'indications': 'Pied bot, pied plat, pied creux, inégalité de longueur',
            'cnas': True
        },
        {
            'id': 'ORTH-001',
            'nom': 'Semelles orthopédiques thermoformées',
            'categorie': 'Orthèses plantaires',
            'description': 'Semelles orthopédiques thermoformées pour support de voûte plantaire',
            'motsClefs': ['semelle', 'orthopédique', 'thermoformée', 'voûte', 'plantaire', 'pied'],
            'indications': 'Pied plat, fasciite plantaire, épine calcanéenne',
            'cnas': True
        },
        {
            'id': 'PROT-001',
            'nom': 'Prothèse de membre inférieur (tibiale)',
            'categorie': 'Prothèses',
            'description': 'Prothèse tibiale pour amputation sous le genou',
            'motsClefs': ['prothèse', 'membre inférieur', 'jambe', 'tibia', 'amputation', 'genou'],
            'indications': 'Amputation trans-tibiale',
            'cnas': True
        },
        {
            'id': 'PROT-002',
            'nom': 'Prothèse de membre inférieur (fémorale)',
            'categorie': 'Prothèses',
            'description': 'Prothèse fémorale pour amputation au-dessus du genou',
            'motsClefs': ['prothèse', 'membre inférieur', 'cuisse', 'fémur', 'amputation', 'genou'],
            'indications': 'Amputation trans-fémorale',
            'cnas': True
        },
        {
            'id': 'PROT-003',
            'nom': 'Prothèse de membre supérieur (avant-bras)',
            'categorie': 'Prothèses',
            'description': 'Prothèse d\'avant-bras myoélectrique ou mécanique',
            'motsClefs': ['prothèse', 'membre supérieur', 'bras', 'avant-bras', 'main', 'amputation'],
            'indications': 'Amputation d\'avant-bras',
            'cnas': True
        },
        {
            'id': 'ORTH-002',
            'nom': 'Orthèse de genou (genouillère)',
            'categorie': 'Orthèses membres inférieurs',
            'description': 'Orthèse de genou articulée pour stabilisation',
            'motsClefs': ['orthèse', 'genou', 'genouillère', 'ligament', 'stabilisation', 'arthrose'],
            'indications': 'Laxité ligamentaire, arthrose, post-opératoire',
            'cnas': True
        },
        {
            'id': 'ORTH-003',
            'nom': 'Corset lombo-sacré',
            'categorie': 'Orthèses rachis',
            'description': 'Corset de soutien pour rachis lombaire et sacrum',
            'motsClefs': ['corset', 'lombaire', 'dos', 'rachis', 'soutien', 'lombalgie'],
            'indications': 'Lombalgie chronique, fracture vertébrale',
            'cnas': True
        },
        {
            'id': 'ORTH-004',
            'nom': 'Collier cervical',
            'categorie': 'Orthèses rachis',
            'description': 'Collier cervical rigide ou semi-rigide pour immobilisation du cou',
            'motsClefs': ['collier', 'cervical', 'cou', 'immobilisation', 'cervicalgie', 'whiplash'],
            'indications': 'Entorse cervicale, fracture cervicale, cervicalgie',
            'cnas': True
        },
        {
            'id': 'AIDE-001',
            'nom': 'Fauteuil roulant manuel standard',
            'categorie': 'Aides à la mobilité',
            'description': 'Fauteuil roulant manuel pliant standard',
            'motsClefs': ['fauteuil', 'roulant', 'manuel', 'handicap', 'mobilité', 'paraplégie'],
            'indications': 'Paraplégie, amputation bilatérale, troubles de la marche sévères',
            'cnas': True
        },
        {
            'id': 'AIDE-002',
            'nom': 'Fauteuil roulant électrique',
            'categorie': 'Aides à la mobilité',
            'description': 'Fauteuil roulant électrique pour autonomie accrue',
            'motsClefs': ['fauteuil', 'électrique', 'motorisé', 'autonomie', 'handicap', 'tétraplégie'],
            'indications': 'Tétraplégie, handicap moteur sévère des membres supérieurs',
            'cnas': True
        },
        {
            'id': 'AIDE-003',
            'nom': 'Cannes anglaises (paire)',
            'categorie': 'Aides à la marche',
            'description': 'Cannes béquilles anglaises réglables en hauteur',
            'motsClefs': ['canne', 'béquille', 'anglaise', 'marche', 'appui', 'fracture'],
            'indications': 'Fracture membre inférieur, entorse, décharge partielle',
            'cnas': True
        },
        {
            'id': 'AIDE-004',
            'nom': 'Déambulateur à roulettes',
            'categorie': 'Aides à la marche',
            'description': 'Déambulateur à 4 roues avec freins et siège',
            'motsClefs': ['déambulateur', 'cadre', 'marche', 'équilibre', 'stabilité', 'personne âgée'],
            'indications': 'Troubles de l\'équilibre, faiblesse musculaire, personne âgée',
            'cnas': True
        },
        {
            'id': 'AIDE-005',
            'nom': 'Canne simple réglable',
            'categorie': 'Aides à la marche',
            'description': 'Canne de marche simple avec embout antidérapant',
            'motsClefs': ['canne', 'simple', 'marche', 'appui', 'équilibre'],
            'indications': 'Aide à la marche légère, boiterie',
            'cnas': True
        },
        {
            'id': 'ORTH-005',
            'nom': 'Attelle de poignet',
            'categorie': 'Orthèses membres supérieurs',
            'description': 'Attelle de poignet avec baleines pour immobilisation',
            'motsClefs': ['attelle', 'poignet', 'immobilisation', 'canal carpien', 'entorse'],
            'indications': 'Syndrome du canal carpien, entorse du poignet, tendinite',
            'cnas': True
        },
        {
            'id': 'ORTH-006',
            'nom': 'Orthèse de cheville (chevillère)',
            'categorie': 'Orthèses membres inférieurs',
            'description': 'Chevillère de maintien semi-rigide',
            'motsClefs': ['orthèse', 'cheville', 'chevillère', 'entorse', 'ligament', 'instabilité'],
            'indications': 'Entorse de cheville, instabilité chronique',
            'cnas': True
        },
        {
            'id': 'ORTH-007',
            'nom': 'Releveur de pied (AFO)',
            'categorie': 'Orthèses membres inférieurs',
            'description': 'Orthèse cheville-pied (AFO) pour steppage',
            'motsClefs': ['releveur', 'pied', 'AFO', 'steppage', 'sciatique', 'paralysie'],
            'indications': 'Paralysie du nerf sciatique poplité externe, steppage',
            'cnas': True
        },
        {
            'id': 'ORTH-008',
            'nom': 'Orthèse d\'épaule (épaulière)',
            'categorie': 'Orthèses membres supérieurs',
            'description': 'Orthèse d\'épaule pour immobilisation et décharge',
            'motsClefs': ['orthèse', 'épaule', 'épaulière', 'coiffe', 'rotateurs', 'luxation'],
            'indications': 'Rupture de la coiffe, luxation d\'épaule, post-opératoire',
            'cnas': True
        },
        {
            'id': 'ORTH-009',
            'nom': 'Attelle de main (main au repos)',
            'categorie': 'Orthèses membres supérieurs',
            'description': 'Attelle de repos pour main et doigts en position fonctionnelle',
            'motsClefs': ['attelle', 'main', 'repos', 'doigts', 'rhumatoïde', 'brûlure'],
            'indications': 'Polyarthrite rhumatoïde, brûlure de la main, raideur',
            'cnas': True
        },
        {
            'id': 'PROT-004',
            'nom': 'Prothèse oculaire',
            'categorie': 'Prothèses',
            'description': 'Prothèse oculaire esthétique sur mesure',
            'motsClefs': ['prothèse', 'œil', 'oculaire', 'énucléation', 'éviscération'],
            'indications': 'Énucléation, éviscération, phtisie du globe',
            'cnas': True
        },
        {
            'id': 'PROT-005',
            'nom': 'Prothèse mammaire externe',
            'categorie': 'Prothèses',
            'description': 'Prothèse mammaire externe après mastectomie',
            'motsClefs': ['prothèse', 'sein', 'mammaire', 'mastectomie', 'cancer'],
            'indications': 'Mastectomie pour cancer du sein',
            'cnas': True
        },
    ]
    
    # Convertir les produits en TypeScript
    for idx, product in enumerate(existing_products):
        # Échapper les apostrophes pour TypeScript
        nom = product['nom'].replace("'", "\\'")
        description = product['description'].replace("'", "\\'")
        indications = product.get('indications', '').replace("'", "\\'")
        
        ts_content += "  {\n"
        ts_content += f"    id: '{product['id']}',\n"
        ts_content += f"    nom: '{nom}',\n"
        ts_content += f"    categorie: '{product['categorie']}',\n"
        ts_content += f"    description: '{description}',\n"
        ts_content += f"    motsClefs: {json.dumps(product['motsClefs'], ensure_ascii=False)},\n"
        if 'indications' in product:
            ts_content += f"    indications: '{indications}',\n"
        if 'cnas' in product:
            ts_content += f"    cnas: {str(product['cnas']).lower()},\n"
        ts_content += "  },\n"
    
    # Ajouter TOUS les produits extraits du PDF (453 produits)
    for idx, product in enumerate(products):  # TOUS les produits sans limite
        # Échapper les apostrophes et supprimer les retours à la ligne
        name = product.get('name', '').replace("'", "\\'").replace('\n', ' ').replace('\r', ' ')
        description = product.get('description', '').replace("'", "\\'").replace('\n', ' ').replace('\r', ' ')
        category = product.get('category', 'Autre').replace("'", "\\'").replace('\n', ' ').replace('\r', ' ')
        
        # Nettoyer les espaces multiples
        name = ' '.join(name.split())
        description = ' '.join(description.split())
        category = ' '.join(category.split())
        
        # Récupérer les nouvelles informations
        indications = product.get('indications', [])
        criteres = product.get('criteres', [])
        references = product.get('references', [])
        
        # Nettoyer les indications
        if isinstance(indications, list):
            indications_clean = []
            for ind in indications[:3]:  # Max 3 indications
                ind_clean = ind.replace("'", "\\'").replace('\n', ' ').replace('\r', ' ')
                ind_clean = ' '.join(ind_clean.split())
                if ind_clean:
                    indications_clean.append(ind_clean)
        else:
            indications_clean = []
        
        # Nettoyer les critères
        if isinstance(criteres, list):
            criteres_clean = []
            for crit in criteres[:3]:  # Max 3 critères
                crit_clean = crit.replace("'", "\\'").replace('\n', ' ').replace('\r', ' ')
                crit_clean = ' '.join(crit_clean.split())
                if crit_clean:
                    criteres_clean.append(crit_clean)
        else:
            criteres_clean = []
        
        # Nettoyer les références
        if isinstance(references, list):
            references_clean = [ref.upper() for ref in references if ref]
        else:
            references_clean = []
        
        # Générer des mots-clés à partir du nom et de la description
        keywords = list(set(re.findall(r'\b\w{4,}\b', (name + ' ' + description).lower())))
        
        ts_content += "  {\n"
        ts_content += f"    id: 'PDF-{idx + 1:03d}',\n"
        ts_content += f"    nom: '{name[:150]}',\n"
        ts_content += f"    categorie: '{category}',\n"
        ts_content += f"    description: '{description[:300]}',\n"
        ts_content += f"    motsClefs: {json.dumps(keywords[:15], ensure_ascii=False)},\n"
        
        # Ajouter les indications si présentes
        if indications_clean:
            ts_content += f"    indications: {json.dumps(indications_clean, ensure_ascii=False)},\n"
        
        # Ajouter les critères de conformité si présents
        if criteres_clean:
            ts_content += f"    criteresConformite: {json.dumps(criteres_clean, ensure_ascii=False)},\n"
        
        # Ajouter les références si présentes
        if references_clean:
            ts_content += f"    references: {json.dumps(references_clean, ensure_ascii=False)},\n"
        
        ts_content += f"    cnas: true,\n"
        ts_content += "  },\n"
    
    ts_content += "];\n"
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"\nBase de données TypeScript générée: {output_path}")

if __name__ == "__main__":
    pdf_path = "../Manuel_Guide_Appareillage_Interactif.pdf"
    
    print("=== Extraction des données d'appareillage ===\n")
    products = extract_appareillage_from_pdf(pdf_path)
    
    if products:
        # Sauvegarder en JSON
        save_products_json(products, 'appareillage_products.json')
        
        # Générer la base de données TypeScript
        generate_typescript_database(products, '../data/appareillageProduits.ts')
        
        print("\n✅ Extraction terminée avec succès!")
        print(f"📊 {len(products)} produits extraits")
    else:
        print("\n⚠️ Aucun produit extrait. Vérifiez le PDF.")
