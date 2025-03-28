
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";
import Standards from "./pages/Standards";
import CatStandards from "./pages/CatStandards";
import PetProfiles from "./pages/PetProfiles";
import PlanningDashboard from "./pages/PlanningDashboard";
import { PetRecipes } from "./pages/PetRecipes";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/cat-standards" element={<CatStandards />} />
        <Route path="/pet-profiles" element={<PetProfiles />} />
        <Route path="/planning" element={<PlanningDashboard />} />
        <Route path="/pet-recipes" element={<PetRecipes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
