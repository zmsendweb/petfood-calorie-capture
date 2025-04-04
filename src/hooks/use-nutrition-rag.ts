
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
      console.log(`Sending nutrition query: "${query}" for pet type: ${petType || 'both'}`);
      
      const { data, error } = await supabase.functions.invoke('pet-nutrition-rag', {
        body: { query, petType }
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || 'Error contacting nutrition service');
      }

      if (!data) {
        throw new Error('No data returned from nutrition service');
      }

      // Even if the API returns an error object, we should still have an answer property
      // due to our fallback mechanism in the edge function
      console.log("Nutrition RAG response:", data);
      
      if (data.error && !data.answer) {
        throw new Error(data.error || 'Error processing nutrition information');
      }
      
      setResult(data as RAGResponse);
      return data as RAGResponse;
    } catch (err) {
      console.error("Nutrition RAG error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to get nutrition information';
      setError(errorMessage);
      toast.error("Error", {
        description: errorMessage,
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
