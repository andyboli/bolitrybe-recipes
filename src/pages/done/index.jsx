import React, { useEffect, useState } from "react";
import renderDone from "./done";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../../components/footer";
import Header from "../../components/header";
import FilterButtons from "../../components/filterButtons";

function Done() {
  const [node, setNode] = useState(["meals", "drinks"]);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("recipe-status"));

    if (status && (status["meals"] || status["drinks"])) {
      const completeMeals = status["meals"].filter(({ complete }) => complete);
      const completeDrinks = status["drinks"].filter(
        ({ complete }) => complete
      );
      setRecipes({ meals: completeMeals, drinks: completeDrinks });
    }
  }, [node]);

  return (
    <section className="box90 boxAround flex-column spaceThin">
      <Header hasSearch={false} title="Done" />
      <FilterButtons setNode={setNode} />
      <Carousel
        as="section"
        className="box90 boxWhite flex-column"
        interval={null}
        slide={false}
      >
        {recipes &&
          node.map((eachNode) => {
            return renderDone(eachNode, recipes).map((recipeChunk, index) => (
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

export default Done;
