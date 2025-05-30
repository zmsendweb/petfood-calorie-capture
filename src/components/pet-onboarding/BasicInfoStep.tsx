
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight } from "lucide-react";
import { PetImageAnalysis } from "../PetImageAnalysis";
import { PetAnalysis } from "@/hooks/use-pet-image-analysis";
import { PetTypeSelector } from "./PetTypeSelector";
import { AgeWeightFields } from "./AgeWeightFields";
import { ActivityLevelSelector } from "./ActivityLevelSelector";
import { PhotoUploadSection } from "./PhotoUploadSection";

const basicInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["dog", "cat", "other"]),
  breed: z.string().optional(),
  age: z.coerce.number().positive("Age must be positive"),
  ageUnit: z.enum(["years", "months", "weeks"]),
  weight: z.coerce.number().positive("Weight must be positive"),
  weightUnit: z.enum(["kg", "lb"]),
  gender: z.enum(["male", "female", "unknown"]),
  activityLevel: z.enum(["low", "moderate", "high"]),
  notes: z.string().optional(),
});

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

type BasicInfoStepProps = {
  onNext: (data: BasicInfoFormData) => void;
  onCancel?: () => void;
  initialValues?: Partial<BasicInfoFormData>;
  photo?: string;
  onPhotoChange?: (photo?: string) => void;
};

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ 
  onNext, 
  onCancel, 
  initialValues, 
  photo, 
  onPhotoChange 
}) => {
  const form = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: initialValues?.name || "",
      type: (initialValues?.type as "dog" | "cat" | "other") || "dog",
      breed: initialValues?.breed || "",
      age: initialValues?.age || 1,
      ageUnit: initialValues?.ageUnit || "years",
      weight: initialValues?.weight || 10,
      weightUnit: initialValues?.weightUnit || "kg",
      gender: initialValues?.gender || "unknown",
      activityLevel: initialValues?.activityLevel || "moderate",
      notes: initialValues?.notes || "",
    },
  });

  const handleAnalysisComplete = (analysis: PetAnalysis) => {
    // Auto-populate form fields based on AI analysis
    if (analysis.type) form.setValue("type", analysis.type);
    if (analysis.breed) form.setValue("breed", analysis.breed);
    if (analysis.activityLevel) form.setValue("activityLevel", analysis.activityLevel);
    if (analysis.weightUnit) form.setValue("weightUnit", analysis.weightUnit);
    
    // Try to extract numeric age from estimated age string
    const ageMatch = analysis.estimatedAge.match(/(\d+)/);
    if (ageMatch) {
      const estimatedAge = parseInt(ageMatch[1]);
      form.setValue("age", estimatedAge);
      
      // Set age unit based on the age value
      if (estimatedAge < 2) {
        form.setValue("ageUnit", "months");
      } else {
        form.setValue("ageUnit", "years");
      }
    }

    // Add AI insights to notes
    const aiNotes = [
      `AI Analysis: ${analysis.breed} (${analysis.confidence} confidence)`,
      analysis.additionalNotes,
      analysis.nutritionRecommendations
    ].filter(Boolean).join('\n\n');
    
    form.setValue("notes", aiNotes);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Basic Information</h2>
      
      {/* AI Pet Analysis Section */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">AI-Powered Pet Analysis</h3>
        <PetImageAnalysis 
          photo={photo}
          onAnalysisComplete={handleAnalysisComplete}
          onPhotoCapture={onPhotoChange}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your pet's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <PetTypeSelector 
            control={form.control} 
            setValue={form.setValue} 
            currentValue={form.watch("type")} 
          />
          
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breed (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter breed if known" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <AgeWeightFields control={form.control} />
          
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <ActivityLevelSelector control={form.control} />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any additional information about your pet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <PhotoUploadSection photo={photo} onPhotoChange={onPhotoChange} />
          
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
