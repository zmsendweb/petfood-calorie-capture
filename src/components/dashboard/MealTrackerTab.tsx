
import { useMemo } from "react";
import { format } from "date-fns";
import { Card } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { EnhancedMealEntryForm } from "../EnhancedMealEntry";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { TrendingUp } from "lucide-react";
import { MealCaloriesChart } from "./MealCaloriesChart";
import { MealList } from "./MealList";
import { MealEntry } from "@/types/mealTypes";

interface MealTrackerTabProps {
  meals: MealEntry[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  handleAddMeal: (meal: MealEntry) => void;
}

export const MealTrackerTab = ({ 
  meals, 
  selectedDate, 
  setSelectedDate, 
  handleAddMeal 
}: MealTrackerTabProps) => {
  // Calculate daily calories
  const dailyCalories = useMemo(() => {
    return meals
      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
      .reduce((acc, meal) => acc + meal.calories, 0);
  }, [meals, selectedDate]);

  // Calculate calendar data
  const calendarData = useMemo(() => {
    const dailyTotals = new Map<string, number>();
    meals.forEach(meal => {
      const dateKey = format(new Date(meal.timestamp), 'yyyy-MM-dd');
      dailyTotals.set(dateKey, (dailyTotals.get(dateKey) || 0) + meal.calories);
    });
    return dailyTotals;
  }, [meals]);

  // Selected date meals
  const selectedDateMeals = useMemo(() => {
    return meals
      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [meals, selectedDate]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Meal Tracker</h2>
        <Link to="/planning">
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">View Progress & Planning</span>
            <span className="sm:hidden">Planning</span>
          </Button>
        </Link>
      </div>
      
      <EnhancedMealEntryForm onSave={handleAddMeal} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4">Daily Summary</h2>
          <div className="text-4xl font-bold text-primary">
            {dailyCalories} <span className="text-lg text-gray-500">calories</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {format(selectedDate, 'MMMM d, yyyy')}
          </p>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            modifiers={{
              hasMeals: (date) => {
                const dateKey = format(date, 'yyyy-MM-dd');
                return meals.some(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === dateKey);
              }
            }}
            modifiersStyles={{
              hasMeals: {
                fontWeight: 'bold',
                color: 'var(--primary)',
              }
            }}
            footer={
              <div className="text-sm text-gray-500 text-center mt-2">
                Days with recorded meals are highlighted
              </div>
            }
          />
        </Card>
      </div>

      <MealCaloriesChart meals={meals} selectedDate={selectedDate} />
      
      <MealList meals={selectedDateMeals} date={selectedDate} />
    </div>
  );
};
