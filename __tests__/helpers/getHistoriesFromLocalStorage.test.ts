import { getHistoriesFromLocalStorage } from "@/helpers/getHistoriesFromLocalStorage";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";
import {
  mockMealHistory,
  mockMealHistory2,
} from "@tests/__mocks__/mealHistory.mock";

describe("getHistoriesFromLocalStorage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
  });

  afterEach(() => {
    mocksLocalStorage.clear();
  });

  it("should return histories from localStorage", () => {
    mocksLocalStorage.setItem(
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
    mocksLocalStorage.setItem("histories", "null");

    const result = getHistoriesFromLocalStorage();

    expect(result).toEqual([]);
  });
});
