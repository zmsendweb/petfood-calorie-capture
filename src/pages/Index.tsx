
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/components/Dashboard";
import { MealEntry } from "@/types/mealTypes";
import { useEffect } from "react";
import { toast } from "sonner";
import { Calendar, Bell } from "lucide-react";
import { Toaster } from "sonner";

export function Index() {
  // Initialize with an empty array of meals
  const initialMeals: MealEntry[] = [];
  
  // Add a reminder notification after component mounts
  useEffect(() => {
    const timeout = setTimeout(() => {
      toast(
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Don't miss your pet's progress tracking!</p>
            <p className="text-sm text-gray-500">
              Pets with consistent tracking achieve goals 3x faster.
            </p>
          </div>
        </div>,
        {
          duration: 7000,
          action: {
            label: "Track Now",
            onClick: () => toast.success("Great decision for your pet's health!")
          }
        }
      );
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);
  
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
      <Toaster position="top-right" />
    </div>
  );
}
