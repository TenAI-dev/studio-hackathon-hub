import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { TextField } from '@/components/studio/TextField';
import { HeaderBack } from '@/components/studio/HeaderBack';
import { useAuthStore } from '@/store/useAuthStore';
import { useAuth } from '@/hooks/useAuth';

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  mobileNumber: z.string().min(10, 'Please enter a valid mobile number'),
  countryCode: z.string().default('+1')
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setProfileDraft } = useAuthStore();
  const { sendSignInOtp } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      countryCode: '+1'
    }
  });

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    try {
      // Save form data to store
      setProfileDraft(data);
      
      const { error } = await sendSignInOtp(data.email);
      
      if (!error) {
        navigate('/verify-email-signup');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title="Sign Up"
        onBack={() => navigate('/start')}
      />
      
      <div className="px-8 py-8">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              label="Enter Your Full Name"
              placeholder="James Potter"
              {...register('fullName')}
              error={errors.fullName?.message}
            />

            <TextField
              label="Enter Your Email"
              type="email"
              placeholder="jamesptter606@gmail.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <div>
              <label className="block text-sm font-medium text-studio-text-dark mb-2">
                Mobile Number
              </label>
              <div className="flex gap-3">
                <select
                  {...register('countryCode')}
                  className="h-12 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-studio-orange"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                </select>
                <TextField
                  placeholder="7492607123"
                  {...register('mobileNumber')}
                  error={errors.mobileNumber?.message}
                  className="flex-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="xl"
              className="w-full"
              loading={loading}
            >
              Continue
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-studio-text-muted text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <Button variant="secondary" size="lg" className="w-full">
              Continue with Google
            </Button>
            <Button variant="secondary" size="lg" className="w-full">
              Continue with GitHub
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <span className="text-studio-text-muted text-sm">Already have an account? </span>
            <button
              onClick={() => navigate('/signin')}
              className="text-studio-orange text-sm font-medium hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}