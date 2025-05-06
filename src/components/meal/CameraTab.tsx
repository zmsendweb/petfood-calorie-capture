
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Camera } from "lucide-react";
import { CameraComponent } from "../Camera";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { MealEntry } from "@/types/mealTypes";
import { useIsMobile } from "@/hooks/use-mobile";

interface CameraTabProps {
  photo: string;
  calories: string;
  mealType: string;
  selectedPetId: string;
  showCamera: boolean;
  setPhoto: (photo: string) => void;
  setCalories: (calories: string) => void;
  setMealType: (type: string) => void;
  setSelectedPetId: (id: string) => void;
  setShowCamera: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const CameraTab = ({
  photo,
  calories,
  mealType,
  selectedPetId,
  showCamera,
  setPhoto,
  setCalories,
  setMealType,
  setSelectedPetId,
  setShowCamera,
  handleSubmit
}: CameraTabProps) => {
  const { petProfiles } = usePetProfiles();
  const isMobile = useIsMobile();

  const handleCapture = (imageData: string) => {
    console.log("Photo captured in CameraTab, setting photo...");
    setPhoto(imageData);
    setShowCamera(false);
  };

  return (
    <div className="space-y-6">
      {!showCamera && !photo ? (
        <Button 
          onClick={() => setShowCamera(true)} 
          className="w-full h-48 border-2 border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300"
          type="button"
        >
          <Camera className="h-6 w-6 mr-2" />
          Take Photo of Your Meal
        </Button>
      ) : showCamera ? (
        <CameraComponent onCapture={handleCapture} />
      ) : (
        <div className="relative">
          {photo && (
            <img 
              src={photo} 
              alt="Captured meal" 
              className="w-full h-48 object-cover rounded-md"
            />
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute bottom-2 right-2 bg-white/80"
            onClick={() => setShowCamera(true)}
            type="button"
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
            <div className="grid grid-cols-2 gap-2">
              {["breakfast", "lunch", "dinner", "snack"].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={mealType === type ? "default" : "outline"}
                  onClick={() => setMealType(type)}
                  className="capitalize"
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
  );
};
