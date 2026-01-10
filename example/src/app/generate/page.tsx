import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const languages = [
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Korean",
  "Chinese",
  "Russian",
];

const deckTypes = [
  {
    id: "words",
    name: "Words",
    description: "Individual vocabulary words with translations",
  },
  {
    id: "phrases",
    name: "Phrases",
    description: "Common phrases and expressions",
  },
  {
    id: "fragments",
    name: "Sentence Fragments",
    description: "Reusable sentence building blocks",
  },
];

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

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main Form */}
        <div className="space-y-6">
          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Target Language</CardTitle>
              <CardDescription>
                Select the language you want to learn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {languages.map((lang) => (
                  <Button
                    key={lang}
                    variant={lang === "Spanish" ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deck Type */}
          <Card>
            <CardHeader>
              <CardTitle>Deck Type</CardTitle>
              <CardDescription>
                Choose what kind of flashcards to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-3">
                {deckTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`hover:bg-accent cursor-pointer rounded-lg border p-4 transition-colors ${
                      type.id === "words" ? "border-primary bg-accent/50" : ""
                    }`}
                  >
                    <div className="font-medium">{type.name}</div>
                    <div className="text-muted-foreground text-xs">
                      {type.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Topic Input */}
          <Card>
            <CardHeader>
              <CardTitle>Topic or Theme</CardTitle>
              <CardDescription>
                What topic should the flashcards cover?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="e.g., Travel vocabulary, Restaurant phrases, Business meetings..."
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                defaultValue="Travel vocabulary"
              />
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button size="lg" className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Flashcards
          </Button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Sample of what your flashcards will look like
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="text-muted-foreground text-sm">Front</div>
                <div className="mt-1 font-medium">el aeropuerto</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-muted-foreground text-sm">Back</div>
                <div className="mt-1 font-medium">the airport</div>
                <div className="text-muted-foreground mt-2 text-xs">
                  Example: Voy al aeropuerto.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Number of cards</label>
                <input
                  type="number"
                  defaultValue={20}
                  min={5}
                  max={50}
                  className="border-input bg-background mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select className="border-input bg-background mt-1 w-full rounded-md border px-3 py-2 text-sm">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
