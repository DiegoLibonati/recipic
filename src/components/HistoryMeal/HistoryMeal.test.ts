import user from "@testing-library/user-event";

import { HistoryMealProps } from "@src/entities/props";

import { HistoryMeal } from "@src/components/HistoryMeal/HistoryMeal";

type RenderComponent = {
  props: { onClick: jest.Mock } & HistoryMealProps;
  container: HTMLDivElement;
};

const renderComponent = (
  id: string,
  name: string,
  thumbUrl: string,
  onClick?: jest.Mock
): RenderComponent => {
  const props = {
    id: id,
    name: name,
    thumbUrl: thumbUrl,
    onClick: onClick ?? jest.fn(),
  };

  const container = HistoryMeal({
    id: props.id,
    name: props.name,
    thumbUrl: props.thumbUrl,
    onClick: props.onClick,
  });

  document.body.appendChild(container);

  return {
    props: props,
    container: container,
  };
};

describe("HistoryMeal.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const props = {
      id: "meal-123",
      name: "Test Meal",
      thumbUrl: "https://example.com/meal.jpg",
    };

    test("It should create a div element with correct structure", () => {
      const { container } = renderComponent(
        props.id,
        props.name,
        props.thumbUrl
      );

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(
        container.querySelector<HTMLImageElement>("img")
      ).toBeInTheDocument();
    });

    test("It should render image with correct attributes", () => {
      const { container } = renderComponent(
        props.id,
        props.name,
        props.thumbUrl
      );

      const img = container.querySelector<HTMLImageElement>("img");

      expect(img?.id).toBe(props.id);
      expect(img?.src).toBe(props.thumbUrl);
      expect(img?.alt).toBe(props.name);
    });

    test("It should have correct base styling classes", () => {
      const { container } = renderComponent(
        props.id,
        props.name,
        props.thumbUrl
      );

      expect(container.className).toContain("rounded-full");
      expect(container.className).toContain("bg-primary");
      expect(container.className).toContain("cursor-pointer");
      expect(container.className).toContain("active:scale-75");
      expect(container.className).toContain("transition-all");
    });

    test("It should have correct image styling classes", () => {
      const { container } = renderComponent(
        props.id,
        props.name,
        props.thumbUrl
      );

      const img = container.querySelector<HTMLImageElement>("img");

      expect(img?.className).toContain("w-full");
      expect(img?.className).toContain("h-full");
      expect(img?.className).toContain("rounded-full");
      expect(img?.className).toContain("object-cover");
    });
  });

  describe("Click interactions", () => {
    test("It should call onClick handler with event and id when clicked", async () => {
      const mockOnClick = jest.fn();
      const { container } = renderComponent(
        "meal-456",
        "Pasta",
        "https://example.com/pasta.jpg",
        mockOnClick
      );

      await user.click(container);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "meal-456"
      );
    });

    test("It should call onClick multiple times with correct id", async () => {
      const mockOnClick = jest.fn();
      const { container } = renderComponent(
        "meal-789",
        "Pizza",
        "https://example.com/pizza.jpg",
        mockOnClick
      );

      await user.click(container);
      await user.click(container);

      expect(mockOnClick).toHaveBeenCalledTimes(2);
      expect(mockOnClick).toHaveBeenNthCalledWith(
        1,
        expect.any(MouseEvent),
        "meal-789"
      );
      expect(mockOnClick).toHaveBeenNthCalledWith(
        2,
        expect.any(MouseEvent),
        "meal-789"
      );
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty name", () => {
      const { container } = renderComponent(
        "meal-empty",
        "",
        "https://example.com/meal.jpg"
      );

      const img = container.querySelector<HTMLImageElement>("img");

      expect(img?.alt).toBe("");
    });

    test("It should handle different image URLs", () => {
      const url = "https://cdn.example.com/images/meal-thumbnail.png";
      const { container } = renderComponent("meal-001", "Burger", url);

      const img = container.querySelector<HTMLImageElement>("img");

      expect(img?.src).toBe(url);
    });
  });
});
