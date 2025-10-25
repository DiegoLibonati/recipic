import { GetMealResponse } from "@src/entities/responses";

import { apiMeals } from "@src/api/meals";

export const getMeal = async (): Promise<GetMealResponse> => {
  try {
    const request = await apiMeals.get(`/random.php`);

    const data: GetMealResponse = await request.data;

    return data;
  } catch (error) {
    console.error("Error fetching Meal:", error);
    throw error;
  }
};
