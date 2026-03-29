import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { InformationMealProps } from "@/types/props";
import type { InformationMealComponent } from "@/types/components";

import InformationMeal from "@/components/InformationMeal/InformationMeal";

import { mealStore } from "@/stores/mealStore";

const renderComponent = (
  props: InformationMealProps
): InformationMealComponent => {
  const container = InformationMeal(props);
  document.body.appendChild(container);
  return container;
};

describe("InformationMeal Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  const defaultProps: InformationMealProps = {
    name: "Spaghetti Carbonara",
    thumbUrl: "https://example.com/image.jpg",
    instructions: "Cook pasta. Add sauce. Enjoy!",
  };

  it("should render with correct structure", () => {
    renderComponent(defaultProps);

    const container = document.querySelector<HTMLDivElement>(".relative");
    expect(container).toBeInTheDocument();
  });

  it("should render meal name", () => {
    renderComponent(defaultProps);

    expect(screen.getByText("Spaghetti Carbonara")).toBeInTheDocument();
  });

  it("should render meal image", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Spaghetti Carbonara");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("should render instructions", () => {
    renderComponent(defaultProps);

    expect(
      screen.getByText("Cook pasta. Add sauce. Enjoy!")
    ).toBeInTheDocument();
  });

  it("should render close button", () => {
    renderComponent(defaultProps);

    const closeButton =
      document.querySelector<HTMLButtonElement>("#close-information");
    expect(closeButton).toBeInTheDocument();
  });

  it("should call setHistoryMeal(null) when close button is clicked", async () => {
    const user = userEvent.setup();
    const setHistoryMealSpy = jest.spyOn(mealStore, "setHistoryMeal");

    renderComponent(defaultProps);

    const closeButton =
      document.querySelector<HTMLButtonElement>("#close-information");
    if (closeButton) await user.click(closeButton);

    expect(setHistoryMealSpy).toHaveBeenCalledWith(null);

    setHistoryMealSpy.mockRestore();
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const setHistoryMealSpy = jest.spyOn(mealStore, "setHistoryMeal");

    const component = renderComponent(defaultProps);
    component.cleanup?.();

    const closeButton =
      document.querySelector<HTMLButtonElement>("#close-information");
    if (closeButton) await user.click(closeButton);

    expect(setHistoryMealSpy).not.toHaveBeenCalled();

    setHistoryMealSpy.mockRestore();
  });
});
