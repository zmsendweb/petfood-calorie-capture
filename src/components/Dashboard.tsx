
import { useMemo, useState } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { MealEntryForm } from "./MealEntry";

interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  timestamp: Date;
}

export const Dashboard = ({ meals: initialMeals }: { meals: MealEntry[] }) => {
  const [meals, setMeals] = useState<MealEntry[]>(initialMeals);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleAddMeal = (meal: MealEntry) => {
    setMeals(prevMeals => [...prevMeals, meal]);
  };

  const dailyCalories = useMemo(() => {
    return meals
      .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
      .reduce((acc, meal) => acc + meal.calories, 0);
  }, [meals, selectedDate]);

  const chartData = useMemo(() => {
    const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
    return mealTypes.map((type) => ({
      name: type,
      calories: meals
        .filter(meal => format(new Date(meal.timestamp), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
        .filter((meal) => meal.type === type)
        .reduce((acc, meal) => acc + meal.calories, 0),
    }));
  }, [meals, selectedDate]);

  // Calculate daily totals for calendar
  const calendarData = useMemo(() => {
    const dailyTotals = new Map<string, number>();
    meals.forEach(meal => {
      const dateKey = format(new Date(meal.timestamp), 'yyyy-MM-dd');
      dailyTotals.set(dateKey, (dailyTotals.get(dateKey) || 0) + meal.calories);
    });
    return dailyTotals;
  }, [meals]);

  const modifiers = {
    hasMeals: (date: Date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      return calendarData.has(dateKey);
    }
  };

  const modifiersStyles = {
    hasMeals: {
      fontWeight: 'bold',
      color: 'var(--primary)',
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <MealEntryForm onSave={handleAddMeal} />
      
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
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            footer={
              <div className="text-sm text-gray-500 text-center mt-2">
                Days with recorded meals are highlighted
              </div>
            }
          />
        </Card>
      </div>

      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-4">Calories by Meal Type</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#666" }}
                tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <YAxis tick={{ fill: "#666" }} />
              <Tooltip />
              <Bar dataKey="calories" fill="#8CA896" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
