import { getHistoriesFromLocalStorage } from "@/helpers/getHistoriesFromLocalStorage";

import {
  mockMealHistory,
  mockMealHistory2,
} from "@tests/__mocks__/mealHistory.mock";

const LOCAL_STORAGE_HISTORIES_KEY = "histories";

describe("getHistoriesFromLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("when localStorage is empty", () => {
    it("should return an empty array", () => {
      expect(getHistoriesFromLocalStorage()).toEqual([]);
    });
  });

  describe("when localStorage has one history entry", () => {
    it("should return the parsed histories array", () => {
      localStorage.setItem(
        LOCAL_STORAGE_HISTORIES_KEY,
        JSON.stringify([mockMealHistory])
      );
      expect(getHistoriesFromLocalStorage()).toEqual([mockMealHistory]);
    });
  });

  describe("when localStorage has multiple history entries", () => {
    it("should return all history entries", () => {
      localStorage.setItem(
        LOCAL_STORAGE_HISTORIES_KEY,
        JSON.stringify([mockMealHistory, mockMealHistory2])
      );
      expect(getHistoriesFromLocalStorage()).toEqual([
        mockMealHistory,
        mockMealHistory2,
      ]);
    });
  });

  describe("edge cases", () => {
    it("should return an empty array when the stored value is null", () => {
      localStorage.setItem(LOCAL_STORAGE_HISTORIES_KEY, JSON.stringify(null));
      expect(getHistoriesFromLocalStorage()).toEqual([]);
    });
  });
});
