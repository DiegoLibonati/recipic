import { PresentationMealProps } from "@src/entities/props";

import { PresentationMeal } from "@src/components/PresentationMeal/PresentationMeal";

type RenderComponent = {
  props: PresentationMealProps;
  container: HTMLImageElement;
};

const renderComponent = (
  name: string,
  thumbUrl: string
): RenderComponent => {
  const props: PresentationMealProps = {
    name: name,
    thumbUrl: thumbUrl,
  };

  const container = PresentationMeal({
    name: props.name,
    thumbUrl: props.thumbUrl,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("PresentationMeal.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const props = {
      name: "Test Meal",
      thumbUrl: "https://example.com/meal.jpg",
    };

    test("It should create an img element", () => {
      const { container } = renderComponent(props.name, props.thumbUrl);

      expect(container).toBeInstanceOf(HTMLImageElement);
    });

    test("It should have correct src attribute", () => {
      const { container } = renderComponent(props.name, props.thumbUrl);

      expect(container.src).toBe(props.thumbUrl);
    });

    test("It should have correct alt attribute", () => {
      const { container } = renderComponent(props.name, props.thumbUrl);

      expect(container.alt).toBe(props.name);
    });

    test("It should have correct styling classes", () => {
      const { container } = renderComponent(props.name, props.thumbUrl);

      expect(container.className).toBe(
        "w-full h-full rounded-lg object-cover"
      );
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty name", () => {
      const { container } = renderComponent(
        "",
        "https://example.com/meal.jpg"
      );

      expect(container.alt).toBe("");
    });

    test("It should handle different image URLs", () => {
      const url = "https://cdn.example.com/images/meal-thumbnail.png";
      const { container } = renderComponent("Pizza", url);

      expect(container.src).toBe(url);
    });

    test("It should handle special characters in name", () => {
      const specialName = "Meal with <special> & 'characters'";
      const { container } = renderComponent(
        specialName,
        "https://example.com/meal.jpg"
      );

      expect(container.alt).toBe(specialName);
    });
  });
});