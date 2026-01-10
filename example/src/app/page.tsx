import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, Globe, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center gap-4 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-center gap-2 text-center">
          <h1 className="text-3xl leading-tight font-bold tracking-tighter md:text-5xl lg:leading-[1.1]">
            Master Languages with
            <br />
            AI-Powered Flashcards
          </h1>
          <p className="text-muted-foreground max-w-[750px] text-lg sm:text-xl">
            Generate high-quality flashcards using AI. Learn vocabulary,
            phrases, and sentence fragments to accelerate your language learning
            journey.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg">Get Started Free</Button>
          </Link>
          <Link href="/generate">
            <Button variant="outline" size="lg">
              Try Generate
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card>
            <CardHeader>
              <Brain className="text-primary h-10 w-10" />
              <CardTitle className="mt-4">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Powered by Claude AI to generate contextually accurate and
                educational flashcards tailored to your level.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="text-primary h-10 w-10" />
              <CardTitle className="mt-4">Sentence Fragments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn reusable sentence building blocks that you can combine to
                form complex sentences naturally.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="text-primary h-10 w-10" />
              <CardTitle className="mt-4">Multiple Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support for 9 major languages including Spanish, French, German,
                Japanese, Korean, and more.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-8 md:py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to accelerate your language learning?
          </h2>
          <p className="text-muted-foreground">
            Join Syntra today and start generating AI-powered flashcards.
          </p>
          <Link href="/generate">
            <Button size="lg">
              <Zap className="mr-2 h-4 w-4" />
              Start Learning Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
