
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface BreedComparison {
  overallScore: number;
  detailedScores: {
    category: string;
    score: number;
    notes: string;
  }[];
  strengths: string[];
  areasForImprovement: string[];
  judgeNotes: string;
}

export const useShowBreedComparison = () => {
  const [isComparing, setIsComparing] = useState(false);
  const [comparison, setComparison] = useState<BreedComparison | null>(null);

  const compareToShowStandard = async (imageData: string, breed: any): Promise<void> => {
    setIsComparing(true);
    
    try {
      console.log("Starting breed comparison analysis...");
      
      const { data, error } = await supabase.functions.invoke('show-breed-comparison', {
        body: { 
          imageData,
          breedName: breed.name,
          showStandards: breed.showStandards,
          expectedTraits: {
            size: breed.size,
            temperament: breed.temperament,
            origin: breed.origin
          }
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.comparison) {
        throw new Error('No comparison data received');
      }

      console.log("Comparison completed:", data.comparison);
      setComparison(data.comparison);
      
      toast.success("Breed comparison completed!", {
        description: `Your pet scored ${data.comparison.overallScore}% conformity to ${breed.name} standards`
      });

    } catch (error: any) {
      console.error('Error comparing to show standards:', error);
      toast.error("Comparison failed", {
        description: error.message || "Failed to compare to show standards"
      });
    } finally {
      setIsComparing(false);
    }
  };

  return {
    compareToShowStandard,
    isComparing,
    comparison
  };
};
