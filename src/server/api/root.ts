import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { deckRouter } from "@/server/api/routers/deck";

export const appRouter = createTRPCRouter({
  deck: deckRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
