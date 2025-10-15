import { RecipePage } from "@src/pages/RecipePage/RecipePage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const recipePage = RecipePage();
  app.appendChild(recipePage);
};

document.addEventListener("DOMContentLoaded", onInit);
