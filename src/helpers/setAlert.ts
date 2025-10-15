let timeout: NodeJS.Timeout | null;

export const setAlert = (message: string, type: string): void => {
  const alertElement = document.querySelector<HTMLDivElement>("#alert");
  const alertH2 = document.querySelector<HTMLDivElement>("#alert-text");

  if (timeout) clearTimeout(timeout);

  alertElement!.classList.remove("opacity-0");
  alertElement!.classList.add(
    "opacity-100",
    type === "success" ? "bg-success" : "bg-red-600"
  );
  alertH2!.textContent = message;

  timeout = setTimeout(() => {
    alertElement!.classList.add("opacity-0");
    alertElement!.classList.remove("opacity-100", "bg-success", "bg-red-600");
    alertH2!.textContent = "";
  }, 2000);
};
