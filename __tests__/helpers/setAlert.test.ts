import { setAlert, clearAlert } from "@/helpers/setAlert";

const setupAlertDOM = (): {
  alertElement: HTMLDivElement;
  alertH2: HTMLDivElement;
} => {
  const alertElement = document.createElement("div");
  alertElement.id = "alert";
  alertElement.classList.add("opacity-0");

  const alertH2 = document.createElement("div");
  alertH2.id = "alert-text";

  document.body.appendChild(alertElement);
  document.body.appendChild(alertH2);

  return { alertElement, alertH2 };
};

describe("setAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("when DOM elements are missing", () => {
    it("should not throw when #alert does not exist", () => {
      expect(() => {
        setAlert("Test", "success");
      }).not.toThrow();
    });

    it("should not throw when only #alert exists without #alert-text", () => {
      const alertElement = document.createElement("div");
      alertElement.id = "alert";
      document.body.appendChild(alertElement);
      expect(() => {
        setAlert("Test", "success");
      }).not.toThrow();
    });
  });

  describe("success type", () => {
    it("should remove opacity-0 class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Success message", "success");
      expect(alertElement).not.toHaveClass("opacity-0");
    });

    it("should add opacity-100 class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Success message", "success");
      expect(alertElement).toHaveClass("opacity-100");
    });

    it("should add bg-success class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Success message", "success");
      expect(alertElement).toHaveClass("bg-success");
    });

    it("should set the message text content", () => {
      const { alertH2 } = setupAlertDOM();
      setAlert("Success message", "success");
      expect(alertH2).toHaveTextContent("Success message");
    });

    it("should hide the alert after 2 seconds", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Success message", "success");
      jest.advanceTimersByTime(2000);
      expect(alertElement).toHaveClass("opacity-0");
      expect(alertElement).not.toHaveClass("opacity-100");
    });

    it("should clear the message text after 2 seconds", () => {
      const { alertH2 } = setupAlertDOM();
      setAlert("Success message", "success");
      jest.advanceTimersByTime(2000);
      expect(alertH2).toHaveTextContent("");
    });

    it("should remove bg-success class after 2 seconds", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Success message", "success");
      jest.advanceTimersByTime(2000);
      expect(alertElement).not.toHaveClass("bg-success");
    });
  });

  describe("error type", () => {
    it("should add bg-red-600 class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Error message", "error");
      expect(alertElement).toHaveClass("bg-red-600");
    });

    it("should not add bg-success class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Error message", "error");
      expect(alertElement).not.toHaveClass("bg-success");
    });

    it("should set the error message text content", () => {
      const { alertH2 } = setupAlertDOM();
      setAlert("Error message", "error");
      expect(alertH2).toHaveTextContent("Error message");
    });

    it("should remove bg-red-600 after 2 seconds", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Error message", "error");
      jest.advanceTimersByTime(2000);
      expect(alertElement).not.toHaveClass("bg-red-600");
    });
  });

  describe("multiple consecutive calls", () => {
    it("should reset the timer when called a second time before the first expires", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("First message", "success");
      jest.advanceTimersByTime(1000);
      setAlert("Second message", "success");
      jest.advanceTimersByTime(1500);
      expect(alertElement).toHaveClass("opacity-100");
      jest.advanceTimersByTime(500);
      expect(alertElement).toHaveClass("opacity-0");
    });

    it("should display the latest message when called multiple times", () => {
      const { alertH2 } = setupAlertDOM();
      setAlert("First message", "success");
      setAlert("Second message", "error");
      expect(alertH2).toHaveTextContent("Second message");
    });
  });

  describe("clearAlert", () => {
    it("should add opacity-0 class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Test", "success");
      clearAlert();
      expect(alertElement).toHaveClass("opacity-0");
    });

    it("should remove opacity-100 class", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Test", "success");
      clearAlert();
      expect(alertElement).not.toHaveClass("opacity-100");
    });

    it("should clear the message text", () => {
      const { alertH2 } = setupAlertDOM();
      setAlert("Test message", "success");
      clearAlert();
      expect(alertH2).toHaveTextContent("");
    });

    it("should cancel the pending hide timeout", () => {
      const { alertElement } = setupAlertDOM();
      setAlert("Test", "success");
      clearAlert();
      jest.advanceTimersByTime(2000);
      expect(alertElement).toHaveClass("opacity-0");
      expect(alertElement).not.toHaveClass("opacity-100");
    });

    it("should not throw when called without a prior setAlert", () => {
      setupAlertDOM();
      expect(() => {
        clearAlert();
      }).not.toThrow();
    });

    it("should not throw when DOM elements are missing", () => {
      expect(() => {
        clearAlert();
      }).not.toThrow();
    });
  });
});
