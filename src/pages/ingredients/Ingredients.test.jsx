import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Provider } from "../../context";
import {
  mockMealsIngredients,
  mockDrinksCategories,
  mockMealsCategories,
  mockDrinksIngredients,
  mockMeals,
  mockDrinks,
} from "../../mock";
import Ingredients from "./index";
import Recipes from "../recipes";

jest.mock("../../service", () => {
  const serviceApp = {
    getData: (page, endpoint) => {
      if (page === "meals") {
        if (endpoint === "list.php?i=list")
          return Promise.resolve(mockMealsIngredients);
        if (endpoint.includes("filter.php?i=")) {
          return Promise.resolve(mockMeals);
        }
        if (endpoint === "list.php?c=list") {
          return Promise.resolve(mockMealsCategories);
        }
      }

      if (page === "drinks") {
        if (endpoint === "list.php?i=list")
          return Promise.resolve(mockDrinksIngredients);
        if (endpoint.includes("filter.php?i=")) {
          return Promise.resolve(mockDrinks);
        }
        if (endpoint === "list.php?c=list") {
          return Promise.resolve(mockDrinksCategories);
        }
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

describe("Ingredients", () => {
  test("Components - Meals", async () => {
    const { getByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Ingredients location={{ pathname: "/explorer/meals/ingredients" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    mockMealsIngredients.forEach(({ strIngredient }) => {
      expect(getByTestId(`${strIngredient}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${strIngredient}-card-name`)).toBeInTheDocument();
    });
  });

  test("Components - Drinks", async () => {
    const { getByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Ingredients
            location={{ pathname: "/explorer/drinks/ingredients" }}
          />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    mockDrinksIngredients.forEach(({ strIngredient1 }) => {
      expect(getByTestId(`${strIngredient1}-card-img`)).toBeInTheDocument();
      expect(getByTestId(`${strIngredient1}-card-name`)).toBeInTheDocument();
    });
  });

  test("Ingredients onClick - Meals", async () => {
    const history = createMemoryHistory();
    const { queryByTestId, getByTestId, rerender } = render(
      <Provider>
        <Router history={history}>
          <Ingredients location={{ pathname: "/explorer/meals/ingredients" }} />
        </Router>
      </Provider>
    );

    await waitForDomChange();

    fireEvent.click(
      getByTestId(`${mockMealsIngredients[0].strIngredient}-card-name`)
    );

    expect(history.location.pathname).toBe("/recipes/meals");

    rerender(
      <Provider>
        <MemoryRouter>
          <Recipes location={{ pathname: "/recipes/meals" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    mockMeals.forEach(({ strMeal }) => {
      expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
    });
  });

  test("Ingredients onClick - Drinks", async () => {
    const history = createMemoryHistory();
    const { queryByTestId, getByTestId, rerender } = render(
      <Provider>
        <Router history={history}>
          <Ingredients
            location={{ pathname: "/explorer/drinks/ingredients" }}
          />
        </Router>
      </Provider>
    );

    await waitForDomChange();

    fireEvent.click(
      getByTestId(`${mockDrinksIngredients[0].strIngredient1}-card-name`)
    );

    expect(history.location.pathname).toBe("/recipes/drinks");

    rerender(
      <Provider>
        <MemoryRouter>
          <Recipes location={{ pathname: "/recipes/drinks" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    mockDrinks.forEach(({ strDrink }) => {
      expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
    });
  });
});
