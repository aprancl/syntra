import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[oklch(0.70_0.20_35)] via-[oklch(0.75_0.18_45)] to-[oklch(0.82_0.14_55)] text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/30 shadow-sm hover:shadow-md",
        outline:
          "border-2 border-primary/20 bg-white/80 backdrop-blur-sm text-primary hover:bg-primary/5 hover:border-primary/30 shadow-sm",
        secondary:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:border-primary/30",
        ghost: "text-muted-foreground hover:bg-primary/8 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 has-[>svg]:px-4",
        sm: "h-9 rounded-lg gap-1.5 px-4 has-[>svg]:px-3 text-sm",
        lg: "h-12 rounded-xl px-8 has-[>svg]:px-6 text-base",
        icon: "size-10 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
