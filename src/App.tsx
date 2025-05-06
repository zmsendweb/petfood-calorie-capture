
import { Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";
import Standards from "./pages/Standards";
import CatStandards from "./pages/CatStandards";
import PetProfiles from "./pages/PetProfiles";
import PlanningDashboard from "./pages/PlanningDashboard";
import { PetRecipes } from "./pages/PetRecipes";
import { Features } from "./pages/Features";
import { FeatureDetails } from "./pages/FeatureDetails";
import { Contact } from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/cat-standards" element={<CatStandards />} />
        <Route 
          path="/pet-profiles" 
          element={
            <ProtectedRoute>
              <PetProfiles />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/planning" 
          element={
            <ProtectedRoute>
              <PlanningDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/pet-recipes" 
          element={
            <ProtectedRoute>
              <PetRecipes />
            </ProtectedRoute>
          }
        />
        <Route path="/features" element={<Features />} />
        <Route path="/features/:featureId" element={<FeatureDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
