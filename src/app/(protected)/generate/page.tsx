import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GeneratePage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Generate Flashcards
        </h1>
        <p className="text-muted-foreground">
          Create AI-powered flashcards for language learning.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The flashcard generation form will be implemented in Phase 2.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            This page will include options to select languages, deck type
            (Words, Phrases, or Sentence Fragments), and advanced settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
