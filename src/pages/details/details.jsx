import React from "react";
import DetailCard from "../../components/detailCard";
import IngredientsList from "../../components/ingredientsList";
import InstructionsCard from "../../components/instructionsCard";
import RecommendedCard from "../../components/recommendedCard";
import VideoCard from "../../components/videoCard";

function getButtonStatus(page, id) {
  const status = JSON.parse(localStorage.getItem("recipe-status"));

  if (status && status[page]) {
    const recipe = status[page].find((recipe) => recipe.id === id);
    if (recipe) return true;
  }
  return false;
}

function handleClick(history, recipe, recipeId, page) {
  const status = JSON.parse(localStorage.getItem("recipe-status"));
  const ingredients = getSameNodesType("strIngredient", 20)
    .map((node) => recipe[node])
    .filter((ingredients) => ingredients !== "" && ingredients);
  const recipeStatus = {
    id: recipeId,
    complete: false,
    progress: ingredients.map((ingredient) => ({
      ingredient,
      status: false,
    })),
    recipe,
  };
  if (status && status[page]) {
    const recipe = status[page].find(({ id }) => id === recipeId);
    if (!recipe) {
      localStorage.setItem(
        "recipe-status",
        JSON.stringify({
          ...status,
          [page]: [...status[page], recipeStatus],
        })
      );
    }
  } else {
    localStorage.setItem(
      "recipe-status",
      JSON.stringify({
        [page === "meals" ? "meals" : "drinks"]: [recipeStatus],
        [page === "meals" ? "drinks" : "meals"]: [],
      })
    );
  }
  history.push(`${recipeId}/cook`);
}

function getSameNodesType(type, quantity) {
  const nodes = [];
  for (let index = 1; index <= quantity; index += 1) {
    nodes.push(`${type}${index}`);
  }
  return nodes;
}

function renderDetails(page, pathname, recipe) {
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
    strVideo,
    strYoutube,
  } = recipe;

  return (
    <section className="box90 boxWhite boxAround flex-column">
      <DetailCard
        category={strCategory}
        id={idDrink || idMeal}
        image={strMealThumb || strDrinkThumb}
        isAlcoholic={strAlcoholic}
        page={page}
        pathname={pathname}
        title={strMeal || strDrink}
      />
      <IngredientsList
        ingredients={getSameNodesType("strIngredient", 20)
          .map((node) => recipe[node])
          .filter((ingredients) => ingredients !== "" && ingredients)}
        measures={getSameNodesType("strMeasure", 20)
          .map((node) => recipe[node])
          .filter((measure) => measure !== " " && measure)}
      />
      <InstructionsCard instructions={strInstructions} />
      {(strYoutube || strVideo) && (
        <VideoCard
          video={
            strYoutube
              ? strYoutube.replace(/watch\?v=/gi, "embed/")
              : strVideo && strVideo.replace(/watch\?v=/gi, "embed/")
          }
        />
      )}
      <RecommendedCard
        category={strCategory}
        id={idMeal || idDrink}
        page={page}
      />
    </section>
  );
}

const serviceDetails = {
  handleClick,
  renderDetails,
  getButtonStatus,
};

export default serviceDetails;
