
import { PetProfile } from "@/data/types/petTypes";
import { Progress } from "@/components/ui/progress";
import { Check, Clock, Loader2 } from "lucide-react";
import { usePetGoals } from "@/hooks/use-pet-goals";

interface ProgressChartProps {
  pet: PetProfile;
}

export const ProgressChart = ({ pet }: ProgressChartProps) => {
  const { goals, loading } = usePetGoals(pet.id);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-sm text-gray-500">Loading goals...</span>
      </div>
    );
  }

  // Get pet's goals from profile and merge with completed goals from database
  const completedGoalTexts = goals.filter(g => g.is_completed).map(g => g.goal_text);
  
  // Combine short-term and long-term goals with progress information
  const allGoals = [
    ...(pet.shortTermGoals || []).map(goal => ({ 
      text: goal, 
      isShortTerm: true,
      progress: completedGoalTexts.includes(goal) ? 100 : Math.floor(Math.random() * 70) + 10
    })),
    ...(pet.longTermGoals || []).map(goal => ({ 
      text: goal, 
      isShortTerm: false,
      progress: completedGoalTexts.includes(goal) ? 100 : Math.floor(Math.random() * 40) + 5
    }))
  ];

  if (allGoals.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No goals have been set for {pet.name}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allGoals.map((goal, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {goal.isShortTerm ? (
                <Clock className="h-4 w-4 text-orange-500 mr-2" />
              ) : (
                <Clock className="h-4 w-4 text-blue-500 mr-2" />
              )}
              <span className="text-sm font-medium">
                {goal.text}
              </span>
            </div>
            <span className="text-sm font-medium">
              {goal.progress}%
            </span>
          </div>
          <Progress value={goal.progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {goal.isShortTerm ? 'Short-term' : 'Long-term'}
            </span>
            {goal.progress === 100 && (
              <span className="flex items-center text-green-500">
                <Check className="h-3 w-3 mr-1" /> Complete
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
