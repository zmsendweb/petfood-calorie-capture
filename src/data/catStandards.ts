
import { CatStandard } from "./types/catTypes";
import { largeCats } from "./cats/largeCats";
import { mediumCats } from "./cats/medium";
import { smallCats } from "./cats/smallCats";

export type { CatStandard };

export const catStandards: CatStandard[] = [
  ...largeCats,
  ...mediumCats,
  ...smallCats
];
