import { setAlert, clearAlert } from "@/helpers/setAlert";

describe("setAlert and clearAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    const alertElement = document.createElement("div");
    alertElement.id = "alert";
    alertElement.className = "opacity-0";

    const alertText = document.createElement("div");
    alertText.id = "alert-text";

    document.body.appendChild(alertElement);
    document.body.appendChild(alertText);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("setAlert", () => {
    it("should display success alert", () => {
      setAlert("Success message", "success");

      const alertElement = document.querySelector<HTMLDivElement>("#alert");
      const alertText = document.querySelector<HTMLDivElement>("#alert-text");

      expect(alertElement).toHaveClass("opacity-100", "bg-success");
      expect(alertElement).not.toHaveClass("opacity-0");
      expect(alertText?.textContent).toBe("Success message");
    });

    it("should display error alert", () => {
      setAlert("Error message", "error");

      const alertElement = document.querySelector<HTMLDivElement>("#alert");
      const alertText = document.querySelector<HTMLDivElement>("#alert-text");

      expect(alertElement).toHaveClass("opacity-100", "bg-red-600");
      expect(alertElement).not.toHaveClass("opacity-0");
      expect(alertText?.textContent).toBe("Error message");
    });

    it("should hide alert after timeout", () => {
      setAlert("Test message", "success");

      const alertElement = document.querySelector<HTMLDivElement>("#alert");
      expect(alertElement).toHaveClass("opacity-100");

      jest.advanceTimersByTime(2000);

      expect(alertElement).toHaveClass("opacity-0");
      expect(alertElement).not.toHaveClass("opacity-100", "bg-success");
    });

    it("should replace previous alert", () => {
      setAlert("First message", "success");

      const alertElement = document.querySelector<HTMLDivElement>("#alert");

      expect(alertElement).toHaveClass("bg-success");

      setAlert("Second message", "error");

      const alertText = document.querySelector<HTMLDivElement>("#alert-text");

      expect(alertText?.textContent).toBe("Second message");
      expect(alertElement).toHaveClass("bg-red-600");
      expect(alertElement).toHaveClass("bg-success", "bg-red-600");
    });

    it("should not throw error when alert elements do not exist", () => {
      document.body.innerHTML = "";

      expect(() => {
        setAlert("Test message", "success");
      }).not.toThrow();
    });
  });

  describe("clearAlert", () => {
    it("should clear alert message and classes", () => {
      setAlert("Test message", "success");

      const alertElement = document.querySelector<HTMLDivElement>("#alert");
      const alertText = document.querySelector<HTMLDivElement>("#alert-text");

      clearAlert();

      expect(alertElement).toHaveClass("opacity-0");
      expect(alertElement).not.toHaveClass(
        "opacity-100",
        "bg-success",
        "bg-red-600"
      );
      expect(alertText?.textContent).toBe("");
    });

    it("should clear timeout when clearing alert", () => {
      const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

      setAlert("Test message", "success");
      clearAlert();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });

    it("should not throw error when alert elements do not exist", () => {
      document.body.innerHTML = "";

      expect(() => {
        clearAlert();
      }).not.toThrow();
    });
  });
});
