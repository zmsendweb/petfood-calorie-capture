
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";

type ReviewStepProps = {
  formData: any;
  photo?: string;
  onBack: () => void;
  onComplete: () => void;
};

export const ReviewStep: React.FC<ReviewStepProps> = ({ 
  formData, 
  photo, 
  onBack, 
  onComplete 
}) => {
  const calculateCalorieTarget = (data: any): number => {
    const baseCalories = data.type === "dog" 
      ? data.weight * (data.weightUnit === "kg" ? 30 : 13.6) 
      : data.weight * (data.weightUnit === "kg" ? 20 : 9.1);
    
    const activityMultiplier = 
      data.activityLevel === "low" ? 1.2 :
      data.activityLevel === "moderate" ? 1.4 : 1.6;
    
    let ageAdjustment = 1.0;
    if (data.ageUnit === "years") {
      if (data.type === "dog") {
        if (data.age < 1) ageAdjustment = 1.6; // puppy
        else if (data.age > 7) ageAdjustment = 0.8; // senior
      } else if (data.type === "cat") {
        if (data.age < 1) ageAdjustment = 1.4; // kitten
        else if (data.age > 10) ageAdjustment = 0.8; // senior
      }
    }
    
    return Math.round(baseCalories * activityMultiplier * ageAdjustment);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review & Save</h2>
      <p className="text-gray-500">Review your pet's profile before saving</p>
      
      <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          {photo && (
            <img 
              src={photo} 
              alt={formData.name} 
              className="w-20 h-20 rounded-full object-cover" 
            />
          )}
          <div>
            <h3 className="text-xl font-bold">{formData.name}</h3>
            <p className="text-gray-500">
              {formData.breed ? `${formData.breed} ` : ""}
              {formData.type === "dog" ? "Dog" : formData.type === "cat" ? "Cat" : "Pet"}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Age</p>
            <p>{formData.age} {formData.ageUnit}</p>
          </div>
          <div>
            <p className="text-gray-500">Weight</p>
            <p>{formData.weight} {formData.weightUnit}</p>
          </div>
          <div>
            <p className="text-gray-500">Gender</p>
            <p className="capitalize">{formData.gender}</p>
          </div>
          <div>
            <p className="text-gray-500">Activity Level</p>
            <p className="capitalize">{formData.activityLevel}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Estimated Daily Calorie Target</p>
            <p className="font-bold">{calculateCalorieTarget(formData)} calories</p>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500">Personality</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {formData.personality.map((trait: string, i: number) => (
              <Badge key={i} variant="outline">{trait}</Badge>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500">Likes & Preferences</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.likesAndPreferences.map((item: string, i: number) => (
                <Badge key={i} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-500">Dislikes & Aversions</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.dislikesAndAversions.map((item: string, i: number) => (
                <Badge key={i} variant="outline">{item}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500">Goals</p>
          <div className="space-y-3 mt-2">
            <div>
              <p className="text-xs text-gray-500">Short-Term</p>
              <ul className="list-disc list-inside text-sm">
                {formData.shortTermGoals.map((goal: string, i: number) => (
                  <li key={i}>{goal}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-500">Long-Term</p>
              <ul className="list-disc list-inside text-sm">
                {formData.longTermGoals.map((goal: string, i: number) => (
                  <li key={i}>{goal}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={onComplete}>
          <Check className="mr-2 h-4 w-4" /> Save Pet Profile
        </Button>
      </div>
    </div>
  );
};
