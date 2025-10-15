import { setAlert } from "@src/helpers/setAlert";

describe("setAlert.ts", () => {
  let alertElement: HTMLDivElement;
  let alertText: HTMLDivElement;

  beforeEach(() => {
    jest.useFakeTimers();

    alertElement = document.createElement("div");
    alertElement.id = "alert";
    alertElement.classList.add("opacity-0");

    alertText = document.createElement("div");
    alertText.id = "alert-text";

    document.body.appendChild(alertElement);
    document.body.appendChild(alertText);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe("General Tests.", () => {
    test("It should show alert with success styling", () => {
      setAlert("Success message", "success");

      expect(alertElement.classList.contains("opacity-100")).toBe(true);
      expect(alertElement.classList.contains("opacity-0")).toBe(false);
      expect(alertElement.classList.contains("bg-success")).toBe(true);
      expect(alertText.textContent).toBe("Success message");
    });

    test("It should show alert with error styling", () => {
      setAlert("Error message", "error");

      expect(alertElement.classList.contains("opacity-100")).toBe(true);
      expect(alertElement.classList.contains("opacity-0")).toBe(false);
      expect(alertElement.classList.contains("bg-red-600")).toBe(true);
      expect(alertText.textContent).toBe("Error message");
    });

    test("It should hide alert after 2 seconds", () => {
      setAlert("Test message", "success");

      expect(alertElement.classList.contains("opacity-100")).toBe(true);

      jest.advanceTimersByTime(2000);

      expect(alertElement.classList.contains("opacity-0")).toBe(true);
      expect(alertElement.classList.contains("opacity-100")).toBe(false);
      expect(alertElement.classList.contains("bg-success")).toBe(false);
      expect(alertText.textContent).toBe("");
    });

    test("It should clear previous timeout when called again", () => {
      setAlert("First message", "success");

      jest.advanceTimersByTime(1000);

      setAlert("Second message", "error");

      expect(alertText.textContent).toBe("Second message");
      expect(alertElement.classList.contains("bg-red-600")).toBe(true);

      jest.advanceTimersByTime(1000);

      expect(alertElement.classList.contains("opacity-100")).toBe(true);

      jest.advanceTimersByTime(1000);

      expect(alertElement.classList.contains("opacity-0")).toBe(true);
    });
  });

  describe("Edge cases", () => {
    test("It should handle empty message", () => {
      setAlert("", "success");

      expect(alertText.textContent).toBe("");
      expect(alertElement.classList.contains("opacity-100")).toBe(true);
    });

    test("It should handle multiple rapid calls", () => {
      setAlert("Message 1", "success");
      setAlert("Message 2", "error");
      setAlert("Message 3", "success");

      expect(alertText.textContent).toBe("Message 3");
      expect(alertElement.classList.contains("bg-success")).toBe(true);
    });

    test("It should handle non-success type as error", () => {
      setAlert("Warning message", "warning");

      expect(alertElement.classList.contains("bg-red-600")).toBe(true);
      expect(alertElement.classList.contains("bg-success")).toBe(false);
    });
  });
});