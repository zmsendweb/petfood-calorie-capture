
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { BasicInfoFormData } from "./BasicInfoStep";

type ActivityLevelSelectorProps = {
  control: Control<BasicInfoFormData>;
};

export const ActivityLevelSelector: React.FC<ActivityLevelSelectorProps> = ({ control }) => {
  return (
    <FormField
      control={control}
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
  );
};
