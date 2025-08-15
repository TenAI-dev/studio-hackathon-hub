import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';

export default function Start() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-blue flex flex-col items-center justify-center px-8">
      {/* Content */}
      <div className="text-center mb-16">
        {/* Main Title */}
        <h1 className="text-6xl font-bold text-studio-text-light mb-6">
          Studio
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-studio-text-light/90 max-w-md leading-relaxed">
          Finding and connecting with trusted local professionals around you.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <Button
          variant="whiteFilled"
          size="xl"
          className="w-full rounded-full"
          onClick={() => navigate('/signup')}
        >
          Sign up to Studio
        </Button>
        
        <Button
          variant="whiteOutline"
          size="xl"
          className="w-full rounded-full"
          onClick={() => navigate('/signin')}
        >
          Sign in to Studio
        </Button>
      </div>

      {/* Dev Mode Watermark */}
      {import.meta.env.VITE_AUTH_DEV_MODE === 'true' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <span className="text-xs text-white/60">Auth Dev Mode</span>
        </div>
      )}
    </div>
  );
}