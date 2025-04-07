
import { DogStandard } from "./types/dogTypes";
import { smallDogs } from "./dogs/small/index";
import { mediumDogs } from "./dogs/medium/index";
import { largeDogs } from "./dogs/large/index";
import { specialtyDogs } from "./dogs/specialty/index";
import { rareDogs } from "./dogs/rare/index";

export type { DogStandard };

// Combine all dog standards
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
