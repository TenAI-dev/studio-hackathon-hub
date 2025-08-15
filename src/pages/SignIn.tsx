import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { TextField } from '@/components/studio/TextField';
import { HeaderBack } from '@/components/studio/HeaderBack';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/use-toast';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setProfileDraft } = useAuthStore();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInForm) => {
    setLoading(true);
    try {
      // Save email to store for verification screen
      setProfileDraft({ email: data.email });
      
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code sent",
        description: "Please check your email for the verification code.",
      });
      
      navigate('/verify-email-signin');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title="Sign In"
        onBack={() => navigate('/start')}
      />
      
      <div className="px-8 py-8">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              label="Enter Your Email"
              type="email"
              placeholder="jamesptter606@gmail.com"
              {...register('email')}
              error={errors.email?.message}
            />

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

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <span className="text-studio-text-muted text-sm">New User? Create Account </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-studio-orange text-sm font-medium hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}