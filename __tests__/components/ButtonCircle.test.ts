import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonCircleProps } from "@/types/props";
import type { ButtonCircleComponent } from "@/types/components";

import ButtonCircle from "@/components/ButtonCircle/ButtonCircle";

const renderComponent = (props: ButtonCircleProps): ButtonCircleComponent => {
  const container = ButtonCircle(props);
  document.body.appendChild(container);
  return container;
};

describe("ButtonCircle Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ButtonCircleProps = {
    id: "test-button",
    ariaLabel: "Test button",
    children: '<i class="fa fa-heart"></i>',
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("rounded-full");
  });

  it("should render with custom className", () => {
    const propsWithClass: ButtonCircleProps = {
      ...defaultProps,
      className: "bg-red-600",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveClass("rounded-full", "bg-red-600");
  });

  it("should render as disabled when disabled prop is true", () => {
    const disabledProps: ButtonCircleProps = {
      ...defaultProps,
      disabled: true,
    };

    renderComponent(disabledProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeDisabled();
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should render as submit button when type is submit", () => {
    const submitProps: ButtonCircleProps = {
      ...defaultProps,
      type: "submit",
    };

    renderComponent(submitProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should not add event listener for submit button", () => {
    const submitProps: ButtonCircleProps = {
      ...defaultProps,
      type: "submit",
    };

    const button = renderComponent(submitProps);
    expect(button.cleanup).toBeUndefined();
  });

  it("should cleanup event listener for button type", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", { name: "Test button" });
    await user.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
