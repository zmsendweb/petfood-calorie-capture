
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

type PhotoUploadSectionProps = {
  photo?: string;
  onPhotoChange?: (photo?: string) => void;
};

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  photo, 
  onPhotoChange 
}) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
      {photo ? (
        <div className="space-y-2">
          <img 
            src={photo} 
            alt="Pet" 
            className="w-32 h-32 object-cover mx-auto rounded-full" 
          />
          <Button type="button" variant="outline" onClick={() => onPhotoChange?.(undefined)}>
            Change Photo
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <Camera className="w-12 h-12 mx-auto text-gray-400" />
          <p className="text-sm text-gray-500">Add a photo of your pet</p>
          <Button type="button" variant="outline">
            Take Photo
          </Button>
        </div>
      )}
    </div>
  );
};
