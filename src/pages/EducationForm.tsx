import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { TextField } from '@/components/studio/TextField';
import { HeaderBack } from '@/components/studio/HeaderBack';

const educationSchema = z.object({
  degreeType: z.string().min(1, 'Please select your degree type'),
  college: z.string().min(2, 'Please enter your college/university name'),
  major: z.string().min(2, 'Please enter your major/field of study'),
  graduationMonth: z.string().min(1, 'Please select graduation month'),
  graduationYear: z.string().min(4, 'Please select graduation year')
});

type EducationForm = z.infer<typeof educationSchema>;

export default function EducationFormPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<EducationForm>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degreeType: '',
      college: '',
      major: '',
      graduationMonth: '',
      graduationYear: ''
    }
  });

  const onSubmit = async (data: EducationForm) => {
    setLoading(true);
    try {
      // Get personal details from previous step
      const personalData = JSON.parse(localStorage.getItem('registrationPersonal') || '{}');
      
      // Store complete registration data
      const completeRegistration = { ...personalData, education: data };
      localStorage.setItem('registrationComplete', JSON.stringify(completeRegistration));
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate('/registration/preview');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title="Education Details"
        onBack={() => navigate('/registration')}
      />
      
      <div className="px-6 py-6 max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-studio-text-dark">Step 2 of 3</span>
            <span className="text-sm text-studio-text-muted">Education</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-studio-orange h-2 rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-studio-text-dark mb-6">Education Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-studio-text-dark mb-2">
                  Degree Type
                </label>
                <select
                  {...register('degreeType')}
                  className="w-full h-12 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-studio-orange"
                >
                  <option value="">Select Degree Type</option>
                  <option value="high-school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
                {errors.degreeType && (
                  <p className="text-red-500 text-sm mt-1">{errors.degreeType.message}</p>
                )}
              </div>

              <TextField
                label="College/University"
                placeholder="University of California, Berkeley"
                {...register('college')}
                error={errors.college?.message}
              />

              <TextField
                label="Major/Field of Study"
                placeholder="Computer Science"
                {...register('major')}
                error={errors.major?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-studio-text-dark mb-2">
                    Graduation Month
                  </label>
                  <select
                    {...register('graduationMonth')}
                    className="w-full h-12 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-studio-orange"
                  >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={month} value={month.toLowerCase()}>
                        {month}
                      </option>
                    ))}
                  </select>
                  {errors.graduationMonth && (
                    <p className="text-red-500 text-sm mt-1">{errors.graduationMonth.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-studio-text-dark mb-2">
                    Graduation Year
                  </label>
                  <select
                    {...register('graduationYear')}
                    className="w-full h-12 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-studio-orange"
                  >
                    <option value="">Select Year</option>
                    {years.map(year => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.graduationYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.graduationYear.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => navigate('/registration')}
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