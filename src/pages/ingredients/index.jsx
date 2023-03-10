import React, { useContext, useEffect } from "react";
import { ReciperContext } from "../../context";
import PropTypes from "prop-types";
import renderIngredients from "./ingredients";
import serviceApp from "../../service";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Ingredients({ location: { pathname } }) {
  const { ingredients, setIngredients } = useContext(ReciperContext);
  const { getData, getPathnameChunk } = serviceApp;
  const page = getPathnameChunk(pathname, 2);

  useEffect(() => {
    !ingredients[page] &&
      getData(page, "list.php?i=list").then((pageIngredients) =>
        setIngredients({ ...ingredients, [page]: pageIngredients })
      );
  }, []);

  return (
    <section className="box90 flex-column boxAround spaceThin">
      <Header hasSearch={false} title={`${page} ingredients`} />
      {ingredients[page] && (
        <Carousel
          as="section"
          className="box90 boxWhite flex-column"
          interval={null}
          slide={false}
        >
          {renderIngredients(ingredients, page).map(
            (ingredientChuck, index) => (
              <Carousel.Item key={`ingredient-chunk-${index}`}>
                {ingredientChuck}
              </Carousel.Item>
            )
          )}
        </Carousel>
      )}
      <Footer />
    </section>
  );
}

Ingredients.defaultProps = {
  pathname: "",
};

Ingredients.propTypes = {
  pathname: PropTypes.string,
};

export default Ingredients;
