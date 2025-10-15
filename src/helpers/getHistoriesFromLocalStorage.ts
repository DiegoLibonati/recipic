import { HistoryMeal } from "@src/entities/app";

import { getLocalStorage } from "@src/helpers/getLocalStorage";

import { LOCAL_STORAGE_HISTORIES_KEY } from "@src/constants/vars";

export const getHistoriesFromLocalStorage = (): HistoryMeal[] => {
  const histories = getLocalStorage<HistoryMeal[]>(LOCAL_STORAGE_HISTORIES_KEY);

  return histories ? histories : [];
};
