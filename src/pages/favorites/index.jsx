import React, { useEffect, useState } from "react";
import renderFavorites from "./favorites";
import Carousel from "react-bootstrap/Carousel";
import Header from "../../components/header";
import FilterButtons from "../../components/filterButtons";
import Footer from "../../components/footer";

function Favorites() {
  const [node, setNode] = useState(["meals", "drinks"]);
  const [isUpdate, setUpdate] = useState(false);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites-recipes"));

    if (favorites && (favorites["meals"] || favorites["drinks"])) {
      setRecipes(favorites);
    }
  }, [isUpdate]);

  return (
    <section className="box90 boxAround flex-column spaceThin">
      <Header hasSearch={false} title="Favorites" />
      <FilterButtons setNode={setNode} />
      <Carousel
        as="section"
        className="box90 boxWhite flex-column"
        interval={null}
        slide={false}
      >
        {recipes &&
          node.map((eachNode) => {
            return renderFavorites(
              eachNode,
              recipes,
              isUpdate,
              setUpdate
            ).map((recipeChunk, index) => (
              <Carousel.Item key={`recipe-chunk-${index}`}>
                {recipeChunk}
              </Carousel.Item>
            ));
          })}
      </Carousel>
      <Footer />
    </section>
  );
}

export default Favorites;
