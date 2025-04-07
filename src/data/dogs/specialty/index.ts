
import { DogStandard } from "../../types/dogTypes";
import { sportingDogs } from "./sportingDogs";
import { workingDogs } from "./workingDogs";

// Using DogStandard as the base type to ensure compatibility with the rest of the app
export const specialtyDogs: DogStandard[] = [
  ...sportingDogs,
  ...workingDogs
];

// Mark all specialty dogs with the isSpecialty flag
specialtyDogs.forEach(dog => {
  (dog as any).isSpecialty = true;
});
