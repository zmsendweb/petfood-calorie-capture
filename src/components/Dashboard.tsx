
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PetOnboarding } from "./PetOnboarding";
import { NutritionQuery } from "./NutritionQuery";
import { EnhancedMealEntry } from "./EnhancedMealEntry";
import { usePetProfiles } from "@/hooks/use-pet-profiles";
import { PlusCircle, Sparkles, UtensilsCrossed, User } from "lucide-react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"profiles" | "nutrition" | "meals">("profiles");
  const { profiles } = usePetProfiles();

  const tabs = [
    { id: "profiles", label: "Pet Profiles", icon: User },
    { id: "nutrition", label: "Nutrition Assistant", icon: Sparkles },
    { id: "meals", label: "Meal Tracker", icon: UtensilsCrossed },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === "profiles" && (
          <div className="space-y-6">
            {profiles.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <PlusCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Create Your First Pet Profile</h3>
                      <p className="text-gray-600">
                        Get started by adding your pet's information to receive personalized nutrition recommendations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Your Pet Profiles</h3>
                <p className="text-gray-600">
                  You have {profiles.length} pet profile{profiles.length !== 1 ? 's' : ''} created.
                </p>
              </div>
            )}
            <PetOnboarding />
          </div>
        )}

        {activeTab === "nutrition" && <NutritionQuery />}

        {activeTab === "meals" && (
          <div className="space-y-6">
            {profiles.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Track Your Pet's Meals</h3>
                      <p className="text-gray-600">
                        Create a pet profile first to start tracking meals and monitor nutrition.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <EnhancedMealEntry />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
