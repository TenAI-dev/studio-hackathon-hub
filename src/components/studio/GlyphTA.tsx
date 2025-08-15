import React from 'react';

interface GlyphTAProps {
  size?: number;
  className?: string;
}

export const GlyphTA: React.FC<GlyphTAProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Triangle "A" shape */}
      <path
        d="M16 4L26 28H6L16 4Z"
        fill="hsl(var(--studio-orange))"
        stroke="hsl(var(--studio-orange))"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      
      {/* Small "t" to the left */}
      <text
        x="4"
        y="12"
        fontSize="8"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fill="hsl(var(--studio-orange))"
      >
        t
      </text>
    </svg>
  );
};