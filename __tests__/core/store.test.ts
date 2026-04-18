import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {
  increment(): void {
    this.setState({ count: this.state.count + 1 });
  }

  setName(name: string): void {
    this.setState({ name });
  }
}

const createStore = (overrides: Partial<TestState> = {}): TestStore =>
  new TestStore({ count: 0, name: "initial", ...overrides });

describe("Store", () => {
  describe("getState", () => {
    it("should return the initial state", () => {
      const store = createStore();
      expect(store.getState()).toEqual({ count: 0, name: "initial" });
    });

    it("should reflect state after mutation", () => {
      const store = createStore();
      store.increment();
      expect(store.getState().count).toBe(1);
    });
  });

  describe("get", () => {
    it("should return the value for a given key", () => {
      const store = createStore({ count: 5 });
      expect(store.get("count")).toBe(5);
    });

    it("should return the updated value after setState", () => {
      const store = createStore();
      store.increment();
      expect(store.get("count")).toBe(1);
    });

    it("should return the correct value for the name key", () => {
      const store = createStore({ name: "hello" });
      expect(store.get("name")).toBe("hello");
    });
  });

  describe("setState", () => {
    it("should update only the provided keys", () => {
      const store = createStore({ count: 0, name: "initial" });
      store.setState({ count: 10 });
      expect(store.getState()).toEqual({ count: 10, name: "initial" });
    });

    it("should notify listeners when the value changes", () => {
      const store = createStore();
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 1 });
      expect(mockListener).toHaveBeenCalledWith(1);
    });

    it("should not notify listeners when the value does not change", () => {
      const store = createStore({ count: 0 });
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should notify multiple listeners for the same key", () => {
      const store = createStore();
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      store.setState({ count: 5 });
      expect(mockListener1).toHaveBeenCalledWith(5);
      expect(mockListener2).toHaveBeenCalledWith(5);
    });

    it("should not notify listeners for keys that were not updated", () => {
      const store = createStore();
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);
      store.setState({ count: 1 });
      expect(mockCountListener).toHaveBeenCalled();
      expect(mockNameListener).not.toHaveBeenCalled();
    });
  });

  describe("subscribe", () => {
    it("should return an unsubscribe function", () => {
      const store = createStore();
      const unsubscribe = store.subscribe("count", jest.fn());
      expect(typeof unsubscribe).toBe("function");
    });

    it("should stop notifying the listener after unsubscribing", () => {
      const store = createStore();
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);
      unsubscribe();
      store.setState({ count: 1 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should not affect other listeners when one unsubscribes", () => {
      const store = createStore();
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const unsubscribe1 = store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);
      unsubscribe1();
      store.setState({ count: 1 });
      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(1);
    });

    it("should allow subscribing to multiple keys independently", () => {
      const store = createStore();
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);
      store.setName("updated");
      expect(mockCountListener).not.toHaveBeenCalled();
      expect(mockNameListener).toHaveBeenCalledWith("updated");
    });
  });
});
