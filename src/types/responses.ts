import type { Meal } from "@/types/app";

export interface DefaultResponse {
  code: string;
  message: string;
}

export interface ResponseWithData<T> extends DefaultResponse {
  data: T;
}

export type ResponseDirect<T> = T;

export interface ResponseMeals {
  meals: Meal[];
}

export interface ResponseMealsNull {
  meals: Meal[] | null;
}
