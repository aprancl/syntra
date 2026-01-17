import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border border-border/50 text-foreground bg-white/50",
        words: "bg-[oklch(0.68_0.14_250_/_12%)] text-[oklch(0.55_0.14_250)]",
        phrases: "bg-[oklch(0.65_0.15_145_/_12%)] text-[oklch(0.50_0.15_145)]",
        fragments: "bg-primary/12 text-primary",
        recommended:
          "bg-gradient-to-r from-[oklch(0.70_0.20_35)] via-[oklch(0.75_0.18_45)] to-[oklch(0.82_0.14_55)] text-white shadow-sm",
        success: "bg-[oklch(0.65_0.15_145_/_12%)] text-[oklch(0.50_0.15_145)]",
        warning: "bg-[oklch(0.80_0.17_85_/_12%)] text-[oklch(0.60_0.17_85)]",
        info: "bg-[oklch(0.68_0.14_250_/_12%)] text-[oklch(0.55_0.14_250)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
