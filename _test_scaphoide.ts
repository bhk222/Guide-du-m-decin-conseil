import { comprehensiveSingleLesionAnalysis } from './components/AiAnalyzer';

const r = comprehensiveSingleLesionAnalysis('agent technique chute bureau fracture scaphoide droit pseudarthrose raideur poignet dorsiflexion 35 palmarflexion 45');
console.log('RTYPE=' + r.type);
console.log('RRATE=' + r.rate);
// Log all known fields
const a = r as any;
if (a.injury) console.log('RNAME=' + a.injury.name);
if (a.name) console.log('RDIRECTNAME=' + a.name);
if (a.choices) {
    console.log('RCHOICES=' + a.choices.length);
    a.choices.slice(0, 5).forEach((c: any) => {
        console.log('RCHOICE=' + c.name + ' | rate=' + JSON.stringify(c.rate));
    });
}
if (a.lesions) {
    console.log('RLESIONS=' + a.lesions.length);
    a.lesions.forEach((l: any) => {
        console.log('RLESION=' + (l.name || l.injury?.name || 'unknown') + ' | rate=' + (l.rate || l.injury?.rate || '?'));
    });
}
// Dump keys
console.log('RKEYS=' + Object.keys(r).join(','));
