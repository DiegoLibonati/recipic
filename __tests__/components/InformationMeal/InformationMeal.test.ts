import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { InformationMealProps } from "@/types/props";
import type { InformationMealComponent } from "@/types/components";

import InformationMeal from "@/components/InformationMeal/InformationMeal";

import { mealStore } from "@/stores/mealStore";

import { mockMeal } from "@tests/__mocks__/meal.mock";

const defaultProps: InformationMealProps = {
  name: "Boulangère Potatoes",
  thumbUrl: "https://example.com/thumb.jpg",
  instructions: "Heat oven to 200C and bake for 50-60 mins.",
};

const renderComponent = (
  props: Partial<InformationMealProps> = {}
): InformationMealComponent => {
  const element = InformationMeal({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("InformationMeal", () => {
  beforeEach(() => {
    mealStore.setHistoryMeal(mockMeal);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
    mealStore.setState({
      currentMeal: null,
      historyMeal: null,
      historiesMeal: [],
    });
    localStorage.clear();
  });

  describe("rendering", () => {
    it("should render the meal name in a heading", () => {
      renderComponent();
      expect(
        screen.getByRole("heading", { name: "Boulangère Potatoes" })
      ).toBeInTheDocument();
    });

    it("should render the meal thumbnail image with the correct src", () => {
      renderComponent();
      const images = screen.getAllByRole("img");
      expect(
        images.some(
          (img) => img.getAttribute("src") === "https://example.com/thumb.jpg"
        )
      ).toBe(true);
    });

    it("should render the meal thumbnail image with the correct alt", () => {
      renderComponent();
      const images = screen.getAllByRole("img", {
        name: "Boulangère Potatoes",
      });
      expect(images.length).toBeGreaterThan(0);
    });

    it("should render the instructions text", () => {
      renderComponent();
      expect(
        screen.getByText("Heat oven to 200C and bake for 50-60 mins.")
      ).toBeInTheDocument();
    });

    it("should render a close button", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should set historyMeal to null when the close button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mealStore.getState().historyMeal).toBeNull();
    });
  });

  describe("cleanup", () => {
    it("should have a cleanup method", () => {
      const element = renderComponent();
      expect(element.cleanup).toBeDefined();
    });

    it("should not react to close button click after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup!();
      mealStore.setHistoryMeal(mockMeal);
      await user.click(screen.getByRole("button"));
      expect(mealStore.getState().historyMeal).toEqual(mockMeal);
    });
  });
});
