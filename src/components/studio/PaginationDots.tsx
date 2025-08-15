import React from 'react';
import { cn } from '@/lib/utils';

interface PaginationDotsProps {
  total: number;
  current: number;
  variant?: 'light' | 'dark';
  className?: string;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total,
  current,
  variant = 'light',
  className = ''
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-2 w-2 rounded-full transition-studio",
            index === current
              ? "bg-studio-orange" // Active dot is always orange
              : variant === 'light'
              ? "bg-white/50" // Inactive dots on gradient backgrounds
              : "bg-black/20" // Inactive dots on light backgrounds
          )}
        />
      ))}
    </div>
  );
};