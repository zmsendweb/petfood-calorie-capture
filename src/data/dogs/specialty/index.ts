
import { DogStandard } from "../../dogStandards";
import { sportingDogs } from "./sportingDogs";
import { workingDogs } from "./workingDogs";

export const specialtyDogs: DogStandard[] = [
  ...sportingDogs,
  ...workingDogs
];
