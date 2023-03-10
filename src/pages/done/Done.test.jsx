import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Provider } from "../../context";
import {
  mockMealsDetails,
  mockDrinksDetails,
  mockMeals,
  mockDrinks,
  mockOtherMealsDetails,
  mockOtherDrinksDetails,
  mockDrinksIngredientsList,
  mockMealsIngredientsList,
} from "../../mock";
import Done from "./index";
import Cook from "../cook";
import Details from "../details";

jest.mock("../../service", () => {
  const serviceApp = {
    getData: (page, endpoint) => {
      if (page === "meals") {
        if (endpoint.includes("lookup.php?i=52772")) {
          return Promise.resolve(mockMealsDetails);
        }
        if (endpoint.includes("lookup.php?i=52773")) {
          return Promise.resolve(mockOtherMealsDetails);
        }
        return Promise.resolve(mockMeals);
      }
      if (page === "drinks") {
        if (endpoint.includes("lookup.php?i=11007")) {
          return Promise.resolve(mockDrinksDetails);
        }
        if (endpoint.includes("lookup.php?i=11008")) {
          return Promise.resolve(mockOtherDrinksDetails);
        }
        return Promise.resolve(mockDrinks);
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

jest.mock("../../components/recommendedCard/service", () => {
  return jest.fn((recipes) => recipes);
});

describe("Done", () => {
  test("Done Card", async () => {
    const history = createMemoryHistory();
    const { getByTestId, rerender, debug } = render(
      <Provider>
        <MemoryRouter>
          <Details location={{ pathname: "/recipes/meals/52772" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    fireEvent.click(getByTestId("start-recipe-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Cook location={{ pathname: "/recipes/meals/52772/cook" }} />
        </MemoryRouter>
      </Provider>
    );

    mockMealsIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    fireEvent.click(getByTestId("end-recipe-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Details location={{ pathname: "/recipes/drinks/11007" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    fireEvent.click(getByTestId("start-recipe-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Cook location={{ pathname: "/recipes/drinks/11007/cook" }} />
        </MemoryRouter>
      </Provider>
    );

    mockDrinksIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    fireEvent.click(getByTestId("end-recipe-btn"));

    rerender(
      <Provider>
        <Router history={history}>
          <Done location={{ pathname: "/done" }} />
        </Router>
      </Provider>
    );

    expect(getByTestId("52772-horizontal-image")).toBeInTheDocument();
    expect(getByTestId("11007-horizontal-image")).toBeInTheDocument();
    expect(getByTestId("52772-horizontal-name")).toBeInTheDocument();
    expect(getByTestId("11007-horizontal-name")).toBeInTheDocument();
    expect(getByTestId("52772-horizontal-top-text")).toBeInTheDocument();
    expect(getByTestId("11007-horizontal-top-text")).toBeInTheDocument();

    fireEvent.click(getByTestId("52772-horizontal-name"));

    expect(history.location.pathname).toBe("/recipes/meals/52772");

    fireEvent.click(getByTestId("11007-horizontal-name"));

    expect(history.location.pathname).toBe("/recipes/drinks/11007");
  });

  test("Filter Buttons", async () => {
    const history = createMemoryHistory();
    const { queryByTestId, rerender, getByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Details location={{ pathname: "/recipes/meals/52772" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    fireEvent.click(getByTestId("start-recipe-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Cook location={{ pathname: "/recipes/meals/52772/cook" }} />
        </MemoryRouter>
      </Provider>
    );

    mockMealsIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    fireEvent.click(getByTestId("end-recipe-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Details location={{ pathname: "/recipes/drinks/11007" }} />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    fireEvent.click(getByTestId("start-recipe-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Cook location={{ pathname: "/recipes/drinks/11007/cook" }} />
        </MemoryRouter>
      </Provider>
    );

    mockDrinksIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    fireEvent.click(getByTestId("end-recipe-btn"));

    rerender(
      <Provider>
        <Router history={history}>
          <Done location={{ pathname: "/done" }} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("filter-by-food-btn"));

    expect(queryByTestId("52772-horizontal-name")).toBeInTheDocument();
    expect(queryByTestId("11007-horizontal-name")).toBeNull();

    fireEvent.click(getByTestId("filter-by-drink-btn"));

    expect(queryByTestId("52772-horizontal-name")).toBeNull();
    expect(queryByTestId("11007-horizontal-name")).toBeInTheDocument();

    fireEvent.click(getByTestId("filter-by-all-btn"));

    expect(queryByTestId("52772-horizontal-name")).toBeInTheDocument();
    expect(queryByTestId("11007-horizontal-name")).toBeInTheDocument();
  });
});
