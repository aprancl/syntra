# Syntra

AI-powered flashcard generation platform for language learners.

## Tech Stack

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS** with shadcn/ui components
- **Clerk** for authentication
- **Prisma** with PostgreSQL
- **tRPC** for type-safe APIs
- **Claude AI** for flashcard generation (Phase 2)

## Getting Started

### Prerequisites

1. **Node.js 18+** - Install from [nodejs.org](https://nodejs.org)
2. **Clerk account** - Sign up at [clerk.com](https://clerk.com)
3. **PostgreSQL database** - Recommended: [Vercel Postgres](https://vercel.com/storage/postgres)

### Setup

1. Clone and install dependencies:

```bash
git clone <repo-url>
cd syntra
npm install
```

2. Set up Clerk:
   - Create a new application at [clerk.com](https://clerk.com)
   - Get your API keys from the Clerk dashboard
   - Add `http://localhost:3000` to allowed origins

3. Set up PostgreSQL:
   - Create a database (Vercel Postgres, Supabase, or local PostgreSQL)
   - Get your connection strings

4. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
DATABASE_URL="your-postgres-connection-string"
POSTGRES_URL_NON_POOLING="your-direct-connection-string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

5. Push database schema:

```bash
npm run db:push
```

6. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Build for production     |
| `npm run start`     | Start production server  |
| `npm run lint`      | Run ESLint               |
| `npm run lint:fix`  | Fix ESLint issues        |
| `npm run format`    | Format with Prettier     |
| `npm run typecheck` | Run TypeScript check     |
| `npm run db:push`   | Push schema to database  |
| `npm run db:studio` | Open Prisma Studio       |

## Project Structure

```
syntra/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── (auth)/         # Auth pages (sign-in, sign-up)
│   │   ├── (protected)/    # Protected routes (dashboard, generate)
│   │   ├── api/trpc/       # tRPC API handler
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   └── ui/             # shadcn/ui components
│   ├── lib/
│   │   ├── trpc/           # tRPC client and server
│   │   └── utils.ts        # Utility functions
│   └── server/
│       ├── api/            # tRPC routers
│       └── db.ts           # Prisma client
├── .env.example            # Environment template
├── middleware.ts           # Clerk auth middleware
└── package.json
```

## Development Phases

- **Phase 0** (Current): Project setup, auth, basic UI
- **Phase 1**: Complete data models, deck listing
- **Phase 2**: AI flashcard generation with Claude
- **Phase 3**: Deck management (CRUD)
- **Phase 4**: Polish and optimization
- **Phase 5**: Study mode with spaced repetition

## License

MIT
