
import { Button } from "@/components/ui/button";
import { PetProfile } from "@/data/types/petTypes";
import { AlertTriangle, Calendar, Check, Clock, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/hooks/use-notifications";

interface PlanningActionsProps {
  pet: PetProfile;
  viewMode: "daily" | "weekly";
}

export const PlanningActions = ({ pet, viewMode }: PlanningActionsProps) => {
  const { isDismissed, dismissNotification } = useNotifications();
  const [showMissedOpportunity, setShowMissedOpportunity] = useState(true);
  const MISSED_OPPORTUNITY_ID = `missed-opportunity-${pet.id}`;
  
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

  const handleSetReminder = () => {
    toast.success("Reminder set! We'll help you stay on track with your pet's health goals.");
    dismissNotification(MISSED_OPPORTUNITY_ID);
    setShowMissedOpportunity(false);
  };

  const handleDismiss = () => {
    toast.info("You've dismissed the reminder, but your pet's progress might slow down without consistent tracking.");
    dismissNotification(MISSED_OPPORTUNITY_ID);
    setShowMissedOpportunity(false);
  };

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
        <Button className="w-full justify-start" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule a Vet Check-up
        </Button>
        
        <Button className="w-full justify-start" variant="outline">
          <Clock className="mr-2 h-4 w-4" />
          Set Meal Reminders
        </Button>
        
        <Button className="w-full justify-start" variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" />
          Share Progress Report
        </Button>
        
        <Button className="w-full justify-start" variant="outline">
          <Check className="mr-2 h-4 w-4" />
          Mark Goal as Complete
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-2 italic">
        Pro tip: Pet owners who track consistently report 78% more satisfaction with their pet's health outcomes.
      </div>
    </div>
  );
};
