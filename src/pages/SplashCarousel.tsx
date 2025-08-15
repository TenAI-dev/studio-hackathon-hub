import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlyphTA } from '@/components/studio/GlyphTA';

const slides = [
  {
    id: 'tenai',
    content: (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <GlyphTA size={24} />
          <div className="text-3xl font-bold">
            <span className="text-studio-purple">Ten</span>
            <span className="text-studio-orange">AI's</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'glyph',
    content: (
      <div className="flex items-center justify-center h-full">
        <GlyphTA size={64} />
      </div>
    )
  },
  {
    id: 'studio-logo',
    content: (
      <div className="flex items-center justify-center h-full">
        <div className="flex items-center gap-3">
          <GlyphTA size={32} />
          <div className="text-4xl font-bold text-studio-orange">Studio</div>
        </div>
      </div>
    )
  },
  {
    id: 'welcome',
    content: (
      <div className="bg-gradient-orange min-h-screen flex items-center justify-center">
        <div className="text-5xl font-bold text-studio-text-light">Welcome</div>
      </div>
    )
  }
];

export default function SplashCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeClass, setFadeClass] = useState('animate-fade-in');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSlide >= slides.length) {
      // Navigate to onboarding after last slide
      navigate('/onboarding');
      return;
    }

    const timer = setTimeout(() => {
      setFadeClass(''); // Remove fade class
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setFadeClass('animate-fade-in'); // Add fade class for next slide
      }, 50);
    }, 900);

    return () => clearTimeout(timer);
  }, [currentSlide, navigate]);

  if (currentSlide >= slides.length) {
    return null;
  }

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-studio-bg-white">
      <div className={`min-h-screen ${fadeClass}`} key={slide.id}>
        {slide.content}
      </div>
    </div>
  );
}