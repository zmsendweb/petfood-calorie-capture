
import { DogStandard } from "../../types/dogTypes";
import { workingMediumDogs } from "./workingMediumDogs";
import { companionMediumDogs } from "./companionMediumDogs";
import { specialBreeds } from "./specialBreeds";
import { specialtyMediumDogs } from "./specialtyMediumDogs";
import { activeMediumDogs } from "./activeMediumDogs";

export const mediumDogs: DogStandard[] = [
  ...workingMediumDogs,
  ...companionMediumDogs,
  ...specialBreeds,
  ...specialtyMediumDogs,
  ...activeMediumDogs
];
