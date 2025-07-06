
import { Button } from "@/components/ui/button";
import { PetProfile } from "@/data/types/petTypes";
import { AlertTriangle, Calendar, Check, Clock, ExternalLink, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/hooks/use-notifications";
import { usePetGoals } from "@/hooks/use-pet-goals";
import { usePetReminders } from "@/hooks/use-pet-reminders";
import { useAuth } from "@/hooks/useAuth";

interface PlanningActionsProps {
  pet: PetProfile;
  viewMode: "daily" | "weekly";
}

export const PlanningActions = ({ pet, viewMode }: PlanningActionsProps) => {
  const { user } = useAuth();
  const { isDismissed, dismissNotification } = useNotifications();
  const [showMissedOpportunity, setShowMissedOpportunity] = useState(true);
  const MISSED_OPPORTUNITY_ID = `missed-opportunity-${pet.id}`;
  
  const { goals, loading: goalsLoading, markGoalComplete } = usePetGoals(pet.id);
  const { reminders, loading: remindersLoading, addReminder } = usePetReminders(pet.id);
  
  // Check if notification was dismissed in the last 7 days
  useEffect(() => {
    if (isDismissed(MISSED_OPPORTUNITY_ID)) {
      setShowMissedOpportunity(false);
    }
  }, [isDismissed, MISSED_OPPORTUNITY_ID]);

  // Sample missed opportunity message (psychological trigger)
  const missedOpportunityMessage = 
    pet.shortTermGoals?.some(goal => goal.toLowerCase().includes("weight")) 
      ? "85% of owners who track consistently reach weight goals 2x faster. Don't fall behind!"
      : "Pets with daily tracked nutrition are 3x more likely to avoid health issues. Don't miss this opportunity!";

  const handleSetReminder = async () => {
    if (!user) {
      toast.error("Please log in to set reminders");
      return;
    }

    console.log('Setting reminder for pet:', pet.id, 'user:', user.id);
    
    try {
      const newReminder = {
        pet_id: pet.id,
        title: "Pet Health Checkup",
        description: `Remember to track ${pet.name}'s nutrition and activity`,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        completed: false
      };
      
      await addReminder(newReminder);
      
      toast.success("Reminder set! We'll help you stay on track with your pet's health goals.", {
        description: `Reminder for ${pet.name} scheduled for ${newReminder.date.toLocaleDateString()}`
      });
      dismissNotification(MISSED_OPPORTUNITY_ID);
      setShowMissedOpportunity(false);
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast.error("Failed to set reminder. Please try again.");
    }
  };

  const handleDismiss = () => {
    toast.info("You've dismissed the reminder, but your pet's progress might slow down without consistent tracking.");
    dismissNotification(MISSED_OPPORTUNITY_ID);
    setShowMissedOpportunity(false);
  };
  
  const handleScheduleCheckup = async () => {
    if (!user) {
      toast.error("Please log in to schedule checkups");
      return;
    }

    console.log('Scheduling checkup for pet:', pet.id, 'user:', user.id);
    
    try {
      const checkupDate = new Date();
      checkupDate.setDate(checkupDate.getDate() + 14); // Two weeks from now
      
      const newReminder = {
        pet_id: pet.id,
        title: "Vet Checkup",
        description: `Schedule a checkup for ${pet.name}`,
        date: checkupDate,
        completed: false
      };
      
      await addReminder(newReminder);
      
      toast.success(`Vet checkup scheduled for ${pet.name}`, {
        description: `Set for ${checkupDate.toLocaleDateString()}`
      });
    } catch (error) {
      console.error('Error scheduling checkup:', error);
      toast.error("Failed to schedule checkup. Please try again.");
    }
  };
  
  const handleSetMealReminder = async () => {
    if (!user) {
      toast.error("Please log in to set meal reminders");
      return;
    }

    console.log('Setting meal reminders for pet:', pet.id, 'user:', user.id);
    
    try {
      // Create daily meal reminders
      const breakfast = new Date();
      breakfast.setHours(8, 0, 0, 0);
      
      const dinner = new Date();
      dinner.setHours(18, 0, 0, 0);
      
      const breakfastReminder = {
        pet_id: pet.id,
        title: "Breakfast Time",
        description: `Time to feed ${pet.name} breakfast`,
        date: breakfast,
        completed: false
      };
      
      const dinnerReminder = {
        pet_id: pet.id,
        title: "Dinner Time", 
        description: `Time to feed ${pet.name} dinner`,
        date: dinner,
        completed: false
      };
      
      await addReminder(breakfastReminder);
      await addReminder(dinnerReminder);
      
      toast.success(`Meal reminders set for ${pet.name}`, {
        description: "Daily breakfast and dinner reminders created"
      });
    } catch (error) {
      console.error('Error setting meal reminders:', error);
      toast.error("Failed to set meal reminders. Please try again.");
    }
  };
  
  const handleShareProgress = () => {
    try {
      // Generate a summary of the pet's progress
      const allGoals = [...(pet.shortTermGoals || []), ...(pet.longTermGoals || [])];
      const totalGoals = allGoals.length;
      const completedGoals = goals.filter(g => g.is_completed);
      const completedCount = completedGoals.length;
      const completionPercentage = totalGoals > 0 ? Math.round((completedCount / totalGoals) * 100) : 0;
      
      const progressSummary = `
Pet: ${pet.name} (${pet.breed || pet.type})
Progress: ${completionPercentage}% complete
${completedCount} out of ${totalGoals} goals accomplished

Weight: ${pet.weight} ${pet.weightUnit}
Daily Calorie Target: ${pet.dailyCalorieTarget || "Not set"}
Activity Level: ${pet.activityLevel}

Thank you for using mypetcal to track your pet's health!
      `.trim();
      
      navigator.clipboard.writeText(progressSummary).then(() => {
        toast.success("Progress report copied to clipboard", {
          description: "You can now share it with your vet or friends"
        });
      }).catch(() => {
        toast.error("Failed to copy to clipboard");
      });
    } catch (error) {
      console.error('Error sharing progress:', error);
      toast.error("Failed to share progress. Please try again.");
    }
  };
  
  const handleMarkGoalComplete = async () => {
    if (!user) {
      toast.error("Please log in to mark goals complete");
      return;
    }

    console.log('Marking goal complete for pet:', pet.id, 'user:', user.id);
    
    try {
      // Get incomplete goals from pet profile
      const allGoals = [...(pet.shortTermGoals || []), ...(pet.longTermGoals || [])];
      const completedGoalTexts = goals.filter(g => g.is_completed).map(g => g.goal_text);
      const incompleteGoals = allGoals.filter(goal => !completedGoalTexts.includes(goal));
      
      if (incompleteGoals.length > 0) {
        const goalToComplete = incompleteGoals[0];
        
        // Find existing goal or create completion record
        const existingGoal = goals.find(g => g.goal_text === goalToComplete);
        
        if (existingGoal) {
          await markGoalComplete(existingGoal.id, goalToComplete);
        } else {
          await markGoalComplete(undefined, goalToComplete);
        }
        
        toast.success(`Goal marked as complete for ${pet.name}`, {
          description: goalToComplete
        });
      } else {
        toast.info("All goals are already completed!", {
          description: "Great job taking care of your pet's health!"
        });
      }
    } catch (error) {
      console.error('Error marking goal complete:', error);
      toast.error("Failed to mark goal complete. Please try again.");
    }
  };

  if (goalsLoading || remindersLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500 mb-2">Please log in to access planning actions</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showMissedOpportunity && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 relative">
          <button 
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-amber-100 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4 text-amber-500" />
          </button>
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Don't miss out!</h4>
              <p className="text-sm text-amber-700 mt-1">{missedOpportunityMessage}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="default" onClick={handleSetReminder}>
                  Set a Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Button className="w-full justify-start" variant="outline" onClick={handleScheduleCheckup}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule a Vet Check-up
        </Button>
        
        <Button className="w-full justify-start" variant="outline" onClick={handleSetMealReminder}>
          <Clock className="mr-2 h-4 w-4" />
          Set Meal Reminders
        </Button>
        
        <Button className="w-full justify-start" variant="outline" onClick={handleShareProgress}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Share Progress Report
        </Button>
        
        <Button className="w-full justify-start" variant="outline" onClick={handleMarkGoalComplete}>
          <Check className="mr-2 h-4 w-4" />
          Mark Goal as Complete
        </Button>
      </div>

      {reminders.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Your Reminders</h4>
          <ul className="space-y-2 text-sm">
            {reminders.slice(0, 3).map(reminder => (
              <li key={reminder.id} className="flex justify-between items-center">
                <span className={reminder.completed ? "line-through text-gray-400" : ""}>
                  {reminder.title}
                </span>
                <span className="text-xs text-gray-500">
                  {reminder.date.toLocaleDateString()}
                </span>
              </li>
            ))}
            {reminders.length > 3 && (
              <li className="text-xs text-gray-500 text-center">
                +{reminders.length - 3} more reminders
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-2 italic">
        Pro tip: Pet owners who track consistently report 78% more satisfaction with their pet's health outcomes.
      </div>
    </div>
  );
};
