import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "../../context";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import Explorer from "./index";

describe("Explorer", () => {
  test("Meals Explorer", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider>
        <Router history={history}>
          <Explorer />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("explore-food"));

    expect(history.location.pathname).toBe("/explorer/meals");
  });
  test("Drinks Explorer", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider>
        <Router history={history}>
          <Explorer />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("explore-drinks"));

    expect(history.location.pathname).toBe("/explorer/drinks");
  });
});
