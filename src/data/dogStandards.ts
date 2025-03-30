
export interface DogStandard {
  breed: string;
  size: string;
  dailyCalories: {
    min: number;
    max: number;
  };
  ageSpecificCalories: {
    puppy: { min: number; max: number };
    adult: { min: number; max: number };
    senior: { min: number; max: number };
  };
  mealsPerDay: {
    puppy: number;
    adult: number;
    senior: number;
  };
  notes: string;
  nutritionNotes: {
    puppy: string;
    adult: string;
    senior: string;
  };
  imageUrl: string;
}

import { smallDogs } from "./dogs/small";
import { mediumDogs } from "./dogs/medium";
import { largeDogs } from "./dogs/large";

export const dogStandards: DogStandard[] = [
  ...smallDogs,
  ...mediumDogs,
  ...largeDogs
];

// For convenience when querying the library by size
export const smallDogBreeds = smallDogs;
export const mediumDogBreeds = mediumDogs;
export const largeDogBreeds = largeDogs;

// Utility function to get total count
export const getDogBreedCount = () => {
  return {
    small: smallDogs.length,
    medium: mediumDogs.length,
    large: largeDogs.length,
    total: dogStandards.length
  };
};
