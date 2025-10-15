import { HistoryMeal, Meal } from "@src/entities/app";

export type MealState = {
  currentMeal: Meal | null;
  historiesMeal: HistoryMeal[];
  historyMeal: Meal | null;
};
