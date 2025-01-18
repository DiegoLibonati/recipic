import "@testing-library/jest-dom";

import { mocksLocalStorage } from "./jest.constants";

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mocksLocalStorage.getItem,
    setItem: mocksLocalStorage.setItem,
  },
});

jest.mock("../constants/config.ts", () => ({
  get CONFIG() {
    return {
      API_URL: process.env.VITE_API_URL,
    };
  },
}));
