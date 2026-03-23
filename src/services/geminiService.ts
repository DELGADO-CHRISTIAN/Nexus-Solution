import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiService = {
  async analyzeSEO(domain: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the SEO performance and provide strategic recommendations for the domain: ${domain}. 
      Provide insights on:
      1. Potential high-value keywords.
      2. Content gaps.
      3. Technical SEO improvements.
      4. Competitive advantages.
      
      Format the response as a professional executive summary.`,
    });
    return response.text;
  },

  async suggestKeywords(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a list of 10 high-potential SEO keywords for the topic: ${topic}. 
      For each keyword, provide:
      - Search Volume (estimated)
      - Difficulty (0-100)
      - Intent (Informational, Transactional, Navigational)
      
      Return the data in a structured JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              keyword: { type: Type.STRING },
              volume: { type: Type.STRING },
              difficulty: { type: Type.NUMBER },
              intent: { type: Type.STRING }
            },
            required: ["keyword", "volume", "difficulty", "intent"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async generateContentIdea(keyword: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 creative content ideas (titles and brief outlines) for the keyword: ${keyword}. 
      Focus on high-engagement formats like "Ultimate Guides", "Case Studies", or "Expert Interviews".`,
    });
    return response.text;
  },

  async askCustomQuestion(question: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert SEO consultant. Answer the following question with actionable insights: ${question}`,
    });
    return response.text;
  }
};
