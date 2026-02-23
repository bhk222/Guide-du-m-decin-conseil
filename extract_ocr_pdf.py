"""Extract text from OCR PDF using pymupdf"""
import fitz  # pymupdf
import sys

pdf_path = r"c:\Users\HICHAME\Desktop\Bareme_indicatif_d_evaluation OCR.pdf"

print(f"Opening: {pdf_path}")
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

all_text = []
for i, page in enumerate(doc):
    text = page.get_text()
    if text.strip():
        all_text.append(f"\n=== PAGE {i+1} ===\n{text}")
    else:
        all_text.append(f"\n=== PAGE {i+1} === (empty)\n")

output = "\n".join(all_text)

# Write to file
output_path = r"c:\Users\HICHAME\Desktop\Guide du médecin conseil\bareme_ocr_extracted.txt"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"\nExtracted {len(output)} characters")
print(f"Non-empty pages: {sum(1 for t in all_text if '(empty)' not in t)}")
print(f"Saved to: {output_path}")

# Print first 3000 chars as preview
print("\n--- PREVIEW ---")
print(output[:3000])
