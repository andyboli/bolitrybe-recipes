import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Provider } from "../../context";
import {
  mock12Meals,
  mockMealsCategories,
  mock12Drinks,
  mockDrinksCategories,
  mockMeals,
  mockDrinks,
  mockOneMeal,
  mockOneDrink,
} from "../../mock";
import Recipes from "./index";

jest.mock("../../service", () => {
  const serviceApp = {
    getData: (page, endpoint) => {
      if (page === "meals") {
        if (endpoint === "list.php?c=list") {
          return Promise.resolve(mockMealsCategories);
        }
        if (endpoint.includes("test")) {
          return Promise.resolve(mockMeals);
        }
        if (endpoint === "one") {
          return Promise.resolve(mockOneMeal);
        }
        return Promise.resolve(mock12Meals);
      }
      if (page === "drinks") {
        if (endpoint === "list.php?c=list") {
          return Promise.resolve(mockDrinksCategories);
        }
        if (endpoint.includes("test")) {
          return Promise.resolve(mockDrinks);
        }
        if (endpoint === "one") {
          return Promise.resolve(mockOneDrink);
        }
        return Promise.resolve(mock12Drinks);
      }
    },
    getChunks: (element, chunksRules) => {
      const chunks = [];
      const chunksNumber = chunksRules[0];
      for (let index = 0; index < element.length; index += chunksNumber) {
        const each = [];
        for (let i = 0; i < chunksNumber; i += 1) {
          each.push(element[index + i]);
        }
        chunks.push(each);
      }
      return chunks;
    },
    getPathnameChunk: (pathname, index) => {
      const path = pathname.split("/");
      return path[index];
    },
  };
  return serviceApp;
});

describe("Recipes", () => {
  describe("Recipe Card", () => {
    test("Render 12 random Recipes - Meals", async () => {
      const { queryByTestId, queryByText } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      mock12Meals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });

      expect(queryByText("meals")).toBeInTheDocument();
    });

    test("Render 12 random Recipes - Drinks", async () => {
      const { queryByTestId, queryByText } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      mock12Drinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });

      expect(queryByText("drinks")).toBeInTheDocument();
    });

    test("Redirect to Recipes Details - Meals", async () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </Router>
        </Provider>
      );

      await waitForDomChange();

      mock12Meals.forEach(({ strMeal, idMeal }) => {
        fireEvent.click(getByTestId(`${strMeal}-card-name`));

        expect(history.location.pathname).toBe(`/recipes/meals/${idMeal}`);
      });
    });

    test("Redirect to Recipes Details - Drinks", async () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </Router>
        </Provider>
      );

      await waitForDomChange();

      mock12Drinks.forEach(({ strDrink, idDrink }) => {
        fireEvent.click(getByTestId(`${strDrink}-card-name`));

        expect(history.location.pathname).toBe(`/recipes/drinks/${idDrink}`);
      });
    });
  });

  describe("Search Bar", () => {
    test("Search By Name - Meals", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("name-search-radio"), {
        target: { value: "te" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "st" },
      });

      await waitForDomChange();

      mockMeals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });
    });

    test("Search By Name - Drinks", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("name-search-radio"), {
        target: { value: "te" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "st" },
      });

      await waitForDomChange();

      mockDrinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });
    });

    test("Search By First Letter - Meals", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("first-letter-search-radio"), {
        target: { value: "tes" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "t" },
      });

      await waitForDomChange();

      mockMeals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });
    });

    test("Search By First Letter - Drinks", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("first-letter-search-radio"), {
        target: { value: "tes" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "t" },
      });

      await waitForDomChange();

      mockDrinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });
    });

    test("Search By Ingredient - Meals", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("ingredient-search-radio"), {
        target: { value: "" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "test" },
      });

      await waitForDomChange();

      mockMeals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });
    });

    test("Search By Ingredient - Drinks", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("ingredient-search-radio"), {
        target: { value: "" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "test" },
      });

      await waitForDomChange();

      mockDrinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });
    });
  });

  describe("Categories", () => {
    test("Render categories - Meals", async () => {
      const { queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      mockMealsCategories.forEach(({ strCategory }) => {
        expect(
          queryByTestId(`${strCategory}-category-filter`)
        ).toBeInTheDocument();
      });
    });

    test("Render categories - Drinks", async () => {
      const { queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      mockDrinksCategories.forEach(({ strCategory }) => {
        expect(
          queryByTestId(`${strCategory}-category-filter`)
        ).toBeInTheDocument();
      });
    });

    test("Categories Meals - Click", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      const { strCategory } = mockMealsCategories[0];

      fireEvent.click(getByTestId(`${strCategory}-category-filter`), {
        target: { value: "test" },
      });

      await waitForDomChange();

      mockMeals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });

      expect(
        getByTestId(`${strCategory}-category-filter`).checked
      ).toBeTruthy();

      fireEvent.click(getByTestId(`${strCategory}-category-filter`), {
        target: { value: "test" },
      });

      await waitForDomChange();

      expect(getByTestId(`${strCategory}-category-filter`).checked).toBeFalsy();

      mock12Meals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });
    });

    test("Categories Drinks - Click", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      const { strCategory } = mockDrinksCategories[0];

      fireEvent.click(getByTestId(`${strCategory}-category-filter`), {
        target: { value: "test" },
      });

      await waitForDomChange();

      mockDrinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });

      expect(
        getByTestId(`${strCategory}-category-filter`).checked
      ).toBeTruthy();

      fireEvent.click(getByTestId(`${strCategory}-category-filter`), {
        target: { value: "test" },
      });

      await waitForDomChange();

      expect(getByTestId(`${strCategory}-category-filter`).checked).toBeFalsy();

      mock12Drinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });
    });
  });

  describe("Redirect To Details", () => {
    test("Meals", async () => {
      const history = createMemoryHistory();

      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <Recipes location={{ pathname: "/recipes/meals" }} />
          </Router>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("name-search-radio"), {
        target: { value: "on" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "e" },
      });

      await waitForDomChange();

      expect(history.location.pathname).toBe(`/meals/${mockOneMeal[0].idMeal}`);
    });

    test("Drinks", async () => {
      const history = createMemoryHistory();

      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <Recipes location={{ pathname: "/recipes/drinks" }} />
          </Router>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("search-top-btn"));

      fireEvent.click(getByTestId("name-search-radio"), {
        target: { value: "on" },
      });

      fireEvent.change(getByTestId("search-input"), {
        target: { value: "e" },
      });

      await waitForDomChange();

      expect(history.location.pathname).toBe(
        `/drinks/${mockOneDrink[0].idDrink}`
      );
    });
  });
});
