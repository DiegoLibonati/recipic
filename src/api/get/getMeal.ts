import { Meal } from "@src/entities/app";

import { apiMeals } from "@src/api/meals";

export const getMeal = async (): Promise<Meal> => {
  try {
    const request = await apiMeals.get(`/random.php`);

    const meal: Meal = request.data.meals[0];

    return meal;
  } catch (error) {
    console.error("Error fetching Meal:", error);
    throw error;
  }
};
