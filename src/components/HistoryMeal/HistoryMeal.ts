import type { HistoryMealComponent } from "@/types/components";
import type { HistoryMealProps } from "@/types/props";

export const HistoryMeal = ({
  id,
  name,
  thumbUrl,
  onClick,
}: HistoryMealProps): HistoryMealComponent => {
  const divRoot = document.createElement("div") as HistoryMealComponent;
  divRoot.className =
    "h-12 w-12 rounded-full p-1 bg-primary cursor-pointer active:scale-75 transition-all ml-[.5rem] md:h-16 md:w-16";

  divRoot.innerHTML = `
    <img id="${id}" src="${thumbUrl}" alt="${name}" class="w-full h-full rounded-full object-cover">
  `;

  const handleClick = (e: MouseEvent): void => {
    onClick(e, id);
  };

  divRoot.addEventListener("click", handleClick);

  divRoot.cleanup = (): void => {
    divRoot.removeEventListener("click", handleClick);
  };

  return divRoot;
};
