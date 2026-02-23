import re
import json

# Read existing nomenclature
with open('c:/Users/HICHAME/Desktop/Guide du médecin conseil/public/nomenclature-complete.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
existing_codes = set()
for acte in data['actes']:
    code = str(acte['code']).strip()
    existing_codes.add(code)
    existing_codes.add(code.replace('-', '/'))

# Read text file
with open('c:/Users/HICHAME/Desktop/Guide du médecin conseil/nomenclature-complete.txt', 'r', encoding='utf-8-sig') as f:
    txt = f.read()

lines = txt.split('\n')

def get_category_lettre(code_str):
    """Determine category and lettre based on code number"""
    code_num = code_str.split('/')[0]
    try:
        num = int(code_num)
    except:
        return "Soins", "K"

    if num <= 52:
        return "Chirurgie", "K"
    elif num <= 62:
        return "Soins", "K"
    elif num <= 99:
        return "Chirurgie", "K"
    elif num <= 200:
        return "Soins", "K"
    elif num <= 600:
        return "Chirurgie", "K"
    elif num <= 1000:
        return "Chirurgie", "K"
    elif num <= 1100:
        return "Chirurgie", "K"
    elif num <= 1200:
        return "Soins", "K"
    elif num <= 1300:
        return "Imagerie", "R"
    elif num <= 1720:
        return "Biologie", "B"
    else:
        return "Soins", "K"

def clean_libelle(text):
    """Clean OCR artifacts from libelle"""
    text = re.sub(r'\.{2,}', '', text)
    text = re.sub(r'[_]{2,}', '', text)
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[\.\s,;:]+$', '', text)
    text = re.sub(r'^[\.\s,;:]+', '', text)
    text = re.sub(r'\s+[BKRZE]\s*$', '', text)
    text = re.sub(r'\s+[BKRZE]\s+\d+\s*$', '', text)
    text = re.sub(r'\s+\d{1,3}\s+\d{1,3}\s*$', '', text)
    text = re.sub(r'\s+\d{1,3}\s*$', '', text)
    text = re.sub(r'[\.\s,;:]+$', '', text)
    return text.strip()

def extract_coefficient(text, lettre):
    """Extract coefficient from the tail of the text"""
    cleaned = text.strip()

    m = re.search(r'\s+([BKRZE])\s+(\d+)\s*$', cleaned)
    if m:
        return int(m.group(2)), cleaned[:m.start()]

    m = re.search(r'\s+(\d+)\s+(\d+)\s*$', cleaned)
    if m:
        n1, n2 = int(m.group(1)), int(m.group(2))
        if n1 >= n2:
            return n1, cleaned[:m.start()]
        else:
            return n2, cleaned[:m.start()]

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
            if re.match(r'^-\d+-$', next_line):
                break
            if next_line.startswith('Chapitre') or next_line.startswith('CHAPITRE'):
                break
            if next_line.startswith('TITRE') or next_line.startswith('ART.'):
                break
            if next_line.startswith('Section'):
                break
            full_text += ' ' + next_line
            j += 1
        acts_raw.append((code, full_text, i))
        i = j
    else:
        i += 1

print(f"Total acts parsed: {len(acts_raw)}")

# Build new acts
new_acts = []
for code, text, line_idx in acts_raw:
    if code in existing_codes:
        continue

    cat, lettre = get_category_lettre(code)
    coeff, text_without_coeff = extract_coefficient(text, lettre)
    libelle = clean_libelle(text_without_coeff)

    if not libelle or len(libelle) < 4:
        continue

    tarif_mult = {'K': 30, 'B': 1, 'R': 1, 'Z': 1, 'E': 1, 'C': 1, 'S': 1}
    tarif = coeff * tarif_mult.get(lettre, 30)

    new_acts.append({
        'code': code,
        'libelle': libelle,
        'lettreCle': lettre,
        'coefficient': coeff,
        'tarif': tarif,
        'categorie': cat
    })

print(f"New acts to add: {len(new_acts)}")

# Category breakdown
cat_counts = {}
for act in new_acts:
    cat_counts[act['categorie']] = cat_counts.get(act['categorie'], 0) + 1
for cat, count in sorted(cat_counts.items()):
    print(f"  {cat}: {count}")

# Merge with existing data
all_actes = data['actes'] + new_acts

def sort_key(a):
    code = str(a['code']).split('/')[0].split('-')[0]
    suffix_str = str(a['code'])
    if '/' in suffix_str:
        suffix = suffix_str.split('/')[-1]
    elif '-' in suffix_str:
        suffix = suffix_str.split('-')[-1]
    else:
        suffix = '0'
    try:
        return (int(code), int(suffix) if suffix.isdigit() else 0)
    except:
        return (99999, 0)

all_actes.sort(key=sort_key)

data['actes'] = all_actes
data['total'] = len(all_actes)

# Save
output_path = 'c:/Users/HICHAME/Desktop/Guide du médecin conseil/public/nomenclature-complete.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\nTotal actes in updated JSON: {len(all_actes)}")
print(f"Saved to: {output_path}")

# Also print some samples
print("\nSample new acts:")
for act in new_acts[:10]:
    print(f"  [{act['code']}] ({act['lettreCle']}{act['coefficient']}, {act['categorie']}) {act['libelle'][:90]}")

bio = [a for a in new_acts if a['categorie'] == 'Biologie']
print(f"\nBiology acts added: {len(bio)}")
for act in bio[:10]:
    print(f"  [{act['code']}] ({act['lettreCle']}{act['coefficient']}) {act['libelle'][:90]}")
