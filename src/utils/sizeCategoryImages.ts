
/**
 * Utility for size-based styling and labeling of pet breeds
 */

import { PawPrint } from "lucide-react";

// Define the allowed size categories
export type PetSize = "Small" | "Medium" | "Large";

export interface SizeCategory {
  color: string;
  bgColor: string;
  label: string;
}

// Size-based styling information for both cats and dogs
export const sizeCategoryStyles: Record<PetSize, SizeCategory> = {
  "Small": {
    color: "text-green-600",
    bgColor: "bg-green-100",
    label: "Small"
  },
  "Medium": {
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    label: "Medium"
  },
  "Large": {
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    label: "Large"
  }
};

export const getSizeCategoryStyle = (size: string): SizeCategory => {
  // Check if the provided size is a valid PetSize
  if (size in sizeCategoryStyles) {
    return sizeCategoryStyles[size as PetSize];
  }
  
  // Fallback to avoid "undefined" errors
  return {
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    label: size
  };
};
