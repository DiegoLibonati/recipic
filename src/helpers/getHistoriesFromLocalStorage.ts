import type { HistoryMeal } from "@/types/app";

import { getLocalStorage } from "@/helpers/getLocalStorage";

import { LOCAL_STORAGE_HISTORIES_KEY } from "@/constants/vars";

export const getHistoriesFromLocalStorage = (): HistoryMeal[] => {
  const histories = getLocalStorage(LOCAL_STORAGE_HISTORIES_KEY) as
    | HistoryMeal[]
    | null;

  return histories ?? [];
};
