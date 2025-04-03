
import { PetProfile } from "@/data/types/petTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Trophy, Zap, Heart } from "lucide-react";
import { ProgressChart } from "./ProgressChart";
import { CalorieChart } from "./CalorieChart";
import { MotivationalTip } from "./MotivationalTip";
import { WeightProgressChart } from "./charts/WeightProgressChart";
import { PlanningActions } from "./PlanningActions";

interface DashboardContentProps {
  pet: PetProfile;
  viewMode: "daily" | "weekly";
}

export const DashboardContent = ({ pet, viewMode }: DashboardContentProps) => {
  return (
    <>
      <MotivationalTip pet={pet} viewMode={viewMode} />

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
              <CalorieChart 
                petId={pet.id} 
                targetCalories={pet.dailyCalorieTarget || 0}
                viewMode={viewMode} 
              />
            </CardContent>
          </Card>

          {/* Weight Progress Chart - conditionally rendered */}
          {pet.shortTermGoals?.some(goal => 
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
                <WeightProgressChart pet={pet} />
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
              <ProgressChart pet={pet} />
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
              <PlanningActions pet={pet} viewMode={viewMode} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
