
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
import { specialtyDogs } from "./dogs/specialty";
import { rareDogs } from "./dogs/rare";

export const dogStandards: DogStandard[] = [
  ...smallDogs,
  ...mediumDogs,
  ...largeDogs,
  ...specialtyDogs,
  ...rareDogs
];

// For convenience when querying the library by size
export const smallDogBreeds = smallDogs;
export const mediumDogBreeds = mediumDogs;
export const largeDogBreeds = largeDogs;
export const specialtyDogBreeds = specialtyDogs;
export const rareDogBreeds = rareDogs;

// Utility function to get total count
export const getDogBreedCount = () => {
  return {
    small: smallDogs.length,
    medium: mediumDogs.length,
    large: largeDogs.length,
    specialty: specialtyDogs.length,
    rare: rareDogs.length,
    total: dogStandards.length
  };
};
