import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { OTPInput } from '@/components/studio/OTPInput';
import { HeaderBack } from '@/components/studio/HeaderBack';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/use-toast';

export default function VerifyEmailSignUp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const { profileDraft, setAuthenticated, setOnboardingComplete } = useAuthStore();
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 4) return;
    
    setLoading(true);
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set authentication state
      setAuthenticated(true);
      setOnboardingComplete(true);
      
      toast({
        title: "Welcome to Studio!",
        description: "Your account has been created successfully.",
      });
      
      navigate('/home');
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setResending(false);
    }
  };

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 2) + '*'.repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  };

  return (
    <div className="min-h-screen bg-studio-bg-light">
      <HeaderBack 
        title="OTP Verification"
        onBack={() => navigate('/signup')}
      />
      
      <div className="px-8 py-16">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-studio-text-dark mb-2">
            Verify your Email Id
          </h1>
          
          <p className="text-studio-text-muted mb-8">
            Enter the code that was sent to your Email Id{' '}
            <span className="font-medium">
              {profileDraft.email ? maskEmail(profileDraft.email) : 'your email'}
            </span>
          </p>

          <OTPInput
            value={otp}
            onChange={setOtp}
            onComplete={handleVerify}
            className="mb-8"
          />

          <div className="mb-8">
            <span className="text-studio-text-muted text-sm">Did not receive the code? </span>
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-studio-orange text-sm font-medium hover:underline disabled:opacity-50"
            >
              {resending ? 'Sending...' : 'Resend Code'}
            </button>
          </div>

          <Button
            onClick={handleVerify}
            size="xl"
            className="w-full"
            disabled={otp.length !== 4}
            loading={loading}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}