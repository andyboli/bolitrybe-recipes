import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MemoryRouter } from "react-router-dom";
import { Router } from "react-router";
import Login from "./index";

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

describe("Login", () => {
  test("Email Format", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "WrongEmailFormat.com" },
    });

    expect(getByTestId("email-invalid").style.display).toBe("block");

    fireEvent.change(getByTestId("email-input"), {
      target: { value: "correct@email.com" },
    });

    expect(getByTestId("email-invalid").style.display).toBe("none");
  });

  test("Password Format", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(getByTestId("password-input"), {
      target: { value: "WrongPassword" },
    });

    expect(getByTestId("password-invalid").style.display).toBe("block");

    fireEvent.change(getByTestId("password-input"), {
      target: { value: "1CorrectPassword" },
    });

    expect(getByTestId("password-invalid").style.display).toBe("none");
  });

  describe("Submit Button", () => {
    test("Disabled - Render", () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      expect(getByTestId("login-submit-btn").disabled).toBeTruthy();
    });

    test("Disabled - Email and Password Format", () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "WrongEmailFormat.com" },
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "WrongPassword" },
      });

      expect(getByTestId("login-submit-btn").disabled).toBeTruthy();

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "correct@email.com" },
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "WrongPassword" },
      });

      expect(getByTestId("login-submit-btn").disabled).toBeTruthy();

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "WrongEmailFormat.com" },
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "1correctPassword" },
      });

      expect(getByTestId("login-submit-btn").disabled).toBeTruthy();

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "correct@email.com.com" },
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "1correctPassword" },
      });

      expect(getByTestId("login-submit-btn").disabled).toBeFalsy();
    });

    test("Click - Router", () => {
      const history = createMemoryHistory();

      const { getByTestId } = render(
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

      expect(history.location.pathname).toBe("/");

      fireEvent.click(getByTestId("login-submit-btn"));

      expect(history.location.pathname).toBe("/recipes/meals");
    });

    test("Click - LocalStorage", () => {
      const { getByTestId } = render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "correct@email.com.com" },
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "1correctPassword" },
      });

      fireEvent.click(getByTestId("login-submit-btn"));

      expect(localStorage.getItem("user")).toBe(
        '{"email":"correct@email.com.com"}'
      );
    });
  });
});
