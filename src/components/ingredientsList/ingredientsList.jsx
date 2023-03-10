import React from "react";
import serviceApp from "../../service";

const { getChunks } = serviceApp;

function renderIngredientsList(ingredients, measures) {
  const ingredientsHTML = [];
  const ingredientsChunks = getChunks(ingredients, [3, 2, 1]);
  const measuresChunks = getChunks(measures, [3, 2, 1]);

  ingredientsChunks.forEach((eachIngredientChunk, chunkIndex) => {
    ingredientsHTML.push(
      <section className="box90 boxRound boxBlack flex-row">
        {eachIngredientChunk.map((ingredient, recipeIndex) => {
          if (!ingredient) return;
          return (
            <section
              className="box box30-40-90"
              key={`${ingredient}-${recipeIndex}`}
            >
              <p>{ingredient}</p>
              {measuresChunks[chunkIndex] && (
                <p>{measuresChunks[chunkIndex][recipeIndex]}</p>
              )}
            </section>
          );
        })}
      </section>
    );
  });

  return ingredientsHTML;
}

export default renderIngredientsList;
