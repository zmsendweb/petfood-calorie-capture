
import { useState } from "react";
import { FoodSearch } from "../food-search";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { FoodSelectionForm } from "./search-tab";

interface SearchTabProps {
  photo: string;
  mealType: string;
  calories: string;
  selectedPetId: string;
  showCamera: boolean;
  setPhoto: (photo: string) => void;
  setMealType: (type: string) => void;
  setCalories: (calories: string) => void;
  setSelectedPetId: (id: string) => void;
  setShowCamera: (show: boolean) => void;
  setSelectedFood: (food: FoodItem | null) => void;
  setSelectedServing: (serving: string) => void;
  selectedFood: FoodItem | null;
  selectedServing: string;
  handleSubmit: (e: React.FormEvent) => void;
}

export const SearchTab = ({
  photo,
  mealType,
  calories,
  selectedPetId,
  showCamera,
  setPhoto,
  setMealType,
  setCalories,
  setSelectedPetId,
  setShowCamera,
  setSelectedFood,
  setSelectedServing,
  selectedFood,
  selectedServing,
  handleSubmit
}: SearchTabProps) => {

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    // Select the first serving by default
    if (food.servings) {
      const servings = Array.isArray(food.servings.serving) ? 
        food.servings.serving : [food.servings.serving];
      
      if (servings.length > 0) {
        setSelectedServing(servings[0].serving_id);
        setCalories(servings[0].calories.toString());
      }
    }
  };

  const handleServingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const servingId = e.target.value;
    setSelectedServing(servingId);
    
    if (selectedFood?.servings) {
      const servings = Array.isArray(selectedFood.servings.serving) ? 
        selectedFood.servings.serving : [selectedFood.servings.serving];
      
      const serving = servings.find(s => s.serving_id === servingId);
      if (serving) {
        setCalories(serving.calories.toString());
      }
    }
  };

  return (
    <>
      {selectedFood ? (
        <FoodSelectionForm
          photo={photo}
          mealType={mealType}
          calories={calories}
          selectedPetId={selectedPetId}
          selectedFood={selectedFood}
          selectedServing={selectedServing}
          showCamera={showCamera}
          setPhoto={setPhoto}
          setMealType={setMealType}
          setCalories={setCalories}
          setSelectedPetId={setSelectedPetId}
          setShowCamera={setShowCamera}
          setSelectedFood={setSelectedFood}
          handleSubmit={handleSubmit}
          handleServingChange={handleServingChange}
        />
      ) : (
        <FoodSearch onSelectFood={handleSelectFood} />
      )}
    </>
  );
};
