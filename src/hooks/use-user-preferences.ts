
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface UserPreferences {
  id?: string;
  use_local_storage: boolean;
}

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({ use_local_storage: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPreferences(data);
      } else {
        // Create default preferences for new user
        const { data: newPrefs, error: insertError } = await supabase
          .from('user_preferences')
          .insert({ user_id: user.id, use_local_storage: false })
          .select()
          .single();

        if (insertError) throw insertError;
        setPreferences(newPrefs);
      }
    } catch (error: any) {
      console.error('Error fetching preferences:', error);
      toast.error("Failed to load preferences");
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      toast.success("Preferences updated");
    } catch (error: any) {
      console.error('Error updating preferences:', error);
      toast.error("Failed to update preferences");
    }
  };

  return {
    preferences,
    updatePreferences,
    loading
  };
};
