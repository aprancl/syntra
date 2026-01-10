import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

// Mock data for demonstration
const mockDecks = [
  {
    id: "1",
    name: "Spanish Basics",
    language: "Spanish",
    cardCount: 50,
    lastStudied: "2 days ago",
    type: "Words",
  },
  {
    id: "2",
    name: "Japanese N5 Vocab",
    language: "Japanese",
    cardCount: 120,
    lastStudied: "Yesterday",
    type: "Words",
  },
  {
    id: "3",
    name: "French Phrases",
    language: "French",
    cardCount: 35,
    lastStudied: "1 week ago",
    type: "Phrases",
  },
  {
    id: "4",
    name: "German Sentences",
    language: "German",
    cardCount: 25,
    lastStudied: "Today",
    type: "Sentence Fragments",
  },
];

export default function DashboardPage() {
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
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Deck
          </Button>
        </Link>
      </div>

      {/* Deck Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockDecks.map((deck) => (
          <Card key={deck.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="text-primary h-5 w-5" />
                <span className="text-muted-foreground text-xs font-medium uppercase">
                  {deck.language}
                </span>
              </div>
              <CardTitle className="mt-2">{deck.name}</CardTitle>
              <CardDescription>{deck.type}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {deck.cardCount} cards
                </span>
                <span className="text-muted-foreground">
                  Studied {deck.lastStudied}
                </span>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Study
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Decks</CardDescription>
            <CardTitle className="text-4xl">{mockDecks.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Cards</CardDescription>
            <CardTitle className="text-4xl">
              {mockDecks.reduce((sum, d) => sum + d.cardCount, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Languages</CardDescription>
            <CardTitle className="text-4xl">
              {new Set(mockDecks.map((d) => d.language)).size}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
