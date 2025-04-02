
import { PetProfile } from "@/data/types/petTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PetSelectionProps {
  petProfiles: PetProfile[];
  selectedPetId: string;
  setSelectedPetId: (id: string) => void;
}

export const PetSelection = ({ petProfiles, selectedPetId, setSelectedPetId }: PetSelectionProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-2">Select Pet</label>
      <Select value={selectedPetId} onValueChange={setSelectedPetId}>
        <SelectTrigger>
          <SelectValue placeholder="Select a pet" />
        </SelectTrigger>
        <SelectContent>
          {petProfiles.map((pet) => (
            <SelectItem key={pet.id} value={pet.id}>
              {pet.name} ({pet.type})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
