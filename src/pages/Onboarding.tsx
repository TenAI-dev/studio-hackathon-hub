import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { PaginationDots } from '@/components/studio/PaginationDots';
import heroCollaboration from '@/assets/hero-collaboration.jpg';
import heroCompete from '@/assets/hero-compete.jpg';
import heroAnalytics from '@/assets/hero-analytics.jpg';

const slides = [
  {
    id: 'explore',
    image: heroCollaboration,
    title: 'Explore Unlimited\nHackathons',
    description: 'Browse ongoing and upcoming hackathons that match your interests. Participate solo or with your team.'
  },
  {
    id: 'compete',
    image: heroCompete,
    title: 'Build & Compete With\nYour Team',
    description: 'Invite your teammates, form strong collaborations, and compete to solve real world problems.'
  },
  {
    id: 'track',
    image: heroAnalytics,
    title: 'Track, Host and\nEvaluate',
    description: 'From hosting events to judging student submissions, our platform empowers every role in the hackathon ecosystem.'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/select-role');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate('/select-role');
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="min-h-screen bg-gradient-orange flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-12 pb-8">
        <h1 className="text-3xl font-bold text-studio-text-light">Studio</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Hero Image */}
        <div className="mb-12 animate-fade-in" key={slide.id}>
          <img
            src={slide.image}
            alt={slide.title.replace('\n', ' ')}
            className="w-80 h-48 object-cover rounded-2xl shadow-studio-strong"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-studio-text-light mb-4 leading-tight">
          {slide.title.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < slide.title.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>

        {/* Description */}
        <p className="text-studio-text-light/90 text-base leading-relaxed max-w-md mb-12">
          {slide.description}
        </p>

        {/* Pagination Dots */}
        <PaginationDots
          total={slides.length}
          current={currentSlide}
          variant="light"
          className="mb-8"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-8">
        {/* Left Action */}
        <button
          onClick={currentSlide === 0 ? handleSkip : handleBack}
          className="text-studio-text-light/80 text-base font-medium hover:text-studio-text-light transition-studio-fast"
        >
          {currentSlide === 0 ? 'Skip' : 'Back'}
        </button>

        {/* Right Action */}
        <button
          onClick={handleNext}
          className="w-14 h-14 bg-studio-text-light rounded-full flex items-center justify-center hover:scale-105 transition-studio shadow-studio-medium"
        >
          <ChevronRight size={20} className="text-studio-orange ml-1" />
        </button>
      </div>
    </div>
  );
}