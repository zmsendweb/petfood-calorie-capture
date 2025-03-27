
import { useMemo } from "react";
import { format } from "date-fns";
import { Card } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MealEntry } from "@/types/mealTypes";

interface MealCaloriesChartProps {
  meals: MealEntry[];
  selectedDate: Date;
}

export const MealCaloriesChart = ({ meals, selectedDate }: MealCaloriesChartProps) => {
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

  return (
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
  );
};
