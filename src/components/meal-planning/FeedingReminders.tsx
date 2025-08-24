import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X, Clock, Bell, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FeedingRemindersProps {
  onClose: () => void;
}

interface Reminder {
  id: string;
  petName: string;
  time: string;
  mealType: string;
  enabled: boolean;
  days: string[];
}

export function FeedingReminders({ onClose }: FeedingRemindersProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      petName: "Buddy",
      time: "08:00",
      mealType: "Breakfast",
      enabled: true,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    {
      id: "2",
      petName: "Buddy", 
      time: "18:00",
      mealType: "Dinner",
      enabled: true,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  ]);

  const [newReminder, setNewReminder] = useState({
    petName: "",
    time: "",
    mealType: "Breakfast",
    days: [] as string[]
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Medication"];

  const addReminder = () => {
    if (!newReminder.petName || !newReminder.time) {
      toast.error("Please fill in pet name and time");
      return;
    }

    const reminder: Reminder = {
      id: Date.now().toString(),
      petName: newReminder.petName,
      time: newReminder.time,
      mealType: newReminder.mealType,
      enabled: true,
      days: newReminder.days.length > 0 ? newReminder.days : daysOfWeek
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      petName: "",
      time: "",
      mealType: "Breakfast",
      days: []
    });
    
    toast.success("Reminder added successfully!");
  };

  const removeReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast.success("Reminder removed");
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const toggleDay = (day: string) => {
    setNewReminder(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const enableAllReminders = () => {
    setReminders(reminders.map(r => ({ ...r, enabled: true })));
    toast.success("All reminders enabled");
  };

  const disableAllReminders = () => {
    setReminders(reminders.map(r => ({ ...r, enabled: false })));
    toast.success("All reminders disabled");
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Feeding Reminders
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={enableAllReminders}>
            Enable All
          </Button>
          <Button variant="outline" size="sm" onClick={disableAllReminders}>
            Disable All
          </Button>
        </div>

        {/* Add New Reminder */}
        <Card className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-4">Add New Reminder</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="petName">Pet Name</Label>
              <Input
                id="petName"
                value={newReminder.petName}
                onChange={(e) => setNewReminder(prev => ({ ...prev, petName: e.target.value }))}
                placeholder="Enter pet name"
              />
            </div>
            
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="mealType">Meal Type</Label>
              <select
                id="mealType"
                value={newReminder.mealType}
                onChange={(e) => setNewReminder(prev => ({ ...prev, mealType: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                {mealTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <Label>Days of Week</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {daysOfWeek.map(day => (
                <Button
                  key={day}
                  variant={newReminder.days.includes(day) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Leave empty to select all days
            </p>
          </div>

          <Button onClick={addReminder} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Reminder
          </Button>
        </Card>

        {/* Existing Reminders */}
        <div className="space-y-3">
          <h3 className="font-semibold">Active Reminders</h3>
          
          {reminders.map(reminder => (
            <Card key={reminder.id} className={`p-4 ${reminder.enabled ? 'border-green-200' : 'border-gray-200 opacity-60'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Switch
                    checked={reminder.enabled}
                    onCheckedChange={() => toggleReminder(reminder.id)}
                  />
                  
                  <Clock className="h-4 w-4 text-gray-500" />
                  
                  <div>
                    <div className="font-medium">
                      {reminder.petName} - {reminder.mealType}
                    </div>
                    <div className="text-sm text-gray-600">
                      {reminder.time} • {reminder.days.join(", ")}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {reminders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reminders set up yet. Add your first reminder above!
          </div>
        )}

        {/* Info Box */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-2">
            <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">About Reminders</h4>
              <p className="text-sm text-blue-700 mt-1">
                Reminders will be shown as browser notifications. Make sure to allow notifications 
                when prompted. For best results, keep this tab open or bookmark the page.
              </p>
            </div>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
}
