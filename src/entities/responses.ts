import { Meal } from "@src/entities/app";

export type GetMealResponse = { meals: Meal[] };

export type getMealByNameResponse = { meals: Meal[] | null };
