
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PetFormTabs } from "../pet-onboarding/PetFormTabs";
import { usePetProfileForm } from "@/hooks/use-pet-profile-form";
import { PetProfile } from "@/data/types/petTypes";

interface PetProfileFormContainerProps {
  onSave: (petProfile: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
  initialValues?: Partial<PetProfile>;
  isEditing?: boolean;
}

export const PetProfileFormContainer: React.FC<PetProfileFormContainerProps> = ({ 
  onSave, 
  initialValues = {}, 
  isEditing = false 
}) => {
  const {
    formData,
    showCamera,
    handleFormDataChange,
    handleCapture,
    handleAnalysisComplete,
    handleSubmit,
    toggleCamera
  } = usePetProfileForm({ initialValues, onSave });

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
            onShowCameraToggle={toggleCamera}
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
