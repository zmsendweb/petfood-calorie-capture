import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useUserPreferences } from "./use-user-preferences";
import { toast } from "sonner";

export interface PetGoal {
  id?: string;
  pet_id: string;
  goal_text: string;
  is_short_term: boolean;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export const usePetGoals = (petId: string) => {
  const { user } = useAuth();
  const { preferences } = useUserPreferences();
  const [goals, setGoals] = useState<PetGoal[]>([]);
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
    const completedGoals = localStorage.getItem(`pet-completed-goals-${petId}`);
    const completed = completedGoals ? JSON.parse(completedGoals) : [];
    
    // Convert localStorage format to goal format (this is for backwards compatibility)
    const localGoals: PetGoal[] = completed.map((goalText: string) => ({
      pet_id: petId,
      goal_text: goalText,
      is_short_term: true, // We don't have this info in localStorage
      is_completed: true
    }));
    
    setGoals(localGoals);
    setLoading(false);
  };

  const loadFromSupabase = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pet_goals')
        .select('*')
        .eq('pet_id', petId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setGoals(data || []);
    } catch (error: any) {
      console.error('Error loading goals:', error);
      toast.error("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goalText: string, isShortTerm: boolean) => {
    if (preferences.use_local_storage || !user) {
      // For localStorage, we'll keep the old format for now
      const completed = localStorage.getItem(`pet-completed-goals-${petId}`);
      const completedGoals = completed ? JSON.parse(completed) : [];
      completedGoals.push(goalText);
      localStorage.setItem(`pet-completed-goals-${petId}`, JSON.stringify(completedGoals));
      loadFromLocalStorage();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('pet_goals')
        .insert({
          user_id: user.id,
          pet_id: petId,
          goal_text: goalText,
          is_short_term: isShortTerm,
          is_completed: false
        })
        .select()
        .single();

      if (error) throw error;

      setGoals(prev => [data, ...prev]);
      toast.success("Goal added successfully");
    } catch (error: any) {
      console.error('Error adding goal:', error);
      toast.error("Failed to add goal");
    }
  };

  const markGoalComplete = async (goalId: string | undefined, goalText?: string) => {
    if (preferences.use_local_storage || !user) {
      if (goalText) {
        const completed = localStorage.getItem(`pet-completed-goals-${petId}`);
        const completedGoals = completed ? JSON.parse(completed) : [];
        if (!completedGoals.includes(goalText)) {
          completedGoals.push(goalText);
          localStorage.setItem(`pet-completed-goals-${petId}`, JSON.stringify(completedGoals));
          loadFromLocalStorage();
        }
      }
      return;
    }

    if (!goalId) return;

    try {
      const { error } = await supabase
        .from('pet_goals')
        .update({ is_completed: true })
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;

      setGoals(prev => prev.map(goal => 
        goal.id === goalId ? { ...goal, is_completed: true } : goal
      ));
      toast.success("Goal marked as complete");
    } catch (error: any) {
      console.error('Error marking goal complete:', error);
      toast.error("Failed to update goal");
    }
  };

  const getCompletedGoals = () => {
    return goals.filter(goal => goal.is_completed).map(goal => goal.goal_text);
  };

  return {
    goals,
    loading,
    addGoal,
    markGoalComplete,
    getCompletedGoals
  };
};
