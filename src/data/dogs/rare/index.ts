
import { DogStandard } from "../../types/dogTypes";
import { rareHoundDogs } from "./rareHoundDogs";
import { rareHerdingDogs } from "./rareHerdingDogs";
import { rareWorkingDogs } from "./rareWorkingDogs";
import { rareSportingDogs } from "./rareSportingDogs";

export const rareDogs: DogStandard[] = [
  ...rareHoundDogs,
  ...rareHerdingDogs,
  ...rareWorkingDogs,
  ...rareSportingDogs
];

// Mark all rare dogs with isRare flag
rareDogs.forEach(dog => {
  dog.isRare = true;
});
