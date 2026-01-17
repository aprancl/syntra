# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

Syntra is an AI-powered flashcard generation platform for language learners. **Phase 2 (AI Generation) is complete.**

- Phase 0: Project setup, auth, basic UI
- Phase 1: Data models, deck listing
- **Phase 2: AI flashcard generation (CURRENT - COMPLETE)**
- Phase 3: Deck management enhancements (next)
- Phase 4: Polish and optimization
- Phase 5: Study mode with spaced repetition

## Commands

```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Build for production (runs prisma generate first)
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run typecheck    # Run TypeScript check
npm run db:push      # Push Prisma schema to database
npm run db:studio    # Open Prisma Studio for database inspection
```

## Architecture

Syntra is a Next.js 16 App Router application for AI-powered flashcard generation.

### Tech Stack

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS** with shadcn/ui components
- **Clerk** for authentication
- **Prisma** with PostgreSQL (Vercel Postgres)
- **tRPC** for type-safe APIs
- **Groq** with Llama 3.3 70B for AI generation

### Environment Variables

```env
DATABASE_URL              # Pooled Postgres connection
POSTGRES_URL_NON_POOLING  # Direct connection (for migrations)
NEXT_PUBLIC_CLERK_*       # Clerk auth keys
CLERK_SECRET_KEY          # Clerk server key
GROQ_API_KEY              # Groq API key for AI generation
```

## Key Files

### AI Generation

- `src/server/ai.ts` - Groq client, model config, generateFlashcards()
- `src/lib/prompt-builder.ts` - Builds prompts for WORDS/PHRASES/SENTENCE_FRAGMENTS
- `src/lib/flashcard-parser.ts` - Parses AI JSON response into card objects

### tRPC API

- `src/server/api/trpc.ts` - tRPC init, context, protectedProcedure
- `src/server/api/routers/deck.ts` - Deck CRUD + generate mutation
- `src/server/api/root.ts` - Root router registration

### Pages

- `src/app/(protected)/generate/page.tsx` - Flashcard generation form
- `src/app/(protected)/dashboard/page.tsx` - User's deck list
- `src/app/(protected)/deck/[deckId]/page.tsx` - Deck viewer with flip cards

### Database

- `prisma/schema.prisma` - User, Deck, Card models

## Key Architectural Patterns

### tRPC Setup (two entry points)

```typescript
// Client components - use React Query hooks
import { api } from "@/lib/trpc/client";
const { data } = api.deck.getAll.useQuery();
const mutation = api.deck.generate.useMutation();

// Server components - await the caller
import { api } from "@/lib/trpc/server";
const caller = await api();
const decks = await caller.deck.getAll();
```

### User ID Resolution (IMPORTANT)

The `protectedProcedure` in `src/server/api/trpc.ts` handles Clerk → Database user mapping:

- Clerk auth provides `clerkId`
- `protectedProcedure` finds/creates User record by clerkId
- `ctx.userId` is the **database User.id**, not the Clerk ID
- This is required because Deck.userId references User.id

### Route Groups

- `(auth)/*` - Public auth pages (sign-in, sign-up) using Clerk components
- `(protected)/*` - Authenticated routes; layout enforces auth via `auth()` check
- Public routes defined in `src/middleware.ts` via `createRouteMatcher`

### tRPC Procedures

- `publicProcedure` - No auth required
- `protectedProcedure` - Requires authenticated user; provides `ctx.userId` (database ID) and `ctx.clerkId`
- Add new routers in `src/server/api/routers/` and register in `root.ts`

### Database

- Prisma schema in `prisma/schema.prisma`
- Uses connection pooling via `DATABASE_URL` and direct connection via `POSTGRES_URL_NON_POOLING`
- Run `npm run db:push` after schema changes (no migrations in dev)

## Data Flow: Generating Flashcards

1. User fills form on `/generate`
2. Form validated with Zod (`src/lib/validations.ts`)
3. tRPC mutation `deck.generate` called
4. `protectedProcedure` resolves database userId
5. Rate limit checked (3/hour)
6. Prompt built via `buildFlashcardPrompt()`
7. AI called via `generateFlashcards()` (Groq/Llama)
8. Response parsed via `parseFlashcardsResponse()`
9. Deck + Cards saved to database
10. Redirect to `/deck/[deckId]`

## Common Tasks

### Add a new tRPC procedure

1. Add procedure in `src/server/api/routers/deck.ts` (or create new router)
2. If new router, register in `src/server/api/root.ts`

### Change AI model

Edit `src/server/ai.ts` - change `AI_MODEL` constant

### Add new form field to generation

1. Update Zod schema in `src/lib/validations.ts`
2. Update form in `src/app/(protected)/generate/page.tsx`
3. Update prompt templates in `src/lib/prompt-builder.ts`
4. Update Prisma schema if storing new field

## Documentation

- `docs/PRD.md` - Complete Product Requirements Document with all feature specs, data models, and future phases
- `docs/UI_REDESIGN.md` - UI redesign plan with warm orange/white glassmorphism theme
