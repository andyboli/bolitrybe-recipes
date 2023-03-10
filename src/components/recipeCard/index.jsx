import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RecipeCard({ category, id, image, page, title }) {
  return (
    <section className="box30 boxAround flex-column">
      <img
        alt={`${page} ilustration`}
        data-testid={`${title}-card-img`}
        src={image}
        width="100%"
      />
      {category && <p data-testid={`${category}-card-category`}>{category}</p>}
      <Link to={`/recipes/${page}/${id}`}>
        <h2 data-testid={`${title}-card-name`}>{title}</h2>
      </Link>
    </section>
  );
}

RecipeCard.defaultProps = {
  category: "",
};

RecipeCard.propTypes = {
  category: PropTypes.string,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeCard;
