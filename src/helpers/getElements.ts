export const getElements = () => ({
  mealContainer: document.getElementById("meal-information") as HTMLElement,
  historiesContainer: document.getElementById("histories") as HTMLElement,
  nextMealButton: document.getElementById("next-meal") as HTMLButtonElement,
  likeMealButton: document.getElementById("like-meal") as HTMLButtonElement,
  deleteMealButton: document.getElementById("delete-meal") as HTMLButtonElement,
  inputForm: document.getElementById("input-meal") as HTMLInputElement,
  submitForm: document.getElementById("button-form") as HTMLButtonElement,
  alert: document.getElementById("alert") as HTMLDivElement,
  alertHeading: document.getElementById("alert-text") as HTMLHeadingElement,
});
