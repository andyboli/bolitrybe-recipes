import React from "react";
import PropTypes from "prop-types";

function InstrucionsCard({ instructions }) {
  return (
    <section className="box90 boxRound boxBlack flex-row">
      <h2 className="boxYellow">Instructions</h2>
      <p>{instructions}</p>
    </section>
  );
}

InstrucionsCard.propTypes = {
  instructions: PropTypes.string.isRequired,
};

export default InstrucionsCard;
