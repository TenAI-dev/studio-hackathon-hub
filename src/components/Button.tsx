import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-studio focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Studio primary button - Orange
        default: "bg-studio-orange text-studio-text-light hover:bg-studio-orange/90 shadow-studio-soft",
        // Studio secondary button - Light background
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Studio white filled - for blue backgrounds
        whiteFilled: "bg-studio-text-light text-studio-orange hover:bg-studio-text-light/90 shadow-studio-soft",
        // Studio white outline - for blue backgrounds
        whiteOutline: "border-2 border-studio-text-light text-studio-text-light hover:bg-studio-text-light hover:text-studio-blue transition-studio",
        // Studio role selection variants
        participant: "bg-gradient-participant text-studio-text-dark hover:shadow-studio-medium",
        coordinator: "bg-gradient-coordinator text-studio-text-dark hover:shadow-studio-medium",
        judge: "bg-gradient-judge text-studio-text-dark hover:shadow-studio-medium",
        // Utility variants
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-2xl px-12 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? "…" : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };