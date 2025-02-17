
import { useState } from "react";
import { MealEntryForm, MealCard } from "@/components/MealEntry";
import { Dashboard } from "@/components/Dashboard";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  timestamp: Date;
}

const Index = () => {
  const [meals, setMeals] = useState<MealEntry[]>([]);

  const handleSaveMeal = (meal: MealEntry) => {
    setMeals((prev) => [meal, ...prev]);
    toast.success("Meal saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30">
      <div className="container py-8 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Pet Food Tracker</h1>
          <p className="text-gray-600">Track your pet's food intake with photos</p>
          <Link to="/standards">
            <Button variant="outline" className="mt-4">
              <BookOpen className="w-4 h-4 mr-2" />
              View Breed Standards
            </Button>
          </Link>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <MealEntryForm onSave={handleSaveMeal} />
            <Dashboard meals={meals} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Recent Meals</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
