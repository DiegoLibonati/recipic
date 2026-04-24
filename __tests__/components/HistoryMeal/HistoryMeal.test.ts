import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { HistoryMealProps } from "@/types/props";
import type { HistoryMealComponent } from "@/types/components";

import HistoryMeal from "@/components/HistoryMeal/HistoryMeal";

const mockOnClick = jest.fn();

const defaultProps: HistoryMealProps = {
  id: "meal-1",
  name: "Boulangère Potatoes",
  thumbUrl: "https://example.com/thumb.jpg",
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<HistoryMealProps> = {}
): HistoryMealComponent => {
  const element = HistoryMeal({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("HistoryMeal", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render an image with the correct src", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "https://example.com/thumb.jpg"
      );
    });

    it("should render an image with the correct alt text", () => {
      renderComponent();
      expect(
        screen.getByRole("img", { name: "Boulangère Potatoes" })
      ).toBeInTheDocument();
    });

    it("should set the img id to the provided id", () => {
      renderComponent();
      expect(screen.getByRole("img")).toHaveAttribute("id", "meal-1");
    });

    it("should apply base classes to the container div", () => {
      const element = renderComponent();
      expect(element).toHaveClass("rounded-full", "cursor-pointer");
    });
  });

  describe("behavior", () => {
    it("should call onClick when the component is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("img"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick with the event and the id", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("img"));
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "meal-1"
      );
    });
  });

  describe("cleanup", () => {
    it("should have a cleanup method", () => {
      const element = renderComponent();
      expect(element.cleanup).toBeDefined();
    });

    it("should remove click listener after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup!();
      await user.click(screen.getByRole("img"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
