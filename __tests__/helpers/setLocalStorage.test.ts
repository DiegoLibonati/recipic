import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should store a string value serialized as JSON", () => {
    setLocalStorage("key", "value");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("value"));
  });

  it("should store a number value serialized as JSON", () => {
    setLocalStorage("key", 42);
    expect(localStorage.getItem("key")).toBe(JSON.stringify(42));
  });

  it("should store an object value serialized as JSON", () => {
    const obj = { name: "test", value: 123 };
    setLocalStorage("key", obj);
    expect(localStorage.getItem("key")).toBe(JSON.stringify(obj));
  });

  it("should store an array value serialized as JSON", () => {
    const arr = [1, 2, 3];
    setLocalStorage("key", arr);
    expect(localStorage.getItem("key")).toBe(JSON.stringify(arr));
  });

  it("should store a null value serialized as JSON", () => {
    setLocalStorage("key", null);
    expect(localStorage.getItem("key")).toBe(JSON.stringify(null));
  });

  it("should overwrite an existing value", () => {
    setLocalStorage("key", "initial");
    setLocalStorage("key", "updated");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("updated"));
  });
});
