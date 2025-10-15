import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { InformationMealProps } from "@src/entities/props";
import { InformationMeal } from "@src/components/InformationMeal/InformationMeal";

import { mealStore } from "@src/stores/mealStore";
import { setButtonActionsStyles } from "@src/helpers/setButtonActionsStyles";

jest.mock("@src/stores/mealStore", () => ({
  mealStore: {
    setHistoryMeal: jest.fn(),
  },
}));

jest.mock("@src/helpers/setButtonActionsStyles", () => ({
  setButtonActionsStyles: jest.fn(),
}));

type RenderComponent = {
  props: InformationMealProps;
  container: HTMLDivElement;
};

const renderComponent = (
  name: string,
  thumbUrl: string,
  instructions: string
): RenderComponent => {
  const props: InformationMealProps = {
    name: name,
    thumbUrl: thumbUrl,
    instructions: instructions,
  };

  const container = InformationMeal({
    name: props.name,
    thumbUrl: props.thumbUrl,
    instructions: props.instructions,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("InformationMeal.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    const props = {
      name: "Test Meal",
      thumbUrl: "https://example.com/meal.jpg",
      instructions: "Step 1: Cook the meal. Step 2: Enjoy!",
    };

    test("It should create a div element with correct structure", () => {
      const { container } = renderComponent(
        props.name,
        props.thumbUrl,
        props.instructions
      );

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.querySelector("h2")).toBeInTheDocument();
      expect(container.querySelector("img")).toBeInTheDocument();
      expect(container.querySelector("p")).toBeInTheDocument();
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    test("It should render meal name correctly", () => {
      const { container } = renderComponent(
        props.name,
        props.thumbUrl,
        props.instructions
      );

      const heading = container.querySelector("h2");

      expect(heading?.textContent).toBe(props.name);
    });

    test("It should render image with correct attributes", () => {
      const { container } = renderComponent(
        props.name,
        props.thumbUrl,
        props.instructions
      );

      const img = container.querySelector("img");

      expect(img?.src).toBe(props.thumbUrl);
      expect(img?.alt).toBe(props.name);
    });

    test("It should render instructions correctly", () => {
      const { container } = renderComponent(
        props.name,
        props.thumbUrl,
        props.instructions
      );

      const paragraph = container.querySelector("p");

      expect(paragraph?.textContent).toBe(props.instructions);
    });

    test("It should render close button with correct id", () => {
      renderComponent(props.name, props.thumbUrl, props.instructions);

      const button = screen.getByRole("button") as HTMLButtonElement;

      expect(button.id).toBe("close-information");
      expect(button.type).toBe("button");
    });
  });

  describe("Click interactions", () => {
    test("It should call mealStore.setHistoryMeal with null when close button is clicked", async () => {
      renderComponent("Pasta", "https://example.com/pasta.jpg", "Cook pasta");

      const button = screen.getByRole("button");

      await user.click(button);

      expect(mealStore.setHistoryMeal).toHaveBeenCalledWith(null);
      expect(mealStore.setHistoryMeal).toHaveBeenCalledTimes(1);
    });

    test("It should call setButtonActionsStyles when close button is clicked", async () => {
      renderComponent("Pizza", "https://example.com/pizza.jpg", "Make pizza");

      const button = screen.getByRole("button");

      await user.click(button);

      expect(setButtonActionsStyles).toHaveBeenCalledTimes(1);
    });

    test("It should call both functions when clicked", async () => {
      renderComponent(
        "Burger",
        "https://example.com/burger.jpg",
        "Grill burger"
      );

      const button = screen.getByRole("button");

      await user.click(button);

      expect(mealStore.setHistoryMeal).toHaveBeenCalled();
      expect(setButtonActionsStyles).toHaveBeenCalled();
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty instructions", () => {
      const { container } = renderComponent(
        "Test Meal",
        "https://example.com/meal.jpg",
        ""
      );

      const paragraph = container.querySelector("p");

      expect(paragraph?.textContent).toBe("");
    });

    test("It should handle long instructions with overflow", () => {
      const longInstructions = "Step ".repeat(100);
      const { container } = renderComponent(
        "Complex Meal",
        "https://example.com/meal.jpg",
        longInstructions
      );

      const paragraph = container.querySelector("p");

      expect(paragraph?.className).toContain("overflow-auto");
    });

    test("It should handle special characters in name", () => {
      const specialName = "Meal with special & 'characters'";
      const { container } = renderComponent(
        specialName,
        "https://example.com/meal.jpg",
        "Instructions"
      );

      const heading = container.querySelector("h2");

      expect(heading?.textContent).toBe(specialName);
    });
  });
});
