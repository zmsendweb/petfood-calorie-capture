
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MealTrackerTab } from "./dashboard/MealTrackerTab";
import { NutritionTab } from "./dashboard/NutritionTab";
import { PetProfilesTab } from "./dashboard/PetProfilesTab";
import { MealEntry } from "@/types/mealTypes";

export const Dashboard = ({ meals: initialMeals }: { meals: MealEntry[] }) => {
  const [meals, setMeals] = useState<MealEntry[]>(initialMeals);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string>("meals");

  const handleAddMeal = (meal: MealEntry) => {
    setMeals(prevMeals => [...prevMeals, meal]);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="meals" className="flex-1">Meal Tracker</TabsTrigger>
          <TabsTrigger value="nutrition" className="flex-1">Nutrition Assistant</TabsTrigger>
          <TabsTrigger value="pets" className="flex-1">Pet Profiles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="meals">
          <MealTrackerTab 
            meals={meals}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleAddMeal={handleAddMeal}
          />
        </TabsContent>
        
        <TabsContent value="nutrition">
          <NutritionTab />
        </TabsContent>

        <TabsContent value="pets">
          <PetProfilesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
