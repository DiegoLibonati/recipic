import { getHistoriesFromLocalStorage } from "@src/helpers/getHistoriesFromLocalStorage";

import { LOCAL_STORAGE_HISTORIES_KEY } from "@src/constants/vars";

import { mocksLocalStorage } from "@tests/jest.constants";

describe("getHistoriesromLocalStorage.ts", () => {
  describe("General Tests.", () => {
    test("The getItem of localStorage must be called with key of cards.", () => {
      getHistoriesFromLocalStorage();

      expect(mocksLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(mocksLocalStorage.getItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_HISTORIES_KEY
      );
    });
  });
});
