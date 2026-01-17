# Syntra - Product Requirements Document (PRD)

## Executive Summary

**Project Name**: Syntra
**Description**: AI-powered flashcard generation platform for language learners
**Deployment**: Vercel
**Status**: Greenfield project (currently only README.md exists)

Syntra is a web application that enables language learners to generate high-quality flashcards using AI. The platform's key differentiator is its **sentence fragments theory** - the hypothesis that learners can accelerate language acquisition by memorizing reusable sentence fragments that can be combined to form complex sentences.

---

## Tech Stack

### Frontend

- **Next.js 14.2+** (App Router) - React framework with server components
- **React 18+** - UI library
- **TypeScript 5+** - Type safety
- **Tailwind CSS 3+** - Utility-first styling
- **shadcn/ui** - Accessible component library built on Radix UI
- **Lucide React** - Icon library

### Authentication

- **Clerk** - User authentication and management
  - 10k MAU free tier
  - Built-in UI components
  - Next.js middleware integration

### Database & API

- **Vercel Postgres** - Managed PostgreSQL database
- **Prisma 5+** - Type-safe ORM with migrations
- **tRPC 10+** - End-to-end type-safe APIs
- **@tanstack/react-query 5+** - Data fetching and caching

### AI Integration

- **Anthropic Claude SDK** (@anthropic-ai/sdk)
- **Claude 3.5 Haiku** - Cost-efficient model for flashcard generation
  - Cost: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
  - Expected cost per 25-card deck: ~$0.0016

### Form Management

- **React Hook Form 7+** - Performant form handling
- **Zod 3+** - Schema validation (shared client/server)

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript Strict Mode** - Maximum type safety

---

## Application Pages & Routes

### Public Routes

#### `/` (Landing Page)

- Hero section with value proposition
- Features overview (sentence fragments, AI-powered, multi-language)
- Sample flashcard preview (static demonstration)
- Call-to-action buttons (Sign Up / Sign In)

#### `/sign-in` & `/sign-up`

- Clerk-managed authentication pages
- Redirect to `/dashboard` after successful authentication

### Protected Routes (Require Authentication)

#### `/dashboard`

- Overview of user's saved decks
- Quick stats (total decks, total cards, languages studied)
- Grid/list view toggle for deck display
- Deck cards showing:
  - Deck name
  - Language pair (e.g., "Spanish → English")
  - Deck type badge (Words/Phrases/Sentence Fragments)
  - Card count
  - Creation date
- "Create New Deck" CTA button
- Filter/sort options (by language, date, deck type)
- Empty state for new users with onboarding guidance

#### `/generate` (Flashcard Generation Form)

**Primary user interaction point** - Form that builds an AI prompt based on user selections:

**Form Fields:**

1. **Source Language** (dropdown)
   - Major languages: English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean

2. **Target Language** (dropdown)
   - Same options as source language
   - Validation: Must differ from source

3. **Deck Type** (radio buttons)
   - **Individual Words** - High-frequency vocabulary with translations
   - **Phrases** - Common multi-word expressions (2-6 words)
   - **Sentence Fragments** ⭐ (Recommended) - Reusable sentence building blocks (3-8 words)

4. **Advanced Settings** (collapsible section)
   - **Proficiency Level**: Beginner / Intermediate / Advanced
   - **Number of Cards**: 10, 25, or 50
   - **Topic/Context** (optional text input): Thematic focus (e.g., "travel", "business", "cooking")
   - **Formality Level**: Casual / Neutral / Formal

5. **Optional: Real-time Prompt Preview**
   - Shows the prompt that will be sent to Claude
   - Educational for users, builds trust

**User Flow:**

- User fills form → Click "Generate" → Loading state (10-15s) → Results display with card preview → "Save Deck" button → Redirect to deck detail page

**Rate Limiting:** 3 generations per hour (free tier)

#### `/deck/[deckId]` (Deck Detail Page)

- Deck metadata display:
  - Editable deck name
  - Language pair
  - Deck type
  - Creation date
  - Total card count
- All flashcards displayed
- Interactive flashcard viewer:
  - Click to flip (front ↔ back)
  - Navigate between cards (prev/next buttons)
  - Show explanation and example usage
- Actions:
  - Edit deck name
  - Delete deck (with confirmation)
  - Future: Export (PDF, CSV, Anki)
- Future: "Start Study Mode" button

#### `/deck/[deckId]/study` (Future - Phase 5)

- Spaced repetition study interface
- Card flipping interaction
- "Again / Hard / Good / Easy" buttons (SM-2 algorithm)
- Progress tracking

---

## Data Models (Prisma Schema)

### User

```prisma
model User {
  id        String   @id @default(cuid())
  clerkId   String   @unique // Clerk user ID for auth sync
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  decks     Deck[]

  @@index([clerkId])
  @@index([email])
}
```

### Deck

```prisma
model Deck {
  id              String   @id @default(cuid())
  userId          String
  name            String   // User-editable, default: "Spanish → English (Phrases)"

  // Language Configuration
  sourceLanguage  String   // e.g., "Spanish"
  targetLanguage  String   // e.g., "English"

  // Deck Type
  deckType        DeckType // WORDS, PHRASES, SENTENCE_FRAGMENTS

  // Generation Settings (stored for reproducibility)
  proficiencyLevel String  @default("Intermediate")
  topicContext     String? // Optional theme
  formalityLevel   String  @default("Neutral")

  // Metadata
  cardCount       Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // AI Generation Tracking
  promptUsed      String   @db.Text // Exact prompt sent to Claude
  modelUsed       String   @default("claude-3-5-haiku-20241022")
  generationCost  Float?   // Track costs for analytics

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  cards           Card[]

  @@index([userId])
  @@index([createdAt])
  @@index([deckType])
}

enum DeckType {
  WORDS
  PHRASES
  SENTENCE_FRAGMENTS
}
```

### Card

```prisma
model Card {
  id          String   @id @default(cuid())
  deckId      String

  // Card Content
  front       String   @db.Text // Source language content
  back        String   @db.Text // Target language translation

  // AI-Generated Context
  explanation String?  @db.Text // Grammar notes, usage tips, part of speech
  example     String?  @db.Text // Example sentence/dialogue using the word/phrase/fragment

  // Ordering
  orderIndex  Int      // Maintain card order in deck

  // Spaced Repetition Data (for future SRS feature - Phase 5)
  easeFactor  Float    @default(2.5)
  interval    Int      @default(0)      // Days until next review
  repetitions Int      @default(0)       // Number of successful reviews
  nextReview  DateTime @default(now())

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  deck        Deck     @relation(fields: [deckId], references: [id], onDelete: Cascade)

  @@index([deckId])
  @@index([nextReview])
}
```

**Key Design Decisions:**

- Cascade deletes: Deleting a deck removes all cards
- Store `promptUsed` for debugging and prompt refinement
- Include SRS fields early for future study mode feature
- Indexes on frequently queried fields (userId, createdAt, deckType)

---

## AI Prompt Engineering Strategy

The core innovation of Syntra is dynamically building comprehensive prompts based on user selections. The form is essentially a **prompt builder UI**.

### Prompt Construction Flow

1. Start with base template (varies by deck type)
2. Inject user selections (languages, proficiency, topic, formality)
3. Add output format instructions (JSON for structured parsing)
4. Send to Claude 3.5 Haiku
5. Parse JSON response
6. Validate and sanitize card content
7. Save to database

### Base Prompt Templates

#### Individual Words Template

```
You are an expert language teacher specializing in ${sourceLanguage} to ${targetLanguage} instruction.

Generate a set of ${cardCount} flashcards for learning individual ${sourceLanguage} words.

Target Audience: ${proficiencyLevel} level learner
${topicContext ? `Topic Focus: ${topicContext}` : ''}
Formality: ${formalityLevel}

Requirements:
- Select high-frequency, practical vocabulary appropriate for ${proficiencyLevel} learners
- Provide clear, concise ${targetLanguage} translations
- Include part of speech (noun, verb, adjective, etc.)
- Add a brief usage note or example sentence when helpful for clarity
${topicContext ? `- Focus on vocabulary related to: ${topicContext}` : ''}

Return your response as a JSON array with this exact structure:
[
  {
    "front": "source language word",
    "back": "target language translation",
    "explanation": "part of speech, brief usage note",
    "example": "optional example sentence in source language with translation"
  }
]

Ensure the JSON is valid and properly formatted.
```

#### Phrases Template

```
You are an expert language teacher specializing in ${sourceLanguage} to ${targetLanguage} instruction.

Generate a set of ${cardCount} flashcards for learning common ${sourceLanguage} phrases.

Target Audience: ${proficiencyLevel} level learner
${topicContext ? `Topic Focus: ${topicContext}` : ''}
Formality: ${formalityLevel}

Requirements:
- Select useful, real-world phrases that learners frequently need
- Phrases should be 2-6 words in length
- Provide natural ${targetLanguage} equivalents (not literal word-by-word translations)
- Include context for when/how to use each phrase
- Prioritize ${formalityLevel.toLowerCase()} register phrases
${topicContext ? `- Focus on phrases related to: ${topicContext}` : ''}

Return your response as a JSON array with this exact structure:
[
  {
    "front": "source language phrase",
    "back": "target language equivalent",
    "explanation": "when/how to use this phrase",
    "example": "example dialogue or situation using the phrase"
  }
]

Ensure the JSON is valid and properly formatted.
```

#### Sentence Fragments Template (Key Differentiator) ⭐

```
You are an expert language teacher specializing in ${sourceLanguage} to ${targetLanguage} instruction, with expertise in communicative language teaching methods.

Generate a set of ${cardCount} flashcards featuring SENTENCE FRAGMENTS in ${sourceLanguage}.

THEORY: Learners who memorize useful sentence fragments can rapidly construct complex sentences by combining these building blocks. Focus on fragments that are:
- Highly reusable across multiple contexts
- Grammatically complete building blocks (subject-verb pairs, verb phrases with objects, prepositional phrases, etc.)
- Practical for everyday communication

Target Audience: ${proficiencyLevel} level learner
${topicContext ? `Topic Focus: ${topicContext}` : ''}
Formality: ${formalityLevel}

Requirements:
- Fragments should be 3-8 words long
- Each fragment should be combinable with other fragments to form full sentences
- Include grammatical notes explaining the fragment's structure
- Provide 2-3 example sentences showing how the fragment can be used in different contexts
- Prioritize fragments with high utility and frequency
${topicContext ? `- Focus on fragments related to: ${topicContext}` : ''}

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

Ensure the JSON is valid and properly formatted.
```

### Prompt Builder Implementation Pattern

```typescript
// lib/prompt-builder.ts
interface PromptConfig {
  sourceLanguage: string;
  targetLanguage: string;
  deckType: "WORDS" | "PHRASES" | "SENTENCE_FRAGMENTS";
  proficiencyLevel: string;
  cardCount: number;
  topicContext?: string;
  formalityLevel: string;
}

export function buildFlashcardPrompt(config: PromptConfig): string {
  const templates = {
    WORDS: wordsPromptTemplate,
    PHRASES: phrasesPromptTemplate,
    SENTENCE_FRAGMENTS: sentenceFragmentsPromptTemplate,
  };

  // Interpolate config values into template
  // Return complete prompt string
}
```

### Claude Response Parsing

```typescript
// lib/claude-parser.ts
interface FlashcardData {
  front: string;
  back: string;
  explanation?: string;
  example?: string;
}

export function parseClaudeResponse(response: string): FlashcardData[] {
  // Extract JSON from response (handle markdown code blocks)
  // Parse and validate JSON structure
  // Sanitize content (prevent XSS)
  // Return typed flashcard data
}
```

---

## Development Phases

### Phase 0: Project Setup & Foundation (Week 1)

**Goal**: Establish development environment and deploy authenticated skeleton app

**Tasks:**

1. Initialize Next.js 14 with TypeScript and App Router
2. Configure Tailwind CSS and install shadcn/ui components
3. Set up Prisma with Vercel Postgres connection
4. Configure Clerk authentication (sign-in, sign-up, middleware)
5. Set up tRPC with Next.js App Router integration
6. Configure environment variables (.env.local, .env.example)
7. Set up ESLint, Prettier, Husky for code quality
8. Create basic layout structure (header with navigation, footer)
9. Deploy to Vercel with environment variables configured

**Deliverable**: Authenticated Next.js app deployed to Vercel with database connected and user authentication working

**Critical Files:**

- `package.json` - Dependencies
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind setup
- `prisma/schema.prisma` - Database schema
- `middleware.ts` - Clerk auth middleware
- `app/layout.tsx` - Root layout with Clerk provider
- `server/api/trpc.ts` - tRPC initialization
- `.env.example` - Required environment variables template

---

### Phase 1: Core Data Models & Basic UI (Week 2)

**Goal**: Implement database schema and basic page navigation

**Tasks:**

1. Define complete Prisma schema (User, Deck, Card models)
2. Run Prisma migrations and generate client
3. Create tRPC router structure (user, deck, card routers)
4. Build landing page (/) with:
   - Hero section
   - Features overview
   - Call-to-action buttons
5. Build dashboard page (/dashboard) shell with:
   - Header with user info
   - Empty state for new users
   - Navigation to /generate
6. Implement protected route middleware
7. Add loading states and error boundaries
8. Deploy and test authentication flow

**Deliverable**: Users can sign in, see dashboard (empty state), navigate between public and protected pages

**Critical Files:**

- `prisma/schema.prisma` - Complete data models
- `prisma/migrations/` - Database migration files
- `server/api/root.ts` - Root tRPC router
- `server/api/routers/deck.ts` - Deck router stub
- `app/page.tsx` - Landing page
- `app/(protected)/dashboard/page.tsx` - Dashboard
- `components/ui/` - shadcn/ui components

---

### Phase 2: Flashcard Generation (Week 3-4)

**Goal**: Implement AI-powered flashcard generation (core feature)

**Tasks:**

1. Install Anthropic SDK
2. Create prompt templates for all three deck types
3. Implement `buildFlashcardPrompt()` function
4. Create Claude API integration with error handling (`server/claude.ts`)
5. Build generation form UI (/generate) with:
   - Language dropdowns (source/target with 9 major languages)
   - Deck type radio buttons
   - Advanced settings (collapsible):
     - Proficiency level dropdown
     - Card count selector (10/25/50)
     - Topic context text input
     - Formality level dropdown
   - Form validation with React Hook Form + Zod
6. Create tRPC `deck.generate` procedure:
   - Input validation
   - Rate limiting check (3 per hour)
   - Claude API call
   - Response parsing
   - Save deck + cards to database
   - Return deck with cards
7. Implement loading states during generation:
   - Disabled form
   - Progress indicator
   - Estimated time message
8. Build results display with:
   - Success message
   - Card preview (first 5 cards)
   - "Save to Dashboard" button
9. Implement error handling:
   - Network failures
   - API errors
   - Malformed responses
   - Rate limit exceeded
10. Add toast notifications for feedback

**Deliverable**: Users can fill out form, generate flashcards using Claude, see results, and save decks to their account

**Critical Files:**

- `server/claude.ts` - Claude API integration
- `lib/prompt-builder.ts` - Dynamic prompt construction
- `lib/claude-parser.ts` - Response parsing and validation
- `lib/validations.ts` - Zod schemas
- `server/api/routers/deck.ts` - `generate` mutation implementation
- `app/(protected)/generate/page.tsx` - Generation form UI
- `components/GenerateForm.tsx` - Form component
- `components/FlashcardPreview.tsx` - Results display

**Environment Variables Required:**

```env
ANTHROPIC_API_KEY="sk-ant-..."
```

---

### Phase 3: Deck Management (Week 5)

**Goal**: Complete CRUD operations for decks and cards

**Tasks:**

1. Implement deck listing on dashboard:
   - Fetch user's decks (tRPC `deck.getAll`)
   - Grid/list view toggle
   - Deck cards showing metadata
   - Empty state with "Create First Deck" CTA
   - Filter by language pair
   - Sort by date (newest first)
2. Build deck detail page (/deck/[deckId]):
   - Fetch deck with cards (tRPC `deck.getById`)
   - Display deck metadata (editable name)
   - Show all flashcards
   - Interactive flashcard viewer:
     - Click to flip front/back
     - Prev/next navigation
     - Display explanation and examples
   - Delete deck button with confirmation modal
3. Implement tRPC procedures:
   - `deck.getAll` - List user's decks with card counts
   - `deck.getById` - Get single deck with all cards
   - `deck.update` - Update deck name/metadata
   - `deck.delete` - Delete deck (cascade to cards)
4. Add authorization checks (verify userId matches deck owner)
5. Implement optimistic UI updates for mutations
6. Add loading skeletons for data fetching

**Deliverable**: Users can view all saved decks, open individual decks, flip through cards, edit deck names, and delete decks

**Critical Files:**

- `server/api/routers/deck.ts` - Complete CRUD procedures
- `app/(protected)/dashboard/page.tsx` - Deck listing
- `app/(protected)/deck/[deckId]/page.tsx` - Deck detail page
- `components/DeckList.tsx` - Deck grid/list component
- `components/DeckCard.tsx` - Individual deck card
- `components/FlashcardViewer.tsx` - Interactive card flipper
- `components/DeleteDeckDialog.tsx` - Confirmation modal

---

### Phase 4: Polish & Optimization (Week 6)

**Goal**: Production-ready UX, performance, and security

**Tasks:**

1. **Prompt Optimization:**
   - Test all three deck types with various language pairs
   - Refine prompts based on output quality
   - Ensure sentence fragments are truly reusable
2. **Error Handling:**
   - Comprehensive error messages (user-friendly, actionable)
   - Fallback UI for failed states
   - Retry mechanisms for transient failures
   - Error logging (console for MVP, Sentry for production)
3. **Loading States:**
   - Skeleton loaders for all data fetching
   - Optimistic updates where appropriate
   - Progress indicators for long operations
4. **UX Improvements:**
   - Toast notifications for all user actions
   - Confirmation dialogs for destructive actions
   - Keyboard shortcuts (arrow keys for card navigation)
   - Responsive design (mobile-friendly)
5. **Performance:**
   - Optimize database queries (use includes, select)
   - Add database indexes for common queries
   - Implement React Query caching strategies
   - Image optimization (if adding images later)
6. **SEO & Metadata:**
   - Page titles and descriptions
   - Open Graph tags for social sharing
   - Sitemap generation
7. **Security Audit:**
   - Input validation on all tRPC procedures
   - Output sanitization (DOMPurify for HTML)
   - Authorization checks on all protected routes
   - Rate limiting on expensive operations
   - Environment variable security (never expose API keys)
8. **Analytics:**
   - Set up Vercel Analytics
   - Track key metrics (generations, deck creations, languages used)
9. **Documentation:**
   - Update README with setup instructions
   - Document environment variables
   - Add inline code comments for complex logic

**Deliverable**: Production-ready MVP with excellent UX, security, and performance

**Critical Files:**

- All files from previous phases (refinement and polish)
- `lib/analytics.ts` - Analytics tracking
- `middleware.ts` - Enhanced security checks
- `components/ui/toast.tsx` - Toast notifications
- `README.md` - Comprehensive documentation

---

### Phase 5: Future Enhancements (Post-MVP)

**Goal**: Advanced features for user retention and growth

**Potential Features (prioritize based on user feedback):**

1. **Spaced Repetition System (SRS)**
   - Study mode page (/deck/[deckId]/study)
   - SM-2 algorithm implementation
   - "Again / Hard / Good / Easy" buttons
   - Progress tracking and statistics
   - Daily review notifications (email integration)

2. **Deck Sharing & Community**
   - Public deck gallery (browse popular decks)
   - Share decks via unique URLs
   - Import shared decks to personal collection
   - Upvote/rating system for quality decks

3. **Export Functionality**
   - Export to Anki format (.apkg files)
   - PDF generation for printing
   - CSV export for backup/migration

4. **Advanced AI Features**
   - Audio pronunciation (Claude + TTS API integration)
   - Image associations for words (DALL-E or Stable Diffusion)
   - Contextual grammar explanations
   - Conversation practice mode (chat with AI in target language)

5. **Gamification**
   - Daily streak tracking
   - Achievement badges (milestones, consistency)
   - Leaderboards (optional, opt-in)
   - XP/level system

6. **Additional Languages**
   - Expand from 9 to 50+ languages
   - Support for less common language pairs
   - User-requested language additions

7. **Mobile App**
   - React Native mobile app
   - Shared tRPC backend
   - Offline study mode (download decks)
   - Push notifications for reviews

8. **Premium Tier** (Monetization)
   - Increased rate limits (20 generations/hour)
   - Larger decks (up to 100 cards)
   - Priority AI generation
   - Audio and image features
   - Export to all formats
   - Ad-free experience

---

## Architecture Overview

### Project Structure

```
syntra/
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Database migrations
├── src/
│   ├── app/
│   │   ├── (auth)/               # Auth route group
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (protected)/          # Protected route group
│   │   │   ├── dashboard/
│   │   │   ├── generate/
│   │   │   └── deck/
│   │   │       └── [deckId]/
│   │   ├── api/
│   │   │   └── trpc/
│   │   │       └── [trpc]/
│   │   │           └── route.ts  # tRPC HTTP handler
│   │   ├── layout.tsx            # Root layout with providers
│   │   └── page.tsx              # Landing page
│   ├── server/
│   │   ├── api/
│   │   │   ├── root.ts           # Root tRPC router
│   │   │   ├── trpc.ts           # tRPC initialization
│   │   │   └── routers/
│   │   │       ├── user.ts
│   │   │       ├── deck.ts       # Main business logic
│   │   │       └── card.ts
│   │   ├── db.ts                 # Prisma client singleton
│   │   └── claude.ts             # Claude API client
│   ├── lib/
│   │   ├── trpc/
│   │   │   ├── client.ts         # Client-side tRPC
│   │   │   └── server.ts         # Server-side tRPC caller
│   │   ├── prompt-builder.ts     # Prompt construction
│   │   ├── claude-parser.ts      # Response parsing
│   │   ├── validations.ts        # Zod schemas
│   │   └── utils.ts              # Utility functions
│   └── components/
│       ├── ui/                   # shadcn/ui components
│       ├── GenerateForm.tsx
│       ├── FlashcardViewer.tsx
│       ├── DeckList.tsx
│       └── ...
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment (gitignored)
├── middleware.ts                 # Clerk auth middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Data Flow: Flashcard Generation

1. User fills form on `/generate` (Client Component)
2. React Hook Form validates input (Zod schema)
3. Click "Generate" → tRPC mutation via `api.deck.generate.useMutation()`
4. Request sent to `/api/trpc/deck.generate`
5. tRPC procedure validates input (Zod) server-side
6. Rate limit check (query Prisma for recent decks)
7. Build prompt using `buildFlashcardPrompt(config)`
8. Call Claude API (`anthropic.messages.create()`)
9. Parse response (`parseClaudeResponse()`)
10. Sanitize card content (DOMPurify)
11. Save deck + cards to database (Prisma transaction)
12. Return deck with cards to client
13. React Query cache updated automatically
14. Redirect to `/deck/[deckId]` to view results

### Server Components vs Client Components

**Server Components (default):**

- Landing page (static content)
- Dashboard layout (initial data fetch)
- Deck listing page (SSR for SEO)
- Deck detail page (SSR for initial load)

**Client Components (when needed):**

- Interactive forms (React Hook Form)
- Flashcard flip animations
- Modal dialogs
- Toast notifications
- tRPC mutations (client-side state)

**Pattern:**

```typescript
// Server Component fetches initial data
// app/(protected)/dashboard/page.tsx
import { api } from '@/lib/trpc/server';

export default async function DashboardPage() {
  const decks = await api.deck.getAll.query();
  return <DeckList initialDecks={decks} />;
}

// Client Component hydrates and adds interactivity
// components/DeckList.tsx
'use client';
export function DeckList({ initialDecks }) {
  const { data } = api.deck.getAll.useQuery(undefined, {
    initialData: initialDecks // Use SSR data, then sync
  });
  // Interactive UI...
}
```

### Security & Rate Limiting

**Rate Limiting Strategy:**

- **Free Tier**: 3 flashcard generations per hour per user
- Enforced server-side in tRPC procedure
- Query database for recent deck creations
- Return clear error with time until reset

**Security Measures:**

1. **Input Validation**: Zod schemas on all tRPC inputs
2. **Output Sanitization**: DOMPurify for AI-generated content
3. **Authorization**: Verify userId on all deck/card operations
4. **SQL Injection Prevention**: Prisma ORM (parameterized queries)
5. **XSS Prevention**: React escapes by default + DOMPurify
6. **CSRF Protection**: Clerk + Next.js handle this
7. **API Key Security**: Environment variables, never client-exposed
8. **HTTPS Only**: Enforced by Vercel

### Cost Optimization

**Claude API Cost Management:**

1. **Use Claude 3.5 Haiku**: 5-10x cheaper than Sonnet/Opus
2. **Batch Generation**: Generate 10-50 cards at once (not one-by-one)
3. **Efficient Prompts**: Concise instructions, structured output
4. **Rate Limiting**: Prevents abuse and runaway costs
5. **Cost Tracking**: Store `generationCost` per deck for analytics
6. **Set max_tokens**: 4096 limit (sufficient for 50 cards)

**Expected Costs:**

- 25-card deck: ~$0.0016 per generation
- User with 10 decks/month: ~$0.016
- 1000 MAU × 10 decks each: ~$16/month AI costs
- Very affordable for MVP

---

## Environment Variables

Create `.env.local` in project root (DO NOT commit to git):

```env
# Database
DATABASE_URL="postgres://username:password@host/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Anthropic AI
ANTHROPIC_API_KEY="sk-ant-..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Update for production
```

Create `.env.example` (commit to git as template):

```env
DATABASE_URL="postgres://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
ANTHROPIC_API_KEY="sk-ant-..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Critical Files for Implementation

The following files form the backbone of Syntra and should be prioritized:

1. **`/prisma/schema.prisma`**
   - Defines entire data structure (User, Deck, Card models)
   - Relationships and indexes
   - Foundation for all database operations

2. **`/server/api/routers/deck.ts`**
   - Core business logic (generate, CRUD operations)
   - Rate limiting implementation
   - Authorization checks
   - Main tRPC router

3. **`/lib/prompt-builder.ts`**
   - Dynamic prompt construction
   - Implements sentence fragments theory
   - Templates for all three deck types
   - Key to AI output quality

4. **`/server/claude.ts`**
   - Claude API integration
   - Error handling for AI calls
   - Response parsing
   - Cost tracking

5. **`/app/(protected)/generate/page.tsx`**
   - Primary user interaction point
   - Form UI and validation
   - Connects user input to AI generation

---

## Testing Strategy (Future - Week 7+)

### Unit Tests (Vitest)

- `buildFlashcardPrompt()` with various configs
- `parseClaudeResponse()` with edge cases
- Rate limiter logic
- Zod schema validation

### Integration Tests

- tRPC procedures with test database
- Full generation flow (mock Claude API)
- Deck CRUD operations

### E2E Tests (Playwright)

- User journey: Sign up → Generate deck → View cards
- Error handling scenarios
- Rate limiting enforcement

### Load Testing

- Concurrent AI generation requests
- Database performance under load
- Identify bottlenecks

---

## Monitoring & Analytics

### Vercel Analytics (Built-in)

- Page views and navigation
- Web vitals (LCP, FID, CLS)
- Traffic patterns

### Custom Analytics (Track in Database)

- Flashcard generation success rate
- Average generation time
- Most popular language pairs
- Deck type distribution (validate sentence fragments theory)
- Cost per user (AI spend)

### Error Tracking (Future - Sentry)

- AI generation failures
- Database errors
- Client-side exceptions
- Performance issues

---

## Success Metrics

**MVP Success Criteria (6 weeks):**

- ✅ Users can sign up and authenticate
- ✅ Users can generate flashcards for 9 language pairs
- ✅ All 3 deck types work (Words, Phrases, Sentence Fragments)
- ✅ Users can save and retrieve decks
- ✅ Deck management (view, edit, delete) functional
- ✅ App deployed to Vercel with <2s page loads
- ✅ AI generation costs <$20/month for first 100 users
- ✅ No critical security vulnerabilities

**Post-MVP Growth Metrics:**

- User retention (7-day, 30-day)
- Average decks per user
- Study session frequency (once SRS implemented)
- Conversion to premium tier
- Deck sharing/import rate

---

## Known Limitations & Trade-offs

### MVP Limitations

1. **No Spaced Repetition Yet**: Cards can be viewed but not studied with SRS algorithm (Phase 5 feature)
2. **Limited Languages**: 9 major languages initially (expandable)
3. **No Export**: Can't export to Anki/PDF yet (Phase 5)
4. **Rate Limiting**: Free tier limited to 3 generations/hour
5. **No Audio**: Text-only flashcards (audio TTS in Phase 5)

### Trade-off Decisions

1. **Claude over Free Models**: Chose paid Claude for quality despite cost, offset by Haiku's low pricing and rate limiting
2. **Vercel Postgres over Firebase**: Relational DB for complex queries, trade-off is slightly more setup vs. NoSQL simplicity
3. **tRPC over REST**: Better DX and type safety, but less familiar to some developers
4. **Clerk over NextAuth**: Faster setup and better UX, but adds vendor dependency

---

## Next Steps for Implementation

1. **Read this PRD thoroughly** - Ensure understanding of architecture
2. **Start with Phase 0** - Set up project foundation
3. **Follow phases sequentially** - Each builds on previous
4. **Deploy early and often** - Validate on Vercel at each phase
5. **Test AI prompts extensively** - Refine for quality output
6. **Gather user feedback** - Validate sentence fragments theory

---

## Resources & Documentation

### Official Documentation

- [Next.js App Router Docs](https://nextjs.org/docs)
- [Clerk Next.js Setup](https://clerk.com/docs/quickstarts/nextjs)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [tRPC with Next.js](https://trpc.io/docs/nextjs)
- [Anthropic API Docs](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [shadcn/ui Components](https://ui.shadcn.com)

### Helpful Guides

- [Vercel Postgres Setup](https://vercel.com/docs/storage/vercel-postgres)
- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Schema Validation](https://zod.dev)

---

## Appendix: Example Code Snippets

### tRPC Deck Router (Excerpt)

```typescript
// server/api/routers/deck.ts
export const deckRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(generateDeckSchema)
    .mutation(async ({ ctx, input }) => {
      // Rate limit check
      await checkRateLimit(ctx.user.id, ctx.db);

      // Generate flashcards
      const { cards, prompt, cost } = await generateFlashcards(input);

      // Save to database
      const deck = await ctx.db.deck.create({
        data: {
          userId: ctx.user.id,
          name: `${input.sourceLanguage} → ${input.targetLanguage}`,
          ...input,
          cardCount: cards.length,
          promptUsed: prompt,
          generationCost: cost,
          cards: {
            create: cards.map((card, idx) => ({
              ...card,
              orderIndex: idx,
            })),
          },
        },
        include: { cards: true },
      });

      return deck;
    }),
});
```

### Flashcard Generation Form (Excerpt)

```typescript
// app/(protected)/generate/page.tsx
'use client';
export default function GeneratePage() {
  const form = useForm<GenerateDeckInput>({
    resolver: zodResolver(generateDeckSchema),
    defaultValues: {
      proficiencyLevel: 'Intermediate',
      cardCount: 25,
      formalityLevel: 'Neutral',
      deckType: 'SENTENCE_FRAGMENTS'
    }
  });

  const generateMutation = api.deck.generate.useMutation({
    onSuccess: (deck) => {
      toast.success(`Generated ${deck.cardCount} flashcards!`);
      router.push(`/deck/${deck.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <form onSubmit={form.handleSubmit((data) => generateMutation.mutate(data))}>
      {/* Form fields */}
    </form>
  );
}
```

---

**End of PRD**

Total Implementation Timeline: **6 weeks for MVP** (Phases 0-4)

**Ready to build Syntra? Start with Phase 0!** 🚀
