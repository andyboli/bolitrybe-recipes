import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import FullHeartIcon from "../../images/full-heart-icon.png";
import HeartIcon from "../../images/heart-icon.png";

function FavoriteButton({ isFavorite, page, setIsFavorite, recipe }) {
  const favoriteRecipes =
    JSON.parse(localStorage.getItem("favorites-recipes")) || [];

  const newFavoriteRecipes = (favoriteRecipes[page] || []).filter(
    (favorite) => favorite.id !== recipe.id
  );

  if (!isFavorite)
    return (
      <Button
        className="box30"
        data-testid="favorite-btn"
        onClick={() => {
          localStorage.setItem(
            "favorites-recipes",
            JSON.stringify({
              ...favoriteRecipes,
              [page]: [...(favoriteRecipes[page] || []), recipe],
            })
          );
          setIsFavorite(!isFavorite);
        }}
        type="button"
        variant="outline-danger"
      >
        <img
          alt="heart icon"
          data-testid="HeartIcon"
          src={HeartIcon}
          width="40%"
        />
      </Button>
    );
  return (
    <Button
      className="box30"
      data-testid="favorite-btn"
      onClick={() => {
        localStorage.setItem(
          "favorites-recipes",
          JSON.stringify({
            ...favoriteRecipes,
            [page]: newFavoriteRecipes,
          })
        );
        setIsFavorite(!isFavorite);
      }}
      type="button"
      variant="outline-danger"
    >
      <img
        alt="heart icon"
        data-testid="FullHeartIcon"
        src={FullHeartIcon}
        width="40%"
      />
    </Button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  page: PropTypes.string.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string),
};

export default FavoriteButton;
