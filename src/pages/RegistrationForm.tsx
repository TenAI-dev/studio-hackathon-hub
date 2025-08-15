import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { TextField } from '@/components/studio/TextField';
import { HeaderBack } from '@/components/studio/HeaderBack';
import { useAuthStore } from '@/store/useAuthStore';

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  gender: z.string().min(1, 'Please select your gender'),
  bio: z.string().min(10, 'Please write at least 10 characters'),
  city: z.string().min(2, 'Please enter your city'),
  emergencyContactName: z.string().min(2, 'Please enter emergency contact name'),
  emergencyContactNumber: z.string().min(10, 'Please enter emergency contact number'),
  linkedinUrl: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal(''))
});

type PersonalDetailsForm = z.infer<typeof personalDetailsSchema>;

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profileDraft } = useAuthStore();
  
  const hackathonId = location.state?.hackathonId || '1';
  const hackathonTitle = location.state?.hackathonTitle || 'Hackathon';

  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: user?.user_metadata?.name || profileDraft.fullName || '',
      email: user?.email || profileDraft.email || '',
      phone: profileDraft.mobileNumber || '',
      gender: '',
      bio: '',
      city: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      linkedinUrl: '',
      githubUrl: ''
    }
  });

  const onSubmit = async (data: PersonalDetailsForm) => {
    setLoading(true);
    try {
      // Store form data for education step
      localStorage.setItem('registrationPersonal', JSON.stringify({ ...data, hackathonId }));
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate('/registration/education');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title={`Registration for ${hackathonTitle}`}
        onBack={() => navigate(-1)}
      />
      
      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-studio-text-dark">Step 1 of 3</span>
            <span className="text-sm text-studio-text-muted">Personal Details</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-studio-orange h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-studio-text-dark mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <TextField
                label="Full Name"
                placeholder="John Doe"
                {...register('fullName')}
                error={errors.fullName?.message}
              />

              <TextField
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                error={errors.email?.message}
              />

              <TextField
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register('phone')}
                error={errors.phone?.message}
              />

              <div>
                <label className="block text-sm font-medium text-studio-text-dark mb-2">
                  Gender
                </label>
                <select
                  {...register('gender')}
                  className="w-full h-12 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-studio-orange"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-studio-text-dark mb-2">
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  placeholder="Tell us about yourself, your interests, and what you hope to achieve at this hackathon..."
                  rows={4}
                  className="w-full px-3 py-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-studio-orange resize-none"
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
                )}
              </div>

              <TextField
                label="City"
                placeholder="San Francisco"
                {...register('city')}
                error={errors.city?.message}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-studio-text-dark mb-4">Emergency Contact</h2>
            
            <div className="space-y-4">
              <TextField
                label="Emergency Contact Name"
                placeholder="Jane Doe"
                {...register('emergencyContactName')}
                error={errors.emergencyContactName?.message}
              />

              <TextField
                label="Emergency Contact Number"
                type="tel"
                placeholder="+1 (555) 987-6543"
                {...register('emergencyContactNumber')}
                error={errors.emergencyContactNumber?.message}
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-studio-text-dark mb-4">Social Links (Optional)</h2>
            
            <div className="space-y-4">
              <TextField
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/johndoe"
                {...register('linkedinUrl')}
                error={errors.linkedinUrl?.message}
              />

              <TextField
                label="GitHub URL"
                placeholder="https://github.com/johndoe"
                {...register('githubUrl')}
                error={errors.githubUrl?.message}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              loading={loading}
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}