import { getMealsFromLocalStorage } from "./getMealsFromLocalStorage";

import { LOCAL_STORAGE_MEALS_KEY } from "../constants/constants";

import { LOCAL_STORAGE_MOCKS } from "../tests/jest.setup";

test("The getItem of localStorage must be called with key of cards.", () => {
  getMealsFromLocalStorage();

  expect(LOCAL_STORAGE_MOCKS.getItem).toHaveBeenCalledTimes(1);
  expect(LOCAL_STORAGE_MOCKS.getItem).toHaveBeenCalledWith(
    LOCAL_STORAGE_MEALS_KEY
  );
});
