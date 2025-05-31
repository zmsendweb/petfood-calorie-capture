
import { useState } from "react";
import { PetProfile } from "@/data/types/petTypes";
import { PetAnalysis } from "@/hooks/use-pet-image-analysis";

interface UsePetProfileFormProps {
  initialValues?: Partial<PetProfile>;
  onSave: (petProfile: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
}

export const usePetProfileForm = ({ initialValues = {}, onSave }: UsePetProfileFormProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [formData, setFormData] = useState<Partial<PetProfile>>({
    name: "",
    type: "dog",
    breed: "",
    age: 1,
    ageUnit: "years",
    weight: 10,
    weightUnit: "kg",
    gender: "unknown",
    activityLevel: "moderate",
    photo: "",
    notes: "",
    ...initialValues
  });

  const handleFormDataChange = (updates: Partial<PetProfile>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleCapture = (photoDataUrl: string) => {
    setFormData(prev => ({ ...prev, photo: photoDataUrl }));
    setShowCamera(false);
  };

  const handleAnalysisComplete = (analysis: PetAnalysis) => {
    // Auto-populate form fields based on AI analysis
    setFormData(prev => ({
      ...prev,
      type: analysis.type,
      breed: analysis.breed,
      activityLevel: analysis.activityLevel,
      weightUnit: analysis.weightUnit,
      temperament: analysis.temperament,
      personality: analysis.personalityTraits,
      healthConditions: analysis.healthIndicators,
      notes: [
        prev.notes,
        `AI Analysis: ${analysis.breed} (${analysis.confidence} confidence)`,
        analysis.additionalNotes,
        analysis.nutritionRecommendations
      ].filter(Boolean).join('\n\n')
    }));

    // Try to extract numeric age
    const ageMatch = analysis.estimatedAge.match(/(\d+)/);
    if (ageMatch) {
      const estimatedAge = parseInt(ageMatch[1]);
      setFormData(prev => ({
        ...prev,
        age: estimatedAge,
        ageUnit: estimatedAge < 2 ? "months" : "years"
      }));
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSave(formData as Omit<PetProfile, "id" | "createdAt" | "updatedAt">);
  };

  const toggleCamera = () => setShowCamera(!showCamera);

  return {
    formData,
    showCamera,
    handleFormDataChange,
    handleCapture,
    handleAnalysisComplete,
    handleSubmit,
    toggleCamera
  };
};
