
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Camera } from "lucide-react";
import { FoodSearch } from "../FoodSearch";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { CameraComponent } from "../Camera";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

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
  const { petProfiles } = usePetProfiles();

  const handleCapture = (imageData: string) => {
    setPhoto(imageData);
    setShowCamera(false);
  };

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
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Selected Food</Label>
            <div className="p-3 border rounded-md">
              <h3 className="font-medium">{selectedFood.food_name}</h3>
              {selectedFood.brand_name && (
                <p className="text-sm text-gray-500">{selectedFood.brand_name}</p>
              )}
            </div>
          </div>
          
          {petProfiles.length > 0 && (
            <div className="space-y-2">
              <Label>Pet</Label>
              <Select onValueChange={setSelectedPetId} value={selectedPetId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a pet (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {petProfiles.map(pet => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name} ({pet.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Meal Type</Label>
            <div className="flex gap-2 flex-wrap">
              {["breakfast", "lunch", "dinner", "snack"].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={mealType === type ? "default" : "outline"}
                  onClick={() => setMealType(type)}
                  className="flex-1 capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Serving Size</Label>
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedServing}
              onChange={handleServingChange}
            >
              {selectedFood.servings && (
                (Array.isArray(selectedFood.servings.serving) ? 
                  selectedFood.servings.serving : 
                  [selectedFood.servings.serving]
                ).map((serving) => (
                  <option 
                    key={serving.serving_id} 
                    value={serving.serving_id}
                  >
                    {serving.serving_description} ({serving.calories} cal)
                  </option>
                ))
              )}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>Take Photo (Optional)</Label>
            {!showCamera && !photo ? (
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowCamera(true)} 
                className="w-full h-20"
              >
                <Camera className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            ) : showCamera ? (
              <CameraComponent onCapture={handleCapture} />
            ) : (
              <div className="relative">
                <img 
                  src={photo} 
                  alt="Captured meal" 
                  className="w-full h-40 object-cover rounded-md"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-2 right-2 bg-white/80"
                  onClick={() => setShowCamera(true)}
                >
                  Retake
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button
              type="button"
              className="flex-1"
              variant="outline"
              onClick={() => setSelectedFood(null)}
            >
              Change Food
            </Button>
            <Button
              type="button"
              className="flex-1 bg-primary hover:bg-primary/90 transition-colors"
              disabled={!calories}
              onClick={handleSubmit}
            >
              Save Meal
            </Button>
          </div>
        </div>
      ) : (
        <FoodSearch onSelectFood={handleSelectFood} />
      )}
    </>
  );
};
