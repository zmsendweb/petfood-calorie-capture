
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PetAnalysis {
  type: "dog" | "cat" | "other";
  breed: string;
  estimatedAge: string;
  weight: string;
  weightUnit: "kg" | "lb";
  activityLevel: "low" | "moderate" | "high";
  temperament: "calm" | "balanced" | "energetic";
  healthIndicators: string[];
  personalityTraits: string[];
  nutritionRecommendations: string;
  confidence: string;
  additionalNotes: string;
}

export const usePetImageAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePetImage = async (imageData: string): Promise<PetAnalysis | null> => {
    setIsAnalyzing(true);
    
    try {
      console.log("Starting pet image analysis...");
      
      const { data, error } = await supabase.functions.invoke('pet-image-analysis', {
        body: { imageData }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.analysis) {
        throw new Error('No analysis data received');
      }

      console.log("Analysis completed:", data.analysis);
      
      toast.success("Pet analysis completed!", {
        description: `Detected ${data.analysis.breed} with ${data.analysis.confidence} confidence`
      });

      return data.analysis;
    } catch (error: any) {
      console.error('Error analyzing pet image:', error);
      toast.error("Analysis failed", {
        description: error.message || "Failed to analyze pet image"
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzePetImage,
    isAnalyzing
  };
};
