import { PresentationMealProps } from "@src/entities/props";

export const PresentationMeal = ({
  name,
  thumbUrl,
}: PresentationMealProps): HTMLImageElement => {
  const img = document.createElement("img");

  img.className = "w-full h-full rounded-lg object-cover";
  img.src = thumbUrl;
  img.alt = name;

  return img;
};
