import React from "react";
import serviceApp from "../../service";
import DoneCard from "../../components/doneCard";

const { getChunks } = serviceApp;

function renderDone(page, recipes) {
  const doneHTML = [];
  getChunks(recipes[page], [2, 2, 1]).forEach((eachRecipeChunk) => {
    doneHTML.push(
      <section className="box90 boxAround flex-row">
        {eachRecipeChunk.map((recipe) => {
          if (!recipe) return;
          const {
            strArea,
            strCategory,
            idDrink,
            idMeal,
            strMealThumb,
            strDrinkThumb,
            strAlcoholic,
            strMeal,
            strDrink,
          } = recipe.recipe;
          return (
            <DoneCard
              area={strArea}
              category={strCategory}
              complete={recipe.complete}
              id={idDrink || idMeal}
              image={strMealThumb || strDrinkThumb}
              isAlcoholic={strAlcoholic}
              title={strMeal || strDrink}
              key={idDrink || idMeal}
            />
          );
        })}
      </section>
    );
  });
  return doneHTML;
}

export default renderDone;
