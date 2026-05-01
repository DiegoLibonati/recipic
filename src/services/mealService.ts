import axios from "axios";

import type { Meal } from "@/types/app";
import type {
  ResponseDirect,
  ResponseMeals,
  ResponseMealsNull,
} from "@/types/responses";

import { apiMeals } from "@/services/axios";

const mealService = {
  getMeal: async (): Promise<ResponseDirect<Meal[]>> => {
    try {
      const request = await apiMeals.get<ResponseMeals>(`/random.php`);
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

  getMealByName: async (
    nameMeal: string
  ): Promise<ResponseDirect<ResponseMealsNull["meals"]>> => {
    try {
      const request = await apiMeals.get<ResponseMealsNull>(
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

export default mealService;
