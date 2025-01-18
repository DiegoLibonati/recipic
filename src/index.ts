import { Meal } from "./entities/vite-env";

import { getMeal } from "./api/getMeal";
import { getMealByName } from "./api/getMealByName";

import { getElements } from "./helpers/getElements";
import { setAlert } from "./helpers/setAlert";
import { setLocalStorage } from "./helpers/setLocalStorage";
import { getMealsFromLocalStorage } from "./helpers/getMealsFromLocalStorage";

import { LOCAL_STORAGE_MEALS_KEY } from "./constants/constants";

import { mealState } from "./state";

const setInitialState = (): void => {
  mealState.currentMeal = null;
  mealState.historyOpen = false;
};

const insertMeal = (meal: Meal): void => {
  const { mealContainer } = getElements();

  if (mealContainer.children.length > 0) removeMeal();

  const img = document.createElement("img");

  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;

  img.setAttribute("class", "w-full h-full rounded-lg object-cover");

  mealContainer.append(img);
};

const insertHistory = (meal: Meal) => {
  const { historiesContainer } = getElements();

  if (
    historiesContainer.children.length > 0 &&
    historiesContainer.children[0].tagName !== "DIV"
  ) {
    historiesContainer.innerHTML = "";
  }

  const div = document.createElement("div");

  div.setAttribute(
    "class",
    "h-12 w-12 rounded-full p-1 bg-primary cursor-pointer active:scale-75 transition-all ml-[.5rem] md:h-16 md:w-16"
  );

  const img = document.createElement("img");

  img.src = meal.strMealThumb;
  img.alt = meal.strMeal;
  img.id = meal.idMeal;

  img.setAttribute("class", "w-full h-full rounded-full object-cover");

  div.append(img);

  div.addEventListener("click", () => viewMeal(meal.idMeal));

  historiesContainer.append(div);
};

const removeMeal = (): void => {
  const { mealContainer } = getElements();

  mealContainer.innerHTML = "";
};

const viewMeal = (idMeal: string): void => {
  const { mealContainer, deleteMealButton, likeMealButton, nextMealButton } =
    getElements();
  const meals = getMealsFromLocalStorage();

  const meal = meals.find((meal) => meal.idMeal === idMeal);

  mealState.currentMeal = meal!;
  mealState.historyOpen = true;

  removeMeal();

  const article = document.createElement("article");
  article.classList.add("w-full", "h-full");

  const div = document.createElement("div");
  div.setAttribute(
    "class",
    "flex items-center justify-center relative w-full h-[30%]"
  );

  const h2 = document.createElement("h2");
  h2.setAttribute(
    "class",
    "absolute z-[100] text-white text-lg font-semibold truncate w-[75%] text-center"
  );
  h2.textContent = mealState.currentMeal.strMeal;

  const img = document.createElement("img");
  img.setAttribute("class", "absolute w-full rounded-lg h-full object-cover");
  img.src = mealState.currentMeal?.strMealThumb!;
  img.alt = mealState.currentMeal?.strMeal!;

  div.append(img);
  div.append(h2);

  const p = document.createElement("p");
  p.setAttribute(
    "class",
    "w-full h-[70%] overflow-auto text-justify pt-[.5rem]"
  );
  p.textContent = mealState.currentMeal?.strInstructions!;

  article.append(div);
  article.append(p);

  const button = document.createElement("button");
  button.setAttribute(
    "class",
    "absolute top-4 right-4 h-12 w-12 bg-primary rounded-full text-white text-base cursor-pointer active:scale-75 transition-all"
  );
  button.type = "button";

  const icon = document.createElement("i");
  icon.setAttribute("class", "fa fa-x");
  icon.setAttribute("aria-hidden", "true");

  button.append(icon);

  mealContainer.append(article);
  mealContainer.append(button);

  deleteMealButton.removeAttribute("disabled");
  deleteMealButton.classList.add("[&&]:bg-success");
  deleteMealButton.classList.remove("[&&]:bg-gray-200", "cursor-not-allowed");

  likeMealButton.classList.add("[&&]:bg-gray-200", "[&&]:cursor-not-allowed");

  button.addEventListener("click", () => nextMealButton.click());
};

const generateMeal = async (): Promise<void> => {
  const { deleteMealButton, likeMealButton } = getElements();

  const meal = await getMeal();
  mealState.currentMeal = meal;
  mealState.historyOpen = false;

  deleteMealButton.setAttribute("disabled", "");
  deleteMealButton.classList.add("[&&]:bg-gray-200");
  deleteMealButton.classList.remove("[&&]:bg-success");

  likeMealButton.classList.remove("[&&]:bg-gray-200", "[&&]:cursor-not-allowed");

  insertMeal(meal);
};

const saveMeal = (): void => {
  if (!mealState?.currentMeal?.idMeal) return;

  const meals = getMealsFromLocalStorage();

  if (meals.some((m) => m.idMeal === mealState.currentMeal?.idMeal))
    return setAlert("The story is already added", "error");

  insertHistory(mealState?.currentMeal);

  setLocalStorage(LOCAL_STORAGE_MEALS_KEY, [...meals, mealState?.currentMeal]);

  setAlert("Story successfully added", "success");
};

const deleteMeal = (): void => {
  const { historiesContainer } = getElements();

  const idMeal = mealState?.currentMeal?.idMeal;

  const meals = getMealsFromLocalStorage().filter(
    (meal) => meal.idMeal !== idMeal
  );

  setLocalStorage(LOCAL_STORAGE_MEALS_KEY, meals);

  if (!mealState.historyOpen) return;

  historiesContainer.innerHTML = "";

  onInit();

  setAlert("Story successfully deleted", "success");
};

const searchMeal = async (e: MouseEvent): Promise<void> => {
  e.preventDefault();
  const { inputForm } = getElements();

  const nameMeal = inputForm.value.trim();

  if (!nameMeal) return;

  const meal = await getMealByName(nameMeal);

  inputForm.value = "";

  if (!meal) return setAlert("Meal not found", "error");

  mealState.currentMeal = meal;

  insertMeal(mealState.currentMeal);

  setAlert("Meal found", "success");
};

const onInit = (): void => {
  const {
    historiesContainer,
    nextMealButton,
    likeMealButton,
    deleteMealButton,
    submitForm,
  } = getElements();

  setInitialState();
  generateMeal();

  nextMealButton.addEventListener("click", generateMeal);
  likeMealButton.addEventListener("click", saveMeal);
  deleteMealButton.addEventListener("click", deleteMeal);
  submitForm.addEventListener("click", (e) => searchMeal(e));

  const meals = getMealsFromLocalStorage();

  if (!meals.length) {
    const span = document.createElement("span");

    span.setAttribute(
      "class",
      "flex items-center justify-center h-12 w-12 rounded-full p-1 bg-primary text-white cursor-not-allowed md:h-16 md:w-16"
    );

    const icon = document.createElement("i");

    icon.setAttribute("class", "fa fa-plus");
    icon.setAttribute("aria-hidden", "true");

    span.append(icon);
    historiesContainer.append(span);

    return;
  }

  meals.forEach((meal) => {
    insertHistory(meal);
  });
};

// Events
document.addEventListener("DOMContentLoaded", onInit);
