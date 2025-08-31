import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../../tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const {
        alert,
        alertHeading,
        deleteMealButton,
        historiesContainer,
        inputForm,
        likeMealButton,
        mealContainer,
        nextMealButton,
        submitForm,
      } = getElements();

      expect(alert).toBeInTheDocument();
      expect(alertHeading).toBeInTheDocument();
      expect(deleteMealButton).toBeInTheDocument();
      expect(historiesContainer).toBeInTheDocument();
      expect(inputForm).toBeInTheDocument();
      expect(likeMealButton).toBeInTheDocument();
      expect(mealContainer).toBeInTheDocument();
      expect(nextMealButton).toBeInTheDocument();
      expect(submitForm).toBeInTheDocument();
    });
  });
});
