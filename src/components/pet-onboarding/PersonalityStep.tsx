
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TagInput } from "./TagInput";

const personalitySchema = z.object({
  personality: z.array(z.string()).min(1, "Select at least one trait"),
  temperament: z.enum(["calm", "balanced", "energetic"]),
  likesAndPreferences: z.array(z.string()).min(1, "Add at least one preference"),
  dislikesAndAversions: z.array(z.string()).min(1, "Add at least one aversion"),
  healthConditions: z.array(z.string()).optional(),
});

export type PersonalityFormData = z.infer<typeof personalitySchema>;

type PersonalityStepProps = {
  onNext: (data: PersonalityFormData) => void;
  onBack: () => void;
  initialValues?: Partial<PersonalityFormData>;
  petType: "dog" | "cat" | "other";
};

export const PersonalityStep: React.FC<PersonalityStepProps> = ({ 
  onNext, 
  onBack, 
  initialValues,
  petType 
}) => {
  const form = useForm<PersonalityFormData>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      personality: initialValues?.personality || [],
      temperament: initialValues?.temperament || "balanced",
      likesAndPreferences: initialValues?.likesAndPreferences || [],
      dislikesAndAversions: initialValues?.dislikesAndAversions || [],
      healthConditions: initialValues?.healthConditions || [],
    },
  });

  const getTraitOptions = () => {
    switch (petType) {
      case "dog": return ["Playful", "Loyal", "Energetic", "Affectionate", "Protective", "Calm", "Curious", "Independent", "Social", "Stubborn"];
      case "cat": return ["Independent", "Curious", "Playful", "Affectionate", "Aloof", "Vocal", "Gentle", "Mischievous", "Lazy", "Alert"];
      default: return ["Quiet", "Active", "Friendly", "Shy", "Curious", "Playful", "Independent", "Social", "Territorial"];
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personality & Preferences</h2>
      <p className="text-gray-500">Tell us about your pet's personality, likes, and dislikes</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
          <FormField
            control={form.control}
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
                          form.setValue("personality", newValue);
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
            control={form.control}
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
            control={form.control}
            name="likesAndPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Likes & Preferences</FormLabel>
                <FormControl>
                  <TagInput 
                    value={field.value} 
                    onChange={(value) => form.setValue("likesAndPreferences", value)}
                    placeholder="What does your pet enjoy? (e.g., specific foods, toys, activities)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dislikesAndAversions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dislikes & Aversions</FormLabel>
                <FormControl>
                  <TagInput 
                    value={field.value} 
                    onChange={(value) => form.setValue("dislikesAndAversions", value)}
                    placeholder="What does your pet dislike? (e.g., loud noises, nail trimming)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="healthConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health Conditions (Optional)</FormLabel>
                <FormControl>
                  <TagInput 
                    value={field.value || []} 
                    onChange={(value) => form.setValue("healthConditions", value)}
                    placeholder="Any health conditions or allergies? (e.g., joint issues, food allergies)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
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
};
