import type { Page } from "@/types/pages";
import type {
  HistoryMealComponent,
  InformationMealComponent,
  PresentationMealComponent,
} from "@/types/components";

import { ButtonCircle } from "@/components/ButtonCircle/ButtonCircle";
import { PresentationMeal } from "@/components/PresentationMeal/PresentationMeal";
import { HistoryMeal } from "@/components/HistoryMeal/HistoryMeal";
import { InformationMeal } from "@/components/InformationMeal/InformationMeal";

import { mealsService } from "@/services/mealsService";

import { setAlert, clearAlert } from "@/helpers/setAlert";
import { setButtonActionsStyles } from "@/helpers/setButtonActionsStyles";

import { mealStore } from "@/stores/mealStore";

const handleHistoryClick = async (_: MouseEvent, id: string): Promise<void> => {
  const { historiesMeal } = mealStore.getState();

  const meal = historiesMeal.find((hm) => hm.idMeal === id);

  if (!meal) return;

  const meals = await mealsService.getMealByName(meal.strMeal);

  if (!meals || meals.length === 0) return;

  const completeMeal = meals[0]!;

  mealStore.setHistoryMeal(completeMeal);

  setButtonActionsStyles();
};

const handleLikeMeal = (): void => {
  const { currentMeal } = mealStore.getState();

  if (!currentMeal) return;

  mealStore.addHistory({
    idMeal: currentMeal.idMeal,
    strMeal: currentMeal.strMeal,
    strMealThumb: currentMeal.strMealThumb,
  });

  setButtonActionsStyles();

  setAlert(`${currentMeal.strMeal} has been added to favorites.`, "success");
};

const handleDeleteMeal = (): void => {
  const { currentMeal, historyMeal } = mealStore.getState();

  const idToDelete = historyMeal?.idMeal ?? currentMeal?.idMeal;

  if (!idToDelete) return;

  mealStore.removeHistory(idToDelete);

  setButtonActionsStyles();

  setAlert(
    `${currentMeal?.strMeal ?? "Meal"} has been removed from favorites.`,
    "success"
  );
};

const handleSearchMeal = async (
  e: SubmitEvent,
  input: HTMLInputElement
): Promise<void> => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) {
    setAlert("You must enter a valid name.", "error");
    return;
  }

  const mealByName = await mealsService.getMealByName(value);

  if (!mealByName || mealByName.length === 0) {
    setAlert("There is no meal with the name entered.", "error");
    return;
  }

  const meal = mealByName[0]!;

  if (mealStore.idMealInHistory(meal.idMeal)) {
    setAlert("This meal is already in your favorites.", "error");
    return;
  }

  mealStore.addHistory({
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
  });

  input.value = "";
  setAlert(`${meal.strMeal} has been added to favorites.`, "success");
};

const handleNextMeal = async (): Promise<void> => {
  await onInit();
  setButtonActionsStyles();
};

const onInit = async (): Promise<void> => {
  const meal = await mealsService.getMeal();

  if (meal.length > 0) {
    mealStore.setCurrentMeal(meal[0]!);
    setAlert("New meal successfully obtained.", "success");
  }
};

export const RecipePage = (): Page => {
  void onInit();

  const main = document.createElement("main") as Page;
  main.className =
    "flex flex-col items-center justify-around w-full h-screen p-2";

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

  const handleFormSubmit = (e: SubmitEvent): void => {
    if (inputMeal) {
      void handleSearchMeal(e, inputMeal);
    }
  };

  formSearchMeal?.addEventListener("submit", handleFormSubmit);

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
    onClick: () => {
      void handleNextMeal();
    },
  });

  buttonActions?.append(buttonLikeMeal, buttonDeleteMeal, buttonNextMeal);

  let currentInformationComponent:
    | InformationMealComponent
    | PresentationMealComponent
    | null = null;
  const historyComponents = new Map<string, HistoryMealComponent>();

  const renderInformation = (): void => {
    const { currentMeal, historyMeal } = mealStore.getState();

    const mealInformation =
      main.querySelector<HTMLElement>("#meal-information");

    if (
      currentInformationComponent &&
      "cleanup" in currentInformationComponent
    ) {
      currentInformationComponent.cleanup();
    }

    mealInformation?.replaceChildren();

    if (historyMeal) {
      const informationMeal = InformationMeal({
        instructions: historyMeal.strInstructions,
        name: historyMeal.strMeal,
        thumbUrl: historyMeal.strMealThumb,
      });

      currentInformationComponent = informationMeal;
      mealInformation?.append(informationMeal);
      return;
    }

    if (currentMeal) {
      const presentationMeal = PresentationMeal({
        name: currentMeal.strMeal,
        thumbUrl: currentMeal.strMealThumb,
      });

      currentInformationComponent = presentationMeal;
      mealInformation?.append(presentationMeal);
    }
  };

  const renderMealHistories = (): void => {
    const { historiesMeal } = mealStore.getState();

    const historiesElement = main.querySelector<HTMLElement>("#histories");

    historyComponents.forEach((component) => {
      component.cleanup?.();
    });
    historyComponents.clear();

    historiesElement?.replaceChildren();

    historiesMeal.forEach((hm) => {
      const historyMeal = HistoryMeal({
        id: hm.idMeal,
        name: hm.strMeal,
        thumbUrl: hm.strMealThumb,
        onClick: (e) => {
          void handleHistoryClick(e, hm.idMeal);
        },
      });

      historyComponents.set(hm.idMeal, historyMeal);
      historiesElement?.append(historyMeal);
    });
  };

  renderInformation();
  renderMealHistories();

  const unsubscribeCurrentMeal = mealStore.subscribe(
    "currentMeal",
    renderInformation
  );
  const unsubscribeHistoryMeal = mealStore.subscribe(
    "historyMeal",
    renderInformation
  );
  const unsubscribeHistoriesMeal = mealStore.subscribe(
    "historiesMeal",
    renderMealHistories
  );

  main.cleanup = (): void => {
    formSearchMeal?.removeEventListener("submit", handleFormSubmit);

    unsubscribeCurrentMeal();
    unsubscribeHistoryMeal();
    unsubscribeHistoriesMeal();

    buttonLikeMeal.cleanup?.();
    buttonDeleteMeal.cleanup?.();
    buttonNextMeal.cleanup?.();

    if (
      currentInformationComponent &&
      "cleanup" in currentInformationComponent
    ) {
      currentInformationComponent.cleanup();
    }

    historyComponents.forEach((component) => {
      component.cleanup?.();
    });
    historyComponents.clear();

    clearAlert();
  };

  return main;
};
