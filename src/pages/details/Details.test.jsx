import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { Provider } from "../../context";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Details from "./index";
import {
  mockMealsDetails,
  mockDrinksDetails,
  mockMeals,
  mockDrinks,
  mockOtherMealsDetails,
  mockOtherDrinksDetails,
} from "../../mock";
import * as ShareClick from "../../components/shareButton/service";

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

jest.mock("../../components/shareButton/service", () => {
  return jest.fn((pathname) => pathname);
});

jest.mock("../../components/recommendedCard/service", () => {
  return jest.fn((recipes) => recipes);
});

const localStorageMock = jest.fn(() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => (store[key] = value)),
    clear: jest.fn(() => (store = {})),
  };
});

global.localStorage = localStorageMock;

afterEach(() => {
  localStorage.clear();
  ShareClick.mockClear();
});

describe("Details", () => {
  describe("Detail Card - Meals", () => {
    test("Components", async () => {
      const { getByTestId, queryByTestId, queryByText } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/meals/52772" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      expect(getByTestId("recipe-photo")).toBeInTheDocument();
      expect(getByTestId("recipe-title")).toBeInTheDocument();
      expect(getByTestId("recipe-category")).toBeInTheDocument();
      expect(queryByTestId("recipe-alcoholinc")).toBeNull();
      expect(queryByText(mockMealsDetails[0].strMeal)).toBeInTheDocument();
    });

    test("Share Button", async () => {
      const { getByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/meals/52772" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("share-btn"));

      expect(ShareClick.mock.calls.length).toBe(1);
      expect(ShareClick.mock.calls[0][0]).toBe("/recipes/meals/52772");
    });

    test("Favorite Button", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/meals/52772" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      expect(queryByTestId("HeartIcon")).toBeInTheDocument();

      expect(queryByTestId("FullHeartIcon")).toBeNull();

      fireEvent.click(getByTestId("favorite-btn"));

      expect(
        JSON.parse(localStorage.getItem("favorites-recipes") || []).meals.find(
          ({ id }) => id === "52772"
        )
      ).toBeTruthy();

      expect(queryByTestId("HeartIcon")).toBeNull();

      expect(queryByTestId("FullHeartIcon")).toBeInTheDocument();

      fireEvent.click(getByTestId("favorite-btn"));

      expect(
        JSON.parse(localStorage.getItem("favorites-recipes") || []).meals.find(
          ({ id }) => id === "52772"
        )
      ).toBeFalsy();
    });
  });

  describe("Detail Card - Drinks", () => {
    test("Components", async () => {
      const { getByTestId, queryByTestId, queryByText } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/drinks/11007" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      expect(getByTestId("recipe-photo")).toBeInTheDocument();
      expect(getByTestId("recipe-title")).toBeInTheDocument();
      expect(getByTestId("recipe-category")).toBeInTheDocument();
      expect(queryByTestId("recipe-alcoholinc")).toBeInTheDocument();
      expect(queryByText(mockDrinksDetails[0].strDrink)).toBeInTheDocument();
    });

    test("Share Button", async () => {
      const { getByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/drinks/11007" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      fireEvent.click(getByTestId("share-btn"));

      expect(ShareClick.mock.calls.length).toBe(1);
      expect(ShareClick.mock.calls[0][0]).toBe("/recipes/drinks/11007");
    });

    test("Favorite Button", async () => {
      const { getByTestId, queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/drinks/11007" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      expect(queryByTestId("HeartIcon")).toBeInTheDocument();

      expect(queryByTestId("FullHeartIcon")).toBeNull();

      fireEvent.click(getByTestId("favorite-btn"));

      expect(
        JSON.parse(localStorage.getItem("favorites-recipes") || []).drinks.find(
          ({ id }) => id === "11007"
        )
      ).toBeTruthy();

      expect(queryByTestId("HeartIcon")).toBeNull();

      expect(queryByTestId("FullHeartIcon")).toBeInTheDocument();

      fireEvent.click(getByTestId("favorite-btn"));

      expect(
        JSON.parse(localStorage.getItem("favorites-recipes") || []).drinks.find(
          ({ id }) => id === "11007"
        )
      ).toBeFalsy();
    });
  });

  describe("Recommended", () => {
    test("Meals", async () => {
      const { queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/meals/52772" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      mockMeals.forEach(({ strMeal }) => {
        expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
      });
    });

    test("Drinks", async () => {
      const { queryByTestId } = render(
        <Provider>
          <MemoryRouter>
            <Details location={{ pathname: "/recipes/drinks/11007" }} />
          </MemoryRouter>
        </Provider>
      );

      await waitForDomChange();

      mockDrinks.forEach(({ strDrink }) => {
        expect(queryByTestId(`${strDrink}-card-name`)).toBeInTheDocument();
      });
    });
  });

  describe("Button", () => {
    test("Meals", async () => {
      const history = createMemoryHistory();
      const { getByTestId, queryByText, rerender } = render(
        <Provider>
          <Router history={history}>
            <Details location={{ pathname: "/recipes/meals/52772" }} />
          </Router>
        </Provider>
      );

      await waitForDomChange();

      expect(queryByText("Start Recipe")).toBeInTheDocument();
      expect(queryByText("Continue Recipe")).toBeNull();

      fireEvent.click(getByTestId("start-recipe-btn"));

      expect(
        JSON.parse(localStorage.getItem("recipe-status") || []).meals.find(
          ({ id }) => id === "52772"
        )
      ).toBeTruthy();

      expect(history.location.pathname).toBe("/52772/cook");

      rerender(
        <Provider>
          <Router history={history}>
            <Details location={{ pathname: "/recipes/meals/52772" }} />
          </Router>
        </Provider>
      );

      history.location.pathname = "/recipes/meals/52772";

      expect(queryByText("Start Recipe")).toBeNull();
      expect(queryByText("Continue Recipe")).toBeInTheDocument();

      fireEvent.click(getByTestId("start-recipe-btn"));

      expect(
        JSON.parse(localStorage.getItem("recipe-status") || []).meals.find(
          ({ id }) => id === "52772"
        )
      ).toBeTruthy();

      expect(history.location.pathname).toBe("/recipes/meals/52772/cook");

      rerender(
        <Provider>
          <Router history={history}>
            <Details location={{ pathname: "/recipes/meals/52773" }} />
          </Router>
        </Provider>
      );

      history.location.pathname = "/recipes/meals/52773";

      expect(queryByText("Start Recipe")).toBeInTheDocument();
      expect(queryByText("Continue Recipe")).toBeNull();

      fireEvent.click(getByTestId("start-recipe-btn"));

      expect(
        JSON.parse(localStorage.getItem("recipe-status") || []).meals.find(
          ({ id }) => id === "52773"
        )
      ).toBeTruthy();

      expect(history.location.pathname).toBe("/recipes/meals/52773/cook");
    });

    test("Drinks", async () => {
      const history = createMemoryHistory();
      const { getByTestId, queryByText, rerender } = render(
        <Provider>
          <Router history={history}>
            <Details location={{ pathname: "/recipes/drinks/11007" }} />
          </Router>
        </Provider>
      );

      await waitForDomChange();

      expect(queryByText("Start Recipe")).toBeInTheDocument();
      expect(queryByText("Continue Recipe")).toBeNull();

      fireEvent.click(getByTestId("start-recipe-btn"));

      expect(
        JSON.parse(localStorage.getItem("recipe-status") || []).drinks.find(
          ({ id }) => id === "11007"
        )
      ).toBeTruthy();

      expect(history.location.pathname).toBe("/11007/cook");

      rerender(
        <Provider>
          <Router history={history}>
            <Details location={{ pathname: "/recipes/drinks/11007" }} />
          </Router>
        </Provider>
      );

      history.location.pathname = "/recipes/drinks/11007";

      expect(queryByText("Start Recipe")).toBeNull();
      expect(queryByText("Continue Recipe")).toBeInTheDocument();

      fireEvent.click(getByTestId("start-recipe-btn"));

      expect(
        JSON.parse(localStorage.getItem("recipe-status") || []).drinks.find(
          ({ id }) => id === "11007"
        )
      ).toBeTruthy();

      expect(history.location.pathname).toBe("/recipes/drinks/11007/cook");

      rerender(
        <Provider>
          <Router history={history}>
            <Details location={{ pathname: "/recipes/drinks/11008" }} />
          </Router>
        </Provider>
      );

      history.location.pathname = "/recipes/drinks/11008";

      expect(queryByText("Start Recipe")).toBeInTheDocument();
      expect(queryByText("Continue Recipe")).toBeNull();

      fireEvent.click(getByTestId("start-recipe-btn"));

      expect(
        JSON.parse(localStorage.getItem("recipe-status") || []).drinks.find(
          ({ id }) => id === "11008"
        )
      ).toBeTruthy();

      expect(history.location.pathname).toBe("/recipes/drinks/11008/cook");
    });
  });
});
