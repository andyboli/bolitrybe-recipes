import React, { useContext } from "react";
import { ReciperContext } from "../../context";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import servicesApp from "../../service";
import Button from "react-bootstrap/Button";
import Footer from "../../components/footer";
import Header from "../../components/header";

function ExplorerPage({ location: { pathname } }) {
  const { setEndpoint } = useContext(ReciperContext);
  const history = useHistory();
  const { getPathnameChunk } = servicesApp;
  const page = getPathnameChunk(pathname, 2);

  return (
    <section className="box60 boxAround flex-column spaceThin">
      <Header hasSearch={false} title={`explorer ${page}`} />
      <section className="box60 boxAround flex-column spaceLarge">
        <Button
          className="box60 boxYellow spaceLarge"
          data-testid="explore-by-ingredient"
          onClick={() => {
            history.push(`/explorer/${page}/ingredients`);
          }}
          variant="outline-danger"
        >
          By Ingredient
        </Button>
        {page === "meals" && (
          <Button
            className="box60 boxYellow spaceLarge"
            data-testid="explore-by-area"
            onClick={() => {
              history.push(`/explorer/${page}/areas`);
            }}
            variant="outline-danger"
          >
            By Area
          </Button>
        )}
        <Button
          className="box60 boxYellow spaceLarge"
          data-testid="explore-surprise"
          onClick={() => {
            setEndpoint("random.php");
            history.push(`/recipes/${page}`);
          }}
          variant="outline-danger"
        >
          Surprise Me!
        </Button>
      </section>
      <Footer />
    </section>
  );
}

ExplorerPage.defaultProps = {
  pathname: "",
};

ExplorerPage.propTypes = {
  pathname: PropTypes.string,
};

export default ExplorerPage;
