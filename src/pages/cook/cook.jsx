import React from "react";
import DetailCard from "../../components/detailCard";
import Process from "../../components/process";
import InstructionsCard from "../../components/instructionsCard";

function handleClick(history, recipeId, page) {
  const status = JSON.parse(localStorage.getItem("recipe-status"));

  const recipes = status[page].find(({ id }) => id === recipeId);

  const date = new Date();
  recipes.complete = date.toDateString();

  localStorage.setItem(
    "recipe-status",
    JSON.stringify({
      ...status,
      [page]: [...status[page].filter(({ id }) => id !== recipeId), recipes],
    })
  );

  history.push("/done");
}

function getSameNodesType(type, quantity) {
  const nodes = [];
  for (let index = 1; index <= quantity; index += 1) {
    nodes.push(`${type}${index}`);
  }
  return nodes;
}

function renderCook(page, pathname, { recipe }, isUpdate, setUpdate) {
  const {
    idDrink,
    idMeal,
    strAlcoholic,
    strCategory,
    strDrink,
    strDrinkThumb,
    strInstructions,
    strMeal,
    strMealThumb,
  } = recipe;
  return (
    <section className="box90 boxWhite boxAround flex-column footer-margin">
      <DetailCard
        category={strCategory}
        id={idDrink || idMeal}
        image={strMealThumb || strDrinkThumb}
        isAlcoholic={strAlcoholic}
        page={page}
        pathname={pathname}
        title={strMeal || strDrink}
      />
      <Process
        id={idDrink || idMeal}
        ingredients={getSameNodesType("strIngredient", 20)
          .map((node) => recipe[node])
          .filter((ingredients) => ingredients !== "" && ingredients)}
        measures={getSameNodesType("strMeasure", 20)
          .map((node) => recipe[node])
          .filter((measure) => measure !== " " && measure)}
        page={page}
        isUpdate={isUpdate}
        setUpdate={setUpdate}
      />
      <InstructionsCard instructions={strInstructions} />
    </section>
  );
}

const serviceCook = {
  renderCook,
  handleClick,
};

export default serviceCook;
