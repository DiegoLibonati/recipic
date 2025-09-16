import { Meal } from "@src/entities/vite-env";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_MEALS_KEY } from "@src/constants/constants";

export const getMealsFromLocalStorage = (): Meal[] => {
  const meals = getLocalStorage<Meal[]>(LOCAL_STORAGE_MEALS_KEY);

  return meals ? meals : [];
};
