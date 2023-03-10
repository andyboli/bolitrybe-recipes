import React, { useContext } from "react";
import { ReciperContext } from "../../context";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function IngredientCard({ imgSrc, page, title }) {
  const { setEndpoint } = useContext(ReciperContext);

  return (
    <section className="box30 boxAround flex-column">
      <img
        alt="Food ilustration"
        data-testid={`${title}-card-img`}
        src={`${imgSrc}`}
        width="100%"
      />
      <Link
        data-testid={`${title}-card-name`}
        to={`/recipes/${page}`}
        onClick={() => setEndpoint(`filter.php?i=${title}`)}
      >
        <h2>{title}</h2>
      </Link>
    </section>
  );
}

IngredientCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default IngredientCard;
