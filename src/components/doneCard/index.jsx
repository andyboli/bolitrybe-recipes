import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ShareButton from "../shareButton";

function DoneCard({ area, category, id, image, isAlcoholic, title, complete }) {
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
          <Link to={`/recipes/${area ? "meals" : "drinks"}/${id}`}>
            <h2 className="boxYellow" data-testid={`${id}-horizontal-name`}>
              {title}
            </h2>
          </Link>
          <p data-testid={`${id}-horizontal-top-text`}>{category}</p>
          <p>{isAlcoholic}</p>
          <p>{area}</p>
          <p>{complete}</p>
        </section>
        <ShareButton pathname={`/recipes/${area ? "meals" : "drinks"}/${id}`} />
      </section>
    </section>
  );
}

DoneCard.defaultProps = {
  area: "",
  isAlcoholic: "",
};

DoneCard.propTypes = {
  area: PropTypes.string,
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isAlcoholic: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default DoneCard;
