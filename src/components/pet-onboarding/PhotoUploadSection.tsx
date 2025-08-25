
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

type PhotoUploadSectionProps = {
  photo?: string;
  onPhotoChange?: (photo?: string) => void;
  onShowCameraToggle?: () => void;
};

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  photo, 
  onPhotoChange,
  onShowCameraToggle 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onPhotoChange) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onPhotoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
      {photo ? (
        <div className="space-y-2">
          <img 
            src={photo} 
            alt="Pet" 
            className="w-32 h-32 object-cover mx-auto rounded-full" 
          />
          <div className="flex gap-2 justify-center flex-wrap">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={onShowCameraToggle}
              className="flex items-center gap-1"
            >
              <Camera className="h-3 w-3" />
              Take Photo
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={triggerFileUpload}
              className="flex items-center gap-1"
            >
              <Upload className="h-3 w-3" />
              Upload Photo
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => onPhotoChange?.(undefined)}
            >
              Remove Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Camera className="w-12 h-12 mx-auto text-gray-400" />
          <p className="text-sm text-gray-500">Add a photo of your pet</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button 
              type="button" 
              variant="outline"
              onClick={onShowCameraToggle}
              className="flex items-center gap-2"
            >
              <Camera className="h-4 w-4" />
              Take Photo
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={triggerFileUpload}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Photo
            </Button>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
