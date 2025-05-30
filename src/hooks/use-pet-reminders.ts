
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useUserPreferences } from "./use-user-preferences";
import { toast } from "sonner";

export interface PetReminder {
  id?: string;
  pet_id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export const usePetReminders = (petId: string) => {
  const { user } = useAuth();
  const { preferences } = useUserPreferences();
  const [reminders, setReminders] = useState<PetReminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (petId) {
      if (preferences.use_local_storage || !user) {
        loadFromLocalStorage();
      } else {
        loadFromSupabase();
      }
    }
  }, [petId, user, preferences.use_local_storage]);

  const loadFromLocalStorage = () => {
    const savedReminders = localStorage.getItem(`pet-reminders-${petId}`);
    const localReminders = savedReminders ? JSON.parse(savedReminders) : [];
    
    // Convert date strings back to Date objects
    const remindersWithDates = localReminders.map((reminder: any) => ({
      ...reminder,
      date: new Date(reminder.date)
    }));
    
    setReminders(remindersWithDates);
    setLoading(false);
  };

  const loadFromSupabase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pet_reminders')
        .select('*')
        .eq('pet_id', petId)
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      const remindersWithDates = (data || []).map(reminder => ({
        ...reminder,
        date: new Date(reminder.date)
      }));

      setReminders(remindersWithDates);
    } catch (error: any) {
      console.error('Error loading reminders:', error);
      toast.error("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  const addReminder = async (reminder: Omit<PetReminder, 'id' | 'created_at' | 'updated_at'>) => {
    if (preferences.use_local_storage || !user) {
      const newReminder = {
        ...reminder,
        id: Date.now().toString()
      };
      
      const savedReminders = localStorage.getItem(`pet-reminders-${petId}`);
      const existingReminders = savedReminders ? JSON.parse(savedReminders) : [];
      const updatedReminders = [...existingReminders, newReminder];
      
      localStorage.setItem(`pet-reminders-${petId}`, JSON.stringify(updatedReminders));
      loadFromLocalStorage();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('pet_reminders')
        .insert({
          user_id: user.id,
          pet_id: reminder.pet_id,
          title: reminder.title,
          description: reminder.description,
          date: reminder.date.toISOString(),
          completed: reminder.completed
        })
        .select()
        .single();

      if (error) throw error;

      const reminderWithDate = {
        ...data,
        date: new Date(data.date)
      };

      setReminders(prev => [...prev, reminderWithDate]);
      toast.success("Reminder added successfully");
    } catch (error: any) {
      console.error('Error adding reminder:', error);
      toast.error("Failed to add reminder");
    }
  };

  const updateReminder = async (reminderId: string, updates: Partial<PetReminder>) => {
    if (preferences.use_local_storage || !user) {
      const savedReminders = localStorage.getItem(`pet-reminders-${petId}`);
      const existingReminders = savedReminders ? JSON.parse(savedReminders) : [];
      const updatedReminders = existingReminders.map((reminder: any) =>
        reminder.id === reminderId ? { ...reminder, ...updates } : reminder
      );
      
      localStorage.setItem(`pet-reminders-${petId}`, JSON.stringify(updatedReminders));
      loadFromLocalStorage();
      return;
    }

    try {
      const updateData: any = { ...updates };
      if (updateData.date) {
        updateData.date = updateData.date.toISOString();
      }

      const { error } = await supabase
        .from('pet_reminders')
        .update(updateData)
        .eq('id', reminderId)
        .eq('user_id', user.id);

      if (error) throw error;

      setReminders(prev => prev.map(reminder =>
        reminder.id === reminderId ? { ...reminder, ...updates } : reminder
      ));
      toast.success("Reminder updated");
    } catch (error: any) {
      console.error('Error updating reminder:', error);
      toast.error("Failed to update reminder");
    }
  };

  return {
    reminders,
    loading,
    addReminder,
    updateReminder
  };
};
