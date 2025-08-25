
import {
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider as QueryClientProviderOriginal } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { Index } from "@/pages/Index";
import Auth from "@/pages/Auth";
import Account from "@/pages/Account";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Features } from "@/pages/Features";
import { FeatureDetails } from "@/pages/FeatureDetails";
import CalorieCalculator from "@/pages/CalorieCalculator";
import { PetRecipes } from "@/pages/PetRecipes";
import PlanningDashboard from "@/pages/PlanningDashboard";
import PetProfiles from "@/pages/PetProfiles";
import Standards from "@/pages/Standards";
import ShowBreeds from "@/pages/ShowBreeds";
import { Contact } from "@/pages/Contact";
import { TooltipProvider } from "@/components/ui/tooltip"
import { ImageRecognition } from "@/pages/ImageRecognition";
import { ProgressTracking } from "@/pages/ProgressTracking";
import { MealPlanning } from "@/pages/MealPlanning";
import { CatStandards } from "@/pages/CatStandards";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProviderOriginal client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/:featureId" element={<FeatureDetails />} />
          <Route path="/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="/image-recognition" element={<ImageRecognition />} />
          <Route path="/progress-tracking" element={<ProgressTracking />} />
          <Route path="/meal-planning" element={<MealPlanning />} />
          <Route path="/pet-recipes" element={<PetRecipes />} />
          <Route path="/planning" element={<PlanningDashboard />} />
          <Route path="/planning-dashboard" element={<PlanningDashboard />} />
          <Route path="/pet-profiles" element={<PetProfiles />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/cat-standards" element={<CatStandards />} />
          <Route path="/show-breeds" element={<ShowBreeds />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProviderOriginal>
  );
}

export default App;
