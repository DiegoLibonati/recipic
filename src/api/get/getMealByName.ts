import { getMealByNameResponse } from "@src/entities/responses";

import { apiMeals } from "@src/api/meals";

export const getMealByName = async (
  nameMeal: string
): Promise<getMealByNameResponse> => {
  try {
    const request = await apiMeals.get(`/search.php?s=${nameMeal}`);

    const data = await request.data;

    return data;
  } catch (error) {
    console.error("Error fetching Meal by name:", error);
    throw error;
  }
};
