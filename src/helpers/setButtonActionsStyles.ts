import { mealStore } from "@src/stores/mealStore";

export const setButtonActionsStyles = (): void => {
  const { historyMeal } = mealStore.getState();

  const currentMealInHistory = mealStore.currentMealInHistory();

  const likeMeal = document.querySelector<HTMLButtonElement>("#like-meal");
  const deleteMeal = document.querySelector<HTMLButtonElement>("#delete-meal");

  if (currentMealInHistory || historyMeal) {
    likeMeal!.disabled = true;
    likeMeal?.classList.add("[&&]:bg-gray-200", "[&&]:cursor-not-allowed");

    deleteMeal!.disabled = false;
    deleteMeal?.classList.add("[&&]:bg-success");
    deleteMeal?.classList.remove("[&&]:bg-gray-200", "cursor-not-allowed");

    return;
  }

  likeMeal!.disabled = false;
  likeMeal?.classList.remove("[&&]:bg-gray-200", "[&&]:cursor-not-allowed");

  deleteMeal!.disabled = true;
  deleteMeal?.classList.remove("[&&]:bg-success");
  deleteMeal?.classList.add("[&&]:bg-gray-200", "cursor-not-allowed");

  return;
};
