"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/lib/trpc/client";
import {
  generateDeckSchema,
  LANGUAGES,
  DECK_TYPES,
  DECK_TYPE_LABELS,
  PROFICIENCY_LEVELS,
  CARD_COUNTS,
  FORMALITY_LEVELS,
  type Language,
  type DeckType,
  type ProficiencyLevel,
  type FormalityLevel,
} from "@/lib/validations";
import { type z } from "zod";

type GenerateDeckFormData = z.input<typeof generateDeckSchema>;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function GeneratePage() {
  const router = useRouter();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const form = useForm<GenerateDeckFormData>({
    resolver: zodResolver(generateDeckSchema),
    defaultValues: {
      deckType: "SENTENCE_FRAGMENTS",
      proficiencyLevel: "Intermediate",
      cardCount: 25,
      topicContext: "",
      formalityLevel: "Neutral",
    },
  });

  const generateMutation = api.deck.generate.useMutation({
    onSuccess: (deck) => {
      toast.success(`Generated ${deck.cardCount} flashcards!`);
      router.push(`/deck/${deck.id}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to generate flashcards");
    },
  });

  const onSubmit = (data: GenerateDeckFormData) => {
    // The data has been validated by Zod at this point
    generateMutation.mutate(data as z.output<typeof generateDeckSchema>);
  };

  const isLoading = generateMutation.isPending;

  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Generate Flashcards
        </h1>
        <p className="text-muted-foreground">
          Create AI-powered flashcards for language learning.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Language Selection</CardTitle>
            <CardDescription>
              Choose the languages for your flashcards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Source Language */}
            <div className="space-y-2">
              <Label htmlFor="sourceLanguage">I want to learn</Label>
              <Select
                value={form.watch("sourceLanguage")}
                onValueChange={(value) =>
                  form.setValue("sourceLanguage", value as Language, {
                    shouldValidate: true,
                  })
                }
                disabled={isLoading}
              >
                <SelectTrigger id="sourceLanguage">
                  <SelectValue placeholder="Select language to learn" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.sourceLanguage && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.sourceLanguage.message}
                </p>
              )}
            </div>

            {/* Target Language */}
            <div className="space-y-2">
              <Label htmlFor="targetLanguage">I speak</Label>
              <Select
                value={form.watch("targetLanguage")}
                onValueChange={(value) =>
                  form.setValue("targetLanguage", value as Language, {
                    shouldValidate: true,
                  })
                }
                disabled={isLoading}
              >
                <SelectTrigger id="targetLanguage">
                  <SelectValue placeholder="Select your native language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.targetLanguage && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.targetLanguage.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Deck Type</CardTitle>
            <CardDescription>
              Choose what kind of content to generate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={form.watch("deckType")}
              onValueChange={(value) =>
                form.setValue("deckType", value as DeckType)
              }
              disabled={isLoading}
              className="space-y-3"
            >
              {DECK_TYPES.map((type) => (
                <div key={type} className="flex items-start space-x-3">
                  <RadioGroupItem value={type} id={type} className="mt-1" />
                  <div className="flex-1">
                    <Label
                      htmlFor={type}
                      className="cursor-pointer font-medium"
                    >
                      {DECK_TYPE_LABELS[type].label}
                      {type === "SENTENCE_FRAGMENTS" && (
                        <span className="bg-primary/10 text-primary ml-2 rounded px-2 py-0.5 text-xs">
                          Recommended
                        </span>
                      )}
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      {DECK_TYPE_LABELS[type].description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <Card className="mt-6">
            <CollapsibleTrigger asChild>
              <CardHeader className="hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>
                      Customize your flashcard generation.
                    </CardDescription>
                  </div>
                  {advancedOpen ? (
                    <ChevronUp className="text-muted-foreground h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-muted-foreground h-5 w-5" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                {/* Proficiency Level */}
                <div className="space-y-2">
                  <Label htmlFor="proficiencyLevel">Proficiency Level</Label>
                  <Select
                    value={form.watch("proficiencyLevel")}
                    onValueChange={(value) =>
                      form.setValue(
                        "proficiencyLevel",
                        value as ProficiencyLevel
                      )
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger id="proficiencyLevel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFICIENCY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Card Count */}
                <div className="space-y-2">
                  <Label htmlFor="cardCount">Number of Cards</Label>
                  <Select
                    value={String(form.watch("cardCount"))}
                    onValueChange={(value) =>
                      form.setValue("cardCount", Number(value))
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger id="cardCount">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CARD_COUNTS.map((count) => (
                        <SelectItem key={count} value={String(count)}>
                          {count} cards
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Topic Context */}
                <div className="space-y-2">
                  <Label htmlFor="topicContext">
                    Topic / Context{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="topicContext"
                    placeholder="e.g., travel, business, cooking"
                    {...form.register("topicContext")}
                    disabled={isLoading}
                  />
                  <p className="text-muted-foreground text-xs">
                    Focus the generated content on a specific theme.
                  </p>
                </div>

                {/* Formality Level */}
                <div className="space-y-2">
                  <Label htmlFor="formalityLevel">Formality Level</Label>
                  <Select
                    value={form.watch("formalityLevel")}
                    onValueChange={(value) =>
                      form.setValue("formalityLevel", value as FormalityLevel)
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger id="formalityLevel">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FORMALITY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Button
          type="submit"
          className="mt-6 w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Flashcards...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Flashcards
            </>
          )}
        </Button>

        {isLoading && (
          <p className="text-muted-foreground mt-4 text-center text-sm">
            This may take 10-15 seconds. Please wait...
          </p>
        )}
      </form>
    </div>
  );
}
