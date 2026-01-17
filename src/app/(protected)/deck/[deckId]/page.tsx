"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  RotateCcw,
  Trash2,
  Layers,
  GraduationCap,
  MousePointerClick,
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
import { Badge } from "@/components/ui/badge";
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
        <Skeleton className="mb-4 h-10 w-32" />
        <Skeleton className="mb-2 h-8 w-64" />
        <Skeleton className="mb-8 h-4 w-48" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="container max-w-3xl py-8">
        <Card className="py-12 text-center">
          <CardContent>
            <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
              <Layers className="text-destructive h-8 w-8" />
            </div>
            <p className="mb-2 text-lg font-medium">
              {error?.message || "Deck not found"}
            </p>
            <p className="text-muted-foreground mb-6">
              This deck may have been deleted or you don&apos;t have access to
              it.
            </p>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
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
    <div className="relative container max-w-3xl py-8">
      {/* Decorative background */}
      <div className="orb-orange fixed -top-32 -right-32 h-[500px] w-[500px] opacity-15" />

      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 -ml-2"
          onClick={() => router.push("/dashboard")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="glass rounded-2xl p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="mb-2 text-2xl font-bold tracking-tight">
                {deck.name}
              </h1>
              <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  <span>{deck.cardCount} cards</span>
                </div>
                <span className="text-primary">•</span>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  <span>{deck.proficiencyLevel}</span>
                </div>
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
            </div>
            <Button
              variant={showDeleteConfirm ? "destructive" : "outline"}
              size="sm"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="shrink-0"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              {showDeleteConfirm ? "Confirm Delete" : "Delete Deck"}
            </Button>
          </div>
        </div>
      </div>

      {/* Flashcard Viewer */}
      {currentCard && (
        <>
          <div
            className="perspective-1000 mb-6 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Card
              className={`glass-heavy hover:shadow-glow min-h-[320px] transition-all duration-300 ${isFlipped ? "bg-gradient-to-br from-[oklch(0.96_0.03_60_/_90%)] to-white/90" : ""}`}
            >
              <CardHeader className="border-primary/10 border-b py-4 text-center">
                <CardDescription className="flex items-center justify-center gap-2">
                  <span className="font-medium">
                    Card {currentIndex + 1} of {deck.cards.length}
                  </span>
                  <span className="text-primary">•</span>
                  <span>{isFlipped ? "Translation" : "Original"}</span>
                  <span className="text-primary">•</span>
                  <span className="inline-flex items-center gap-1 text-xs">
                    <MousePointerClick className="h-3 w-3" />
                    Click to flip
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex min-h-[240px] flex-col items-center justify-center p-8">
                <p className="text-center text-2xl leading-relaxed font-semibold md:text-3xl">
                  {isFlipped ? currentCard.back : currentCard.front}
                </p>

                {isFlipped && currentCard.explanation && (
                  <p className="text-muted-foreground mt-6 max-w-lg text-center leading-relaxed">
                    {currentCard.explanation}
                  </p>
                )}

                {isFlipped && currentCard.example && (
                  <div className="glass-orange mt-6 w-full max-w-lg rounded-xl p-4">
                    <p className="text-primary/80 mb-1.5 text-sm font-semibold tracking-wide uppercase">
                      Example
                    </p>
                    <p className="text-foreground/90 leading-relaxed">
                      {currentCard.example}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevCard}
              disabled={!hasPrev}
              className="flex-1 sm:flex-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={resetDeck}
              className="hidden sm:inline-flex"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>

            <Button
              variant="outline"
              onClick={nextCard}
              disabled={!hasNext}
              className="flex-1 sm:flex-none"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{
                width: `${((currentIndex + 1) / deck.cards.length) * 100}%`,
              }}
            />
          </div>
        </>
      )}

      {/* All Cards List */}
      <div className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Layers className="text-primary h-5 w-5" />
          All Cards
        </h2>
        <div className="space-y-3">
          {deck.cards.map(
            (card: (typeof deck.cards)[number], index: number) => (
              <Card
                key={card.id}
                className={`cursor-pointer overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? "border-primary/50 bg-primary/5 shadow-syntra"
                    : "hover:border-primary/30"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {index === currentIndex && (
                  <div className="h-1 bg-gradient-to-r from-[oklch(0.70_0.20_35)] via-[oklch(0.75_0.18_45)] to-[oklch(0.82_0.14_55)]" />
                )}
                <CardContent className="px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{card.front}</p>
                      <p className="text-muted-foreground truncate text-sm">
                        {card.back}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        index === currentIndex
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
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
