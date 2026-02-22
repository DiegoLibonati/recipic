import type { Meal } from "@/types/app";

import { mockMealsSearchByName, mockMeals } from "@tests/__mocks__/meals.mock";

export const mockMeal: Meal = mockMeals.meals[0]!;
export const mockMealByName: Meal = mockMealsSearchByName.meals[0]!;
