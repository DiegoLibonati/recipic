import { getElements } from "./getElements";

import { setAlert } from "./setAlert";

import { OFFICIAL_BODY } from "../../tests/jest.constants";

describe("setAlert.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.useFakeTimers();

      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It should render an success alert and disappear after 2 seconds.", () => {
      const message = "message";
      const type = "success";

      const { alert, alertHeading } = getElements();

      expect(alert).toBeInTheDocument();
      expect(alert.classList.contains("opacity-0")).toBeTruthy();
      expect(alertHeading).toBeEmptyDOMElement();

      setAlert(message, type);

      expect(alert.classList.contains("opacity-100")).toBeTruthy();
      expect(alert.classList.contains("bg-success")).toBeTruthy();
      expect(alertHeading).toHaveTextContent(message);

      jest.advanceTimersByTime(2000);

      expect(alert.classList.contains("opacity-0")).toBeTruthy();
      expect(alert.classList.contains("opacity-100")).toBeFalsy();
      expect(alert.classList.contains("bg-success")).toBeFalsy();
      expect(alertHeading).toBeEmptyDOMElement();
    });

    test("It should render an error alert and disappear after 2 seconds.", () => {
      const message = "message";
      const type = "error";

      const { alert, alertHeading } = getElements();

      expect(alert).toBeInTheDocument();
      expect(alert.classList.contains("opacity-0")).toBeTruthy();
      expect(alertHeading).toBeEmptyDOMElement();

      setAlert(message, type);

      expect(alert.classList.contains("opacity-100")).toBeTruthy();
      expect(alert.classList.contains("bg-red-600")).toBeTruthy();
      expect(alertHeading).toHaveTextContent(message);

      jest.advanceTimersByTime(2000);

      expect(alert.classList.contains("opacity-0")).toBeTruthy();
      expect(alert.classList.contains("opacity-100")).toBeFalsy();
      expect(alert.classList.contains("bg-red-600")).toBeFalsy();
      expect(alertHeading).toBeEmptyDOMElement();
    });
  });
});
