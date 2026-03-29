import { mockEnvs } from "@tests/__mocks__/envs.mock";

jest.mock("@/constants/envs", () => {
  return {
    __esModule: true,
    default: mockEnvs,
  };
});

import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import RecipePage from "@/pages/RecipePage/RecipePage";

import { mealsService } from "@/services/mealsService";

import { mealStore } from "@/stores/mealStore";

import { mockMeal } from "@tests/__mocks__/meal.mock";

jest.mock("@/services/mealsService");

const mockedMealsService = mealsService as jest.Mocked<typeof mealsService>;

const renderPage = (): Page => {
  const alertElement = document.createElement("div");
  alertElement.id = "alert";
  const alertText = document.createElement("div");
  alertText.id = "alert-text";
  document.body.appendChild(alertElement);
  document.body.appendChild(alertText);

  const container = RecipePage();
  document.body.appendChild(container);
  return container;
};

describe("RecipePage", () => {
  beforeEach(() => {
    mealStore.setState({
      currentMeal: null,
      historiesMeal: [],
      historyMeal: null,
    });
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  it("should render the page with correct structure", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const main = document.querySelector<HTMLElement>("main");
    expect(main).toBeInTheDocument();
  });

  it("should render search form", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const form = document.querySelector<HTMLFormElement>("#form-search-meal");
    expect(form).toBeInTheDocument();
  });

  it("should render search input", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const input = document.querySelector<HTMLInputElement>("#input-meal");
    expect(input).toBeInTheDocument();
  });

  it("should render search button", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const button = screen.getByRole("button", { name: "Search meal by name" });
    expect(button).toBeInTheDocument();
  });

  it("should render histories section", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const histories = document.querySelector<HTMLElement>("#histories");
    expect(histories).toBeInTheDocument();
  });

  it("should render meal information section", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const mealInfo = document.querySelector<HTMLElement>("#meal-information");
    expect(mealInfo).toBeInTheDocument();
  });

  it("should render button actions section", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    const buttonActions =
      document.querySelector<HTMLElement>("#button-actions");
    expect(buttonActions).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    renderPage();

    expect(
      screen.getByRole("button", { name: "Add meal to favorites" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remove meal from favorites" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Load next random meal" })
    ).toBeInTheDocument();
  });

  it("should cleanup on page cleanup", () => {
    mockedMealsService.getMeal.mockResolvedValue([mockMeal]);

    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
