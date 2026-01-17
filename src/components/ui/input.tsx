import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary/20 selection:text-foreground border-border/50 h-11 w-full min-w-0 rounded-xl border bg-white/80 px-4 py-2.5 text-base shadow-sm backdrop-blur-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-primary focus-visible:ring-primary/20 focus-visible:shadow-md focus-visible:ring-[3px]",
        "hover:border-primary/30 hover:shadow-md",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
