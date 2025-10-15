import { InformationMealProps } from "@src/entities/props";

import { setButtonActionsStyles } from "@src/helpers/setButtonActionsStyles";

import { mealStore } from "@src/stores/mealStore";

const handleClickCloseInformation = () => {
  mealStore.setHistoryMeal(null);

  setButtonActionsStyles();
};

export const InformationMeal = ({
  name,
  thumbUrl,
  instructions,
}: InformationMealProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = "relative w-full h-full";

  divRoot.innerHTML = `
    <div class="flex items-center justify-center relative w-full h-[30%]">
        <h2 class="absolute z-[100] text-white text-lg font-semibold truncate w-[75%] text-center">${name}</h2>
        <img class="absolute w-full rounded-lg h-full object-cover" src="${thumbUrl}" alt="${name}"></img>
    </div> 

    <p class="w-full h-[70%] overflow-auto text-justify pt-[.5rem]">${instructions}</p>

    <button class="absolute top-1 right-1 h-12 w-12 bg-primary rounded-full text-white text-base cursor-pointer active:scale-75 transition-all" type="button" id="close-information">
        <i class="fa fa-x" aria-hidden="true"></i>
    </button>
  `;

  const buttonCloseInformation =
    divRoot.querySelector<HTMLButtonElement>("#close-information");

  buttonCloseInformation?.addEventListener("click", () =>
    handleClickCloseInformation()
  );

  return divRoot;
};
