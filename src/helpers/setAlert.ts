import { getElements } from "./getElements";

let timeout: NodeJS.Timeout | null;

export const setAlert = (message: string, type: string): void => {
  const { alert, alertHeading } = getElements();

  if (timeout) clearTimeout(timeout);

  alert.classList.remove("opacity-0");
  alert.classList.add(
    "opacity-100",
    type === "success" ? "bg-success" : "bg-red-600"
  );
  alertHeading.textContent = message;

  timeout = setTimeout(() => {
    alert.classList.add("opacity-0");
    alert.classList.remove("opacity-100", "bg-success", "bg-red-600");
    alertHeading.textContent = "";
  }, 2000);
};
