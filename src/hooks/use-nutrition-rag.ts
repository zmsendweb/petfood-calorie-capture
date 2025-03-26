
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { RAGResponse } from "@/data/types/ragTypes";

export type PetType = "dog" | "cat" | null;

export function useNutritionRAG() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RAGResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAnswer = async (query: string, petType: PetType = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke('pet-nutrition-rag', {
        body: { query, petType }
      });

      if (error) {
        throw new Error(error.message);
      }

      setResult(data as RAGResponse);
      return data as RAGResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get nutrition information';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAnswer,
    isLoading,
    result,
    error,
  };
}
