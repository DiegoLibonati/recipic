import { screen } from "@testing-library/dom";

import type { PresentationMealProps } from "@/types/props";
import type { PresentationMealComponent } from "@/types/components";

import PresentationMeal from "@/components/PresentationMeal/PresentationMeal";

const renderComponent = (
  props: PresentationMealProps
): PresentationMealComponent => {
  const container = PresentationMeal(props);
  document.body.appendChild(container);
  return container;
};

describe("PresentationMeal Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: PresentationMealProps = {
    name: "Spaghetti Carbonara",
    thumbUrl: "https://example.com/image.jpg",
  };

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Spaghetti Carbonara");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image.tagName).toBe("IMG");
  });

  it("should have correct CSS classes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Spaghetti Carbonara");
    expect(image).toHaveClass("w-full", "h-full", "rounded-lg", "object-cover");
  });
});
