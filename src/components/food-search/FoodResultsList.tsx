
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { FoodResultItem } from "./FoodResultItem";

interface FoodResultsListProps {
  searchResults: FoodItem[];
  query: string;
  onSelectFood: (foodId: string) => void;
  getCaloriesRange: (food: FoodItem) => string;
}

export function FoodResultsList({ 
  searchResults, 
  query, 
  onSelectFood,
  getCaloriesRange
}: FoodResultsListProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>
          Found {searchResults.length} results for "{query}"
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {searchResults.map((food) => (
            <FoodResultItem
              key={food.food_id}
              food={food}
              onClick={() => onSelectFood(food.food_id)}
              getCaloriesRange={getCaloriesRange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
