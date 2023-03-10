import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
import { Provider } from "../../context";
import { MemoryRouter } from "react-router-dom";
import { mock12Meals, mockAreas, mockMeals } from "../../mock";
import Areas from "./index";

jest.mock("../../service", () => {
  const serviceApp = {
    getData: (page, endpoint) => {
      if (page === "meals") {
        if (endpoint === "list.php?a=list") return Promise.resolve(mockAreas);
        if (endpoint.includes("test")) return Promise.resolve(mockMeals);
        return Promise.resolve(mock12Meals);
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
  };
  return serviceApp;
});

describe("Areas", () => {
  test("Render options", async () => {
    const { getByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Areas />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    mockAreas.forEach(({ strArea }) => {
      expect(getByTestId(`${strArea}-option`)).toBeInTheDocument();
    });
  });

  test("Render 12 random Recipes", async () => {
    const { queryByTestId } = render(
      <Provider>
        <MemoryRouter>
          <Areas />
        </MemoryRouter>
      </Provider>
    );

    await waitForDomChange();

    mock12Meals.forEach(({ strMeal }) => {
      expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
    });
  });

  test("Select - onChange", async () => {
    const { queryByTestId, getByTestId, debug } = render(
      <Provider>
        <MemoryRouter>
          <Areas />
        </MemoryRouter>
      </Provider>
    );
    await waitForDomChange();

    fireEvent.change(getByTestId("explore-by-area-dropdown"), {
      target: { value: "test" },
    });

    // fireEvent.click(getByTestId(`${mockAreas[0].strArea}-option`), {
    //   target: { value: "test" },
    // });

    // mockMeals.forEach(({ strMeal }) => {
    //   expect(queryByTestId(`${strMeal}-card-name`)).toBeInTheDocument();
    // });
  });
});
