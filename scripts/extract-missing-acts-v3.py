import re
import json

# Read ORIGINAL nomenclature (clean backup)
with open('c:/Users/HICHAME/Desktop/Guide du médecin conseil/data/nomenclature-complete-fixed.json', 'r', encoding='utf-8') as f:
    original_data = json.load(f)

original_actes = original_data['actes'] if isinstance(original_data, dict) and 'actes' in original_data else original_data
existing_codes = set()
for acte in original_actes:
    code = str(acte.get('code', '')).strip()
    existing_codes.add(code)
    existing_codes.add(code.replace('-', '/'))

# Fix the 3 known $ issues in original data
for acte in original_actes:
    lib = acte.get('libelle', '')
    if '$' in lib:
        lib = lib.replace('trichia$.Is', 'trichiasis')
        lib = lib.replace('$alivaire', 'salivaire')
        lib = lib.replace('ecrp$', 'corps')
        lib = lib.replace('$', 's')
        acte['libelle'] = lib
    # Fix known OCR issues in original
    if 'Thyréostim,line' in lib:
        acte['libelle'] = lib.replace('Thyréostim,line', 'Thyréostimuline')
    # Remove trailing B/K lettre-cle artifacts
    acte['libelle'] = re.sub(r'\s+B\s*$', '', acte['libelle'])
    acte['libelle'] = re.sub(r'\s+K\s*$', '', acte['libelle'])

print(f"Original actes: {len(original_actes)}")

# Read text file for new acts
with open('c:/Users/HICHAME/Desktop/Guide du médecin conseil/nomenclature-complete.txt', 'r', encoding='utf-8-sig') as f:
    txt = f.read()
lines = txt.split('\n')

def get_category_lettre(code_str):
    code_num = code_str.split('/')[0]
    try:
        num = int(code_num)
    except:
        return "Soins", "K"
    if num <= 52: return "Chirurgie", "K"
    elif num <= 62: return "Soins", "K"
    elif num <= 99: return "Chirurgie", "K"
    elif num <= 200: return "Soins", "K"
    elif num <= 600: return "Chirurgie", "K"
    elif num <= 1000: return "Chirurgie", "K"
    elif num <= 1100: return "Chirurgie", "K"
    elif num <= 1200: return "Soins", "K"
    elif num <= 1300: return "Imagerie", "R"
    elif num <= 1720: return "Biologie", "B"
    else: return "Soins", "K"

def clean_libelle(text):
    # Remove dot sequences
    text = re.sub(r'\.{2,}', '', text)
    text = re.sub(r'(\.\s){2,}', '', text)
    # Remove bullet chars
    text = re.sub(r'[*]+', '', text)
    # Remove underscores
    text = re.sub(r'_+', '', text)
    # Remove tilde
    text = re.sub(r'~+', '', text)
    # Replace $ inside words with s
    text = re.sub(r'(?<=\w)\$(?=\w)', 's', text)
    # Remove remaining $ (artifacts at end)
    text = re.sub(r'\$', '', text)
    # Remove isolated periods
    text = re.sub(r'\s+\.\s+', ' ', text)
    # Remove trailing lettre-cle + coefficient
    text = re.sub(r'\s+[BKRZE]\s+\d+\s*$', '', text)
    # Remove trailing paired numbers
    text = re.sub(r'\s+\d{1,3}\s+\d{1,3}\s*$', '', text)
    # Remove trailing single number
    text = re.sub(r'\s+\d{1,3}\s*$', '', text)
    # Remove 0 0 0 patterns
    text = re.sub(r'(\s+0)+\s*$', '', text)
    # Clean edges
    text = re.sub(r'[\.\s,;:\'"*\-~_]+$', '', text)
    text = re.sub(r'^[\.\s,;:\'"*\-~_]+', '', text)
    # Collapse spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_coefficient(text):
    cleaned = text.strip()
    m = re.search(r'\s+([BKRZE])\s+(\d+)\s*$', cleaned)
    if m:
        return int(m.group(2)), cleaned[:m.start()]
    m = re.search(r'\s+(\d+)\s+(\d+)\s*$', cleaned)
    if m:
        n1, n2 = int(m.group(1)), int(m.group(2))
        return (n1, cleaned[:m.start()]) if n1 >= n2 else (n2, cleaned[:m.start()])
    m = re.search(r'\s+(\d+)\s*$', cleaned)
    if m:
        val = int(m.group(1))
        if val <= 500:
            return val, cleaned[:m.start()]
    return 0, cleaned

# Parse acts with multi-line support
act_pattern = re.compile(r'^\s*(\d{4}(?:/\d+)?)\s+(.+?)$')
acts_raw = []
i = 0
while i < len(lines):
    line = lines[i].strip()
    m = act_pattern.match(line)
    if m:
        code = m.group(1)
        rest = m.group(2).strip()
        full_text = rest
        j = i + 1
        while j < len(lines):
            next_line = lines[j].strip()
            if not next_line or act_pattern.match(next_line):
                break
            if re.match(r'^-\d+-$', next_line): break
            if next_line.startswith(('Chapitre', 'CHAPITRE', 'TITRE', 'ART.', 'Section')): break
            full_text += ' ' + next_line
            j += 1
        acts_raw.append((code, full_text))
        i = j
    else:
        i += 1

print(f"Acts parsed from txt: {len(acts_raw)}")

# Build new acts (only missing ones)
new_acts = []
for code, text in acts_raw:
    if code in existing_codes:
        continue
    cat, lettre = get_category_lettre(code)
    coeff, text_no_coeff = extract_coefficient(text)
    libelle = clean_libelle(text_no_coeff)
    if not libelle or len(libelle) < 4:
        continue
    tarif_mult = {'K': 30, 'B': 1, 'R': 1}
    tarif = coeff * tarif_mult.get(lettre, 30)
    new_acts.append({
        'code': code,
        'libelle': libelle,
        'lettreCle': lettre,
        'coefficient': coeff,
        'tarif': tarif,
        'categorie': cat
    })

print(f"New acts: {len(new_acts)}")
cat_counts = {}
for act in new_acts:
    cat_counts[act['categorie']] = cat_counts.get(act['categorie'], 0) + 1
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")

# Merge
all_actes = list(original_actes) + new_acts

def sort_key(a):
    code = str(a.get('code', '99999')).split('/')[0].split('-')[0]
    suffix_str = str(a.get('code', '0'))
    if '/' in suffix_str: suffix = suffix_str.split('/')[-1]
    elif '-' in suffix_str:
        parts = suffix_str.split('-')
        suffix = parts[-1] if len(parts) > 1 else '0'
    else: suffix = '0'
    try: return (int(code), int(suffix) if suffix.isdigit() else 0)
    except: return (99999, 0)

all_actes.sort(key=sort_key)

output_data = {
    'version': '2.0',
    'source': 'Nomenclature Generale des Actes Professionnels - Algerie - Janvier 1987 (complete)',
    'actes': all_actes,
    'total': len(all_actes),
    'categories': sorted(set(a.get('categorie', '') for a in all_actes))
}

output_path = 'c:/Users/HICHAME/Desktop/Guide du médecin conseil/public/nomenclature-complete.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print(f"\nTotal: {len(all_actes)}")
print(f"Saved: {output_path}")

# Verify key entries
for acte in all_actes:
    if acte.get('code') in ('0001', '0591', '1684', '1701'):
        print(f"  {acte['code']}: {acte['libelle'][:80]}")

# Final $ check
bad = sum(1 for a in all_actes if '$' in a.get('libelle', ''))
print(f"Entries with $: {bad}")
