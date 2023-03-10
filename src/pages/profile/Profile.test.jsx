import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Provider } from "../../context";
import Profile from "./index";
import Login from "../login";

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

describe("Profile", () => {
  test("Email Title", () => {
    const history = createMemoryHistory();
    const { getByTestId, queryByText, rerender } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "correct@email.com.com" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "1correctPassword" },
    });

    fireEvent.click(getByTestId("login-submit-btn"));

    rerender(
      <Provider>
        <MemoryRouter>
          <Profile location={{ pathname: "/explorer/meals/ingredients" }} />
        </MemoryRouter>
      </Provider>
    );

    expect(getByTestId("profile-email")).toBeInTheDocument();
    expect(queryByText("correct@email.com.com")).toBeInTheDocument();
  });

  test("Button Done Recipes", () => {
    const history = createMemoryHistory();
    const { getByTestId, queryByText, rerender, debug } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "correct@email.com.com" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "1correctPassword" },
    });

    fireEvent.click(getByTestId("login-submit-btn"));

    rerender(
      <Provider>
        <Router history={history}>
          <Profile location={{ pathname: "/explorer/meals/ingredients" }} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("profile-done-btn"));

    expect(history.location.pathname).toBe("/done");
  });

  test("Button Favorites Recipes", () => {
    const history = createMemoryHistory();
    const { getByTestId, queryByText, rerender, debug } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "correct@email.com.com" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "1correctPassword" },
    });

    fireEvent.click(getByTestId("login-submit-btn"));

    rerender(
      <Provider>
        <Router history={history}>
          <Profile location={{ pathname: "/explorer/meals/ingredients" }} />
        </Router>
      </Provider>
    );

    fireEvent.click(getByTestId("profile-favorite-btn"));

    expect(history.location.pathname).toBe("/favorites");
  });

  test("Button Exit", () => {
    const history = createMemoryHistory();
    const { getByTestId, queryByText, rerender, debug } = render(
      <Router history={history}>
        <Login />
      </Router>
    );

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "correct@email.com.com" },
    });
    fireEvent.change(getByTestId("password-input"), {
      target: { value: "1correctPassword" },
    });

    fireEvent.click(getByTestId("login-submit-btn"));

    rerender(
      <Provider>
        <Router history={history}>
          <Profile location={{ pathname: "/explorer/meals/ingredients" }} />
        </Router>
      </Provider>
    );

    expect(JSON.parse(localStorage.getItem("user"))).toBeTruthy();

    fireEvent.click(getByTestId("profile-logout-btn"));

    expect(JSON.parse(localStorage.getItem("user"))).toBeFalsy();

    expect(history.location.pathname).toBe("/");
  });
});
