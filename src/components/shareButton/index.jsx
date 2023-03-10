import React from "react";
import PropTypes from "prop-types";
import handleClick from "./service";
import Button from "react-bootstrap/Button";
import ShareIcon from "../../images/share-icon.png";

function ShareButton({ pathname }) {
  return (
    <Button
      className="box30"
      data-testid="share-btn"
      onClick={() => handleClick(pathname)}
      type="button"
      variant="outline-danger"
    >
      <img alt="share icon" src={ShareIcon} width="100%" />
    </Button>
  );
}

ShareButton.defaultProps = {
  pathname: "",
};

ShareButton.propTypes = {
  pathname: PropTypes.string,
};

export default ShareButton;
