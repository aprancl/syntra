# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Prisma** with PostgreSQL
- **tRPC** for type-safe APIs

### Key Architectural Patterns

**tRPC Setup (two entry points):**

- Client components: Import `api` from `@/lib/trpc/client` and use React Query hooks
- Server components: Import `api` from `@/lib/trpc/server` and await the caller

**Route Groups:**

- `(auth)/*` - Public auth pages (sign-in, sign-up) using Clerk components
- `(protected)/*` - Authenticated routes; layout enforces auth via `auth()` check
- Public routes defined in `middleware.ts` via `createRouteMatcher`

**tRPC Procedures:**

- `publicProcedure` - No auth required
- `protectedProcedure` - Requires authenticated user; provides `ctx.userId`
- Add new routers in `src/server/api/` and register in `root.ts`

**Database:**

- Prisma schema in `prisma/schema.prisma`
- Uses connection pooling via `DATABASE_URL` and direct connection via `POSTGRES_URL_NON_POOLING`
- Run `npm run db:push` after schema changes (no migrations in dev)
