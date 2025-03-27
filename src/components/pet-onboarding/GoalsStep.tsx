
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TagInput } from "./TagInput";

const goalsSchema = z.object({
  shortTermGoals: z.array(z.string()).min(1, "Add at least one short-term goal"),
  longTermGoals: z.array(z.string()).min(1, "Add at least one long-term goal"),
  progressNotes: z.string().optional(),
});

export type GoalsFormData = z.infer<typeof goalsSchema>;

type GoalsStepProps = {
  onNext: (data: GoalsFormData) => void;
  onBack: () => void;
  initialValues?: Partial<GoalsFormData>;
};

export const GoalsStep: React.FC<GoalsStepProps> = ({ onNext, onBack, initialValues }) => {
  const form = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      shortTermGoals: initialValues?.shortTermGoals || [],
      longTermGoals: initialValues?.longTermGoals || [],
      progressNotes: initialValues?.progressNotes || "",
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Goals & Aspirations</h2>
      <p className="text-gray-500">Set meaningful goals for your pet's health and wellbeing</p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
          <FormField
            control={form.control}
            name="shortTermGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short-Term Goals (1-3 months)</FormLabel>
                <FormControl>
                  <TagInput 
                    value={field.value} 
                    onChange={(value) => form.setValue("shortTermGoals", value)}
                    placeholder="Add a short-term goal (e.g., basic training, improve diet)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="longTermGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long-Term Goals (6+ months)</FormLabel>
                <FormControl>
                  <TagInput 
                    value={field.value} 
                    onChange={(value) => form.setValue("longTermGoals", value)}
                    placeholder="Add a long-term goal (e.g., reach ideal weight, master advanced commands)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
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
