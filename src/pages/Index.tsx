
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/Dashboard";
import { MealEntry } from "@/types/mealTypes";

export function Index() {
  // Initialize with an empty array of meals
  const initialMeals: MealEntry[] = [];
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Pet Nutrition Tracker</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/standards">Breed Standards</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/pet-profiles">Pet Profiles</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/planning">Planning</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/pet-recipes">Pet Recipes</Link>
          </Button>
        </div>
      </div>
      <Dashboard meals={initialMeals} />
    </div>
  );
}
