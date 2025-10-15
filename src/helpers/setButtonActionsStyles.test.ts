import { setButtonActionsStyles } from "@src/helpers/setButtonActionsStyles";

import { mealStore } from "@src/stores/mealStore";

jest.mock("@src/stores/mealStore", () => ({
  mealStore: {
    getState: jest.fn(),
    currentMealInHistory: jest.fn(),
  },
}));

describe("setButtonActionsStyles.ts", () => {
  let likeMealButton: HTMLButtonElement;
  let deleteMealButton: HTMLButtonElement;

  beforeEach(() => {
    likeMealButton = document.createElement("button");
    likeMealButton.id = "like-meal";

    deleteMealButton = document.createElement("button");
    deleteMealButton.id = "delete-meal";

    document.body.appendChild(likeMealButton);
    document.body.appendChild(deleteMealButton);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("When meal is in history", () => {
    test("It should disable like button and enable delete button when currentMealInHistory is true", () => {
      (mealStore.getState as jest.Mock).mockReturnValue({ historyMeal: null });
      (mealStore.currentMealInHistory as jest.Mock).mockReturnValue(true);

      setButtonActionsStyles();

      expect(likeMealButton.disabled).toBe(true);
      expect(likeMealButton.classList.contains("[&&]:bg-gray-200")).toBe(true);
      expect(likeMealButton.classList.contains("[&&]:cursor-not-allowed")).toBe(
        true
      );

      expect(deleteMealButton.disabled).toBe(false);
      expect(deleteMealButton.classList.contains("[&&]:bg-success")).toBe(true);
      expect(deleteMealButton.classList.contains("[&&]:bg-gray-200")).toBe(
        false
      );
      expect(deleteMealButton.classList.contains("cursor-not-allowed")).toBe(
        false
      );
    });

    test("It should disable like button and enable delete button when historyMeal exists", () => {
      (mealStore.getState as jest.Mock).mockReturnValue({
        historyMeal: { idMeal: "123", name: "Test" },
      });
      (mealStore.currentMealInHistory as jest.Mock).mockReturnValue(false);

      setButtonActionsStyles();

      expect(likeMealButton.disabled).toBe(true);
      expect(likeMealButton.classList.contains("[&&]:bg-gray-200")).toBe(true);
      expect(likeMealButton.classList.contains("[&&]:cursor-not-allowed")).toBe(
        true
      );

      expect(deleteMealButton.disabled).toBe(false);
      expect(deleteMealButton.classList.contains("[&&]:bg-success")).toBe(true);
    });
  });

  describe("When meal is not in history", () => {
    test("It should enable like button and disable delete button", () => {
      (mealStore.getState as jest.Mock).mockReturnValue({ historyMeal: null });
      (mealStore.currentMealInHistory as jest.Mock).mockReturnValue(false);

      setButtonActionsStyles();

      expect(likeMealButton.disabled).toBe(false);
      expect(likeMealButton.classList.contains("[&&]:bg-gray-200")).toBe(false);
      expect(likeMealButton.classList.contains("[&&]:cursor-not-allowed")).toBe(
        false
      );

      expect(deleteMealButton.disabled).toBe(true);
      expect(deleteMealButton.classList.contains("[&&]:bg-success")).toBe(
        false
      );
      expect(deleteMealButton.classList.contains("[&&]:bg-gray-200")).toBe(
        true
      );
      expect(deleteMealButton.classList.contains("cursor-not-allowed")).toBe(
        true
      );
    });
  });

  describe("Edge cases", () => {
    test("It should handle buttons with existing classes", () => {
      likeMealButton.classList.add("existing-class");
      deleteMealButton.classList.add("another-class");

      (mealStore.getState as jest.Mock).mockReturnValue({ historyMeal: null });
      (mealStore.currentMealInHistory as jest.Mock).mockReturnValue(true);

      setButtonActionsStyles();

      expect(likeMealButton.classList.contains("existing-class")).toBe(true);
      expect(deleteMealButton.classList.contains("another-class")).toBe(true);
    });

    test("It should toggle states correctly when called multiple times", () => {
      (mealStore.getState as jest.Mock).mockReturnValue({ historyMeal: null });
      (mealStore.currentMealInHistory as jest.Mock).mockReturnValue(true);

      setButtonActionsStyles();

      expect(likeMealButton.disabled).toBe(true);
      expect(deleteMealButton.disabled).toBe(false);

      (mealStore.currentMealInHistory as jest.Mock).mockReturnValue(false);

      setButtonActionsStyles();

      expect(likeMealButton.disabled).toBe(false);
      expect(deleteMealButton.disabled).toBe(true);
    });
  });
});
