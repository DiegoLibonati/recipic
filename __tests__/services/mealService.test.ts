import { http, HttpResponse } from "msw";

import mealService from "@/services/mealService";

import { mockMeals, mockMealsSearchByName } from "@tests/__mocks__/meals.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

describe("mealService", () => {
  describe("getMeal", () => {
    describe("success", () => {
      it("should return an array of meals", async () => {
        const result = await mealService.getMeal();

        expect(result).toEqual(mockMeals.meals);
      });
    });

    describe("error handling", () => {
      it("should throw an error with HTTP status when the server responds 500", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/random.php", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(mealService.getMeal()).rejects.toThrow("HTTP error!");
      });

      it("should include the response status in the error message", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/random.php", () => {
            return new HttpResponse(null, { status: 503 });
          })
        );

        await expect(mealService.getMeal()).rejects.toThrow("503");
      });

      it("should throw on network failure", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/random.php", () => {
            return HttpResponse.error();
          })
        );

        await expect(mealService.getMeal()).rejects.toThrow();
      });
    });
  });

  describe("getMealByName", () => {
    describe("success", () => {
      it("should return an array of meals when found", async () => {
        const result = await mealService.getMealByName("Mandazi");

        expect(result).toEqual(mockMealsSearchByName.meals);
      });

      it("should return null when no meals match the search", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return HttpResponse.json({ meals: null });
          })
        );

        const result = await mealService.getMealByName("nonexistent");

        expect(result).toBeNull();
      });

      it("should pass the name as a query parameter", async () => {
        let capturedSearch: string | null = null;

        mockMswServer.use(
          http.get(
            "http://localhost/api/json/v1/1/search.php",
            ({ request }) => {
              capturedSearch = new URL(request.url).searchParams.get("s");
              return HttpResponse.json(mockMealsSearchByName);
            }
          )
        );

        await mealService.getMealByName("Mandazi");

        expect(capturedSearch).toBe("Mandazi");
      });
    });

    describe("error handling", () => {
      it("should throw an error with HTTP status when the server responds 404", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(mealService.getMealByName("test")).rejects.toThrow(
          "HTTP error!"
        );
      });

      it("should include the response status in the error message", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(mealService.getMealByName("test")).rejects.toThrow("404");
      });

      it("should throw on network failure", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return HttpResponse.error();
          })
        );

        await expect(mealService.getMealByName("test")).rejects.toThrow();
      });
    });
  });
});
