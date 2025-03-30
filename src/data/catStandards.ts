
import { CatStandard } from "./types/catTypes";
import { largeCats } from "./cats/largeCats";
import { mediumCats } from "./cats/medium";
import { smallCats } from "./cats/smallCats";
import { exoticCats } from "./cats/exotic";
import { rareCats } from "./cats/rare";

export type { CatStandard };

export const catStandards: CatStandard[] = [
  ...largeCats,
  ...mediumCats,
  ...smallCats,
  ...exoticCats,
  ...rareCats
];
