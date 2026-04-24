import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  describe("when the key does not exist", () => {
    it("should return null", () => {
      expect(getLocalStorage("non-existent-key")).toBeNull();
    });
  });

  describe("when the key exists", () => {
    it("should return the parsed string value", () => {
      localStorage.setItem("key", JSON.stringify("hello"));
      expect(getLocalStorage("key")).toBe("hello");
    });

    it("should return the parsed number value", () => {
      localStorage.setItem("key", JSON.stringify(42));
      expect(getLocalStorage("key")).toBe(42);
    });

    it("should return the parsed object value", () => {
      const obj = { name: "test", value: 123 };
      localStorage.setItem("key", JSON.stringify(obj));
      expect(getLocalStorage("key")).toEqual(obj);
    });

    it("should return the parsed array value", () => {
      const arr = [1, 2, 3];
      localStorage.setItem("key", JSON.stringify(arr));
      expect(getLocalStorage("key")).toEqual(arr);
    });

    it("should return the parsed boolean value", () => {
      localStorage.setItem("key", JSON.stringify(true));
      expect(getLocalStorage("key")).toBe(true);
    });
  });
});
