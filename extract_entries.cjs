const fs = require('fs');
const content = fs.readFileSync('data/disabilityRates.new.ts', 'utf8');

// Remove the TypeScript type annotation and export
let jsContent = content
  .replace(/^import\s+.*$/gm, '')
  .replace("export const disabilityData: InjuryCategory[] = [", "const disabilityData = [");

// Write a temporary file and eval it
const wrapped = jsContent + '\nmodule.exports = disabilityData;';
fs.writeFileSync('_temp_data.cjs', wrapped, 'utf8');

const data = require('./_temp_data.cjs');

let totalEntries = 0;
let output = [];

data.forEach((cat, ci) => {
  output.push('');
  output.push('='.repeat(80));
  output.push(`CATÉGORIE ${ci+1}: ${cat.name}`);
  output.push('='.repeat(80));
  
  cat.subcategories.forEach((sub) => {
    output.push('');
    output.push(`  --- ${sub.name} (${sub.injuries.length} entrées) ---`);
    
    sub.injuries.forEach((inj) => {
      totalEntries++;
      const rateStr = Array.isArray(inj.rate) ? `${inj.rate[0]}-${inj.rate[1]}%` : `${inj.rate}%`;
      const hasRC = inj.rateCriteria ? 'OUI' : 'non';
      const hasDesc = inj.description ? 'OUI' : 'non';
      let rcDetail = '';
      if (inj.rateCriteria) {
        const parts = [];
        if (inj.rateCriteria.low) parts.push('low');
        if (inj.rateCriteria.medium) parts.push('medium');
        if (inj.rateCriteria.high) parts.push('high');
        rcDetail = ` (${parts.join('/')})`;
      }
      output.push(`    ${totalEntries}. ${inj.name}`);
      output.push(`       Taux: ${rateStr} | RateCriteria: ${hasRC}${rcDetail} | Description: ${hasDesc}`);
    });
  });
});

output.push('');
output.push('='.repeat(80));
output.push(`TOTAL ENTRÉES: ${totalEntries}`);
output.push(`TOTAL CATÉGORIES: ${data.length}`);
let totalSub = 0;
data.forEach(c => totalSub += c.subcategories.length);
output.push(`TOTAL SOUS-CATÉGORIES: ${totalSub}`);

fs.writeFileSync('EXTRACTION_COMPLETE_BAREME.txt', output.join('\n'), 'utf8');
console.log(`Done. Total entries: ${totalEntries}, Categories: ${data.length}, Subcategories: ${totalSub}`);

// Clean up
fs.unlinkSync('_temp_data.cjs');
