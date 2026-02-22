import { MealStore } from "@/stores/mealStore";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";
import { mockMeal } from "@tests/__mocks__/meal.mock";
import {
  mockMealHistory,
  mockMealHistory2,
} from "@tests/__mocks__/mealHistory.mock";

describe("MealStore", () => {
  let store: MealStore;

  beforeEach(() => {
    mocksLocalStorage.clear();
    store = new MealStore({
      currentMeal: null,
      historiesMeal: [],
      historyMeal: null,
    });
  });

  afterEach(() => {
    mocksLocalStorage.clear();
  });

  it("should initialize with correct state", () => {
    const state = store.getState();

    expect(state.currentMeal).toBeNull();
    expect(state.historiesMeal).toEqual([]);
    expect(state.historyMeal).toBeNull();
  });

  it("should set current meal", () => {
    store.setCurrentMeal(mockMeal);

    expect(store.get("currentMeal")).toEqual(mockMeal);
  });

  it("should set history meal", () => {
    store.setHistoryMeal(mockMeal);

    expect(store.get("historyMeal")).toEqual(mockMeal);
  });

  it("should add meal to history", () => {
    store.addHistory(mockMealHistory);

    const histories = store.get("historiesMeal");
    expect(histories).toHaveLength(1);
    expect(histories[0]).toEqual(mockMealHistory);
  });

  it("should save history to localStorage when adding", () => {
    store.addHistory(mockMealHistory);

    const stored = mocksLocalStorage.getItem("histories");
    const histories = JSON.parse(stored ?? "[]");

    expect(histories).toHaveLength(1);
    expect(histories[0]).toEqual(mockMealHistory);
  });

  it("should remove meal from history", () => {
    store.addHistory(mockMealHistory);
    store.addHistory(mockMealHistory2);
    store.removeHistory("1");

    const histories = store.get("historiesMeal");
    expect(histories).toHaveLength(1);
    expect(histories[0]?.idMeal).toBe("2");
  });

  it("should update localStorage when removing history", () => {
    store.addHistory(mockMealHistory);
    store.removeHistory("1");

    const stored = mocksLocalStorage.getItem("histories");
    const histories = JSON.parse(stored ?? "[]");

    expect(histories).toHaveLength(0);
  });

  it("should clear historyMeal when removing it from history", () => {
    const historyToAdd = {
      idMeal: mockMeal.idMeal,
      strMeal: mockMeal.strMeal,
      strMealThumb: mockMeal.strMealThumb,
    };

    store.addHistory(historyToAdd);
    store.setHistoryMeal(mockMeal);

    store.removeHistory(mockMeal.idMeal);

    expect(store.get("historyMeal")).toBeNull();
  });

  it("should check if current meal is in history", () => {
    store.setCurrentMeal(mockMeal);
    expect(store.currentMealInHistory()).toBe(false);

    store.addHistory({
      idMeal: mockMeal.idMeal,
      strMeal: mockMeal.strMeal,
      strMealThumb: mockMeal.strMealThumb,
    });

    expect(store.currentMealInHistory()).toBe(true);
  });

  it("should check if meal id is in history", () => {
    store.addHistory(mockMealHistory);

    expect(store.idMealInHistory("1")).toBe(true);
    expect(store.idMealInHistory("2")).toBe(false);
  });

  it("should notify listeners when state changes", () => {
    const listener = jest.fn();

    store.subscribe("currentMeal", listener);

    store.setCurrentMeal(mockMeal);

    expect(listener).toHaveBeenCalledWith(mockMeal);
  });
});
