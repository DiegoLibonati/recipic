import mealService from "@/services/mealService";

import { apiMeals } from "@/services/axios";

import { mockMeals, mockMealsSearchByName } from "@tests/__mocks__/meals.mock";

const mockApiMealsGet = apiMeals.get as jest.MockedFunction<
  typeof apiMeals.get
>;

jest.mock("@/services/axios");

const mockAxiosError = (status: number, message: string): Error =>
  Object.assign(new Error(message), {
    isAxiosError: true,
    response: { status },
  });

describe("mealService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMeal", () => {
    describe("success", () => {
      it("should return an array of meals", async () => {
        mockApiMealsGet.mockResolvedValue({ data: mockMeals });
        const result = await mealService.getMeal();
        expect(result).toEqual(mockMeals.meals);
      });

      it("should call the /random.php endpoint", async () => {
        mockApiMealsGet.mockResolvedValue({ data: mockMeals });
        await mealService.getMeal();
        expect(mockApiMealsGet).toHaveBeenCalledWith("/random.php");
      });
    });

    describe("error handling", () => {
      it("should throw an error with HTTP status when an axios error occurs", async () => {
        mockApiMealsGet.mockRejectedValue(
          mockAxiosError(500, "Internal Server Error")
        );
        await expect(mealService.getMeal()).rejects.toThrow("HTTP error!");
      });

      it("should include the response status in the error message", async () => {
        mockApiMealsGet.mockRejectedValue(
          mockAxiosError(503, "Service Unavailable")
        );
        await expect(mealService.getMeal()).rejects.toThrow("503");
      });

      it("should rethrow non-axios errors as-is", async () => {
        mockApiMealsGet.mockRejectedValue(new Error("Unknown error"));
        await expect(mealService.getMeal()).rejects.toThrow("Unknown error");
      });
    });
  });

  describe("getMealByName", () => {
    describe("success", () => {
      it("should return an array of meals when found", async () => {
        mockApiMealsGet.mockResolvedValue({ data: mockMealsSearchByName });
        const result = await mealService.getMealByName("Mandazi");
        expect(result).toEqual(mockMealsSearchByName.meals);
      });

      it("should call the /search.php endpoint with the meal name", async () => {
        mockApiMealsGet.mockResolvedValue({ data: mockMealsSearchByName });
        await mealService.getMealByName("Mandazi");
        expect(mockApiMealsGet).toHaveBeenCalledWith("/search.php?s=Mandazi");
      });

      it("should return null when no meals match the search", async () => {
        mockApiMealsGet.mockResolvedValue({ data: { meals: null } });
        const result = await mealService.getMealByName("nonexistent");
        expect(result).toBeNull();
      });
    });

    describe("error handling", () => {
      it("should throw an error with HTTP status when an axios error occurs", async () => {
        mockApiMealsGet.mockRejectedValue(mockAxiosError(404, "Not Found"));
        await expect(mealService.getMealByName("test")).rejects.toThrow(
          "HTTP error!"
        );
      });

      it("should include the response status in the error message", async () => {
        mockApiMealsGet.mockRejectedValue(mockAxiosError(404, "Not Found"));
        await expect(mealService.getMealByName("test")).rejects.toThrow("404");
      });

      it("should rethrow non-axios errors as-is", async () => {
        mockApiMealsGet.mockRejectedValue(new Error("Network failure"));
        await expect(mealService.getMealByName("test")).rejects.toThrow(
          "Network failure"
        );
      });
    });
  });
});
