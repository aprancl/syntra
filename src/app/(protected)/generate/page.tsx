"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Sparkles,
  Languages,
  Settings2,
  ArrowRight,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

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
    generateMutation.mutate(data as z.output<typeof generateDeckSchema>);
  };

  const isLoading = generateMutation.isPending;

  return (
    <div className="relative container max-w-2xl py-8">
      {/* Decorative background */}
      <div className="orb-orange fixed -top-20 -right-20 h-[400px] w-[400px] opacity-20" />
      <div className="orb-orange fixed bottom-20 -left-20 h-[300px] w-[300px] opacity-15" />

      {/* Header */}
      <div className="glass mb-8 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
            <Sparkles className="text-primary h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Generate <span className="text-gradient">Flashcards</span>
            </h1>
            <p className="text-muted-foreground">
              Create AI-powered flashcards for language learning.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Language Selection Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Languages className="text-primary h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Language Selection</CardTitle>
                <CardDescription>
                  Choose the languages for your flashcards.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid items-end gap-4 sm:grid-cols-[1fr,auto,1fr]">
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
                  <SelectTrigger id="sourceLanguage" className="w-full">
                    <SelectValue placeholder="Select language" />
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

              {/* Arrow indicator */}
              <div className="hidden items-center justify-center pb-2 sm:flex">
                <ArrowRight className="text-primary h-5 w-5" />
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
                  <SelectTrigger id="targetLanguage" className="w-full">
                    <SelectValue placeholder="Select language" />
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
            </div>
          </CardContent>
        </Card>

        {/* Deck Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deck Type</CardTitle>
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
                <label
                  key={type}
                  htmlFor={type}
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                    form.watch("deckType") === type
                      ? "border-primary bg-primary/5"
                      : "bg-muted/30 hover:border-primary/30 hover:bg-muted/50 border-transparent"
                  }`}
                >
                  <RadioGroupItem value={type} id={type} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-semibold">
                        {DECK_TYPE_LABELS[type].label}
                      </span>
                      {type === "SENTENCE_FRAGMENTS" && (
                        <Badge
                          variant="recommended"
                          className="px-2 py-0.5 text-[10px]"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {DECK_TYPE_LABELS[type].description}
                    </p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="hover:bg-primary/5 cursor-pointer rounded-t-2xl transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                      <Settings2 className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Advanced Settings
                      </CardTitle>
                      <CardDescription>
                        Customize your flashcard generation.
                      </CardDescription>
                    </div>
                  </div>
                  <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
                    {advancedOpen ? (
                      <ChevronUp className="text-muted-foreground h-5 w-5" />
                    ) : (
                      <ChevronDown className="text-muted-foreground h-5 w-5" />
                    )}
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-5 pt-0">
                <div className="grid gap-5 sm:grid-cols-2">
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
                      <SelectTrigger id="proficiencyLevel" className="w-full">
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
                      <SelectTrigger id="cardCount" className="w-full">
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
                    placeholder="e.g., travel, business, cooking, medical"
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
                    <SelectTrigger id="formalityLevel" className="w-full">
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="h-14 w-full text-base"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Flashcards...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Flashcards
            </>
          )}
        </Button>

        {isLoading && (
          <div className="glass rounded-xl p-4 text-center">
            <div className="spinner-syntra mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              AI is crafting your flashcards. This may take 10-15 seconds...
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
