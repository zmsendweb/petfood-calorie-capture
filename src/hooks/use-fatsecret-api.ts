
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface FoodItem {
  food_id: string;
  food_name: string;
  food_description?: string;
  food_type?: string;
  brand_name?: string;
  food_url?: string;
  servings?: {
    serving: Array<{
      serving_id: string;
      serving_description: string;
      serving_url?: string;
      metric_serving_amount?: number;
      metric_serving_unit?: string;
      calories: number;
    }> | {
      serving_id: string;
      serving_description: string;
      serving_url?: string;
      metric_serving_amount?: number;
      metric_serving_unit?: string;
      calories: number;
    }
  };
}

export interface SearchResult {
  foods?: {
    food?: FoodItem[] | FoodItem;
    max_results?: number;
    total_results?: number;
    page_number?: number;
  };
  error_message?: string;
}

export interface BarcodeResult {
  food_id?: string;
  error?: {
    code: string;
    message: string;
  };
}

export interface FoodDetailsResult {
  food?: FoodItem;
  error_message?: string;
}

export interface NLPResult {
  food?: {
    food_name: string;
    food_quantity: number;
    food_unit: string;
    food_type?: string;
    servings?: {
      serving: Array<{
        serving_description: string;
        calories: number;
      }> | {
        serving_description: string;
        calories: number;
      }
    };
  };
  error_message?: string;
}

interface SearchOptions {
  region?: string;
  maxResults?: number;
}

export function useFatSecretAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic function to call the FatSecret API edge function
  const callAPI = async <T>(endpoint: string, data: any): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: responseData, error } = await supabase.functions.invoke(`fatsecret-api/${endpoint}`, {
        body: data
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Check for API-level errors that might be contained in the response
      if (responseData && typeof responseData === 'object' && 'error' in responseData) {
        console.error("FatSecret API error:", responseData.error);
        throw new Error(responseData.error.message || 'FatSecret API error');
      }
      
      return responseData as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to call FatSecret API';
      setError(errorMessage);
      console.error("FatSecret API call failed:", errorMessage);
      
      toast.error("API Error", {
        description: errorMessage
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Search for foods by name
  const searchFoods = async (query: string, options?: SearchOptions): Promise<SearchResult | null> => {
    if (!query.trim()) {
      toast.error("Invalid search", {
        description: "Please enter a search term"
      });
      return null;
    }
    
    return callAPI<SearchResult>('search', { 
      query,
      region: options?.region,
      maxResults: options?.maxResults || 20
    });
  };

  // Get food details by barcode
  const scanBarcode = async (barcode: string): Promise<BarcodeResult | null> => {
    if (!barcode.trim()) {
      toast.error("Invalid barcode", {
        description: "Please enter a barcode number"
      });
      return null;
    }
    
    return callAPI<BarcodeResult>('barcode', { barcode });
  };

  // Get detailed food information by ID
  const getFoodDetails = async (foodId: string): Promise<FoodDetailsResult | null> => {
    if (!foodId.trim()) {
      toast.error("Invalid food", {
        description: "Food ID is required"
      });
      return null;
    }
    
    return callAPI<FoodDetailsResult>('food', { query: foodId });
  };

  // Parse food description using natural language processing
  const parseFoodDescription = async (description: string, region?: string): Promise<NLPResult | null> => {
    if (!description.trim()) {
      toast.error("Invalid description", {
        description: "Please enter a food description"
      });
      return null;
    }
    
    return callAPI<NLPResult>('nlp', { 
      query: description,
      region 
    });
  };

  return {
    searchFoods,
    scanBarcode,
    getFoodDetails,
    parseFoodDescription,
    isLoading,
    error
  };
}
