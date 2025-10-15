import { HistoryMealProps } from "@src/entities/props";

export const HistoryMeal = ({
  id,
  name,
  thumbUrl,
  onClick,
}: HistoryMealProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className =
    "h-12 w-12 rounded-full p-1 bg-primary cursor-pointer active:scale-75 transition-all ml-[.5rem] md:h-16 md:w-16";

  divRoot.innerHTML = `
    <img id="${id}" src="${thumbUrl}" alt="${name}" class="w-full h-full rounded-full object-cover"></img>
  `;

  divRoot.addEventListener("click", (e) => onClick(e, id));

  return divRoot;
};
