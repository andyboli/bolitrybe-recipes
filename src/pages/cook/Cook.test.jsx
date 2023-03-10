import React from "react";
import "@testing-library/jest-dom";
import { Provider } from "../../context";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Cook from "./index";
import Details from "../details";
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
});

describe("Cook", () => {
  test("Process Components - Meals", async () => {
    const { getByTestId, rerender } = render(
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

    mockMealsIngredientsList.forEach((ingredient) => {
      expect(getByTestId(ingredient)).toBeInTheDocument();
    });
  });

  test("Process Components - Drinks", async () => {
    const { getByTestId, rerender } = render(
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

    mockDrinksIngredientsList.forEach((ingredient) => {
      expect(getByTestId(ingredient)).toBeInTheDocument();
    });
  });

  test("Process Click - Meals", async () => {
    const { getByTestId, rerender } = render(
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
      expect(
        JSON.parse(localStorage.getItem("recipe-status"))
          .meals.find(({ id }) => id === "52772")
          .progress.find(({ ingredient }) => ingredient === eachIngredient)
          .status
      ).toBeFalsy();

      fireEvent.click(getByTestId(eachIngredient));

      expect(
        JSON.parse(localStorage.getItem("recipe-status"))
          .meals.find(({ id }) => id === "52772")
          .progress.find(({ ingredient }) => ingredient === eachIngredient)
          .status
      ).toBeTruthy();

      fireEvent.click(getByTestId(eachIngredient));

      expect(
        JSON.parse(localStorage.getItem("recipe-status"))
          .meals.find(({ id }) => id === "52772")
          .progress.find(({ ingredient }) => ingredient === eachIngredient)
          .status
      ).toBeFalsy();
    });
  });

  test("Process Click - Drinks", async () => {
    const { getByTestId, rerender } = render(
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
      expect(
        JSON.parse(localStorage.getItem("recipe-status"))
          .drinks.find(({ id }) => id === "11007")
          .progress.find(({ ingredient }) => ingredient === eachIngredient)
          .status
      ).toBeFalsy();

      fireEvent.click(getByTestId(eachIngredient));

      expect(
        JSON.parse(localStorage.getItem("recipe-status"))
          .drinks.find(({ id }) => id === "11007")
          .progress.find(({ ingredient }) => ingredient === eachIngredient)
          .status
      ).toBeTruthy();

      fireEvent.click(getByTestId(eachIngredient));

      expect(
        JSON.parse(localStorage.getItem("recipe-status"))
          .drinks.find(({ id }) => id === "11007")
          .progress.find(({ ingredient }) => ingredient === eachIngredient)
          .status
      ).toBeFalsy();
    });
  });

  test("Process Render Saved Checked - Meals", async () => {
    const { getByTestId, rerender } = render(
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

    mockMealsIngredientsList.forEach((eachIngredient, index) => {
      if (index % 2 === 0) {
        fireEvent.click(getByTestId(eachIngredient));
      }
    });

    rerender(
      <Provider>
        <MemoryRouter>
          <Cook location={{ pathname: "/recipes/meals/52772/cook" }} />
        </MemoryRouter>
      </Provider>
    );

    mockMealsIngredientsList.forEach((eachIngredient, index) => {
      if (index % 2 === 0) {
        expect(
          JSON.parse(localStorage.getItem("recipe-status"))
            .meals.find(({ id }) => id === "52772")
            .progress.find(({ ingredient }) => ingredient === eachIngredient)
            .status
        ).toBeTruthy();
      } else {
        expect(
          JSON.parse(localStorage.getItem("recipe-status"))
            .meals.find(({ id }) => id === "52772")
            .progress.find(({ ingredient }) => ingredient === eachIngredient)
            .status
        ).toBeFalsy();
      }
    });
  });

  test("Process Render Saved Checked - Drinks", async () => {
    const { getByTestId, rerender } = render(
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

    mockDrinksIngredientsList.forEach((eachIngredient, index) => {
      if (index % 2 === 0) {
        fireEvent.click(getByTestId(eachIngredient));
      }
    });

    rerender(
      <Provider>
        <MemoryRouter>
          <Cook location={{ pathname: "/recipes/drinks/11007/cook" }} />
        </MemoryRouter>
      </Provider>
    );

    mockDrinksIngredientsList.forEach((eachIngredient, index) => {
      if (index % 2 === 0) {
        expect(
          JSON.parse(localStorage.getItem("recipe-status"))
            .drinks.find(({ id }) => id === "11007")
            .progress.find(({ ingredient }) => ingredient === eachIngredient)
            .status
        ).toBeTruthy();
      } else {
        expect(
          JSON.parse(localStorage.getItem("recipe-status"))
            .drinks.find(({ id }) => id === "11007")
            .progress.find(({ ingredient }) => ingredient === eachIngredient)
            .status
        ).toBeFalsy();
      }
    });
  });

  test("Process Button Disabled - Meals", async () => {
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

    expect(getByTestId("end-recipe-btn").disabled).toBeTruthy();

    mockMealsIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    expect(getByTestId("end-recipe-btn").disabled).toBeFalsy();
  });

  test("Process Button Disabled - Drinks", async () => {
    const { getByTestId, rerender } = render(
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

    expect(getByTestId("end-recipe-btn").disabled).toBeTruthy();

    mockDrinksIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    expect(getByTestId("end-recipe-btn").disabled).toBeFalsy();
  });

  test("Process Button Click - Meals", async () => {
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
        <Router history={history}>
          <Cook location={{ pathname: "/recipes/meals/52772/cook" }} />
        </Router>
      </Provider>
    );

    expect(getByTestId("end-recipe-btn").disabled).toBeTruthy();

    mockMealsIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    expect(
      JSON.parse(localStorage.getItem("recipe-status")).meals.find(
        ({ id }) => id === "52772"
      ).complete
    ).toBeFalsy();

    fireEvent.click(getByTestId("end-recipe-btn"));

    expect(
      JSON.parse(localStorage.getItem("recipe-status")).meals.find(
        ({ id }) => id === "52772"
      ).complete
    ).toBeTruthy();

    expect(history.location.pathname).toBe("/done");
  });

  test("Process Button Click - Drinks", async () => {
    const history = createMemoryHistory();
    const { getByTestId, rerender } = render(
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
        <Router history={history}>
          <Cook location={{ pathname: "/recipes/drinks/11007/cook" }} />
        </Router>
      </Provider>
    );

    expect(getByTestId("end-recipe-btn").disabled).toBeTruthy();

    mockDrinksIngredientsList.forEach((eachIngredient) => {
      fireEvent.click(getByTestId(eachIngredient));
    });

    expect(
      JSON.parse(localStorage.getItem("recipe-status")).drinks.find(
        ({ id }) => id === "11007"
      ).complete
    ).toBeFalsy();

    fireEvent.click(getByTestId("end-recipe-btn"));

    expect(
      JSON.parse(localStorage.getItem("recipe-status")).drinks.find(
        ({ id }) => id === "11007"
      ).complete
    ).toBeTruthy();

    expect(history.location.pathname).toBe("/done");
  });
});
