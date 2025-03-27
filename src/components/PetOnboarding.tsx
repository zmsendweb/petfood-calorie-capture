
import React, { useState } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { Progress } from "@/components/ui/progress";
import { BasicInfoStep, BasicInfoFormData } from "./pet-onboarding/BasicInfoStep";
import { PersonalityStep, PersonalityFormData } from "./pet-onboarding/PersonalityStep";
import { GoalsStep, GoalsFormData } from "./pet-onboarding/GoalsStep";
import { ReviewStep } from "./pet-onboarding/ReviewStep";

export type PetOnboardingProps = {
  onComplete: (pet: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
  initialValues?: Partial<PetProfile>;
};

export const PetOnboarding: React.FC<PetOnboardingProps> = ({ 
  onComplete, 
  onCancel, 
  initialValues 
}) => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | undefined>(initialValues?.photo);
  const [formData, setFormData] = useState<any>({
    personality: initialValues?.personality || [],
    likesAndPreferences: initialValues?.likesAndPreferences || [],
    dislikesAndAversions: initialValues?.dislikesAndAversions || [],
    healthConditions: initialValues?.healthConditions || [],
    shortTermGoals: initialValues?.shortTermGoals || [],
    longTermGoals: initialValues?.longTermGoals || [],
    type: initialValues?.type || "dog",
  });
  const totalSteps = 4;

  const handleBasicInfoSubmit = (data: BasicInfoFormData) => {
    setFormData({ ...formData, ...data, photo });
    setStep(2);
  };

  const handlePersonalitySubmit = (data: PersonalityFormData) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const handleGoalsSubmit = (data: GoalsFormData) => {
    setFormData({ ...formData, ...data });
    setStep(4);
  };

  const handleFinalSubmit = () => {
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

    const petData: Omit<PetProfile, "id" | "createdAt" | "updatedAt"> = {
      ...formData,
      photo,
      dailyCalorieTarget: calculateCalorieTarget(formData),
      preferredFoods: formData.likesAndPreferences || [],
      dietaryRestrictions: formData.healthConditions?.filter((condition: string) => 
        condition.toLowerCase().includes("allergy") || 
        condition.toLowerCase().includes("intolerance")
      ) || [],
    };
    onComplete(petData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoStep 
            onNext={handleBasicInfoSubmit}
            onCancel={onCancel}
            initialValues={initialValues}
            photo={photo}
            onPhotoChange={setPhoto}
          />
        );
      case 2:
        return (
          <PersonalityStep 
            onNext={handlePersonalitySubmit}
            onBack={() => setStep(1)}
            initialValues={initialValues}
            petType={(formData.type as "dog" | "cat" | "other")}
          />
        );
      case 3:
        return (
          <GoalsStep 
            onNext={handleGoalsSubmit}
            onBack={() => setStep(2)}
            initialValues={initialValues}
          />
        );
      case 4:
        return (
          <ReviewStep 
            formData={formData}
            photo={photo}
            onBack={() => setStep(3)}
            onComplete={handleFinalSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-sm">
      <div className="mb-6">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Basic Info</span>
          <span>Personality</span>
          <span>Goals</span>
          <span>Review</span>
        </div>
      </div>
      
      {renderStep()}
    </div>
  );
};
