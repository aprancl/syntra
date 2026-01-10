import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          Built with{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </Link>
          . Powered by{" "}
          <Link
            href="https://anthropic.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Claude AI
          </Link>
          .
        </p>
        <p className="text-muted-foreground text-center text-sm md:text-right">
          &copy; {new Date().getFullYear()} Syntra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
