
import { EnhancedMealCard } from "../EnhancedMealEntry";
import { MealEntry } from "@/types/mealTypes";

interface MealListProps {
  meals: MealEntry[];
  date: Date;
}

export const MealList = ({ meals, date }: MealListProps) => {
  if (meals.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Recorded Meals for {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map(meal => (
          <EnhancedMealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};
