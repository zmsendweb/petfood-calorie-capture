
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { FoodSearch } from "@/components/food-search";
import { usePetData } from "@/hooks/use-pet-data";
import { PetProfile } from "@/data/types/petTypes";

interface MealPlanGeneratorProps {
  onClose: () => void;
}

interface MealPlanItem {
  id: string;
  day: string;
  mealType: string;
  food: FoodItem | null;
  calories: number;
  notes: string;
}

export function MealPlanGenerator({ onClose }: MealPlanGeneratorProps) {
  const { pets, isLoading: isPetsLoading } = usePetData();
  const [selectedPetId, setSelectedPetId] = useState("");
  const [selectedPet, setSelectedPet] = useState<PetProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [selectedMealIndex, setSelectedMealIndex] = useState<number | null>(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const handlePetSelection = (petId: string) => {
    setSelectedPetId(petId);
    const pet = pets.find(p => p.id === petId) || null;
    setSelectedPet(pet);
  };

  const addMealPlanItem = () => {
    const newItem: MealPlanItem = {
      id: Date.now().toString(),
      day: "Monday",
      mealType: "Breakfast",
      food: null,
      calories: 0,
      notes: ""
    };
    setMealPlan([...mealPlan, newItem]);
  };

  const removeMealPlanItem = (id: string) => {
    setMealPlan(mealPlan.filter(item => item.id !== id));
  };

  const updateMealPlanItem = (id: string, field: keyof MealPlanItem, value: any) => {
    setMealPlan(mealPlan.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleFoodSelect = (food: FoodItem) => {
    if (selectedMealIndex !== null) {
      const item = mealPlan[selectedMealIndex];
      let calories = 0;
      
      if (food.servings) {
        const servings = Array.isArray(food.servings.serving) 
          ? food.servings.serving 
          : [food.servings.serving];
        if (servings.length > 0) {
          calories = servings[0].calories;
        }
      }

      updateMealPlanItem(item.id, 'food', food);
      updateMealPlanItem(item.id, 'calories', calories);
      setShowFoodSearch(false);
      setSelectedMealIndex(null);
      
      toast.success("Food added to meal plan", {
        description: `${food.food_name} (${calories} cal) added successfully`
      });
    }
  };

  const generateMealPlan = () => {
    if (!selectedPet) {
      toast.error("Please select a pet from your account");
      return;
    }

    if (mealPlan.length === 0) {
      toast.error("Please add at least one meal to the plan");
      return;
    }

    const totalCalories = mealPlan.reduce((sum, item) => sum + item.calories, 0);
    const targetCalories = selectedPet.dailyCalorieTarget || 0;
    
    toast.success("Meal plan generated successfully!", {
      description: `Weekly plan for ${selectedPet.name}: ${totalCalories} total calories (Target: ${targetCalories * 7}/week)`
    });
  };

  if (isPetsLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center">Loading your pets...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Weekly Meal Plan Generator
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pet Selection */}
        <div>
          <Label htmlFor="petSelect">Select Pet from Your Account</Label>
          <Select value={selectedPetId} onValueChange={handlePetSelection}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a pet to create meal plan for" />
            </SelectTrigger>
            <SelectContent>
              {pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id}>
                  {pet.name} ({pet.type} - {pet.breed}) - Target: {pet.dailyCalorieTarget || 'Not set'} cal/day
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {pets.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              No pets found. Please add pets to your account first.
            </p>
          )}
        </div>

        {/* Pet Information Display */}
        {selectedPet && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Pet Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span> {selectedPet.name}
              </div>
              <div>
                <span className="text-gray-600">Weight:</span> {selectedPet.weight} {selectedPet.weightUnit}
              </div>
              <div>
                <span className="text-gray-600">Activity:</span> {selectedPet.activityLevel}
              </div>
              <div>
                <span className="text-gray-600">Daily Calories:</span> {selectedPet.dailyCalorieTarget || 'Not set'}
              </div>
            </div>
          </div>
        )}

        {/* Meal Plan Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Meal Plan</Label>
            <Button onClick={addMealPlanItem} size="sm" disabled={!selectedPet}>
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>

          {!selectedPet && (
            <div className="text-center py-4 text-gray-500">
              Please select a pet to start creating meal plan
            </div>
          )}

          {selectedPet && mealPlan.map((item, index) => (
            <Card key={item.id} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                <div>
                  <Label>Day</Label>
                  <Select 
                    value={item.day} 
                    onValueChange={(value) => updateMealPlanItem(item.id, 'day', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Meal Type</Label>
                  <Select 
                    value={item.mealType} 
                    onValueChange={(value) => updateMealPlanItem(item.id, 'mealType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mealTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Food (FatSecret Database)</Label>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedMealIndex(index);
                      setShowFoodSearch(true);
                    }}
                  >
                    {item.food ? item.food.food_name.slice(0, 15) + '...' : 'Search Food'}
                  </Button>
                </div>

                <div>
                  <Label>Calories</Label>
                  <Input
                    type="number"
                    value={item.calories}
                    onChange={(e) => updateMealPlanItem(item.id, 'calories', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <Label>Notes</Label>
                  <Input
                    value={item.notes}
                    onChange={(e) => updateMealPlanItem(item.id, 'notes', e.target.value)}
                    placeholder="Optional notes"
                  />
                </div>

                <div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeMealPlanItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Food Search Modal */}
        {showFoodSearch && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Search Food (FatSecret US Database)</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setShowFoodSearch(false);
                      setSelectedMealIndex(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <FoodSearch onSelectFood={handleFoodSelect} />
              </div>
            </div>
          </div>
        )}

        <Button onClick={generateMealPlan} className="w-full" disabled={!selectedPet}>
          Generate Complete Meal Plan for {selectedPet?.name || 'Selected Pet'}
        </Button>
      </CardContent>
    </Card>
  );
}
