
import React from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dog, Cat } from "lucide-react";
import { Control } from "react-hook-form";
import { BasicInfoFormData } from "./BasicInfoStep";

type PetTypeSelectorProps = {
  control: Control<BasicInfoFormData>;
  setValue: (name: keyof BasicInfoFormData, value: any) => void;
  currentValue: "dog" | "cat" | "other";
};

export const PetTypeSelector: React.FC<PetTypeSelectorProps> = ({ 
  control, 
  setValue, 
  currentValue 
}) => {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pet Type</FormLabel>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={field.value === "dog" ? "default" : "outline"}
              className="flex-1 py-6"
              onClick={() => setValue("type", "dog")}
            >
              <Dog className="mr-2 h-5 w-5" />
              Dog
            </Button>
            <Button
              type="button"
              variant={field.value === "cat" ? "default" : "outline"}
              className="flex-1 py-6"
              onClick={() => setValue("type", "cat")}
            >
              <Cat className="mr-2 h-5 w-5" />
              Cat
            </Button>
            <Button
              type="button"
              variant={field.value === "other" ? "default" : "outline"}
              className="flex-1 py-6"
              onClick={() => setValue("type", "other")}
            >
              Other
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
