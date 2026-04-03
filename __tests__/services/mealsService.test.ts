import { mockEnvs } from "@tests/__mocks__/envs.mock";

jest.mock("@/constants/envs", () => {
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

import { mealsService } from "@/services/mealsService";
import { apiMeals } from "@/services/axios";

import { mockMeal } from "@tests/__mocks__/meal.mock";
import { mockMeals } from "@tests/__mocks__/meals.mock";

const mockedApiMeals = apiMeals as jest.Mocked<typeof apiMeals>;

jest.mock("@/services/axios");

describe("mealsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMeal", () => {
    it("should fetch random meal successfully", async () => {
      mockedApiMeals.get.mockResolvedValue({
        data: { meals: [mockMeal] },
      });

      const result = await mealsService.getMeal();

      expect(result).toEqual([mockMeal]);
      expect(mockedApiMeals.get).toHaveBeenCalledWith("/random.php");
    });

    it("should throw error when fetch fails", async () => {
      mockedApiMeals.get.mockRejectedValue(new Error("Network error"));

      await expect(mealsService.getMeal()).rejects.toThrow();
    });
  });

  describe("getMealByName", () => {
    it("should fetch meal by name successfully", async () => {
      mockedApiMeals.get.mockResolvedValue({
        data: { meals: mockMeals },
      });

      const result = await mealsService.getMealByName("Teriyaki");

      expect(result).toEqual(mockMeals);
      expect(mockedApiMeals.get).toHaveBeenCalledWith("/search.php?s=Teriyaki");
    });

    it("should return null when no meals found", async () => {
      mockedApiMeals.get.mockResolvedValue({
        data: { meals: null },
      });

      const result = await mealsService.getMealByName("NonExistent");

      expect(result).toBeNull();
    });

    it("should throw error when fetch fails", async () => {
      mockedApiMeals.get.mockRejectedValue(new Error("Network error"));

      await expect(mealsService.getMealByName("Test")).rejects.toThrow();
    });
  });
});
