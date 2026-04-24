import { screen, waitFor, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import RecipicPage from "@/pages/RecipicPage/RecipicPage";

import mealService from "@/services/mealService";

import { mealStore } from "@/stores/mealStore";

import { mockMeal, mockMealByName } from "@tests/__mocks__/meal.mock";
import { mockMealHistory } from "@tests/__mocks__/mealHistory.mock";

const mockGetMeal = mealService.getMeal as jest.Mock;
const mockGetMealByName = mealService.getMealByName as jest.Mock;

jest.mock("@/services/mealService", () => ({
  __esModule: true,
  default: {
    getMeal: jest.fn(),
    getMealByName: jest.fn(),
  },
}));

const setupAlertDOM = (): void => {
  const alertElement = document.createElement("div");
  alertElement.id = "alert";
  alertElement.classList.add("opacity-0");

  const alertH2 = document.createElement("div");
  alertH2.id = "alert-text";

  document.body.appendChild(alertElement);
  document.body.appendChild(alertH2);
};

const renderPage = (): Page => {
  const page = RecipicPage();
  document.body.appendChild(page);
  return page;
};

describe("RecipicPage", () => {
  beforeEach(() => {
    setupAlertDOM();
    mockGetMeal.mockResolvedValue([mockMeal]);
    mockGetMealByName.mockResolvedValue([mockMealByName]);
    mealStore.setState({
      currentMeal: null,
      historyMeal: null,
      historiesMeal: [],
    });
    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    mealStore.setState({
      currentMeal: null,
      historyMeal: null,
      historiesMeal: [],
    });
    localStorage.clear();
  });

  describe("rendering", () => {
    it("should render a main element", () => {
      renderPage();
      expect(document.querySelector<HTMLElement>("main")).toBeInTheDocument();
    });

    it("should render a text input for searching meals", () => {
      renderPage();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render the search submit button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Search meal by name" })
      ).toBeInTheDocument();
    });

    it("should render the like meal button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Add meal to favorites" })
      ).toBeInTheDocument();
    });

    it("should render the delete meal button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Remove meal from favorites" })
      ).toBeInTheDocument();
    });

    it("should render the next meal button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Load next random meal" })
      ).toBeInTheDocument();
    });

    it("should render the delete button as disabled initially", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Remove meal from favorites" })
      ).toBeDisabled();
    });
  });

  describe("onInit", () => {
    it("should call getMeal on mount", async () => {
      renderPage();
      await waitFor(() => {
        expect(mockGetMeal).toHaveBeenCalledTimes(1);
      });
    });

    it("should set currentMeal in the store after loading", async () => {
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
    });

    it("should render the meal image after loading", async () => {
      renderPage();
      await waitFor(() => {
        expect(screen.getByRole("img")).toBeInTheDocument();
      });
    });

    it("should render the meal image with the correct src", async () => {
      renderPage();
      await waitFor(() => {
        expect(screen.getByRole("img")).toHaveAttribute(
          "src",
          mockMeal.strMealThumb
        );
      });
    });
  });

  describe("search form", () => {
    it("should show an error alert when the input is empty", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(
        screen.getByRole("button", { name: "Search meal by name" })
      );
      expect(
        document.querySelector<HTMLDivElement>("#alert-text")
      ).toHaveTextContent("You must enter a valid name.");
    });

    it("should show an error alert when no meal is found", async () => {
      const user = userEvent.setup();
      mockGetMealByName.mockResolvedValue(null);
      renderPage();
      await user.type(screen.getByRole("textbox"), "nonexistent");
      await user.click(
        screen.getByRole("button", { name: "Search meal by name" })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLDivElement>("#alert-text")
        ).toHaveTextContent("There is no meal with the name entered.");
      });
    });

    it("should show an error alert when meal is already in favorites", async () => {
      const user = userEvent.setup();
      mealStore.addHistory(mockMealHistory);
      mockGetMealByName.mockResolvedValue([
        { ...mockMealByName, idMeal: mockMealHistory.idMeal },
      ]);
      renderPage();
      await user.type(screen.getByRole("textbox"), "some meal");
      await user.click(
        screen.getByRole("button", { name: "Search meal by name" })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLDivElement>("#alert-text")
        ).toHaveTextContent("This meal is already in your favorites.");
      });
    });

    it("should add the meal to favorites on a successful search", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByRole("textbox"), "Mandazi");
      await user.click(
        screen.getByRole("button", { name: "Search meal by name" })
      );
      await waitFor(() => {
        expect(mealStore.idMealInHistory(mockMealByName.idMeal)).toBe(true);
      });
    });

    it("should clear the input after a successful search", async () => {
      const user = userEvent.setup();
      renderPage();
      const input = screen.getByRole("textbox");
      await user.type(input, "Mandazi");
      await user.click(
        screen.getByRole("button", { name: "Search meal by name" })
      );
      await waitFor(() => {
        expect(input).toHaveValue("");
      });
    });

    it("should show a success alert after a successful search", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.type(screen.getByRole("textbox"), "Mandazi");
      await user.click(
        screen.getByRole("button", { name: "Search meal by name" })
      );
      await waitFor(() => {
        expect(
          document.querySelector<HTMLDivElement>("#alert-text")
        ).toHaveTextContent(
          `${mockMealByName.strMeal} has been added to favorites.`
        );
      });
    });
  });

  describe("like button", () => {
    it("should add the currentMeal to history when clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      await user.click(
        screen.getByRole("button", { name: "Add meal to favorites" })
      );
      expect(mealStore.idMealInHistory(mockMeal.idMeal)).toBe(true);
    });

    it("should show a success alert when a meal is liked", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      await user.click(
        screen.getByRole("button", { name: "Add meal to favorites" })
      );
      expect(
        document.querySelector<HTMLDivElement>("#alert-text")
      ).toHaveTextContent(`${mockMeal.strMeal} has been added to favorites.`);
    });
  });

  describe("delete button", () => {
    it("should remove the currentMeal from history when clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      await user.click(
        screen.getByRole("button", { name: "Add meal to favorites" })
      );
      await user.click(
        screen.getByRole("button", { name: "Remove meal from favorites" })
      );
      expect(mealStore.idMealInHistory(mockMeal.idMeal)).toBe(false);
    });

    it("should show a success alert when a meal is removed", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      await user.click(
        screen.getByRole("button", { name: "Add meal to favorites" })
      );
      await user.click(
        screen.getByRole("button", { name: "Remove meal from favorites" })
      );
      expect(
        document.querySelector<HTMLDivElement>("#alert-text")
      ).toHaveTextContent("has been removed from favorites.");
    });
  });

  describe("next meal button", () => {
    it("should call getMeal again when clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mockGetMeal).toHaveBeenCalledTimes(1);
      });
      await user.click(
        screen.getByRole("button", { name: "Load next random meal" })
      );
      await waitFor(() => {
        expect(mockGetMeal).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("history rendering", () => {
    it("should render a history item when a meal is added to favorites", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      await user.click(
        screen.getByRole("button", { name: "Add meal to favorites" })
      );
      await waitFor(() => {
        const historiesSection =
          document.querySelector<HTMLElement>("#histories")!;
        expect(
          within(historiesSection).getByRole("img", { name: mockMeal.strMeal })
        ).toBeInTheDocument();
      });
    });

    it("should remove the history item when the meal is deleted", async () => {
      const user = userEvent.setup();
      renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      await user.click(
        screen.getByRole("button", { name: "Add meal to favorites" })
      );
      const historiesSection =
        document.querySelector<HTMLElement>("#histories")!;
      await waitFor(() => {
        expect(
          within(historiesSection).getByRole("img", { name: mockMeal.strMeal })
        ).toBeInTheDocument();
      });
      await user.click(
        screen.getByRole("button", { name: "Remove meal from favorites" })
      );
      await waitFor(() => {
        expect(
          within(historiesSection).queryByRole("img", {
            name: mockMeal.strMeal,
          })
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("cleanup", () => {
    it("should have a cleanup method", () => {
      const page = renderPage();
      expect(page.cleanup).toBeDefined();
    });

    it("should not throw when cleanup is called", async () => {
      const page = renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      expect(() => page.cleanup?.()).not.toThrow();
    });

    it("should unsubscribe from store changes after cleanup", async () => {
      const page = renderPage();
      await waitFor(() => {
        expect(mealStore.getState().currentMeal).toEqual(mockMeal);
      });
      page.cleanup?.();
      const mealInfoSection =
        page.querySelector<HTMLElement>("#meal-information");
      const childCountBefore = mealInfoSection?.children.length;
      mealStore.setCurrentMeal(null);
      expect(mealInfoSection?.children.length).toBe(childCountBefore);
    });
  });
});
