import type { PresentationMealComponent } from "@/types/components";
import type { PresentationMealProps } from "@/types/props";

const PresentationMeal = ({
  name,
  thumbUrl,
}: PresentationMealProps): PresentationMealComponent => {
  const img = document.createElement("img");

  img.className = "w-full h-full rounded-lg object-cover";
  img.src = thumbUrl;
  img.alt = name;

  return img;
};

export default PresentationMeal;
