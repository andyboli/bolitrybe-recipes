import React from "react";
import renderIngredientsList from "./ingredientsList";
import PropTypes from "prop-types";
import Carousel from "react-bootstrap/Carousel";

function IngredientsList({ ingredients, measures }) {
  return (
    <section className="box box90 boxAround flex-column spaceLarge">
      <header className="box90 boxYellow spaceThin">
        <h2 className="boxYellow">Ingredients</h2>
      </header>

      <Carousel
        as="section"
        className="box90 flex-column boxAround"
        interval={null}
        slide={false}
      >
        {renderIngredientsList(ingredients, measures).map(
          (ingredientsChunk, index) => (
            <Carousel.Item key={`recipe-chunk-${index}`}>
              {ingredientsChunk}
            </Carousel.Item>
          )
        )}
      </Carousel>
    </section>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
};

export default IngredientsList;
