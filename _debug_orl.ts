import { localExpertAnalysis } from './components/AiAnalyzer';

const r = localExpertAnalysis('perforation tympanique bilaterale ; avec surdité de perception profonde bilaterale', []);
console.log('TYPE:', r.type);
console.log('NAME:', (r as any).name);
console.log('RATE:', (r as any).rate);
console.log('PATH:', (r as any).path);
console.log('JUSTIF:', ((r as any).justification || '').substring(0, 200));
