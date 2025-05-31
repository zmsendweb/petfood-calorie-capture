
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { PetProfile } from "@/data/types/petTypes";
import { PetAnalysis } from "@/hooks/use-pet-image-analysis";
import { PetFormTabs } from "./pet-onboarding/PetFormTabs";

interface PetProfileFormProps {
  onSave: (petProfile: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
  initialValues?: Partial<PetProfile>;
  isEditing?: boolean;
}

export const PetProfileForm = ({ onSave, initialValues = {}, isEditing = false }: PetProfileFormProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Omit<PetProfile, "id" | "createdAt" | "updatedAt">);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Pet Profile" : "Create Pet Profile"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <PetFormTabs
            formData={formData}
            showCamera={showCamera}
            onFormDataChange={handleFormDataChange}
            onShowCameraToggle={() => setShowCamera(!showCamera)}
            onCapture={handleCapture}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {isEditing ? "Update" : "Save"} Pet Profile
        </Button>
      </CardFooter>
    </Card>
  );
};
