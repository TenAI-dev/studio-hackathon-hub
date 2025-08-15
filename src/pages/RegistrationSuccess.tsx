import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-studio-bg-light flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-12 h-12 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-studio-text-dark mb-3">
          Application Submitted!
        </h1>
        
        <p className="text-studio-text-muted mb-8 leading-relaxed">
          Your hackathon application has been successfully submitted. 
          We'll review your application and get back to you within 2-3 business days.
        </p>

        {/* What's Next */}
        <div className="bg-white rounded-xl p-6 mb-8 text-left shadow-sm">
          <h2 className="font-semibold text-studio-text-dark mb-3">What's Next?</h2>
          <ul className="space-y-2 text-sm text-studio-text-muted">
            <li className="flex items-start">
              <span className="text-studio-orange mr-2">•</span>
              <span>Check your email for confirmation</span>
            </li>
            <li className="flex items-start">
              <span className="text-studio-orange mr-2">•</span>
              <span>We'll notify you about acceptance status</span>
            </li>
            <li className="flex items-start">
              <span className="text-studio-orange mr-2">•</span>
              <span>Follow us on social media for updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-studio-orange mr-2">•</span>
              <span>Start preparing for the hackathon!</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            size="xl"
            className="w-full"
            onClick={() => navigate('/home')}
          >
            Back to Home
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/hackathons')}
          >
            Explore More Hackathons
          </Button>
        </div>
      </div>
    </div>
  );
}