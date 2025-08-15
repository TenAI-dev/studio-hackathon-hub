import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { OTPInput } from '@/components/studio/OTPInput';
import { HeaderBack } from '@/components/studio/HeaderBack';
import { useAuthStore } from '@/store/useAuthStore';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyEmailSignUp() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const { profileDraft, emailPending, setOnboardingComplete } = useAuthStore();
  const { verifyEmail, sendSignInOtp } = useAuth();

  const handleVerify = async () => {
    if (otp.length !== 4) return;
    
    setLoading(true);
    const email = emailPending || profileDraft.email || '';
    
    const { error } = await verifyEmail(email, otp);
    
    if (!error) {
      setOnboardingComplete(true);
      navigate('/home');
    }
    
    setLoading(false);
  };

  const handleResend = async () => {
    const DEV_MODE = import.meta.env.VITE_AUTH_DEV_MODE === 'true';
    
    if (DEV_MODE) {
      return; // No resend in dev mode
    }

    setResending(true);
    const email = emailPending || profileDraft.email || '';
    
    if (email) {
      await sendSignInOtp(email);
    }
    
    setResending(false);
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
              {(emailPending || profileDraft.email) ? maskEmail(emailPending || profileDraft.email || '') : 'your email'}
            </span>
          </p>

          <OTPInput
            value={otp}
            onChange={setOtp}
            onComplete={handleVerify}
            className="mb-4"
          />

          {import.meta.env.VITE_AUTH_DEV_MODE === 'true' && (
            <p className="text-xs text-studio-text-muted mb-4 text-center">
              Dev mode: enter any 4 digits (default {import.meta.env.VITE_DEV_FAKE_OTP || '4242'})
            </p>
          )}

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