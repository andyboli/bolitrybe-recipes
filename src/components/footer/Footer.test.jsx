import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "../../context";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import Footer from "./index";

describe("Footer", () => {
  test("Drinks Icon - Click - Change Route", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider>
        <Router history={history}>
          <Footer page="SomePage" hasSearch={true} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("drinks-bottom-btn"));

    expect(history.location.pathname).toBe("/recipes/drinks");
  });
  test("Explorer Icon - Click - Change Route", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider>
        <Router history={history}>
          <Footer page="SomePage" hasSearch={true} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("explore-bottom-btn"));

    expect(history.location.pathname).toBe("/explorer");
  });
  test("Meals Icon - Click - Change Route", () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Provider>
        <Router history={history}>
          <Footer page="SomePage" hasSearch={true} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("food-bottom-btn"));

    expect(history.location.pathname).toBe("/recipes/meals");
  });
});
