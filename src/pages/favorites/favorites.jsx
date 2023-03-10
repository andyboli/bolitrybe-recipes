import React from "react";
import serviceApp from "../../service";
import FavoriteCard from "../../components/favoriteCard";

const { getChunks } = serviceApp;

function renderFavorites(page, recipes, isUpdate, setUpdate) {
  const favoritesHTML = [];

  recipes[page] &&
    getChunks(recipes[page], [2, 2, 1]).forEach((eachRecipeChunk) => {
      favoritesHTML.push(
        <section className="box box90 flex-row">
          {eachRecipeChunk.map((recipe) => {
            if (!recipe) return;
            const { category, id, image, isAlcoholic, title } = recipe;
            return (
              <FavoriteCard
                category={category}
                id={id}
                image={image}
                isAlcoholic={isAlcoholic}
                node={page}
                update={isUpdate}
                setUpdate={setUpdate}
                title={title}
                key={id}
              />
            );
          })}
        </section>
      );
    });
  return favoritesHTML;
}

export default renderFavorites;
