import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, Globe, Zap, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex flex-col overflow-hidden">
      {/* Decorative background orbs */}
      <div className="orb-orange fixed -top-48 -right-48 h-[600px] w-[600px] opacity-30" />
      <div className="orb-orange fixed top-1/2 -left-32 h-[400px] w-[400px] opacity-20" />

      {/* Hero Section */}
      <section className="relative container flex flex-col items-center gap-6 pt-12 pb-12 md:pt-20 md:pb-16">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="bg-primary/10 text-primary mb-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Language Learning
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.1]">
            Master Languages with
            <br />
            <span className="text-gradient">AI-Powered Flashcards</span>
          </h1>
          <p className="text-muted-foreground max-w-[750px] text-lg leading-relaxed md:text-xl">
            Generate high-quality flashcards using AI. Learn vocabulary,
            phrases, and sentence fragments to accelerate your language learning
            journey.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Link href="/sign-up">
            <Button size="lg" className="h-12 px-8 text-base">
              Get Started Free
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Why Choose <span className="text-gradient">Syntra</span>?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Built with the latest AI technology to help you learn languages
            faster and more effectively.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <Card className="group relative overflow-hidden">
            <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardHeader className="relative">
              <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <Brain className="text-primary h-7 w-7" />
              </div>
              <CardTitle className="text-lg">AI-Powered Generation</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-base leading-relaxed">
                Powered by advanced AI to generate contextually accurate and
                educational flashcards tailored to your proficiency level.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden">
            <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardHeader className="relative">
              <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <BookOpen className="text-primary h-7 w-7" />
              </div>
              <CardTitle className="text-lg">Sentence Fragments</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-base leading-relaxed">
                Learn reusable sentence building blocks that you can combine to
                form complex sentences naturally and fluently.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden sm:col-span-2 md:col-span-1">
            <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <CardHeader className="relative">
              <div className="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <Globe className="text-primary h-7 w-7" />
              </div>
              <CardTitle className="text-lg">Multiple Languages</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <CardDescription className="text-base leading-relaxed">
                Support for 9 major languages including Spanish, French, German,
                Japanese, Korean, Chinese, and more.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[oklch(0.70_0.20_35)] via-[oklch(0.75_0.18_45)] to-[oklch(0.82_0.14_55)] p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiA2aDB2MjRoNlYzNmgtNnptMCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          <div className="relative flex flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-bold text-white md:text-4xl">
              Ready to accelerate your language learning?
            </h2>
            <p className="max-w-xl text-lg text-white/90">
              Join thousands of learners using Syntra to master new languages
              with AI-powered flashcards.
            </p>
            <Link href="/sign-up">
              <Button
                size="lg"
                className="text-primary h-12 bg-white px-8 text-base shadow-xl hover:bg-white/90 hover:shadow-2xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
