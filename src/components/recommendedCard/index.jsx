import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import renderRecipes from "../../pages/recipes/recipes";
import servicesApp from "../../service";
import get6Recommendations from "./service";
import Carousel from "react-bootstrap/Carousel";

function RecommendedCard({ category, id, page }) {
  const [recommended, setRecommended] = useState(null);
  const { getData } = servicesApp;

  useEffect(() => {
    getData(page, `filter.php?c=${category}`).then((pageRecommended) => {
      pageRecommended &&
        setRecommended({ [page]: get6Recommendations(pageRecommended, id) });
    });
  }, []);

  return (
    <section className="box90 boxAround flex-column">
      <header className="box90 boxAround">
        <h2 className="boxYellow">Recommendations</h2>
      </header>

      {recommended ? (
        <Carousel
          as="section"
          className="box90 boxWhite flex-column"
          interval={null}
          slide={false}
        >
          {renderRecipes(page, recommended).map((recipeChunk, index) => (
            <Carousel.Item key={`recipe-chunk-${index}`}>
              {recipeChunk}
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h2>NO RECIPES</h2>
      )}
    </section>
  );
}

RecommendedCard.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default RecommendedCard;
