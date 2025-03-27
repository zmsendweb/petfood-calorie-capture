
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dog, Cat, Camera, ArrowRight } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Basic Information</h2>
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
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet Type</FormLabel>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={field.value === "dog" ? "default" : "outline"}
                    className="flex-1 py-6"
                    onClick={() => form.setValue("type", "dog")}
                  >
                    <Dog className="mr-2 h-5 w-5" />
                    Dog
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "cat" ? "default" : "outline"}
                    className="flex-1 py-6"
                    onClick={() => form.setValue("type", "cat")}
                  >
                    <Cat className="mr-2 h-5 w-5" />
                    Cat
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "other" ? "default" : "outline"}
                    className="flex-1 py-6"
                    onClick={() => form.setValue("type", "other")}
                  >
                    Other
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
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
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ageUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="years">Years</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="lb">Pounds (lb)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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
          
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <FormControl>
                  <RadioGroup 
                    defaultValue={field.value} 
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="activity-low" />
                      <FormLabel htmlFor="activity-low" className="cursor-pointer">Low - Mostly inactive or sedentary</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="activity-moderate" />
                      <FormLabel htmlFor="activity-moderate" className="cursor-pointer">Moderate - Regular walks, some play</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="activity-high" />
                      <FormLabel htmlFor="activity-high" className="cursor-pointer">High - Very active, lots of exercise</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
