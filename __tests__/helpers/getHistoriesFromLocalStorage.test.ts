import { getHistoriesFromLocalStorage } from "@/helpers/getHistoriesFromLocalStorage";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";
import {
  mockMealHistory,
  mockMealHistory2,
} from "@tests/__mocks__/mealHistory.mock";

describe("getHistoriesFromLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return histories from localStorage", () => {
    mockLocalStorage.setItem(
      "histories",
      JSON.stringify([mockMealHistory, mockMealHistory2])
    );

    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual([mockMealHistory, mockMealHistory2]);
  });

  it("should return empty array when no histories in localStorage", () => {
    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mockLocalStorage.setItem("histories", "null");

    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual([]);
  });
});
