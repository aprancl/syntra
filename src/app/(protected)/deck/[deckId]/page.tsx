"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { api } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeckDetailPage() {
  const params = useParams();
  const router = useRouter();
  const deckId = params.deckId as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    data: deck,
    isLoading,
    error,
  } = api.deck.getById.useQuery({ id: deckId });

  const deleteMutation = api.deck.delete.useMutation({
    onSuccess: () => {
      toast.success("Deck deleted successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete deck");
    },
  });

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-8">
        <Skeleton className="mb-2 h-8 w-48" />
        <Skeleton className="mb-8 h-4 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="container max-w-3xl py-8">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              {error?.message || "Deck not found"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/dashboard")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCard = deck.cards[currentIndex];
  const hasNext = currentIndex < deck.cards.length - 1;
  const hasPrev = currentIndex > 0;

  const nextCard = () => {
    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (hasPrev) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      deleteMutation.mutate({ id: deckId });
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="container max-w-3xl py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 -ml-2"
            onClick={() => router.push("/dashboard")}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{deck.name}</h1>
          <p className="text-muted-foreground">
            {deck.cardCount} cards &middot;{" "}
            {deck.deckType.replace("_", " ").toLowerCase()} &middot;{" "}
            {deck.proficiencyLevel}
          </p>
        </div>
        <Button
          variant={showDeleteConfirm ? "destructive" : "outline"}
          size="sm"
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="mr-1 h-4 w-4" />
          {showDeleteConfirm ? "Confirm Delete" : "Delete"}
        </Button>
      </div>

      {/* Flashcard Viewer */}
      {currentCard && (
        <>
          <Card
            className="min-h-[300px] cursor-pointer transition-all hover:shadow-lg"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardHeader className="border-b text-center">
              <CardDescription>
                Card {currentIndex + 1} of {deck.cards.length} &middot;{" "}
                {isFlipped ? "Translation" : "Original"} &middot;{" "}
                <span className="text-xs">Click to flip</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-[200px] flex-col items-center justify-center p-8">
              <p className="text-center text-2xl font-medium">
                {isFlipped ? currentCard.back : currentCard.front}
              </p>

              {isFlipped && currentCard.explanation && (
                <p className="text-muted-foreground mt-4 max-w-md text-center text-sm">
                  {currentCard.explanation}
                </p>
              )}

              {isFlipped && currentCard.example && (
                <div className="bg-muted mt-4 max-w-md rounded-lg p-4">
                  <p className="text-muted-foreground mb-1 text-sm font-medium">
                    Example:
                  </p>
                  <p className="text-sm">{currentCard.example}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">
            <Button variant="outline" onClick={prevCard} disabled={!hasPrev}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button variant="ghost" size="sm" onClick={resetDeck}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            <Button variant="outline" onClick={nextCard} disabled={!hasNext}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="bg-muted h-2 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full transition-all"
                style={{
                  width: `${((currentIndex + 1) / deck.cards.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* All Cards List */}
      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">All Cards</h2>
        <div className="space-y-2">
          {deck.cards.map(
            (card: (typeof deck.cards)[number], index: number) => (
              <Card
                key={card.id}
                className={`cursor-pointer transition-colors ${
                  index === currentIndex
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <CardContent className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{card.front}</p>
                      <p className="text-muted-foreground truncate text-sm">
                        {card.back}
                      </p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-xs">
                      #{index + 1}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
}
