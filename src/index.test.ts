import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import {
  mockMeal,
  mockMealByName,
  mockMealRequestSearchByName,
  mockMealsRequest,
  OFFICIAL_BODY,
} from "./tests/jest.constants";
import { createServer } from "./tests/msw/server";

describe("index.ts", () => {
  describe("General Tests.", () => {
    const idHistories = "histories";

    createServer([
      {
        path: "/api/json/v1/1/random.php",
        method: "get",
        res: () => {
          return mockMealsRequest;
        },
      },
      {
        path: `/api/json/v1/1/search.php`,
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const s = url.searchParams.get("s");

          console.log(s);

          return mockMealRequestSearchByName;
        },
      },
    ]);

    beforeEach(async () => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));

      await screen.findByAltText(mockMeal.strMeal);
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the form with the search input and the submit button.", () => {
      const inputForm = screen.getByRole("textbox");
      const buttonSubmit = screen.getByRole("button", { name: /search meal/i });

      expect(inputForm).toBeInTheDocument();
      expect(buttonSubmit).toBeInTheDocument();
    });

    test("It need to render the food stories container.", () => {
      const articles = screen.getAllByRole("article");
      const historiesContainer = articles.find(
        (article) => article.id === idHistories
      );

      expect(historiesContainer).toBeInTheDocument();
    });

    test("It must render a food when you initialize the page.", () => {
      const imgMeal = screen.getByAltText(mockMeal.strMeal);

      expect(imgMeal).toBeInTheDocument();
      expect(imgMeal).toHaveAttribute("src", mockMeal.strMealThumb);
      expect(imgMeal).toHaveAttribute("alt", mockMeal.strMeal);
    });

    test("It must render the button panel, with the like, trash and next buttons.", () => {
      const btnLike = screen.getByRole("button", { name: /like meal/i });
      const btnDelete = screen.getByRole("button", { name: /delete meal/i });
      const btnNext = screen.getByRole("button", { name: /next meal/i });

      expect(btnLike).toBeInTheDocument();
      expect(btnDelete).toBeInTheDocument();
      expect(btnNext).toBeInTheDocument();
    });

    test("It must save a food story when you click the like button.", async () => {
      const btnLike = screen.getByRole("button", { name: /like meal/i });

      const articles = screen.getAllByRole("article");
      const historiesContainer = articles.find(
        (article) => article.id === idHistories
      );

      expect(btnLike).toBeInTheDocument();
      expect(historiesContainer).toBeInTheDocument();

      await user.click(btnLike);

      expect(historiesContainer?.children).toHaveLength(1);

      const imgMeal = historiesContainer?.querySelector(
        "img"
      ) as HTMLImageElement;

      expect(imgMeal).toBeInTheDocument();
      expect(imgMeal).toHaveAttribute("src", mockMeal.strMealThumb);
      expect(imgMeal).toHaveAttribute("alt", mockMeal.strMeal);
    });

    test("It should show another food when you click next.", async () => {
      const btnNext = screen.getByRole("button", { name: /next meal/i });

      await user.click(btnNext);

      expect(btnNext).toBeInTheDocument();

      const imgMeal = screen.getByAltText(mockMeal.strMeal);

      expect(imgMeal).toBeInTheDocument();
      expect(imgMeal).toHaveAttribute("src", mockMeal.strMealThumb);
      expect(imgMeal).toHaveAttribute("alt", mockMeal.strMeal);
    });

    test("It should render the relevant food that was entered in the search when submit was clicked.", async () => {
      const inputForm = screen.getByRole("textbox");
      const buttonSubmit = screen.getByRole("button", { name: /search meal/i });

      expect(inputForm).toBeInTheDocument();
      expect(buttonSubmit).toBeInTheDocument();

      await user.clear(inputForm);
      await user.click(inputForm);
      await user.keyboard(mockMealByName.strMeal);

      await user.click(buttonSubmit);

      const imgMeal = screen.getByAltText(mockMealByName.strMeal);

      expect(imgMeal).toBeInTheDocument();
      expect(imgMeal).toHaveAttribute("src", mockMealByName.strMealThumb);
      expect(imgMeal).toHaveAttribute("alt", mockMealByName.strMeal);
    });
  });
});
