import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "../../context";
import { Router } from "react-router";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Header from "./index";

describe("Header", () => {
  test("Profile Icon - Click - Router", () => {
    const history = createMemoryHistory();

    const { getByTestId, rerender } = render(
      <Router history={history}>
        <Header hasSearch={true} title="SomePage" />
      </Router>
    );

    fireEvent.click(getByTestId("profile-top-btn"));

    expect(history.location.pathname).toBe("/profile");

    rerender(
      <Router history={history}>
        <Header hasSearch={false} title="SomeOtherPage" />
      </Router>
    );

    fireEvent.click(getByTestId("profile-top-btn"));

    expect(history.location.pathname).toBe("/profile");
  });

  test("Search Icon - Click - Display", () => {
    const { getByTestId, queryByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Header hasSearch={true} title="SomePage" />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByTestId("search-top-btn"));

    expect(queryByTestId("name-search-radio")).toBeInTheDocument();
    expect(queryByTestId("ingredient-search-radio")).toBeInTheDocument();
    expect(queryByTestId("first-letter-search-radio")).toBeInTheDocument();

    fireEvent.click(getByTestId("search-top-btn"));

    expect(queryByTestId("name-search-radio")).not.toBeInTheDocument();
    expect(queryByTestId("ingredient-search-radio")).not.toBeInTheDocument();
    expect(queryByTestId("first-letter-search-radio")).not.toBeInTheDocument();
  });

  test("Title", () => {
    const { getByText, rerender } = render(
      <MemoryRouter>
        <Header title="SomePage" hasSearch={true} />
      </MemoryRouter>
    );

    expect(getByText("SomePage")).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <Header title="SomeOtherPage" hasSearch={false} />
      </MemoryRouter>
    );

    expect(getByText("SomeOtherPage")).toBeInTheDocument();
  });
});
