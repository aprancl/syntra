import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { userId } = await auth();

  return {
    db,
    userId,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Find or create the database user based on Clerk ID
  let user = await ctx.db.user.findUnique({
    where: { clerkId: ctx.userId },
  });

  if (!user) {
    // Create user if they don't exist yet
    // Note: Email will be synced via Clerk webhook in production
    user = await ctx.db.user.create({
      data: {
        clerkId: ctx.userId,
        email: `${ctx.userId}@placeholder.local`, // Placeholder until webhook syncs
      },
    });
  }

  return next({
    ctx: {
      userId: user.id, // Use database User.id, not Clerk ID
      clerkId: ctx.userId, // Keep Clerk ID available if needed
    },
  });
});
