
import { DogStandard } from "../../types/dogTypes";
import { workingLargeDogs } from "./workingLargeDogs";
import { companionLargeDogs } from "./companionLargeDogs";
import { guardLargeDogs } from "./guardLargeDogs";
import { sportingLargeDogs } from "./sportingLargeDogs";

export const largeDogs: DogStandard[] = [
  ...workingLargeDogs,
  ...companionLargeDogs,
  ...guardLargeDogs,
  ...sportingLargeDogs
];
