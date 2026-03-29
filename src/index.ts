import "@/index.css";
import RecipePage from "@/pages/RecipePage/RecipePage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const recipePage = RecipePage();
  app.appendChild(recipePage);
};

document.addEventListener("DOMContentLoaded", onInit);
