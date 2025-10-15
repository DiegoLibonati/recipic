import { ButtonCircle } from "@src/components/ButtonCircle/ButtonCircle";
import { PresentationMeal } from "@src/components/PresentationMeal/PresentationMeal";
import { HistoryMeal } from "@src/components/HistoryMeal/HistoryMeal";
import { InformationMeal } from "@src/components/InformationMeal/InformationMeal";

import { getMeal } from "@src/api/get/getMeal";
import { getMealByName } from "@src/api/get/getMealByName";

import { setAlert } from "@src/helpers/setAlert";
import { setButtonActionsStyles } from "@src/helpers/setButtonActionsStyles";

import { mealStore } from "@src/stores/mealStore";

const handleHistoryClick = async (_: MouseEvent, id: string) => {
  const { historiesMeal } = mealStore.getState();

  const meal = historiesMeal.find((hm) => hm.idMeal === id);

  const completeMeal = await getMealByName(meal?.strMeal!);

  mealStore.setHistoryMeal(completeMeal!);

  setButtonActionsStyles();
};

const handleLikeMeal = () => {
  const { currentMeal } = mealStore.getState();

  mealStore.addHistory({
    idMeal: currentMeal?.idMeal!,
    strMeal: currentMeal?.strMeal!,
    strMealThumb: currentMeal?.strMealThumb!,
  });

  setButtonActionsStyles();

  setAlert(`${currentMeal?.strMeal} has been added to favorites.`, "success");
};

const handleDeleteMeal = () => {
  const { currentMeal, historyMeal } = mealStore.getState();

  mealStore.removeHistory(historyMeal?.idMeal || currentMeal?.idMeal!);

  setButtonActionsStyles();

  setAlert(`${currentMeal?.strMeal} has been added to favorites.`, "success");
};

const handleSearchMeal = async (e: SubmitEvent, input: HTMLInputElement) => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) return setAlert("You must enter a valid name.", "error");

  const mealByName = await getMealByName(value);

  if (!mealByName)
    return setAlert("There is no meal with the name entered.", "error");

  if (mealStore.idMealInHistory(mealByName.idMeal))
    return setAlert("This meal is already in your favorites.", "error");

  mealStore.addHistory({
    idMeal: mealByName?.idMeal!,
    strMeal: mealByName?.strMeal!,
    strMealThumb: mealByName?.strMealThumb!,
  });
  input.value = "";
  setAlert(`${mealByName?.strMeal} has been added to favorites.`, "success");
};

const handleNextMeal = async () => {
  await onInit();
  setButtonActionsStyles();
};

const onInit = async () => {
  const meal = await getMeal();

  mealStore.setCurrentMeal(meal);

  setAlert("New meal successfully obtained.", "success");
};

export const RecipePage = (): HTMLElement => {
  onInit();

  const main = document.createElement("main");
  main.className =
    "flex flex-col items-center justify-around w-full h-full p-2";

  main.innerHTML = `
    <section
        class="flex items-center justify-center bg-secondary w-full h-[10%] rounded-lg shadow-sm md:w-[40rem]"
    >
        <form class="flex flex-row bg-primary m-2 rounded-lg w-full h-[80%]" id="form-search-meal">
            <input
                type="text"
                class="w-[80%] outline-none rounded-bl-lg rounded-tl-lg p-2 text-lg"
                id="input-meal"
            />
            <button
                type="submit"
                class="bg-primary w-[20%] text-white rounded-br-lg rounded-tr-lg cursor-pointer p-2 active:scale-75 transition-all"
                id="button-form"
                aria-label="search meal"
            >
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </form>
    </section>

    <section
        class="flex overflow-x-auto bg-secondary w-full h-[10%] rounded-lg p-2 shadow-sm md:w-[40rem]"
    >
        <article class="flex items-center" id="histories"></article>
    </section>

    <section
        id="meal-information"
        class="flex items-center justify-center relative bg-secondary w-full h-[50%] rounded-lg p-2 shadow-sm md:w-[40rem]"
    >
    </section>

    <section
        id="button-actions"
        class="flex items-center justify-around bg-secondary w-full h-[15%] rounded-lg shadow-sm md:w-[40rem]"
    >
    </section>
  `;

  const buttonActions = main.querySelector<HTMLElement>("#button-actions");
  const formSearchMeal =
    main.querySelector<HTMLFormElement>("#form-search-meal");
  const inputMeal = main.querySelector<HTMLInputElement>("#input-meal");

  formSearchMeal?.addEventListener("submit", (e) =>
    handleSearchMeal(e, inputMeal!)
  );

  const buttonLikeMeal = ButtonCircle({
    id: "like-meal",
    ariaLabel: "like meal",
    children: '<i class="fa fa-heart" aria-hidden="true"></i>',
    type: "button",
    className: "bg-red-600 cursor-pointer",
    onClick: handleLikeMeal,
  });
  const buttonDeleteMeal = ButtonCircle({
    id: "delete-meal",
    ariaLabel: "delete meal",
    children: '<i class="fa fa-trash" aria-hidden="true"></i>',
    type: "button",
    disabled: true,
    className: "bg-gray-200 cursor-not-allowed",
    onClick: handleDeleteMeal,
  });
  const buttonNextMeal = ButtonCircle({
    id: "next-meal",
    ariaLabel: "next meal",
    children: '<i class="fa fa-random" aria-hidden="true"></i>',
    type: "button",
    className: "bg-primary cursor-pointer",
    onClick: handleNextMeal,
  });

  buttonActions?.append(buttonLikeMeal, buttonDeleteMeal, buttonNextMeal);

  const renderInformation = () => {
    const { currentMeal, historyMeal } = mealStore.getState();

    const mealInformation =
      main.querySelector<HTMLElement>("#meal-information");

    mealInformation?.replaceChildren();

    if (historyMeal) {
      const informationMeal = InformationMeal({
        instructions: historyMeal.strInstructions,
        name: historyMeal.strMeal,
        thumbUrl: historyMeal.strMealThumb,
      });

      mealInformation?.append(informationMeal);
      return;
    }

    const presentationMeal = PresentationMeal({
      name: currentMeal?.strMeal!,
      thumbUrl: currentMeal?.strMealThumb!,
    });

    mealInformation?.append(presentationMeal);
  };

  const renderMealHistories = () => {
    const { historiesMeal } = mealStore.getState();

    const historiesElement = main.querySelector<HTMLElement>("#histories");
    historiesElement?.replaceChildren();

    historiesMeal.forEach((hm) => {
      const historyMeal = HistoryMeal({
        id: hm.idMeal,
        name: hm.strMeal,
        thumbUrl: hm.strMealThumb,
        onClick: handleHistoryClick,
      });

      historiesElement?.append(historyMeal);
    });
  };

  renderInformation();
  renderMealHistories();

  mealStore.subscribe("currentMeal", renderInformation);
  mealStore.subscribe("historyMeal", renderInformation);
  mealStore.subscribe("historiesMeal", renderMealHistories);

  return main;
};
