import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Camera, Image, Search, Plus } from "lucide-react";
import { FoodSearch } from "./FoodSearch";
import { FoodItem } from "@/hooks/use-fatsecret-api";
import { CameraComponent } from "./Camera";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { MealEntry } from "@/types/mealTypes";

export const EnhancedMealEntryForm = ({
  onSave,
}: {
  onSave: (meal: MealEntry) => void;
}) => {
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [photo, setPhoto] = useState("");
  const [activeTab, setActiveTab] = useState<string>("camera");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [selectedServing, setSelectedServing] = useState<string>("");
  const [showCamera, setShowCamera] = useState(false);
  const { petProfiles } = usePetProfiles();
  const [selectedPetId, setSelectedPetId] = useState<string>("");

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

  const handleCapture = (imageData: string) => {
    setPhoto(imageData);
    setShowCamera(false);
    toast.success("Photo captured successfully!");
  };

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
          <div className="space-y-6">
            {!showCamera && !photo ? (
              <Button 
                onClick={() => setShowCamera(true)} 
                className="w-full h-48 border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300"
              >
                <Camera className="h-6 w-6 mr-2" />
                Take Photo of Your Meal
              </Button>
            ) : showCamera ? (
              <CameraComponent onCapture={handleCapture} />
            ) : (
              <div className="relative">
                <img 
                  src={photo} 
                  alt="Captured meal" 
                  className="w-full h-48 object-cover rounded-md"
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

            {photo && (
              <form className="space-y-6">
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
                  <Label>Calories</Label>
                  <Input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Enter calories"
                    required
                    min="0"
                    className="transition-all duration-300"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full bg-primary hover:bg-primary/90 transition-colors"
                  disabled={!calories || !photo}
                  onClick={handleSubmit}
                >
                  Save Meal
                </Button>
              </form>
            )}
          </div>
        </TabsContent>

        <TabsContent value="search">
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
        </TabsContent>
        
        <TabsContent value="manual">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <Label>Calories</Label>
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories"
                required
                min="0"
                className="transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label>Photo URL (Optional)</Label>
              <Input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Enter photo URL"
                className="transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 transition-colors"
              disabled={!calories}
            >
              Save Meal
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export const EnhancedMealCard = ({ meal }: { meal: MealEntry }) => {
  const { petProfiles } = usePetProfiles();
  const pet = meal.petId ? petProfiles.find(p => p.id === meal.petId) : null;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <img
          src={meal.photo}
          alt={`${meal.type} meal`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="px-3 py-1 rounded-full bg-black/50 text-white text-sm backdrop-blur-sm">
            {meal.calories} cal
          </span>
        </div>
        {pet && (
          <div className="absolute top-2 left-2">
            <span className="px-3 py-1 rounded-full bg-primary/80 text-white text-sm backdrop-blur-sm">
              {pet.name}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold capitalize">{meal.type}</h3>
        {meal.foodName && (
          <p className="text-sm font-medium">{meal.foodName}</p>
        )}
        {meal.serving && (
          <p className="text-xs text-gray-500">{meal.serving}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {new Date(meal.timestamp).toLocaleString()}
        </p>
      </div>
    </Card>
  );
};
