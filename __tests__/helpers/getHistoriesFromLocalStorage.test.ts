import type { HistoryMeal } from "@/types/app";

import { getHistoriesFromLocalStorage } from "@/helpers/getHistoriesFromLocalStorage";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("getHistoriesFromLocalStorage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
  });

  afterEach(() => {
    mocksLocalStorage.clear();
  });

  it("should return histories from localStorage", () => {
    const mockHistories: HistoryMeal[] = [
      {
        idMeal: "1",
        strMeal: "Spaghetti Carbonara",
        strMealThumb: "https://example.com/image1.jpg",
      },
      {
        idMeal: "2",
        strMeal: "Pizza Margherita",
        strMealThumb: "https://example.com/image2.jpg",
      },
    ];

    mocksLocalStorage.setItem("histories", JSON.stringify(mockHistories));

    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual(mockHistories);
  });

  it("should return empty array when no histories in localStorage", () => {
    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mocksLocalStorage.setItem("histories", "null");

    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual([]);
  });
});
