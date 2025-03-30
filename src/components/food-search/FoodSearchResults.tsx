
import { useState } from "react";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { FoodDetails } from "./FoodDetails";
import { FoodResultsList } from "./FoodResultsList";

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
    <FoodResultsList
      searchResults={searchResults}
      query={query}
      onSelectFood={handleSelectFood}
      getCaloriesRange={getCaloriesRange}
    />
  );
}
