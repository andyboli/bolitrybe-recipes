import React, { useContext, useEffect } from "react";
import { ReciperContext } from "../../context";
import renderRecipes from "../recipes/recipes";
import serviceApp from "../../service";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Areas() {
  const {
    areas,
    endpoint,
    recipes,
    setAreas,
    setEndpoint,
    setRecipes,
  } = useContext(ReciperContext);
  const { getData } = serviceApp;
  const page = "meals";

  useEffect(() => {
    !areas[page] &&
      getData(page, "list.php?a=list").then((pageAreas) =>
        setAreas({ [page]: pageAreas })
      );

    getData(page, endpoint).then((areaRecipes) =>
      setRecipes({ ...recipes, [page]: areaRecipes })
    );
  }, [endpoint, page]);

  return (
    <section className="box90 flex-column boxAround spaceThin">
      <Header hasSearch={false} title="areas" />
      <select
        className="box50 search-input spaceLarge"
        data-testid="explore-by-area-dropdown"
        onChange={(e) => {
          console.log(e.target.value);
          setEndpoint(e.target.value);
        }}
      >
        <option data-testid="all-option" key="all" value="">
          All
        </option>
        {areas[page] &&
          areas[page].map(({ strArea }) => (
            <option
              data-testid={`${strArea}-option`}
              key={strArea}
              value={`filter.php?a=${strArea}`}
            >
              {strArea}
            </option>
          ))}
      </select>
      {recipes[page] ? (
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
        <h2>NO RECIPES</h2>
      )}
      <Footer />
    </section>
  );
}

export default Areas;
