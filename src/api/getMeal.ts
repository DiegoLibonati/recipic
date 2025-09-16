import axios from "axios";

import { Meal } from "@src/entities/vite-env";

export const getMeal = async (): Promise<Meal> => {
  const request = await axios.get("/api/json/v1/1/random.php");

  const meal: Meal = request.data.meals[0];

  return meal;
};
