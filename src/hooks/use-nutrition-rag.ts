
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
    if (!query.trim()) {
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`[nutrition-rag] Sending nutrition query: "${query}" for pet type: ${petType || 'both'}`);
      
      const { data, error } = await supabase.functions.invoke('pet-nutrition-rag', {
        body: { query, petType }
      });

      if (error) {
        console.error("[nutrition-rag] Supabase function error:", error);
        console.error("[nutrition-rag] Error details:", {
          message: error.message,
          status: error.status,
          name: error.name
        });
        throw new Error(error.message || 'Error contacting nutrition service');
      }

      if (!data) {
        console.error("[nutrition-rag] No data returned from function");
        throw new Error('No data returned from nutrition service');
      }

      console.log("[nutrition-rag] Nutrition RAG response:", data);
      
      if (data.error && !data.answer) {
        console.error("[nutrition-rag] Error in response:", data.error);
        throw new Error(data.error || 'Error processing nutrition information');
      }
      
      setResult(data as RAGResponse);
      return data as RAGResponse;
    } catch (err) {
      console.error("[nutrition-rag] Error in getAnswer:", err);
      console.error("[nutrition-rag] Error details:", {
        message: err instanceof Error ? err.message : 'Unknown error',
        name: err instanceof Error ? err.name : 'Unknown',
        stack: err instanceof Error ? err.stack : undefined
      });
      
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
