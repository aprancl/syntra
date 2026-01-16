import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

// Model configuration - using Gemini 2.0 Flash (free tier)
export const AI_MODEL = "gemini-2.0-flash";

export interface GenerateFlashcardsResult {
  content: string;
  model: string;
}

export async function generateFlashcards(
  prompt: string
): Promise<GenerateFlashcardsResult> {
  const model = genAI.getGenerativeModel({ model: AI_MODEL });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text) {
    throw new Error("No text content in Gemini response");
  }

  return {
    content: text,
    model: AI_MODEL,
  };
}
