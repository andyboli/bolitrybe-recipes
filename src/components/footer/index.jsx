import React, { useContext } from "react";
import { ReciperContext } from "../../context";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DrinkIcon from "../../images/drinks-icon.png";
import ExplorerIcon from "../../images/explorer-icon.png";
import MealIcon from "../../images/meals-icon.png";

function Footer() {
  const { setEndpoint } = useContext(ReciperContext);
  const history = useHistory();

  return (
    <footer className="box90 boxAround boxWhite flex-row spaceThin">
      <Button
        className="box10"
        data-testid="drinks-bottom-btn"
        onClick={() => {
          setEndpoint("");
          history.push("/recipes/drinks");
        }}
        type="button"
        variant="outline-danger"
      >
        <img alt="drinks icon" src={DrinkIcon} width="90%" />
      </Button>
      <Button
        className="box10"
        data-testid="explore-bottom-btn"
        onClick={() => {
          setEndpoint("");
          history.push("/explorer");
        }}
        type="button"
        variant="outline-danger"
      >
        <img alt="explorer icon" src={ExplorerIcon} width="90%" />
      </Button>
      <Button
        className="box10"
        data-testid="food-bottom-btn"
        onClick={() => {
          setEndpoint("");
          history.push("/recipes/meals");
        }}
        type="button"
        variant="outline-danger"
      >
        <img alt="meals icon" src={MealIcon} width="90%" />
      </Button>
    </footer>
  );
}

export default Footer;
