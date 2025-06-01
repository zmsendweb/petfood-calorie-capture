
import { useState } from "react";
import { AppNavigation } from "@/components/AppNavigation";
import { DashboardContent } from "@/components/planning/DashboardContent";
import { PetProfile } from "@/data/types/petTypes";

export default function PlanningDashboard() {
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  
  // Mock pet data - in a real app this would come from a data store
  const mockPet: PetProfile = {
    id: "1",
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    weight: 30,
    weightUnit: "kg",
    age: 3,
    ageUnit: "years",
    gender: "male",
    activityLevel: "moderate",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <DashboardContent pet={mockPet} viewMode={viewMode} />
      </div>
    </div>
  );
}
