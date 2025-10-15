import { Meal } from "@src/entities/app";

import { apiMeals } from "@src/api/meals";

export const getMealByName = async (nameMeal: string): Promise<Meal> => {
  try {
    const request = await apiMeals.get(`/search.php?s=${nameMeal}`);

    if (!request.data.meals) return request.data.meals;

    return request.data.meals[0];
  } catch (error) {
    console.error("Error fetching Meal by name:", error);
    throw error;
  }
};
