import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderBackProps {
  title?: string;
  onBack?: () => void;
  className?: string;
}

export const HeaderBack: React.FC<HeaderBackProps> = ({
  title,
  onBack,
  className = ''
}) => {
  return (
    <div className={cn("flex items-center gap-4 p-4", className)}>
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-gray-100 transition-studio-fast"
        aria-label="Go back"
      >
        <ArrowLeft size={20} className="text-studio-text-dark" />
      </button>
      
      {title && (
        <h1 className="text-lg font-semibold text-studio-text-dark">
          {title}
        </h1>
      )}
    </div>
  );
};