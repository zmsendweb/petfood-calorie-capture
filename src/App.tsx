
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Standards from "./pages/Standards";
import CatStandards from "./pages/CatStandards";
import NotFound from "./pages/NotFound";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

function App() {
  // Mock data for initial dashboard setup
  const initialMeals = [
    {
      id: "1",
      type: "breakfast",
      calories: 300,
      photo: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
      timestamp: new Date()
    }
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/cat-standards" element={<CatStandards />} />
        <Route path="/dashboard" element={<Dashboard meals={initialMeals} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
