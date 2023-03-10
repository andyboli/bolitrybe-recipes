import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteButton from "../favoriteButton";
import ShareButton from "../shareButton";

function FavoriteCard({
  category,
  id,
  image,
  isAlcoholic,
  node,
  update,
  setUpdate,
  title,
}) {
  return (
    <section className="box30 boxAround flex-column">
      <img
        alt="Food ilustration"
        data-testid={`${id}-horizontal-image`}
        src={`${image}`}
        width="100%"
      />
      <section className="box80 boxAround flex-column">
        <section className="box90 boxBlack boxAround flex-column spaceThin">
          <Link to={`/recipes/${node}/${id}`}>
            <h2 className="boxYellow" data-testid={`${id}-horizontal-name`}>
              {title}
            </h2>
          </Link>
          <p data-testid={`${id}-horizontal-top-text`}>{category}</p>
          <p>{isAlcoholic}</p>
        </section>
        <section className="box80 flex-row boxAround spaceThin">
          <ShareButton pathname={`recipes/${node}/${id}`} />
          <FavoriteButton
            isFavorite={true}
            page={node}
            recipe={{
              id,
            }}
            setIsFavorite={() => {
              setUpdate(!update);
            }}
          />
        </section>
      </section>
    </section>
  );
}

FavoriteCard.defaultProps = {
  isAlcoholic: "",
};

FavoriteCard.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isAlcoholic: PropTypes.string,
  node: PropTypes.string.isRequired,
  setUpdate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  update: PropTypes.bool.isRequired,
};

export default FavoriteCard;
