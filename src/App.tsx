
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
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/standards" element={<Standards />} />
      <Route path="/cat-standards" element={<CatStandards />} />
      <Route path="/pet-profiles" element={<PetProfiles />} />
      <Route path="/planning" element={<PlanningDashboard />} />
      <Route path="/pet-recipes" element={<PetRecipes />} />
      <Route path="/features" element={<Features />} />
      <Route path="/features/:featureId" element={<FeatureDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
