import { http, HttpResponse } from "msw";

import { mockMeals, mockMealsSearchByName } from "@tests/__mocks__/meals.mock";

export const mockMswHandlers = [
  http.get("http://localhost/api/json/v1/1/random.php", () => {
    return HttpResponse.json(mockMeals);
  }),
  http.get("http://localhost/api/json/v1/1/search.php", () => {
    return HttpResponse.json(mockMealsSearchByName);
  }),
];
