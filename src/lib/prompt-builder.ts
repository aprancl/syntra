export type DeckType = "WORDS" | "PHRASES" | "SENTENCE_FRAGMENTS";

export interface PromptConfig {
  sourceLanguage: string;
  targetLanguage: string;
  deckType: DeckType;
  proficiencyLevel: string;
  cardCount: number;
  topicContext?: string;
  formalityLevel: string;
}

function buildWordsPrompt(config: PromptConfig): string {
  const {
    sourceLanguage,
    targetLanguage,
    proficiencyLevel,
    cardCount,
    topicContext,
    formalityLevel,
  } = config;

  return `You are an expert language teacher specializing in ${sourceLanguage} to ${targetLanguage} instruction.

Generate a set of ${cardCount} flashcards for learning individual ${sourceLanguage} words.

Target Audience: ${proficiencyLevel} level learner
${topicContext ? `Topic Focus: ${topicContext}` : ""}
Formality: ${formalityLevel}

Requirements:
- Select high-frequency, practical vocabulary appropriate for ${proficiencyLevel} learners
- Provide clear, concise ${targetLanguage} translations
- Include part of speech (noun, verb, adjective, etc.)
- Add a brief usage note or example sentence when helpful for clarity
${topicContext ? `- Focus on vocabulary related to: ${topicContext}` : ""}

Return your response as a JSON array with this exact structure:
[
  {
    "front": "source language word",
    "back": "target language translation",
    "explanation": "part of speech, brief usage note",
    "example": "optional example sentence in source language with translation"
  }
]

Ensure the JSON is valid and properly formatted. Return ONLY the JSON array, no other text.`;
}

function buildPhrasesPrompt(config: PromptConfig): string {
  const {
    sourceLanguage,
    targetLanguage,
    proficiencyLevel,
    cardCount,
    topicContext,
    formalityLevel,
  } = config;

  return `You are an expert language teacher specializing in ${sourceLanguage} to ${targetLanguage} instruction.

Generate a set of ${cardCount} flashcards for learning common ${sourceLanguage} phrases.

Target Audience: ${proficiencyLevel} level learner
${topicContext ? `Topic Focus: ${topicContext}` : ""}
Formality: ${formalityLevel}

Requirements:
- Select useful, real-world phrases that learners frequently need
- Phrases should be 2-6 words in length
- Provide natural ${targetLanguage} equivalents (not literal word-by-word translations)
- Include context for when/how to use each phrase
- Prioritize ${formalityLevel.toLowerCase()} register phrases
${topicContext ? `- Focus on phrases related to: ${topicContext}` : ""}

Return your response as a JSON array with this exact structure:
[
  {
    "front": "source language phrase",
    "back": "target language equivalent",
    "explanation": "when/how to use this phrase",
    "example": "example dialogue or situation using the phrase"
  }
]

Ensure the JSON is valid and properly formatted. Return ONLY the JSON array, no other text.`;
}

function buildSentenceFragmentsPrompt(config: PromptConfig): string {
  const {
    sourceLanguage,
    targetLanguage,
    proficiencyLevel,
    cardCount,
    topicContext,
    formalityLevel,
  } = config;

  return `You are an expert language teacher specializing in ${sourceLanguage} to ${targetLanguage} instruction, with expertise in communicative language teaching methods.

Generate a set of ${cardCount} flashcards featuring SENTENCE FRAGMENTS in ${sourceLanguage}.

THEORY: Learners who memorize useful sentence fragments can rapidly construct complex sentences by combining these building blocks. Focus on fragments that are:
- Highly reusable across multiple contexts
- Grammatically complete building blocks (subject-verb pairs, verb phrases with objects, prepositional phrases, etc.)
- Practical for everyday communication

Target Audience: ${proficiencyLevel} level learner
${topicContext ? `Topic Focus: ${topicContext}` : ""}
Formality: ${formalityLevel}

Requirements:
- Fragments should be 3-8 words long
- Each fragment should be combinable with other fragments to form full sentences
- Include grammatical notes explaining the fragment's structure
- Provide 2-3 example sentences showing how the fragment can be used in different contexts
- Prioritize fragments with high utility and frequency
${topicContext ? `- Focus on fragments related to: ${topicContext}` : ""}

Examples of good sentence fragments:
- "I would like to..." (starter for requests)
- "...as soon as possible" (time qualifier)
- "Could you help me with..." (polite request opener)
- "It depends on..." (conditional response)

Return your response as a JSON array with this exact structure:
[
  {
    "front": "source language sentence fragment",
    "back": "target language equivalent",
    "explanation": "grammatical structure and usage notes",
    "example": "2-3 complete sentences using this fragment in different ways, with translations"
  }
]

Ensure the JSON is valid and properly formatted. Return ONLY the JSON array, no other text.`;
}

export function buildFlashcardPrompt(config: PromptConfig): string {
  switch (config.deckType) {
    case "WORDS":
      return buildWordsPrompt(config);
    case "PHRASES":
      return buildPhrasesPrompt(config);
    case "SENTENCE_FRAGMENTS":
      return buildSentenceFragmentsPrompt(config);
    default:
      throw new Error(`Unknown deck type: ${config.deckType}`);
  }
}
