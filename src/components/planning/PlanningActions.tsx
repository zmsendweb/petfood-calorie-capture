
import { useState } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { Button } from "@/components/ui/button";
import { AlertCircle, BarChart, Calendar, Download, Info, ListChecks, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface PlanningActionsProps {
  pet: PetProfile;
  viewMode: "daily" | "weekly";
}

export const PlanningActions = ({ pet, viewMode }: PlanningActionsProps) => {
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [planNotes, setPlanNotes] = useState("");
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  
  const handleCreatePlan = () => {
    toast.success(
      viewMode === "daily" 
        ? "Daily plan created! You'll receive notifications for today's schedule." 
        : "Weekly plan created! You'll receive notifications for scheduled activities."
    );
    setShowPlanDialog(false);
  };
  
  const handleExportData = () => {
    toast.success("Data export prepared! The download will start shortly.");
    // In a real app, this would trigger a download of the pet's health data
  };
  
  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full justify-start" 
        onClick={() => setShowPlanDialog(true)}
      >
        <ListChecks className="h-4 w-4 mr-2" />
        Create {viewMode === "daily" ? "Daily" : "Weekly"} Plan
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={handleExportData}
      >
        <Download className="h-4 w-4 mr-2" />
        Export {pet.name}'s Data
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full justify-start"
        onClick={() => toast.info("We're working on building the AI suggestions feature!")}
      >
        <BarChart className="h-4 w-4 mr-2" />
        Generate Analysis Report
      </Button>
      
      <div className="pt-3 border-t">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <Info className="h-4 w-4 mr-1 text-gray-500" />
          Quick Health Tips
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <AlertCircle className="h-3 w-3 mr-1 mt-1 text-amber-500" />
            {pet.type === "dog" ? 
              "Regular playtime helps maintain healthy weight and mental wellbeing" : 
              "Interactive toys help stimulate your cat's hunting instincts and prevent boredom"}
          </li>
          <li className="flex items-start">
            <AlertCircle className="h-3 w-3 mr-1 mt-1 text-amber-500" />
            {viewMode === "daily" ? 
              "Consider breaking meals into smaller portions throughout the day" : 
              "Try to maintain consistent feeding times each day of the week"}
          </li>
        </ul>
      </div>
      
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create {viewMode === "daily" ? "Daily" : "Weekly"} Plan for {pet.name}
            </DialogTitle>
            <DialogDescription>
              Set up scheduled activities and feeding reminders.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label>Plan Notes</Label>
              <Textarea 
                placeholder={`Enter your ${viewMode} plan notes here...`}
                value={planNotes}
                onChange={(e) => setPlanNotes(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Scheduled Activities</Label>
              {[
                { id: "morning-walk", label: "Morning Walk", time: "08:00 AM" },
                { id: "feeding-1", label: "Feeding Time", time: "12:00 PM" },
                { id: "evening-walk", label: "Evening Activity", time: "06:00 PM" },
                { id: "feeding-2", label: "Evening Feeding", time: "07:00 PM" }
              ].map(activity => (
                <div key={activity.id} className="flex items-center justify-between border p-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={activity.id} />
                    <Label htmlFor={activity.id} className="font-normal">{activity.label}</Label>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="reminders" 
                checked={remindersEnabled}
                onCheckedChange={(checked) => setRemindersEnabled(!!checked)}
              />
              <Label htmlFor="reminders" className="font-normal">
                Enable notifications and reminders
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlan}>
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
