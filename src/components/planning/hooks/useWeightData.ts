
import { useMemo } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { format, addWeeks } from "date-fns";

interface WeightDataPoint {
  date: string;
  projected: number;
  actual: number | null;
  week: string;
}

interface UseWeightDataResult {
  weightData: WeightDataPoint[];
  isWeightLoss: boolean;
  progressPercentage: number;
}

export const useWeightData = (
  pet: PetProfile, 
  timeRange: "4weeks" | "8weeks" | "12weeks"
): UseWeightDataResult => {
  // Determine if weight loss or gain is the goal based on the pet's goals
  const isWeightLoss = useMemo(() => {
    const weightGoals = [...(pet.shortTermGoals || []), ...(pet.longTermGoals || [])]
      .filter(goal => 
        goal.toLowerCase().includes("weight") || 
        goal.toLowerCase().includes("lose") || 
        goal.toLowerCase().includes("gain")
      );
      
    return !weightGoals.some(goal => 
      goal.toLowerCase().includes("gain")
    );
  }, [pet.shortTermGoals, pet.longTermGoals]);
  
  // Generate projected weight data
  const weightData = useMemo(() => {
    const startDate = new Date();
    const startWeight = pet.weight;
    const targetWeight = isWeightLoss ? startWeight * 0.85 : startWeight * 1.15; // Target is 15% loss or gain
    
    // Get number of weeks from timeRange
    const weeks = parseInt(timeRange.replace("weeks", ""));
    
    // Generate data points for each week
    return Array.from({ length: weeks + 1 }).map((_, index) => {
      const date = addWeeks(startDate, index);
      
      // Non-linear progress formula
      // For a sigmoid-like curve that's steeper in the middle weeks
      let progressPercentage;
      
      if (index === 0) {
        progressPercentage = 0; // Start at 0%
      } else if (index === weeks) {
        progressPercentage = 1; // End at 100%
      } else {
        // Sigmoid-like function mapped to 0-1 range
        const x = (index / weeks) * 6 - 3; // Map to range -3 to 3 for sigmoid
        progressPercentage = 1 / (1 + Math.exp(-x));
      }
      
      const weightDifference = targetWeight - startWeight;
      const currentWeight = startWeight + (weightDifference * progressPercentage);
      
      // Add some randomness to actual weight to simulate real-world variance
      // But only for past dates (for "actual" weight tracking)
      const isPastDate = date < new Date();
      const randomVariance = isPastDate ? (Math.random() * 0.04 - 0.02) : 0; // ±2%
      const actualWeight = isPastDate ? 
        startWeight + (weightDifference * progressPercentage * 0.8 * (1 + randomVariance)) : 
        null;
      
      return {
        date: format(date, 'MMM dd'),
        projected: parseFloat(currentWeight.toFixed(1)),
        actual: actualWeight ? parseFloat(actualWeight.toFixed(1)) : null,
        week: `Week ${index}`
      };
    });
  }, [pet.weight, isWeightLoss, timeRange]);
  
  // Calculate current progress percentage
  const progressPercentage = useMemo(() => {
    const actualWeights = weightData.filter(d => d.actual !== null);
    if (actualWeights.length === 0) return 0;
    
    const latestActualWeight = actualWeights[actualWeights.length - 1].actual;
    const startWeight = pet.weight;
    const targetWeight = isWeightLoss ? startWeight * 0.85 : startWeight * 1.15;
    
    const totalChange = Math.abs(targetWeight - startWeight);
    const currentChange = Math.abs(latestActualWeight! - startWeight);
    
    return Math.min(Math.round((currentChange / totalChange) * 100), 100);
  }, [weightData, pet.weight, isWeightLoss]);
  
  return {
    weightData,
    isWeightLoss,
    progressPercentage
  };
};
