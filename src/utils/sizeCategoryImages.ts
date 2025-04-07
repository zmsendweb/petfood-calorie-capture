/**
 * Utility for size-based styling and labeling of pet breeds
 */

import { PawPrint } from "lucide-react";

// Define the allowed size categories
export type PetSize = "Small" | "Medium" | "Large" | "Exotic" | "Rare" | "Specialty";

export interface SizeCategory {
  color: string;
  bgColor: string;
  label: string;
}

// Size-based styling information for both cats and dogs
export const sizeCategoryStyles: Record<string, SizeCategory> = {
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
  },
  "Exotic": {
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    label: "Exotic"
  },
  "Rare": {
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    label: "Rare"
  }
};

export const getSizeCategoryStyle = (size: string): SizeCategory => {
  // Check if the provided size is a valid category
  if (size in sizeCategoryStyles) {
    return sizeCategoryStyles[size];
  }
  
  // Fallback to avoid "undefined" errors
  return {
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    label: size
  };
};
