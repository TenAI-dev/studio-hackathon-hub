import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, type, label, helperText, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-studio-text-dark mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-studio-text-muted">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-studio",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-studio-orange focus-visible:border-studio-orange",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-studio-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(helperText || error) && (
          <p className={cn(
            "mt-1 text-xs",
            error ? "text-red-500" : "text-studio-text-muted"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };