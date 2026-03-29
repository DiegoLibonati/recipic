import type { InformationMealProps } from "@/types/props";
import type { InformationMealComponent } from "@/types/components";

import { setButtonActionsStyles } from "@/helpers/setButtonActionsStyles";

import { mealStore } from "@/stores/mealStore";

const handleClickCloseInformation = (): void => {
  mealStore.setHistoryMeal(null);
  setButtonActionsStyles();
};

const InformationMeal = ({
  name,
  thumbUrl,
  instructions,
}: InformationMealProps): InformationMealComponent => {
  const divRoot = document.createElement("div") as InformationMealComponent;
  divRoot.className = "relative w-full h-full";

  divRoot.innerHTML = `
    <div class="flex items-center justify-center relative w-full h-[30%]">
        <h2 class="absolute z-[100] text-white text-lg font-semibold truncate w-[75%] text-center">${name}</h2>
        <img class="absolute w-full rounded-lg h-full object-cover" src="${thumbUrl}" alt="${name}">
    </div> 

    <p class="w-full h-[70%] overflow-auto text-justify pt-[.5rem]">${instructions}</p>

    <button class="absolute top-1 right-1 h-12 w-12 bg-primary rounded-full text-white text-base cursor-pointer active:scale-75 transition-all" type="button" id="close-information">
        <i class="fa fa-x" aria-hidden="true"></i>
    </button>
  `;

  const buttonCloseInformation =
    divRoot.querySelector<HTMLButtonElement>("#close-information");

  const handleButtonClick = (): void => {
    handleClickCloseInformation();
  };

  buttonCloseInformation?.addEventListener("click", handleButtonClick);

  divRoot.cleanup = (): void => {
    buttonCloseInformation?.removeEventListener("click", handleButtonClick);
  };

  return divRoot;
};

export default InformationMeal;
