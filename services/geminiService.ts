import { GoogleGenAI } from "@google/genai";

// This check is to ensure that the environment variable is available.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Uses Gemini to correct typos and extract key medical terms from a user's query.
 * @param query The user's clinical description.
 * @returns A promise that resolves to an array of cleaned-up keywords.
 */
export const enhanceQueryWithAI = async (query: string): Promise<string[]> => {
  try {
    const prompt = `You are a medical terminology expert specializing in French. A user has described a clinical condition. Your task is to correct any spelling mistakes and extract the most important clinical keywords from the following text. Return only a comma-separated list of these keywords. Do not add any explanation, preamble, or markdown.

User text: "${query}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const text = response.text.trim();
    
    // Return keywords as an array, filtering out any empty strings
    return text.split(',').map(kw => kw.trim().toLowerCase()).filter(kw => kw.length > 0);

  } catch (error) {
    console.error("Error enhancing query with AI:", error);
    // Fallback: return keywords from original query on error
    return query.toLowerCase().split(' ').filter(w => w.length > 2);
  }
};
