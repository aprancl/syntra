import { z } from "zod";

// Schema for a single flashcard from AI response
const flashcardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  explanation: z.string().optional().nullable(),
  example: z.string().optional().nullable(),
});

export type FlashcardData = z.infer<typeof flashcardSchema>;

// Schema for array of flashcards
const flashcardsArraySchema = z.array(flashcardSchema);

export function parseFlashcardsResponse(response: string): FlashcardData[] {
  // Try to extract JSON from the response
  // The AI might wrap it in markdown code blocks
  let jsonString = response.trim();

  // Remove markdown code blocks if present
  const jsonMatch = jsonString.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    jsonString = jsonMatch[1].trim();
  }

  // Try to find JSON array in the response
  const arrayMatch = jsonString.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    jsonString = arrayMatch[0];
  }

  // Parse JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      `Failed to parse AI response as JSON: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  // Validate against schema
  const result = flashcardsArraySchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `Invalid flashcard data structure: ${result.error.message}`
    );
  }

  // Sanitize and normalize the data
  return result.data.map((card) => ({
    front: sanitizeText(card.front),
    back: sanitizeText(card.back),
    explanation: card.explanation ? sanitizeText(card.explanation) : null,
    example: card.example ? sanitizeText(card.example) : null,
  }));
}

// Basic text sanitization to prevent XSS
function sanitizeText(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}
