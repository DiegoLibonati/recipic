import type { HistoryMeal, Meal } from "@/types/app";

export interface MealState extends Record<string, unknown> {
  currentMeal: Meal | null;
  historiesMeal: HistoryMeal[];
  historyMeal: Meal | null;
}
