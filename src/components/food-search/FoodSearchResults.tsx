
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { FoodDetails } from "./FoodDetails";

interface FoodSearchResultsProps {
  searchResults: FoodItem[];
  query: string;
  onSelectFood: (food: FoodItem) => void;
  getFoodDetails: (foodId: string) => Promise<any>;
}

export function FoodSearchResults({ 
  searchResults, 
  query, 
  onSelectFood,
  getFoodDetails 
}: FoodSearchResultsProps) {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const handleSelectFood = async (foodId: string) => {
    const result = await getFoodDetails(foodId);
    if (result?.food) {
      setSelectedFood(result.food);
      if (onSelectFood) onSelectFood(result.food);
    }
  };

  const getCaloriesRange = (food: FoodItem): string => {
    if (!food.servings) return "N/A";
    
    const servingArray = Array.isArray(food.servings.serving) 
      ? food.servings.serving 
      : [food.servings.serving];
    
    const calories = servingArray.map(s => parseInt(s.calories.toString()));
    const min = Math.min(...calories);
    const max = Math.max(...calories);
    
    return min === max ? `${min} cal` : `${min}-${max} cal`;
  };

  if (selectedFood) {
    return (
      <FoodDetails 
        selectedFood={selectedFood} 
        onBack={() => setSelectedFood(null)} 
        onSelectFood={onSelectFood} 
      />
    );
  }

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
            <div 
              key={food.food_id}
              className="py-3 cursor-pointer hover:bg-gray-50 rounded px-2"
              onClick={() => handleSelectFood(food.food_id)}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{food.food_name}</h3>
                  {food.brand_name && (
                    <p className="text-sm text-gray-500">{food.brand_name}</p>
                  )}
                </div>
                <div className="text-sm font-semibold">{getCaloriesRange(food)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
