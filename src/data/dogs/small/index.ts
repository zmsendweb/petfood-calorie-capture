
import { DogStandard } from "../../types/dogTypes";
import { toyDogs } from "./toyDogs";
import { smallCompanionDogs } from "./smallCompanionDogs";
import { smallActiveDogs } from "./smallActiveDogs";
import { terrierSmallDogs } from "./terrierSmallDogs";

export const smallDogs: DogStandard[] = [
  ...toyDogs,
  ...smallCompanionDogs,
  ...smallActiveDogs,
  ...terrierSmallDogs
];
