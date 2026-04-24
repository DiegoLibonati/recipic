import { isAxiosError } from "axios";

import mealService from "@/services/mealService";
import { apiMeals } from "@/services/axios";

import { mockMeals, mockMealsSearchByName } from "@tests/__mocks__/meals.mock";

const mockApiGet = jest.mocked(apiMeals.get);
const mockIsAxiosError = jest.mocked(isAxiosError);

jest.mock("axios", () => ({
  ...(jest.requireActual("axios") as unknown as object),
  isAxiosError: jest.fn(),
}));

jest.mock("@/services/axios", () => ({
  apiMeals: {
    get: jest.fn(),
  },
}));

const mockAxiosSuccess = (data: unknown): void => {
  mockApiGet.mockResolvedValue({ data });
};

const mockAxiosError = (status: number | undefined, message: string): void => {
  mockApiGet.mockRejectedValue({
    response: status !== undefined ? { status } : undefined,
    message,
  });
  mockIsAxiosError.mockReturnValue(true);
};

const mockAxiosNetworkError = (message = "Network error"): void => {
  mockApiGet.mockRejectedValue(new Error(message));
  mockIsAxiosError.mockReturnValue(false);
};

describe("mealService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMeal", () => {
    describe("success", () => {
      it("should return an array of meals", async () => {
        mockAxiosSuccess(mockMeals);
        const result = await mealService.getMeal();
        expect(result).toEqual(mockMeals.meals);
      });

      it("should call the /random.php endpoint", async () => {
        mockAxiosSuccess(mockMeals);
        await mealService.getMeal();
        expect(mockApiGet).toHaveBeenCalledWith("/random.php");
      });
    });

    describe("error handling", () => {
      it("should throw an error with HTTP status when an axios error occurs", async () => {
        mockAxiosError(500, "Internal Server Error");
        await expect(mealService.getMeal()).rejects.toThrow("HTTP error!");
      });

      it("should include the response status in the error message", async () => {
        mockAxiosError(503, "Service Unavailable");
        await expect(mealService.getMeal()).rejects.toThrow("503");
      });

      it("should rethrow non-axios errors as-is", async () => {
        mockAxiosNetworkError("Unknown error");
        await expect(mealService.getMeal()).rejects.toThrow("Unknown error");
      });
    });
  });

  describe("getMealByName", () => {
    describe("success", () => {
      it("should return an array of meals when found", async () => {
        mockAxiosSuccess(mockMealsSearchByName);
        const result = await mealService.getMealByName("Mandazi");
        expect(result).toEqual(mockMealsSearchByName.meals);
      });

      it("should call the /search.php endpoint with the meal name", async () => {
        mockAxiosSuccess(mockMealsSearchByName);
        await mealService.getMealByName("Mandazi");
        expect(mockApiGet).toHaveBeenCalledWith("/search.php?s=Mandazi");
      });

      it("should return null when no meals match the search", async () => {
        mockAxiosSuccess({ meals: null });
        const result = await mealService.getMealByName("nonexistent");
        expect(result).toBeNull();
      });
    });

    describe("error handling", () => {
      it("should throw an error with HTTP status when an axios error occurs", async () => {
        mockAxiosError(404, "Not Found");
        await expect(mealService.getMealByName("test")).rejects.toThrow(
          "HTTP error!"
        );
      });

      it("should include the response status in the error message", async () => {
        mockAxiosError(404, "Not Found");
        await expect(mealService.getMealByName("test")).rejects.toThrow("404");
      });

      it("should rethrow non-axios errors as-is", async () => {
        mockAxiosNetworkError("Network failure");
        await expect(mealService.getMealByName("test")).rejects.toThrow(
          "Network failure"
        );
      });
    });
  });
});
