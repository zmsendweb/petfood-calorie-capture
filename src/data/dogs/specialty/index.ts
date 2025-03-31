
import { DogStandard } from "../../types/dogTypes";
import { sportingDogs } from "./sportingDogs";
import { workingDogs } from "./workingDogs";

export const specialtyDogs: DogStandard[] = [
  ...sportingDogs,
  ...workingDogs
];
