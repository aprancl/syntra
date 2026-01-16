import { z } from "zod";

// Supported languages
export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
] as const;

export type Language = (typeof LANGUAGES)[number];

// Deck types
export const DECK_TYPES = ["WORDS", "PHRASES", "SENTENCE_FRAGMENTS"] as const;
export type DeckType = (typeof DECK_TYPES)[number];

// Proficiency levels
export const PROFICIENCY_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;
export type ProficiencyLevel = (typeof PROFICIENCY_LEVELS)[number];

// Formality levels
export const FORMALITY_LEVELS = ["Casual", "Neutral", "Formal"] as const;
export type FormalityLevel = (typeof FORMALITY_LEVELS)[number];

// Card count options
export const CARD_COUNTS = [10, 25, 50] as const;
export type CardCount = (typeof CARD_COUNTS)[number];

// Schema for generating a new deck
export const generateDeckSchema = z
  .object({
    sourceLanguage: z.enum(LANGUAGES),
    targetLanguage: z.enum(LANGUAGES),
    deckType: z.enum(DECK_TYPES),
    proficiencyLevel: z.enum(PROFICIENCY_LEVELS).default("Intermediate"),
    cardCount: z.coerce
      .number()
      .refine((val) => CARD_COUNTS.includes(val as CardCount), {
        message: "Please select a valid card count",
      })
      .default(25),
    topicContext: z.string().max(200).optional(),
    formalityLevel: z.enum(FORMALITY_LEVELS).default("Neutral"),
  })
  .refine((data) => data.sourceLanguage !== data.targetLanguage, {
    message: "Source and target languages must be different",
    path: ["targetLanguage"],
  });

export type GenerateDeckInput = z.infer<typeof generateDeckSchema>;

// Deck type labels for UI
export const DECK_TYPE_LABELS: Record<
  DeckType,
  { label: string; description: string }
> = {
  WORDS: {
    label: "Individual Words",
    description: "High-frequency vocabulary with translations",
  },
  PHRASES: {
    label: "Phrases",
    description: "Common multi-word expressions (2-6 words)",
  },
  SENTENCE_FRAGMENTS: {
    label: "Sentence Fragments",
    description: "Reusable sentence building blocks (3-8 words)",
  },
};
