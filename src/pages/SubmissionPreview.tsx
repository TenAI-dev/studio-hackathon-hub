import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { HeaderBack } from '@/components/studio/HeaderBack';

export default function SubmissionPreview() {
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load registration data
    const data = localStorage.getItem('registrationComplete');
    if (data) {
      setRegistrationData(JSON.parse(data));
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear registration data
      localStorage.removeItem('registrationPersonal');
      localStorage.removeItem('registrationComplete');
      
      // Navigate to success screen
      navigate('/registration/success');
    } finally {
      setLoading(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-studio-bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-soft text-studio-text-muted text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title="Review Application"
        onBack={() => navigate('/registration/education')}
      />
      
      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-studio-text-dark">Step 3 of 3</span>
            <span className="text-sm text-studio-text-muted">Review & Submit</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-studio-orange h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Personal Information Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-studio-text-dark mb-4">Personal Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Name:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Email:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Phone:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">City:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.city}</span>
            </div>
          </div>
        </div>

        {/* Education Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-studio-text-dark mb-4">Education</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Degree:</span>
              <span className="text-studio-text-dark font-medium capitalize">
                {registrationData.education?.degreeType?.replace('-', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Institution:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.education?.college}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Major:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.education?.major}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Graduation:</span>
              <span className="text-studio-text-dark font-medium capitalize">
                {registrationData.education?.graduationMonth} {registrationData.education?.graduationYear}
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contact Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-studio-text-dark mb-4">Emergency Contact</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Name:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.emergencyContactName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-studio-text-muted">Phone:</span>
              <span className="text-studio-text-dark font-medium">{registrationData.emergencyContactNumber}</span>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8">
          <p className="text-sm text-orange-800">
            By submitting this application, you agree to the hackathon's terms and conditions, 
            code of conduct, and privacy policy. You also consent to being contacted regarding 
            the event and future opportunities.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="flex-1"
            onClick={() => navigate('/registration/education')}
          >
            Back to Edit
          </Button>
          <Button
            size="lg"
            className="flex-1"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}