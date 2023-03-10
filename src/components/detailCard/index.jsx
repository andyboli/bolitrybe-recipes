import React, { useState } from "react";
import PropTypes from "prop-types";
import FavoriteButton from "../favoriteButton";
import ShareButton from "../shareButton";

function DetailCard({
  category,
  id,
  image,
  isAlcoholic,
  page,
  pathname,
  title,
}) {
  const isNotFavorite = !(
    (JSON.parse(localStorage.getItem("favorites-recipes")) || [])[page] || []
  ).find((favorite) => favorite.id === id);
  const [isFavorite, setIsFavorite] = useState(!isNotFavorite);

  return (
    <section className="box90 boxAround flex-row">
      <div className="box40">
        <img
          alt="Food ilustration"
          data-testid="recipe-photo"
          src={image}
          width="100%"
        />
      </div>
      <section className="box50 boxAround boxYellow flex-column">
        <header className="box90">
          <h1 data-testid="recipe-title">{title}</h1>
        </header>

        <section className="box90 boxAround flex-row">
          <p data-testid="recipe-category">
            <span>{category}</span>
          </p>
          {isAlcoholic && (
            <p data-testid="recipe-alcoholinc">
              <span>{isAlcoholic}</span>
            </p>
          )}
        </section>
        <section className="box90 boxAround flex-row">
          <ShareButton pathname={pathname} />
          <FavoriteButton
            isFavorite={isFavorite}
            page={page}
            recipe={{
              id,
              category,
              image,
              title,
              isAlcoholic,
            }}
            setIsFavorite={setIsFavorite}
          />
        </section>
      </section>
    </section>
  );
}

DetailCard.defaultProps = {
  isAlcoholic: "",
  pathname: "",
};

DetailCard.propTypes = {
  category: PropTypes.string.isRequired,
  isAlcoholic: PropTypes.string,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default DetailCard;
