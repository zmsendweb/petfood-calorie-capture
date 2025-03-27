
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dog, Cat, Heart, Zap, Brain, ArrowRight, ArrowLeft, Camera, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PetProfile } from "@/data/types/petTypes";
import { Badge } from "@/components/ui/badge";

// Define the form schema for the basic information step
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

// Define schema for personality traits
const personalitySchema = z.object({
  personality: z.array(z.string()).min(1, "Select at least one trait"),
  temperament: z.enum(["calm", "balanced", "energetic"]),
  likesAndPreferences: z.array(z.string()).min(1, "Add at least one preference"),
  dislikesAndAversions: z.array(z.string()).min(1, "Add at least one aversion"),
  healthConditions: z.array(z.string()).optional(),
});

// Define schema for goals
const goalsSchema = z.object({
  shortTermGoals: z.array(z.string()).min(1, "Add at least one short-term goal"),
  longTermGoals: z.array(z.string()).min(1, "Add at least one long-term goal"),
  progressNotes: z.string().optional(),
});

// Combined schema
const petProfileSchema = z.object({
  ...basicInfoSchema.shape,
  ...personalitySchema.shape,
  ...goalsSchema.shape,
  photo: z.string().optional(),
});

type PetOnboardingProps = {
  onSave: (pet: Omit<PetProfile, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
};

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

// Component for adding tags/multiple items
const TagInput: React.FC<TagInputProps> = ({ value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder || "Add new item..."}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button type="button" onClick={handleAddTag}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1">
            {tag}
            <button
              type="button"
              className="ml-2 text-xs opacity-70 hover:opacity-100"
              onClick={() => handleRemoveTag(tag)}
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const PetOnboarding: React.FC<PetOnboardingProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [photo, setPhoto] = useState<string | undefined>();
  const [formData, setFormData] = useState<any>({
    personality: [],
    likesAndPreferences: [],
    dislikesAndAversions: [],
    healthConditions: [],
    shortTermGoals: [],
    longTermGoals: [],
  });
  const totalSteps = 4;

  // Basic info form
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
      type: "dog",
      age: 1,
      ageUnit: "years",
      weight: 10,
      weightUnit: "kg",
      gender: "unknown",
      activityLevel: "moderate",
    },
  });

  // Personality form
  const personalityForm = useForm<z.infer<typeof personalitySchema>>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      personality: [],
      temperament: "balanced",
      likesAndPreferences: [],
      dislikesAndAversions: [],
      healthConditions: [],
    },
  });

  // Goals form
  const goalsForm = useForm<z.infer<typeof goalsSchema>>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      shortTermGoals: [],
      longTermGoals: [],
      progressNotes: "",
    },
  });

  const handlePhotoCapture = (photoData: string) => {
    setPhoto(photoData);
  };

  const handleBasicInfoSubmit = (data: z.infer<typeof basicInfoSchema>) => {
    setFormData({ ...formData, ...data, photo });
    setStep(2);
  };

  const handlePersonalitySubmit = (data: z.infer<typeof personalitySchema>) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const handleGoalsSubmit = (data: z.infer<typeof goalsSchema>) => {
    setFormData({ ...formData, ...data });
    setStep(4);
  };

  const handleFinalSubmit = () => {
    const petData: Omit<PetProfile, "id" | "createdAt" | "updatedAt"> = {
      ...formData,
      photo,
      dailyCalorieTarget: calculateCalorieTarget(formData),
      preferredFoods: formData.likesAndPreferences || [],
      dietaryRestrictions: formData.healthConditions?.filter((condition: string) => 
        condition.toLowerCase().includes("allergy") || 
        condition.toLowerCase().includes("intolerance")
      ) || [],
    };
    onSave(petData);
  };

  const calculateCalorieTarget = (data: any): number => {
    // Basic calculation based on weight and activity level
    // Could be refined with more sophisticated formulas
    const baseCalories = data.type === "dog" 
      ? data.weight * (data.weightUnit === "kg" ? 30 : 13.6) 
      : data.weight * (data.weightUnit === "kg" ? 20 : 9.1);
    
    const activityMultiplier = 
      data.activityLevel === "low" ? 1.2 :
      data.activityLevel === "moderate" ? 1.4 : 1.6;
    
    // Age adjustment
    let ageAdjustment = 1.0;
    if (data.ageUnit === "years") {
      if (data.type === "dog") {
        if (data.age < 1) ageAdjustment = 1.6; // puppy
        else if (data.age > 7) ageAdjustment = 0.8; // senior
      } else if (data.type === "cat") {
        if (data.age < 1) ageAdjustment = 1.4; // kitten
        else if (data.age > 10) ageAdjustment = 0.8; // senior
      }
    }
    
    return Math.round(baseCalories * activityMultiplier * ageAdjustment);
  };

  // Predefined traits for pets
  const dogTraits = ["Playful", "Loyal", "Energetic", "Affectionate", "Protective", "Calm", "Curious", "Independent", "Social", "Stubborn"];
  const catTraits = ["Independent", "Curious", "Playful", "Affectionate", "Aloof", "Vocal", "Gentle", "Mischievous", "Lazy", "Alert"];
  const otherPetTraits = ["Quiet", "Active", "Friendly", "Shy", "Curious", "Playful", "Independent", "Social", "Territorial"];

  const getTraitOptions = () => {
    switch (formData.type) {
      case "dog": return dogTraits;
      case "cat": return catTraits;
      default: return otherPetTraits;
    }
  };

  // Render different steps based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <Form {...basicInfoForm}>
              <form onSubmit={basicInfoForm.handleSubmit(handleBasicInfoSubmit)} className="space-y-4">
                <FormField
                  control={basicInfoForm.control}
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
                  control={basicInfoForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Type</FormLabel>
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant={field.value === "dog" ? "default" : "outline"}
                          className="flex-1 py-6"
                          onClick={() => basicInfoForm.setValue("type", "dog")}
                        >
                          <Dog className="mr-2 h-5 w-5" />
                          Dog
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "cat" ? "default" : "outline"}
                          className="flex-1 py-6"
                          onClick={() => basicInfoForm.setValue("type", "cat")}
                        >
                          <Cat className="mr-2 h-5 w-5" />
                          Cat
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === "other" ? "default" : "outline"}
                          className="flex-1 py-6"
                          onClick={() => basicInfoForm.setValue("type", "other")}
                        >
                          Other
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                  control={basicInfoForm.control}
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
                  control={basicInfoForm.control}
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
                  control={basicInfoForm.control}
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
                      <Button type="button" variant="outline" onClick={() => setPhoto(undefined)}>
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
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personality & Preferences</h2>
            <p className="text-gray-500">Tell us about your pet's personality, likes, and dislikes</p>
            
            <Form {...personalityForm}>
              <form onSubmit={personalityForm.handleSubmit(handlePersonalitySubmit)} className="space-y-4">
                <FormField
                  control={personalityForm.control}
                  name="personality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personality Traits</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {getTraitOptions().map((trait) => (
                            <Badge 
                              key={trait}
                              variant={field.value.includes(trait) ? "default" : "outline"}
                              className="px-3 py-2 cursor-pointer"
                              onClick={() => {
                                const newValue = field.value.includes(trait)
                                  ? field.value.filter(t => t !== trait)
                                  : [...field.value, trait];
                                personalityForm.setValue("personality", newValue);
                              }}
                            >
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={personalityForm.control}
                  name="temperament"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overall Temperament</FormLabel>
                      <FormControl>
                        <RadioGroup 
                          defaultValue={field.value} 
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="calm" id="temperament-calm" />
                            <FormLabel htmlFor="temperament-calm" className="cursor-pointer">Calm - Relaxed, mild-mannered</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="balanced" id="temperament-balanced" />
                            <FormLabel htmlFor="temperament-balanced" className="cursor-pointer">Balanced - Mix of energy and calmness</FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="energetic" id="temperament-energetic" />
                            <FormLabel htmlFor="temperament-energetic" className="cursor-pointer">Energetic - High energy, very active</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={personalityForm.control}
                  name="likesAndPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Likes & Preferences</FormLabel>
                      <FormControl>
                        <TagInput 
                          value={field.value} 
                          onChange={(value) => personalityForm.setValue("likesAndPreferences", value)}
                          placeholder="What does your pet enjoy? (e.g., specific foods, toys, activities)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={personalityForm.control}
                  name="dislikesAndAversions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dislikes & Aversions</FormLabel>
                      <FormControl>
                        <TagInput 
                          value={field.value} 
                          onChange={(value) => personalityForm.setValue("dislikesAndAversions", value)}
                          placeholder="What does your pet dislike? (e.g., loud noises, nail trimming)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={personalityForm.control}
                  name="healthConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Health Conditions (Optional)</FormLabel>
                      <FormControl>
                        <TagInput 
                          value={field.value || []} 
                          onChange={(value) => personalityForm.setValue("healthConditions", value)}
                          placeholder="Any health conditions or allergies? (e.g., joint issues, food allergies)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Goals & Aspirations</h2>
            <p className="text-gray-500">Set meaningful goals for your pet's health and wellbeing</p>
            
            <Form {...goalsForm}>
              <form onSubmit={goalsForm.handleSubmit(handleGoalsSubmit)} className="space-y-4">
                <FormField
                  control={goalsForm.control}
                  name="shortTermGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short-Term Goals (1-3 months)</FormLabel>
                      <FormControl>
                        <TagInput 
                          value={field.value} 
                          onChange={(value) => goalsForm.setValue("shortTermGoals", value)}
                          placeholder="Add a short-term goal (e.g., basic training, improve diet)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={goalsForm.control}
                  name="longTermGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long-Term Goals (6+ months)</FormLabel>
                      <FormControl>
                        <TagInput 
                          value={field.value} 
                          onChange={(value) => goalsForm.setValue("longTermGoals", value)}
                          placeholder="Add a long-term goal (e.g., reach ideal weight, master advanced commands)"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={goalsForm.control}
                  name="progressNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Progress Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Notes on current progress or starting point" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review & Save</h2>
            <p className="text-gray-500">Review your pet's profile before saving</p>
            
            <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                {photo && (
                  <img 
                    src={photo} 
                    alt={formData.name} 
                    className="w-20 h-20 rounded-full object-cover" 
                  />
                )}
                <div>
                  <h3 className="text-xl font-bold">{formData.name}</h3>
                  <p className="text-gray-500">
                    {formData.breed ? `${formData.breed} ` : ""}
                    {formData.type === "dog" ? "Dog" : formData.type === "cat" ? "Cat" : "Pet"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Age</p>
                  <p>{formData.age} {formData.ageUnit}</p>
                </div>
                <div>
                  <p className="text-gray-500">Weight</p>
                  <p>{formData.weight} {formData.weightUnit}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p className="capitalize">{formData.gender}</p>
                </div>
                <div>
                  <p className="text-gray-500">Activity Level</p>
                  <p className="capitalize">{formData.activityLevel}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Estimated Daily Calorie Target</p>
                  <p className="font-bold">{calculateCalorieTarget(formData)} calories</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500">Personality</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.personality.map((trait: string, i: number) => (
                    <Badge key={i} variant="outline">{trait}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Likes & Preferences</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.likesAndPreferences.map((item: string, i: number) => (
                      <Badge key={i} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Dislikes & Aversions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.dislikesAndAversions.map((item: string, i: number) => (
                      <Badge key={i} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-500">Goals</p>
                <div className="space-y-3 mt-2">
                  <div>
                    <p className="text-xs text-gray-500">Short-Term</p>
                    <ul className="list-disc list-inside text-sm">
                      {formData.shortTermGoals.map((goal: string, i: number) => (
                        <li key={i}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Long-Term</p>
                    <ul className="list-disc list-inside text-sm">
                      {formData.longTermGoals.map((goal: string, i: number) => (
                        <li key={i}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleFinalSubmit}>
                <Check className="mr-2 h-4 w-4" /> Save Pet Profile
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-sm">
      <div className="mb-6">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Basic Info</span>
          <span>Personality</span>
          <span>Goals</span>
          <span>Review</span>
        </div>
      </div>
      
      {renderStep()}
    </div>
  );
};
