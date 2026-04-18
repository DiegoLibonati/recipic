import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonCircleProps } from "@/types/props";
import type { ButtonCircleComponent } from "@/types/components";

import ButtonCircle from "@/components/ButtonCircle/ButtonCircle";

const mockOnClick = jest.fn();

const defaultProps: ButtonCircleProps = {
  id: "test-button",
  ariaLabel: "Test button",
  children: "Click me",
  className: "bg-red-600",
  type: "button",
  disabled: false,
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<ButtonCircleProps> = {}
): ButtonCircleComponent => {
  const element = ButtonCircle({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

const renderComponentWithProps = (
  props: ButtonCircleProps
): ButtonCircleComponent => {
  const element = ButtonCircle(props);
  document.body.appendChild(element);
  return element;
};

describe("ButtonCircle", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "test-button");
    });

    it("should set the aria-label attribute", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Test button" })
      ).toBeInTheDocument();
    });

    it("should render children as innerHTML", () => {
      renderComponent({ children: "Click me" });
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("should apply the custom className", () => {
      renderComponent({ className: "bg-red-600" });
      expect(screen.getByRole("button")).toHaveClass("bg-red-600");
    });

    it("should apply base classes", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass(
        "rounded-full",
        "h-14",
        "w-14",
        "text-white"
      );
    });

    it("should be disabled when disabled prop is true", () => {
      renderComponent({ disabled: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should not be disabled when disabled prop is false", () => {
      renderComponent({ disabled: false });
      expect(screen.getByRole("button")).not.toBeDisabled();
    });

    it("should default type to button when not provided", () => {
      renderComponentWithProps({ id: "test-button", ariaLabel: "Test button" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should set the correct type when provided", () => {
      renderComponent({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should render empty innerHTML when children is not provided", () => {
      renderComponentWithProps({ id: "test-button", ariaLabel: "Test button" });
      expect(screen.getByRole("button")).toHaveTextContent("");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not attach click listener when type is submit", async () => {
      const user = userEvent.setup();
      renderComponent({ type: "submit" });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should not attach click listener when onClick is not provided", async () => {
      const user = userEvent.setup();
      renderComponentWithProps({
        id: "test-button",
        ariaLabel: "Test button",
        type: "button",
      });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("cleanup", () => {
    it("should have a cleanup method when type is button and onClick is provided", () => {
      const element = renderComponent();
      expect(element.cleanup).toBeDefined();
    });

    it("should not have a cleanup method when type is submit", () => {
      const element = renderComponent({ type: "submit" });
      expect(element.cleanup).toBeUndefined();
    });

    it("should not have a cleanup method when onClick is not provided", () => {
      const element = renderComponentWithProps({
        id: "test-button",
        ariaLabel: "Test button",
        type: "button",
      });
      expect(element.cleanup).toBeUndefined();
    });

    it("should remove click listener after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup!();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
