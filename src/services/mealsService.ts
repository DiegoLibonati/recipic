import axios from "axios";

import type { Meal } from "@/types/app";

import { apiMeals } from "@/services/axios";

export const mealsService = {
  getMeal: async (): Promise<Meal[]> => {
    try {
      const request = await apiMeals.get<{ meals: Meal[] }>(`/random.php`);
      return request.data.meals;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          `HTTP error! status: ${e.response?.status} - ${e.message}`
        );
      }
      throw e;
    }
  },

  getMealByName: async (nameMeal: string): Promise<Meal[] | null> => {
    try {
      const request = await apiMeals.get<{ meals: Meal[] | null }>(
        `/search.php?s=${nameMeal}`
      );
      return request.data.meals;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(
          `HTTP error! status: ${e.response?.status} - ${e.message}`
        );
      }
      throw e;
    }
  },
};
