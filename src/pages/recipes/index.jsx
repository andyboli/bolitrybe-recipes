import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { ReciperContext } from "../../context";
import PropTypes from "prop-types";
import serviceApp from "../../service";
import renderRecipes from "./recipes";
import Categories from "../../components/categories";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Recipes({ location: { pathname } }) {
  const { endpoint, recipes, setRecipes } = useContext(ReciperContext);
  const { getData, getPathnameChunk } = serviceApp;
  const page = getPathnameChunk(pathname, 2);

  useEffect(() => {
    getData(page, endpoint).then((pageRecipes) =>
      setRecipes({ ...recipes, [page]: pageRecipes })
    );
  }, [endpoint, page]);

  return (
    <section className="box90 boxAround flex-column spaceThin">
      <Header hasSearch={true} title={page} />
      <Categories page={page} />
      {recipes[page] ? (
        recipes[page].length !== 1 ? (
          <Carousel
            as="section"
            className="box90 boxWhite flex-column"
            interval={null}
            slide={false}
          >
            {renderRecipes(page, recipes).map((recipeChunk, index) => (
              <Carousel.Item key={`recipe-chunk-${index}`}>
                {recipeChunk}
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Redirect
            to={`${page}/${
              recipes[page][0].idMeal || recipes[page][0].idDrink
            }`}
          />
        )
      ) : (
        <h2>NO RECIPES</h2>
      )}

      <Footer />
    </section>
  );
}

Recipes.defaultProps = {
  pathname: "",
};

Recipes.propTypes = {
  pathname: PropTypes.string,
};

export default Recipes;
