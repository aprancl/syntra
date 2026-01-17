import Link from "next/link";

export function Footer() {
  return (
    <footer className="glass-frosted border-primary/5 mt-auto border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          Built with{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary/80 hover:text-primary font-medium underline-offset-4 transition-colors hover:underline"
          >
            Next.js
          </Link>
          . Powered by{" "}
          <Link
            href="https://groq.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary/80 hover:text-primary font-medium underline-offset-4 transition-colors hover:underline"
          >
            Groq AI
          </Link>
          .
        </p>
        <p className="text-muted-foreground text-center text-sm md:text-right">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-gradient font-semibold">Syntra</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
