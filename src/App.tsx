import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Index from "./pages/Index";
import Standards from "./pages/Standards";
import CatStandards from "./pages/CatStandards";
import NotFound from "./pages/NotFound";
import { Dashboard } from "./components/Dashboard";
import PetProfiles from "./pages/PetProfiles";

const initialMeals = [
  {
    id: "1",
    type: "breakfast",
    calories: 350,
    photo: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80",
    timestamp: new Date()
  },
  {
    id: "2",
    type: "lunch",
    calories: 500,
    photo: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
    timestamp: new Date()
  },
  {
    id: "3",
    type: "dinner",
    calories: 650,
    photo: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80",
    timestamp: new Date()
  }
];

function App() {
  return (
    <>
      <Toaster />
      <div className="relative min-h-screen">
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/cat-standards" element={<CatStandards />} />
            <Route path="/dashboard" element={<Dashboard meals={initialMeals} />} />
            <Route path="/pet-profiles" element={<PetProfiles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
