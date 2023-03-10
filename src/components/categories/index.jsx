import React, { useContext, useEffect } from "react";
import { ReciperContext } from "../../context";
import PropTypes from "prop-types";
import serviceApp from "../../service";
import Carousel from "react-bootstrap/Carousel";
import { handleCategoryClick } from "./service";

const { getChunks, getData } = serviceApp;

function renderCategories(categories, endpoint, page, setEndpoint) {
  const categoriesHTML = [];
  getChunks(categories[page], [4, 3, 2]).forEach((eachCategoriesChunk) => {
    categoriesHTML.push(
      <section className="box90 boxAround flex-row">
        {eachCategoriesChunk.map((category) => {
          if (!category) return;
          const { strCategory } = category;
          return (
            <section className="box-input" key={strCategory}>
              <input
                data-testid={`${strCategory}-category-filter`}
                defaultChecked={endpoint === `filter.php?c=${strCategory}`}
                id={strCategory}
                name="search-type"
                onClick={(e) => handleCategoryClick(e, endpoint, setEndpoint)}
                type="radio"
                value={strCategory}
              />
              <label className="box90" htmlFor={strCategory}>
                {strCategory}
              </label>
            </section>
          );
        })}
      </section>
    );
  });
  return categoriesHTML;
}

function Categories({ page }) {
  const { categories, endpoint, setCategories, setEndpoint } = useContext(
    ReciperContext
  );

  useEffect(() => {
    !categories[page] &&
      getData(page, "list.php?c=list").then((pageCategories) =>
        setCategories({ ...categories, [page]: pageCategories })
      );
  }, [page, document]);

  return (
    <Carousel
      as="section"
      className="box90 boxBlack flex-column"
      interval={null}
      slide={false}
    >
      {categories[page] &&
        renderCategories(
          categories,
          endpoint,
          page,
          setEndpoint
        ).map((categoryChunk, index) => (
          <Carousel.Item key={`category-chunk-${index}`}>
            {categoryChunk}
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

Categories.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Categories;
