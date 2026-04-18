import { screen } from "@testing-library/dom";

import type { PresentationMealProps } from "@/types/props";

import PresentationMeal from "@/components/PresentationMeal/PresentationMeal";

const defaultProps: PresentationMealProps = {
  name: "Boulangère Potatoes",
  thumbUrl: "https://example.com/thumb.jpg",
};

const renderComponent = (
  props: Partial<PresentationMealProps> = {}
): HTMLImageElement => {
  const element = PresentationMeal({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("PresentationMeal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render an img element", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should set the src attribute", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://example.com/thumb.jpg"
      );
    });

    it("should set the alt attribute to the meal name", () => {
      renderComponent();
      expect(
        screen.getByRole("img", { name: "Boulangère Potatoes" })
      ).toBeInTheDocument();
    });

    it("should apply base classes", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveClass(
        "w-full",
        "h-full",
        "rounded-lg",
        "object-cover"
      );
    });

    it("should reflect a custom name in the alt attribute", () => {
      renderComponent({ name: "Home-made Mandazi" });
      expect(
        screen.getByRole("img", { name: "Home-made Mandazi" })
      ).toBeInTheDocument();
    });

    it("should reflect a custom src", () => {
      renderComponent({ thumbUrl: "https://other.com/image.jpg" });
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://other.com/image.jpg"
      );
    });
  });
});
