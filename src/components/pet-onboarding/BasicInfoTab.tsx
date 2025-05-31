
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { CameraComponent } from "../Camera";
import { PetProfile } from "@/data/types/petTypes";

interface BasicInfoTabProps {
  formData: Partial<PetProfile>;
  showCamera: boolean;
  onFormDataChange: (updates: Partial<PetProfile>) => void;
  onShowCameraToggle: () => void;
  onCapture: (photoDataUrl: string) => void;
}

export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  showCamera,
  onFormDataChange,
  onShowCameraToggle,
  onCapture
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onFormDataChange({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onFormDataChange({ [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormDataChange({ [name]: parseFloat(value) || 0 });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="name">Pet Name</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name || ""} 
          onChange={handleChange} 
          required 
          placeholder="Enter your pet's name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="type">Pet Type</Label>
          <Select 
            value={formData.type || "dog"} 
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="breed">Breed</Label>
          <Input 
            id="breed" 
            name="breed" 
            value={formData.breed || ""} 
            onChange={handleChange} 
            placeholder="Enter breed"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <div className="flex gap-2">
            <Input 
              id="age" 
              name="age" 
              type="number" 
              value={formData.age || 1} 
              onChange={handleNumberChange} 
              min={0} 
              step={0.1} 
              required 
              className="flex-1"
            />
            <Select 
              value={formData.ageUnit || "years"} 
              onValueChange={(value) => handleSelectChange("ageUnit", value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="weight">Weight</Label>
          <div className="flex gap-2">
            <Input 
              id="weight" 
              name="weight" 
              type="number" 
              value={formData.weight || 10} 
              onChange={handleNumberChange} 
              min={0} 
              step={0.1} 
              required 
              className="flex-1"
            />
            <Select 
              value={formData.weightUnit || "kg"} 
              onValueChange={(value) => handleSelectChange("weightUnit", value)}
            >
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="lb">lb</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={formData.gender || "unknown"} 
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="activityLevel">Activity Level</Label>
          <Select 
            value={formData.activityLevel || "moderate"} 
            onValueChange={(value) => handleSelectChange("activityLevel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label>Pet Photo</Label>
        {showCamera ? (
          <CameraComponent onCapture={onCapture} />
        ) : (
          <div className="flex flex-col items-center gap-4">
            {formData.photo && (
              <div className="w-full h-48 relative rounded-lg overflow-hidden border">
                <img 
                  src={formData.photo} 
                  alt="Pet" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <Button 
              type="button" 
              variant="outline" 
              onClick={onShowCameraToggle}
            >
              {formData.photo ? "Change Photo" : "Take Photo"}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="notes">Notes</Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={formData.notes || ""} 
          onChange={handleChange} 
          placeholder="Any special notes about your pet"
          rows={3}
        />
      </div>
    </div>
  );
};
