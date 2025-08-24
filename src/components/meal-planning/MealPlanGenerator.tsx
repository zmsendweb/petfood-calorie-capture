
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useFatSecretAPI, FoodItem } from "@/hooks/use-fatsecret-api";
import { FoodSearch } from "@/components/food-search";

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
  const [petName, setPetName] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [mealPlan, setMealPlan] = useState<MealPlanItem[]>([]);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [selectedMealIndex, setSelectedMealIndex] = useState<number | null>(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

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
    }
  };

  const generateMealPlan = () => {
    if (!petName || !petWeight || !activityLevel) {
      toast.error("Please fill in all pet information");
      return;
    }

    if (mealPlan.length === 0) {
      toast.error("Please add at least one meal to the plan");
      return;
    }

    const totalCalories = mealPlan.reduce((sum, item) => sum + item.calories, 0);
    
    toast.success("Meal plan generated successfully!", {
      description: `Weekly plan for ${petName} with ${totalCalories} total calories`
    });
  };

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
        {/* Pet Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="petName">Pet Name</Label>
            <Input
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Enter pet name"
            />
          </div>
          <div>
            <Label htmlFor="petWeight">Weight (lbs)</Label>
            <Input
              id="petWeight"
              type="number"
              value={petWeight}
              onChange={(e) => setPetWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </div>
          <div>
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Indoor/Senior</SelectItem>
                <SelectItem value="moderate">Moderate - Regular walks</SelectItem>
                <SelectItem value="high">High - Very active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Meal Plan Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Meal Plan</Label>
            <Button onClick={addMealPlanItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Meal
            </Button>
          </div>

          {mealPlan.map((item, index) => (
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
                  <Label>Food</Label>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedMealIndex(index);
                      setShowFoodSearch(true);
                    }}
                  >
                    {item.food ? item.food.food_name.slice(0, 15) + '...' : 'Select Food'}
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
                  <h3 className="text-lg font-semibold">Search Food</h3>
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

        <Button onClick={generateMealPlan} className="w-full">
          Generate Complete Meal Plan
        </Button>
      </CardContent>
    </Card>
  );
}
