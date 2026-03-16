import { localExpertAnalysis } from './components/AiAnalyzer';

const input = 'opérateur presse fracture radius distal + section tendons extenseurs + section nerf médian poignet droit dominant raideur poignet et doigts force pince nulle';
const result = localExpertAnalysis(input);
console.log('XRESULT_TYPE:', result.type);
console.log('XRESULT_RATE:', (result as any).rate);
console.log('XRESULT_NAME:', (result as any).name);
