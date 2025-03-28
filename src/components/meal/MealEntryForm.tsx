
import { useState } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Camera, Image, Search, Plus } from "lucide-react";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { toast } from "sonner";
import { MealEntry } from "@/types/mealTypes";
import { CameraTab } from "./CameraTab";
import { SearchTab } from "./SearchTab";
import { ManualTab } from "./ManualTab";

export interface MealEntryFormProps {
  onSave: (meal: MealEntry) => void;
}

export const MealEntryForm = ({ onSave }: MealEntryFormProps) => {
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [photo, setPhoto] = useState("");
  const [activeTab, setActiveTab] = useState<string>("camera");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedServing, setSelectedServing] = useState<string>("");
  const [showCamera, setShowCamera] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meal: MealEntry = {
      id: Date.now().toString(),
      type: mealType,
      calories: Number(calories),
      photo: photo || "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80",
      timestamp: new Date(),
      ...(selectedPetId && { petId: selectedPetId })
    };

    // Add food information if available
    if (selectedFood) {
      meal.foodName = selectedFood.food_name;
      meal.brandName = selectedFood.brand_name;
      
      if (selectedFood.servings) {
        const servings = Array.isArray(selectedFood.servings.serving) ? 
          selectedFood.servings.serving : [selectedFood.servings.serving];
        
        const serving = servings.find(s => s.serving_id === selectedServing);
        if (serving) {
          meal.serving = serving.serving_description;
        }
      }
    }

    onSave(meal);
    resetForm();
    toast.success("Meal added successfully!");
  };

  const resetForm = () => {
    setCalories("");
    setPhoto("");
    setMealType("breakfast");
    setSelectedFood(null);
    setSelectedServing("");
    setActiveTab("camera");
    setShowCamera(false);
    setSelectedPetId("");
  };

  return (
    <Card className="p-6 mx-auto bg-white/80 backdrop-blur-sm shadow-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="camera" className="flex-1">
            <Camera className="h-4 w-4 mr-2" />
            Camera
          </TabsTrigger>
          <TabsTrigger value="search" className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Food Search
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Manual Entry
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="camera">
          <CameraTab 
            photo={photo}
            calories={calories}
            mealType={mealType}
            selectedPetId={selectedPetId}
            showCamera={showCamera}
            setPhoto={setPhoto}
            setCalories={setCalories}
            setMealType={setMealType}
            setSelectedPetId={setSelectedPetId}
            setShowCamera={setShowCamera}
            handleSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="search">
          <SearchTab 
            photo={photo}
            mealType={mealType}
            calories={calories}
            selectedPetId={selectedPetId}
            showCamera={showCamera}
            setPhoto={setPhoto}
            setMealType={setMealType}
            setCalories={setCalories}
            setSelectedPetId={setSelectedPetId}
            setShowCamera={setShowCamera}
            setSelectedFood={setSelectedFood}
            setSelectedServing={setSelectedServing}
            selectedFood={selectedFood}
            selectedServing={selectedServing}
            handleSubmit={handleSubmit}
          />
        </TabsContent>
        
        <TabsContent value="manual">
          <ManualTab 
            calories={calories}
            mealType={mealType}
            photo={photo}
            selectedPetId={selectedPetId}
            setCalories={setCalories}
            setMealType={setMealType}
            setPhoto={setPhoto}
            setSelectedPetId={setSelectedPetId}
            handleSubmit={handleSubmit}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
