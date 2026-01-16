import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateDeckSchema } from "@/lib/validations";
import { buildFlashcardPrompt } from "@/lib/prompt-builder";
import { parseFlashcardsResponse } from "@/lib/flashcard-parser";
import { generateFlashcards, AI_MODEL } from "@/server/ai";
import { z } from "zod";

// Rate limit: 3 generations per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;

export const deckRouter = createTRPCRouter({
  // Generate new flashcard deck
  generate: protectedProcedure
    .input(generateDeckSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, db } = ctx;

      // Check rate limit
      const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
      const recentDecks = await db.deck.count({
        where: {
          userId,
          createdAt: { gte: oneHourAgo },
        },
      });

      if (recentDecks >= RATE_LIMIT_MAX) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `Rate limit exceeded. You can generate ${RATE_LIMIT_MAX} decks per hour. Please try again later.`,
        });
      }

      // Build the prompt
      const prompt = buildFlashcardPrompt({
        sourceLanguage: input.sourceLanguage,
        targetLanguage: input.targetLanguage,
        deckType: input.deckType,
        proficiencyLevel: input.proficiencyLevel,
        cardCount: input.cardCount,
        topicContext: input.topicContext,
        formalityLevel: input.formalityLevel,
      });

      // Generate flashcards using AI
      let aiResponse;
      try {
        aiResponse = await generateFlashcards(prompt);
      } catch (error) {
        console.error("AI generation error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate flashcards. Please try again.",
        });
      }

      // Parse the response
      let cards;
      try {
        cards = parseFlashcardsResponse(aiResponse.content);
      } catch (error) {
        console.error("Parse error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse AI response. Please try again.",
        });
      }

      if (cards.length === 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No flashcards were generated. Please try again.",
        });
      }

      // Create deck with cards in database
      const deckName = `${input.sourceLanguage} → ${input.targetLanguage} (${input.deckType.replace("_", " ").toLowerCase()})`;

      const deck = await db.deck.create({
        data: {
          userId,
          name: deckName,
          sourceLanguage: input.sourceLanguage,
          targetLanguage: input.targetLanguage,
          deckType: input.deckType,
          proficiencyLevel: input.proficiencyLevel,
          topicContext: input.topicContext,
          formalityLevel: input.formalityLevel,
          cardCount: cards.length,
          promptUsed: prompt,
          modelUsed: AI_MODEL,
          cards: {
            create: cards.map((card, index) => ({
              front: card.front,
              back: card.back,
              explanation: card.explanation,
              example: card.example,
              orderIndex: index,
            })),
          },
        },
        include: {
          cards: {
            orderBy: { orderIndex: "asc" },
          },
        },
      });

      return deck;
    }),

  // Get all decks for the current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const decks = await ctx.db.deck.findMany({
      where: { userId: ctx.userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { cards: true },
        },
      },
    });

    return decks;
  }),

  // Get a single deck by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const deck = await ctx.db.deck.findUnique({
        where: { id: input.id },
        include: {
          cards: {
            orderBy: { orderIndex: "asc" },
          },
        },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      // Verify ownership
      if (deck.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have access to this deck",
        });
      }

      return deck;
    }),

  // Delete a deck
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deck = await ctx.db.deck.findUnique({
        where: { id: input.id },
      });

      if (!deck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Deck not found",
        });
      }

      // Verify ownership
      if (deck.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have access to this deck",
        });
      }

      await ctx.db.deck.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
