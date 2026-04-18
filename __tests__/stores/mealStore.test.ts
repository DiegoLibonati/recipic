import { mealStore } from "@/stores/mealStore";

import { mockMeal } from "@tests/__mocks__/meal.mock";
import {
  mockMealHistory,
  mockMealHistory2,
} from "@tests/__mocks__/mealHistory.mock";

const LOCAL_STORAGE_HISTORIES_KEY = "histories";

describe("mealStore", () => {
  beforeEach(() => {
    mealStore.setState({
      currentMeal: null,
      historyMeal: null,
      historiesMeal: [],
    });
    localStorage.clear();
  });

  describe("initial state", () => {
    it("should have null as currentMeal", () => {
      expect(mealStore.getState().currentMeal).toBeNull();
    });

    it("should have null as historyMeal", () => {
      expect(mealStore.getState().historyMeal).toBeNull();
    });

    it("should have an empty historiesMeal array", () => {
      expect(mealStore.getState().historiesMeal).toEqual([]);
    });
  });

  describe("setCurrentMeal", () => {
    it("should update currentMeal with the provided meal", () => {
      mealStore.setCurrentMeal(mockMeal);
      expect(mealStore.getState().currentMeal).toEqual(mockMeal);
    });

    it("should set currentMeal to null", () => {
      mealStore.setCurrentMeal(mockMeal);
      mealStore.setCurrentMeal(null);
      expect(mealStore.getState().currentMeal).toBeNull();
    });
  });

  describe("setHistoryMeal", () => {
    it("should update historyMeal with the provided meal", () => {
      mealStore.setHistoryMeal(mockMeal);
      expect(mealStore.getState().historyMeal).toEqual(mockMeal);
    });

    it("should set historyMeal to null", () => {
      mealStore.setHistoryMeal(mockMeal);
      mealStore.setHistoryMeal(null);
      expect(mealStore.getState().historyMeal).toBeNull();
    });
  });

  describe("addHistory", () => {
    it("should add a history entry to historiesMeal", () => {
      mealStore.addHistory(mockMealHistory);
      expect(mealStore.getState().historiesMeal).toContainEqual(
        mockMealHistory
      );
    });

    it("should accumulate multiple history entries", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.addHistory(mockMealHistory2);
      expect(mealStore.getState().historiesMeal).toHaveLength(2);
    });

    it("should persist histories to localStorage", () => {
      mealStore.addHistory(mockMealHistory);
      const stored = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_HISTORIES_KEY) ?? "[]"
      ) as unknown[];
      expect(stored).toContainEqual(mockMealHistory);
    });

    it("should persist multiple entries to localStorage", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.addHistory(mockMealHistory2);
      const stored = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_HISTORIES_KEY) ?? "[]"
      ) as unknown[];
      expect(stored).toHaveLength(2);
    });
  });

  describe("removeHistory", () => {
    it("should remove the history entry by id", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.removeHistory(mockMealHistory.idMeal);
      expect(mealStore.getState().historiesMeal).not.toContainEqual(
        mockMealHistory
      );
    });

    it("should keep other entries when removing one", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.addHistory(mockMealHistory2);
      mealStore.removeHistory(mockMealHistory.idMeal);
      expect(mealStore.getState().historiesMeal).toContainEqual(
        mockMealHistory2
      );
      expect(mealStore.getState().historiesMeal).not.toContainEqual(
        mockMealHistory
      );
    });

    it("should persist the updated histories to localStorage", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.removeHistory(mockMealHistory.idMeal);
      const stored = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_HISTORIES_KEY) ?? "[]"
      ) as unknown[];
      expect(stored).not.toContainEqual(mockMealHistory);
    });

    it("should set historyMeal to null when the removed id matches", () => {
      const historyEntry = {
        idMeal: mockMeal.idMeal,
        strMeal: mockMeal.strMeal,
        strMealThumb: mockMeal.strMealThumb,
      };
      mealStore.addHistory(historyEntry);
      mealStore.setHistoryMeal(mockMeal);
      mealStore.removeHistory(mockMeal.idMeal);
      expect(mealStore.getState().historyMeal).toBeNull();
    });

    it("should not change historyMeal when the removed id does not match", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.setHistoryMeal(mockMeal);
      mealStore.removeHistory(mockMealHistory.idMeal);
      expect(mealStore.getState().historyMeal).toEqual(mockMeal);
    });

    it("should do nothing when removing a non-existent id", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.removeHistory("non-existent-id");
      expect(mealStore.getState().historiesMeal).toContainEqual(
        mockMealHistory
      );
    });
  });

  describe("currentMealInHistory", () => {
    it("should return false when currentMeal is null", () => {
      expect(mealStore.currentMealInHistory()).toBe(false);
    });

    it("should return false when currentMeal is not in history", () => {
      mealStore.setCurrentMeal(mockMeal);
      expect(mealStore.currentMealInHistory()).toBe(false);
    });

    it("should return true when currentMeal id matches a history entry", () => {
      mealStore.setCurrentMeal(mockMeal);
      mealStore.addHistory({
        idMeal: mockMeal.idMeal,
        strMeal: mockMeal.strMeal,
        strMealThumb: mockMeal.strMealThumb,
      });
      expect(mealStore.currentMealInHistory()).toBe(true);
    });
  });

  describe("idMealInHistory", () => {
    it("should return false when the id is not in history", () => {
      expect(mealStore.idMealInHistory("non-existent-id")).toBe(false);
    });

    it("should return true when the id is in history", () => {
      mealStore.addHistory(mockMealHistory);
      expect(mealStore.idMealInHistory(mockMealHistory.idMeal)).toBe(true);
    });

    it("should return false after the entry is removed", () => {
      mealStore.addHistory(mockMealHistory);
      mealStore.removeHistory(mockMealHistory.idMeal);
      expect(mealStore.idMealInHistory(mockMealHistory.idMeal)).toBe(false);
    });
  });
});
