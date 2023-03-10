import React from "react";
import serviceApp from "../../service";
import IngredientCard from "../../components/ingredientCard";

const { getChunks } = serviceApp;

function renderIngredients(ingredients, page) {
  const ingredientsHTML = [];
  getChunks(ingredients[page], [3, 2, 1]).forEach((eachIngredientChunk) => {
    ingredientsHTML.push(
      <section className="box flex-row">
        {eachIngredientChunk.map((ingredient, index) => {
          if (!ingredient) return;
          const { strIngredient, strIngredient1 } = ingredient;
          return (
            <IngredientCard
              imgSrc={
                page === "meals"
                  ? `https://www.themealdb.com/images/ingredients/${strIngredient}.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}.png `
              }
              key={
                page === "meals"
                  ? `strIngredient-${index}`
                  : `strIngredient1-${index}`
              }
              page={page}
              title={page === "meals" ? strIngredient : strIngredient1}
            />
          );
        })}
      </section>
    );
  });
  return ingredientsHTML;
}

export default renderIngredients;
