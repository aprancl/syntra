import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center space-x-2">
          <span className="text-gradient text-xl font-extrabold">Syntra</span>
        </Link>

        <nav className="flex items-center gap-2">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="rounded-lg">
                Dashboard
              </Button>
            </Link>
            <Link href="/generate">
              <Button variant="ghost" size="sm" className="rounded-lg">
                Generate
              </Button>
            </Link>
            <div className="ml-2">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="rounded-lg">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
