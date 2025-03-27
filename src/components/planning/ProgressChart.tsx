
import { PetProfile } from "@/data/types/petTypes";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";

interface ProgressChartProps {
  pet: PetProfile;
}

export const ProgressChart = ({ pet }: ProgressChartProps) => {
  // Combine short-term and long-term goals
  const allGoals = [
    ...(pet.shortTermGoals || []).map(goal => ({ 
      text: goal, 
      isShortTerm: true,
      // Mock progress values (in a real app, this would come from tracked data)
      progress: Math.floor(Math.random() * 101) 
    })),
    ...(pet.longTermGoals || []).map(goal => ({ 
      text: goal, 
      isShortTerm: false,
      // Long term goals typically have lower progress
      progress: Math.floor(Math.random() * 51) 
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
