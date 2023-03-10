import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

function FilterButtons({ setNode }) {
  return (
    <section
      className="box60 boxAround flex-column spaceThin"
      style={{ justifyContent: "center" }}
    >
      <Button
        className="box60 boxYellow spaceThin"
        data-testid="filter-by-all-btn"
        onClick={() => {
          setNode(["meals", "drinks"]);
        }}
        variant="outline-danger"
      >
        All
      </Button>
      <Button
        className="box60 boxYellow spaceThin"
        data-testid="filter-by-food-btn"
        variant="outline-danger"
        onClick={() => {
          setNode(["meals"]);
        }}
      >
        Meals
      </Button>
      <Button
        className="box60 boxYellow spaceThin"
        data-testid="filter-by-drink-btn"
        variant="outline-danger"
        onClick={() => {
          setNode(["drinks"]);
        }}
      >
        Drinks
      </Button>
    </section>
  );
}

FilterButtons.propTypes = {
  setNode: PropTypes.func.isRequired,
};

export default FilterButtons;
