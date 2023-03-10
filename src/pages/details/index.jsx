import React, { useContext, useEffect } from "react";
import { ReciperContext } from "../../context";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import serviceApp from "../../service";
import serviceDetails from "./details";
import Button from "react-bootstrap/Button";
import Footer from "../../components/footer";

function Details({ location: { pathname } }) {
  const { recipes, setRecipes } = useContext(ReciperContext);
  const history = useHistory();
  const { getData, getPathnameChunk } = serviceApp;
  const { handleClick, renderDetails, getButtonStatus } = serviceDetails;
  const page = getPathnameChunk(pathname, 2);
  const id = getPathnameChunk(pathname, 3);

  useEffect(() => {
    getData(page, `lookup.php?i=${id}`).then((pageDetails) => {
      setRecipes({
        ...recipes,
        [page]: pageDetails,
      });
    });
  }, []);

  return (
    <section className="box90 boxAround flex-column footer-margin">
      {recipes[page] && renderDetails(page, pathname, recipes[page][0])}
      <Footer />
      <Button
        className="box50"
        data-testid="start-recipe-btn"
        onClick={() => handleClick(history, recipes[page][0], id, page)}
        style={{ position: "fixed", bottom: "0%" }}
        type="button"
        variant="outline-danger"
      >
        {getButtonStatus(page, id) ? "Continue Recipe" : "Start Recipe"}
      </Button>
    </section>
  );
}

Details.defaultProps = {
  pathname: "",
};

Details.propTypes = {
  pathname: PropTypes.string,
};

export default Details;
