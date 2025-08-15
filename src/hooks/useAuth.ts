import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/use-toast';

const DEV_MODE = import.meta.env.VITE_AUTH_DEV_MODE === 'true';
const DEV_FAKE_OTP = import.meta.env.VITE_DEV_FAKE_OTP || '4242';

export const useAuth = () => {
  const { 
    setUser, 
    setLoading, 
    setAuthenticated, 
    setEmailPending,
    emailPending,
    clearAuth 
  } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setAuthenticated(!!session);
        
        if (session?.user && event === 'SIGNED_IN') {
          // Create or update user profile
          setTimeout(async () => {
            try {
              const { data, error } = await supabase.rpc('create_user_profile', {
                p_auth_id: session.user.id,
                p_email: session.user.email || emailPending || '',
                p_name: session.user.user_metadata?.name || 'User',
                p_role: useAuthStore.getState().selectedRole || 'participant'
              });
              
              if (error) {
                console.error('Error creating profile:', error);
              }
            } catch (error) {
              console.error('Profile creation failed:', error);
            }
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setAuthenticated, setEmailPending, emailPending]);

  const sendSignInOtp = async (email: string) => {
    setLoading(true);
    setEmailPending(email);

    try {
      if (DEV_MODE) {
        // In dev mode, just store email and proceed
        toast({
          title: "Dev Mode",
          description: "Enter any 4 digits to continue (default: " + DEV_FAKE_OTP + ")",
        });
        return { error: null };
      } else {
        // Production: send real OTP
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: true }
        });

        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Verification code sent",
            description: "Please check your email for the verification code.",
          });
        }

        return { error };
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, token: string) => {
    setLoading(true);

    try {
      if (DEV_MODE) {
        // In dev mode, accept any 4-digit code
        if (token.length === 4) {
          // Use anonymous sign in for dev mode
          const { data, error } = await supabase.auth.signInAnonymously();
          
          if (error) {
            toast({
              title: "Dev Auth Failed",
              description: error.message,
              variant: "destructive",
            });
            return { error };
          }

          // Clear pending email
          setEmailPending(null);
          
          toast({
            title: "Welcome!",
            description: "Signed in successfully (dev mode)",
          });

          return { error: null };
        } else {
          const error = new Error('Please enter exactly 4 digits');
          toast({
            title: "Invalid Code",
            description: error.message,
            variant: "destructive",
          });
          return { error };
        }
      } else {
        // Production: verify real OTP
        const { error } = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'email',
        });

        if (error) {
          toast({
            title: "Verification Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setEmailPending(null);
          toast({
            title: "Welcome!",
            description: "Signed in successfully",
          });
        }

        return { error };
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      clearAuth();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendSignInOtp,
    verifyEmail,
    signOut,
  };
};