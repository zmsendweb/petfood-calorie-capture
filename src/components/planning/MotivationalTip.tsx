
import { useState, useEffect } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, MessageCircle } from "lucide-react";

interface MotivationalTipProps {
  pet: PetProfile;
  viewMode: "daily" | "weekly";
}

// List of motivational tips based on goals and progress
const tipsByCategory = {
  weightLoss: [
    "Consistency is key! Keep tracking meals and maintaining portion control.",
    "Even small calorie reductions add up over time.",
    "Remember that weight loss starts slow but accelerates as your pet adjusts to their new routine.",
    "Mix in play with exercise - it's more fun for your pet!",
    "Celebrate small victories - every ounce lost is progress!",
  ],
  weightGain: [
    "Focus on nutrient-dense foods to help your pet gain healthy weight.",
    "Small, frequent meals may help your pet consume more calories overall.",
    "Combine a balanced diet with appropriate exercise for muscle development.",
    "Patience is important - healthy weight gain takes time.",
    "Track progress weekly rather than daily for a more encouraging trend.",
  ],
  training: [
    "Consistency in training commands helps your pet build confidence.",
    "Short, regular training sessions are more effective than occasional long ones.",
    "Use positive reinforcement to make training a joyful experience.",
    "Building on small successes leads to mastering more complex behaviors.",
    "Training is mental exercise too - it helps keep your pet's mind sharp!",
  ],
  general: [
    "A healthy pet is a happy pet! Keep up the great care you're providing.",
    "Regular tracking helps spot patterns and make adjustments early.",
    "Small, consistent habits lead to big results over time.",
    "Taking time to plan your pet's nutrition shows how much you care.",
    "Every day of proper care adds to your pet's quality of life.",
  ],
};

export const MotivationalTip = ({ pet, viewMode }: MotivationalTipProps) => {
  const [tip, setTip] = useState<string>("");

  useEffect(() => {
    // Determine which category of tips to use based on pet's goals
    let category = "general";
    
    if (pet.shortTermGoals?.some(goal => 
      goal.toLowerCase().includes("weight loss") || 
      goal.toLowerCase().includes("lose weight") ||
      goal.toLowerCase().includes("diet")
    )) {
      category = "weightLoss";
    } else if (pet.shortTermGoals?.some(goal => 
      goal.toLowerCase().includes("weight gain") || 
      goal.toLowerCase().includes("gain weight") ||
      goal.toLowerCase().includes("bulk")
    )) {
      category = "weightGain";
    } else if (pet.shortTermGoals?.some(goal => 
      goal.toLowerCase().includes("train") || 
      goal.toLowerCase().includes("command") ||
      goal.toLowerCase().includes("behavior")
    )) {
      category = "training";
    }
    
    // Select a random tip from the appropriate category
    const tips = tipsByCategory[category as keyof typeof tipsByCategory];
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTip(tips[randomIndex]);
  }, [pet.id, viewMode]); // Regenerate tip when pet or view mode changes

  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          <div className="bg-primary/20 p-3 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">
              {viewMode === "daily" ? "Today's Tip" : "Weekly Focus"}
            </h3>
            <p className="text-gray-700">{tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
