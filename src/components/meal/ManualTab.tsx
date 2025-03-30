
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VoiceInput } from "../voice/VoiceInput";

interface ManualTabProps {
  calories: string;
  mealType: string;
  photo: string;
  selectedPetId: string;
  setCalories: (calories: string) => void;
  setMealType: (type: string) => void;
  setPhoto: (photo: string) => void;
  setSelectedPetId: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ManualTab = ({
  calories,
  mealType,
  photo,
  selectedPetId,
  setCalories,
  setMealType,
  setPhoto,
  setSelectedPetId,
  handleSubmit
}: ManualTabProps) => {
  const { petProfiles } = usePetProfiles();

  const handleVoiceInput = (text: string) => {
    // Try to extract calories from spoken text
    const caloriesMatch = text.match(/(\d+)\s*(?:calorie|calories|kcal)/i);
    if (caloriesMatch && caloriesMatch[1]) {
      setCalories(caloriesMatch[1]);
    }
    
    // Try to extract meal type from spoken text
    const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
    for (const type of mealTypes) {
      if (text.toLowerCase().includes(type)) {
        setMealType(type);
        break;
      }
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
        <div className="flex justify-end mt-2">
          <VoiceInput 
            onTranscription={handleVoiceInput} 
            placeholder="Speak to input meal info"
          />
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
        <div className="flex gap-2">
          <Input
            type="url"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Enter photo URL"
            className="transition-all duration-300"
          />
          <Button type="button" variant="outline" size="icon">
            <Image className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 transition-colors"
        disabled={!calories}
      >
        Save Meal
      </Button>
    </form>
  );
};
