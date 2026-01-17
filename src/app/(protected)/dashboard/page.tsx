import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc/server";

export default async function DashboardPage() {
  const caller = await api();
  const decks = await caller.deck.getAll();

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here are your flashcard decks.
          </p>
        </div>
        <Link href="/generate">
          <Button>Create New Deck</Button>
        </Link>
      </div>

      {decks.length === 0 ? (
        <Card className="text-center">
          <CardHeader>
            <CardTitle>No decks yet</CardTitle>
            <CardDescription>
              Get started by creating your first flashcard deck using AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/generate">
              <Button size="lg">Create Your First Deck</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck) => (
            <Link key={deck.id} href={`/deck/${deck.id}`}>
              <Card className="hover:bg-muted/50 h-full transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{deck.name}</CardTitle>
                  <CardDescription>
                    {deck.sourceLanguage} → {deck.targetLanguage}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>{deck._count.cards} cards</span>
                    <span>{new Date(deck.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-primary/10 text-primary inline-block rounded-full px-2 py-1 text-xs font-medium">
                      {deck.deckType.replace("_", " ")}
                    </span>
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
