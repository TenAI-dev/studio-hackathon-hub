import React from 'react';
import { cn } from '@/lib/utils';

interface RoleCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: React.ReactNode;
  selected?: boolean;
  variant?: 'participant' | 'coordinator' | 'judge';
  onClick?: () => void;
  className?: string;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  subtitle,
  description,
  image,
  selected = false,
  variant = 'participant',
  onClick,
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'participant':
        return selected ? 'bg-gradient-participant border-studio-participant' : 'bg-studio-bg-light border-gray-200';
      case 'coordinator':
        return selected ? 'bg-gradient-coordinator border-studio-coordinator' : 'bg-studio-bg-light border-gray-200';
      case 'judge':
        return selected ? 'bg-gradient-judge border-studio-judge' : 'bg-studio-bg-light border-gray-200';
      default:
        return 'bg-studio-bg-light border-gray-200';
    }
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl border-2 cursor-pointer transition-studio hover:shadow-studio-medium",
        getVariantClasses(),
        selected && "shadow-studio-medium",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-pressed={selected}
    >
      {/* Image/Icon */}
      {image && (
        <div className="flex justify-center mb-4">
          {image}
        </div>
      )}

      {/* Content */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-studio-text-dark mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-studio-text-muted mb-2">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-sm text-studio-text-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Selection indicator */}
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-studio-orange rounded-full flex items-center justify-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
};