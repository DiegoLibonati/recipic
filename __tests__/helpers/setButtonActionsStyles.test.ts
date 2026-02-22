import { setButtonActionsStyles } from "@/helpers/setButtonActionsStyles";

import { mealStore } from "@/stores/mealStore";

import { mockMeal } from "@tests/__mocks__/meal.mock";

describe("setButtonActionsStyles", () => {
  beforeEach(() => {
    const likeMeal = document.createElement("button");
    likeMeal.id = "like-meal";
    const deleteMeal = document.createElement("button");
    deleteMeal.id = "delete-meal";

    document.body.appendChild(likeMeal);
    document.body.appendChild(deleteMeal);

    mealStore.setState({
      currentMeal: null,
      historyMeal: null,
      historiesMeal: [],
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should enable like button and disable delete button when no meal in history", () => {
    setButtonActionsStyles();

    const likeMeal = document.querySelector<HTMLButtonElement>("#like-meal");
    const deleteMeal =
      document.querySelector<HTMLButtonElement>("#delete-meal");

    expect(likeMeal?.disabled).toBe(false);
    expect(likeMeal).not.toHaveClass(
      "[&&]:bg-gray-200",
      "[&&]:cursor-not-allowed"
    );

    expect(deleteMeal?.disabled).toBe(true);
    expect(deleteMeal).toHaveClass("[&&]:bg-gray-200", "cursor-not-allowed");
    expect(deleteMeal).not.toHaveClass("[&&]:bg-success");
  });

  it("should disable like button and enable delete button when historyMeal is set", () => {
    mealStore.setHistoryMeal(mockMeal);
    setButtonActionsStyles();

    const likeMeal = document.querySelector<HTMLButtonElement>("#like-meal");
    const deleteMeal =
      document.querySelector<HTMLButtonElement>("#delete-meal");

    expect(likeMeal?.disabled).toBe(true);
    expect(likeMeal).toHaveClass("[&&]:bg-gray-200", "[&&]:cursor-not-allowed");

    expect(deleteMeal?.disabled).toBe(false);
    expect(deleteMeal).toHaveClass("[&&]:bg-success");
    expect(deleteMeal).not.toHaveClass("[&&]:bg-gray-200");
  });

  it("should disable like button when current meal is in history", () => {
    mealStore.setCurrentMeal(mockMeal);
    mealStore.addHistory({
      idMeal: mockMeal.idMeal,
      strMeal: mockMeal.strMeal,
      strMealThumb: mockMeal.strMealThumb,
    });

    setButtonActionsStyles();

    const likeMeal = document.querySelector<HTMLButtonElement>("#like-meal");
    const deleteMeal =
      document.querySelector<HTMLButtonElement>("#delete-meal");

    expect(likeMeal?.disabled).toBe(true);
    expect(deleteMeal?.disabled).toBe(false);
  });

  it("should not throw error when buttons do not exist", () => {
    document.body.innerHTML = "";

    expect(() => {
      setButtonActionsStyles();
    }).not.toThrow();
  });
});
