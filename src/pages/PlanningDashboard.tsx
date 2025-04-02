
import { useState, useMemo } from "react";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { 
  NoPetsView, 
  DashboardHeader, 
  DashboardControls, 
  DashboardContent 
} from "@/components/planning";

const PlanningDashboard = () => {
  const { petProfiles } = usePetProfiles();
  const [selectedPetId, setSelectedPetId] = useState<string>(petProfiles.length > 0 ? petProfiles[0].id : "");
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  
  const selectedPet = useMemo(() => 
    petProfiles.find(pet => pet.id === selectedPetId),
    [petProfiles, selectedPetId]
  );

  // Handle no pets scenario
  if (petProfiles.length === 0) {
    return <NoPetsView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <DashboardHeader />

        {/* Pet Selection and View Mode */}
        <DashboardControls 
          petProfiles={petProfiles}
          selectedPetId={selectedPetId}
          setSelectedPetId={setSelectedPetId}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {selectedPet && <DashboardContent pet={selectedPet} viewMode={viewMode} />}
      </div>
    </div>
  );
};

export default PlanningDashboard;
