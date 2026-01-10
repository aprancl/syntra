import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  // Routers will be added here in Phase 1
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
