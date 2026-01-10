import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here are your flashcard decks.
        </p>
      </div>

      {/* Empty state for Phase 0 */}
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
    </div>
  );
}
