
import { PetProfileFormContainer } from "./pet-profile/PetProfileFormContainer";
import { PetProfile } from "@/data/types/petTypes";

interface PetProfileFormProps {
  onSave: (petProfile: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
  initialValues?: Partial<PetProfile>;
  isEditing?: boolean;
}

export const PetProfileForm = ({ onSave, initialValues = {}, isEditing = false }: PetProfileFormProps) => {
  return (
    <PetProfileFormContainer 
      onSave={onSave} 
      initialValues={initialValues} 
      isEditing={isEditing} 
    />
  );
};
