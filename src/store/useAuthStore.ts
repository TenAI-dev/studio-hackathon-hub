import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'participant' | 'coordinator' | 'judge';

interface ProfileDraft {
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  countryCode?: string;
}

interface AuthState {
  // Auth state
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  emailPending: string | null;
  
  // Onboarding state
  hasCompletedOnboarding: boolean;
  selectedRole: UserRole | null;
  profileDraft: ProfileDraft;
  
  // Actions
  setUser: (user: any | null) => void;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setOnboardingComplete: (complete: boolean) => void;
  setSelectedRole: (role: UserRole | null) => void;
  setProfileDraft: (draft: Partial<ProfileDraft>) => void;
  setEmailPending: (email: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      loading: false,
      emailPending: null,
      hasCompletedOnboarding: false,
      selectedRole: null,
      profileDraft: {},

      // Actions
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setOnboardingComplete: (complete) => set({ hasCompletedOnboarding: complete }),
      setSelectedRole: (role) => set({ selectedRole: role }),
      setProfileDraft: (draft) => set({ profileDraft: { ...get().profileDraft, ...draft } }),
      setEmailPending: (email) => set({ emailPending: email }),
      clearAuth: () => set({
        isAuthenticated: false,
        user: null,
        selectedRole: null,
        profileDraft: {},
        hasCompletedOnboarding: false,
        emailPending: null,
      }),
    }),
    {
      name: 'studio-auth',
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        selectedRole: state.selectedRole,
        profileDraft: state.profileDraft,
      }),
    }
  )
);