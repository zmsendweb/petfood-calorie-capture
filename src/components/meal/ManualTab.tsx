
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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

  return (
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
  );
};
