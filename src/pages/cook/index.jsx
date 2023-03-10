import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import serviceCook from "./cook";
import servicesApp from "../../service";
import Button from "react-bootstrap/Button";
import Footer from "../../components/footer";

function Cook({ location: { pathname } }) {
  const history = useHistory();
  const [isUpdate, setUpdate] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const { getPathnameChunk } = servicesApp;
  const { renderCook, handleClick } = serviceCook;
  const page = getPathnameChunk(pathname, 2);
  const recipeId = getPathnameChunk(pathname, 3);
  const recipe = JSON.parse(localStorage.getItem("recipe-status"))[page].find(
    ({ id }) => id === recipeId
  );

  useEffect(() => {
    const status = JSON.parse(localStorage.getItem("recipe-status"));
    const recipe = status[page].find(({ id }) => id === recipeId);
    const progress = recipe.progress.map(({ status }) => status);
    setDisabled(!progress.every((status) => status));
  }, [isUpdate]);

  return (
    <section className="box90 boxAround flex-column">
      {recipe && renderCook(page, pathname, recipe, isUpdate, setUpdate)}
      <Footer />
      <Button
        className="box40"
        data-testid="end-recipe-btn"
        disabled={isDisabled}
        onClick={() => handleClick(history, recipeId, page)}
        style={{ position: "fixed", bottom: "0%" }}
        type="button"
        variant="outline-danger"
      >
        End Recipe
      </Button>
    </section>
  );
}

Cook.defaultProps = {
  pathname: "",
};

Cook.propTypes = {
  pathname: PropTypes.string,
};

export default Cook;
