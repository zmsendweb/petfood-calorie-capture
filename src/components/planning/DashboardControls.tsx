
import { PetProfile } from "@/data/types/petTypes";
import { PetSelection } from "./PetSelection";
import { ViewModeToggle } from "./ViewModeToggle";

interface DashboardControlsProps {
  petProfiles: PetProfile[];
  selectedPetId: string;
  setSelectedPetId: (id: string) => void;
  viewMode: "daily" | "weekly";
  setViewMode: (mode: "daily" | "weekly") => void;
}

export const DashboardControls = ({ 
  petProfiles,
  selectedPetId, 
  setSelectedPetId,
  viewMode,
  setViewMode
}: DashboardControlsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <PetSelection 
        petProfiles={petProfiles}
        selectedPetId={selectedPetId}
        setSelectedPetId={setSelectedPetId}
      />
      <ViewModeToggle 
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
};
