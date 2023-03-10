import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "../../context";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import ExplorerPage from "./index";

describe("Explorer Page", () => {
  describe("Meals", () => {
    test("By Ingredients", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <ExplorerPage location={{ pathname: "/explorer/meals" }} />
          </Router>
        </Provider>
      );

      fireEvent.click(getByTestId("explore-by-ingredient"));

      expect(history.location.pathname).toBe("/explorer/meals/ingredients");
    });

    test("By Area", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <ExplorerPage location={{ pathname: "/explorer/meals" }} />
          </Router>
        </Provider>
      );

      fireEvent.click(getByTestId("explore-by-area"));

      expect(history.location.pathname).toBe("/explorer/meals/areas");
    });

    test("Surprise Me", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <ExplorerPage location={{ pathname: "/explorer/meals" }} />
          </Router>
        </Provider>
      );

      fireEvent.click(getByTestId("explore-surprise"));

      expect(history.location.pathname).toBe("/recipes/meals");
    });
  });

  describe("Drinks", () => {
    test("By Ingredients", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <ExplorerPage location={{ pathname: "/explorer/drinks" }} />
          </Router>
        </Provider>
      );

      fireEvent.click(getByTestId("explore-by-ingredient"));

      expect(history.location.pathname).toBe("/explorer/drinks/ingredients");
    });

    test("(Not Have) By Area", () => {
      const history = createMemoryHistory();
      const { queryByTestId } = render(
        <Provider>
          <Router history={history}>
            <ExplorerPage location={{ pathname: "/explorer/drinks" }} />
          </Router>
        </Provider>
      );

      expect(queryByTestId("explore-by-area")).toBeNull();
    });

    test("Surprise Me", () => {
      const history = createMemoryHistory();
      const { getByTestId } = render(
        <Provider>
          <Router history={history}>
            <ExplorerPage location={{ pathname: "/explorer/drinks" }} />
          </Router>
        </Provider>
      );

      fireEvent.click(getByTestId("explore-surprise"));

      expect(history.location.pathname).toBe("/recipes/drinks");
    });
  });
});
