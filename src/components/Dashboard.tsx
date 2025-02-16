
import { useMemo } from "react";
import { Card } from "./ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MealEntry {
  id: string;
  type: string;
  calories: number;
  photo: string;
  timestamp: Date;
}

export const Dashboard = ({ meals }: { meals: MealEntry[] }) => {
  const dailyCalories = useMemo(() => {
    return meals.reduce((acc, meal) => acc + meal.calories, 0);
  }, [meals]);

  const chartData = useMemo(() => {
    const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
    return mealTypes.map((type) => ({
      name: type,
      calories: meals
        .filter((meal) => meal.type === type)
        .reduce((acc, meal) => acc + meal.calories, 0),
    }));
  }, [meals]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-white/80 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-4">Today's Summary</h2>
        <div className="text-4xl font-bold text-primary">
          {dailyCalories} <span className="text-lg text-gray-500">calories</span>
        </div>
      </Card>

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
