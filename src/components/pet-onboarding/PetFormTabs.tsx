
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PetImageAnalysis } from "../PetImageAnalysis";
import { BasicInfoTab } from "./BasicInfoTab";
import { PetProfile } from "@/data/types/petTypes";
import { PetAnalysis } from "@/hooks/use-pet-image-analysis";

interface PetFormTabsProps {
  formData: Partial<PetProfile>;
  showCamera: boolean;
  onFormDataChange: (updates: Partial<PetProfile>) => void;
  onShowCameraToggle: () => void;
  onCapture: (photoDataUrl: string) => void;
  onAnalysisComplete: (analysis: PetAnalysis) => void;
}

export const PetFormTabs: React.FC<PetFormTabsProps> = ({
  formData,
  showCamera,
  onFormDataChange,
  onShowCameraToggle,
  onCapture,
  onAnalysisComplete
}) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="analysis" className="space-y-4">
        <PetImageAnalysis 
          photo={formData.photo}
          onAnalysisComplete={onAnalysisComplete}
          onPhotoCapture={(photo) => onFormDataChange({ photo })}
        />
      </TabsContent>
      
      <TabsContent value="basic" className="space-y-6">
        <BasicInfoTab
          formData={formData}
          showCamera={showCamera}
          onFormDataChange={onFormDataChange}
          onShowCameraToggle={onShowCameraToggle}
          onCapture={onCapture}
        />
      </TabsContent>
    </Tabs>
  );
};
