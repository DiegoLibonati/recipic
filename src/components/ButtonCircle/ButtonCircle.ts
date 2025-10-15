import { ButtonCircleProps } from "@src/entities/props";

export const ButtonCircle = ({
  id,
  ariaLabel,
  children,
  className,
  type,
  disabled,
  onClick,
}: ButtonCircleProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = `rounded-full h-14 w-14 text-white text-lg active:scale-75 transition-all ${
    className ?? ""
  }`;
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.disabled = disabled ?? false;
  button.innerHTML = children ?? "";
  button.type = type ?? "button";

  if (button.type === "button" && onClick)
    button.addEventListener("click", onClick);

  return button;
};
