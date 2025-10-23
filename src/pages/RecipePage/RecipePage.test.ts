import { screen, waitFor } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { RecipePage } from "@src/pages/RecipePage/RecipePage";

import { mealStore } from "@src/stores/mealStore";

import { createServer } from "@tests/msw/server";
import { mockMeal, mockMealByName } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = RecipePage();

  document.body.appendChild(container);

  return {
    container: container,
  };
};

jest.mock("@src/helpers/setAlert", () => ({
  setAlert: jest.fn(),
}));

jest.mock("@src/helpers/setButtonActionsStyles", () => ({
  setButtonActionsStyles: jest.fn(),
}));

jest.mock("@src/stores/mealStore", () => {
  const actualStore = jest.requireActual("@src/stores/mealStore");
  return {
    mealStore: {
      ...actualStore.mealStore,
      addHistory: jest.fn(),
      removeHistory: jest.fn(),
      setCurrentMeal: jest.fn(),
      setHistoryMeal: jest.fn(),
      idMealInHistory: jest.fn(() => false),
      subscribe: jest.fn(),
    },
  };
});

createServer([
  {
    path: `/api/json/v1/1/random.php`,
    method: "get",
    res: () => ({ meals: [mockMeal] }),
  },
  {
    path: `/api/json/v1/1/search.php`,
    method: "get",
    res: () => ({ meals: [mockMealByName] }),
  },
]);

describe("RecipePage.ts", () => {
  beforeEach(() => {
    (mealStore.getState as jest.Mock) = jest.fn(() => ({
      currentMeal: mockMeal,
      historyMeal: null,
      historiesMeal: [],
    }));
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render main element with correct structure", () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      expect(container).toBeInstanceOf(HTMLElement);
      expect(
        container.querySelector<HTMLFormElement>("#form-search-meal")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLElement>("#histories")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLElement>("#meal-information")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLElement>("#button-actions")
      ).toBeInTheDocument();
    });

    test("It should render search form with input and button", () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const input = screen.getByRole("textbox");
      const button = screen.getByRole("button", { name: /search meal/i });

      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("It should render action buttons", () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const likeButton = screen.getByRole("button", { name: /like meal/i });
      const deleteButton = screen.getByRole("button", { name: /delete meal/i });
      const nextButton = screen.getByRole("button", { name: /next meal/i });

      expect(likeButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    test("It should have delete button disabled by default", () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const deleteButton = screen.getByRole("button", { name: /delete meal/i });

      expect(deleteButton).toBeDisabled();
    });
  });

  describe("Search functionality", () => {
    test("It should add meal to favorites when searching valid name", async () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const input = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: /search meal/i });

      await user.type(input, "Home-made Mandazi");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mealStore.addHistory).toHaveBeenCalledWith({
          idMeal: mockMealByName.idMeal,
          strMeal: mockMealByName.strMeal,
          strMealThumb: mockMealByName.strMealThumb,
        });
      });
    });

    test("It should clear input after successful search", async () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /search meal/i });

      await user.type(input, "Home-made Mandazi");
      await user.click(submitButton);

      await waitFor(() => {
        expect(input.value).toBe("");
      });
    });

    test("It should not search with empty input", async () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const submitButton = screen.getByRole("button", { name: /search meal/i });

      await user.click(submitButton);

      expect(mealStore.addHistory).not.toHaveBeenCalled();
    });

    test("It should not add meal if already in history", async () => {
      (mealStore.idMealInHistory as jest.Mock).mockReturnValue(true);

      const { container } = renderComponent();
      document.body.appendChild(container);

      const input = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: /search meal/i });

      await user.type(input, "Home-made Mandazi");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mealStore.addHistory).not.toHaveBeenCalled();
      });
    });
  });

  describe("Action buttons functionality", () => {
    test("It should add meal to favorites when clicking like button", async () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const likeButton = screen.getByRole("button", { name: /like meal/i });

      await user.click(likeButton);

      expect(mealStore.addHistory).toHaveBeenCalledWith({
        idMeal: mockMeal.idMeal,
        strMeal: mockMeal.strMeal,
        strMealThumb: mockMeal.strMealThumb,
      });
    });

    test("It should remove meal when clicking delete button", async () => {
      (mealStore.getState as jest.Mock) = jest.fn(() => ({
        currentMeal: mockMeal,
        historyMeal: null,
        historiesMeal: [],
      }));

      const { container } = renderComponent();
      document.body.appendChild(container);

      const deleteButton = screen.getByRole("button", {
        name: /delete meal/i,
      }) as HTMLButtonElement;
      deleteButton.disabled = false;

      await user.click(deleteButton);

      expect(mealStore.removeHistory).toHaveBeenCalledWith(mockMeal.idMeal);
    });

    test("It should load new meal when clicking next button", async () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const nextButton = screen.getByRole("button", { name: /next meal/i });

      await user.click(nextButton);

      await waitFor(() => {
        expect(mealStore.setCurrentMeal).toHaveBeenCalled();
      });
    });
  });

  describe("History functionality", () => {
    test("It should render history meals", () => {
      (mealStore.getState as jest.Mock) = jest.fn(() => ({
        currentMeal: mockMeal,
        historyMeal: null,
        historiesMeal: [
          {
            idMeal: "123",
            strMeal: "Test Meal",
            strMealThumb: "https://example.com/test.jpg",
          },
        ],
      }));

      const { container } = renderComponent();
      document.body.appendChild(container);

      const histories = container.querySelector<HTMLElement>("#histories");

      expect(histories?.children.length).toBe(1);
    });

    test("It should render multiple history meals", () => {
      (mealStore.getState as jest.Mock) = jest.fn(() => ({
        currentMeal: mockMeal,
        historyMeal: null,
        historiesMeal: [
          {
            idMeal: "123",
            strMeal: "Meal 1",
            strMealThumb: "https://example.com/1.jpg",
          },
          {
            idMeal: "456",
            strMeal: "Meal 2",
            strMealThumb: "https://example.com/2.jpg",
          },
        ],
      }));

      const { container } = renderComponent();
      document.body.appendChild(container);

      const histories = container.querySelector<HTMLElement>("#histories");

      expect(histories?.children.length).toBe(2);
    });
  });

  describe("Meal information rendering", () => {
    test("It should render presentation meal when no history meal selected", () => {
      const { container } = renderComponent();
      document.body.appendChild(container);

      const mealInfo =
        container.querySelector<HTMLElement>("#meal-information");
      const img = mealInfo?.querySelector<HTMLImageElement>("img");

      expect(img).toBeInTheDocument();
      expect(img?.src).toBe(mockMeal.strMealThumb);
    });

    test("It should render information meal when history meal is selected", () => {
      (mealStore.getState as jest.Mock) = jest.fn(() => ({
        currentMeal: mockMeal,
        historyMeal: mockMeal,
        historiesMeal: [],
      }));

      const { container } = renderComponent();
      document.body.appendChild(container);

      const mealInfo =
        container.querySelector<HTMLElement>("#meal-information");
      const heading = mealInfo?.querySelector<HTMLHeadingElement>("h2");

      expect(heading).toBeInTheDocument();
      expect(heading?.textContent).toBe(mockMeal.strMeal);
    });
  });
});
