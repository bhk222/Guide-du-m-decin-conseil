// Test logic vision isolée
const text1 = "cataracte post traumatique avec baisse acuité visuelle OD 4/10 OG 8/10";
const text2 = "cataracte OD 8/10";

function testVisionLogic(text: string) {
    console.log(`\nTest: "${text}"`);
    
    const visionMatch = /vision|acuit[eé]\s+visuelle|cataracte|[oœ]il|od|og/i.test(text);
    console.log(`Vision match: ${visionMatch}`);
    
    if (visionMatch) {
        const acuiteMatch = text.match(/(?:acuit[eé]|vision|od|og)[^\d]*(\d+)\/10/i);
        console.log(`Acuite match: ${acuiteMatch ? acuiteMatch[1] : 'none'}`);
        
        if (acuiteMatch && /cataracte/i.test(text)) {
            const acuite = parseInt(acuiteMatch[1]);
            let calculatedRate: number;
            let severity: string;
            
            if (acuite >= 8) {
                calculatedRate = 20; severity = 'Légère';
            } else if (acuite >= 5) {
                calculatedRate = 35; severity = 'Moyenne';
            } else if (acuite >= 2) {
                calculatedRate = 50; severity = 'Sévère';
            } else {
                calculatedRate = 60; severity = 'Très sévère';
            }
            
            console.log(`Result: ${acuite}/10 = ${severity} → ${calculatedRate}%`);
        }
    }
}

testVisionLogic(text1);
testVisionLogic(text2);
