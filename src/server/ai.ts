import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// Model configuration - using Llama 3.3 70B on Groq (free tier)
export const AI_MODEL = "llama-3.3-70b-versatile";

export interface GenerateFlashcardsResult {
  content: string;
  model: string;
}

export async function generateFlashcards(
  prompt: string
): Promise<GenerateFlashcardsResult> {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: AI_MODEL,
  });

  const text = completion.choices[0]?.message?.content;

  if (!text) {
    throw new Error("No text content in Groq response");
  }

  return {
    content: text,
    model: AI_MODEL,
  };
}
