import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { HistoryMealProps } from "@/types/props";
import type { HistoryMealComponent } from "@/types/components";

import HistoryMeal from "@/components/HistoryMeal/HistoryMeal";

const renderComponent = (props: HistoryMealProps): HistoryMealComponent => {
  const container = HistoryMeal(props);
  document.body.appendChild(container);
  return container;
};

describe("HistoryMeal Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: HistoryMealProps = {
    id: "meal-123",
    name: "Spaghetti Carbonara",
    thumbUrl: "https://example.com/image.jpg",
    onClick: mockOnClick,
  };

  it("should render with correct structure", () => {
    renderComponent(defaultProps);

    const container = document.querySelector<HTMLDivElement>(".h-12");
    expect(container).toBeInTheDocument();
  });

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Spaghetti Carbonara");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("id", "meal-123");
  });

  it("should call onClick with event and id when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const container = document.querySelector<HTMLDivElement>(".h-12");
    if (container) await user.click(container);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      "meal-123"
    );
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const component = renderComponent(defaultProps);

    component.cleanup?.();

    const container = document.querySelector<HTMLDivElement>(".h-12");
    if (container) await user.click(container);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
