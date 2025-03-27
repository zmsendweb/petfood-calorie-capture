
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { PetProfile } from "@/data/types/petTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Trophy, Zap, TrendingUp, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressChart } from "@/components/planning/ProgressChart";
import { WeeklyCalorieChart } from "@/components/planning/WeeklyCalorieChart";
import { MotivationalTip } from "@/components/planning/MotivationalTip";
import { WeightProgressChart } from "@/components/planning/WeightProgressChart";
import { PlanningActions } from "@/components/planning/PlanningActions";

const PlanningDashboard = () => {
  const { toast } = useToast();
  const { petProfiles } = usePetProfiles();
  const [selectedPetId, setSelectedPetId] = useState<string>(petProfiles.length > 0 ? petProfiles[0].id : "");
  const [viewMode, setViewMode] = useState<"daily" | "weekly">("daily");
  
  const selectedPet = useMemo(() => 
    petProfiles.find(pet => pet.id === selectedPetId),
    [petProfiles, selectedPetId]
  );

  // Handle no pets scenario
  if (petProfiles.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
        <div className="container max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Planning Dashboard</h1>
          </div>
          
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">No Pets Found</h2>
            <p className="text-gray-600 mb-6">
              Please add a pet profile to start planning and tracking their progress.
            </p>
            <Link to="/pet-profiles">
              <Button>Add a Pet Profile</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-primary/30 py-8">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Planning Dashboard</h1>
        </div>

        {/* Pet Selection and View Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">View Mode</label>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "daily" ? "default" : "outline"} 
                onClick={() => setViewMode("daily")}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Daily
              </Button>
              <Button 
                variant={viewMode === "weekly" ? "default" : "outline"} 
                onClick={() => setViewMode("weekly")}
                className="flex-1"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Weekly
              </Button>
            </div>
          </div>
        </div>

        {selectedPet && (
          <>
            {/* Motivational Section */}
            <MotivationalTip pet={selectedPet} viewMode={viewMode} />

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Left Column - Calorie Tracking */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      {viewMode === "daily" ? "Today's" : "Weekly"} Calorie Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <WeeklyCalorieChart 
                      petId={selectedPet.id} 
                      targetCalories={selectedPet.dailyCalorieTarget || 0}
                      viewMode={viewMode} 
                    />
                  </CardContent>
                </Card>

                {/* Weight Progress Chart */}
                {selectedPet.shortTermGoals?.some(goal => 
                  goal.toLowerCase().includes("weight") || 
                  goal.toLowerCase().includes("lose") || 
                  goal.toLowerCase().includes("gain")
                ) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="h-5 w-5 mr-2" />
                        Weight Progress Tracker
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <WeightProgressChart pet={selectedPet} />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Goals Progress & Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Goals Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProgressChart pet={selectedPet} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      Planning Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PlanningActions pet={selectedPet} viewMode={viewMode} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanningDashboard;
