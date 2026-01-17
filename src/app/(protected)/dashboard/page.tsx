import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/trpc/server";
import { Plus, BookOpen, Calendar, Layers } from "lucide-react";

export default async function DashboardPage() {
  const caller = await api();
  const decks = await caller.deck.getAll();

  const getBadgeVariant = (deckType: string) => {
    switch (deckType) {
      case "WORDS":
        return "words";
      case "PHRASES":
        return "phrases";
      case "SENTENCE_FRAGMENTS":
        return "fragments";
      default:
        return "default";
    }
  };

  return (
    <div className="relative container py-8">
      {/* Decorative background */}
      <div className="orb-orange fixed -top-32 -right-32 h-[500px] w-[500px] opacity-20" />

      {/* Header section */}
      <div className="glass mb-8 rounded-2xl p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your <span className="text-gradient">Decks</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here are your flashcard decks.
            </p>
          </div>
          <Link href="/generate">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Deck
            </Button>
          </Link>
        </div>
      </div>

      {decks.length === 0 ? (
        <Card className="py-12 text-center">
          <CardHeader>
            <div className="bg-primary/10 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl">
              <BookOpen className="text-primary h-10 w-10" />
            </div>
            <CardTitle className="text-2xl">No decks yet</CardTitle>
            <CardDescription className="mx-auto max-w-md text-base">
              Get started by creating your first flashcard deck using AI. It
              only takes a few seconds!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/generate">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create Your First Deck
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Link key={deck.id} href={`/deck/${deck.id}`}>
              <Card className="group h-full cursor-pointer overflow-hidden">
                {/* Accent bar at top */}
                <div className="h-1 bg-gradient-to-r from-[oklch(0.70_0.20_35)] via-[oklch(0.75_0.18_45)] to-[oklch(0.82_0.14_55)]" />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="group-hover:text-primary line-clamp-2 text-lg transition-colors">
                      {deck.name}
                    </CardTitle>
                    <Badge
                      variant={
                        getBadgeVariant(deck.deckType) as
                          | "words"
                          | "phrases"
                          | "fragments"
                          | "default"
                      }
                    >
                      {deck.deckType.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardDescription className="mt-2 flex items-center gap-1.5">
                    <span className="text-foreground/80 font-medium">
                      {deck.sourceLanguage}
                    </span>
                    <span className="text-primary">→</span>
                    <span className="text-foreground/80 font-medium">
                      {deck.targetLanguage}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-4 w-4" />
                      <span>{deck._count.cards} cards</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(deck.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
