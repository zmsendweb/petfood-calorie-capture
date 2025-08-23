import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritional_benefits: string;
  serving_size: string;
  storage: string;
}

interface RecipeResponse {
  success: boolean;
  recipes: Recipe[];
  petType: "dog" | "cat";
  breed: string;
}

interface GenerateRecipesOptions {
  petType: "dog" | "cat";
  breed: string;
  ingredients?: string[];
  dietaryNeeds?: string;
}

export function useRecipeGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecipes = async (options: GenerateRecipesOptions): Promise<RecipeResponse | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('recipe-generator', {
        body: options
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data && data.success) {
        toast.success("Recipes generated successfully!", {
          description: `Generated ${data.recipes.length} recipes for your ${data.breed}`
        });
        return data as RecipeResponse;
      } else {
        throw new Error(data?.error || 'Failed to generate recipes');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate recipes';
      setError(errorMessage);
      console.error("Recipe generation error:", errorMessage);
      
      toast.error("Recipe Generation Error", {
        description: errorMessage
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateRecipes,
    isLoading,
    error
  };
}