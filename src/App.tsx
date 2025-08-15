import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

// Pages
import SplashCarousel from "./pages/SplashCarousel";
import Onboarding from "./pages/Onboarding";
import SelectRole from "./pages/SelectRole";
import Start from "./pages/Start";
import SignUp from "./pages/SignUp";
import VerifyEmailSignUp from "./pages/VerifyEmailSignUp";
import SignIn from "./pages/SignIn";
import VerifyEmailSignIn from "./pages/VerifyEmailSignIn";
import Home from "./pages/Home";
import HackathonDetails from "./pages/HackathonDetails";
import RegistrationForm from "./pages/RegistrationForm";
import EducationForm from "./pages/EducationForm";
import SubmissionPreview from "./pages/SubmissionPreview";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, hasCompletedOnboarding, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-orange flex items-center justify-center">
        <div className="animate-pulse-soft text-studio-text-light text-xl">Loading...</div>
      </div>
    );
  }

  // If authenticated, go to home
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/hackathon/:id" element={<HackathonDetails />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/registration/education" element={<EducationForm />} />
        <Route path="/registration/preview" element={<SubmissionPreview />} />
        <Route path="/registration/success" element={<RegistrationSuccess />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // If not authenticated, show auth flow
  return (
    <Routes>
      <Route path="/" element={<SplashCarousel />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/select-role" element={<SelectRole />} />
      <Route path="/start" element={<Start />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email-signup" element={<VerifyEmailSignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/verify-email-signin" element={<VerifyEmailSignIn />} />
      <Route path="*" element={<SplashCarousel />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
