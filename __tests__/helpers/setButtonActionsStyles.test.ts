import { setButtonActionsStyles } from "@/helpers/setButtonActionsStyles";

import { mealStore } from "@/stores/mealStore";

import { mockMeal } from "@tests/__mocks__/meal.mock";
import { mockMealHistory } from "@tests/__mocks__/mealHistory.mock";

const setupDOM = (): {
  likeMeal: HTMLButtonElement;
  deleteMeal: HTMLButtonElement;
} => {
  const likeMeal = document.createElement("button");
  likeMeal.id = "like-meal";

  const deleteMeal = document.createElement("button");
  deleteMeal.id = "delete-meal";

  document.body.appendChild(likeMeal);
  document.body.appendChild(deleteMeal);

  return { likeMeal, deleteMeal };
};

describe("setButtonActionsStyles", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    mealStore.setState({
      currentMeal: null,
      historyMeal: null,
      historiesMeal: [],
    });
    localStorage.clear();
  });

  describe("when DOM elements are missing", () => {
    it("should not throw when buttons are not in the DOM", () => {
      expect(() => {
        setButtonActionsStyles();
      }).not.toThrow();
    });
  });

  describe("when historyMeal is set in the store", () => {
    it("should disable the like button", () => {
      const { likeMeal } = setupDOM();
      mealStore.setHistoryMeal(mockMeal);
      setButtonActionsStyles();
      expect(likeMeal).toBeDisabled();
    });

    it("should enable the delete button", () => {
      const { deleteMeal } = setupDOM();
      mealStore.setHistoryMeal(mockMeal);
      setButtonActionsStyles();
      expect(deleteMeal).not.toBeDisabled();
    });

    it("should add disabled styles to the like button", () => {
      const { likeMeal } = setupDOM();
      mealStore.setHistoryMeal(mockMeal);
      setButtonActionsStyles();
      expect(likeMeal).toHaveClass(
        "[&&]:bg-gray-200",
        "[&&]:cursor-not-allowed"
      );
    });

    it("should add success styles to the delete button", () => {
      const { deleteMeal } = setupDOM();
      mealStore.setHistoryMeal(mockMeal);
      setButtonActionsStyles();
      expect(deleteMeal).toHaveClass("[&&]:bg-success");
    });
  });

  describe("when currentMeal is in history", () => {
    it("should disable the like button", () => {
      const { likeMeal } = setupDOM();
      mealStore.setCurrentMeal({ ...mockMeal, idMeal: mockMealHistory.idMeal });
      mealStore.addHistory(mockMealHistory);
      setButtonActionsStyles();
      expect(likeMeal).toBeDisabled();
    });

    it("should enable the delete button", () => {
      const { deleteMeal } = setupDOM();
      mealStore.setCurrentMeal({ ...mockMeal, idMeal: mockMealHistory.idMeal });
      mealStore.addHistory(mockMealHistory);
      setButtonActionsStyles();
      expect(deleteMeal).not.toBeDisabled();
    });
  });

  describe("when currentMeal is not in history and no historyMeal", () => {
    it("should enable the like button", () => {
      const { likeMeal } = setupDOM();
      likeMeal.disabled = true;
      mealStore.setCurrentMeal(mockMeal);
      setButtonActionsStyles();
      expect(likeMeal).not.toBeDisabled();
    });

    it("should disable the delete button", () => {
      const { deleteMeal } = setupDOM();
      mealStore.setCurrentMeal(mockMeal);
      setButtonActionsStyles();
      expect(deleteMeal).toBeDisabled();
    });

    it("should remove disabled styles from the like button", () => {
      const { likeMeal } = setupDOM();
      likeMeal.classList.add("[&&]:bg-gray-200", "[&&]:cursor-not-allowed");
      mealStore.setCurrentMeal(mockMeal);
      setButtonActionsStyles();
      expect(likeMeal).not.toHaveClass(
        "[&&]:bg-gray-200",
        "[&&]:cursor-not-allowed"
      );
    });

    it("should remove success styles from the delete button", () => {
      const { deleteMeal } = setupDOM();
      deleteMeal.classList.add("[&&]:bg-success");
      mealStore.setCurrentMeal(mockMeal);
      setButtonActionsStyles();
      expect(deleteMeal).not.toHaveClass("[&&]:bg-success");
    });
  });
});
