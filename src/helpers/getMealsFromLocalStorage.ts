import { Meal } from "../entities/vite-env";

import { getLocalStorage } from "./getLocalStorage";

import { LOCAL_STORAGE_MEALS_KEY } from "../constants/constants";

export const getMealsFromLocalStorage = (): Meal[] => {
  const meals = getLocalStorage<Meal[]>(LOCAL_STORAGE_MEALS_KEY);

  return meals ? meals : [];
};
