import React from "react";
import serviceApp from "../../service";
import RecipeCard from "../../components/recipeCard";

const { getChunks } = serviceApp;

function renderRecipes(page, recipes) {
  const recipesHTML = [];
  getChunks(recipes[page], [3, 2, 1]).forEach((eachRecipeChunk) => {
    recipesHTML.push(
      <section className="box90 boxAround flex-row">
        {eachRecipeChunk.map((recipe) => {
          if (!recipe) return;
          const {
            idDrink,
            idMeal,
            strCategory,
            strDrink,
            strDrinkThumb,
            strMeal,
            strMealThumb,
          } = recipe;
          return (
            <RecipeCard
              category={strCategory}
              id={idDrink || idMeal}
              image={strDrinkThumb || strMealThumb}
              key={idDrink || idMeal}
              page={page}
              title={strDrink || strMeal}
            />
          );
        })}
      </section>
    );
  });
  return recipesHTML;
}

export default renderRecipes;
