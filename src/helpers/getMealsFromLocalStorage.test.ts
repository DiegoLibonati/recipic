import { getMealsFromLocalStorage } from "@src/helpers/getMealsFromLocalStorage";

import { LOCAL_STORAGE_MEALS_KEY } from "@src/constants/constants";

import { mocksLocalStorage } from "@tests/jest.constants";

describe("getMealsFromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of cards.", () => {
      getMealsFromLocalStorage();

      expect(mocksLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mocksLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_MEALS_KEY
      );
    });
  });
});
