import "@/index.css";
import RecipicPage from "@/pages/RecipicPage/RecipicPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const recipicPage = RecipicPage();
  app.appendChild(recipicPage);
};

document.addEventListener("DOMContentLoaded", onInit);
